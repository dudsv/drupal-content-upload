import { MODELS } from '../config/models.js';

export const getLatestComponentIndex = () => {
    const wrapper = document.querySelector('[data-drupal-selector="edit-field-article-lp-components-wrapper"]');
    if (!wrapper) return -1;
    const items = wrapper.querySelectorAll('[id^="field-article-lp-components-"][id$="-item-wrapper"]');
    if (items.length === 0) return -1;
    const indices = Array.from(items).map(item => {
        const match = item.id.match(/field-article-lp-components-(\d+)-item-wrapper/);
        return match ? parseInt(match[1], 10) : -1;
    }).filter(idx => idx >= 0);
    return Math.max(...indices);
};

export const getAddMoreButtonId = (drupalType) => {
    const typeMapping = {
        'c_text': 'c-text',
        'c_sideimagetext': 'c-sideimagetext-ttt',
        'c_signposting': 'c-signposting',
        'c_media': 'c-media',
        'c_products_list': 'c-products-list',
        'c_tabbed_content': 'c-tabbed-content',
        'c_accordion': 'accordion',
        'c_brand_carousel': 'c-brand-carousel',
        'c_document': 'c-document'
    };
    const mappedType = typeMapping[drupalType] || drupalType;
    const selector = `input[id^="field-article-lp-components-${mappedType}-add-more"]`;
    const button = document.querySelector(selector);
    if (button) return button.id;
    return null;
};

export const componentExists = (index) => {
    const wrapper = document.getElementById(`field-article-lp-components-${index}-item-wrapper`);
    return wrapper !== null;
};

export const waitForAjax = async (timeout = 15000) => {
    const start = Date.now();
    await new Promise(resolve => setTimeout(resolve, 200));
    while (Date.now() - start < timeout) {
        if (window.jQuery) {
            if (window.jQuery.active === 0) {
                await new Promise(resolve => setTimeout(resolve, 100));
                if (window.jQuery.active === 0) return true;
            }
        } else {
            const ajaxActive = document.querySelector('.ajax-progress') !== null;
            if (!ajaxActive) return true;
        }
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    return false;
};

export const createDrupalComponents = async (components, logs) => {
    if (!components || components.length === 0) {
        logs.push('[v1-Phase2] Nenhum componente para criar');
        return [];
    }
    const processedComponents = [];
    for (let i = 0; i < components.length; i++) {
        const component = components[i];
        const { drupalType, type } = component;
        const targetIndex = i;

        if (componentExists(targetIndex)) {
            logs.push(`ℹ️ Componente ${i} (${type}) já existe. Pulando criação.`);
            processedComponents.push({ ...component, index: targetIndex });
            continue;
        }

        logs.push(`[v1-Phase2] Componente ${i} ausente. Criando...`);
        const buttonId = getAddMoreButtonId(drupalType);
        if (!buttonId) {
            logs.push(`❌ Botão "Add more" não encontrado para ${drupalType}`);
            continue;
        }
        const button = document.getElementById(buttonId);
        if (!button) {
            logs.push(`❌ Botão não encontrado: ${buttonId}`);
            continue;
        }

        const dropWrapper = button.closest('.dropbutton-wrapper');
        if (dropWrapper) {
            const toggle = dropWrapper.querySelector('.dropbutton-toggle button');
            if (toggle && toggle.offsetParent !== null) {
                toggle.click();
                await new Promise(r => setTimeout(r, 600));
            }
        }

        logs.push(`🔄 Adicionando componente ${i + 1}/${components.length}: ${type} (${drupalType})`);
        try {
            button.scrollIntoView({ block: 'center', inline: 'center' });
            button.focus();
            button.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true, view: window }));
            button.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true, view: window }));
            button.click();
        } catch (e) {
            logs.push(`⚠️ Erro ao clicar: ${e.message}`);
            button.click();
        }

        const ajaxSuccess = await waitForAjax(15000);
        if (!ajaxSuccess) {
            logs.push(`⚠️ AJAX timeout para componente ${type}`);
            continue;
        }

        if (componentExists(targetIndex)) {
            logs.push(`✅ Componente ${i} criado com sucesso`);
            processedComponents.push({ ...component, index: targetIndex });
        } else {
            logs.push(`⚠️ Novo componente ${i} não detectado após AJAX`);
        }
        await new Promise(r => setTimeout(r, 500));
    }
    return processedComponents;
};

export const getCKE5Registry = () => {
    if (window.Drupal?.CKEditor5Instances) return window.Drupal.CKEditor5Instances;
    return null;
};

export const findCKInstance = (selector) => {
    const registry = getCKE5Registry();
    if (!registry) return null;
    if (registry.has(selector)) return registry.get(selector);
    const el = document.querySelector(selector);
    if (el) {
        for (const [key, instance] of registry) {
            if (instance.sourceElement === el) return instance;
        }
    }
    return null;
};

export const setRichText = async (selector, html, logs) => {
    const instance = findCKInstance(selector);
    if (instance) {
        instance.setData(html);
        logs.push(`✅ CKEditor definido para ${selector}`);
    } else {
        const el = document.querySelector(selector);
        if (el) {
            el.value = html;
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
            logs.push(`✅ Valor definido (fallback) para ${selector}`);
        } else {
            logs.push(`❌ Campo não encontrado: ${selector}`);
        }
    }
};

export const setInput = (selector, val, logs) => {
    const el = document.querySelector(selector);
    if (el) {
        el.value = val || '';
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
        logs.push(`✅ Input definido para ${selector}`);
    } else {
        logs.push(`❌ Input não encontrado: ${selector}`);
    }
};

export const fillComponentContent = async (componentIndex, content, logs) => {
    if (!content || content.trim() === '') {
        logs.push(`[v1-Phase2] Componente ${componentIndex}: conteúdo vazio, pulando`);
        return false;
    }
    const possibleSelectors = [
        `#field-article-lp-components-${componentIndex}-subform-field-text-0-value`,
        `#field-article-lp-components-${componentIndex}-subform-field-content-0-value`,
        `#field-article-lp-components-${componentIndex}-subform-field-body-0-value`
    ];
    for (const selector of possibleSelectors) {
        const field = document.querySelector(selector);
        if (field) {
            await setRichText(selector, content, logs);
            return true;
        }
    }
    logs.push(`⚠️ Campo de texto não encontrado no componente ${componentIndex}`);
    return false;
};

export const mapStandardToComponents = (intro, t1, t2, t3, i1, i2) => {
    const components = [];
    if (intro?.trim()) components.push({ index: 0, type: 'c_text', content: intro, label: 'Intro' });
    if (t1?.trim()) components.push({ index: 1, type: 'c_text', content: t1, label: 'Text Block 1' });
    if (i1?.trim()) components.push({ index: 2, type: 'c_sideimagetext', content: i1, label: 'Image+Text 1' });
    if (t2?.trim()) components.push({ index: 3, type: 'c_text', content: t2, label: 'Text Block 2' });
    if (i2?.trim()) components.push({ index: 4, type: 'c_sideimagetext', content: i2, label: 'Image+Text 2' });
    if (t3?.trim()) components.push({ index: 5, type: 'c_text', content: t3, label: 'Text Block 3' });
    return components;
};

export const createMissingComponents = async (neededComponents, logs) => {
    const missing = neededComponents.filter(comp => !componentExists(comp.index));
    if (missing.length === 0) {
        logs.push('[v1-Phase2.5] Todos os componentes já existem ✅');
        return true;
    }
    logs.push('');
    logs.push(`[v1-Phase2.5] 🔧 Criando ${missing.length} componente(s) faltante(s)...`);

    for (const comp of missing) {
        const buttonId = getAddMoreButtonId(comp.type);
        if (!buttonId) {
            logs.push(`❌ Botão não encontrado para ${comp.type}`);
            continue;
        }
        const button = document.getElementById(buttonId);
        if (!button) {
            logs.push(`❌ Botão ${buttonId} não existe`);
            continue;
        }
        const dropWrapper = button.closest('.dropbutton-wrapper');
        if (dropWrapper) {
            const toggle = dropWrapper.querySelector('.dropbutton-toggle button');
            if (toggle && toggle.offsetParent !== null) {
                toggle.click();
                await new Promise(r => setTimeout(r, 600));
            }
        }
        logs.push(`🔄 Criando ${comp.label} (index ${comp.index}, tipo ${comp.type})...`);
        try {
            button.scrollIntoView({ block: 'center', inline: 'center' });
            button.focus();
            button.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true, view: window }));
            button.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true, view: window }));
            button.click();
        } catch (e) {
            logs.push(`⚠️ Erro ao clicar: ${e.message}`);
            button.click();
        }
        const ajaxOk = await waitForAjax(15000);
        if (!ajaxOk) {
            logs.push(`⚠️ AJAX timeout para ${comp.label}`);
            continue;
        }
        if (componentExists(comp.index)) {
            logs.push(`✅ ${comp.label} criado com sucesso`);
        } else {
            logs.push(`⚠️ ${comp.label} não detectado após AJAX`);
        }
        await new Promise(r => setTimeout(r, 500));
    }
    return true;
};

export const fillDrupal = async (meta, { $intro, $t1, $t2, $t3, $i1, $i2 }) => {
    const logs = [];
    logs.push('Iniciando preenchimento...');

    if (meta.h1) {
        await setInput('input[name="title[0][value]"]', meta.h1, logs);
        await setInput('input[name="field_article_internal_title[0][value]"]', meta.h1, logs);
    }
    if (meta.metaTitle) await setInput('input[name="field_meta_tags[0][basic][title]"]', meta.metaTitle, logs);
    if (meta.metaDesc) await setInput('textarea[name="field_meta_tags[0][basic][description]"]', meta.metaDesc, logs);
    if (meta.ogTitle) await setInput('input[name="field_meta_tags[0][open_graph][og_title]"]', meta.ogTitle, logs);
    if (meta.ogDesc) await setInput('textarea[name="field_meta_tags[0][open_graph][og_description]"]', meta.ogDesc, logs);
    if (meta.urlAlias) await setInput('input[name="path[0][alias]"]', meta.urlAlias, logs);

    if (meta.components && meta.components.length > 0) {
        logs.push(`[v1-Phase2] Usando ${meta.components.length} componentes estruturados`);
        const created = await createDrupalComponents(meta.components, logs);
        for (const comp of created) {
            await fillComponentContent(comp.index, comp.content, logs);
        }
    } else {
        logs.push('[v1-Phase2] Usando lógica padrão (Intro, T1, I1...)');
        const intro = $intro.innerHTML;
        const t1 = $t1.innerHTML;
        const t2 = $t2.innerHTML;
        const t3 = $t3.innerHTML;
        const i1 = $i1.innerHTML;
        const i2 = $i2.innerHTML;

        const needed = mapStandardToComponents(intro, t1, t2, t3, i1, i2);
        await createMissingComponents(needed, logs);

        if (intro.trim()) await fillComponentContent(0, intro, logs);
        if (t1.trim()) await fillComponentContent(1, t1, logs);
        if (i1.trim()) await fillComponentContent(2, i1, logs);
        if (t2.trim()) await fillComponentContent(3, t2, logs);
        if (i2.trim()) await fillComponentContent(4, i2, logs);
        if (t3.trim()) await fillComponentContent(5, t3, logs);
    }
    return logs.join('\n');
};
