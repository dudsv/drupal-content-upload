import { sanitizeHTML, htmlFromClipboardOrText, getParagraphs, getText, pullLabeled, cleanUrlAlias, dequote } from '../utils/helpers.js';

export const COMPONENT_TYPE_MAPPING = {
    'Text Block 1': 'c_text',
    'Text Block 2': 'c_text',
    'Text Block 3': 'c_text',
    'Image+Text 1': 'c_sideimagetext',
    'Image+Text 2': 'c_sideimagetext',
    'Image+Text 3': 'c_sideimagetext',
    'Contact Us Small': 'c_signposting',
    'Image Gallery': 'c_media',
    'Product Recommendations': 'c_products_list',
    'Tabbed Content': 'c_tabbed_content',
    'Accordion': 'c_accordion',
    'Brand Carousel': 'c_brand_carousel',
    'Document': 'c_document'
};

export const detectDocxFormat = (html) => {
    const hasStandardMarkers = /(?:URL\s*:|H1\s*:|Intro\s*\(H3\)|Text\s*block)/i.test(html);
    const hasTemplateMarkers = /(?:Source\s*:|Article\s*category\s*:|\[COMPONENT\s*:)/i.test(html);
    const hasHeadings = /<h1/i.test(html) && !/Text\s*block/i.test(html);

    if (hasTemplateMarkers || hasHeadings) {
        console.log('[v1-Phase2] Formato detectado: template (ou heading-based)');
        return 'template';
    }
    if (hasStandardMarkers) {
        console.log('[v1-Phase2] Formato detectado: standard');
        return 'standard';
    }
    console.log('[v1-Phase2] Formato detectado: unknown (usando standard como fallback)');
    return 'unknown';
};

export const extractComponents = (html) => {
    const components = [];
    const componentRegex = /\[COMPONENT:\s*([^\]]+)\]/gi;
    const matches = [...html.matchAll(componentRegex)];
    if (matches.length === 0) return null;

    matches.forEach((match, index) => {
        const type = match[1].trim();
        const startIndex = match.index + match[0].length;
        const nextMatch = matches[index + 1];
        const endIndex = nextMatch ? nextMatch.index : html.length;
        const rawContent = html.substring(startIndex, endIndex);

        const tmp = document.createElement('div');
        tmp.innerHTML = rawContent;
        const blocks = [...tmp.querySelectorAll('p,h1,h2,h3,h4,ul,ol')].filter(el => {
            const text = (el.textContent || '').trim();
            return text && !text.match(/^(Source|Article category|Meta|SEO METADATA|URL\s*:|\[COMPONENT)/i);
        });

        const content = blocks.map(b => b.outerHTML).join('');
        const drupalType = COMPONENT_TYPE_MAPPING[type] || 'c_text';

        if (drupalType === 'c_text' && !COMPONENT_TYPE_MAPPING[type]) {
            console.warn(`[v1-Phase2] Componente não mapeado: "${type}", usando c_text como fallback`);
        }

        components.push({
            type: type,
            content: content,
            rawHtml: rawContent,
            drupalType: drupalType
        });
    });

    console.log(`[v1-Phase2] ${components.length} componente(s) extraído(s)`);
    return components.length > 0 ? components : null;
};

export const extractComponentsFromStructure = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    const components = [];
    let current = null;

    const flush = () => {
        if (current) {
            components.push(current);
            current = null;
        }
    };

    const nodes = Array.from(tmp.childNodes);
    let introContent = '';
    let inIntro = true;

    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.nodeType !== 1) continue;

        const tag = node.tagName;
        const text = node.textContent.trim();
        const hasImg = node.querySelector('img') || (tag === 'IMG');

        // Header detection (H2 or H3)
        if (/^H[23]$/.test(tag)) {
            flush();
            inIntro = false;

            // Look ahead for Image
            let sibling = node.nextElementSibling;
            const nextHasImg = sibling && (sibling.querySelector('img') || sibling.tagName === 'IMG');

            if (nextHasImg) {
                current = { type: 'c_sideimagetext', content: node.outerHTML, index: components.length, drupalType: 'c_sideimagetext', label: text.substring(0, 30) };
            } else {
                current = { type: 'c_text', content: node.outerHTML, index: components.length, drupalType: 'c_text', label: text.substring(0, 30) };
            }
            continue;
        }

        if (hasImg) {
            inIntro = false;
            if (!current) {
                current = { type: 'c_sideimagetext', content: '', index: components.length, drupalType: 'c_sideimagetext', label: 'Image Block' };
            }
            current.content += node.outerHTML;
            continue;
        }

        if (inIntro) {
            if (tag === 'H1' || /^(Meta|OG|URL|Source)/i.test(text)) {
                // ignore
            } else {
                introContent += node.outerHTML;
            }
        } else {
            if (!current) {
                current = { type: 'c_text', content: '', index: components.length, drupalType: 'c_text', label: 'Text Block' };
            }
            current.content += node.outerHTML;
        }
    }
    flush();
    return { components, intro: introContent };
};

export const parseTemplateFormat = (html) => {
    const clean = sanitizeHTML(htmlFromClipboardOrText(html));
    const tmp = document.createElement('div');
    tmp.innerHTML = clean;

    const h1Tag = tmp.querySelector('h1');
    let h1 = h1Tag ? getText(h1Tag) : '';
    if (h1 && !h1.match(/^(Source|Article category|Meta|SEO)/i)) {
        h1 = dequote(h1).substring(0, 255);
    }

    const blocks = getParagraphs(tmp);
    let urlAlias = '';
    for (const block of blocks) {
        const text = getText(block);
        const sourceMatch = text.match(/^Source\s*:\s*(.+)$/i);
        if (sourceMatch) {
            urlAlias = cleanUrlAlias(sourceMatch[1].trim());
            break;
        }
    }

    const allText = tmp.textContent || '';
    const seoSectionMatch = allText.match(/SEO\s+METADATA([\s\S]*?)(?:\[COMPONENT\s*:|$)/i);
    let metaTitle = '', metaDesc = '';

    if (seoSectionMatch) {
        const seoContent = seoSectionMatch[1];
        const metaTitleMatch = seoContent.match(/Meta\s*title\s*:\s*([^\n]+)/i);
        const metaDescMatch = seoContent.match(/Meta\s*description\s*:\s*([^\n]+)/i);
        metaTitle = metaTitleMatch ? dequote(metaTitleMatch[1].trim()) : '';
        metaDesc = metaDescMatch ? dequote(metaDescMatch[1].trim()) : '';
    }

    const ogTitle = metaTitle;
    const ogDesc = metaDesc;

    let components = extractComponents(clean);
    let intro = '';

    if (!components) {
        console.log('[v1-Phase2] No [COMPONENT] markers found. Trying structure-based extraction.');
        const struct = extractComponentsFromStructure(clean);
        components = struct.components;
        intro = struct.intro;
    } else {
        let foundH1 = false;
        for (const block of blocks) {
            if (block.tagName === 'H1') {
                foundH1 = true;
                continue;
            }
            if (foundH1 && block.tagName === 'P') {
                const text = (block.textContent || '').trim();
                if (text && !text.match(/^(Source|Article category|SEO METADATA|\[COMPONENT)/i)) {
                    intro = `<h3>${block.innerHTML}</h3>`;
                    break;
                }
            }
        }
    }

    let t1 = '', t2 = '', t3 = '';
    if (!components || components.length === 0) {
        const contentBlocks = blocks.filter(b => {
            const text = (b.textContent || '').trim();
            return text && !text.match(/^(Source|Article category|Meta|SEO METADATA|URL\s*:)/i);
        });
        t1 = contentBlocks.map(b => b.outerHTML).join('');
    }

    return {
        clean, h1, intro, t1, t2, t3,
        imgBlocks: [],
        metaTitle, metaDesc, ogTitle, ogDesc, urlAlias,
        components: components || [],
        category: null
    };
};

export const parseStandardFormat = (html) => {
    const clean = sanitizeHTML(htmlFromClipboardOrText(html));
    const tmp = document.createElement('div'); tmp.innerHTML = clean;
    const blocks = getParagraphs(tmp).filter(n => {
        const s = getText(n);
        if (/^Add a block with the following info here/i.test(s)) return false;
        if (/^(Voor meer informação|Voor meer informatie|En savoir plus)$/i.test(s)) return false;
        return true;
    });

    const h1Tag = tmp.querySelector('h1');
    let h1 = h1Tag ? getText(h1Tag) : '';
    if (!h1) h1 = pullLabeled(blocks, /^\s*H1\s*:?\s*/i);

    const metaTitle = pullLabeled(blocks, /^Meta\s*title\s*:\s*/i);
    const metaDesc = pullLabeled(blocks, /^Meta\s*description\s*:\s*/i);
    const ogTitle = pullLabeled(blocks, /^(OG|Og)\s*title\s*:\s*/i);
    const ogDesc = pullLabeled(blocks, /^(OG|Og)\s*description\s*:\s*/i);
    const urlFull = pullLabeled(blocks, /^URL\s*:\s*/i);
    const urlAlias = urlFull ? cleanUrlAlias(urlFull) : '';

    h1 = dequote(h1);
    const _metaTitle = dequote(metaTitle);
    const _metaDesc = dequote(metaDesc);
    let _ogTitle = dequote(ogTitle) || _metaTitle;
    let _ogDesc = dequote(ogDesc) || _metaDesc;
    const _urlAlias = urlAlias || '';

    const htmlBlocks = blocks.map(n => n.outerHTML);
    const texts = [], alts = [];
    for (let i = 0; i < htmlBlocks.length; i++) {
        const plain = htmlBlocks[i].replace(/<[^>]+>/g, '').trim();
        const m = plain.match(/^Alt-tag\s*:\s*(.+)$/i);
        if (m) {
            const summary = [];
            for (let j = i + 1; j < htmlBlocks.length && summary.length < 4; j++) {
                const s = htmlBlocks[j].replace(/<[^>]+>/g, '').trim();
                if (!s || /^Alt-tag\s*:/i.test(s) || /^Meta |^(OG|Og)\s+/i.test(s) || /^URL\s*:/i.test(s)) break;
                summary.push(htmlBlocks[j]);
                if (summary.join('').replace(/<[^>]+>/g, '').length >= 480) break;
            }
            alts.push({ alt: m[1].trim(), summary: summary.slice(0, 2).join('') });
        } else texts.push(htmlBlocks[i]);
    }
    const intro = texts.length ? `<h3>${texts[0].replace(/^<p>|<\/p>$/g, '')}<\/h3>` : '';
    const rest = texts.slice(1);
    const parts = (arr, n) => arr.length ? Array.from({ length: n }, (_, k) => arr.slice(Math.ceil(arr.length / n) * k, Math.ceil(arr.length / n) * (k + 1)).join('')) : Array(n).fill('');
    const [t1, t2, t3] = parts(rest, 3);

    return { clean, h1, intro, t1, t2, t3, imgBlocks: alts.slice(0, 2), metaTitle: _metaTitle, metaDesc: _metaDesc, ogTitle: _ogTitle, ogDesc: _ogDesc, urlAlias: _urlAlias };
};

export const parseArticle = (html) => {
    const format = detectDocxFormat(html);
    if (format === 'template') {
        return parseTemplateFormat(html);
    } else {
        return parseStandardFormat(html);
    }
};
