# Plano de Refatoração

## Fase 1: Preparação e Estrutura
1.  **Backup**: Garantir que a versão atual (`main`) esteja salva e funcional (dentro do possível).
2.  **Estrutura de Diretórios**: Criar a estrutura de pastas para o novo código modular.
    ```
    /src
      /config
      /core
      /drupal
      /parsers
      /ui
      /utils
    ```
3.  **Setup de Build**: Configurar um bundler simples (ex: esbuild ou webpack) para juntar os módulos em um único arquivo final (`dist/bundle.js`) para fácil injeção no navegador.

## Fase 2: Extração de Módulos (Decomposição)
### Passo 2.1: Utils e Config
- Extrair funções utilitárias (`waitFor`, `sanitizeHTML`, `esc`, `pulse`) para `src/utils`.
- Mover a constante `MODELS` e configurações de seletores para `src/config`.

### Passo 2.2: Parsers
- Extrair `markdownToHTML` para `src/parsers/markdown.js`.
- Extrair `getDocxHTML` e lógica do JSZip para `src/parsers/docx.js`.
- Extrair `detectDocxFormat`, `extractComponents`, `parseTemplateFormat` para `src/parsers/format-detector.js`.

### Passo 2.3: Camada Drupal
- Criar `src/drupal/adapter.js` para encapsular:
    - `fillDrupal`
    - `createDrupalComponents`
    - `fillComponentContent`
    - `waitForAjax`
    - `getAddMoreButtonId`

### Passo 2.4: Interface (UI)
- Extrair a construção do HTML/CSS do painel para `src/ui/panel.js`.
- Mover a lógica de eventos de UI para `src/ui/events.js`.

## Fase 3: Reintegração e Testes
1.  **Core Controller**: Criar `src/main.js` que importa os módulos e inicializa a aplicação.
2.  **Build**: Gerar o bundle.
3.  **Teste Manual**: Testar o bundle gerado no ambiente Drupal para garantir que nenhuma funcionalidade foi perdida.

## Fase 4: Melhorias e Limpeza
1.  **Refatoração Interna**: Melhorar a legibilidade das funções extraídas (agora que estão isoladas).
2.  **Documentação**: Adicionar JSDoc nas funções principais.
3.  **Tratamento de Erros**: Implementar um sistema de logs e tratamento de erros mais robusto na camada `core`.
