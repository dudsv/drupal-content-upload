# Análise de Componentes Drupal Paragraphs

## Visão Geral

Os **Paragraphs** no Drupal são componentes modulares que permitem aos editores construir páginas flexíveis. Cada tipo de componente (paragraph type) tem campos específicos e comportamentos distintos.

## Mecânica de Adição de Componentes

### Sistema "Add More"

O sistema funciona via **AJAX** (Asynchronous JavaScript and XML):

1. **Botões "Add More"**: Cada tipo de componente tem um botão dedicado
2. **ID Pattern**: `field-article-lp-components-{TYPE}-add-more`
3. **Ação AJAX**: Ao clicar, uma requisição AJAX é enviada ao servidor
4. **Resposta**: O servidor retorna o HTML do novo componente vazio
5. **Inserção**: O componente é inserido no DOM da página

### Exemplo de Fluxo

```
Usuário clica em "Add Text" 
    ↓
AJAX Request: field-article-lp-components-c-text-add-more
    ↓
Servidor gera componente vazio (#8, #9, etc.)
    ↓
HTML inserido na tabela de componentes
    ↓
Componente pronto para edição
```

## Tipos de Componentes Identificados

### 1. **Text (c_text)**
**ID do Botão**: `field-article-lp-components-c-text-add-more`

**Comportamento**:
- Componente simples para blocos de texto
- Usa CKEditor 5 para formatação rich text
- Permite headings (H1-H6), negrito, itálico, listas, etc.

**Campos**:
- Área de texto com CKEditor completo
- Suporte a HTML formatado

**Uso Típico**: Parágrafos de conteúdo, texto corrido do artigo

**Exemplo de Dados Armazenados**:
```html
<p>Mon chat vomit ses croquettes, que dois-je faire ? 
Vous n'êtes pas le seul propriétaire de félin à vous poser 
cette question...</p>
```

---

### 2. **Text + Image (c_sideimagetext_ttt)**
**ID do Botão**: `field-article-lp-components-c-sideimagetext-ttt-add-more`

**Comportamento**:
- Combina texto formatado com uma imagem lateral
- Imagem pode ser posicionada à esquerda ou direita
- Texto flui ao redor da imagem

**Campos**:
1. **Heading/Título**: Campo para título (geralmente H2)
2. **Text Content**: CKEditor para o conteúdo
3. **Image**: Seleção de mídia via Media Library
4. **Image Alignment**: Posição (left/right/center)
5. **Alt Text**: Texto alternativo da imagem

**Dados no HTML**:
```html
<!-- Heading -->
h2

<!-- Content -->
Avant de pouvoir bien comprendre les vomissements...

<!-- Alignment -->
left

<!-- Image -->
why_is_my_cat_vomiting1.jpg
```

**Uso Típico**: Seções com explicações visuais, tutoriais ilustrados

---

### 3. **Accordion**
**ID do Botão**: `field-article-lp-components-accordion-add-more`

**Comportamento**:
- Cria seções expansíveis/colapsáveis
- Usuário clica para expandir e ver conteúdo
- Economiza espaço vertical

**Campos**:
- **Título do accordion**: Visível quando fechado
- **Conteúdo**: Texto que aparece ao expandir
- Múltiplos itens podem ser adicionados

**Uso Típico**: FAQs, seções com muito conteúdo opcional

---

### 4. **Image (c_image)**
**ID do Botão**: `field-article-lp-components-c-image-add-more`

**Comportamento**:
- Adiciona imagem independente, sem texto
- Imagem em largura completa ou centralizada

**Campos**:
- **Media Selection**: Escolha da imagem via Media Library
- **Caption**: Legenda opcional
- **Alt Text**: Texto alternativo
- **Image Style**: Tamanho/crop da imagem

**Uso Típico**: Imagens destacadas, galerias, ilustrações standalone

---

### 5. **Media (c_media)**
**ID do Botão**: `field-article-lp-components-c-media-add-more`

**Comportamento**:
- Suporta múltiplos tipos de mídia
- Vídeos (YouTube, Vimeo, upload)
- Posts do Instagram, Tweets
- Áudio

**Campos**:
- **Media Type**: Tipo de mídia
- **URL/Upload**: Dependendo do tipo
- **Caption**: Legenda

**Uso Típico**: Vídeos embarcados, posts de redes sociais

---

### 6. **Signposting (c_signposting)**
**ID do Botão**: `field-article-lp-components-c-signposting-add-more`

**Comportamento**:
- Cards ou caixas de destaque
- Direcionam para outras páginas/recursos
- Geralmente com ícone + título + descrição + link

**Campos**:
- **Título**
- **Descrição curta**
- **Link/URL**
- **Ícone/Imagem**

**Uso Típico**: Call-to-actions, links relacionados, navegação interna

---

### 7. **Document (c_document)**
**ID do Botão**: `field-article-lp-components-c-document-add-more`

**Comportamento**:
- Permite upload e download de documentos
- PDFs, Word, Excel, etc.

**Campos**:
- **File Upload**: Documento
- **Title**: Nome do documento
- **Description**: Descrição opcional

**Uso Típico**: Recursos para download, guias em PDF, formulários

---

### 8. **Tabbed Content (c_tabbed_content)**
**ID do Botão**: `field-article-lp-components-c-tabbed-content-add-more`

**Comportamento**:
- Organiza conteúdo em abas
- Usuário clica em aba para ver conteúdo diferente
- Economiza espaço, agrupa informações relacionadas

**Campos**:
- Múltiplas abas, cada uma com:
  - **Tab Label**: Texto da aba
  - **Tab Content**: Conteúdo da aba (CKEditor)

**Uso Típico**: Comparações, múltiplas variações de informação

---

### 9. **Brand Carousel (c_brand_carousel)**
**ID do Botão**: `field-article-lp-components-c-brand-carousel-add-more`

**Comportamento**:
- Carrossel rotativo de marcas/produtos
- Navegação com setas
- Auto-play opcional

**Campos**:
- **Brands/Items**: Lista de marcas
- **Display Settings**: Número de itens visíveis, velocidade

**Uso Típico**: Showcase de produtos, parceiros, marcas

---

### 10. **Products List (c_products_list)**
**ID do Botão**: `field-article-lp-components-c-products-list-add-more`

**Comportamento**:
- Lista de produtos relacionados
- Grid ou lista
- Pode incluir links para páginas de produto

**Campos**:
- **Product Selection**: Seleção de produtos
- **Layout**: Grid/List
- **Number of Items**: Quantidade

**Uso Típico**: Recomendações de produtos, catálogo

---

### 11. **From Library (from_library)**
**ID do Botão**: `field-article-lp-components-from-library-add-more`

**Comportamento**:
- Reutiliza componentes pré-construídos
- Componentes salvos na biblioteca
- Permite consistência entre páginas

**Campos**:
- **Component Selection**: Escolha da biblioteca
- Opção de "unlink" para editar independentemente

**Uso Típico**: Blocos reutilizáveis, CTAs padrão, footers

---

## Estrutura Técnica de um Componente

### Anatomia no HTML

```html
<tr id="field-article-lp-components-{N}-item-wrapper">
  <td>
    <!-- Header do Componente -->
    <div class="paragraph-top">
      <div class="paragraph-type">
        <img class="paragraph-type-icon" title="Text">
        <span class="paragraph-type-title">Text</span>
      </div>
      
      <!-- Summary/Preview -->
      <div class="paragraph-summary">
        <span class="summary-content">
          Preview do conteúdo...
        </span>
      </div>
      
      <!-- Botões de Ação -->
      <div class="paragraph-actions">
        <input id="field-article-lp-components-{N}-edit" 
               value="Modifier">
        <input id="field-article-lp-components-{N}-remove" 
               value="Retirer">
        <input id="field-article-lp-components-{N}-duplicate" 
               value="Duplicate">
      </div>
    </div>
    
    <!-- Formulário do Componente (quando expandido) -->
    <div class="paragraph-form" style="display: none;">
      <!-- Campos específicos do tipo de componente -->
    </div>
  </td>
  
  <!-- Weight (para ordenação drag-drop) -->
  <td class="delta-order">
    <select name="field_article_lp_components[{N}][_weight]">
      <option>0</option>
      <option>1</option>
      <!-- ... -->
    </select>
  </td>
</tr>
```

### Identificação do Tipo

Cada componente tem um atributo especial para identificar seu tipo:

```html
<input data-paragraphs-split-text-type="c_text" ...>
<input data-paragraphs-split-text-type="c_sideimagetext_ttt" ...>
```

## Workflow de Interação

### 1. **Estado Colapsado (Padrão)**
- Componente mostra apenas preview/summary
- Botões: Edit, Remove, Duplicate visíveis

### 2. **Ao Clicar "Edit"**
- AJAX expande o formulário
- Campos específicos ficam visíveis
- CKEditor é inicializado
- Botão muda para "Collapse"

### 3. **Ao Editar e Salvar**
- Conteúdo é salvo no campo hidden
- Preview é atualizado
- Componente retorna ao estado collapsed

### 4. **Drag & Drop Mode**
- Botão "Drag & drop" ativa modo de reordenação
- Componentes podem ser arrastados
- Weight fields são atualizados automaticamente

## Implicações para Automação (Script v1)

### Desafios

1. **AJAX Dinâmico**: Componentes são carregados via AJAX
   - Script precisa **esperar** callback AJAX completar
   - Usar `MutationObserver` ou polling

2. **CKEditor Assíncrono**: Instâncias são criadas dinamicamente
   - Aguardar `editor.isReady`
   - Acessar via `element.ckeditorInstance`

3. **Ordem Correta**:
   ```javascript
   1. Clicar "Add More" botão
   2. Esperar AJAX response
   3. Clicar "Edit" no novo componente
   4. Esperar formulário expandir
   5. Preencher campos
   6. Clicar "Collapse" (opcional)
   ```

### Estratégia Recomendada

```javascript
async function addAndFillParagraph(type, content) {
  // 1. Click add button
  const addBtn = document.querySelector(
    `#field-article-lp-components-${type}-add-more`
  );
  addBtn.click();
  
  // 2. Wait for AJAX
  await waitForNewParagraph();
  
  // 3. Get latest paragraph index
  const index = getLatestParagraphIndex();
  
  // 4. Click edit
  const editBtn = document.querySelector(
    `#field-article-lp-components-${index}-edit--2`
  );
  editBtn.click();
  
  // 5. Wait for form expansion
  await waitForFormExpansion(index);
  
  // 6. Fill fields based on type
  if (type === 'c_text') {
    fillTextComponent(index, content);
  } else if (type === 'c_sideimagetext_ttt') {
    fillTextImageComponent(index, content);
  }
  // ... etc
}
```

## Resumo dos Tipos e Seus Usos - COMPLETO

### Tabela de Mapeamento Completa

| Tipo | Botão ID | Button Value (Texto Visível) | Nome do Input | Tipo de Dados | Complexidade |
|------|----------|------------------------------|---------------|---------------|--------------|
| **Text** | `field-article-lp-components-c-text-add-more` | "Add Text" | `c_text` | HTML via CKEditor | ⭐ Simples |
| **Text + Image** | `field-article-lp-components-c-sideimagetext-ttt-add-more` | "Add Texte + Image" | `c_sideimagetext_ttt` | HTML + Media + Alignment | ⭐⭐ Média |
| **Accordion** | `field-article-lp-components-accordion-add-more` | "Add Content: Accordion" | `accordion` | Título + Conteúdo expansível | ⭐⭐ Média |
| **Image** | `field-article-lp-components-c-image-add-more` | "Add Image" | `c_image` | Media Library | ⭐ Simples |
| **Media** | `field-article-lp-components-c-media-add-more` | "Add Media Image/Video" | `c_media` | Vídeo/Imagem embed | ⭐⭐⭐ Alta |
| **Signposting** | `field-article-lp-components-c-signposting-add-more` | "Add Single signpost" | `c_signposting` | Link + Descrição | ⭐⭐ Média |
| **Document** | `field-article-lp-components-c-document-add-more` | "Add Content: Document" | `c_document` | File Upload | ⭐⭐ Média |
| **Tabbed Content** | `field-article-lp-components-c-tabbed-content-add-more` | "Add Onglets" | `c_tabbed_content` | Múltiplas abas | ⭐⭐⭐ Alta |
| **From Library** | `field-article-lp-components-from-library-add-more` | "Add From library" | `from_library` | Componente reutilizável | ⭐⭐ Média |
| **Brand Carousel** | `field-article-lp-components-c-brand-carousel-add-more` | "Add Brand carousel" | `c_brand_carousel` | Lista de marcas | ⭐⭐⭐ Alta |
| **Product Detail Item** | `field-article-lp-components-product-detail-item-add-more` | "Add Product Detail Item" | `product_detail_item` | Detalhes de produto | ⭐⭐ Média |
| **Brand Discovery** | `field-article-lp-components-c-brand-discovery-add-more` | "Add Brand Discovery" | `c_brand_discovery` | Descoberta de marca | ⭐⭐⭐ Alta |
| **Products List** | `field-article-lp-components-c-products-list-add-more` | "Add Products list" | `c_products_list` | Lista de produtos | ⭐⭐ Média |
| **Product Listing Block** | `field-article-lp-components-product-listing-block-add-more` | "Add Product Listing Block" | `product_listing_block` | Bloco de listagem | ⭐⭐ Média |

### Ordem dos Componentes no Dropdown

A interface Drupal apresenta os componentes em um **dropdown** na seguinte ordem:

1. **Accordion** (primeiro, mais visível)
2. **Document**
3. **Image**
4. **Signposting**
5. **Media**
6. **Tabbed Content**
7. **Text**
8. **Text + Image**
9. **From Library**
10. **Brand Carousel**
11. **Product Detail Item**
12. **Brand Discovery**
13. **Products List**
14. **Product Listing Block**

### Tipos Mais Comuns no Exemplo

No artigo analisado ("Mon chat vomit ses croquettes"), foram usados:

| Componente # | Tipo | Uso no Artigo |
|--------------|------|--------------|
| 0-1, 3, 5, 7 | Text | Parágrafos de conteúdo (5 ocorrências) |
| 2, 4 | Text + Image | Seções com ilustrações (2 ocorrências) |
| 6 | Products List | Recomendações de produtos (1 ocorrência) |

**Total: 8 componentes**

## Conclusão

O sistema de Paragraphs do Drupal é **altamente flexível mas complexo**. Para automação:

- ✅ Identificar tipo correto baseado no conteúdo
- ✅ Aguardar callbacks AJAX
- ✅ Preencher campos na ordem correta
- ✅ Gerenciar instâncias CKEditor dinamicamente
- ✅ Lidar com Media Library para imagens/vídeos
