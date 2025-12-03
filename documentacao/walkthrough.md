# Walkthrough: Drupal Content Upload (v1.js)

## Overview
This tool automates the process of uploading content from DOCX files to Drupal. It supports two main formats: **Standard** (heading-based) and **Template** (marker-based).

## Key Features (Updated Phase 4)

### 1. Dual Format Support
- **Standard**: Splits content by H2/H3 headings.
- **Template**: Uses `[COMPONENT: Type]` markers for precise control.

### 2. Advanced Parsing
- **Metadata**: Extracts Meta Title, Description, and URL Alias.
- **Category**: Extracts Article Category.
- **Components**: Automatically creates and fills Drupal Paragraph components.

### 3. Safety & Validation
- **Content Validation**: Checks for missing H1, URL, or Metadata before submission.
- **Preview UI**: Visual modal to review content before filling fields.
- **Error Recovery**: Retries AJAX operations if Drupal is busy.

## Workflow

1. **Prepare DOCX**: Use the Standard or Template format.
2. **Copy/Upload**:
   - **Copy**: Select all in Word, Copy, click "Analisar" in tool (reads clipboard).
   - **Upload**: Select `.docx` file in tool.
3. **Review**:
   - Check the "Preview" modal.
   - Edit fields if necessary.
4. **Fill Drupal**:
   - Click "Preencher Drupal".
   - Watch as the tool creates components and fills content.

## Troubleshooting

- **"Field not found"**: Ensure you are on the correct Content Type page.
- **"AJAX Timeout"**: The tool will retry automatically. If it persists, check your internet connection or Drupal server status.
- **Metadata Missing**: Ensure your DOCX uses the correct format (e.g., `Meta title: Value` or `Meta title` \n `Value`).

## Technical Notes

- **Headless Testing**: Validated using Node.js + JSDOM.
- **Files**:
  - `v1.js`: Main script.
  - `documentacao/`: Documentation and logs.
  - `templates/`: Example DOCX files.

## Project Status

- **Phase 1 (Basic Support)**: ✅ Complete
- **Phase 2 (Components)**: ✅ Complete
- **Phase 3 (Refinements)**: ✅ Complete (Batch Mode Deferred)
- **Phase 4 (Testing)**: ✅ Complete (Verified with `medium.docx`)
