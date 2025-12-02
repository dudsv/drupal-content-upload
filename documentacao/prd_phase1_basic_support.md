# PRD: Fase 1 - Suporte Básico ao template.docx

**Versão:** 1.0  
**Data:** 2025-12-01  
**Autor:** Development Team  
**Status:** 🟡 Planejamento

---

## 🎯 Objetivo

Implementar suporte básico ao formato alternativo `template.docx` no script v1, permitindo que o script processe ambos os formatos de DOCX (padrão e alternativo) automaticamente, mantendo compatibilidade com o formato existente.

### Métricas de Sucesso

- ✅ Script detecta automaticamente formato do DOCX (padrão vs template)
- ✅ Template.docx processa corretamente campos básicos (URL, título, meta tags)
- ✅ 100% compatibilidade retroativa com formato padrão
- ✅ Tempo de processamento < 3 segundos para qualquer formato

---

## 📋 Contexto e Motivação

### Problema Atual

O script v1 atualmente suporta apenas o formato "How do I know if my cat is sick.docx" com marcadores explícitos (`URL:`, `H1:`, `Meta title:`, etc.). O formato `template.docx` usa estrutura diferente que não é reconhecida.

### Impacto

- ❌ Usuários não podem processar arquivos template.docx
- ❌ Necessidade de converter manualmente para formato padrão
- ❌ Risco de erros de conversão manual

### Benefícios da Implementação

- ✅ Flexibilidade para aceitar múltiplos formatos
- ✅ Redução de trabalho manual
- ✅ Experiência de usuário melhorada
- ✅ Base para funcionalidades avançadas (Fase 2 e 3)

---

## 🔧 Requisitos Funcionais

### RF-01: Detecção Automática de Formato

**Prioridade:** 🔴 Crítica  
**Complexidade:** ⭐⭐ Média

**Descrição:**  
O script deve detectar automaticamente se o DOCX carregado é do formato padrão ou template, sem intervenção do usuário.

**Critérios de Aceitação:**
- [ ] Script analisa marcadores presentes no HTML convertido
- [ ] Retorna 'standard', 'template', ou 'unknown'
- [ ] Decisão em < 100ms
- [ ] Log em console indicando formato detectado

**Lógica de Detecção:**
```javascript
// Marcadores do formato padrão
if (html.includes('URL:') && html.includes('H1:') && html.includes('Intro (H3)')) {
  return 'standard';
}

// Marcadores do formato template
if (html.includes('Source:') || html.includes('[COMPONENT:') || html.includes('Article category:')) {
  return 'template';
}

return 'unknown';
```

---

### RF-02: Suporte ao Marcador `Source:`

**Prioridade:** 🔴 Crítica  
**Complexidade:** ⭐ Baixa

**Descrição:**  
Extrair URL do artigo do marcador `Source:` quando `URL:` não estiver presente.

**Critérios de Aceitação:**
- [ ] Extrai URL de `Source: https://...`
- [ ] Remove domínio e mantém apenas path
- [ ] Fallback para `URL:` se `Source:` ausente
- [ ] Validação de formato de URL

**Exemplo:**
```
Input: "Source: https://www.purina.fr/choisir-animal/articles/accueillir-chien/prenom/chien-petite-taille"
Output: "/choisir-animal/articles/accueillir-chien/prenom/chien-petite-taille"
```

---

### RF-03: Extração de Título de Heading 1

**Prioridade:** 🔴 Crítica  
**Complexidade:** ⭐⭐ Média

**Descrição:**  
Quando marcador `H1:` ausente, extrair título do primeiro `<h1>` no HTML.

**Critérios de Aceitação:**
- [ ] Busca primeiro `<h1>` tag no documento
- [ ] Remove tags HTML e mantém apenas texto
- [ ] Fallback para marcador `H1:` se presente
- [ ] Limita a 255 caracteres (max do campo Drupal)
- [ ] Sanitiza caracteres especiais

**Implementação:**
```javascript
function extractTitle(html) {
  // Tenta marcador explícito primeiro
  let title = extractByMarker(html, 'H1:');
  
  // Se não encontrar, busca <h1>
  if (!title) {
    const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
    if (h1Match) {
      title = stripHTML(h1Match[1]).trim();
    }
  }
  
  return title?.substring(0, 255) || '';
}
```

---

### RF-04: Parser de Seção `SEO METADATA`

**Prioridade:** 🔴 Crítica  
**Complexidade:** ⭐⭐ Média

**Descrição:**  
Extrair meta title e meta description da seção `SEO METADATA` quando marcadores explícitos ausentes.

**Critérios de Aceitação:**
- [ ] Identifica seção `SEO METADATA` no documento
- [ ] Extrai `Meta title:` da seção
- [ ] Extrai `Meta description:` da seção
- [ ] Fallback para marcadores explícitos no topo do documento
- [ ] Valida limites (title: 60 chars, description: 160 chars)

**Exemplo:**
```
Input (template.docx):
"...
SEO METADATA
Meta title: Les meilleurs prénoms pour petits chiens | Purina
Meta description: Découvrez des idées de prénoms..."

Output:
{
  metaTitle: "Les meilleurs prénoms pour petits chiens | Purina",
  metaDescription: "Découvrez des idées de prénoms..."
}
```

---

### RF-05: Extração de Intro Implícito

**Prioridade:** 🟡 Alta  
**Complexidade:** ⭐⭐ Média

**Descrição:**  
Quando marcador `Intro (H3)` ausente (template.docx), extrair primeiro parágrafo após o título como introdução.

**Critérios de Aceitação:**
- [ ] Identifica primeiro `<p>` após primeiro `<h1>`
- [ ] Extrai até próximo heading ou marcador de componente
- [ ] Preserva formatação HTML básica (strong, em, links)
- [ ] Fallback para marcador explícito `Intro (H3)`

---

### RF-06: Parser Unificado com Switch de Formato

**Prioridade:** 🔴 Crítica  
**Complexidade:** ⭐⭐⭐ Alta

**Descrição:**  
Implementar função de parsing que escolhe estratégia baseada no formato detectado.

**Critérios de Aceitação:**
- [ ] Função `parseArticle()` retorna estrutura unificada independente do formato
- [ ] Estrutura de retorno idêntica para ambos formatos
- [ ] Todos os campos mapeados corretamente
- [ ] Sem quebra de compatibilidade com formato padrão

**Estrutura de Retorno:**
```javascript
{
  format: 'standard' | 'template',
  url: string,
  title: string,
  metaTitle: string,
  metaDescription: string,
  intro: string,
  textBlocks: string[],
  altTag: string | null,
  category: { name: string, url: string } | null  // Apenas template
}
```

---

## ⚙️ Requisitos Técnicos

### RT-01: Modificações no Código v1

**Arquivo:** `v1` (bookmarklet)

**Funções a Adicionar:**

1. `detectDocxFormat(html)` → string
2. `extractURL(html)` → string (com suporte Source:)
3. `extractTitle(html)` → string (com suporte H1)
4. `extractSEOMetadata(html)` → object
5. `parseTemplateFormat(html)` → object
6. `parseStandardFormat(html)` → object (refatorar existente)

**Funções a Modificar:**

1. `parseArticle(html)` - adicionar switch de formato
2. `extractByMarkers(html)` - adicionar marcadores alternativos
3. `fillDrupal(mapping, meta)` - garantir compatibilidade

---

### RT-02: Estrutura de Código

```javascript
// === FORMATO DETECTION ===
function detectDocxFormat(html) {
  const hasStandardMarkers = /(?:URL:|H1:|Intro \(H3\)|Text block)/.test(html);
  const hasTemplateMarkers = /(?:Source:|Article category:|\[COMPONENT:)/.test(html);
  
  if (hasStandardMarkers) return 'standard';
  if (hasTemplateMarkers) return 'template';
  return 'unknown';
}

// === MAIN PARSER ===
function parseArticle(html) {
  const format = detectDocxFormat(html);
  
  console.log(`[v1] Formato detectado: ${format}`);
  
  switch (format) {
    case 'standard':
      return parseStandardFormat(html);
    case 'template':
      return parseTemplateFormat(html);
    default:
      console.warn('[v1] Formato desconhecido, tentando parser genérico');
      return parseGenericFormat(html);
  }
}
```

---

### RT-03: Backwards Compatibility

**Garantias:**
- ✅ Código existente para formato padrão não deve ser modificado (apenas refatorado)
- ✅ Nenhuma regressão em funcionalidade existente
- ✅ Performance igual ou melhor
- ✅ Testes com arquivos existentes devem passar 100%

---

### RT-04: Error Handling

```javascript
function parseWithFallback(html) {
  try {
    const format = detectDocxFormat(html);
    const parsed = parseArticle(html);
    
    // Validação de campos obrigatórios
    if (!parsed.title || !parsed.url) {
      throw new Error('Campos obrigatórios ausentes');
    }
    
    return parsed;
    
  } catch (error) {
    console.error('[v1] Erro no parsing:', error);
    alert('Erro ao processar DOCX. Verifique o formato do arquivo.');
    return null;
  }
}
```

---

## ✅ Critérios de Aceitação Global

### Funcional

- [ ] Formato padrão processa 100% como antes
- [ ] Template.docx extrai URL corretamente
- [ ] Template.docx extrai título de H1
- [ ] Template.docx extrai meta tags de SEO METADATA
- [ ] Template.docx extrai intro do primeiro parágrafo
- [ ] Ambos formatos geram mesma estrutura de dados
- [ ] Campos Drupal preenchidos corretamente para ambos

### Não-Funcional

- [ ] Detecção de formato < 100ms
- [ ] Parsing completo < 3 segundos
- [ ] Sem memory leaks
- [ ] Console logs informativos
- [ ] Error handling robusto

### UX

- [ ] Usuário não precisa especificar formato
- [ ] Mensagem clara sobre formato detectado
- [ ] Erros com mensagens descritivas
- [ ] Comportamento idêntico para ambos formatos após parsing

---

## 🧪 Plano de Testes

### Teste 001: Detecção de Formato Padrão

**Input:** `How do I know if my cat is sick.docx`  
**Esperado:** `format = 'standard'`  
**Status:** ⬜ Não testado

### Teste 002: Detecção de Formato Template

**Input:** `template.docx`  
**Esperado:** `format = 'template'`  
**Status:** ⬜ Não testado

### Teste 003: Extração de URL com Source:

**Input:** `Source: https://www.purina.fr/articles/test`  
**Esperado:** `url = '/articles/test'`  
**Status:** ⬜ Não testado

### Teste 004: Extração de Título H1

**Input:** `<h1>Test Title</h1>`  
**Esperado:** `title = 'Test Title'`  
**Status:** ⬜ Não testado

### Teste 005: Parser SEO METADATA

**Input:**
```
SEO METADATA
Meta title: Test | Purina
Meta description: Test description
```
**Esperado:**
```javascript
{
  metaTitle: 'Test | Purina',
  metaDescription: 'Test description'
}
```
**Status:** ⬜ Não testado

### Teste 006: Compatibilidade Retroativa

**Input:** Todos os DOCX padrão existentes  
**Esperado:** 100% parsing correto sem regressões  
**Status:** ⬜ Não testado

### Teste 007: End-to-End template.docx

**Input:** `template.docx` completo  
**Esperado:** Todos os campos Drupal preenchidos corretamente  
**Status:** ⬜ Não testado

---

## ⚠️ Riscos e Mitigações

### Risco 1: Regressão em Formato Padrão

**Probabilidade:** 🟡 Média  
**Impacto:** 🔴 Alto

**Mitigação:**
- Refatorar código existente sem modificar lógica
- Testes extensivos com DOCX padrão
- Feature flag para habilitar/desabilitar novo código

### Risco 2: Template.docx Variações Não Previstas

**Probabilidade:** 🔴 Alta  
**Impacto:** 🟡 Médio

**Mitigação:**
- Parser robusto com fallbacks
- Logging extensivo para debug
- Validação de campos obrigatórios

### Risco 3: Performance

**Probabilidade:** 🟢 Baixa  
**Impacto:** 🟡 Médio

**Mitigação:**
- Cache de detecção de formato
- Regex otimizados
- Testes de performance

### Risco 4: Complexidade de Manutenção

**Probabilidade:** 🟡 Média  
**Impacto:** 🟡 Médio

**Mitigação:**
- Código modular e bem documentado
- Separation of concerns (parser por formato)
- Testes unitários

---

## 📊 Estimativas

### Esforço de Desenvolvimento

| Tarefa | Estimativa | Complexidade |
|--------|-----------|--------------|
| Detecção de formato | 2h | ⭐ Baixa |
| Suporte Source: | 1h | ⭐ Baixa |
| Extração H1 | 2h | ⭐⭐ Média |
| Parser SEO METADATA | 3h | ⭐⭐ Média |
| Extração intro implícito | 2h | ⭐⭐ Média |
| Parser unificado | 4h | ⭐⭐⭐ Alta |
| Refatoração código existente | 3h | ⭐⭐ Média |
| Testes | 5h | ⭐⭐ Média |
| Documentação | 2h | ⭐ Baixa |
| **TOTAL** | **24h** | **3 dias úteis** |

### Cronograma Sugerido

**Semana 1:**
- Day 1-2: Implementação núcleo (detecção, parsers)
- Day 3: Integração e refatoração
- Day 4: Testes e correções
- Day 5: Documentação e review

---

## 🚀 Próximos Passos

### Após Fase 1

1. ✅ Validar com usuários reais
2. ✅ Coletar feedback sobre edge cases
3. ✅ Iniciar Fase 2 (Componentes Especiais)

### Dependências

- ⬜ Aprovação deste PRD
- ⬜ Alocação de desenvolvedor
- ⬜ Ambiente de teste configurado

---

## 📎 Anexos

### Referências

- [template_docx_analysis.md](file:///C:/Users/BRBritoCa1/.gemini/antigravity/brain/df2d5fd9-6b27-45d6-a4f1-7643afef4cd3/template_docx_analysis.md)
- [article_creation_process.md](file:///C:/Users/BRBritoCa1/.gemini/antigravity/brain/df2d5fd9-6b27-45d6-a4f1-7643afef4cd3/article_creation_process.md)
- [v1 script](file:///c:/Users/BRBritoCa1/OneDrive%20-%20NESTLE/Codes/drupal-content-upload/v1)

### Exemplos de Código Completo

Ver [template_docx_analysis.md#implementação](file:///C:/Users/BRBritoCa1/.gemini/antigravity/brain/df2d5fd9-6b27-45d6-a4f1-7643afef4cd3/template_docx_analysis.md) para código completo das funções.

---

**Aprovações Necessárias:**

- [ ] Product Owner
- [ ] Tech Lead
- [ ] QA Lead

**Última Atualização:** 2025-12-01
