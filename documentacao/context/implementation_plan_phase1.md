# Implementation Plan: Phase 1 - Basic Template Support

## Overview
Adding dual-format DOCX support to v1 script to process both standard format ("How do I know if my cat is sick.docx") and alternative format ("template.docx").

---

## Code Changes

### 1. Add Format Detection Function
**Location:** After line 1119 (after `cleanUrlAlias` function)  
**Action:** Insert new function

```javascript
// ===== Format Detection =====
const detectDocxFormat = (html) => {
  // Check for standard format markers
  const hasStandardMarkers = /(?:URL\s*:|H1\s*:|Intro\s*\(H3\)|Text\s*block)/i.test(html);
  
  // Check for template format markers
  const hasTemplateMarkers = /(?:Source\s*:|Article\s*category\s*:|\[COMPONENT\s*:)/i.test(html);
  
  if (hasStandardMarkers) {
    console.log('[v1-Phase1] Formato detectado: standard');
    return 'standard';
  }
  
  if (hasTemplateMarkers) {
    console.log('[v1-Phase1] Formato detectado: template');
    return 'template';
  }
  
  console.log('[v1-Phase1] Formato detectado: unknown');
  return 'unknown';
};
```

---

### 2. Add Source: URL Extraction Function
**Location:** After format detection function  
**Action:** Insert new function

```javascript
// ===== Extract URL (supports both URL: and Source:) =====
const extractURL = (html) => {
  const tmp = document.createElement('div');
  tmp.innerHTML = html || '';
  const blocks = [...tmp.querySelectorAll('p,h1,h2,h3,h4')];
  const getText = (el) => (el.textContent || '').replace(/\u00a0/g, ' ').trim();
  
  // Try URL: first (standard format)
  for (const block of blocks) {
    const text = getText(block);
    const urlMatch = text.match(/^URL\s*:\s*(.+)$/i);
    if (urlMatch) {
      return cleanUrlAlias(urlMatch[1].trim());
    }
  }
  
  // Try Source: (template format)
  for (const block of blocks) {
    const text = getText(block);
    const sourceMatch = text.match(/^Source\s*:\s*(.+)$/i);
    if (sourceMatch) {
      return cleanUrlAlias(sourceMatch[1].trim());
    }
  }
  
  return '';
};
```

---

### 3. Add Heading 1 Extraction Function
**Location:** After URL extraction function  
**Action:** Insert new function

```javascript
// ===== Extract Title (supports H1 tag and H1: marker) =====
const extractTitle = (html) => {
  const tmp = document.createElement('div');
  tmp.innerHTML = html || '';
  const blocks = [...tmp.querySelectorAll('p,h1,h2,h3,h4')];
  const getText = (el) => (el.textContent || '').replace(/\u00a0/g, ' ').trim();
  
  // Try H1 tag first (template format)
  const h1Tag = tmp.querySelector('h1');
  if (h1Tag) {
    const title = getText(h1Tag);
    if (title) {
      return dequote(title).substring(0, 255); // Drupal title max length
    }
  }
  
  // Try H1: marker (standard format)
  for (const block of blocks) {
    const text = getText(block);
    const h1Match = text.match(/^H1\s*:\s*(.+)$/i);
    if (h1Match) {
      return dequote(h1Match[1].trim()).substring(0, 255);
    }
  }
  
  return '';
};
```

---

### 4. Add SEO Metadata Extraction Function
**Location:** After title extraction function  
**Action:** Insert new function

```javascript
// ===== Extract SEO Metadata Section (template format) =====
const extractSEOMetadata = (html) => {
  const tmp = document.createElement('div');
  tmp.innerHTML = html || '';
  const allText = tmp.textContent || '';
  
  // Check if SEO METADATA section exists
  const seoSectionMatch = allText.match(/SEO\s+METADATA([\s\S]*?)(?:\[COMPONENT\s*:|$)/i);
  
  if (seoSectionMatch) {
    const seoContent = seoSectionMatch[1];
    
    // Extract meta title
    const metaTitleMatch = seoContent.match(/Meta\s*title\s*:\s*([^\n]+)/i);
    const metaTitle = metaTitleMatch ? dequote(metaTitleMatch[1].trim()) : '';
    
    // Extract meta description
    const metaDescMatch = seoContent.match(/Meta\s*description\s*:\s*([^\n]+)/i);
    const metaDesc = metaDescMatch ? dequote(metaDescMatch[1].trim()) : '';
    
    console.log('[v1-Phase1] SEO Metadata extraído:', { metaTitle, metaDesc });
    
    return {
      metaTitle,
      metaDesc
    };
  }
  
  return null;
};
```

---

### 5. Add Template Format Parser
**Location:** After SEO metadata function  
**Action:** Insert new function

```javascript
// ===== Parse Template Format (template.docx) =====
const parseTemplateFormat = (html) => {
  const clean = sanitizeHTML(htmlFromClipboardOrText(html));
  const tmp = document.createElement('div');
  tmp.innerHTML = clean;
  
  // Extract basic fields using new functions
  const h1 = extractTitle(clean);
  const urlAlias = extractURL(clean);
  
  // Extract SEO metadata
  const seoMeta = extractSEOMetadata(clean);
  const met aTitle = seoMeta?.metaTitle || '';
  const metaDesc = seoMeta?.metaDesc || '';
  
  // OG tags fallback to meta tags
  const ogTitle = metaTitle;
  const ogDesc = metaDesc;
  
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
      if (text && !text.match(/^(Source|Article category|SEO METADATA)/i)) {
        intro = `<h3>${block.innerHTML}</h3>`;
        break;
      }
    }
  }
  
  // For now, put remaining content in t1 (Phase 2 will handle [COMPONENT: ...])
  const allContent = blocks.map(b => b.outerHTML).join('');
  const t1 = allContent;
  const t2 = '';
  const t3 = '';
  
  console.log('[v1-Phase1] Template format parsed:', { h1, metaTitle, urlAlias });
  
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
    urlAlias
  };
};
```

---

### 6. Modify parseArticle Function
**Location:** Line 1122 (existing `parseArticle` function)  
**Action:** Rename to `parseStandardFormat` and add wrapper

```javascript
// ===== Parser for Standard Format (original logic) =====
const parseStandardFormat = (html) => {
  // EXISTING CODE FROM LINE 1123-1178
  // (Keep all the current parseArticle logic)
  const clean = sanitizeHTML(htmlFromClipboardOrText(html));
  // ... rest of existing code ...
  return { clean, h1, intro, t1, t2, t3, imgBlocks: alts.slice(0,2), metaTitle: _metaTitle, metaDesc: _metaDesc, ogTitle: _ogTitle, ogDesc: _ogDesc, urlAlias: _urlAlias };
};

// ===== Main Parser with Format Detection =====
const parseArticle = (html) => {
  const format = detectDocxFormat(html);
  
  if (format === 'template') {
    return parseTemplateFormat(html);
  } else {
    // 'standard' or 'unknown' -> use original logic
    return parseStandardFormat(html);
  }
};
```

---

###7. Update extractByMarkers Function (Optional Enhancement)
**Location:** Line 1182 (existing function)  
**Action:** No changes needed for Phase 1, keep as-is

The `extractByMarkers` function already handles the standard format markers. In Phase 2, we'll add support for `[COMPONENT: ...]` markers.

---

## Verification Plan

### Automated Tests

Since this is a bookmarklet, manual testing on actual Drupal page is required.

### Manual Test Cases

#### Test 1: Standard Format Detection
1. Load v1 bookmarklet on Drupal create article page
2. Upload "How do I know if my cat is sick.docx"
3. Click "Analyze"
4. **Expected:** Console shows "[v1-Phase1] Formato detectado: standard"
5. **Expected:** All fields extracted correctly as before

#### Test 2: Template Format Detection
1. Load v1 bookmarklet on Drupal create article page
2. Upload "template.docx"
3. Click "Analyze"
4. **Expected:** Console shows "[v1-Phase1] Formato detectado: template"
5. **Expected:** Title, URL, Meta Title, Meta Description extracted

#### Test 3: Source: URL Extraction
1. Use template.docx with `Source: https://www.purina.fr/articles/test`
2. **Expected:** URL Alias = `/articles/test`

#### Test 4: Heading 1 Extraction
1. Use template.docx with H1 tag
2. **Expected:** Title field shows H1 content
3. **Expected:** Title limited to 255 chars

#### Test 5: SEO Metadata Parsing
1. Use template.docx with SEO METADATA section
2. **Expected:** Meta title extracted from section
3. **Expected:** Meta description extracted from section

#### Test 6: Backward Compatibility
1. Test with multiple existing standard format DOCXs
2. **Expected:** 100% same behavior as before
3. **Expected:** No console errors

---

## Rollback Plan

If issues arise:
1. Restore v1 file from backup (create backup before starting)
2. OR comment out new functions and restore original `parseArticle`

---

## Success Criteria

- ✅ Format detection works for both formats
- ✅ Standard format processes exactly as before (no regressions)
- ✅ Template format extracts: title (H1), URL (Source:), meta tags (SEO METADATA)
- ✅ All console logs indicating format detection
- ✅ No JavaScript errors in browser console

---

## Next Steps After Phase 1

Once Phase 1 is verified:
1. Begin Phase 2: [COMPONENT: ...] parsing
2. Add category extraction
3. Dynamic component creation

---

**Est. Implementation Time:** 2-3 hours  
**Est. Testing Time:** 1 hour  
**Total:** 3-4 hours

**Status:** Ready to implement ✅
