# PRD: Fase 2 - Suporte a Componentes Especiais

**Versão:** 1.0  
**Data:** 2025-12-01  
**Autor:** Development Team  
**Status:** 🔵 Aguardando Fase 1  
**Dependências:** ✅ Fase 1 (Suporte Básico) completa

---

## 🎯 Objetivo

Implementar suporte completo aos marcadores `[COMPONENT: ...]` do template.docx, permitindo criação automática de componentes Drupal especializados (Contact Us, Image Gallery, etc.) e mapeamento de categorias/taxonomies.

### Métricas de Sucesso

- ✅ Todos os tipos de `[COMPONENT: ...]` identificados e mapeados
- ✅ Componentes especiais criados automaticamente no Drupal
- ✅ Categoria extraída e aplicada (se campo disponível)
- ✅ 100% dos componentes do template.docx processados

---

## 📋 Contexto e Motivação

### Problema Atual

Após Fase 1, o script processa campos básicos de template.docx, mas ignora:
- Marcadores `[COMPONENT: Contact Us Small]`
- Marcadores `[COMPONENT: Text Block 1]`
- Campo `Article category:`
- Componentes especiais não mapeados

### Impacto

- ❌ Componentes precisam ser adicionados manualmente
- ❌ Perda de informação estrutural do template
- ❌ Categoria não aplicada automaticamente

### Benefícios da Implementação

- ✅ Automação completa de template.docx
- ✅ Preservação de estrutura original
- ✅ Componentes especiais funcionais
- ✅ Redução drástica de trabalho manual

---

## 🔧 Requisitos Funcionais

### RF-07: Parser de Marcadores `[COMPONENT: ...]`

**Prioridade:** 🔴 Crítica  
**Complexidade:** ⭐⭐⭐ Alta

**Descrição:**  
Identificar e extrair todos os marcadores `[COMPONENT: X]` e seu conteúdo associado.

**Critérios de Aceitação:**
- [ ] Regex identifica todos os `[COMPONENT: ...]` no documento
- [ ] Extrai tipo de componente (ex: "Contact Us Small")
- [ ] Extrai conteúdo até próximo `[COMPONENT:...]` ou fim
- [ ] Retorna array de objetos `{ type, content, startIndex }`
- [ ] Preserva formatação HTML do conteúdo

**Implementação:**
```javascript
function extractComponents(html) {
  const components = [];
  const componentRegex = /\[COMPONENT:\s*([^\]]+)\]/gi;
  let match;
  
  const matches = [...html.matchAll(componentRegex)];
  
  matches.forEach((match, index) => {
    const type = match[1].trim();
    const startIndex = match.index + match[0].length;
    
    // Content até próximo componente ou fim
    const nextMatch = matches[index + 1];
    const endIndex = nextMatch ? nextMatch.index : html.length;
    
    const content = html.substring(startIndex, endIndex).trim();
    
    components.push({
      type: type,
      content: cleanHTML(content),
      rawHtml: content,
      drupalType: mapComponentToDrupalType(type)
    });
  });
  
  return components;
}
```

---

### RF-08: Mapeamento de Componentes para Tipos Drupal

**Prioridade:** 🔴 Crítica  
**Complexidade:** ⭐⭐ Média

**Descrição:**  
Mapear tipos de componentes do template para tipos de Paragraphs Drupal correspondentes.

**Critérios de Aceitação:**
- [ ] Tabela de mapeamento definida e documentada
- [ ] `Text Block X` → `c_text`
- [ ] `Contact Us Small` → `c_signposting`
- [ ] `Image Gallery` → `c_media` (se disponível)
- [ ] Default para `c_text` se não mapeado
- [ ] Log de warning para tipos não reconhecidos

**Tabela de Mapeamento:**

| Component Type (template.docx) | Drupal Paragraph Type | Botão Add More ID |
|--------------------------------|----------------------|-------------------|
| Text Block 1 | `c_text` | `field-article-lp-components-c-text-add-more` |
| Text Block 2 | `c_text` | `field-article-lp-components-c-text-add-more` |
| Text Block 3 | `c_text` | `field-article-lp-components-c-text-add-more` |
| Contact Us Small | `c_signposting` | `field-article-lp-components-c-signposting-add-more` |
| Image Gallery | `c_media` | `field-article-lp-components-c-media-add-more` |
| Product Recommendations | `c_products_list` | `field-article-lp-components-c-products-list-add-more` |

**Código:**
```javascript
const COMPONENT_TYPE_MAPPING = {
  'Text Block 1': 'c_text',
  'Text Block 2': 'c_text',
  'Text Block 3': 'c_text',
  'Contact Us Small': 'c_signposting',
  'Image Gallery': 'c_media',
  'Product Recommendations': 'c_products_list'
};

function mapComponentToDrupalType(componentType) {
  const mapped = COMPONENT_TYPE_MAPPING[componentType];
  
  if (!mapped) {
    console.warn(`[v1] Tipo de componente não mapeado: "${componentType}", usando c_text`);
    return 'c_text';
  }
  
  return mapped;
}
```

---

### RF-09: Criação Automática de Componentes Drupal

**Prioridade:** 🔴 Crítica  
**Complexidade:** ⭐⭐⭐⭐ Muito Alta

**Descrição:**  
Para cada componente identificado, criar automaticamente o Paragraph correspondente no Drupal via AJAX.

**Critérios de Aceitação:**
- [ ] Clica no botão "Add More" correto baseado no tipo Drupal
- [ ] Aguarda callback AJAX completar
- [ ] Clica "Edit" no componente criado
- [ ] Aguarda formulário expandir
- [ ] Preenche campos específicos do tipo de componente
- [ ] Ordem dos componentes preservada

**Workflow:**
```javascript
async function createDrupalComponents(components) {
  for (const component of components) {
    console.log(`[v1] Criando componente: ${component.type} (${component.drupalType})`);
    
    // 1. Click Add More button
    const addBtnId = getAddMoreButtonId(component.drupalType);
    const addBtn = document.querySelector(`#${addBtnId}`);
    
    if (!addBtn) {
      console.error(`[v1] Botão Add More não encontrado: ${addBtnId}`);
      continue;
    }
    
    addBtn.click();
    
    // 2. Wait for AJAX
    await waitForAjax(5000);
    
    // 3. Get latest component index
    const index = getLatestComponentIndex();
    
    // 4. Click Edit
    const editBtn = document.querySelector(`#field-article-lp-components-${index}-edit--2`);
    if (editBtn) {
      editBtn.click();
      await waitForFormExpansion(index);
    }
    
    // 5. Fill content based on type
    await fillComponentContent(index, component);
  }
}
```

---

### RF-10: Preenchimento de Componentes Especiais

**Prioridade:** 🟡 Alta  
**Complexidade:** ⭐⭐⭐ Alta

**Descrição:**  
Preencher campos específicos para cada tipo de componente especial.

**Critérios de Aceitação:**

#### c_text (Text Block)
- [ ] Conteúdo inserido via CKEditor
- [ ] Formatação preservada

#### c_signposting (Contact Us Small)
- [ ] Campo título preenchido
- [ ] Campo descrição preenchido
- [ ] Link/URL preenchido (se presente no conteúdo)
- [ ] Ícone/imagem (manual ou placeholder)

#### c_media (Image Gallery)
- [ ] Indicação ao usuário para upload manual de imagens
- [ ] Ou link para Media Library items (se IDs conhecidos)

#### c_products_list (Product Recommendations)
- [ ] Indicação ao usuário para seleção de produtos
- [ ] Ou automação se produtos mapeados por nome/código

**Implementação c_signposting:**
```javascript
async function fillSignpostingComponent(index, component) {
  // Extrai título, descrição, link do conteúdo
  const parsed = parseSignpostingContent(component.content);
  
  // Título
  const titleField = document.querySelector(
    `[name="field_article_lp_components[${index}][subform][field_c_signposting_title][0][value]"]`
  );
  if (titleField) {
    titleField.value = parsed.title;
  }
  
  // Descrição
  const descField = document.querySelector(
    `[name="field_article_lp_components[${index}][subform][field_c_signposting_desc][0][value]"]`
  );
  if (descField && descField.ckeditorInstance) {
    descField.ckeditorInstance.setData(parsed.description);
  }
  
  // Link
  const linkField = document.querySelector(
    `[name="field_article_lp_components[${index}][subform][field_c_signposting_link][0][uri]"]`
  );
  if (linkField && parsed.link) {
    linkField.value = parsed.link;
  }
}

function parseSignpostingContent(html) {
  // Exemplo simples: primeiro H3 = título, resto = descrição
  const h3Match = html.match(/<h3[^>]*>(.*?)<\/h3>/i);
  const title = h3Match ? stripHTML(h3Match[1]) : 'Contact Us';
  
  const description = html.replace(/<h3[^>]*>.*?<\/h3>/i, '').trim();
  
  // Link extraído de <a> se presente
  const linkMatch = html.match(/<a[^>]*href="([^"]+)"/i);
  const link = linkMatch ? linkMatch[1] : '';
  
  return { title, description, link };
}
```

---

### RF-11: Extração e Aplicação de Categoria

**Prioridade:** 🟡 Média  
**Complexidade:** ⭐⭐ Média

**Descrição:**  
Extrair campo `Article category:` e aplicar no campo de taxonomy do Drupal (se existir).

**Critérios de Aceitação:**
- [ ] Extrai `Article category: Nome - URL`
- [ ] Separa nome da categoria e URL
- [ ] Busca campo taxonomy no formulário Drupal
- [ ] Aplica categoria se campo encontrado
- [ ] Logging se campo não disponível

**Implementação:**
```javascript
function extractCategory(html) {
  const categoryMatch = html.match(/Article category:\s*([^-]+)\s*-\s*([^\n]+)/i);
  
  if (categoryMatch) {
    return {
      name: categoryMatch[1].trim(),
      url: categoryMatch[2].trim()
    };
  }
  
  return null;
}

function applyCategoryToDrupal(category) {
  if (!category) return;
  
  // Tenta encontrar campo de categoria/taxonomy
  // ID pode variar, tenta múltiplas possibilidades
  const possibleSelectors = [
    '#edit-field-article-category',
    '#edit-field-category',
    '[name*="field_category"]',
    '[name*="field_article_category"]'
  ];
  
  for (const selector of possibleSelectors) {
    const field = document.querySelector(selector);
    
    if (field) {
      console.log(`[v1] Campo de categoria encontrado: ${selector}`);
      
      // Se é select, tenta encontrar option com nome da categoria
      if (field.tagName === 'SELECT') {
        const option = Array.from(field.options).find(
          opt => opt.text.includes(category.name)
        );
        
        if (option) {
          field.value = option.value;
          console.log(`[v1] Categoria aplicada: "${category.name}"`);
          return true;
        }
      }
    }
  }
  
  console.warn(`[v1] Campo de categoria não encontrado, aplicação manual necessária: "${category.name}"`);
  return false;
}
```

---

### RF-12: Suporte a Componentes Não-Mapeados

**Prioridade:** 🟢 Baixa  
**Complexidade:** ⭐ Baixa

**Descrição:**  
Para componentes não reconhecidos, criar como `c_text` genérico e alertar usuário.

**Critérios de Aceitação:**
- [ ] Componente desconhecido → fallback para `c_text`
- [ ] Warning em console com tipo não reconhecido
- [ ] Conteúdo inserido como HTML no c_text
- [ ] Comentário HTML no início indicando tipo original

**Implementação:**
```javascript
function handleUnknownComponent(component) {
  console.warn(`[v1] Componente não reconhecido: "${component.type}"`);
  console.warn(`[v1] Criando como c_text genérico`);
  
  // Adiciona comentário HTML indicando tipo original
  const contentWithNote = `<!-- Original component type: ${component.type} -->\n${component.content}`;
  
  return {
    ...component,
    drupalType: 'c_text',
    content: contentWithNote
  };
}
```

---

## ⚙️ Requisitos Técnicos

### RT-05: Extensão da Estrutura de Dados

**Modificar estrutura de retorno do parser:**

```javascript
{
  format: 'standard' | 'template',
  url: string,
  title: string,
  metaTitle: string,
  metaDescription: string,
  intro: string,
  
  // NOVO: Componentes estruturados
  components: [
    {
      type: string,           // "Contact Us Small", "Text Block 1", etc.
      content: string,        // HTML limpo
      rawHtml: string,        // HTML original
      drupalType: string      // "c_signposting", "c_text", etc.
    }
  ],
  
  // NOVO: Categoria
  category: {
    name: string,
    url: string
  } | null,
  
  // DEPRECATED: Substituído por components
  textBlocks: string[]  // Manter por compatibilidade
}
```

---

### RT-06: Helpers para Componentes

**Novas funções auxiliares:**

```javascript
// Retorna ID do botão "Add More" para tipo Drupal
function getAddMoreButtonId(drupalType) {
  return `field-article-lp-components-${drupalType}-add-more`;
}

// Aguarda AJAX do Drupal completar
async function waitForAjax(timeout = 5000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    const check = () => {
      if (typeof Drupal !== 'undefined' && 
          Drupal.ajax && 
          Object.keys(Drupal.ajax.instances).every(k => !Drupal.ajax.instances[k].ajaxing)) {
        resolve();
      } else if (Date.now() - startTime > timeout) {
        reject(new Error('AJAX timeout'));
      } else {
        setTimeout(check, 100);
      }
    };
    
    check();
  });
}

// Retorna índice do último componente adicionado
function getLatestComponentIndex() {
  const wrappers = document.querySelectorAll('[id^="field-article-lp-components-"][id$="-item-wrapper"]');
  const indices = Array.from(wrappers).map(el => {
    const match = el.id.match(/field-article-lp-components-(\d+)-item-wrapper/);
    return match ? parseInt(match[1]) : -1;
  });
  
  return Math.max(...indices);
}

// Aguarda formulário do componente expandir
async function waitForFormExpansion(index, timeout = 3000) {
  const formSelector = `#field-article-lp-components-${index}-subform`;
  
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    const check = () => {
      const form = document.querySelector(formSelector);
      
      if (form && form.style.display !== 'none') {
        resolve(form);
      } else if (Date.now() - startTime > timeout) {
        reject(new Error('Form expansion timeout'));
      } else {
        setTimeout(check, 100);
      }
    };
    
    check();
  });
}
```

---

## ✅ Critérios de Aceitação Global

### Funcional

- [ ] Todos os marcadores `[COMPONENT: ...]` identificados
- [ ] Componentes criados no Drupal na ordem correta
- [ ] c_text com conteúdo correto
- [ ] c_signposting com título, descrição, link
- [ ] c_media com indicação para upload manual
- [ ] Categoria aplicada (se campo existir)
- [ ] Componentes não-mapeados → c_text com warning

### Não-Funcional

- [ ] Performance: criação de componente < 3s cada
- [ ] Robustez: retry em caso de falha AJAX (1x)
- [ ] Logging: todas as ações registradas no console
- [ ] Error handling: falha de um componente não para processo

### UX

- [ ] Barra de progresso mostrando componente sendo criado
- [ ] Mensagens claras sobre ações manuais necessárias
- [ ] Resumo final: X componentes criados, Y manuais

---

## 🧪 Plano de Testes

### Teste 201: Extração de Componentes

**Input:** HTML com 3 `[COMPONENT: ...]`  
**Esperado:** Array com 3 objetos componente  
**Status:** ⬜ Não testado

### Teste 202: Mapeamento Text Block → c_text

**Input:** `[COMPONENT: Text Block 1]`  
**Esperado:** `drupalType = 'c_text'`  
**Status:** ⬜ Não testado

### Teste 203: Mapeamento Contact Us → c_signposting

**Input:** `[COMPONENT: Contact Us Small]`  
**Esperado:** `drupalType = 'c_signposting'`  
**Status:** ⬜ Não testado

### Teste 204: Criação de c_text no Drupal

**Input:** Componente tipo c_text  
**Esperado:** Botão clicked, AJAX aguardado, conteúdo preenchido  
**Status:** ⬜ Não testado

### Teste 205: Criação de c_signposting no Drupal

**Input:** Componente tipo c_signposting com conteúdo  
**Esperado:** Título, descrição, link preenchidos  
**Status:** ⬜ Não testado

### Teste 206: Extração de Categoria

**Input:** `Article category: Noms de chien - https://...`  
**Esperado:** `{name: "Noms de chien", url: "https://..."}`  
**Status:** ⬜ Não testado

### Teste 207: End-to-End template.docx Completo

**Input:** template.docx com múltiplos componentes  
**Esperado:** Artigo Drupal completo com todos componentes  
**Status:** ⬜ Não testado

---

## ⚠️ Riscos e Mitigações

### Risco 1: AJAX Timeouts

**Probabilidade:** 🟡 Média  
**Impacto:** 🔴 Alto

**Mitigação:**
- Timeouts configuráveis
- Retry logic (1x)
- Fallback para criação manual

### Risco 2: Componentes Drupal Não Disponíveis

**Probabilidade:** 🟡 Média  
**Impacto:** 🟡 Médio

**Mitigação:**
- Validação de botões "Add More" antes de clicar
- Fallback para c_text
- Clear messaging ao usuário

### Risco 3: Ordem de Componentes Incorreta

**Probabilidade:** 🟢 Baixa  
**Impacto:** 🟡 Médio

**Mitigação:**
- Processamento sequencial (não paralelo)
- Validação de índices
- Testes com múltiplos componentes

### Risco 4: Parsing de Conteúdo de Componentes Especiais

**Probabilidade:** 🔴 Alta  
**Impacto:** 🟡 Médio

**Mitigação:**
- Parsers robustos com fallbacks
- Validação de campos obrigatórios
- Logging detalhado

---

## 📊 Estimativas

### Esforço de Desenvolvimento

| Tarefa | Estimativa | Complexidade |
|--------|-----------|--------------|
| Parser `[COMPONENT: ...]` | 4h | ⭐⭐⭐ Alta |
| Mapeamento de tipos | 2h | ⭐⭐ Média |
| Criação AJAX componentes | 6h | ⭐⭐⭐⭐ Muito Alta |
| Fill c_signposting | 3h | ⭐⭐⭐ Alta |
| Fill c_media/outros | 2h | ⭐⭐ Média |
| Extração/aplicação categoria | 2h | ⭐⭐ Média |
| Error handling/retry | 2h | ⭐⭐ Média |
| Progress UI | 2h | ⭐⭐ Média |
| Testes | 6h | ⭐⭐⭐ Alta |
| Documentação | 2h | ⭐ Baixa |
| **TOTAL** | **31h** | **4 dias úteis** |

### Cronograma Sugerido

**Semana 1:**
- Day 1-2: Parser e mapeamento
- Day 3-4: Criação AJAX e fill básico
- Day 5: c_signposting e categoria

**Semana 2:**
- Day 1: Outros componentes
- Day 2: Error handling e UI
- Day 3-4: Testes extensivos
- Day 5: Correções e documentação

---

## 🚀 Próximos Passos

### Após Fase 2

1. ✅ Validar componentes especiais com usuários
2. ✅ Coletar lista de componentes adicionais necessários
3. ✅ Iniciar Fase 3 (Refinamentos)

### Dependências

- ✅ Fase 1 completa e testada
- ⬜ Aprovação deste PRD
- ⬜ Validação de campos Drupal para componentes especiais

---

## 📎 Anexos

### Mapeamento Completo de Componentes

Ver [Tabela de Mapeamento](#rf-08-mapeamento-de-componentes-para-tipos-drupal)

### Referências

- [prd_phase1_basic_support.md](file:///C:/Users/BRBritoCa1/.gemini/antigravity/brain/df2d5fd9-6b27-45d6-a4f1-7643afef4cd3/prd_phase1_basic_support.md)
- [paragraph_components_analysis.md](file:///C:/Users/BRBritoCa1/.gemini/antigravity/brain/df2d5fd9-6b27-45d6-a4f1-7643afef4cd3/paragraph_components_analysis.md)

---

**Aprovações Necessárias:**

- [ ] Product Owner
- [ ] Tech Lead  
- [ ] UX Designer (para progress UI)

**Última Atualização:** 2025-12-01
