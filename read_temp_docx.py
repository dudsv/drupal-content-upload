import zipfile
import xml.etree.ElementTree as ET
import sys

# Set encoding to utf-8 for console output
sys.stdout.reconfigure(encoding='utf-8')

docx_path = "temp_analysis.docx"

try:
    with zipfile.ZipFile(docx_path) as z:
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
