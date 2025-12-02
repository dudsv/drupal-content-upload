// ===== PHASE 2: Enhanced Template Format Parser =====
const parseTemplateFormat = (html) => {
    const clean = sanitizeHTML(htmlFromClipboardOrText(html));
    const tmp = document.createElement('div');
    tmp.innerHTML = clean;

    // Extract basic fields using Phase 1 functions
    const h1 = extractTitle ? extractTitle(clean) : '';
    const urlAlias = extractURL ? extractURL(clean) : '';

    // Extract SEO metadata
    const seoMeta = extractSEOMetadata ? extractSEOMetadata(clean) : null;
    const metaTitle = seoMeta?.metaTitle || '';
    const metaDesc = seoMeta?.metaDesc || '';

    // OG tags fallback to meta tags
    const ogTitle = metaTitle;
    const ogDesc = metaDesc;

    // PHASE 2: Extract components
    const components = extractComponents(clean);

    // PHASE 2: Extract category
    const category = extractCategory(clean);

    // Extract intro (first paragraph after H1)
    const blocks = [...tmp.querySelectorAll('p,h1,h2,h3,h4,ul,ol')];
    let intro = '';
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

    // PHASE 2: If components found, use them; otherwise use all content in t1
    let t1 = '', t2 = '', t3 = '';

    if (components && components.length > 0) {
        // Components will be handled separately in fillDrupal
        console.log('[v1-Phase2] Usando componentes estruturados');
    } else {
        // Fallback: put all content in t1 (Phase 1 behavior)
        const contentBlocks = blocks.filter(b => {
            const text = (b.textContent || '').trim();
            return text && !text.match(/^(Source|Article category|Meta|SEO METADATA|URL\s*:)/i);
        });

        t1 = contentBlocks.map(b => b.outerHTML).join('');
    }

    console.log('[v1-Phase2] Template format parsed:', {
        h1,
        metaTitle,
        urlAlias,
        componentsCount: components?.length || 0,
        category: category?.name || 'None'
    });

    return {
        clean,
        h1,
        intro,
        t1,
        t2,
        t3,
        imgBlocks: [],
        metaTitle,
        metaDesc,
        ogTitle,
        ogDesc,
        urlAlias,
        // PHASE 2: New fields
        components: components || [],
        category: category
    };
};
