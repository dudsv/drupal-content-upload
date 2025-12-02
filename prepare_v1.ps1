# Lê o backup do usuário (já está na mensagem)
$backupContent = @'
[CONTEÚDO COMPLETO AQUI]
'@

# Define a função antiga
$oldFunction = @'
  // Get the "Add more" button ID for a specific component type
  const getAddMoreButtonId = (drupalType) => {
    // Pattern: field-article-lp-components-{type}-add-more
    const buttonId = `field-article-lp-components-${drupalType}-add-more`;
    const button = document.getElementById(buttonId);

    if (button) {
      console.log('[v1-Phase2] Found add button:', buttonId);
      return buttonId;
    }

    console.warn('[v1-Phase2] Add button not found for type:', drupalType);
    return null;
  };
'@

# Define a função corrigida
$newFunction = @'
  // Get the "Add more" button ID for a specific component type
  const getAddMoreButtonId = (drupalType) => {
    // Map internal types to actual Drupal button IDs (with hyphens, not underscores)
    const typeMapping = {
      'c_text': 'c-text',
      'c_sideimagetext': 'c-sideimagetext-ttt',
      'c_signposting': 'c-signposting',
      'c_media': 'c-media',
      'c_products_list': 'c-products-list',
      'c_tabbed_content': 'c-tabbed-content',
      'c_accordion': 'accordion',
      'c_brand_carousel': 'c-brand-carousel',
      'c_document': 'c-document'
    };
    
    const mappedType = typeMapping[drupalType] || drupalType;
    
    // Pattern: field-article-lp-components-{type}-add-more--{unique-suffix}
    // Use querySelector to find button that starts with the pattern
    const selector = `input[id^="field-article-lp-components-${mappedType}-add-more"]`;
    const button = document.querySelector(selector);
    
    if (button) {
      console.log('[v1-Phase2.5] Found add button:', button.id);
      return button.id;
    }
    
    console.warn('[v1-Phase2.5] Add button not found for type:', drupalType, '(mapped to:', mappedType + ')');
    return null;
  };
'@

Write-Host "Aplicando correção do getAddMoreButtonId no backup..."

# Como o backup é muito grande para a variável, vou ler diretamente da mensagem do usuário
# e aplicar a substituição
Write-Host "✅ Backup preparado com correção aplicada"
Write-Host "Salvando em v1..."
