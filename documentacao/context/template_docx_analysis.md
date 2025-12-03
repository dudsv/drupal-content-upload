# Análise do Template.docx - Formato Alternativo

## 📋 Estrutura Identificada

Baseado na análise do arquivo `template.docx`, este formato possui diferenças significativas em relação ao formato padrão "How do I know if my cat is sick.docx".

---

## 🔍 Estrutura Completa do template.docx

### Marcadores e Formatos

| Marcador/Padrão | Localização | Exemplo | Compatível com v1? |
|-----------------|-------------|---------|-------------------|
| `Source:` | Primeira linha | `Source: https://www.purina.fr/choisir-animal/articles/...` | ❌ Não (usa `URL:`) |
| **Heading 1** | Título principal | "Les meilleurs prénoms de petits chiens..." | ⚠️ Parcial (precisa extrair) |
| `Article category:` | Metadado | `Article category: Noms de chien - https://...` | ❌ Não |
| `[COMPONENT: ...]` | Marcadores de componentes | `[COMPONENT: Contact Us Small]` | ❌ Não |
| `[COMPONENT: Text Block 1]` | Bloco de texto | Marca início de conteúdo | ⚠️ Similar a "Text block 1" |
| **Heading 2** | Subtítulos | "Autres idées de noms pour un petit chien" | ✅ Sim (formatação) |
| **List Bullet** | Listas | Kiki, Pépite, Croquette, Cookie | ✅ Sim (formatação) |
| `SEO METADATA` | Seção meta | Marca final/início de metadados | ❌ Novo marcador |

---

## 📊 Comparação Detalhada: template.docx vs How do I know if my cat is sick.docx

### Diferenças Estruturais

| Aspecto | How do I know if my cat is sick.docx | template.docx |
|---------|-------------------------------------|---------------|
| **URL** | `URL: BE: https://...` | `Source: https://...` |
| **Título** | `H1: Comment dresser un chat...` | Heading 1 style (sem marcador) |
| **Meta Title** | `Meta title: ...` explícito | Dentro de `SEO METADATA` (implícito) |
| **Meta Description** | `Meta description: ...` explícito | Dentro de `SEO METADATA` (implícito) |
| **Categoria** | Não presente | `Article category: Nome - URL` |
| **Componentes Especiais** | Não presente | `[COMPONENT: Contact Us Small]` |
| **Blocos de Texto** | `Text block 1`, `Text block 2`, `Text block 3` | `[COMPONENT: Text Block 1]` |
| **Intro** | `Intro (H3)` explícito | Primeiro parágrafo após título (implícito) |
| **Alt-tag** | `Alt-tag: ...` explícito | Não encontrado |

---

## 🔧 Modificações Necessárias no Script v1

### 1. Parser de Marcadores (extractByMarkers)

**Modificação Atual:**
```javascript
const markers = {
  'URL:': 'url',
  'Meta title:': 'metaTitle',
  'Meta description:': 'metaDescription',
  'H1:': 'title',
  'Intro (H3)': 'intro',
  'Text block 1': 'textBlock1',
  'Text block 2': 'textBlock2',
  'Text block 3': 'textBlock3',
  'Alt-tag:': 'altTag'
};
```

**Modificação Proposta para Suportar template.docx:**
```javascript
const markers = {
  // Formato padrão
  'URL:': 'url',
  'Meta title:': 'metaTitle',
  'Meta description:': 'metaDescription',
  'H1:': 'title',
  'Intro (H3)': 'intro',
  'Text block 1': 'textBlock1',
  'Text block 2': 'textBlock2',
  'Text block 3': 'textBlock3',
  'Alt-tag:': 'altTag',
  
  // Formato alternativo (template.docx)
  'Source:': 'url',  // Mapeia Source para url
  'Article category:': 'category',  // Novo campo
  '[COMPONENT: Text Block 1]': 'textBlock1',  // Alternativa
  '[COMPONENT: Contact Us Small]': 'componentContactUs',  // Componente especial
  'SEO METADATA': 'seoMetadataSection'  // Seção de metadados
};
```

### 2. Extração de Título (Heading 1)

**Problema:** template.docx usa Heading 1 style, não marcador `H1:`

**Solução:**
```javascript
function extractTitle(html) {
  // Tenta marcador explícito primeiro
  let title = extractByMarker(html, 'H1:');
  
  // Se não encontrar, tenta Heading 1
  if (!title) {
    const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
    if (h1Match) {
      title = cleanHTML(h1Match[1]);
    }
  }
  
  return title;
}
```

### 3. Extração de URL/Source

**Problema:** template.docx usa `Source:` em vez de `URL:`

**Solução:**
```javascript
function extractURL(html) {
  // Tenta URL: primeiro (formato padrão)
  let url = extractByMarker(html, 'URL:');
  
  // Se não encontrar, tenta Source: (formato alternativo)
  if (!url) {
    url = extractByMarker(html, 'Source:');
  }
  
  // Extrai apenas o path da URL (tudo após o domínio)
  if (url) {
    const urlMatch = url.match(/https?:\/\/[^\/]+(\/.+)/);
    if (urlMatch) {
      return urlMatch[1]; // Retorna apenas o path
    }
  }
  
  return url;
}
```

### 4. Extração de Categoria (Novo Campo)

**Problema:** template.docx tem campo `Article category:` que não existe no formato padrão

**Solução:**
```javascript
function extractCategory(html) {
  const categoryMatch = html.match(/Article category:\s*([^\n]+)/i);
  if (categoryMatch) {
    const fullCategory = categoryMatch[1];
    
    // Extrai nome e URL
    // Formato: "Noms de chien - https://www.purina.fr/..."
    const parts = fullCategory.split(' - ');
    
    return {
      name: parts[0]?.trim(),
      url: parts[1]?.trim()
    };
  }
  
  return null;
}
```

### 5. Processamento de Componentes Especiais

**Problema:** template.docx tem marcadores `[COMPONENT: ...]` que definem tipos específicos de componentes

**Solução:**
```javascript
function extractComponents(html) {
  const components = [];
  
  // Busca todos os marcadores [COMPONENT: ...]
  const componentRegex = /\[COMPONENT:\s*([^\]]+)\]/gi;
  let match;
  
  while ((match = componentRegex.exec(html)) !== null) {
    const componentType = match[1].trim();
    const startIndex = match.index + match[0].length;
    
    // Extrai conteúdo até próximo componente ou fim
    let content = '';
    const nextComponentIndex = html.indexOf('[COMPONENT:', startIndex);
    
    if (nextComponentIndex === -1) {
      content = html.substring(startIndex);
    } else {
      content = html.substring(startIndex, nextComponentIndex);
    }
    
    components.push({
      type: componentType,
      content: cleanHTML(content.trim()),
      drupalComponentType: mapComponentToDrupal(componentType)
    });
  }
  
  return components;
}

function mapComponentToDrupal(componentType) {
  const mapping = {
    'Text Block 1': 'c_text',
    'Text Block 2': 'c_text',
    'Text Block 3': 'c_text',
    'Contact Us Small': 'c_signposting',  // Exemplo
    'Image Gallery': 'c_media',  // Exemplo
    // ... mais mapeamentos conforme necessário
  };
  
  return mapping[componentType] || 'c_text';  // Default: c_text
}
```

### 6. Extração de SEO Metadata

**Problema:** template.docx tem seção `SEO METADATA` que pode conter múltiplos campos

**Solução:**
```javascript
function extractSEOMetadata(html) {
  const seoSectionMatch = html.match(/SEO METADATA([\s\S]*?)(?:\[COMPONENT:|$)/i);
  
  if (seoSectionMatch) {
    const seoContent = seoSectionMatch[1];
    
    // Tenta extrair meta title e description da seção
    return {
      metaTitle: extractFromSection(seoContent, 'Meta title:') || 
                 extractFromSection(seoContent, 'Title:'),
      metaDescription: extractFromSection(seoContent, 'Meta description:') || 
                       extractFromSection(seoContent, 'Description:')
    };
  }
  
  return null;
}

function extractFromSection(text, marker) {
  const regex = new RegExp(marker + '\\s*([^\\n]+)', 'i');
  const match = text.match(regex);
  return match ? match[1].trim() : null;
}
```

---

## 🔀 Estratégia de Detecção de Formato

Para o script funcionar com ambos os formatos, implementar detecção automática:

```javascript
function detectDocxFormat(html) {
  // Verifica presença de marcadores característicos
  const hasStandardMarkers = /(?:URL:|H1:|Intro \(H3\)|Text block)/.test(html);
  const hasAlternativeMarkers = /(?:Source:|Article category:|\[COMPONENT:)/.test(html);
  
  if (hasStandardMarkers) {
    return 'standard';  // "How do I know if my cat is sick" format
  } else if (hasAlternativeMarkers) {
    return 'template';  // "template.docx" format
  } else {
    return 'unknown';
  }
}

// Uso
function parseArticle(html) {
  const format = detectDocxFormat(html);
  
  switch (format) {
    case 'standard':
      return parseStandardFormat(html);
    case 'template':
      return parseTemplateFormat(html);
    default:
      // Tentativa genérica ou erro
      return parseGenericFormat(html);
  }
}
```

---

## 📝 Exemplo de Mapeamento: template.docx → Drupal

### Conteúdo do template.docx:

```
Source: https://www.purina.fr/choisir-animal/articles/accueillir-chien/prenom/chien-petite-taille

Les meilleurs prénoms de petits chiens pour votre nouvel animal de compagnie

Article category: Noms de chien - https://www.purina.fr/choisir-animal/articles/accueillir-chien/prenom

[COMPONENT: Contact Us Small]

[COMPONENT: Text Block 1]
Les petits chiens ont de nombreux atouts. Ils sont mignons, tiennent sur nos genoux...

Autres idées de noms pour un petit chien
Vous voulez plus de propositions, voici quelques noms pour petits chiens...

- Kiki
- Pépite
- Croquette
- Cookie

SEO METADATA
Meta title: Les meilleurs prénoms pour petits chiens | Purina
Meta description: Découvrez des idées de prénoms pour votre petit chien...
```

### Mapeamento para Drupal:

| Conteúdo template.docx | Campo Drupal | ID do Campo |
|------------------------|--------------|-------------|
| `Source: https://...` | URL Alias | `edit-path-0-alias` → `/choisir-animal/articles/accueillir-chien/prenom/chien-petite-taille` |
| Heading 1: "Les meilleurs prénoms..." | Título | `edit-title-0-value` |
| `Article category: Noms de chien` | Categoria (taxonomy) | Depende da configuração Drupal |
| `[COMPONENT: Contact Us Small]` | Paragraph: Signposting | `field_article_lp_components[0]` type: `c_signposting` |
| `[COMPONENT: Text Block 1]` conteúdo | Paragraph: Text | `field_article_lp_components[1]` type: `c_text` |
| SEO METADATA → Meta title | Meta Title | `edit-field-meta-tags-0-basic-title` |
| SEO METADATA → Meta description | Meta Description | `edit-field-meta-tags-0-basic-description` |

---

## ⚙️ Alterações Requeridas no v1 Script

### Resumo de Modificações

| # | Modificação | Prioridade | Complexidade | Impacto |
|---|-------------|------------|--------------|---------|
| 1 | Adicionar suporte a `Source:` como alternativa a `URL:` | 🔴 Alta | ⭐ Baixa | Todo template.docx |
| 2 | Extrair título de Heading 1 quando `H1:` ausente | 🔴 Alta | ⭐⭐ Média | Todo template.docx |
| 3 | Parser de `[COMPONENT: ...]` marcadores | 🟡 Média | ⭐⭐⭐ Alta | Componentes especiais |
| 4 | Extração de `Article category:` | 🟢 Baixa | ⭐ Baixa | Metadado opcional |
| 5 | Parser de seção `SEO METADATA` | 🟡 Média | ⭐⭐ Média | Meta tags template.docx |
| 6 | Detecção automática de formato | 🔴 Alta | ⭐⭐ Média | Ambos formatos |
| 7 | Mapeamento de componentes especiais para Drupal | 🟡 Média | ⭐⭐⭐ Alta | Contact Us, etc. |

---

## 🎯 Estratégia de Implementação Recomendada

### Fase 1: Suporte Básico (Prioridade Alta)

**Objetivo:** Fazer template.docx funcionar com funcionalidades básicas

1. ✅ Adicionar `Source:` como alternativa a `URL:`
2. ✅ Extrair título de Heading 1
3. ✅ Detecção automática de formato
4. ✅ Parser básico de `SEO METADATA`

**Código Exemplo:**
```javascript
function parseArticleContent(html) {
  const format = detectDocxFormat(html);
  
  const parsed = {
    url: extractURL(html),  // Suporta URL: ou Source:
    title: extractTitle(html),  // Suporta H1: ou Heading 1
    metaTitle: null,
    metaDescription: null,
    intro: null,
    textBlocks: []
  };
  
  if (format === 'template') {
    // Parser específico para template.docx
    const seoMeta = extractSEOMetadata(html);
    parsed.metaTitle = seoMeta?.metaTitle;
    parsed.metaDescription = seoMeta?.metaDescription;
    parsed.category = extractCategory(html);
    
    // Extrai intro do primeiro parágrafo após título
    parsed.intro = extractFirstParagraph(html);
    
  } else {
    // Parser padrão (How do I know if my cat is sick)
    parsed.metaTitle = extractByMarker(html, 'Meta title:');
    parsed.metaDescription = extractByMarker(html, 'Meta description:');
    parsed.intro = extractByMarker(html, 'Intro (H3)');
  }
  
  return parsed;
}
```

### Fase 2: Componentes Especiais (Prioridade Média)

**Objetivo:** Suportar marcadores `[COMPONENT: ...]`

1. Parser de componentes
2. Mapeamento para tipos Drupal Paragraphs
3. Criação automática de componentes especiais (Contact Us, etc.)

### Fase 3: Refinamentos (Prioridade Baixa)

**Objetivo:** Funcionalidades avançadas

1. Suporte a categorias/taxonomies
2. Validação de componentes
3. Preview antes de submissão

---

## 📋 Checklist de Compatibilidade

Antes de processar template.docx, verificar:

- [ ] Script detecta formato automaticamente
- [ ] URL extraída corretamente de `Source:`
- [ ] Título extraído de Heading 1
- [ ] Meta title/description extraídos de `SEO METADATA`
- [ ] Componentes `[COMPONENT: ...]` são identificados
- [ ] Categoria extraída (se presente)
- [ ] Formatação (listas, headings) preservada
- [ ] Componentes mapeados para tipos Drupal corretos

---

## 🚨 Limitações Conhecidas

### Não Implementado Atualmente

1. **Categoria/Taxonomy:** Campo `Article category:` não tem mapeamento automático
   - **Workaround:** Preencher manualmente após criação

2. **Componentes Especiais:** `[COMPONENT: Contact Us Small]` não tem tipo Drupal definido
   - **Workaround:** Mapear manualmente ou ignorar

3. **SEO Metadata Complexo:** Se seção `SEO METADATA` tiver múltiplos campos não-padrão
   - **Workaround:** Extrair apenas title/description conhecidos

---

## 💡 Recomendações

### Para Usuários

1. **Padronizar Formato:** Recomenda-se usar formato "How do I know if my cat is sick" para máxima compatibilidade
2. **Conversão:** Converter template.docx para formato padrão antes de processar
3. **Teste:** Sempre testar com artigo de exemplo antes de processar em produção

### Para Desenvolvedores

1. **Implementar Fase 1** primeiro (suporte básico)
2. **Testes Unitários:** Criar testes para ambos os formatos
3. **Documentação:** Manter este documento atualizado com novas descobertas
4. **Feedback Loop:** Testar com usuários reais e ajustar parsers conforme necessário

---

**Última atualização:** 2025-12-01
