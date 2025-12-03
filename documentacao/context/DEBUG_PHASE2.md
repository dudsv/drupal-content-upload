# Debug Guide - Phase 2 Component Creation

## Checklist de Debug

### 1. Verificar Detecção de Formato
No console do navegador, após clicar "Analisar", procure por:
```
[v1-Phase2] Formato detectado: template
```

**Se aparecer "standard":** O DOCX usado não tem marcadores `[COMPONENT: ...]` ou `Source:`

### 2. Verificar Extração de Componentes
Procure no console:
```
[v1-Phase2] 3 componente(s) extraído(s)
[v1-Phase2] Template format parsed: {h1: '...', componentsCount: 3, ...}
```

**Se `componentsCount: 0`:** Os marcadores `[COMPONENT: ...]` não foram encontrados no DOCX

### 3. Verificar Tentativa de Criação
Ao clicar "Preencher Drupal", procure:
```
📦 PHASE 2: Criando componentes...
Total de componentes: 3
🔄 Adicionando componente 1/3: Text Block 1 (c_text)
```

**Se não aparecer:** A lógica de criação não está sendo acionada

### 4. Verificar Botão "Add More"
Se a criação tentar rodar, procure:
```
[v1-Phase2] Found add button: field-article-lp-components-c_text-add-more
```

**Se aparecer "Add button not found":** O formulário Drupal não tem botões "Add More" visíveis

---

## Soluções Rápidas

### Problema: Formato não detectado como "template"
**Causa:** DOCX não tem marcadores corretos  
**Solução:** Certifique-se que o DOCX tem:
- `Source: [URL]` (não `URL:`)
- `[COMPONENT: Text Block 1]` ou similar
- Seção `SEO METADATA`

### Problema: Componentes não extraídos
**Causa:** Marcadores malformados  
**Solução:** Verifique o formato exato:
```
[COMPONENT: Text Block 1]
Conteúdo do componente aqui...

[COMPONENT: Contact Us Small]
Outro conteúdo...
```

### Problema: Botões "Add More" não encontrados
**Causa:** Página Drupal não expandida ou IDs diferentes  
**Solução:** 
1. Expanda manualmente todos os Paragraphs antes de usar o script
2. Verifique se os botões existem com ID padrão: `field-article-lp-components-c_text-add-more`

---

## Como Testar Agora

### Teste Rápido - Verificar Logs
1. Abra página Drupal
2. Cole script v1 no console
3. Upload do DOCX
4. Clique "Analisar"
5. **PAUSE AQUI** - Copie TODOS os logs do console que começam com `[v1-Phase2]`
6. Cole os logs aqui para análise

### Teste Manual - Criar Componente
Para confirmar que o código funciona:
1. Abra console do navegador
2. Execute manualmente:
```javascript
// Simular 1 componente
const testComponent = {
  type: 'Text Block 1',
  content: '<p>Teste de conteúdo</p>',
  drupalType: 'c_text'
};

// Tentar criar
createDrupalComponents([testComponent], []).then(result => {
  console.log('Resultado:', result);
});
```

---

## Workaround Temporário

Se a criação automática não funcionar agora, você pode:

### Opção A: Criar componentes manualmente primeiro
1. Crie os componentes necessários manualmente no Drupal
2. Use o script apenas para preencher o conteúdo
3. Script preencherá campos dos componentes existentes

### Opção B: Usar formato standard
1. Converta template.docx para formato standard
2. Use marcadores `URL:`, `H1:`, `Text block 1`, etc.
3. Script preenche os 3 text blocks padrão

---

## Próximos Passos

**Opção 1 - Debug Imediato:**
- Cole os logs do console aqui
- Identifico o problema exato
- Ajusto o código se necessário

**Opção 2 - Aceitar Limitação:**
- Criar componentes manualmente primeiro
- Usar script apenas para preenchimento
- Programar fix completo para depois

**Qual opção prefere?**
