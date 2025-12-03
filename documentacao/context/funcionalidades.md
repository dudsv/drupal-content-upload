# Mapeamento de Funcionalidades

## 1. Importação de Conteúdo
- **Upload de .docx**: Leitura direta de arquivos Word, convertendo para HTML e extraindo imagens.
- **Input de Markdown**: Área de texto para colar conteúdo em Markdown, com conversão automática para HTML.
- **Colar HTML**: Suporte para colar HTML rico diretamente no editor visual.

## 2. Processamento e Análise
- **Sanitização**: Limpeza automática de tags HTML não permitidas.
- **Detecção de Formato**:
    - *Template*: Reconhece marcadores explícitos `[COMPONENT: Tipo]`.
    - *Standard*: Tenta inferir blocos (Intro, Texto 1, Imagem 1, etc.) baseando-se na estrutura sequencial.
- **Extração de Metadados**: Identifica Título (H1), Meta Title, Meta Description, OG Tags e URL Alias.
- **Conversão de Negrito em Títulos**: Ferramenta para transformar frases em negrito em tags H2/H3/H4.

## 3. Interface de Usuário (UI)
- **Painel Flutuante**: Interface sobreposta ao Drupal.
- **Editor Visual**: Área "contenteditable" para pré-visualizar e ajustar o conteúdo antes de enviar.
- **Preview de Metadados**: Exibição dos dados de SEO extraídos.
- **Logs**: Área de feedback textual sobre as ações realizadas.

## 4. Automação Drupal (Preenchimento)
- **Criação de Componentes**:
    - Identifica quais componentes (Paragraphs) são necessários.
    - Clica automaticamente nos botões "Add more" correspondentes.
    - Aguarda o carregamento AJAX do Drupal.
    - Lida com botões do tipo "Dropbutton".
- **Preenchimento de Campos**:
    - Preenche Títulos e Metatags.
    - Insere conteúdo HTML em campos CKEditor (compatível com CKEditor 4 e 5).
    - Insere texto em inputs simples e textareas.
- **Mapeamento Flexível**: Usa um objeto de configuração (`MODELS`) para adaptar seletores a diferentes tipos de conteúdo/idiomas.

## 5. Funcionalidades Auxiliares
- **Auto-Tag**: Tentativa de marcar automaticamente blocos de texto e imagens no editor.
- **Sanitize Button**: Botão dedicado para limpar o HTML do editor.
- **Re-scan de Bolds**: Permite reanalisar o texto em busca de novos negritos para conversão.
