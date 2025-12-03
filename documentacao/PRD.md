# Product Requirements Document (PRD) - Refatoração Drupal Content Upload

## 1. Introdução
O objetivo deste projeto é refatorar a ferramenta "Drupal Content Upload" (atualmente um script monolítico `main.js`) para uma arquitetura modular, robusta e fácil de manter. A ferramenta atual sofre de alta complexidade, dificultando a adição de novas features e a correção de bugs.

## 2. Objetivos
- **Modularidade**: Dividir o código em módulos com responsabilidades claras (UI, Parser, Drupal API, Utils).
- **Manutenibilidade**: Facilitar a leitura e edição do código por humanos e IAs.
- **Extensibilidade**: Permitir a fácil adição de novos componentes Drupal e regras de parser.
- **Confiabilidade**: Melhorar a robustez da interação com o Drupal (AJAX, seletores).

## 3. Requisitos Funcionais
### 3.1. Core
- **RF-01**: O sistema deve continuar suportando a injeção via UserScript ou similar.
- **RF-02**: Deve manter a compatibilidade com os modelos de mapeamento existentes (`MODELS`).

### 3.2. Importação e Parsing
- **RF-03**: Deve suportar upload de arquivos `.docx` e extração fiel de conteúdo (texto, imagens, listas, tabelas).
- **RF-04**: Deve suportar entrada de Markdown e HTML.
- **RF-05**: Deve detectar automaticamente o formato do conteúdo (Template vs Standard).
- **RF-06**: Deve permitir a definição de regras de parsing customizáveis para diferentes tipos de artigos.

### 3.3. Interface (UI)
- **RF-07**: A UI deve ser desacoplada da lógica de negócios.
- **RF-08**: Deve fornecer feedback visual claro sobre o progresso das ações (ex: "Criando componente 1/5...").
- **RF-09**: Deve permitir a edição manual do conteúdo parseado antes do preenchimento.

### 3.4. Integração Drupal
- **RF-10**: A interação com o DOM do Drupal deve ser isolada em um módulo adaptador.
- **RF-11**: O sistema de espera por AJAX deve ser robusto e configurável.
- **RF-12**: Deve suportar diferentes versões do CKEditor (4 e 5).

## 4. Requisitos Não-Funcionais
- **RNF-01**: O código deve seguir padrões modernos de JavaScript (ES6+).
- **RNF-02**: O código deve ser documentado (JSDoc).
- **RNF-03**: A arquitetura deve facilitar testes unitários das funções de parsing.

## 5. Estrutura Proposta (High-Level)
- `src/core`: Lógica principal de orquestração.
- `src/ui`: Componentes visuais (Painel, Editor).
- `src/parsers`: Módulos para Markdown, Docx e HTML.
- `src/drupal`: Adaptadores para interação com a página do Drupal.
- `src/utils`: Helpers genéricos.
- `src/config`: Definições de modelos e constantes.

## 6. Fases de Implementação

### Fase 1: Suporte Básico (Concluída ✅)
- Suporte a múltiplos formatos de DOCX.
- Refatoração inicial do parser.

### Fase 2: Componentes Especiais (Concluída ✅)
- Parsing de `[COMPONENT: ...]` markers.
- Extração de Categoria e Metadados SEO.
- Criação automatizada de componentes via AJAX.

### Fase 3: Refinamentos Avançados (Concluída ✅)
- **RF-13**: Validação de Conteúdo (Alertas de erros/warnings).
- **RF-14**: Preview do Artigo (Modal visual antes do preenchimento).
- **RF-17**: Recuperação de Erros (Retry automático para AJAX).
- *RF-15 (Batch Processing) adiado.*

### Fase 4: Testes Complexos (Em Planejamento 🚧)
- Validação com `medium.docx` (estruturas complexas).
- Refinamento de edge cases.
