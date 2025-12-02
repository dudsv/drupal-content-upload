export const waitFor = (fnOrSel, { timeout = 8000, interval = 120 } = {}) => new Promise((resolve, reject) => {
    const t0 = performance.now();
    const tick = () => {
        try {
            const val = typeof fnOrSel === 'function' ? fnOrSel() : document.querySelector(fnOrSel);
            if (val) return resolve(val);
            if (performance.now() - t0 > timeout) return reject(new Error('Timeout: ' + (fnOrSel.toString?.() || fnOrSel)));
            setTimeout(tick, interval);
        } catch (e) { reject(e); }
    };
    tick();
});

export const ensureZip = () => new Promise((resolve, reject) => {
    if (window.JSZip) return resolve();
    const s = document.createElement('script'); s.src = 'https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js';
    s.onload = () => resolve(); s.onerror = () => reject(new Error('Falha ao carregar JSZip')); document.head.appendChild(s);
});

export const allowed = new Set(['DIV', 'P', 'STRONG', 'EM', 'UL', 'OL', 'LI', 'A', 'H1', 'H2', 'H3', 'H4', 'BR']);

export const sanitizeHTML = (html) => {
    const tmp = document.createElement('div'); tmp.innerHTML = html || '';

    const sanitizeUrl = (u) => {
        if (!u) return '';
        const url = String(u).trim();
        const low = url.toLowerCase();
        if (low.startsWith('javascript:') || low.startsWith('data:') || low.startsWith('vbscript:')) return '';
        return url;
    };

    const walk = (node) => {
        for (let c = node.firstChild; c;) {
            const n = c.nextSibling;
            if (c.nodeType === 1) {
                const tag = c.tagName;
                if (!allowed.has(tag)) {
                    while (c.firstChild) node.insertBefore(c.firstChild, c);
                    node.removeChild(c);
                    c = n; continue;
                }
                if (tag === 'A') {
                    let href = c.getAttribute('href');
                    href = sanitizeUrl(href);
                    if (href) c.setAttribute('href', href); else c.removeAttribute('href');

                    const allowedTargets = new Set(['_blank', '_self', '_parent', '_top']);
                    let target = (c.getAttribute('target') || '').trim().toLowerCase();
                    if (!allowedTargets.has(target)) {
                        c.removeAttribute('target');
                    } else {
                        c.setAttribute('target', target);
                        if (target === '_blank') {
                            const relNow = (c.getAttribute('rel') || '').toLowerCase().split(/\s+/).filter(Boolean);
                            if (!relNow.includes('noopener')) relNow.push('noopener');
                            if (!relNow.includes('noreferrer')) relNow.push('noreferrer');
                            c.setAttribute('rel', Array.from(new Set(relNow)).join(' '));
                        }
                    }
                    [...c.attributes].forEach(a => {
                        const nm = a.name.toLowerCase();
                        if (nm !== 'href' && nm !== 'target' && nm !== 'rel') c.removeAttribute(a.name);
                    });
                } else {
                    [...c.attributes].forEach(a => c.removeAttribute(a.name));
                }
                walk(c);
            }
            c = n;
        }
    };

    walk(tmp);
    return tmp.innerHTML
        .replace(/<p>\s*<\/p>/gi, '')
        .replace(/(\s*<br\s*\/?>(\s|&nbsp;)*){2,}/gi, '<br>');
};

export const esc = (s) => String(s).replace(/[&<>]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[m]));

export const plainToHTML = (txt) => {
    return txt.trim().split(/\r?\n\r?\n+/).map(p => `<p>${esc(p).replace(/(https?:\/\/\S+)/g, '<a href="$1">$1<\/a>')}</p>`).join('');
};

export const htmlFromClipboardOrText = (input) => (/(<p|<h\d|<ul|<ol|<li|<strong|<em|<a|<br)/i.test(input) ? input : plainToHTML(input));

export const pulse = (node) => { const box = node?.closest('.js-form-item,.form-item,.paragraphs-subform,.form-wrapper') || node; if (box) { box.classList.add('nppe-pulse'); setTimeout(() => box.classList.remove('nppe-pulse'), 1200); } };

export const sentenceCase = (s) => {
    s = String(s || '').trim();
    if (!s) return s;

    const m = s.match(/^([\(\[\{"'“‘]*)/);
    const lead = m ? m[1] : '';
    let rest = s.slice(lead.length);

    // encontra a primeira letra (inclui acentuadas)
    const idx = rest.search(/[A-Za-zÀ-ÖØ-öø-ÿ]/);
    if (idx >= 0) {
        rest = rest.slice(0, idx) + rest.charAt(idx).toUpperCase() + rest.slice(idx + 1);
    }

    let out = lead + rest;
    if (!/[.!?…]$/.test(out)) out += '.';
    return out;
};

export const dequote = (s) => String(s || '')
    .trim()
    .replace(/^[\s"'“”«»„‚‘’]+|[\s"'“”«»„‚‘’]+$/g, '');

export const cleanUrlAlias = (input) => {
    let s = (input || '').replace(/^[A-Z]{2}:\s*/, '').trim();
    s = s.replace(/^https?:\/\/[^/]+/, '');
    s = s.replace(/^\/(nl|fr|en)(?=\/)/i, '');
    s = s.replace(/\s*-\s*/g, '-');
    s = s.replace(/\s+/g, '');
    if (s && s[0] !== '/') s = '/' + s;
    return s;
};

export const getParagraphs = (root) => [...root.querySelectorAll('p,h1,h2,h3,h4,ul,ol')];
export const getText = (el) => (el.textContent || '').replace(/\u00a0/g, ' ').trim();
export const pullLabeled = (blocks, labelRegex) => {
    for (let i = 0; i < blocks.length; i++) {
        const t = getText(blocks[i]), m = t.match(labelRegex);
        if (m) {
            const after = t.replace(labelRegex, '').trim();
            if (after) return after;
            const next = blocks[i + 1] && blocks[i + 1].tagName === 'P' ? getText(blocks[i + 1]) : '';
            return next || '';
        }
    }
    return '';
};
