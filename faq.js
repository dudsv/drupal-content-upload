/**
 * FAQ/Accordion Drupal Filler
 * Script standalone para preencher componentes Accordion com conteúdo FAQ
 * 
 * Uso:
 * 1. Cole este script no console do navegador na página de edição do Drupal
 * 2. Cole o conteúdo FAQ na textarea que aparece
 * 3. Clique em "Processar FAQ"
 * 
 * Formato do conteúdo:
 * FAQ (ou FAQ Dogs, FAQ sobre gatos, etc.)
 * 
 * Pergunta termina com interrogação?
 * Resposta é o parágrafo seguinte.
 * 
 * Outra pergunta aqui?
 * Outra resposta aqui.
 * 
 * Texto após o FAQ vai para um novo c_text.
 */
(() => {
    'use strict';

    const ID = 'faq-filler';
    const VERSION = '1.0.0';

    // Remove painel anterior se existir
    document.getElementById(ID)?.remove();

    // ===== Estilos =====
    const styles = `
    #${ID} {
      position: fixed;
      top: 20px;
      right: 20px;
      width: 500px;
      max-height: 80vh;
      background: #1a1d24;
      border: 1px solid #333;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.5);
      font-family: system-ui, -apple-system, sans-serif;
      color: #eee;
      z-index: 2147483647;
      display: flex;
      flex-direction: column;
    }
    #${ID} .header {
      padding: 16px 20px;
      background: #15181e;
      border-radius: 12px 12px 0 0;
      border-bottom: 1px solid #333;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    #${ID} .header h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: #fff;
    }
    #${ID} .header .version {
      font-size: 11px;
      color: #666;
    }
    #${ID} .close-btn {
      background: none;
      border: none;
      color: #888;
      font-size: 24px;
      cursor: pointer;
      line-height: 1;
    }
    #${ID} .close-btn:hover { color: #fff; }
    #${ID} .body {
      padding: 20px;
      overflow-y: auto;
      flex: 1;
    }
    #${ID} textarea,
    #${ID} .rich-input {
      width: 100%;
      min-height: 150px;
      max-height: 300px;
      background: #1a1d23;
      border: 1px solid #333;
      color: #e0e0e0;
      border-radius: 8px;
      padding: 12px;
      font-size: 13px;
      resize: vertical;
      font-family: inherit;
      overflow-y: auto;
      box-sizing: border-box;
    }
    #${ID} .rich-input {
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    #${ID} .rich-input:empty::before {
      content: attr(data-placeholder);
      color: #666;
      pointer-events: none;
    }
    #${ID} .rich-input b, #${ID} .rich-input strong { font-weight: bold; }
    #${ID} .rich-input i, #${ID} .rich-input em { font-style: italic; }
    #${ID} .rich-input a { color: #4a9eff; text-decoration: underline; }
    #${ID} .rich-input h1,
    #${ID} .rich-input h2,
    #${ID} .rich-input h3,
    #${ID} .rich-input h4 { margin: 0.5em 0; font-weight: bold; }
    #${ID} .rich-input ul, #${ID} .rich-input ol { margin: 0.5em 0; padding-left: 20px; }
    #${ID} textarea:focus,
    #${ID} .rich-input:focus {
      outline: none;
      border-color: #2a6df5;
    }
    #${ID} .actions {
      display: flex;
      gap: 12px;
      margin-top: 16px;
    }
    #${ID} .btn {
      flex: 1;
      padding: 12px 20px;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }
    #${ID} .btn-primary {
      background: #2a6df5;
      color: #fff;
    }
    #${ID} .btn-primary:hover { background: #1a5de0; }
    #${ID} .btn-secondary {
      background: #2a2f3a;
      color: #ccc;
    }
    #${ID} .btn-secondary:hover { background: #3a4050; }
    #${ID} .log {
      margin-top: 16px;
      padding: 12px;
      background: #0d0f12;
      border-radius: 8px;
      font-size: 12px;
      max-height: 150px;
      overflow-y: auto;
      white-space: pre-wrap;
      font-family: 'Consolas', 'Monaco', monospace;
    }
    #${ID} .preview {
      margin-top: 16px;
      padding: 12px;
      background: #111;
      border: 1px solid #333;
      border-radius: 8px;
    }
    #${ID} .preview-item {
      padding: 8px 0;
      border-bottom: 1px solid #222;
    }
    #${ID} .preview-item:last-child { border-bottom: none; }
    #${ID} .preview-q {
      font-weight: 600;
      color: #4a9eff;
    }
    #${ID} .preview-a {
      color: #aaa;
      font-size: 12px;
      margin-top: 4px;
    }
    #${ID} .status {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 11px;
      margin-left: 8px;
    }
    #${ID} .status-success { background: #1a4d1a; color: #4caf50; }
    #${ID} .status-error { background: #4d1a1a; color: #f44336; }
    #${ID} .status-warning { background: #4d3d1a; color: #ff9800; }
  `;

    // ===== HTML do Painel =====
    const html = `
    <div class="header">
      <div>
        <h3>🗂️ FAQ/Accordion Filler</h3>
        <span class="version">v${VERSION}</span>
      </div>
      <button class="close-btn" id="${ID}-close">&times;</button>
    </div>
    <div class="body">
      <label style="display:block; margin-bottom:8px; color:#888;">Cole o conteúdo FAQ abaixo (suporta formatação HTML):</label>
      <div id="${ID}-input" class="rich-input" contenteditable="true" data-placeholder="FAQ Dogs&#10;&#10;What makes a dog intelligent?&#10;Dog intelligence is measured by adaptive problem-solving...&#10;&#10;Do smart dogs need special training?&#10;Yes – highly intelligent breeds thrive on structured mental challenges..."></div>
      
      <div class="actions">
        <button class="btn btn-secondary" id="${ID}-preview-btn">👁️ Preview</button>
        <button class="btn btn-primary" id="${ID}-process">🚀 Processar FAQ</button>
      </div>
      
      <div id="${ID}-preview" class="preview" style="display:none;"></div>
      <div id="${ID}-log" class="log" style="display:none;"></div>
    </div>
  `;

    // ===== Criar Painel =====
    const style = document.createElement('style');
    style.textContent = styles;
    document.head.appendChild(style);

    const panel = document.createElement('div');
    panel.id = ID;
    panel.innerHTML = html;
    document.body.appendChild(panel);

    // ===== Referências =====
    const $input = document.getElementById(`${ID}-input`);
    const $preview = document.getElementById(`${ID}-preview`);
    const $log = document.getElementById(`${ID}-log`);

    const log = (...args) => {
        const msg = args.join(' ');
        console.log(`[${ID}]`, msg);
        $log.style.display = 'block';
        $log.textContent += msg + '\n';
        $log.scrollTop = $log.scrollHeight;
    };

    // Helper to get content from contenteditable (preserves HTML)
    const getInputContent = () => {
        // Get raw HTML content
        return $input.innerHTML || '';
    };

    // Helper to get plain text (for question detection)
    const getInputText = () => {
        return $input.innerText || $input.textContent || '';
    };

    // Paste handler - preserve HTML formatting
    $input.addEventListener('paste', (e) => {
        e.preventDefault();
        const clipboardData = e.clipboardData || window.clipboardData;

        // Try to get HTML first, fallback to plain text
        let content = clipboardData.getData('text/html');

        if (content) {
            // Clean up the HTML - remove unwanted wrappers
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = content;

            // Remove style, script, and meta tags
            tempDiv.querySelectorAll('style, script, meta, link').forEach(el => el.remove());

            // Get the cleaned content
            content = tempDiv.innerHTML;
        } else {
            // Fallback to plain text, convert line breaks to <br>
            content = clipboardData.getData('text/plain');
            content = content.replace(/\n/g, '<br>');
        }

        // Insert at caret position
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            range.deleteContents();

            const fragment = document.createRange().createContextualFragment(content);
            range.insertNode(fragment);

            // Move caret to end
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
        } else {
            $input.innerHTML += content;
        }
    });

    // ===== Parser (HTML-aware) =====
    const parseFAQContent = (htmlContent) => {
        // Create a temporary container to work with HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;

        // Convert HTML to structured blocks
        // Each block represents a paragraph/line with its HTML content
        const blocks = [];

        const extractBlocks = (node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent.trim();
                if (text) {
                    // Split by line breaks in text nodes
                    const lines = text.split(/\n+/);
                    lines.forEach(line => {
                        if (line.trim()) {
                            blocks.push({ text: line.trim(), html: line.trim() });
                        }
                    });
                }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                const tagName = node.tagName.toLowerCase();

                // Block-level elements that may contain br-separated content
                if (['p', 'div'].includes(tagName)) {
                    const innerHTML = node.innerHTML;

                    // Check if this contains BR tags - if so, split by them
                    if (/<br\s*\/?>/i.test(innerHTML)) {
                        const segments = innerHTML.split(/<br\s*\/?>/i);
                        segments.forEach(segment => {
                            const tempSpan = document.createElement('span');
                            tempSpan.innerHTML = segment;
                            const text = tempSpan.innerText.trim();
                            if (text) {
                                blocks.push({ text, html: segment.trim() });
                            }
                        });
                    } else {
                        // No BRs - treat as single block
                        const text = node.innerText.trim();
                        const html = node.innerHTML.trim();
                        if (text) {
                            blocks.push({ text, html });
                        }
                    }
                } else if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName)) {
                    const text = node.innerText.trim();
                    const html = node.innerHTML.trim();
                    if (text) {
                        // Wrap in appropriate tag for headings
                        blocks.push({ text, html: `<${tagName}>${html}</${tagName}>` });
                    }
                } else if (tagName === 'li') {
                    const text = node.innerText.trim();
                    const html = node.innerHTML.trim();
                    if (text) {
                        blocks.push({ text, html });
                    }
                } else if (tagName === 'br') {
                    // BR alone creates separation (handled by split above)
                    return;
                } else if (tagName === 'ul' || tagName === 'ol') {
                    // Keep lists as single block with full HTML
                    const text = node.innerText.trim();
                    const html = node.outerHTML;
                    if (text) {
                        blocks.push({ text, html, isList: true });
                    }
                } else {
                    // Inline elements - process children
                    node.childNodes.forEach(child => extractBlocks(child));
                }
            }
        };

        // Process all children
        tempDiv.childNodes.forEach(child => extractBlocks(child));

        // If no blocks found, try splitting by line breaks in innerHTML
        if (blocks.length === 0) {
            const lines = htmlContent.split(/<br\s*\/?>/i);
            lines.forEach(line => {
                const tempSpan = document.createElement('span');
                tempSpan.innerHTML = line;
                const text = tempSpan.innerText.trim();
                if (text) {
                    blocks.push({ text, html: line.trim() });
                }
            });
        }

        if (blocks.length === 0) return null;

        let faqStartIndex = -1;
        let faqTitle = '';
        const items = [];
        let currentQuestion = null;
        let currentAnswerBlocks = [];
        let postContentBlocks = [];
        let faqEnded = false;

        // Find FAQ start
        for (let i = 0; i < blocks.length; i++) {
            if (/^FAQ\b/i.test(blocks[i].text)) {
                faqStartIndex = i;
                faqTitle = blocks[i].text;
                break;
            }
        }

        if (faqStartIndex === -1) {
            console.warn('[FAQ] No FAQ marker found');
            return null;
        }

        // Process blocks after FAQ title
        for (let i = faqStartIndex + 1; i < blocks.length; i++) {
            const block = blocks[i];
            const text = block.text;

            if (faqEnded) {
                postContentBlocks.push(block.html);
                continue;
            }

            // Check if this is a question (ends with ?)
            if (text.endsWith('?')) {
                // Save previous Q&A if exists
                if (currentQuestion !== null) {
                    items.push({
                        question: currentQuestion,
                        answer: currentAnswerBlocks.join('<br>')
                    });
                }
                currentQuestion = text;
                currentAnswerBlocks = [];
            } else {
                // This is part of an answer
                if (currentQuestion !== null) {
                    currentAnswerBlocks.push(block.html);
                }
            }

            // Look ahead: if no more questions after this, FAQ ends
            let hasMoreQuestions = false;
            for (let j = i + 1; j < blocks.length; j++) {
                if (blocks[j].text.endsWith('?')) {
                    hasMoreQuestions = true;
                    break;
                }
            }

            // If current is an answer and no more questions, FAQ section ends
            if (!text.endsWith('?') && !hasMoreQuestions && currentQuestion !== null) {
                items.push({
                    question: currentQuestion,
                    answer: currentAnswerBlocks.join('<br>')
                });
                currentQuestion = null;
                currentAnswerBlocks = [];
                faqEnded = true;
            }
        }

        // Handle case where FAQ goes to end of document
        if (currentQuestion !== null && !faqEnded) {
            items.push({
                question: currentQuestion,
                answer: currentAnswerBlocks.join('<br>')
            });
        }

        if (items.length === 0) {
            console.warn('[FAQ] FAQ title found but no Q&A items detected');
            return null;
        }

        return {
            faqTitle,
            items,
            postContent: postContentBlocks.join('<br>')
        };
    };

    // ===== AJAX Helper (from v1.js) =====
    const waitForAjax = async (timeout = 15000, retries = 1) => {
        const check = async () => {
            const start = Date.now();
            // 1. Wait for potential AJAX start (stabilization)
            await new Promise(resolve => setTimeout(resolve, 200));

            while (Date.now() - start < timeout) {
                if (window.jQuery) {
                    if (window.jQuery.active === 0) {
                        // Double check: wait a bit more to ensure it's really done
                        await new Promise(resolve => setTimeout(resolve, 100));
                        if (window.jQuery.active === 0) return true;
                    }
                } else {
                    // Fallback if jQuery not present (shouldn't happen in Drupal admin)
                    const ajaxActive = document.querySelector('.ajax-progress') !== null;
                    if (!ajaxActive) return true;
                }
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            return false;
        };

        for (let i = 0; i <= retries; i++) {
            if (i > 0) console.log(`[faq-filler] Retrying AJAX wait (attempt ${i}/${retries})...`);
            const success = await check();
            if (success) return true;
        }

        console.warn('[faq-filler] AJAX timeout after', timeout, 'ms and', retries, 'retries');
        return false;
    };

    // ===== Create Text Component =====
    const createTextComponent = async (content, isH2 = false) => {
        log(`📝 Criando componente de texto${isH2 ? ' (H2)' : ''}...`);

        // Find the MAIN "Add Text" button (at page component level, NOT inside any subform)
        let addBtn = null;

        // Helper to check if button is at main level (NOT inside subform)
        const isMainLevelButton = (btn) => {
            // Button ID should NOT contain 'subform' (which indicates it's inside a component)
            if (btn.id && btn.id.includes('subform')) return false;
            // Button name should NOT contain 'subform'
            if (btn.name && btn.name.includes('subform')) return false;
            // Should NOT be inside any element with 'subform' in ID
            const subformParent = btn.closest('[id*="subform"]');
            if (subformParent) return false;
            // Should NOT be inside c-subitems
            const subitemsParent = btn.closest('[id*="c-subitems"]');
            if (subitemsParent) return false;
            // Should NOT be inside column-first
            const columnParent = btn.closest('[id*="column-first"]');
            if (columnParent) return false;
            return true;
        };

        // Priority 1: Find the main paragraph add-more wrapper (at page level)
        // Pattern: field-article-lp-components-add-more-wrapper (NOT inside any subform)
        const mainAddWrapper = document.querySelector('#field-article-lp-components-add-more-wrapper') ||
            document.querySelector('[id^="field-article-lp-components-add-more"]:not([id*="subform"])');

        if (mainAddWrapper) {
            log(`🔍 Wrapper principal encontrado: ${mainAddWrapper.id}`);
            const btns = mainAddWrapper.querySelectorAll('input[type="submit"]');
            for (const btn of btns) {
                if (btn.value && /^text$|add.*text/i.test(btn.value) && isMainLevelButton(btn)) {
                    addBtn = btn;
                    log(`✅ Botão encontrado no wrapper principal: ${btn.value}`);
                    break;
                }
            }
        }

        // Priority 2: Search all buttons but strictly filter for main level only
        if (!addBtn) {
            const allBtns = document.querySelectorAll('input[type="submit"]');
            for (const btn of allBtns) {
                if (btn.value && /^text$|add.*text/i.test(btn.value) && isMainLevelButton(btn)) {
                    addBtn = btn;
                    log(`✅ Botão encontrado (busca geral): ${btn.value}`);
                    break;
                }
            }
        }

        // Priority 3: Fallback - look in dropbuttons
        if (!addBtn) {
            const dropButtons = document.querySelectorAll('.dropbutton-widget input[type="submit"]');
            for (const btn of dropButtons) {
                if (btn.value && /^text$|add.*text/i.test(btn.value) && isMainLevelButton(btn)) {
                    addBtn = btn;
                    log(`✅ Botão encontrado em dropbutton: ${btn.value}`);
                    break;
                }
            }
        }

        if (!addBtn) {
            log('⚠️ Botão "Add Text" não encontrado');
            return false;
        }

        log(`✅ Botão encontrado: ${addBtn.value}`);

        // Handle dropbutton if needed
        const dropWrapper = addBtn.closest('.dropbutton-wrapper');
        if (dropWrapper) {
            const toggle = dropWrapper.querySelector('.dropbutton-toggle button');
            if (toggle && toggle.offsetParent !== null) {
                toggle.click();
                await new Promise(r => setTimeout(r, 500));
            }
        }

        // Click the button
        addBtn.scrollIntoView({ block: 'center' });
        await new Promise(r => setTimeout(r, 200));
        addBtn.focus();
        addBtn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true, view: window }));
        addBtn.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true, view: window }));
        addBtn.click();

        await waitForAjax(15000);
        await new Promise(r => setTimeout(r, 1500));

        // Find the new text field (the last c_text component at MAIN level, NOT inside subitems)
        // Get all c_text subform wrappers
        const allTextWrappers = document.querySelectorAll('[id*="c-text"][id*="subform"]');
        log(`🔍 Found ${allTextWrappers.length} c_text subform wrappers`);

        // Filter to only main-level components (NOT inside subitems/accordion items)
        const mainLevelWrappers = Array.from(allTextWrappers).filter(wrapper => {
            // Must NOT be inside any c-subitems path
            if (wrapper.closest('[id*="c-subitems"]')) return false;
            // Must NOT be inside column-first (accordion answer field)
            if (wrapper.closest('[id*="column-first"]')) return false;
            // Check if ID pattern suggests main level (field-article-lp-components-N-subform)
            // Main level IDs look like: edit-field-article-lp-components-5-subform-field-c-text-wrapper
            const id = wrapper.id || '';
            // If it has multiple "subform" segments (nested), exclude it
            const subformCount = (id.match(/subform/gi) || []).length;
            if (subformCount > 1) return false;
            return true;
        });

        log(`🔍 Main level c_text wrappers: ${mainLevelWrappers.length}`);

        const lastTextWrapper = mainLevelWrappers[mainLevelWrappers.length - 1];

        if (!lastTextWrapper) {
            log('⚠️ Novo componente de texto não encontrado no nível principal');
            log('   IDs encontrados (primeiros 3):');
            Array.from(allTextWrappers).slice(0, 3).forEach(w => log(`   - ${w.id}`));
            return false;
        }

        log(`✅ Wrapper encontrado: ${lastTextWrapper.id}`);

        // Find the CKEditor or textarea inside this wrapper
        let contentField = lastTextWrapper.querySelector('.ck-editor__editable') ||
            lastTextWrapper.closest('[id*="item-wrapper"]')?.querySelector('.ck-editor__editable') ||
            lastTextWrapper.querySelector('textarea[id*="c-text"]');

        if (!contentField) {
            // Try finding in the parent wrapper
            const parentWrapper = lastTextWrapper.closest('[id*="item-wrapper"]');
            if (parentWrapper) {
                contentField = parentWrapper.querySelector('.ck-editor__editable');
                log(`🔍 Procurando no parent wrapper: ${parentWrapper.id}`);
            }
        }

        if (!contentField) {
            log('⚠️ Campo de texto não encontrado no componente');
            log(`   Wrapper ID: ${lastTextWrapper.id}`);
            return false;
        }

        // Format content - preserve existing HTML, only wrap if needed
        let htmlContent;
        if (isH2) {
            // Title: always wrap in h2
            htmlContent = `<h2>${content}</h2>`;
        } else {
            // Check if content already has HTML tags
            const hasHtmlTags = /<[^>]+>/.test(content);
            if (hasHtmlTags) {
                // Content already has HTML formatting, use as-is
                // But wrap in p if it doesn't start with a block element
                const startsWithBlock = /^<(p|div|h[1-6]|ul|ol|blockquote)/i.test(content.trim());
                htmlContent = startsWithBlock ? content : `<p>${content}</p>`;
            } else {
                // Plain text - wrap in paragraph, convert line breaks to <br>
                htmlContent = `<p>${content.replace(/\n/g, '<br>')}</p>`;
            }
        }

        // Fill using CKEditor 5 API
        if (contentField.classList.contains('ck-editor__editable')) {
            let filled = false;

            // Try Drupal CKEditor5Instances
            if (typeof Drupal !== 'undefined' && Drupal.CKEditor5Instances) {
                for (const [id, instance] of Drupal.CKEditor5Instances.entries()) {
                    const editableEl = instance.ui?.view?.editable?.element ||
                        instance.editing?.view?.getDomRoot();
                    if (editableEl === contentField || editableEl?.contains(contentField) || contentField.contains(editableEl)) {
                        try {
                            instance.setData(htmlContent);
                            log(`   ✅ Conteúdo preenchido (CKEditor 5 API)`);
                            filled = true;
                        } catch (e) {
                            log(`   ⚠️ CKEditor setData falhou: ${e.message}`);
                        }
                        break;
                    }
                }
            }

            // Fallback: DOM manipulation
            if (!filled) {
                contentField.focus();
                await new Promise(r => setTimeout(r, 300));
                contentField.innerHTML = htmlContent;
                contentField.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText' }));
                log(`   ✅ Conteúdo preenchido (DOM)`);
            }
        } else {
            // Textarea
            contentField.value = content;
            contentField.dispatchEvent(new Event('input', { bubbles: true }));
            contentField.dispatchEvent(new Event('change', { bubbles: true }));
            log(`   ✅ Conteúdo preenchido (textarea)`);
        }

        return true;
    };

    // ===== Drupal Filler =====
    const fillAccordion = async (faqTitle, items, postContent) => {
        log('🔍 Procurando Accordion existente...');

        // Step 1: Create text component with FAQ title (H2) if title exists
        if (faqTitle && faqTitle.trim()) {
            log('\n📝 Criando componente de texto com título FAQ...');
            await createTextComponent(faqTitle.trim(), true);
            await new Promise(r => setTimeout(r, 500));
        }

        // First, look for existing accordion by checking all paragraph wrappers
        let accordionWrapper = null;
        let accordionIndex = -1;

        // Try to find accordion by looking for field-c-subitems (characteristic of accordion)
        const subitemsField = document.querySelector('[id*="field-c-subitems"]');
        if (subitemsField) {
            accordionWrapper = subitemsField.closest('[id*="item-wrapper"]');
            if (accordionWrapper) {
                const match = accordionWrapper.id.match(/paragraphs-(\d+)-/);
                if (match) accordionIndex = parseInt(match[1], 10);
                log(`✅ Accordion encontrado: ${accordionWrapper.id}`);
            }
        }

        // Alternative: look for accordion in wrapper IDs
        if (!accordionWrapper) {
            const wrappers = document.querySelectorAll('[id*="item-wrapper"]');
            for (const wrapper of wrappers) {
                const hasSubitems = wrapper.querySelector('[id*="c-subitems"]');
                const isAccordion = wrapper.id.toLowerCase().includes('accordion');
                if (hasSubitems || isAccordion) {
                    accordionWrapper = wrapper;
                    const match = wrapper.id.match(/paragraphs-(\d+)-/);
                    if (match) accordionIndex = parseInt(match[1], 10);
                    log(`✅ Accordion encontrado via wrapper: ${wrapper.id}`);
                    break;
                }
            }
        }

        // If no accordion found, try to create one
        if (!accordionWrapper) {
            log('⚠️ Accordion não encontrado. Tentando criar...');

            // Find the "Add Accordion" button - check all possible locations
            const addAccordionSelectors = [
                'input[id*="accordion-add-more"]',
                'input[id*="components-accordion"]',
                'input[value*="Accordion"]',
                'input[value*="Add Content: Accordion"]'
            ];

            let addBtn = null;
            for (const sel of addAccordionSelectors) {
                const btns = document.querySelectorAll(sel);
                for (const btn of btns) {
                    if (btn.type === 'submit') {
                        addBtn = btn;
                        log(`✅ Botão "Add Accordion" encontrado: ${btn.value || btn.id}`);
                        break;
                    }
                }
                if (addBtn) break;
            }

            // Fallback: search in dropbuttons
            if (!addBtn) {
                const allDropButtons = document.querySelectorAll('.dropbutton-widget input[type="submit"], .paragraphs-add-wrapper input');
                for (const btn of allDropButtons) {
                    if (btn.value && btn.value.toLowerCase().includes('accordion')) {
                        addBtn = btn;
                        log(`✅ Botão encontrado em dropbutton: ${btn.value}`);
                        break;
                    }
                }
            }

            if (addBtn) {
                // Handle dropbutton toggle if needed
                const dropWrapper = addBtn.closest('.dropbutton-wrapper');
                if (dropWrapper) {
                    const toggle = dropWrapper.querySelector('.dropbutton-toggle button');
                    if (toggle && toggle.offsetParent !== null) {
                        log('📂 Abrindo dropdown...');
                        toggle.click();
                        await new Promise(r => setTimeout(r, 800)); // More time for dropdown to fully open
                    }
                }

                log('🔄 Criando componente Accordion...');
                log(`   Clicando em: ${addBtn.value || addBtn.id}`);

                // Robust click sequence
                addBtn.scrollIntoView({ block: 'center', inline: 'center' });
                await new Promise(r => setTimeout(r, 300));

                addBtn.focus();
                await new Promise(r => setTimeout(r, 100));

                // Dispatch full event sequence
                addBtn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true, view: window }));
                await new Promise(r => setTimeout(r, 50));
                addBtn.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true, view: window }));
                await new Promise(r => setTimeout(r, 50));
                addBtn.click();

                // Also try direct form submit trigger (Drupal AJAX handler)
                if (addBtn.form) {
                    const formData = new FormData(addBtn.form);
                    // Just trigger the change
                }

                // Wait for AJAX and give more time for DOM update
                await waitForAjax(15000);
                await new Promise(r => setTimeout(r, 2000));

                // Try multiple detection methods for newly created accordion
                log('🔍 Procurando Accordion recém-criado...');

                // Method 1: Look for field-c-subitems
                let newSubitemsField = document.querySelector('[id*="field-c-subitems"]');
                if (newSubitemsField) {
                    accordionWrapper = newSubitemsField.closest('[id*="item-wrapper"]');
                    if (accordionWrapper) {
                        const match = accordionWrapper.id.match(/paragraphs-(\d+)-/);
                        if (match) accordionIndex = parseInt(match[1], 10);
                        log(`✅ Novo Accordion encontrado via field-c-subitems: ${accordionWrapper.id}`);
                    }
                }

                // Method 2: Look for newest item-wrapper that wasn't there before
                if (!accordionWrapper) {
                    const allWrappers = document.querySelectorAll('[id*="item-wrapper"]');
                    for (const w of allWrappers) {
                        // Find the highest numbered paragraph
                        const match = w.id.match(/paragraphs-(\d+)-item-wrapper/);
                        if (match) {
                            const idx = parseInt(match[1], 10);
                            if (idx > accordionIndex) {
                                accordionIndex = idx;
                                accordionWrapper = w;
                            }
                        }
                    }
                    if (accordionWrapper) {
                        log(`✅ Novo Accordion encontrado via index máximo: ${accordionWrapper.id}`);
                    }
                }

                // Method 3: Look for any new paragraph that appeared
                if (!accordionWrapper) {
                    const allParagraphs = document.querySelectorAll('.paragraph-type--accordion, [class*="accordion"]');
                    if (allParagraphs.length > 0) {
                        accordionWrapper = allParagraphs[allParagraphs.length - 1].closest('[id*="item-wrapper"]');
                        if (accordionWrapper) {
                            log(`✅ Novo Accordion encontrado via classe: ${accordionWrapper.id}`);
                        }
                    }
                }

                // Debug: if still not found, show what exists
                if (!accordionWrapper) {
                    const allWrappers = document.querySelectorAll('[id*="paragraphs-"][id*="-item-wrapper"]');
                    log(`⚠️ ${allWrappers.length} item-wrapper(s) encontrado(s):`);
                    for (const w of Array.from(allWrappers).slice(0, 5)) {
                        log(`   - ${w.id}`);
                    }
                }
            }

            if (!accordionWrapper) {
                log('❌ Não foi possível detectar o Accordion após criação!');
                log('💡 O Accordion pode ter sido criado mas está colapsado.');
                log('💡 Tente expandir o formulário manualmente e rode o script novamente.');
                return false;
            }
        }

        // Expand accordion if collapsed (click Edit button)
        const editBtnSelector = 'input[value="Modifier"], input[value="Edit"], input[value="Bewerken"], input[value="Editar"], input[id*="edit--"]';
        const editBtn = accordionWrapper.querySelector(editBtnSelector);
        if (editBtn) {
            log('📂 Expandindo formulário do Accordion...');
            editBtn.click();
            await waitForAjax(10000);
            await new Promise(r => setTimeout(r, 500));
        }

        // Find add subitem button within the accordion (NOT inside existing subitems)
        // The button should be at accordion level, not inside field-column-first
        let addSubitemBtn = null;

        // Primary selectors based on actual Drupal button patterns
        const subitemBtnSelectors = [
            'input[value="Add another Accordion Item"]',
            'input[id*="add-more-add-more-button"]',
            'input[name*="field_c_subitems_add_more"]',
            'input[id*="c-subitems-add-more"]:not([id*="column-first"])'
        ];

        for (const sel of subitemBtnSelectors) {
            try {
                addSubitemBtn = accordionWrapper.querySelector(sel);
                if (!addSubitemBtn) addSubitemBtn = document.querySelector(sel);
                if (addSubitemBtn) {
                    log(`✅ Botão "Add Subitem" encontrado: ${addSubitemBtn.value}`);
                    break;
                }
            } catch (e) {
                // Invalid selector, skip
            }
        }

        // Fallback: Look for the subitems add-more wrapper
        if (!addSubitemBtn) {
            const subitemsAddMoreWrapper = accordionWrapper.querySelector('[id*="field-c-subitems-add-more"]');
            if (subitemsAddMoreWrapper) {
                addSubitemBtn = subitemsAddMoreWrapper.querySelector('input[type="submit"]');
                if (addSubitemBtn) {
                    log(`✅ Botão encontrado no wrapper: ${addSubitemBtn.value}`);
                }
            }
        }

        // Fallback: search all submit buttons in accordion but EXCLUDE those inside subitems
        if (!addSubitemBtn) {
            // Find all add buttons at the accordion level
            const allInputs = accordionWrapper.querySelectorAll('input[type="submit"][id*="add-more"]');
            for (const inp of allInputs) {
                // Skip buttons inside column-first (those are for content inside subitems)
                if (inp.id.includes('column-first') || inp.id.includes('c-text-add')) continue;
                // Skip if it's inside a subitem subform
                const inSubitem = inp.closest('[id*="c-subitems-"][id*="-subform"]');
                if (inSubitem && !inp.id.includes('c-subitems-add-more')) continue;

                if (inp.value && /add|ajouter|toevoegen/i.test(inp.value)) {
                    addSubitemBtn = inp;
                    log(`✅ Botão encontrado via fallback: ${inp.value}`);
                    break;
                }
            }
        }

        if (!addSubitemBtn) {
            log('⚠️ Botão "Add subitem" não encontrado. Tentando preencher items existentes...');
        }

        // Helper function to get all subitem wrappers (top-level only)
        function getSubitemWrappers() {
            // Get all potential wrappers
            const all = accordionWrapper.querySelectorAll('[id*="c-subitems-"][id*="-subform"]');
            const result = [];
            const seenIndices = new Set();

            for (const el of all) {
                // Skip nested column-first elements
                if (el.id.includes('column-first')) continue;
                // Skip elements inside other subitems (nested)
                if (el.closest('[id*="c-subitems-"][id*="-subform"]') !== el) continue;
                // Extract index to avoid duplicates
                const match = el.id.match(/c-subitems-(\d+)/);
                if (match && !seenIndices.has(match[1])) {
                    seenIndices.add(match[1]);
                    result.push(el);
                }
            }
            return result;
        }

        // Process each FAQ item
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            log(`📝 Item ${i + 1}/${items.length}: "${item.question.substring(0, 40)}..."`);

            // Get current subitems count
            let existingSubitems = getSubitemWrappers();
            log(`   📊 Subitems existentes: ${existingSubitems.length}`);

            // If we need more subitems, add one
            if (existingSubitems.length < i + 1 && addSubitemBtn) {
                log(`   ➕ Adicionando subitem (atual: ${existingSubitems.length}, precisa: ${i + 1})...`);

                // Handle dropbutton
                const dropWrapper = addSubitemBtn.closest('.dropbutton-wrapper');
                if (dropWrapper) {
                    const toggle = dropWrapper.querySelector('.dropbutton-toggle button');
                    if (toggle && toggle.offsetParent !== null) {
                        toggle.click();
                        await new Promise(r => setTimeout(r, 400));
                    }
                }

                // Re-find button (may have changed after AJAX)
                let currentBtn = document.querySelector('input[value="Add another Accordion Item"]') ||
                    document.querySelector('input[id*="add-more-add-more-button"]');
                if (!currentBtn) currentBtn = addSubitemBtn;

                currentBtn.scrollIntoView({ block: 'center' });
                await new Promise(r => setTimeout(r, 200));

                // Robust click
                currentBtn.focus();
                currentBtn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true, view: window }));
                currentBtn.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true, view: window }));
                currentBtn.click();

                await waitForAjax(15000);
                await new Promise(r => setTimeout(r, 1500));

                // Verify new subitem was created
                const newSubitems = getSubitemWrappers();
                if (newSubitems.length > existingSubitems.length) {
                    log(`   ✅ Novo subitem criado (total: ${newSubitems.length})`);
                    existingSubitems = newSubitems;
                } else {
                    log(`   ⚠️ Subitem não foi criado - verifique manualmente`);
                }
            }

            // Get the current subitem wrapper (use the i-th one in the list)
            const currentSubitem = existingSubitems[i];
            if (!currentSubitem) {
                log(`   ❌ Subitem ${i} não encontrado, pulando...`);
                continue;
            }

            // Extract the subitem index from its ID (may not be sequential)
            const subitemIdMatch = currentSubitem.id.match(/c-subitems-(\d+)/);
            const subitemIndex = subitemIdMatch ? subitemIdMatch[1] : i;
            log(`   🔍 Usando subitem índice: ${subitemIndex}`);

            // Fill Title (Question) - search within this specific subitem
            let titleField = currentSubitem.querySelector('input[id*="c-title-0-value"]') ||
                currentSubitem.querySelector('input[id*="c-title"]');

            // Fallback: search by the extracted index
            if (!titleField) {
                const titleSelectors = [
                    `input[id*="c-subitems-${subitemIndex}-subform-field-c-title-0-value"]`,
                    `input[id*="c-subitems-${subitemIndex}"][id*="c-title"]`,
                    `input[name*="c_subitems][${subitemIndex}][subform][field_c_title]"]`
                ];
                for (const sel of titleSelectors) {
                    titleField = document.querySelector(sel);
                    if (titleField) break;
                }
            }

            if (titleField) {
                titleField.value = item.question;
                titleField.dispatchEvent(new Event('input', { bubbles: true }));
                titleField.dispatchEvent(new Event('change', { bubbles: true }));
                log(`   ✅ Título preenchido`);
            } else {
                log(`   ⚠️ Campo de título não encontrado`);
                // Debug: show available inputs in this subitem
                const debug = currentSubitem.querySelectorAll('input[type="text"]');
                if (debug.length > 0) {
                    log(`   📋 Inputs disponíveis: ${Array.from(debug).slice(0, 3).map(x => x.id).join(', ')}`);
                }
            }

            // ===== NEW: Add Content: Text inside field-column-first =====
            // The content field doesn't exist by default - we need to click "Add Content: Text" first
            // Pattern: field-article-lp-components-{ACC}-subform-field-c-subitems-{i}-subform-field-column-first-c-text-add-more

            let contentField = null;

            // First check if content already exists within currentSubitem
            contentField = currentSubitem.querySelector('.ck-editor__editable') ||
                currentSubitem.querySelector('textarea[id*="c-text"]') ||
                currentSubitem.querySelector('[id*="field-column-first"] .ck-editor__editable');

            if (contentField) {
                log(`   📋 Campo de conteúdo já existe`);
            }

            // If no content field, click "Add Content: Text"
            if (!contentField) {
                log(`   ➕ Adicionando Content: Text...`);

                // Search for "Add Content: Text" button within the current subitem
                let addContentBtn = null;

                // First try specific selectors within currentSubitem
                addContentBtn = currentSubitem.querySelector('input[id*="c-text-add-more"]') ||
                    currentSubitem.querySelector('input[value*="Add Content: Text"]') ||
                    currentSubitem.querySelector('input[value*="Text"]');

                // Fallback: search all submit buttons in this subitem
                if (!addContentBtn) {
                    const btns = currentSubitem.querySelectorAll('input[type="submit"]');
                    for (const btn of btns) {
                        if (btn.value && /add content.*text|add.*text|^text$/i.test(btn.value)) {
                            addContentBtn = btn;
                            break;
                        }
                    }
                }

                if (addContentBtn) {
                    log(`   🔘 Clicando: ${addContentBtn.value}`);

                    // Handle dropbutton if needed
                    const dropWrapper = addContentBtn.closest('.dropbutton-wrapper');
                    if (dropWrapper) {
                        const toggle = dropWrapper.querySelector('.dropbutton-toggle button');
                        if (toggle && toggle.offsetParent !== null) {
                            toggle.click();
                            await new Promise(r => setTimeout(r, 500));
                        }
                    }

                    addContentBtn.scrollIntoView({ block: 'center' });
                    await new Promise(r => setTimeout(r, 200));

                    // Robust click
                    addContentBtn.focus();
                    addContentBtn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true, view: window }));
                    addContentBtn.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true, view: window }));
                    addContentBtn.click();

                    await waitForAjax(15000, 2);
                    await new Promise(r => setTimeout(r, 1000));

                    // Now find the newly created content field within currentSubitem
                    contentField = currentSubitem.querySelector('.ck-editor__editable') ||
                        currentSubitem.querySelector('textarea[id*="c-text"]');

                    // Refresh subitem reference (DOM may have changed)
                    if (!contentField) {
                        const refreshedSubitem = document.querySelector(`[id*="c-subitems-${subitemIndex}-subform"]`);
                        if (refreshedSubitem) {
                            contentField = refreshedSubitem.querySelector('.ck-editor__editable') ||
                                refreshedSubitem.querySelector('textarea[id*="c-text"]');
                        }
                    }
                } else {
                    log(`   ⚠️ Botão "Add Content: Text" não encontrado`);
                    // Debug: show available buttons
                    const btns = currentSubitem.querySelectorAll('input[type="submit"]');
                    log(`   📋 Botões disponíveis: ${Array.from(btns).slice(0, 3).map(x => x.value).join(', ')}`);
                }
            }

            // Fill content field using CKEditor 5 API
            if (contentField) {
                let filled = false;

                // Try CKEditor 5 API first
                if (contentField.classList.contains('ck-editor__editable') || contentField.ckeditorInstance) {
                    // Find CKEditor instance
                    let ckInstance = contentField.ckeditorInstance;

                    if (!ckInstance) {
                        // Try to find via Drupal.CKEditor5Instances
                        if (typeof Drupal !== 'undefined' && Drupal.CKEditor5Instances) {
                            for (const [id, instance] of Drupal.CKEditor5Instances.entries()) {
                                const editableEl = instance.ui?.view?.editable?.element ||
                                    instance.editing?.view?.getDomRoot();
                                if (editableEl === contentField || editableEl?.contains(contentField) || contentField.contains(editableEl)) {
                                    ckInstance = instance;
                                    break;
                                }
                            }
                        }
                    }

                    if (ckInstance) {
                        try {
                            // Format answer - preserve HTML if present
                            const hasHtmlTags = /<[^>]+>/.test(item.answer);
                            let answerHtml;
                            if (hasHtmlTags) {
                                // Already has HTML, check if wrapped in block element
                                const startsWithBlock = /^<(p|div|ul|ol|blockquote)/i.test(item.answer.trim());
                                answerHtml = startsWithBlock ? item.answer : `<p>${item.answer}</p>`;
                            } else {
                                answerHtml = `<p>${item.answer}</p>`;
                            }
                            ckInstance.setData(answerHtml);
                            log(`   ✅ Resposta preenchida (CKEditor 5 API)`);
                            filled = true;
                        } catch (e) {
                            log(`   ⚠️ CKEditor setData falhou: ${e.message}`);
                        }
                    }

                    // Fallback: direct DOM manipulation for CKEditor
                    if (!filled) {
                        contentField.focus();
                        await new Promise(r => setTimeout(r, 300));

                        // Clear existing content
                        contentField.innerHTML = '';

                        // Format answer - preserve HTML if present
                        const hasHtmlTags = /<[^>]+>/.test(item.answer);
                        if (hasHtmlTags) {
                            // Already has HTML - use innerHTML
                            const startsWithBlock = /^<(p|div|ul|ol|blockquote)/i.test(item.answer.trim());
                            contentField.innerHTML = startsWithBlock ? item.answer : `<p>${item.answer}</p>`;
                        } else {
                            // Plain text - create paragraph
                            const p = document.createElement('p');
                            p.textContent = item.answer;
                            contentField.appendChild(p);
                        }

                        // Trigger input event
                        contentField.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText' }));
                        log(`   ✅ Resposta preenchida (DOM direto)`);
                        filled = true;
                    }
                } else {
                    // Regular textarea - use HTML content directly
                    const hasHtmlTags = /<[^>]+>/.test(item.answer);
                    contentField.value = hasHtmlTags ? item.answer : item.answer;
                    contentField.dispatchEvent(new Event('input', { bubbles: true }));
                    contentField.dispatchEvent(new Event('change', { bubbles: true }));
                    log(`   ✅ Resposta preenchida (textarea)`);
                    filled = true;
                }
            } else {
                log(`   ⚠️ Campo de conteúdo não encontrado para item ${i}`);
            }

            await new Promise(r => setTimeout(r, 300));
        }

        // Create post-FAQ text component if there's content after the FAQ
        if (postContent && postContent.trim()) {
            log('\n📝 Criando componente de texto pós-FAQ...');
            await createTextComponent(postContent.trim(), false);
        }

        log(`\n🎉 FAQ processado com ${items.length} items!`);
        return true;
    };

    // ===== Event Handlers =====
    document.getElementById(`${ID}-close`).onclick = () => {
        panel.remove();
        style.remove();
    };

    document.getElementById(`${ID}-preview-btn`).onclick = () => {
        const content = $input.innerHTML.trim();
        const hasText = $input.innerText.trim();
        if (!hasText) {
            alert('Cole o conteúdo FAQ primeiro!');
            return;
        }

        const parsed = parseFAQContent(content);
        if (!parsed) {
            $preview.innerHTML = '<span style="color:#f44336;">❌ Nenhum FAQ detectado. Verifique o formato.</span>';
            $preview.style.display = 'block';
            return;
        }

        $preview.innerHTML = `
      <div style="margin-bottom:10px;"><b>Título:</b> ${parsed.faqTitle}</div>
      <div style="margin-bottom:10px;"><b>${parsed.items.length} pergunta(s) detectada(s):</b></div>
      ${parsed.items.map((item, i) => `
        <div class="preview-item">
          <div class="preview-q">${i + 1}. ${item.question}</div>
          <div class="preview-a">${item.answer.substring(0, 100)}${item.answer.length > 100 ? '...' : ''}</div>
        </div>
      `).join('')}
      ${parsed.postContent ? `<div style="margin-top:10px; color:#888;"><b>Texto pós-FAQ:</b> ${parsed.postContent.substring(0, 100)}...</div>` : ''}
    `;
        $preview.style.display = 'block';
    };

    document.getElementById(`${ID}-process`).onclick = async () => {
        $log.textContent = '';
        $log.style.display = 'none';

        const content = $input.innerHTML.trim();
        const hasText = $input.innerText.trim();
        if (!hasText) {
            alert('Cole o conteúdo FAQ primeiro!');
            return;
        }

        const parsed = parseFAQContent(content);
        if (!parsed) {
            log('❌ Nenhum FAQ detectado. Verifique o formato.');
            return;
        }

        log(`📋 FAQ detectado: "${parsed.faqTitle}"`);
        log(`📊 ${parsed.items.length} pergunta(s) encontrada(s)`);
        log('');

        try {
            await fillAccordion(parsed.faqTitle, parsed.items, parsed.postContent);
        } catch (e) {
            log(`❌ Erro: ${e.message}`);
            console.error(e);
        }
    };

    log('FAQ/Accordion Filler inicializado.');
    log('Cole o conteúdo FAQ e clique em "Processar FAQ".');

})();
