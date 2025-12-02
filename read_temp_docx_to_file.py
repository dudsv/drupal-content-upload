import zipfile
import xml.etree.ElementTree as ET
import sys

# Set encoding to utf-8 for console output
sys.stdout.reconfigure(encoding='utf-8')

docx_path = "temp_analysis.docx"
output_path = "docx_content.txt"

try:
    with zipfile.ZipFile(docx_path) as z:
        xml_content = z.read('word/document.xml')
        tree = ET.fromstring(xml_content)
        
        # Namespaces
        ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
        
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(f"--- START OF DOCX CONTENT ---\n")
            for p in tree.iterfind('.//w:p', ns):
                texts = [node.text for node in p.iterfind('.//w:t', ns) if node.text]
                if texts:
                    line = ''.join(texts)
                    f.write(line + "\n")
            f.write("--- END OF DOCX CONTENT ---\n")
            
    print(f"Successfully wrote content to {output_path}")

except Exception as e:
    print(f"Error reading docx: {e}")
