# Contexto Técnico Atual

## Visão Geral
O projeto consiste atualmente em um único arquivo script (`main` ou `main.js`) que atua como uma ferramenta de automação "UserScript" para o CMS Drupal. Ele injeta uma interface flutuante na página de edição de conteúdo do Drupal para facilitar a importação e formatação de artigos.

## Arquitetura
- **Tipo**: Monolito (Single Script).
- **Entrada**: Arquivos `.docx` (via JSZip) ou Texto Markdown/HTML (via Clipboard).
- **Saída**: Preenchimento automatizado de campos de formulário no Drupal (Inputs, Textareas, CKEditor).
- **Dependências Externas**:
  - `JSZip` (carregado dinamicamente via CDN) para ler arquivos `.docx`.

## Principais Módulos (Lógicos)
Embora estejam no mesmo arquivo, o código pode ser dividido logicamente em:

1.  **UI Injection**: Cria e injeta o painel "NPPE – Paste Filler" com HTML/CSS embutidos.
2.  **Modelos de Mapeamento**: Objeto `MODELS` que define seletores CSS e IDs para diferentes tipos de conteúdo.
3.  **Parsers**:
    - `markdownToHTML`: Conversor customizado de Markdown para HTML.
    - `getDocxHTML`: Conversor de `.docx` (XML) para HTML, preservando hierarquia e imagens.
    - `sanitizeHTML`: Limpeza de HTML para remover tags inseguras ou indesejadas.
4.  **Detectores de Formato**:
    - `detectDocxFormat`: Identifica se o conteúdo é "Template" (estruturado) ou "Standard" (texto corrido).
    - `extractComponents`: Extrai blocos de conteúdo baseados em marcadores `[COMPONENT: ...]`.
5.  **Automação Drupal**:
    - `fillDrupal`: Orquestrador do preenchimento.
    - `createDrupalComponents`: Gerencia a criação de parágrafos (Paragraphs module) clicando em botões "Add more" e aguardando AJAX.
    - `fillComponentContent`: Preenche campos CKEditor ou textareas.
    - `waitForAjax`: Utilitário para sincronização com o backend do Drupal.

## Problemas Identificados
- **Complexidade Ciclomática**: Funções como `getDocxHTML` e `fillDrupal` são extensas e difíceis de manter.
- **Acoplamento**: A lógica de UI, Parsing e Automação está misturada.
- **Fragilidade**: Seletores CSS e IDs são hardcoded ou dependem de configurações complexas no objeto `MODELS`.
- **Manutenibilidade**: O arquivo único com ~2500 linhas dificulta a navegação e o uso de assistentes de IA.
