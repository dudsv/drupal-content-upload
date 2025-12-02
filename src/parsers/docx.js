import { ensureZip, sanitizeHTML, esc } from '../utils/helpers.js';

export const getDocxHTML = async (file) => {
    await ensureZip();
    const z = await JSZip.loadAsync(await file.arrayBuffer());
    const docXml = await z.file('word/document.xml')?.async('string');
    const relsXml = await z.file('word/_rels/document.xml.rels')?.async('string') || '';
    const numXml = await z.file('word/numbering.xml')?.async('string') || '';
    if (!docXml) throw new Error('Documento Word inválido');

    const parse = (s) => new DOMParser().parseFromString(s, 'application/xml');
    const W_NS = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main';
    const R_NS = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';
    const A_NS = 'http://schemas.openxmlformats.org/drawingml/2006/main';

    const doc = parse(docXml);
    const rels = relsXml ? parse(relsXml) : null;
    const num = numXml ? parse(numXml) : null;

    const relMap = {};
    if (rels) Array.from(rels.getElementsByTagName('Relationship')).forEach(r => {
        const id = r.getAttribute('Id');
        const t = r.getAttribute('Target');
        if (id && t) relMap[id] = t;
    });

    const numIdToAbs = {};
    const absLvlToFmt = {};
    if (num) {
        Array.from(num.getElementsByTagNameNS(W_NS, 'num')).forEach(n => {
            const numId = n.getAttributeNS(W_NS, 'numId');
            const absEl = n.getElementsByTagNameNS(W_NS, 'abstractNumId')[0];
            const absId = absEl?.getAttributeNS(W_NS, 'val');
            if (numId && absId) numIdToAbs[numId] = absId;
        });
        Array.from(num.getElementsByTagNameNS(W_NS, 'abstractNum')).forEach(a => {
            const absId = a.getAttributeNS(W_NS, 'abstractNumId');
            Array.from(a.getElementsByTagNameNS(W_NS, 'lvl')).forEach(lvl => {
                const ilvl = lvl.getAttributeNS(W_NS, 'ilvl') || '0';
                const fmt = lvl.getElementsByTagNameNS(W_NS, 'numFmt')[0]?.getAttributeNS(W_NS, 'val') || 'bullet';
                absLvlToFmt[`${absId}:${ilvl}`] = fmt;
            });
        });
    }

    const listInfo = (p) => {
        const numPr = p.getElementsByTagNameNS(W_NS, 'numPr')[0];
        if (!numPr) return null;
        const numIdEl = numPr.getElementsByTagNameNS(W_NS, 'numId')[0];
        if (!numIdEl) return null;
        const ilvlEl = numPr.getElementsByTagNameNS(W_NS, 'ilvl')[0];
        const numId = numIdEl.getAttributeNS(W_NS, 'val');
        const ilvl = ilvlEl?.getAttributeNS(W_NS, 'val') || '0';
        const absId = numIdToAbs[numId];
        const fmt = absLvlToFmt[`${absId}:${ilvl}`] || 'bullet';
        const type = /decimal|lowerRoman|upperRoman|lowerLetter|upperLetter/i.test(fmt) ? 'ol' : 'ul';
        return { type, level: parseInt(ilvl, 10) || 0 };
    };

    const headingTag = (p) => {
        const ps = p.getElementsByTagNameNS(W_NS, 'pStyle')[0];
        const v = ps?.getAttributeNS(W_NS, 'val') || '';
        const m = v.match(/Heading([1-6])/i);
        if (m) {
            const lvl = parseInt(m[1], 10);
            if (lvl === 1) return 'h1';
            if (lvl === 2) return 'h2';
            if (lvl === 3) return 'h3';
            return 'h4';
        }
        // Fallback: Check font size (sz) - 36 = 18pt, 48 = 24pt
        const pPr = p.getElementsByTagNameNS(W_NS, 'pPr')[0];
        const rPr = pPr?.getElementsByTagNameNS(W_NS, 'rPr')[0];
        const sz = rPr?.getElementsByTagNameNS(W_NS, 'sz')[0];
        if (sz) {
            const val = parseInt(sz.getAttributeNS(W_NS, 'val'), 10);
            if (val >= 48) return 'h2';
            if (val >= 36) return 'h3';
        }
        return null;
    };

    const smartJoin = (acc, piece) => {
        if (!acc) return piece;
        const a = acc.slice(-1), b = piece[0];
        if (a && b && !(/[\s>]/.test(a)) && !(/[\s,.;:!?)]/.test(b))) return acc + ' ' + piece;
        return acc + piece;
    };

    const textFromRun = async (r) => {
        const rPr = r.getElementsByTagNameNS(W_NS, 'rPr')[0];
        const isB = !!rPr?.getElementsByTagNameNS(W_NS, 'b')[0];
        const isI = !!rPr?.getElementsByTagNameNS(W_NS, 'i')[0];
        let out = '';

        for (const n of Array.from(r.childNodes)) {
            if (n.namespaceURI !== W_NS) continue;
            switch (n.localName) {
                case 't': out = smartJoin(out, esc(n.textContent || '')); break;
                case 'tab': out = smartJoin(out, ' '); break;
                case 'softHyphen': out += '\u00AD'; break;
                case 'br': out += '<br>'; break;
                case 'drawing': {
                    // Extract image
                    const blip = n.getElementsByTagNameNS(A_NS, 'blip')[0];
                    const embedId = blip?.getAttributeNS(R_NS, 'embed');
                    if (embedId && relMap[embedId]) {
                        const imgPath = 'word/' + relMap[embedId];
                        try {
                            const imgData = await z.file(imgPath)?.async('base64');
                            if (imgData) {
                                const ext = imgPath.split('.').pop().toLowerCase();
                                const mime = ext === 'png' ? 'image/png' : (ext === 'jpeg' || ext === 'jpg' ? 'image/jpeg' : 'image/gif');
                                out += `<img src="data:${mime};base64,${imgData}" alt="Image">`;
                            }
                        } catch (e) {
                            console.warn('Failed to load image:', imgPath, e);
                        }
                    }
                    break;
                }
                default: break;
            }
        }

        if (!out) return '';
        if (isB) out = `<strong>${out}</strong>`;
        if (isI) out = `<em>${out}</em>`;
        return out;
    };

    const renderInline = async (container) => {
        let acc = '';
        for (const n of Array.from(container.childNodes)) {
            if (n.namespaceURI !== W_NS) continue;
            if (n.localName === 'r') acc = smartJoin(acc, await textFromRun(n));
            else if (n.localName === 'hyperlink') {
                const rid = n.getAttributeNS(R_NS, 'id') || n.getAttribute('r:id');
                const url = rid ? (relMap[rid] || '#') : '#';
                const inner = await renderInline(n);
                acc = smartJoin(acc, `<a href="${esc(url)}">${inner}</a>`);
            } else if (n.localName === 'br') acc += '<br>';
            else if (n.localName === 'tab') acc = smartJoin(acc, ' ');
            else if (n.localName === 'softHyphen') acc += '\u00AD';
        }
        return acc.trim();
    };

    let html = '';
    const ps = Array.from(doc.getElementsByTagNameNS(W_NS, 'p'));
    const listStack = [];
    const closeListsTo = (targetLevel) => {
        while (listStack.length - 1 > targetLevel) {
            const last = listStack.pop();
            html += `</${last.type}>`;
        }
    };

    for (const p of ps) {
        const content = await renderInline(p);
        if (!content && !p.getElementsByTagNameNS(W_NS, 'drawing').length) continue; // Skip empty unless drawing

        const h = headingTag(p);
        const li = listInfo(p);

        if (li) {
            if (listStack.length === 0) {
                html += `<${li.type}>`; listStack.push({ type: li.type });
            } else {
                const curLevel = listStack.length - 1;
                if (li.level > curLevel) {
                    html += `<${li.type}>`; listStack.push({ type: li.type });
                } else if (li.level < curLevel) {
                    closeListsTo(li.level);
                }
                const curType = listStack[listStack.length - 1].type;
                if (curType !== li.type) {
                    html += `</${curType}><${li.type}>`;
                    listStack[listStack.length - 1].type = li.type;
                }
            }
            html += `<li>${content}</li>`;
            continue;
        }

        closeListsTo(-1); while (listStack.length) { html += `</${listStack.pop().type}>`; }
        if (h) html += `<${h}>${content}</${h}>`;
        else html += `<p>${content}</p>`;
    }

    closeListsTo(-1); while (listStack.length) { html += `</${listStack.pop().type}>`; }
    return sanitizeHTML(html);
};
