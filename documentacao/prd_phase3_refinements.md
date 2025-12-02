# PRD: Fase 3 - Refinamentos Avançados

**Versão:** 1.0  
**Data:** 2025-12-01  
**Autor:** Development Team  
**Status:** 🔵 Aguardando Fases 1 e 2  
**Dependências:** ✅ Fase 1 e Fase 2 completas

---

## 🎯 Objetivo

Implementar funcionalidades avançadas para melhorar experiência do usuário, robustez e produtividade do script v1, incluindo validação de conteúdo, preview antes de submissão, e processamento em lote de múltiplos artigos.

### Métricas de Sucesso

- ✅ Validação de conteúdo detecta 100% dos erros comuns
- ✅ Preview mostra representação visual do artigo antes de salvar
- ✅ Batch processing permite processar 10+ DOCXs sequencialmente
- ✅ Error recovery permite retry sem perder progresso
- ✅ User satisfaction score > 4.5/5

---

## 📋 Contexto e Motivação

### Problema Atual

Após Fases 1 e 2, o script processa DOCXs automaticamente, mas:
- ❌ Erros só detectados após submissão
- ❌ Sem preview do resultado antes de salvar
- ❌ Um DOCX por vez (ineficiente para lotes)
- ❌ Falha em um campo para todo o processo
- ❌ Falta de feedback visual do progresso

### Impacto

- ❌ Tempo desperdiçado corrigindo erros pós-submissão
- ❌ Risco de publicar artigos com erros
- ❌ Processo lento para múltiplos artigos
- ❌ Frustração do usuário em caso de falhas

### Benefícios da Implementação

- ✅ Qualidade garantida ANTES da submissão
- ✅ Confiança visual do resultado
- ✅ Produtividade 10x para lotes
- ✅ Tolerância a falhas parciais
- ✅ Experiência profissional e polida

---

## 🔧 Requisitos Funcionais

### RF-13: Validação de Conteúdo

**Prioridade:** 🔴 Crítica  
**Complexidade:** ⭐⭐⭐ Alta

**Descrição:**  
Validar conteúdo extraído do DOCX antes de processar, detectando erros comuns e alertando usuário.

**Critérios de Aceitação:**
- [ ] Valida campos obrigatórios presentes
- [ ] Valida limites de caracteres
- [ ] Valida formato de URL
- [ ] Valida estrutura de headings
- [ ] Detecta HTML inválido
- [ ] Report com erros/warnings antes de prosseguir

**Regras de Validação:**

| Campo | Regra | Severidade |
|-------|-------|------------|
| URL | Presente, formato válido, começa com `/` | 🔴 Erro |
| Title (H1) | Presente, 1-255 caracteres | 🔴 Erro |
| Meta Title | Presente, 1-60 caracteres | 🟡 Warning |
| Meta Description | Presente, 1-160 caracteres | 🟡 Warning |
| Intro | Presente, min 50 caracteres | 🟡 Warning |
| Components | Min 1 componente | 🟡 Warning |
| Headings | Hierarquia válida (H1 > H2 > H3) | 🟢 Info |
| Links | URLs válidas | 🟢 Info |

**Implementação:**
```javascript
function validateContent(parsed) {
  const errors = [];
  const warnings = [];
  const info = [];
  
  // Validação de campos obrigatórios
  if (!parsed.url) {
    errors.push('URL ausente');
  } else if (!parsed.url.startsWith('/')) {
    errors.push('URL deve começar com "/"');
  }
  
  if (!parsed.title) {
    errors.push('Título (H1) ausente');
  } else if (parsed.title.length > 255) {
    errors.push(`Título muito longo (${parsed.title.length}/255 caracteres)`);
  }
  
  // Validação de meta tags
  if (!parsed.metaTitle) {
    warnings.push('Meta title ausente');
  } else if (parsed.metaTitle.length > 60) {
    warnings.push(`Meta title muito longo (${parsed.metaTitle.length}/60 caracteres)`);
  }
  
  if (!parsed.metaDescription) {
    warnings.push('Meta description ausente');
  } else if (parsed.metaDescription.length > 160) {
    warnings.push(`Meta description muito longa (${parsed.metaDescription.length}/160 caracteres)`);
  }
  
  // Validação de conteúdo
  if (!parsed.intro || parsed.intro.length < 50) {
    warnings.push('Intro muito curta (recomendado: min 50 caracteres)');
  }
  
  if (!parsed.components || parsed.components.length === 0) {
    warnings.push('Nenhum componente encontrado');
  }
  
  return {
    valid: errors.length === 0,
    errors,
    warnings,
    info
  };
}
```

**UI de Validação:**
```javascript
function displayValidationResults(validation) {
  const modal = createModal('Validação de Conteúdo');
  
  let html = '<div class="validation-results">';
  
  if (validation.errors.length > 0) {
    html += '<div class="errors"><h3>❌ Erros Críticos</h3><ul>';
    validation.errors.forEach(e => html += `<li>${e}</li>`);
    html += '</ul></div>';
  }
  
  if (validation.warnings.length > 0) {
    html += '<div class="warnings"><h3>⚠️ Avisos</h3><ul>';
    validation.warnings.forEach(w => html += `<li>${w}</li>`);
    html += '</ul></div>';
  }
  
  if (validation.valid) {
    html += '<p class="success">✅ Conteúdo validado com sucesso!</p>';
  } else {
    html += '<p class="error">❌ Erros encontrados. Corrija antes de continuar.</p>';
  }
  
  html += '</div>';
  
  modal.innerHTML = html;
  
  return validation.valid ? confirmProceed() : false;
}
```

---

### RF-14: Preview do Artigo

**Prioridade:** 🟡 Alta  
**Complexidade:** ⭐⭐⭐⭐ Muito Alta

**Descrição:**  
Mostrar preview visual do artigo antes de submeter o formulário Drupal, permitindo usuário revisar.

**Critérios de Aceitação:**
- [ ] Preview mostra título, meta tags, URL
- [ ] Preview mostra todos os componentes em ordem
- [ ] Formatação HTML renderizada (strong, em, listas)
- [ ] Botões "Edit", "Cancel", "Submit"
- [ ] Campos editáveis inline no preview
- [ ] Re-validação ao editar

**UI do Preview:**
```html
<div id="v1-preview-modal" class="v1-modal">
  <div class="v1-modal-header">
    <h2>Preview do Artigo</h2>
    <button class="close">×</button>
  </div>
  
  <div class="v1-modal-body">
    <!-- Meta Info -->
    <div class="meta-section">
      <div class="field">
        <label>URL:</label>
        <span contenteditable="true" data-field="url">/articles/...</span>
      </div>
      <div class="field">
        <label>Meta Title:</label>
        <span contenteditable="true" data-field="metaTitle">...</span>
      </div>
      <div class="field">
        <label>Meta Description:</label>
        <span contenteditable="true" data-field="metaDescription">...</span>
      </div>
    </div>
    
    <!-- Article Content -->
    <div class="article-preview">
      <h1 contenteditable="true" data-field="title">Título do Artigo</h1>
      
      <div class="intro" contenteditable="true" data-field="intro">
        Introdução...
      </div>
      
      <!-- Components -->
      <div class="components">
        <div class="component">
          <div class="component-type">Text</div>
          <div class="component-content" contenteditable="true">...</div>
        </div>
        <!-- More components -->
      </div>
    </div>
  </div>
  
  <div class="v1-modal-footer">
    <button class="btn-cancel">Cancelar</button>
    <button class="btn-edit">Editar DOCX</button>
    <button class="btn-submit">✅ Processar e Preencher Drupal</button>
  </div>
</div>
```

**Implementação:**
```javascript
function showPreview(parsed) {
  const modal = createPreviewModal();
  
  // Populate preview
  modal.querySelector('[data-field="url"]').textContent = parsed.url;
  modal.querySelector('[data-field="metaTitle"]').textContent = parsed.metaTitle;
  modal.querySelector('[data-field="metaDescription"]').textContent = parsed.metaDescription;
  modal.querySelector('[data-field="title"]').textContent = parsed.title;
  modal.querySelector('[data-field="intro"]').innerHTML = parsed.intro;
  
  // Render components
  const componentsContainer = modal.querySelector('.components');
  parsed.components.forEach((comp, index) => {
    const compEl = createComponentPreview(comp, index);
    componentsContainer.appendChild(compEl);
  });
  
  // Event handlers
  modal.querySelector('.btn-submit').addEventListener('click', () => {
    // Sync edited values back to parsed object
    syncPreviewEdits(modal, parsed);
    closeModal(modal);
    proceedWithDrupalFill(parsed);
  });
  
  modal.querySelector('.btn-cancel').addEventListener('click', () => {
    closeModal(modal);
  });
  
  document.body.appendChild(modal);
}
```

---

### RF-15: Batch Processing de Múltiplos DOCXs

**Prioridade:** 🟡 Alta  
**Complexidade:** ⭐⭐⭐⭐ Muito Alta

**Descrição:**  
Permitir seleção de múltiplos arquivos DOCX para processar sequencialmente, criando múltiplos artigos Drupal.

**Critérios de Aceitação:**
- [ ] Input aceita múltiplos arquivos DOCX
- [ ] Lista de arquivos selecionados com preview
- [ ] Processamento sequencial (não paralelo)
- [ ] Progress bar mostrando arquivo atual (X/Y)
- [ ] Opção de pausar/cancelar processamento
- [ ] Resumo final: sucessos vs falhas
- [ ] Export de log detalhado

**UI:**
```html
<div id="v1-batch-mode">
  <h3>Batch Processing</h3>
  
  <input type="file" id="batch-files" multiple accept=".docx">
  
  <div class="files-list">
    <h4>Arquivos Selecionados (3)</h4>
    <ul>
      <li>
        <span class="filename">article1.docx</span>
        <span class="status pending">⏳ Pendente</span>
      </li>
      <li>
        <span class="filename">article2.docx</span>
        <span class="status pending">⏳ Pendente</span>
      </li>
      <li>
        <span class="filename">article3.docx</span>
        <span class="status pending">⏳ Pendente</span>
      </li>
    </ul>
  </div>
  
  <div class="progress">
    <div class="progress-bar" style="width: 33%">
      <span>1 / 3</span>
    </div>
  </div>
  
  <div class="controls">
    <button class="btn-start">▶️ Iniciar Processamento</button>
    <button class="btn-pause" disabled>⏸️ Pausar</button>
    <button class="btn-cancel">❌ Cancelar</button>
  </div>
</div>
```

**Workflow:**
```javascript
async function processBatch(files) {
  const results = [];
  let processedCount = 0;
  let isPaused = false;
  let isCancelled = false;
  
  for (let i = 0; i < files.length; i++) {
    if (isCancelled) break;
    
    while (isPaused) {
      await sleep(500);
    }
    
    updateProgress(i + 1, files.length);
    updateFileStatus(i, 'processing');
    
    try {
      const file = files[i];
      const html = await getDocxHTML(file);
      const parsed = parseArticle(html);
      const validation = validateContent(parsed);
      
      if (!validation.valid) {
        results.push({
          file: file.name,
          status: 'failed',
          error: validation.errors.join(', ')
        });
        updateFileStatus(i, 'failed');
        continue;
      }
      
      await fillDrupal(MODELS.selected, parsed);
      await clickSaveButton();
      await waitForSaveComplete();
      
      results.push({
        file: file.name,
        status: 'success'
      });
      updateFileStatus(i, 'success');
      processedCount++;
      
    } catch (error) {
      results.push({
        file: files[i].name,
        status: 'failed',
        error: error.message
      });
      updateFileStatus(i, 'failed');
    }
    
    // Delay entre artigos
    await sleep(2000);
  }
  
  showBatchSummary(results);
  exportBatchLog(results);
}
```

---

### RF-16: Progress Tracking UI

**Prioridade:** 🟡 Alta  
**Complexidade:** ⭐⭐ Média

**Descrição:**  
Interface visual mostrando progresso detalhado durante processamento do artigo.

**Critérios de Aceitação:**
- [ ] Barra de progresso geral (0-100%)
- [ ] Status textual do passo atual
- [ ] Checklist de tarefas completadas
- [ ] Tempo estimado restante
- [ ] Possibilidade de cancelar a qualquer momento

**UI:**
```html
<div id="v1-progress">
  <div class="progress-header">
    <h3>Processando Artigo...</h3>
    <button class="btn-cancel-small">Cancelar</button>
  </div>
  
  <div class="progress-bar-container">
    <div class="progress-bar" style="width: 60%"></div>
    <span class="progress-text">60%</span>
  </div>
  
  <div class="current-step">
    <strong>Passo Atual:</strong> Criando componente 3/5 (Text)
  </div>
  
  <div class="steps-checklist">
    <div class="step completed">✅ Validação de conteúdo</div>
    <div class="step completed">✅ Preenchimento de título</div>
    <div class="step completed">✅ Preenchimento de meta tags</div>
    <div class="step active">⏳ Criando componentes (3/5)</div>
    <div class="step pending">⏹️ Upload de imagens</div>
    <div class="step pending">⏹️ Salvar artigo</div>
  </div>
  
  <div class="time-estimate">
    Tempo estimado restante: ~30 segundos
  </div>
</div>
```

---

### RF-17: Error Recovery e Retry

**Prioridade:** 🟡 Alta  
**Complexidade:** ⭐⭐⭐ Alta

**Descrição:**  
Sistema de recuperação de erros que permite retry e continua processamento mesmo com falhas parciais.

**Critérios de Aceitação:**
- [ ] Erros não param todo o processo
- [ ] Opção de retry automático para falhas de AJAX (1x)
- [ ] Opção de retry manual após falha
- [ ] Checkpoint: progresso salvo
- [ ] Opção "Continuar de onde parou"
- [ ] Log detalhado de erros para debug

**Implementação:**
```javascript
class ProcessingCheckpoint {
  constructor(parsed) {
    this.parsed = parsed;
    this.completedSteps = [];
    this.failedSteps = [];
  }
  
  markCompleted(step) {
    this.completedSteps.push(step);
    this.save();
  }
  
  markFailed(step, error) {
    this.failedSteps.push({ step, error: error.message });
    this.save();
  }
  
  save() {
    localStorage.setItem('v1_checkpoint', JSON.stringify({
      completedSteps: this.completedSteps,
      failedSteps: this.failedSteps,
      timestamp: Date.now()
    }));
  }
  
  static load() {
    const data = localStorage.getItem('v1_checkpoint');
    return data ? JSON.parse(data) : null;
  }
  
  isStepCompleted(step) {
    return this.completedSteps.includes(step);
  }
}

async function processWithRecovery(parsed) {
  const checkpoint = new ProcessingCheckpoint(parsed);
  
  try {
    // Step 1: Fill title
    if (!checkpoint.isStepCompleted('title')) {
      await fillTitle(parsed.title);
      checkpoint.markCompleted('title');
    }
    
    // Step 2: Fill meta tags
    if (!checkpoint.isStepCompleted('metaTags')) {
      await fillMetaTags(parsed);
      checkpoint.markCompleted('metaTags');
    }
    
    // Step 3: Create components
    if (!checkpoint.isStepCompleted('components')) {
      await createComponents(parsed.components);
      checkpoint.markCompleted('components');
    }
    
    // Success!
    localStorage.removeItem('v1_checkpoint');
    
  } catch (error) {
    console.error('[v1] Erro durante processamento:', error);
    checkpoint.markFailed(getCurrentStep(), error);
    
    const retry = confirm(
      `Erro: ${error.message}\n\nTentar novamente?`
    );
    
    if (retry) {
      return processWithRecovery(parsed);
    } else {
      alert('Processamento interrompido. Você pode continuar mais tarde.');
    }
  }
}
```

---

### RF-18: Export/Import de Configurações

**Prioridade:** 🟢 Baixa  
**Complexidade:** ⭐⭐ Média

**Descrição:**  
Permitir exportar e importar configurações de mapeamento e preferências.

**Critérios de Aceitação:**
- [ ] Botão "Export Config" gera arquivo JSON
- [ ] Botão "Import Config" carrega configurações
- [ ] Configurações incluem: mapeamentos, preferências, custom parsers
- [ ] Validação de configuração ao importar

---

## ⚙️ Requisitos Técnicos

### RT-07: Arquitetura Modular

**Separação de Responsabilidades:**

```
v1/
  core/
    parser.js          - Parsing de DOCX
    validator.js       - Validação de conteúdo
    drupal.js          - Interação com Drupal
  ui/
    preview.js         - Preview modal
    progress.js        - Progress tracking UI
    batch.js           - Batch processing UI
  utils/
    ajax.js            - Helpers AJAX
    checkpoint.js      - Checkpointing
  config/
    mappings.js        - Component mappings
```

### RT-08: Performance

- Validação < 500ms
- Preview render < 1s
- Batch: 3-5s por artigo (incluindo delays)
- UI responsiva durante processamento

---

## ✅ Critérios de Aceitação Global

- [ ] Validação detecta 100% erros críticos
- [ ] Preview renderiza corretamente
- [ ] Edições inline no preview funcionam
- [ ] Batch processa 10 DOCXs sem falhas
- [ ] Progress tracking atualiza em tempo real
- [ ] Erros permitem retry
- [ ] Checkpoint permite continuar após interrupção
- [ ] Export/import de configurações

---

## 📊 Estimativas

| Tarefa | Estimativa | Complexidade |
|--------|-----------|--------------|
| Validação de conteúdo | 4h | ⭐⭐⭐ Alta |
| Preview UI | 6h | ⭐⭐⭐⭐ Muito Alta |
| Batch processing | 6h | ⭐⭐⭐⭐ Muito Alta |
| Progress tracking UI | 3h | ⭐⭐ Média |
| Error recovery | 4h | ⭐⭐⭐ Alta |
| Export/Import config | 2h | ⭐⭐ Média |
| Testes | 6h | ⭐⭐⭐ Alta |
| Documentação | 2h | ⭐ Baixa |
| **TOTAL** | **33h** | **4-5 dias úteis** |

---

## 🚀 Entrega e Próximos Passos

Após Fase 3:
- ✅ Sistema completo e production-ready
- ✅ Documentação de usuário final
- ✅ Treinamento de equipe
- ✅ Monitoramento de uso e feedback
- ✅ Iterações baseadas em feedback

---

**Aprovações Necessárias:**

- [ ] Product Owner
- [ ] UX Designer
- [ ] Tech Lead

**Última Atualização:** 2025-12-01
