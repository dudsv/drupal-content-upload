from docx import Document
import os

# Find template.docx in current directory
template_path = None
for file in os.listdir('.'):
    if file == 'template.docx':
        template_path = file
        break

if template_path:
    try:
        doc = Document(template_path)
        
        print("--- START OF TEMPLATE.DOCX CONTENT ---")
        for para in doc.paragraphs:
            if para.text.strip():  # Only print non-empty paragraphs
                print(para.text)
        print("--- END OF TEMPLATE.DOCX CONTENT ---")
        
    except Exception as e:
        print(f"Error reading template.docx: {e}")
else:
    print("template.docx not found in current directory")
