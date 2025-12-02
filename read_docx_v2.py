import zipfile
import xml.etree.ElementTree as ET
import os
import sys
import glob

# Set encoding to utf-8 for console output
sys.stdout.reconfigure(encoding='utf-8')

# Directory to search
search_dir = r"c:\Users\BRBritoCa1\OneDrive - NESTLE\Codes\drupal-content-upload"
os.chdir(search_dir)

docx_files = glob.glob("*.docx")
print(f"Found docx files: {docx_files}")

target_file = "How do I know if my cat is sick.docx"

if target_file not in docx_files:
    print(f"Target file '{target_file}' not found in list. Trying fuzzy match or first docx.")
    if docx_files:
        target_file = docx_files[0]
        print(f"Using '{target_file}' instead.")
    else:
        print("No docx files found.")
        sys.exit(1)

print(f"Reading file: {target_file}")

try:
    with zipfile.ZipFile(target_file) as z:
        xml_content = z.read('word/document.xml')
        tree = ET.fromstring(xml_content)
        
        # Namespaces
        ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
        
        print(f"--- START OF DOCX CONTENT ---")
        for p in tree.iterfind('.//w:p', ns):
            texts = [node.text for node in p.iterfind('.//w:t', ns) if node.text]
            if texts:
                print(''.join(texts))
        print("--- END OF DOCX CONTENT ---")
except Exception as e:
    print(f"Error reading docx: {e}")
