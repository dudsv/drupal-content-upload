# Drupal Field Mapping Analysis

## Overview
This document maps the `v1` script's expected fields to the actual Drupal form fields found in the HTML examples.

## Key Findings

### 1. **Editor Technology**
- **Finding**: The Drupal instance uses **CKEditor 5** (not CKEditor 4)
- **Impact**: The v1 script needs to interact with CKEditor 5 API
- **Evidence**: Found `data-ckeditor5-id` attributes and CKEditor 5 configuration in drupal-settings-json

### 2. **Main Form Fields Identified**

#### Title/H1 Field
- **Field ID**: `edit-title-0-value`
- **Field Name**: `title[0][value]`
- **Element Type**: `<input type="text">`
- **Max Length**: 255 characters
- **Found In**: Both empty and filled examples
- **Filled Example Value**: "Mon chat vomit ses croquettes : causes, solutions et conseils"

#### Article Summary (Intro)
- **Field ID**: `edit-field-article-summary-0-value`
- **Field Name**: `field_article_summary[0][value]`
- **Element Type**: `<textarea>` with CKEditor 5
- **CKEditor ID**: Dynamic (e.g., `data-ckeditor5-id="7781238"` in empty, `"5609643"` in filled)
- **Editor Format**: `rich_text`

#### Meta Tags Section
- **Base Selector**: Fields start with `edit-field-meta-tags-0-`
- **Meta Title**: `edit-field-meta-tags-0-basic-title`
  - **Field Name**: `field_meta_tags[0][basic][title]`
  - **Found in HTML**: ✅ Confirmed in filled example
  - **Pre-filled Value**: "Mon chat vomit ses croquettes : causes et solutions| Purina"
- **Meta Description**: `edit-field-meta-tags-0-basic-description`
  - **Field Name**: `field_meta_tags[0][basic][description]`
  - **Element Type**: `<textarea>` with maxlength 1024
  - **Found in HTML**: ✅ Confirmed in filled example
  - **Pre-filled Value**: "Votre chat vomit ses croquettes ? Découvrez les causes..."
- **OG Title**: `edit-field-meta-tags-0-open-graph-og-title`
  - **Field Name**: `field_meta_tags[0][open_graph][og_title]`
- **OG Description**: `edit-field-meta-tags-0-open-graph-og-description`
  - **Field Name**: `field_meta_tags[0][open_graph][og_description]`

#### URL Alias
- **Field ID**: `edit-path-0-alias`
- **Field Name**: `path[0][alias]`
- **Found in HTML**: ✅ Confirmed in both examples
- **Element Type**: `<input type="text">` with maxlength 255
- **Pre-filled Value**: "/articles/chats/sante/digestion/vomissement-croquettes"

#### Paragraphs/Components
- **Field Name Pattern**: `field-article-lp-components`
- **Found in HTML**: ✅ Confirmed with 8 components (0-7) in filled example
- **AJAX-based**: Components can be added/removed dynamically
- **Component Structure**:
  - Each component has: Edit, Remove, Duplicate buttons
  - Components numbered: `field-article-lp-components-0`, `field-article-lp-components-1`, etc.
  - Weight field for ordering: `field_article_lp_components[0][_weight]`
- **Component Types Found in Filled Example**:
  - **Text (c_text)**: Simple text blocks with CKEditor
  - **Text + Image (c_sideimagetext_ttt)**: Text with side image, includes alignment (left/right), heading, and image fields
- **Add More Buttons**:
  - `field-article-lp-components-c-text-add-more` (Text)
  - `field-article-lp-components-c-image-add-more` (Image)
  - `field-article-lp-components-c-sideimagetext-ttt-add-more` (Text + Image)
  - `field-article-lp-components-accordion-add-more` (Accordion)
  - `field-article-lp-components-c-document-add-more` (Document)
  - `field-article-lp-components-c-signposting-add-more` (Signposting)
  - `field-article-lp-components-c-media-add-more` (Media)
  - `field-article-lp-components-c-tabbed-content-add-more` (Tabbed Content)
  - And more...

### 3. **CKEditor 5 Configuration**

The editor configuration includes:
- **Toolbar Items**: bold, italic, underline, strikethrough, superscript, subscript, removeFormat, alignment, link, bulletedList, numberedList, outdent, indent, blockQuote, insertTable, horizontalLine, drupalMedia, media_browser, undo, redo, specialCharacters, style, heading, node, textPartLanguage, sourceEditing
- **Heading Options**: h1, h2, h3, h4, h5, h6, paragraph
- **Supported Formats**: `rich_text`, `simplified_intro`

### 4. **Dynamic Elements**

#### AJAX Callbacks
- Paragraphs use AJAX for add/remove/edit operations
- Media library uses AJAX for selection
- Each action has specific callback configuration

#### Form Structure
- **Form ID**: `node-nppe-article-form` (create) / `node-nppe-article-edit-form` (edit)
- **Form Action**: Different URLs for create vs edit operations
- **CSRF**: Form includes various security tokens

## Mapping to v1 Script Expected Fields

Based on the DOCX template analysis, here's how the script should map content:

| Template Marker | Expected Drupal Field | Field ID/Selector |
|-----------------|----------------------|-------------------|
| `H1:` | Title | `#edit-title-0-value` |
| `Intro (H3)` | Article Summary | `#edit-field-article-summary-0-value` + CKEditor |
| `Meta title:` | SEO Meta Title | `#edit-field-meta-tags-0-basic-title` |
| `Meta description:` | SEO Meta Description | `#edit-field-meta-tags-0-basic-description` |
| `URL:` | URL Alias | `#edit-path-0-alias` |
| `Text block 1/2/3` | Paragraph Components | Dynamic paragraph fields |
| `Alt-tag:` | Image Alt Text | Media library field |

## Technical Considerations for v1 Script

### 1. **CKEditor 5 Integration**
- Must use CKEditor 5 API (different from CKEditor 4)
- Access via `document.querySelector('[data-ckeditor5-id="..."]').ckeditorInstance`
- Use `editor.setData(content)` to set HTML content

### 2. **Paragraph Handling**
- Paragraphs are AJAX-loaded components
- Need to click "add more" buttons to create new paragraphs
- Each paragraph has its own CKEditor instance
- Must wait for AJAX completion before filling

### 3. **Form Submission Flow**
1. Fill basic fields (title, meta tags, URL)
2. Fill CKEditor fields (summary, intro)
3. Add paragraph components as needed
4. Fill each paragraph's content
5. Handle media uploads if needed
6. Submit form

### 4. **Selector Strategy**
- Use `id` attributes for direct field access
- Use `data-drupal-selector` attributes for Drupal-specific elements
- Use `name` attributes as fallback
- Handle dynamic IDs (especially for CKEditor instances)

## Next Steps for Script Validation

1. ✅ Confirm field mappings by viewing actual filled example values
2. ⏳ Test CKEditor 5 API interaction method
3. ⏳ Verify paragraph component creation workflow
4. ⏳ Test end-to-end content insertion
5. ⏳ Handle error cases and validation messages
