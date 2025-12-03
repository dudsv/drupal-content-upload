# Phase 1 Testing Plan - Using Filled Example HTML

**Approach:** Test v1 bookmarklet locally using saved Drupal HTML  
**File:** `Edit Article Mon chat vomit ses croquettes _ Purina BE.html`  
**Benefit:** No need for live Drupal instance, can test parsing logic

---

## Test Setup

### Prerequisites
1. ✅ Modified v1 file with Phase 1 code
2. ✅ Filled example HTML file
3. ✅ Test DOCX files:
   - "How do I know if my cat is sick.docx" (standard)
   - "template.docx" (template)

### Test Environment
- Open filled example HTML in browser
- Load v1 bookmarklet (paste into console or create bookmark)
- Upload DOCX files
- Verify parsing via console logs

---

## Browser-Based Tests

### Test 1: Load v1 Bookmarklet

**Steps:**
1. Open filled example HTML in Chrome/Edge
2. Open Developer Console (F12)
3. Paste entire v1 script into console
4. Press Enter to execute

**Expected:**
- v1 UI appears on page
- No JavaScript errors
- Bookmarklet UI overlay visible

### Test 2: Standard Format DOCX

**Steps:**
1. In v1 UI, upload "How do I know if my cat is sick.docx"
2. Click "Analyze" button
3. Check console output

**Expected Console Logs:**
```
[v1-Phase1] Formato detectado: standard
```

**Expected UI Display:**
- **H1 field:** "Comment dresser un chat à la laisse"
- **Meta title:** "Comment savoir si votre chat est malade..."
- **Meta description:** "Apprenez à reconnaître les signes..."
- **URL alias:** "/articles/chats/sante/symptomes/comment-savoir-chat-malade"

**Verification:**
- ✅ Format detection = "standard"
- ✅ All fields extracted
- ✅ No console errors
- ✅ Same behavior as before Phase 1

### Test 3: Template Format DOCX

**Steps:**
1. Clear previous upload
2. Upload "template.docx"
3. Click "Analyze" button
4. Check console output

**Expected Console Logs:**
```
[v1-Phase1] Formato detectado: template
[v1-Phase1] Título extraído de <h1>: Les meilleurs prénoms de petits chiens...
[v1-Phase1] URL extraído de Source: /choisir-animal/articles/accueillir-chien/prenom/chien-petite-taille
[v1-Phase1] SEO Metadata extraído: { metaTitle: "...", metaDesc: "..." }
[v1-Phase1] Template format parsed: { h1: "...", metaTitle: "...", urlAlias: "..." }
```

**Expected UI Display:**
- **H1 field:** From `<h1>` tag in template.docx
- **Meta title:** From SEO METADATA section
- **Meta description:** From SEO METADATA section
- **URL alias:** From Source: marker

**Verification:**
- ✅ Format detection = "template"
- ✅ Title extracted from H1 tag
- ✅ URL extracted from Source:
- ✅ SEO metadata parsed
- ✅ No console errors

### Test 4: Extraction to Blocks

**Steps:**
1. After analyzing DOCX, click "Extract → Blocks" button
2. Verify content populates in UI blocks

**Expected:**
- Intro block populated
- Text block 1, 2, 3 populated (or at least t1 for template)
- Image blocks if applicable

**Verification:**
- ✅ Blocks populated correctly
- ✅ HTML formatting preserved
- ✅ No data loss

---

## Testing Without Browser (Script Validation)

Since we can't actually fill the Drupal form without being on live Drupal, we focus on:

### What We CAN Test
✅ DOCX parsing logic
✅ Format detection
✅ Field extraction (title, URL, meta tags)
✅ Content block splitting
✅ Console logging

### What We CANNOT Test (Requires Live Drupal)
❌ Actual form filling
❌ CKEditor interaction
❌ AJAX paragraph creation
❌ Form submission

---

## Alternative: Manual Console Testing

If browser automation isn't available, manual testing:

```javascript
// 1. Load v1 script
// (paste entire v1 file into console)

// 2. Test format detection directly
const standardHTML = `<p>URL: https://example.com/test</p><p>H1: Test Title</p>`;
console.log(detectDocxFormat(standardHTML)); // Should log: "standard"

const templateHTML = `<p>Source: https://example.com/test</p><h1>Test Title</h1>`;
console.log(detectDocxFormat(templateHTML)); // Should log: "template"

// 3. Test URL extraction
console.log(extractURL(standardHTML)); // Should log: "/test"
console.log(extractURL(templateHTML)); // Should log: "/test"

// 4. Test title extraction
console.log(extractTitle(standardHTML)); // Should log: "Test Title"
console.log(extractTitle(templateHTML)); // Should log: "Test Title"

// 5. Test SEO metadata
const seoHTML = `<p>SEO METADATA</p><p>Meta title: Test SEO Title</p><p>Meta description: Test SEO Desc</p>`;
console.log(extractSEOMetadata(seoHTML)); // Should log: { metaTitle: "...", metaDesc: "..." }
```

---

## Test Results Checklist

### Format Detection
- [ ] Standard format detected correctly
- [ ] Template format detected correctly
- [ ] Unknown format defaults to standard

### Standard Format Parsing
- [ ] URL from `URL:` marker
- [ ] Title from `H1:` marker or `<h1>` tag
- [ ] Meta title from `Meta title:` marker
- [ ] Meta description from `Meta description:` marker
- [ ] Content blocks parsed correctly

### Template Format Parsing
- [ ] URL from `Source:` marker
- [ ] Title from `<h1>` tag
- [ ] Meta title from SEO METADATA section
- [ ] Meta description from SEO METADATA section
- [ ] Intro from first paragraph after H1
- [ ] Content in t1 block

### Console Logging
- [ ] Format detection logged
- [ ] URL extraction logged (template)
- [ ] Title extraction logged (template)
- [ ] SEO metadata logged (template)
- [ ] Parse results logged (template)

### Error Handling
- [ ] No JavaScript errors
- [ ] Missing fields handled gracefully
- [ ] Invalid HTML handled gracefully

---

## Success Criteria

**Minimum Passing:**
- ✅ Both formats detected correctly
- ✅ All extraction functions work
- ✅ No JavaScript errors
- ✅ Console logs appear as expected
- ✅ Backward compatibility (standard format unchanged)

**Full Success:**
- ✅ All of above
- ✅ UI populates correctly for both formats
- ✅ Extract to blocks works for both
- ✅ Ready for Phase 2 implementation

---

## Next Steps After Testing

### If Tests Pass
1. Mark Phase 1 as complete
2. Get user approval for Phase 2
3. Begin Phase 2 implementation ([COMPONENT:] parsing)

### If Tests Fail
1. Document errors found
2. Debug and fix issues
3. Re-test
4. Iterate until passing

---

## Notes

- Testing with filled example HTML is safe (read-only)
- No risk of breaking live Drupal content
- Can test repeatedly without consequences
- Focus on parsing logic, not Drupal interaction
- Phase 4 will handle empty example (component creation from scratch)

---

**Ready to Execute Tests:** ✅  
**Safe to Test:** ✅ (read-only HTML file)  
**Estimated Time:** 15-30 minutes manual testing
