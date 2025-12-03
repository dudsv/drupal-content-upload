(() => {
  'use strict';

  // ===== MODELOS DE MAPEAMENTO (dropdown) =====
  // COMO ADICIONAR NOVOS:
  // 1) Copie o JSON do mapeamento (o mesmo que você colaria no textarea).
  // 2) Cole abaixo como um novo item do objeto MODELS, ex.: "SK-Articles": { ... }.
  // 3) O <select> é populado automaticamente com as chaves de MODELS.
  const MODELS = {
    "BE-Articles": {
      "createdAt": "2025-09-10T19:32:22.632Z",
      "url": "https://live-74999-petcare-purinattt-belgium.pantheonsite.io/fr/node/10633/edit",
      "items": [
        {
          "id": "au0xkohly4fmfbgf81j",
          "ts": "2025-09-08T18:27:37.207Z",
          "url": "https://live-74999-petcare-purinattt-belgium.pantheonsite.io/nl/node/10630/edit?destination=/fr/admin/content%3Ftitle%3D%26type%3Dnppe_article%26langcode%3DAll%26moderation_state%3DAll",
          "title": "Edit Article De 100 beste namen waarop je kater gek zal zijn - Cloned [Dutch translation] | Purina BE",
          "field": {
            "label": "Body",
            "type": "textarea:textarea",
            "name": "field_article_lp_components[0][subform][field_c_text][0][value]",
            "id": "edit-field-article-lp-components-0-subform-field-c-text-0-value--vQapU4H8LA8",
            "dataDrupalSelector": "edit-field-article-lp-components-0-subform-field-c-text-0-value",
            "cssSelector": "#edit-field-article-lp-components-0-subform-field-c-text-0-value--vQapU4H8LA8",
            "wrapperSelector": "#edit-field-article-lp-components-0-subform-field-c-text-0-value--vQapU4H8LA8",
            "editor": "ckeditor"
          },
          "drupal": {
            "component": "field_article_lp_components",
            "componentIndex": 0,
            "subfield": "field_c_text",
            "subfieldIndex": 0,
            "property": "value",
            "nameTokens": [
              "field_article_lp_components",
              "0",
              "subform",
              "field_c_text",
              "0",
              "value"
            ]
          },
          "note": "Intro, must be h3"
        },
        {
          "id": "444hxgnavqxmfbgfaym",
          "ts": "2025-09-08T18:27:40.990Z",
          "url": "https://live-74999-petcare-purinattt-belgium.pantheonsite.io/nl/node/10630/edit?destination=/fr/admin/content%3Ftitle%3D%26type%3Dnppe_article%26langcode%3DAll%26moderation_state%3DAll",
          "title": "Edit Article De 100 beste namen waarop je kater gek zal zijn - Cloned [Dutch translation] | Purina BE",
          "field": {
            "label": "Body",
            "type": "textarea:textarea",
            "name": "field_article_lp_components[1][subform][field_c_text][0][value]",
            "id": "edit-field-article-lp-components-1-subform-field-c-text-0-value--iUJHCcCCZDQ",
            "dataDrupalSelector": "edit-field-article-lp-components-1-subform-field-c-text-0-value",
            "cssSelector": "#edit-field-article-lp-components-1-subform-field-c-text-0-value--iUJHCcCCZDQ",
            "wrapperSelector": "#edit-field-article-lp-components-1-subform-field-c-text-0-value--iUJHCcCCZDQ",
            "editor": "ckeditor"
          },
          "drupal": {
            "component": "field_article_lp_components",
            "componentIndex": 1,
            "subfield": "field_c_text",
            "subfieldIndex": 0,
            "property": "value",
            "nameTokens": [
              "field_article_lp_components",
              "1",
              "subform",
              "field_c_text",
              "0",
              "value"
            ]
          },
          "note": "First text block, will receive text with bold, italic, heading, listst and hyperlink"
        },
        {
          "id": "nroefvbbhnfmfbgfeg2",
          "ts": "2025-09-08T18:27:45.506Z",
          "url": "https://live-74999-petcare-purinattt-belgium.pantheonsite.io/nl/node/10630/edit?destination=/fr/admin/content%3Ftitle%3D%26type%3Dnppe_article%26langcode%3DAll%26moderation_state%3DAll",
          "title": "Edit Article De 100 beste namen waarop je kater gek zal zijn - Cloned [Dutch translation] | Purina BE",
          "field": {
            "label": "Inhoud",
            "type": "textarea:textarea",
            "name": "field_article_lp_components[2][subform][field_c_sideimagetext_summary][0][value]",
            "id": "edit-field-article-lp-components-2-subform-field-c-sideimagetext-summary-0-value--Quf7cXw7xO8",
            "dataDrupalSelector": "edit-field-article-lp-components-2-subform-field-c-sideimagetext-summary-0-value",
            "cssSelector": "#edit-field-article-lp-components-2-subform-field-c-sideimagetext-summary-0-value--Quf7cXw7xO8",
            "wrapperSelector": "#edit-field-article-lp-components-2-subform-field-c-sideimagetext-summary-0-value--Quf7cXw7xO8",
            "editor": "ckeditor"
          },
          "drupal": {
            "component": "field_article_lp_components",
            "componentIndex": 2,
            "subfield": "field_c_sideimagetext_summary",
            "subfieldIndex": 0,
            "property": "value",
            "nameTokens": [
              "field_article_lp_components",
              "2",
              "subform",
              "field_c_sideimagetext_summary",
              "0",
              "value"
            ]
          },
          "note": "First Image+Text\nWill recieve max 2 <p> with max 500 characters, suggest to move next p to next block if necessary"
        },
        {
          "id": "t7x5k8witcmfbgfh5t",
          "ts": "2025-09-08T18:27:49.025Z",
          "url": "https://live-74999-petcare-purinattt-belgium.pantheonsite.io/nl/node/10630/edit?destination=/fr/admin/content%3Ftitle%3D%26type%3Dnppe_article%26langcode%3DAll%26moderation_state%3DAll",
          "title": "Edit Article De 100 beste namen waarop je kater gek zal zijn - Cloned [Dutch translation] | Purina BE",
          "field": {
            "label": "Body",
            "type": "textarea:textarea",
            "name": "field_article_lp_components[3][subform][field_c_text][0][value]",
            "id": "edit-field-article-lp-components-3-subform-field-c-text-0-value--o-YYeSJ0yJI",
            "dataDrupalSelector": "edit-field-article-lp-components-3-subform-field-c-text-0-value",
            "cssSelector": "#edit-field-article-lp-components-3-subform-field-c-text-0-value--o-YYeSJ0yJI",
            "wrapperSelector": "#edit-field-article-lp-components-3-subform-field-c-text-0-value--o-YYeSJ0yJI",
            "editor": "ckeditor"
          },
          "drupal": {
            "component": "field_article_lp_components",
            "componentIndex": 3,
            "subfield": "field_c_text",
            "subfieldIndex": 0,
            "property": "value",
            "nameTokens": [
              "field_article_lp_components",
              "3",
              "subform",
              "field_c_text",
              "0",
              "value"
            ]
          },
          "note": "Second text block, will receive text with bold, italic, heading, listst and hyperlink"
        },
        {
          "id": "9uvzz505w9tmfbgfknh",
          "ts": "2025-09-08T18:27:53.549Z",
          "url": "https://live-74999-petcare-purinattt-belgium.pantheonsite.io/nl/node/10630/edit?destination=/fr/admin/content%3Ftitle%3D%26type%3Dnppe_article%26langcode%3DAll%26moderation_state%3DAll",
          "title": "Edit Article De 100 beste namen waarop je kater gek zal zijn - Cloned [Dutch translation] | Purina BE",
          "field": {
            "label": "Inhoud",
            "type": "textarea:textarea",
            "name": "field_article_lp_components[4][subform][field_c_sideimagetext_summary][0][value]",
            "id": "edit-field-article-lp-components-4-subform-field-c-sideimagetext-summary-0-value--lniD_3q0Clw",
            "dataDrupalSelector": "edit-field-article-lp-components-4-subform-field-c-sideimagetext-summary-0-value",
            "cssSelector": "#edit-field-article-lp-components-4-subform-field-c-sideimagetext-summary-0-value--lniD_3q0Clw",
            "wrapperSelector": "#edit-field-article-lp-components-4-subform-field-c-sideimagetext-summary-0-value--lniD_3q0Clw",
            "editor": "ckeditor"
          },
          "drupal": {
            "component": "field_article_lp_components",
            "componentIndex": 4,
            "subfield": "field_c_sideimagetext_summary",
            "subfieldIndex": 0,
            "property": "value",
            "nameTokens": [
              "field_article_lp_components",
              "4",
              "subform",
              "field_c_sideimagetext_summary",
              "0",
              "value"
            ]
          },
          "note": "Second Image+Text\nWill recieve max 2 <p> with max 500 characters, suggest to move next p to next block if necessary"
        },
        {
          "id": "cny2k2o5wfimfbgfqm9",
          "ts": "2025-09-08T18:28:01.281Z",
          "url": "https://live-74999-petcare-purinattt-belgium.pantheonsite.io/nl/node/10630/edit?destination=/fr/admin/content%3Ftitle%3D%26type%3Dnppe_article%26langcode%3DAll%26moderation_state%3DAll",
          "title": "Edit Article De 100 beste namen waarop je kater gek zal zijn - Cloned [Dutch translation] | Purina BE",
          "field": {
            "label": "Body",
            "type": "textarea:textarea",
            "name": "field_article_lp_components[5][subform][field_c_text][0][value]",
            "id": "edit-field-article-lp-components-5-subform-field-c-text-0-value--fCPRRXd3QrA",
            "dataDrupalSelector": "edit-field-article-lp-components-5-subform-field-c-text-0-value",
            "cssSelector": "#edit-field-article-lp-components-5-subform-field-c-text-0-value--fCPRRXd3QrA",
            "wrapperSelector": "#edit-field-article-lp-components-5-subform-field-c-text-0-value--fCPRRXd3QrA",
            "editor": "ckeditor"
          },
          "drupal": {
            "component": "field_article_lp_components",
            "componentIndex": 5,
            "subfield": "field_c_text",
            "subfieldIndex": 0,
            "property": "value",
            "nameTokens": [
              "field_article_lp_components",
              "5",
              "subform",
              "field_c_text",
              "0",
              "value"
            ]
          },
          "note": "Final text block, will receive text with bold, italic, heading, listst and hyperlink"
        },
        {
          "id": "fvnt8aktg9dmfbhrqo1",
          "ts": "2025-09-08T19:05:20.833Z",
          "url": "https://live-74999-petcare-purinattt-belgium.pantheonsite.io/nl/node/10630/edit?destination=/fr/admin/content%3Ftitle%3D%26type%3Dnppe_article%26langcode%3DAll%26moderation_state%3DAll",
          "title": "Edit Article De 100 beste namen waarop je kater gek zal zijn - Cloned [Dutch translation] | Purina BE",
          "field": {
            "label": "Page title",
            "type": "input:text",
            "name": "field_meta_tags[0][basic][title]",
            "id": "edit-field-meta-tags-0-basic-title",
            "dataDrupalSelector": "edit-field-meta-tags-0-basic-title",
            "cssSelector": "#edit-field-meta-tags-0-basic-title",
            "wrapperSelector": "#edit-field-meta-tags-0-basic-title",
            "editor": null
          },
          "drupal": {
            "component": "field_meta_tags",
            "componentIndex": 0,
            "subfield": null,
            "subfieldIndex": null,
            "property": null,
            "nameTokens": [
              "field_meta_tags",
              "0",
              "basic",
              "title"
            ]
          },
          "note": "Meta title"
        },
        {
          "id": "xlt2uij7fukmfbhs24w",
          "ts": "2025-09-08T19:05:35.696Z",
          "url": "https://live-74999-petcare-purinattt-belgium.pantheonsite.io/nl/node/10630/edit?destination=/fr/admin/content%3Ftitle%3D%26type%3Dnppe_article%26langcode%3DAll%26moderation_state%3DAll",
          "title": "Edit Article De 100 beste namen waarop je kater gek zal zijn - Cloned [Dutch translation] | Purina BE",
          "field": {
            "label": "Beschrijving",
            "type": "textarea:textarea",
            "name": "field_meta_tags[0][basic][description]",
            "id": "edit-field-meta-tags-0-basic-description",
            "dataDrupalSelector": "edit-field-meta-tags-0-basic-description",
            "cssSelector": "#edit-field-meta-tags-0-basic-description",
            "wrapperSelector": "#edit-field-meta-tags-0-basic-description",
            "editor": null
          },
          "drupal": {
            "component": "field_meta_tags",
            "componentIndex": 0,
            "subfield": null,
            "subfieldIndex": null,
            "property": null,
            "nameTokens": [
              "field_meta_tags",
              "0",
              "basic",
              "description"
            ]
          },
          "note": "Meta description"
        },
        {
          "id": "czurbgz2xu4mfbhscwq",
          "ts": "2025-09-08T19:05:49.658Z",
          "url": "https://live-74999-petcare-purinattt-belgium.pantheonsite.io/nl/node/10630/edit?destination=/fr/admin/content%3Ftitle%3D%26type%3Dnppe_article%26langcode%3DAll%26moderation_state%3DAll",
          "title": "Edit Article De 100 beste namen waarop je kater gek zal zijn - Cloned [Dutch translation] | Purina BE",
          "field": {
            "label": "Titel",
            "type": "input:text",
            "name": "field_meta_tags[0][open_graph][og_title]",
            "id": "edit-field-meta-tags-0-open-graph-og-title",
            "dataDrupalSelector": "edit-field-meta-tags-0-open-graph-og-title",
            "cssSelector": "#edit-field-meta-tags-0-open-graph-og-title",
            "wrapperSelector": "#edit-field-meta-tags-0-open-graph-og-title",
            "editor": null
          },
          "drupal": {
            "component": "field_meta_tags",
            "componentIndex": 0,
            "subfield": null,
            "subfieldIndex": null,
            "property": null,
            "nameTokens": [
              "field_meta_tags",
              "0",
              "open_graph",
              "og_title"
            ]
          },
          "note": "OG Title"
        },
        {
          "id": "x1yn3308a5hmfbhsk0x",
          "ts": "2025-09-08T19:05:58.881Z",
          "url": "https://live-74999-petcare-purinattt-belgium.pantheonsite.io/nl/node/10630/edit?destination=/fr/admin/content%3Ftitle%3D%26type%3Dnppe_article%26langcode%3DAll%26moderation_state%3DAll",
          "title": "Edit Article De 100 beste namen waarop je kater gek zal zijn - Cloned [Dutch translation] | Purina BE",
          "field": {
            "label": "Beschrijving",
            "type": "textarea:textarea",
            "name": "field_meta_tags[0][open_graph][og_description]",
            "id": "edit-field-meta-tags-0-open-graph-og-description",
            "dataDrupalSelector": "edit-field-meta-tags-0-open-graph-og-description",
            "cssSelector": "#edit-field-meta-tags-0-open-graph-og-description",
            "wrapperSelector": "#edit-field-meta-tags-0-open-graph-og-description",
            "editor": null
          },
          "drupal": {
            "component": "field_meta_tags",
            "componentIndex": 0,
            "subfield": null,
            "subfieldIndex": null,
            "property": null,
            "nameTokens": [
              "field_meta_tags",
              "0",
              "open_graph",
              "og_description"
            ]
          },
          "note": "OG Description"
        },
        {
          "id": "7kwijg7dnkvmfbhswkg",
          "ts": "2025-09-08T19:06:15.136Z",
          "url": "https://live-74999-petcare-purinattt-belgium.pantheonsite.io/nl/node/10630/edit?destination=/fr/admin/content%3Ftitle%3D%26type%3Dnppe_article%26langcode%3DAll%26moderation_state%3DAll",
          "title": "Edit Article De 100 beste namen waarop je kater gek zal zijn - Cloned [Dutch translation] | Purina BE",
          "field": {
            "label": "URL alias",
            "type": "input:text",
            "name": "path[0][alias]",
            "id": "edit-path-0-alias",
            "dataDrupalSelector": "edit-path-0-alias",
            "cssSelector": "#edit-path-0-alias",
            "wrapperSelector": "#edit-path-0-alias",
            "editor": null
          },
          "drupal": {
            "component": "path",
            "componentIndex": 0,
            "subfield": null,
            "subfieldIndex": null,
            "property": null,
            "nameTokens": [
              "path",
              "0",
              "alias"
            ]
          },
          "note": "URL (path without as example purina.be, if purina.be/xxx/xxx or purina.be/fr/xxx/xxx will receive only /xxx/xxx"
        },
        {
          "id": "88hwbm8rnm4mfedljrr",
          "ts": "2025-09-10T19:31:52.023Z",
          "url": "https://live-74999-petcare-purinattt-belgium.pantheonsite.io/fr/node/10633/edit",
          "title": "Edit Article 7 katvriendelijke snoepjes voor training | Purina BE",
          "field": {
            "label": "Internal title",
            "type": "input:text",
            "name": "field_article_internal_title[0][value]",
            "id": "edit-field-article-internal-title-0-value",
            "dataDrupalSelector": "edit-field-article-internal-title-0-value",
            "cssSelector": "#edit-field-article-internal-title-0-value",
            "wrapperSelector": "#edit-field-article-internal-title-0-value",
            "editor": null
          },
          "drupal": {
            "component": "field_article_internal_title",
            "componentIndex": 0,
            "subfield": null,
            "subfieldIndex": null,
            "property": null,
            "nameTokens": [
              "field_article_internal_title",
              "0",
              "value"
            ]
          },
          "note": "Recebe H1"
        },
        {
          "id": "oxhepgdc8dmfedlqvb",
          "ts": "2025-09-10T19:32:01.223Z",
          "url": "https://live-74999-petcare-purinattt-belgium.pantheonsite.io/fr/node/10633/edit",
          "title": "Edit Article 7 katvriendelijke snoepjes voor training | Purina BE",
          "field": {
            "label": "Titel",
            "type": "input:text",
            "name": "title[0][value]",
            "id": "edit-title-0-value",
            "dataDrupalSelector": "edit-title-0-value",
            "cssSelector": "#edit-title-0-value",
            "wrapperSelector": "#edit-title-0-value",
            "editor": null
          },
          "drupal": {
            "component": "title",
            "componentIndex": 0,
            "subfield": null,
            "subfieldIndex": null,
            "property": null,
            "nameTokens": [
              "title",
              "0",
              "value"
            ]
          },
          "note": "Recebe H1"
        },
        {
          "id": "07pivq3tyjbgmfedlyhj",
          "ts": "2025-09-10T19:32:11.095Z",
          "url": "https://live-74999-petcare-purinattt-belgium.pantheonsite.io/fr/node/10633/edit",
          "title": "Edit Article 7 katvriendelijke snoepjes voor training | Purina BE",
          "field": {
            "label": "Titel",
            "type": "input:text",
            "name": "field_meta_tags[0][open_graph][og_title]",
            "id": "edit-field-meta-tags-0-open-graph-og-title",
            "dataDrupalSelector": "edit-field-meta-tags-0-open-graph-og-title",
            "cssSelector": "#edit-field-meta-tags-0-open-graph-og-title",
            "wrapperSelector": "#edit-field-meta-tags-0-open-graph-og-title",
            "editor": null
          },
          "drupal": {
            "component": "field_meta_tags",
            "componentIndex": 0,
            "subfield": null,
            "subfieldIndex": null,
            "property": null,
            "nameTokens": [
              "field_meta_tags",
              "0",
              "open_graph",
              "og_title"
            ]
          },
          "note": "og title"
        },
        {
          "id": "77i992nznfmfedm300",
          "ts": "2025-09-10T19:32:16.944Z",
          "url": "https://live-74999-petcare-purinattt-belgium.pantheonsite.io/fr/node/10633/edit",
          "title": "Edit Article 7 katvriendelijke snoepjes voor training | Purina BE",
          "field": {
            "label": "Beschrijving",
            "type": "textarea:textarea",
            "name": "field_meta_tags[0][open_graph][og_description]",
            "id": "edit-field-meta-tags-0-open-graph-og-description",
            "dataDrupalSelector": "edit-field-meta-tags-0-open-graph-og-description",
            "cssSelector": "#edit-field-meta-tags-0-open-graph-og-description",
            "wrapperSelector": "#edit-field-meta-tags-0-open-graph-og-description",
            "editor": null
          },
          "drupal": {
            "component": "field_meta_tags",
            "componentIndex": 0,
            "subfield": null,
            "subfieldIndex": null,
            "property": null,
            "nameTokens": [
              "field_meta_tags",
              "0",
              "open_graph",
              "og_description"
            ]
          },
          "note": "og description"
        }
      ]
    }
    // ==== Adicione novos modelos aqui ====
    // "SK-Articles": { ... },
    // "IT-Articles": { ... }
  };

  const ID = 'nppe-paste-fill';
  document.getElementById(ID)?.remove();
  document.getElementById(ID + '-style')?.remove();

  const css = `
  #${ID}{position:fixed;inset:0;z-index:2147483647;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center}
  #${ID} .box{width:min(1200px,96vw);max-height:94vh;background:#0f1115;color:#eaeef3;border-radius:14px;box-shadow:0 12px 40px rgba(0,0,0,.6);display:flex;flex-direction:column}
  #${ID} .hd{display:flex;align-items:center;gap:12px;padding:14px 16px;border-bottom:1px solid #23262d}
  #${ID} .hd h3{margin:0;font:600 16px/1.3 system-ui}
  #${ID} .bd{display:grid;grid-template-columns:340px 1fr;gap:12px;padding:12px 16px;overflow:auto}
  #${ID} .col{display:flex;flex-direction:column;gap:10px}
  #${ID} textarea{width:100%;min-height:160px;background:#12151c;color:#eaeef3;border:1px solid #2a2f3a;border-radius:10px;padding:10px 12px;font:13px/1.5 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace}
  #${ID} select{width:100%;background:#12151c;color:#eaeef3;border:1px solid #2a2f3a;border-radius:10px;padding:10px 12px;font:13px/1.5 system-ui}
  #${ID} input[type="file"]{width:100%}
  #${ID} .btns{display:flex;gap:8px;padding:12px 16px;border-top:1px solid #23262d;justify-content:flex-end}
  #${ID} button{background:#2a6df5;border:none;color:#fff;border-radius:10px;padding:9px 12px;font:600 13px/1 system-ui;cursor:pointer}
  #${ID} button.secondary{background:#1f2430}
  #${ID} .log{white-space:pre-wrap;background:#0b0d12;border:1px solid #23262d;border-radius:10px;padding:10px;min-height:120px}
  #${ID} .toolbar{display:flex;flex-wrap:wrap;gap:6px;padding:6px;background:#0b0d12;border:1px solid #23262d;border-radius:10px}
  #${ID} .toolbar button{background:#17202f}
  #${ID} .editor{min-height:220px;background:#11151d;border:1px solid #23262d;border-radius:12px;padding:12px;overflow:auto}
  #${ID} .grid2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
  #${ID} .blk{background:#0b0d12;border:1px solid #23262d;border-radius:10px;padding:8px}
  #${ID} .blk h4{margin:0 0 6px;font:600 13px system-ui;color:#c9d7ff}
  #${ID} .blk .ed{min-height:120px;background:#11151d;border:1px solid #23262d;border-radius:8px;padding:8px;overflow:auto}
  #${ID} .blk .mini{display:flex;gap:8px;align-items:center;margin:6px 0 8px}
  #${ID} .blk .mini select{background:#0f1522;color:#eaeef3;border:1px solid #2a2f3a;border-radius:8px;padding:6px 8px}
  #${ID} .blk .mini button{background:#17202f}
  #${ID} details.ed-wrap{background:#0b0d12;border:1px solid #23262d;border-radius:10px}
  #${ID} details.ed-wrap>summary{cursor:pointer;padding:8px 10px;user-select:none;list-style:none;color:#c9d7ff}
  #${ID} details.ed-wrap[open] .toolbar, #${ID} details.ed-wrap[open] .editor{display:block}
  #${ID} details.ed-wrap:not([open]) .toolbar, #${ID} details.ed-wrap:not([open]) .editor{display:none}
  .meta-preview{font:13px/1.5 system-ui;background:#11151d;border:1px solid #23262d;border-radius:8px;padding:8px;margin-top:6px;color:#ccc}
  .meta-preview div{margin-bottom:4px}
  .boldlist{display:flex;flex-direction:column;gap:8px;margin-top:8px}
  .bolditem{display:grid;grid-template-columns:1fr 130px;gap:8px;align-items:center;background:#0b0d12;border:1px solid #23262d;border-radius:8px;padding:8px}
  .bolditem .txt{font:13px/1.5 system-ui;color:#eaeef3;word-break:break-word}
  .bolditem select{background:#0f1522;color:#eaeef3;border:1px solid #2a2f3a;border-radius:8px;padding:6px 8px}
  .bold-actions{display:flex;gap:8px;margin-top:8px}
  #${ID} .md-hint{font:12px/1.4 system-ui;color:#9aa6b2;margin-top:-4px;margin-bottom:6px}
  #${ID} #${ID}-md{width:100%;min-height:160px;background:#12151c;color:#eaeef3;border:1px solid #2a2f3a;border-radius:10px;padding:10px 12px;font:13px/1.5 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace}

  @keyframes nppePulse {0%{box-shadow:0 0 0 0 rgba(42,109,245,.65)}70%{box-shadow:0 0 0 10px rgba(42,109,245,0)}100%{box-shadow:0 0 0 0 rgba(42,109,245,0)}}
  .nppe-pulse{animation:nppePulse 1.2s ease-out 1; outline:2px solid #2a6df5; outline-offset:2px; border-radius:8px}
  `;
  const style = Object.assign(document.createElement('style'), { id: ID + '-style', textContent: css });
  document.head.appendChild(style);

  const wrap = Object.assign(document.createElement('div'), { id: ID });
  wrap.innerHTML = `
    <div class="box">
      <div class="hd">
        <h3>NPPE – Paste Filler (Organizer v6)</h3>
      </div>
      <div class="bd">
        <div class="col">
          <label><b>Modelo de mapeamento:</b></label>
          <select id="${ID}-model"></select>
          <div>
            <label><b>.docx (opcional):</b></label>
            <input id="${ID}-docx" type="file" accept=".docx">
          </div>
        <div>
<label><b>Markdown (opcional):</b></label>
<div class="md-hint">Cole aqui seu conteúdo em Markdown. Em <i>Analisar</i>, ele será convertido e enviado ao Editor.</div>
<textarea id="${ID}-md" placeholder="# Título

Intro (H3):
Texto...

**Negrito** e _itálico_, listas:
- item
1. item

[link](https://exemplo.com)"></textarea>
          </div>
          <div class="log" id="${ID}-log">Pronto…</div>
        </div>
        <div class="col">

          <!-- Meta & H1 -->
          <details class="ed-wrap" id="${ID}-meta-wrap">
            <summary>Meta & H1</summary>
            <div class="blk"><h4>H1</h4><div id="${ID}-h1" class="ed" contenteditable="true"></div></div>
            <div class="meta-preview" id="${ID}-meta-preview"></div>
          </details>

          <!-- Bold → Headings -->
          <details class="ed-wrap" id="${ID}-bold-wrap">
            <summary>Bold → Headings (H2/H3/H4)</summary>
            <div class="meta-preview">Selecione abaixo como cada sentença em negrito deve virar heading. Conversões serão aplicadas no Editor e nos Blocos.</div>
            <div id="${ID}-bold-list" class="boldlist"></div>
            <div class="bold-actions">
              <button class="secondary" id="${ID}-bold-rescan">Revarrer bolds</button>
              <button id="${ID}-bold-apply">Aplicar conversões</button>
            </div>
          </details>

          <details class="ed-wrap" id="${ID}-ed-wrap">
            <summary>Editor (opcional)</summary>
            <div class="toolbar">$1
            <button type="button" data-act="md-to-editor" title="Converter Markdown para Editor">MD→Editor</button></div>
            <div id="${ID}-editor" class="editor" contenteditable="true" aria-label="Editor (tipo CK)"></div>
          </details>

          <div class="grid2" style="margin-top:10px">
            <div class="blk"><h4>Intro (H3)</h4><div id="${ID}-intro" class="ed" contenteditable="true"></div></div>
            <div class="blk"><h4>Text block 1</h4><div id="${ID}-t1" class="ed" contenteditable="true"></div></div>
            <div class="blk"><h4>Image+Text 1 (summary)</h4><div id="${ID}-i1" class="ed" contenteditable="true"></div></div>
            <div class="blk"><h4>Text block 2</h4><div id="${ID}-t2" class="ed" contenteditable="true"></div></div>
            <div class="blk"><h4>Image+Text 2 (summary)</h4><div id="${ID}-i2" class="ed" contenteditable="true"></div></div>
            <div class="blk"><h4>Text block 3</h4><div id="${ID}-t3" class="ed" contenteditable="true"></div></div>
          </div>
        </div>
      </div>
      <div class="btns">
        <button class="secondary" id="${ID}-sanitize">Sanitizar</button>
        <button class="secondary" id="${ID}-analyze">Analisar</button>
        <button class="secondary" id="${ID}-extract">Extrair → Blocos</button>
        <button class="secondary" id="${ID}-preview">Preview</button>
        <button id="${ID}-fill">Preencher Drupal</button>
        <button class="secondary" id="${ID}-close">Fechar</button>
      </div>
    </div>
  `;
  document.body.appendChild(wrap);

  // Popula o dropdown com as chaves de MODELS
  (() => {
    const sel = wrap.querySelector(`#${ID}-model`);
    const keys = Object.keys(MODELS);
    sel.innerHTML = keys.map(k => `<option value="${k}">${k}</option>`).join('');
    if (keys.length) sel.value = keys[0];
  })();

  // ===== Headings & Listify por bloco =====
  const firstBlock = (ed) => {
    const isBlock = n => n && n.nodeType === 1 && /^(P|H2|H3|UL|OL)$/i.test(n.tagName) && n.textContent.trim() !== '';
    let n = ed.firstChild; while (n && !isBlock(n)) n = n.nextSibling; return n;
  };
  const applyHeading = (ed, level) => {
    let n = firstBlock(ed);
    if (!n) { n = document.createElement('p'); n.innerHTML = ''; ed.prepend(n); }
    if (level === 'p' && n.tagName !== 'P') {
      const p = document.createElement('p'); p.innerHTML = n.innerHTML; n.replaceWith(p); return;
    }
    if (level === 'h2' || level === 'h3') {
      const tag = level.toUpperCase();
      if (n.tagName !== tag) { const hx = document.createElement(tag); hx.innerHTML = n.innerHTML; n.replaceWith(hx); }
    }
  };
  const listifyRest = (ed) => {
    const start = firstBlock(ed); if (!start) return;
    const toList = [];
    for (let n = start.nextSibling; n; n = n.nextSibling) {
      if (n.nodeType === 1 && n.tagName === 'P' && n.textContent.trim() !== '') toList.push(n);
    }
    if (toList.length < 2) return;
    const ul = document.createElement('ul');
    toList.forEach(p => { const li = document.createElement('li'); li.innerHTML = p.innerHTML; ul.appendChild(li); });
    const ref = start.nextSibling;
    toList.forEach(p => p.remove());
    ed.insertBefore(ul, ref);
  };
  // mini-controls nos blocos da grade
  const createMiniControls = () => {
    wrap.querySelectorAll('.grid2 .blk').forEach((blk, idx) => {
      const ed = blk.querySelector('.ed');
      const mini = document.createElement('div');
      mini.className = 'mini';
      mini.innerHTML = `
        <label>Nível</label>
        <select data-level>
          <option value="h2">H2</option>
          <option value="h3" ${idx === 0 ? 'selected' : ''}>H3</option>
          <option value="p"  ${idx !== 0 ? 'selected' : ''}>Parágrafo</option>
        </select>
        <button type="button" data-act="listify">Parágrafos → Lista</button>
      `;
      blk.insertBefore(mini, ed);
      const sel = mini.querySelector('select');
      const btn = mini.querySelector('button');
      sel.addEventListener('change', e => applyHeading(ed, e.target.value));
      btn.addEventListener('click', () => listifyRest(ed));
    });
  };
  createMiniControls();

  // ===== Refs
  const $ = sel => wrap.querySelector(sel);
  const $model = $(`#${ID}-model`);
  const $docx = $(`#${ID}-docx`);
  const $md = $(`#${ID}-md`);
  const $log = $(`#${ID}-log`);
  const $ed = $(`#${ID}-editor`);
  const $h1 = $(`#${ID}-h1`);
  const $metaPreview = $(`#${ID}-meta-preview`);
  const $boldList = $(`#${ID}-bold-list`);
  const $intro = $(`#${ID}-intro`), $t1 = $(`#${ID}-t1`), $t2 = $(`#${ID}-t2`), $t3 = $(`#${ID}-t3`), $i1 = $(`#${ID}-i1`), $i2 = $(`#${ID}-i2`);

  const log = (...a) => { $log.textContent = a.join(' '); };
  const pulse = (node) => { const box = node?.closest('.js-form-item,.form-item,.paragraphs-subform,.form-wrapper') || node; if (box) { box.classList.add('nppe-pulse'); setTimeout(() => box.classList.remove('nppe-pulse'), 1200); } };

  // ===== Helpers =====
  const waitFor = (fnOrSel, { timeout = 8000, interval = 120 } = {}) => new Promise((resolve, reject) => {
    const t0 = performance.now();
    const tick = () => {
      try {
        const val = typeof fnOrSel === 'function' ? fnOrSel() : document.querySelector(fnOrSel);
        if (val) return resolve(val);
        if (performance.now() - t0 > timeout) return reject(new Error('Timeout: ' + (fnOrSel.toString?.() || fnOrSel)));
        setTimeout(tick, interval);
      } catch (e) { reject(e); }
    };
    tick();
  });

  const ensureZip = () => new Promise((resolve, reject) => {
    if (window.JSZip) return resolve();
    const s = document.createElement('script'); s.src = 'https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js';
    s.onload = () => resolve(); s.onerror = () => reject(new Error('Falha ao carregar JSZip')); document.head.appendChild(s);
  });

  // permitir H1
  const allowed = new Set(['DIV', 'P', 'STRONG', 'EM', 'UL', 'OL', 'LI', 'A', 'H1', 'H2', 'H3', 'H4', 'BR']);
  const sanitizeHTML = (html) => {
    const tmp = document.createElement('div'); tmp.innerHTML = html || '';

    const sanitizeUrl = (u) => {
      if (!u) return '';
      const url = String(u).trim();
      const low = url.toLowerCase();
      if (low.startsWith('javascript:') || low.startsWith('data:') || low.startsWith('vbscript:')) return '';
      return url;
    };

    const walk = (node) => {
      for (let c = node.firstChild; c;) {
        const n = c.nextSibling;
        if (c.nodeType === 1) {
          const tag = c.tagName;
          if (!allowed.has(tag)) {
            while (c.firstChild) node.insertBefore(c.firstChild, c);
            node.removeChild(c);
            c = n; continue;
          }
          if (tag === 'A') {
            let href = c.getAttribute('href');
            href = sanitizeUrl(href);
            if (href) c.setAttribute('href', href); else c.removeAttribute('href');

            const allowedTargets = new Set(['_blank', '_self', '_parent', '_top']);
            let target = (c.getAttribute('target') || '').trim().toLowerCase();
            if (!allowedTargets.has(target)) {
              c.removeAttribute('target');
            } else {
              c.setAttribute('target', target);
              if (target === '_blank') {
                const relNow = (c.getAttribute('rel') || '').toLowerCase().split(/\s+/).filter(Boolean);
                if (!relNow.includes('noopener')) relNow.push('noopener');
                if (!relNow.includes('noreferrer')) relNow.push('noreferrer');
                c.setAttribute('rel', Array.from(new Set(relNow)).join(' '));
              }
            }
            [...c.attributes].forEach(a => {
              const nm = a.name.toLowerCase();
              if (nm !== 'href' && nm !== 'target' && nm !== 'rel') c.removeAttribute(a.name);
            });
          } else {
            [...c.attributes].forEach(a => c.removeAttribute(a.name));
          }
          walk(c);
        }
        c = n;
      }
    };

    walk(tmp);
    return tmp.innerHTML
      .replace(/<p>\s*<\/p>/gi, '')
      .replace(/(\s*<br\s*\/?>(\s|&nbsp;)*){2,}/gi, '<br>');
  };

  const esc = (s) => String(s).replace(/[&<>]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[m]));
  const plainToHTML = (txt) => {
    return txt.trim().split(/\r?\n\r?\n+/).map(p => `<p>${esc(p).replace(/(https?:\/\/\S+)/g, '<a href="$1">$1<\/a>')}</p>`).join('');
  };
  const htmlFromClipboardOrText = (input) => (/(<p|<h\d|<ul|<ol|<li|<strong|<em|<a|<br)/i.test(input) ? input : plainToHTML(input));
  // ===== Markdown → HTML (parser leve, focado no escopo editorial) =====

  // ✅ Helper: capitaliza a 1ª letra "real" e garante ponto final
  const sentenceCase = (s) => {
    s = String(s || '').trim();
    if (!s) return s;

    const m = s.match(/^([\(\[\{"'“‘]*)/);
    const lead = m ? m[1] : '';
    let rest = s.slice(lead.length);

    // encontra a primeira letra (inclui acentuadas)
    const idx = rest.search(/[A-Za-zÀ-ÖØ-öø-ÿ]/);
    if (idx >= 0) {
      rest = rest.slice(0, idx) + rest.charAt(idx).toUpperCase() + rest.slice(idx + 1);
    }

    let out = lead + rest;
    if (!/[.!?…]$/.test(out)) out += '.';
    return out;
  };

  const markdownToHTML = (md) => {
    if (!md || !md.trim()) return '';
    const escHtml = (s) => s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Normaliza quebra de linha
    md = md
      .replace(/•\s*/g, '\n- ')
      .replace(/\r\n?/g, '\n');

    // Blocos por linhas
    const lines = md.split('\n');

    // Acumuladores
    let out = [];
    let buf = [];
    let listMode = null; // 'ul' | 'ol'

    const flushPara = () => {
      if (!buf.length) return;
      const text = buf.join(' ').trim();
      if (text) out.push(`<p>${text}</p>`);
      buf = [];
    };
    const flushList = () => {
      if (!listMode) return;
      out.push(`</${listMode}>`);
      listMode = null;
    };

    const emitListItem = (html, isOrdered) => {
      if (!listMode) {
        listMode = isOrdered ? 'ol' : 'ul';
        out.push(`<${listMode}>`);
      } else if ((isOrdered && listMode !== 'ol') || (!isOrdered && listMode !== 'ul')) {
        // troca de tipo de lista
        flushList();
        listMode = isOrdered ? 'ol' : 'ul';
        out.push(`<${listMode}>`);
      }
      out.push(`<li>${html}</li>`);
    };

    const inline = (s) => {
      // Padrão específico: (texto ancora)[https://url]
      s = s.replace(/\(([^)]+)\)\s*\[\s*(https?:\/\/[^\]\s]+)\s*\]/g,
        (m, t, u) => `<a href="${u}">${esc(t)}</a>`);
      // [texto](url)
      s = s.replace(/\[([^\]]+)\]\(\s*(https?:\/\/[^\s)]+)\s*\)/g, (m, t, u) => `<a href="${u}">${esc(t)}</a>`);
      // [texto]: url
      s = s.replace(/\[([^\]]+)\]\s*[:：]\s*(https?:\/\/\S+)/g, (m, t, u) => `<a href="${u}">${esc(t)}</a>`);
      // ...PALAVRA [https://url]  → ancora a PALAVRA anterior (ou **bold**/**_itálico_** anterior)
      s = s.replace(/((?:<strong>[^<]+<\/strong>|<em>[^<]+<\/em>|[^\s<][^<\s]*))\s*\[\s*(https?:\/\/[^\]\s]+)\s*\]/g,
        (m, txt, u) => `<a href="${u}">${txt}</a>`);
      // Autolink simples [https://...] (fallback)
      s = s.replace(/\[(https?:\/\/[^\s\]]+)\]/g, (m, u) => `<a href="${u}">${u}</a>`);
      // Bold **x** ou __x__
      s = s.replace(/(\*\*|__)(.+?)\1/g, '<strong>$2</strong>');
      // Italic *x* ou _x_
      s = s.replace(/(^|[^\*])\*(?!\s)(.+?)(?<!\s)\*(?!\*)/g, '$1<em>$2</em>');
      s = s.replace(/(^|[^_])_(?!\s)(.+?)(?<!\s)_(?!_)/g, '$1<em>$2</em>');
      return s;
    };
    const esc = (s) => s; // já escapamos seletivamente

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];

      // Ignora cercas de code block (não suportamos <pre> no sanitizer atual)
      if (/^\s*```/.test(line)) { continue; }

      // Heading ATX: ###, ##, #
      let m;
      if (m = line.match(/^\s*#{3}\s+(.+)$/)) {
        flushPara(); flushList();
        out.push(`<h3>${inline(escHtml(m[1].trim()))}</h3>`);
        continue;
      }
      if (m = line.match(/^\s*#{2}\s+(.+)$/)) {
        flushPara(); flushList();
        out.push(`<h2>${inline(escHtml(m[1].trim()))}</h2>`);
        continue;
      }
      if (m = line.match(/^\s*#\s+(.+)$/)) {
        flushPara(); flushList();
        out.push(`<h1>${inline(escHtml(m[1].trim()))}</h1>`);
        continue;
      }

      // Lista ordenada: 1. item
      if (m = line.match(/^\s*(\d+)[.)]\s+(.+)$/)) {
        flushPara();
        emitListItem(inline(escHtml(sentenceCase(m[2].trim()))), true);
        continue;
      }

      // Lista não ordenada: -, *, +
      if (m = line.match(/^\s*[-*+]\s+(.+)$/)) {
        flushPara();
        emitListItem(inline(escHtml(sentenceCase(m[1].trim()))), false);
        continue;
      }

      // Linha em branco → quebra de parágrafo/lista
      if (!line.trim()) {
        flushPara(); flushList();
        continue;
      }

      // Texto contínuo → acumula para <p>
      buf.push(inline(escHtml(line.trim())));
    }

    flushPara(); flushList();

    // Quebras duplas em <br>
    const html = out.join('\n').replace(/ {2}\n/g, '<br>\n');
    return sanitizeHTML(html);
  };

  // === Helpers extra (remover aspas e detectar frase) ===
  const dequote = (s) => String(s || '')
    .trim()
    .replace(/^[\s"'“”«»„‚‘’]+|[\s"'“”«»„‚‘’]+$/g, '');

  const isUpperStart = (s) => /^[A-ZÀ-ÖØ-Ý]/.test(String(s || '').trim());

  // Extrai a frase inteira do bloco que contém o trecho em negrito
  const getSentenceAround = (full, sub) => {
    const text = (full || '').trim();
    const needle = (sub || '').trim();
    const i = text.indexOf(needle);
    if (i < 0) return null;
    // Pontuações comuns de fim de frase
    const seps = /[.!?;:…]/g;
    let start = 0, end = text.length, m;

    // Busca separador ANTES do trecho
    while ((m = seps.exec(text)) && m.index < i) start = m.index + 1;

    // Reinicia busca e pega separador DEPOIS do trecho
    seps.lastIndex = 0;
    let lastEnd = end;
    while ((m = seps.exec(text)) && m.index <= i + needle.length - 1) lastEnd = m.index + 1;
    end = lastEnd;

    return text.slice(start, end).trim();
  };

  // ===== DOCX → HTML (mantém H1) =====
  const getDocxHTML = async (file) => {
    await ensureZip();
    const z = await JSZip.loadAsync(await file.arrayBuffer());
    const docXml = await z.file('word/document.xml')?.async('string');
    const relsXml = await z.file('word/_rels/document.xml.rels')?.async('string') || '';
    const numXml = await z.file('word/numbering.xml')?.async('string') || '';
    if (!docXml) throw new Error('Documento Word inválido');

    const parse = (s) => new DOMParser().parseFromString(s, 'application/xml');
    const W_NS = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main';
    const R_NS = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';
    const A_NS = 'http://schemas.openxmlformats.org/drawingml/2006/main';

    const doc = parse(docXml);
    const rels = relsXml ? parse(relsXml) : null;
    const num = numXml ? parse(numXml) : null;

    const relMap = {};
    if (rels) Array.from(rels.getElementsByTagName('Relationship')).forEach(r => {
      const id = r.getAttribute('Id');
      const t = r.getAttribute('Target');
      if (id && t) relMap[id] = t;
    });

    const numIdToAbs = {};
    const absLvlToFmt = {};
    if (num) {
      Array.from(num.getElementsByTagNameNS(W_NS, 'num')).forEach(n => {
        const numId = n.getAttributeNS(W_NS, 'numId');
        const absEl = n.getElementsByTagNameNS(W_NS, 'abstractNumId')[0];
        const absId = absEl?.getAttributeNS(W_NS, 'val');
        if (numId && absId) numIdToAbs[numId] = absId;
      });
      Array.from(num.getElementsByTagNameNS(W_NS, 'abstractNum')).forEach(a => {
        const absId = a.getAttributeNS(W_NS, 'abstractNumId');
        Array.from(a.getElementsByTagNameNS(W_NS, 'lvl')).forEach(lvl => {
          const ilvl = lvl.getAttributeNS(W_NS, 'ilvl') || '0';
          const fmt = lvl.getElementsByTagNameNS(W_NS, 'numFmt')[0]?.getAttributeNS(W_NS, 'val') || 'bullet';
          absLvlToFmt[`${absId}:${ilvl}`] = fmt;
        });
      });
    }

    const listInfo = (p) => {
      const numPr = p.getElementsByTagNameNS(W_NS, 'numPr')[0];
      if (!numPr) return null;
      const numIdEl = numPr.getElementsByTagNameNS(W_NS, 'numId')[0];
      if (!numIdEl) return null;
      const ilvlEl = numPr.getElementsByTagNameNS(W_NS, 'ilvl')[0];
      const numId = numIdEl.getAttributeNS(W_NS, 'val');
      const ilvl = ilvlEl?.getAttributeNS(W_NS, 'val') || '0';
      const absId = numIdToAbs[numId];
      const fmt = absLvlToFmt[`${absId}:${ilvl}`] || 'bullet';
      const type = /decimal|lowerRoman|upperRoman|lowerLetter|upperLetter/i.test(fmt) ? 'ol' : 'ul';
      return { type, level: parseInt(ilvl, 10) || 0 };
    };

    const headingTag = (p) => {
      const ps = p.getElementsByTagNameNS(W_NS, 'pStyle')[0];
      const v = ps?.getAttributeNS(W_NS, 'val') || '';
      const m = v.match(/Heading([1-6])/i);
      if (m) {
        const lvl = parseInt(m[1], 10);
        if (lvl === 1) return 'h1';
        if (lvl === 2) return 'h2';
        if (lvl === 3) return 'h3';
        return 'h4';
      }
      // Fallback: Check font size (sz) - 36 = 18pt, 48 = 24pt
      const pPr = p.getElementsByTagNameNS(W_NS, 'pPr')[0];
      const rPr = pPr?.getElementsByTagNameNS(W_NS, 'rPr')[0];
      const sz = rPr?.getElementsByTagNameNS(W_NS, 'sz')[0];
      if (sz) {
        const val = parseInt(sz.getAttributeNS(W_NS, 'val'), 10);
        if (val >= 48) return 'h2';
        if (val >= 36) return 'h3';
      }
      return null;
    };

    const smartJoin = (acc, piece) => {
      if (!acc) return piece;
      const a = acc.slice(-1), b = piece[0];
      if (a && b && !(/[\s>]/.test(a)) && !(/[\s,.;:!?)]/.test(b))) return acc + ' ' + piece;
      return acc + piece;
    };

    const textFromRun = async (r) => {
      const rPr = r.getElementsByTagNameNS(W_NS, 'rPr')[0];
      const isB = !!rPr?.getElementsByTagNameNS(W_NS, 'b')[0];
      const isI = !!rPr?.getElementsByTagNameNS(W_NS, 'i')[0];
      let out = '';

      for (const n of Array.from(r.childNodes)) {
        if (n.namespaceURI !== W_NS) continue;
        switch (n.localName) {
          case 't': out = smartJoin(out, esc(n.textContent || '')); break;
          case 'tab': out = smartJoin(out, ' '); break;
          case 'softHyphen': out += '\u00AD'; break;
          case 'br': out += '<br>'; break;
          case 'drawing': {
            // Extract image
            const blip = n.getElementsByTagNameNS(A_NS, 'blip')[0];
            const embedId = blip?.getAttributeNS(R_NS, 'embed');
            if (embedId && relMap[embedId]) {
              const imgPath = 'word/' + relMap[embedId];
              try {
                const imgData = await z.file(imgPath)?.async('base64');
                if (imgData) {
                  const ext = imgPath.split('.').pop().toLowerCase();
                  const mime = ext === 'png' ? 'image/png' : (ext === 'jpeg' || ext === 'jpg' ? 'image/jpeg' : 'image/gif');
                  out += `<img src="data:${mime};base64,${imgData}" alt="Image">`;
                }
              } catch (e) {
                console.warn('Failed to load image:', imgPath, e);
              }
            }
            break;
          }
          default: break;
        }
      }

      if (!out) return '';
      if (isB) out = `<strong>${out}</strong>`;
      if (isI) out = `<em>${out}</em>`;
      return out;
    };

    const renderInline = async (container) => {
      let acc = '';
      for (const n of Array.from(container.childNodes)) {
        if (n.namespaceURI !== W_NS) continue;
        if (n.localName === 'r') acc = smartJoin(acc, await textFromRun(n));
        else if (n.localName === 'hyperlink') {
          const rid = n.getAttributeNS(R_NS, 'id') || n.getAttribute('r:id');
          const url = rid ? (relMap[rid] || '#') : '#';
          const inner = await renderInline(n);
          acc = smartJoin(acc, `<a href="${esc(url)}">${inner}</a>`);
        } else if (n.localName === 'br') acc += '<br>';
        else if (n.localName === 'tab') acc = smartJoin(acc, ' ');
        else if (n.localName === 'softHyphen') acc += '\u00AD';
      }
      return acc.trim();
    };

    let html = '';
    const ps = Array.from(doc.getElementsByTagNameNS(W_NS, 'p'));
    const listStack = [];
    const closeListsTo = (targetLevel) => {
      while (listStack.length - 1 > targetLevel) {
        const last = listStack.pop();
        html += `</${last.type}>`;
      }
    };

    for (const p of ps) {
      const content = await renderInline(p);
      if (!content && !p.getElementsByTagNameNS(W_NS, 'drawing').length) continue; // Skip empty unless drawing

      const h = headingTag(p);
      const li = listInfo(p);

      if (li) {
        if (listStack.length === 0) {
          html += `<${li.type}>`; listStack.push({ type: li.type });
        } else {
          const curLevel = listStack.length - 1;
          if (li.level > curLevel) {
            html += `<${li.type}>`; listStack.push({ type: li.type });
          } else if (li.level < curLevel) {
            closeListsTo(li.level);
          }
          const curType = listStack[listStack.length - 1].type;
          if (curType !== li.type) {
            html += `</${curType}><${li.type}>`;
            listStack[listStack.length - 1].type = li.type;
          }
        }
        html += `<li>${content}</li>`;
        continue;
      }

      closeListsTo(-1); while (listStack.length) { html += `</${listStack.pop().type}>`; }
      if (h) html += `<${h}>${content}</${h}>`;
      else html += `<p>${content}</p>`;
    }

    closeListsTo(-1); while (listStack.length) { html += `</${listStack.pop().type}>`; }
    return sanitizeHTML(html);
  };

  const getParagraphs = (root) => [...root.querySelectorAll('p,h1,h2,h3,h4,ul,ol')];
  const getText = (el) => (el.textContent || '').replace(/\u00a0/g, ' ').trim();
  const pullLabeled = (blocks, labelRegex) => {
    for (let i = 0; i < blocks.length; i++) {
      const t = getText(blocks[i]), m = t.match(labelRegex);
      if (m) {
        const after = t.replace(labelRegex, '').trim();
        if (after) return after;
        const next = blocks[i + 1] && blocks[i + 1].tagName === 'P' ? getText(blocks[i + 1]) : '';
        return next || '';
      }
    }
    return '';
  };

  const cleanUrlAlias = (input) => {
    let s = (input || '').replace(/^[A-Z]{2}:\s*/, '').trim();
    s = s.replace(/^https?:\/\/[^/]+/, '');
    s = s.replace(/^\/(nl|fr|en)(?=\/)/i, '');
    s = s.replace(/\s*-\s*/g, '-');
    s = s.replace(/\s+/g, '');
    if (s && s[0] !== '/') s = '/' + s;
    return s;
  };

  // ===== PHASE 2: Format Detection =====
  const detectDocxFormat = (html) => {
    const hasStandardMarkers = /(?:URL\s*:|H1\s*:|Intro\s*\(H3\)|Text\s*block)/i.test(html);
    const hasTemplateMarkers = /(?:Source\s*:|Article\s*category\s*:|\[COMPONENT\s*:)/i.test(html);
    // New: Check for Heading-based structure (H1 present, but no explicit Text Block markers)
    const hasHeadings = /<h1/i.test(html) && !/Text\s*block/i.test(html);

    if (hasTemplateMarkers || hasHeadings) {
      console.log('[v1-Phase2] Formato detectado: template (ou heading-based)');
      return 'template';
    }
    if (hasStandardMarkers) {
      console.log('[v1-Phase2] Formato detectado: standard');
      return 'standard';
    }
    console.log('[v1-Phase2] Formato detectado: unknown (usando standard como fallback)');
    return 'unknown';
  };

  const extractComponentsFromStructure = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    const components = [];
    let current = null;

    const flush = () => {
      if (current) {
        components.push(current);
        current = null;
      }
    };

    const nodes = Array.from(tmp.childNodes);
    let introContent = '';
    let inIntro = true;

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node.nodeType !== 1) continue;

      const tag = node.tagName;
      const text = node.textContent.trim();
      const hasImg = node.querySelector('img') || (tag === 'IMG');

      // Header detection (H2 or H3)
      if (/^H[23]$/.test(tag)) {
        flush();
        inIntro = false;

        // Look ahead for Image
        let next = nodes[i + 1];
        while (next && next.nodeType !== 1) next = nodes[i + 1 + (next === nodes[i + 1] ? 1 : 0)]; // simple skip? No, need index logic
        // Better: find next element sibling
        let sibling = node.nextElementSibling;

        const nextHasImg = sibling && (sibling.querySelector('img') || sibling.tagName === 'IMG');

        if (nextHasImg) {
          current = { type: 'c_sideimagetext', content: node.outerHTML, index: components.length, drupalType: 'c_sideimagetext', label: text.substring(0, 30) };
        } else {
          current = { type: 'c_text', content: node.outerHTML, index: components.length, drupalType: 'c_text', label: text.substring(0, 30) };
        }
        continue;
      }

      if (hasImg) {
        inIntro = false;
        if (!current) {
          current = { type: 'c_sideimagetext', content: '', index: components.length, drupalType: 'c_sideimagetext', label: 'Image Block' };
        } else if (current.type === 'c_text') {
          // Switch to sideimagetext if we encounter an image in a text block?
          // Or just treat as content?
          // If it's c_text, it might be a mistake if we didn't detect it earlier.
          // But let's keep it simple.
        }
      }
    }
    flush();
    return { components, intro: introContent };
  };

  // ===== PHASE 2: Template Format Parser (with Components) =====
  const parseTemplateFormat = (html) => {
    const clean = sanitizeHTML(htmlFromClipboardOrText(html));
    const tmp = document.createElement('div');
    tmp.innerHTML = clean;

    // Extract title from H1 tag
    const h1Tag = tmp.querySelector('h1');
    let h1 = h1Tag ? getText(h1Tag) : '';
    if (h1 && !h1.match(/^(Source|Article category|Meta|SEO)/i)) {
      h1 = dequote(h1).substring(0, 255);
      console.log('[v1-Phase2] Título extraído de <h1>:', h1);
    }

    // Extract URL from Source: marker
    const blocks = getParagraphs(tmp);
    let urlAlias = '';
    for (const block of blocks) {
      const text = getText(block);
      const sourceMatch = text.match(/^(Source|URL)\s*:\s*(.+)$/i);
      if (sourceMatch) {
        urlAlias = cleanUrlAlias(sourceMatch[2].trim());
        console.log('[v1-Phase2] URL extraído de Source/URL:', urlAlias);
        break;
      }
    }

    // Extract SEO metadata
    let metaTitle = '', metaDesc = '';
    let inSeoSection = false;

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      const text = getText(block).trim();

      if (/^SEO\s+METADATA/i.test(text)) {
        inSeoSection = true;
        continue;
      }

      if (inSeoSection) {
        if (/^\[COMPONENT/i.test(text)) {
          inSeoSection = false;
          continue; // Don't break, might be more components
        }

        // Handle "Label: Value" (Single line)
        let match = text.match(/^Meta\s*title\s*:\s*(.+)$/i);
        if (match) { metaTitle = dequote(match[1].trim()); continue; }

        match = text.match(/^Meta\s*description\s*:\s*(.+)$/i);
        if (match) { metaDesc = dequote(match[1].trim()); continue; }

        match = text.match(/^(Internal\s*URL|URL)\s*:\s*(.+)$/i);
        if (match) { urlAlias = cleanUrlAlias(match[2].trim()); continue; }

        // Handle "Label" \n "Value" (Multi-line)
        // Check if current line is a label and next line exists
        // Handle "Label" \n "Value" (Multi-line)
        // Check if current line is a label and next line exists
        let nextIndex = i + 1;
        while (nextIndex < blocks.length && !getText(blocks[nextIndex]).trim()) {
          nextIndex++;
        }

        if (nextIndex < blocks.length) {
          const nextText = getText(blocks[nextIndex]).trim();

          if (/^Meta\s*title$/i.test(text)) {
            metaTitle = dequote(nextText);
            i = nextIndex; // Skip consumed block
            continue;
          }
          if (/^Meta\s*description$/i.test(text)) {
            metaDesc = dequote(nextText);
            i = nextIndex;
            continue;
          }
          if (/^(Internal\s*URL|URL)$/i.test(text)) {
            urlAlias = cleanUrlAlias(nextText);
            i = nextIndex;
            continue;
          }
        }
      }
    }
    console.log('[v1-Phase2] SEO Metadata extraído:', { metaTitle, metaDesc });

    const ogTitle = metaTitle;
    const ogDesc = metaDesc;

    // Extract components
    const extractionResult = extractComponents(clean);
    let components = extractionResult ? extractionResult.components : [];
    let sidebarComponents = extractionResult ? extractionResult.sidebarComponents : [];
    let intro = '';
    let heroImage = '';

    // Create a set of content from extracted components to avoid duplicating it in Intro
    const componentContentSet = new Set();
    const allComponents = [...(components || []), ...(sidebarComponents || [])];

    if (allComponents.length > 0) {
      allComponents.forEach(c => {
        const div = document.createElement('div');
        div.innerHTML = c.content;
        // Add each block's text to the set
        const children = div.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, div');
        children.forEach(child => {
          const txt = (child.textContent || '').trim();
          if (txt) componentContentSet.add(txt);
        });
        // Also check direct text content if it's a single block
        const fullTxt = (div.textContent || '').trim();
        if (fullTxt) componentContentSet.add(fullTxt);
      });
    }

    if (!components) {
      console.log('[v1-Phase2] No [COMPONENT] markers found. Trying structure-based extraction.');
      const struct = extractComponentsFromStructure(clean);
      components = struct.components;
      intro = struct.intro;
    } else {
      // Extract Hero Image (first image before Intro/Text)
      for (const block of blocks) {
        if (block.tagName === 'H1') continue;
        const text = (block.textContent || '').trim();
        // Match URL or filename with image extension
        const imgMatch = text.match(/^IMAGE:\s*(.+)$/i) || text.match(/^(https?:\/\/.*\.(jpg|png|jpeg|webp))/i);
        if (imgMatch) {
          const candidate = imgMatch[1].trim();
          if (candidate.match(/\.(jpg|png|jpeg|webp)$/i)) {
            heroImage = candidate;
            break;
          }
        }
        const imgTag = block.querySelector('img');
        if (imgTag) {
          heroImage = imgTag.src;
          break;
        }
        // Stop if we hit a text block (Intro candidate)
        if (text && !text.match(/^(Source|Article category|SEO METADATA|\[COMPONENT|IMAGE:|Alt Text:|Meta Title|Meta Description)/i)) {
          break;
        }
      }

      // Legacy Intro extraction for explicit markers
      let foundH1 = false;
      for (const block of blocks) {
        if (block.tagName === 'H1') {
          foundH1 = true;
          continue;
        }
        if (foundH1 && block.tagName === 'P') {
          const text = (block.textContent || '').trim();

          // Check if this text belongs to a known component
          if (componentContentSet.has(text)) continue;

          // Stop if we hit the Schema block
          if (/^Schema$/i.test(text)) break;

          // Ignore Source, Category, Meta, Component markers AND Image URLs/Tags AND "IMAGE:" prefix AND "Alt Text:" AND "Meta Title/Description"
          // Also ignore standalone labels like "Title", "URL", "Internal URL", "OG Title", "OG Description"
          if (text && !text.match(/^(Source|Article category|SEO METADATA|\[COMPONENT|IMAGE:|Alt Text:|Meta Title|Meta Description|Title|URL|Internal URL|OG Title|OG Description|Component:)/i) && !text.match(/^https?:\/\/.*\.(jpg|png|jpeg|webp)/i) && !block.querySelector('img')) {
            intro = `<h3>${block.innerHTML}</h3>`;
            break;
          }
        }
      }
    }

    // If components found, use them; otherwise fallback to t1
    let t1 = '', t2 = '', t3 = '';
    const imgBlocks = [];

    if (components && components.length > 0) {
      console.log('[v1-Phase2] Usando componentes estruturados - Mapeando para UI legado (visual apenas)');

      // Map components to legacy UI blocks for "Extract" button feedback
      let textCount = 0;
      const hasTextBlock1 = components.some(c => c.type === 'Text Block 1');
      let foundTextBlock1 = false;

      for (const comp of components) {
        console.log('[v1-Phase2] Mapeando componente:', comp.drupalType, comp.content.substring(0, 30) + '...');

        // Skip Signposting (Contact Us) and other non-content blocks for the main text slots
        if (['c_signposting', 'c_media', 'c_products_list', 'c_tabbed_content', 'c_accordion', 'c_brand_carousel', 'c_document'].includes(comp.drupalType)) {
          continue;
        }

        if (comp.drupalType === 'c_text') {
          if (hasTextBlock1) {
            // Strict mode: Text Block 1 MUST be Intro
            if (comp.type === 'Text Block 1') {
              intro = comp.content;
              foundTextBlock1 = true;
              continue;
            }

            if (!foundTextBlock1) {
              console.log('[v1-Phase2] Ignorando texto antes do Text Block 1:', comp.type);
              continue; // Ignore text before Text Block 1
            }

            // Found Text Block 1 already, so this is t1, t2...
            textCount++;
          } else {
            // Original logic (fallback)
            textCount++;
            if (!intro && textCount === 1) {
              intro = comp.content;
              textCount--; // Reset count so next block becomes t1
              continue;
            }
          }

          if (textCount === 1) t1 = comp.content;
          else if (textCount === 2) t2 = comp.content;
          else if (textCount === 3) t3 = comp.content;
          else if (textCount > 3) t3 += '<br><hr><br>' + comp.content; // Append overflow to t3
        } else if (comp.drupalType === 'c_sideimagetext') {
          // Extract summary/text from side image component for visual preview
          imgBlocks.push({ alt: '', summary: comp.content });
        }
      }
    } else {
      const contentBlocks = blocks.filter(b => {
        const text = (b.textContent || '').trim();
        return text && !text.match(/^(Source|Article category|Meta|SEO METADATA|URL\s*:)/i);
      });
      t1 = contentBlocks.map(b => b.outerHTML).join('');
    }

    console.log('[v1-Phase2] Template format parsed:', {
      h1, metaTitle, urlAlias,
      componentsCount: components?.length || 0,
      category: extractCategory(clean),
      heroImage
    });

    return {
      clean, h1, intro, t1, t2, t3,
      imgBlocks,
      metaTitle, metaDesc, ogTitle, ogDesc, urlAlias,
      components: components || [],
      sidebarComponents: sidebarComponents || [],
      category: extractCategory(clean),
      heroImage
    };
  };

  // ===== Standard Format Parser (original logic) =====
  const parseStandardFormat = (html) => {
    const clean = sanitizeHTML(htmlFromClipboardOrText(html));
    const tmp = document.createElement('div'); tmp.innerHTML = clean;
    const blocks = getParagraphs(tmp).filter(n => {
      const s = getText(n);
      if (/^Add a block with the following info here/i.test(s)) return false;
      if (/^(Voor meer informação|Voor meer informatie|En savoir plus)$/i.test(s)) return false;
      return true;
    });

    // H1 e fallback por marcador "H1:"
    const h1Tag = tmp.querySelector('h1');
    let h1 = h1Tag ? getText(h1Tag) : '';
    if (!h1) h1 = pullLabeled(blocks, /^\s*H1\s*:?\s*/i);

    // Metas
    const metaTitle = pullLabeled(blocks, /^Meta\s*title\s*:\s*/i);
    const metaDesc = pullLabeled(blocks, /^Meta\s*description\s*:\s*/i);
    const ogTitle = pullLabeled(blocks, /^(OG|Og)\s*title\s*:\s*/i);
    const ogDesc = pullLabeled(blocks, /^(OG|Og)\s*description\s*:\s*/i);
    const urlFull = pullLabeled(blocks, /^URL\s*:\s*/i);
    const urlAlias = urlFull ? cleanUrlAlias(urlFull) : '';

    // Normaliza / remove aspas e aplica fallback de OG
    h1 = dequote(h1);
    const _metaTitle = dequote(metaTitle);
    const _metaDesc = dequote(metaDesc);
    let _ogTitle = dequote(ogTitle) || _metaTitle;
    let _ogDesc = dequote(ogDesc) || _metaDesc;
    const _urlAlias = urlAlias || '';

    // Prepara editor
    $ed.innerHTML = clean;

    // Alt-tags + blocos sugeridos
    const htmlBlocks = blocks.map(n => n.outerHTML);
    const texts = [], alts = [];
    for (let i = 0; i < htmlBlocks.length; i++) {
      const plain = htmlBlocks[i].replace(/<[^>]+>/g, '').trim();
      const m = plain.match(/^Alt-tag\s*:\s*(.+)$/i);
      if (m) {
        const summary = [];
        for (let j = i + 1; j < htmlBlocks.length && summary.length < 4; j++) {
          const s = htmlBlocks[j].replace(/<[^>]+>/g, '').trim();
          if (!s || /^Alt-tag\s*:/i.test(s) || /^Meta |^(OG|Og)\s+/i.test(s) || /^URL\s*:/i.test(s)) break;
          summary.push(htmlBlocks[j]);
          if (summary.join('').replace(/<[^>]+>/g, '').length >= 480) break;
        }
        alts.push({ alt: m[1].trim(), summary: summary.slice(0, 2).join('') });
      } else texts.push(htmlBlocks[i]);
    }
    const intro = texts.length ? `<h3>${texts[0].replace(/^<p>|<\/p>$/g, '')}<\/h3>` : '';
    const rest = texts.slice(1);
    const parts = (arr, n) => arr.length ? Array.from({ length: n }, (_, k) => arr.slice(Math.ceil(arr.length / n) * k, Math.ceil(arr.length / n) * (k + 1)).join('')) : Array(n).fill('');
    const [t1, t2, t3] = parts(rest, 3);

    return { clean, h1, intro, t1, t2, t3, imgBlocks: alts.slice(0, 2), metaTitle: _metaTitle, metaDesc: _metaDesc, ogTitle: _ogTitle, ogDesc: _ogDesc, urlAlias: _urlAlias };
  };

  // ===== PHASE 2: Main Parser with Format Detection =====
  const parseArticle = (html) => {
    const format = detectDocxFormat(html);

    if (format === 'template') {
      return parseTemplateFormat(html);
    } else {
      // 'standard' or 'unknown' -> use original logic
      return parseStandardFormat(html);
    }
  };

  // ===== PHASE 2: Component Type Mapping =====
  const COMPONENT_TYPE_MAPPING = {
    'Text Block 1': 'c_text',
    'Text Block 2': 'c_text',
    'Text Block 3': 'c_text',
    'Text Block 4': 'c_text',
    'Text Image 1': 'c_sideimagetext',
    'Text Image 2': 'c_sideimagetext',
    'Contact Us Small': 'c_signposting',
    'Article List': 'c_article_list',
    'Image Gallery': 'c_media',
    'Product Recommendations': 'c_products_list',
    'Tabbed Content': 'c_tabbed_content',
    'Accordion': 'c_accordion',
    'Brand Carousel': 'c_brand_carousel',
    'Document': 'c_document',
    // Self-mapping for internal types
    'c_text': 'c_text',
    'c_sideimagetext': 'c_sideimagetext',
    'c_signposting': 'c_signposting',
    'c_article_list': 'c_article_list',
    'c_media': 'c_media',
    'c_products_list': 'c_products_list',
    'c_tabbed_content': 'c_tabbed_content',
    'c_accordion': 'c_accordion',
  };

  const extractComponents = (html) => {
    const components = [];
    const sidebarComponents = [];
    const componentRegex = /\[COMPONENT:\s*([^\]]+)\]/gi;
    const matches = [...html.matchAll(componentRegex)];
    if (matches.length === 0) return null;

    matches.forEach((match, index) => {
      const type = match[1].trim();
      const startIndex = match.index + match[0].length;
      const nextMatch = matches[index + 1];
      const endIndex = nextMatch ? nextMatch.index : html.length;
      const rawContent = html.substring(startIndex, endIndex);

      // Extract content blocks (p, ul, ol, h2, h3, etc.)
      const tmp = document.createElement('div');
      tmp.innerHTML = rawContent;
      const blocks = getParagraphs(tmp);

      // Check for Image Position in content
      let imagePosition = null;
      const filteredBlocks = blocks.filter(b => {
        const txt = b.textContent.trim();
        const posMatch = txt.match(/^Image Position:\s*(Left|Right)/i);
        if (posMatch) {
          imagePosition = posMatch[1].toLowerCase();
          return false; // Remove from content
        }
        return true;
      });

      const content = filteredBlocks.map(b => b.outerHTML).join('');
      const drupalType = COMPONENT_TYPE_MAPPING[type] || 'c_text';

      if (drupalType === 'c_text' && !COMPONENT_TYPE_MAPPING[type]) {
        console.warn(`[v1-Phase2] Componente não mapeado: "${type}", usando c_text como fallback`);
      }

      const compData = {
        type: type,
        content: content,
        rawHtml: rawContent,
        drupalType: drupalType,
        imagePosition: imagePosition
      };

      // Separate Sidebar components
      if (type === 'Contact Us Small' || drupalType === 'c_signposting') {
        sidebarComponents.push(compData);
      } else {
        components.push(compData);
      }
    });

    console.log(`[v1-Phase2] ${components.length} componente(s) principal(is) extraído(s)`);
    console.log(`[v1-Phase2] ${sidebarComponents.length} componente(s) de sidebar extraído(s)`);

    return { components, sidebarComponents };
  };

  const extractCategory = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    const blocks = [...tmp.querySelectorAll('p,h1,h2,h3,h4')];
    const getText = (el) => (el.textContent || '').replace(/\u00a0/g, ' ').trim();

    for (const block of blocks) {
      const text = getText(block);
      const categoryMatch = text.match(/^Article\s*category\s*:\s*([^-]+?)\s*-\s*(.+)$/i);
      if (categoryMatch) {
        const category = {
          name: categoryMatch[1].trim(),
          url: categoryMatch[2].trim()
        };
        console.log('[v1-Phase2] Categoria extraída:', category.name);
        return category;
      }
    }
    return null;
  };

  // ===== PHASE 3: Content Validation (RF-13) =====
  const validateContent = (parsed) => {
    const errors = [];
    const warnings = [];
    const info = [];

    // 1. Required Fields
    if (!parsed.urlAlias) {
      errors.push('URL Alias ausente');
    } else if (!parsed.urlAlias.startsWith('/')) {
      errors.push('URL Alias deve começar com "/"');
    }

    if (!parsed.h1) {
      errors.push('Título (H1) ausente');
    } else if (parsed.h1.length > 255) {
      errors.push(`Título muito longo (${parsed.h1.length}/255 caracteres)`);
    }

    // 2. Metadata
    if (!parsed.metaTitle) {
      warnings.push('Meta Title ausente');
    } else if (parsed.metaTitle.length > 60) {
      warnings.push(`Meta Title muito longo (${parsed.metaTitle.length}/60 caracteres)`);
    }

    if (!parsed.metaDesc) {
      warnings.push('Meta Description ausente');
    } else if (parsed.metaDesc.length > 160) {
      warnings.push(`Meta Description muito longa (${parsed.metaDesc.length}/160 caracteres)`);
    }

    // 3. Components
    if (!parsed.components || parsed.components.length === 0) {
      warnings.push('Nenhum componente encontrado');
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      info
    };
  };

  // ===== PHASE 3: Preview UI (RF-14) =====
  const showPreview = (parsed) => {
    const previewId = 'nppe-preview-modal';
    document.getElementById(previewId)?.remove();

    const modal = document.createElement('div');
    modal.id = previewId;
    modal.style.cssText = `
      position: fixed; inset: 0; z-index: 2147483648; background: rgba(0,0,0,0.8);
      display: flex; align-items: center; justify-content: center; font-family: system-ui, sans-serif;
    `;

    let componentsHtml = '';
    if (parsed.components && parsed.components.length > 0) {
      componentsHtml = parsed.components.map((c, i) => `
        <div style="background:#111; padding:15px; margin-bottom:15px; border:1px solid #333; border-radius:8px;">
          <div style="color:#888; font-size:12px; margin-bottom:8px; text-transform:uppercase; letter-spacing:1px;">Component ${i + 1}: ${c.type}</div>
          <div style="line-height:1.6;">${c.content}</div>
        </div>
      `).join('');
    } else {
      // Fallback for standard format
      componentsHtml = `
        <div style="background:#111; padding:15px; margin-bottom:15px; border:1px solid #333; border-radius:8px;">${parsed.intro || '<em style="color:#666">No Intro</em>'}</div>
        <div style="background:#111; padding:15px; margin-bottom:15px; border:1px solid #333; border-radius:8px;">${parsed.t1 || '<em style="color:#666">No Text 1</em>'}</div>
        <div style="background:#111; padding:15px; margin-bottom:15px; border:1px solid #333; border-radius:8px;">${parsed.t2 || '<em style="color:#666">No Text 2</em>'}</div>
        <div style="background:#111; padding:15px; margin-bottom:15px; border:1px solid #333; border-radius:8px;">${parsed.t3 || '<em style="color:#666">No Text 3</em>'}</div>
      `;
    }

    modal.innerHTML = `
      <div style="width:min(1000px, 90vw); max-height:90vh; background:#0f1115; color:#eee; border-radius:12px; display:flex; flex-direction:column; box-shadow:0 20px 50px rgba(0,0,0,0.7); border:1px solid #333;">
        <div style="padding:16px 20px; border-bottom:1px solid #23262d; display:flex; justify-content:space-between; align-items:center; background:#15181e; border-radius:12px 12px 0 0;">
          <h3 style="margin:0; font-size:18px; font-weight:600;">Preview do Artigo</h3>
          <button id="${previewId}-close" style="background:none; border:none; color:#888; font-size:24px; cursor:pointer; line-height:1;">&times;</button>
        </div>
        <div style="padding:20px; overflow:auto; flex:1;">
          <div style="margin-bottom:24px; padding:20px; background:#1a1d24; border-radius:10px; border:1px solid #2a2f3a;">
            <h1 style="margin-top:0; font-size:24px; color:#fff; margin-bottom:16px;">${parsed.h1 || '<span style="color:#666">(Sem Título H1)</span>'}</h1>
            <div style="display:grid; grid-template-columns:120px 1fr; gap:8px 16px; font-size:13px; color:#ccc;">
              <strong style="color:#888;">URL Alias:</strong> <span style="font-family:monospace; background:#111; padding:2px 6px; border-radius:4px;">${parsed.urlAlias || '-'}</span>
              <strong style="color:#888;">Meta Title:</strong> <span>${parsed.metaTitle || '-'}</span>
              <strong style="color:#888;">Meta Desc:</strong> <span>${parsed.metaDesc || '-'}</span>
              <strong style="color:#888;">Category:</strong> <span>${parsed.category ? parsed.category.name : '-'}</span>
            </div>
          </div>
          <div class="preview-content">
            <h4 style="margin-top:0; color:#888; border-bottom:1px solid #333; padding-bottom:10px; margin-bottom:15px;">Conteúdo / Componentes</h4>
            ${componentsHtml}
          </div>
        </div>
        <div style="padding:16px 20px; border-top:1px solid #23262d; display:flex; justify-content:flex-end; gap:12px; background:#15181e; border-radius:0 0 12px 12px;">
          <button id="${previewId}-cancel" style="padding:10px 20px; background:#2a2f3a; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:500;">Cancelar</button>
          <button id="${previewId}-confirm" style="padding:10px 20px; background:#2a6df5; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:600;">Preencher Drupal &rarr;</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Handlers
    const close = () => modal.remove();
    modal.querySelector(`#${previewId}-close`).onclick = close;
    modal.querySelector(`#${previewId}-cancel`).onclick = close;
    modal.querySelector(`#${previewId}-confirm`).onclick = () => {
      close();
      const fillBtn = document.getElementById(`${ID}-fill`);
      if (fillBtn) fillBtn.click();
    };
  };

  // ===== PHASE 2: AJAX Helper Functions =====

  // Wait for Drupal AJAX operations to complete
  const waitForAjax = async (timeout = 15000, retries = 1) => {
    const check = async () => {
      const start = Date.now();
      // 1. Wait for potential AJAX start (stabilization)
      await new Promise(resolve => setTimeout(resolve, 200));

      while (Date.now() - start < timeout) {
        if (window.jQuery) {
          if (window.jQuery.active === 0) {
            // Double check: wait a bit more to ensure it's really done
            await new Promise(resolve => setTimeout(resolve, 100));
            if (window.jQuery.active === 0) return true;
          }
        } else {
          // Fallback if jQuery not present (shouldn't happen in Drupal admin)
          const ajaxActive = document.querySelector('.ajax-progress') !== null;
          if (!ajaxActive) return true;
        }
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      return false;
    };

    for (let i = 0; i <= retries; i++) {
      if (i > 0) console.log(`[v1-Phase3] Retrying AJAX wait (attempt ${i}/${retries})...`);
      const success = await check();
      if (success) return true;
    }

    console.warn('[v1-Phase3] AJAX timeout after', timeout, 'ms and', retries, 'retries');
    return false;
  };

  // Get the latest (highest index) component in the paragraphs container
  const getLatestComponentIndex = () => {
    const wrapper = document.querySelector('[data-drupal-selector="edit-field-article-lp-components-wrapper"]');
    if (!wrapper) return -1;

    // Find all paragraph items
    const items = wrapper.querySelectorAll('[id^="field-article-lp-components-"][id$="-item-wrapper"]');
    if (items.length === 0) return -1;

    // Extract indices and find max
    const indices = Array.from(items).map(item => {
      const match = item.id.match(/field-article-lp-components-(\d+)-item-wrapper/);
      return match ? parseInt(match[1], 10) : -1;
    }).filter(idx => idx >= 0);

    const maxIndex = Math.max(...indices);
    console.log('[v1-Phase2] Latest component index:', maxIndex);
    return maxIndex;
  };

  // Get the "Add more" button ID for a specific component type
  const getAddMoreButtonId = (drupalType) => {
    // Map internal types to actual Drupal button IDs (with hyphens, not underscores)
    const typeMapping = {
      'c_text': 'c-text',
      'c_sideimagetext': 'c-sideimagetext-ttt',
      'c_signposting': 'c-signposting',
      'c_article_list': null, // Ignored as requested
      'c_media': 'c-media',
      'c_products_list': 'c-products-list',
      'c_tabbed_content': 'c-tabbed-content',
      'c_accordion': 'accordion',
      'c_brand_carousel': 'c-brand-carousel',
      'c_document': 'c-document',
      'c_image': 'c-image',
      'c_brand_discovery': 'c-brand-discovery',
      'product_detail_item': 'product-detail-item',
      'product_listing_block': 'product-listing-block',
      'sidebar_block': 'sidebar-block',
      'from_library': 'from-library',
      'c_pet_age_calculator': 'c-pet-age-calculator'
    };

    const mappedType = typeMapping[drupalType] || drupalType;

    if (mappedType === null) {
      console.warn(`[v1-Phase2.5] Ignoring component type: ${drupalType}`);
      return null;
    }

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

  // ===== PHASE 2: Component Creation Logic =====

  // Check if a component exists at a specific index
  // Check if a component exists at a specific index (handling random suffixes)
  const componentExists = (index) => {
    // Drupal 10+ adds random suffixes like --ZgEISaIFIWU
    const selector = `div[id^="field-article-lp-components-${index}-item-wrapper"]`;
    const wrapper = document.querySelector(selector);
    return wrapper !== null;
  };

  // Create Drupal components from extracted component data
  const createDrupalComponents = async (components, logs) => {
    if (!components || components.length === 0) {
      logs.push('[v1-Phase2] Nenhum componente para criar');
      return [];
    }

    console.log('[v1-Phase2] Verificando e criando componentes...');
    const processedComponents = [];

    for (let i = 0; i < components.length; i++) {
      const component = components[i];
      const { drupalType, type } = component;
      const targetIndex = i; // Assume 1:1 mapping based on order

      // 1. Validate if block already exists
      if (componentExists(targetIndex)) {
        logs.push(`ℹ️ Componente ${i} (${type}) já existe. Pulando criação.`);
        processedComponents.push({
          ...component,
          index: targetIndex
        });
        continue;
      }

      // 2. If block doesn't exist, add it
      logs.push(`[v1-Phase2] Componente ${i} ausente. Criando...`);

      // Find "Add more" button for this component type
      const buttonId = getAddMoreButtonId(drupalType);
      if (!buttonId) {
        logs.push(`❌ Botão "Add more" não encontrado para ${drupalType}`);
        continue;
      }

      const button = document.getElementById(buttonId);
      if (!button) {
        logs.push(`❌ Botão não encontrado: ${buttonId}`);
        continue;
      }

      // Handle Dropbutton: Click toggle if present
      const dropWrapper = button.closest('.dropbutton-wrapper');
      if (dropWrapper) {
        const toggle = dropWrapper.querySelector('.dropbutton-toggle button');
        if (toggle && toggle.offsetParent !== null) { // Check if visible
          console.log('[v1-Phase2] Opening dropbutton...');
          toggle.click();
          await new Promise(r => setTimeout(r, 600)); // Increased wait for UI expansion
        }
      }

      logs.push(`🔄 Adicionando componente ${i + 1}/${components.length}: ${type} (${drupalType})`);

      // Robust Click Sequence
      try {
        button.scrollIntoView({ block: 'center', inline: 'center' });
        button.focus();
        // Dispatch events to ensure Drupal catches the interaction
        button.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true, view: window }));
        button.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true, view: window }));
        button.click();
      } catch (e) {
        console.error('Click error:', e);
        logs.push(`⚠️ Erro ao clicar: ${e.message}`);
        // Fallback simple click
        button.click();
      }

      // Wait for AJAX to complete
      const ajaxSuccess = await waitForAjax(15000);
      if (!ajaxSuccess) {
        logs.push(`⚠️ AJAX timeout para componente ${type}`);
        continue;
      }

      // 3. Validate if block exists (post-creation)
      if (componentExists(targetIndex)) {
        logs.push(`✅ Componente ${i} criado com sucesso`);
        processedComponents.push({
          ...component,
          index: targetIndex
        });

        // Apply Image Position if present (Phase 9)
        if (component.imagePosition) {
          await setSideImagePosition(targetIndex, component.imagePosition, logs);
        }

      } else {
        logs.push(`⚠️ Novo componente ${i} não detectado após AJAX`);
      }

      // Small delay to ensure DOM stability
      await new Promise(r => setTimeout(r, 500));
    }

    return processedComponents;
  };

  // Helper to fill content for a specific component index
  const fillComponentContent = async (componentIndex, content, logs) => {
    if (!content || content.trim() === '') {
      logs.push(`[v1-Phase2] Componente ${componentIndex}: conteúdo vazio, pulando`);
      return false;
    }

    // 1. Find the wrapper first (handling suffixes)
    const wrapperSelector = `div[id^="field-article-lp-components-${componentIndex}-item-wrapper"]`;
    const wrapper = document.querySelector(wrapperSelector);

    if (!wrapper) {
      logs.push(`⚠️ Wrapper não encontrado para componente ${componentIndex}`);
      return false;
    }

    // 2. Find the textarea within the wrapper
    // Try standard body field first
    let fieldSelector = 'textarea[name*="body"]';
    let field = wrapper.querySelector(fieldSelector);

    if (!field) {
      // Try summary field (for side image text)
      fieldSelector = 'textarea[name*="field_c_sideimagetext_summary"]';
      field = wrapper.querySelector(fieldSelector);
    }

    if (field && field.id) {
      console.log('[v1-Phase2] Preenchendo componente', componentIndex, 'campo', field.id);
      // We must pass the ID to setRichText
      await setRichText(`#${field.id}`, content, logs);
      return true;
    }

    logs.push(`⚠️ Campo de texto não encontrado DENTRO do componente ${componentIndex}`);
    return false;
  };

  // ===== PHASE 2.5: Smart Component Creation for Standard Format =====

  // Map standard content blocks to Drupal components
  const mapStandardToComponents = (intro, t1, t2, t3, i1, i2) => {
    const components = [];

    // Intro → c_text (index 0)
    if (intro?.innerHTML?.trim()) {
      components.push({ index: 0, type: 'c_text', content: intro.innerHTML, label: 'Intro' });
    }

    // Text Block 1 → c_text (index 1)
    if (t1?.innerHTML?.trim()) {
      components.push({ index: 1, type: 'c_text', content: t1.innerHTML, label: 'Text Block 1' });
    }

    // Image+Text 1 → c_sideimagetext (index 2)
    if (i1?.innerHTML?.trim()) {
      components.push({ index: 2, type: 'c_sideimagetext', content: i1.innerHTML, label: 'Image+Text 1' });
    }

    // Text Block 2 → c_text (index 3)
    if (t2?.innerHTML?.trim()) {
      components.push({ index: 3, type: 'c_text', content: t2.innerHTML, label: 'Text Block 2' });
    }

    // Image+Text 2 → c_sideimagetext (index 4)
    if (i2?.innerHTML?.trim()) {
      components.push({ index: 4, type: 'c_sideimagetext', content: i2.innerHTML, label: 'Image+Text 2' });
    }

    // Text Block 3 → c_text (index 5)
    if (t3?.innerHTML?.trim()) {
      components.push({ index: 5, type: 'c_text', content: t3.innerHTML, label: 'Text Block 3' });
    }

    return components;
  };

  // Create missing components in order
  const createMissingComponents = async (neededComponents, logs) => {
    const missing = neededComponents.filter(comp => !componentExists(comp.index));

    if (missing.length === 0) {
      logs.push('[v1-Phase2.5] Todos os componentes já existem ✅');
      return true;
    }

    logs.push('');
    logs.push(`[v1-Phase2.5] 🔧 Criando ${missing.length} componente(s) faltante(s)...`);

    for (const comp of missing) {
      const buttonId = getAddMoreButtonId(comp.type);
      if (!buttonId) {
        logs.push(`❌ Botão não encontrado para ${comp.type}`);
        continue;
      }

      const button = document.getElementById(buttonId);
      if (!button) {
        logs.push(`❌ Botão ${buttonId} não existe`);
        continue;
      }

      // Handle Dropbutton: Click toggle if present
      const dropWrapper = button.closest('.dropbutton-wrapper');
      if (dropWrapper) {
        const toggle = dropWrapper.querySelector('.dropbutton-toggle button');
        if (toggle && toggle.offsetParent !== null) { // Check if visible
          console.log('[v1-Phase2.5] Opening dropbutton...');
          toggle.click();
          await new Promise(r => setTimeout(r, 600)); // Increased wait for UI expansion
        }
      }

      logs.push(`🔄 Criando ${comp.label} (index ${comp.index}, tipo ${comp.type})...`);

      // Robust Click Sequence
      try {
        button.scrollIntoView({ block: 'center', inline: 'center' });
        button.focus();
        // Dispatch events to ensure Drupal catches the interaction
        button.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true, view: window }));
        button.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true, view: window }));
        button.click();
      } catch (e) {
        console.error('Click error:', e);
        logs.push(`⚠️ Erro ao clicar: ${e.message}`);
        // Fallback simple click
        button.click();
      }

      const ajaxOk = await waitForAjax(15000);
      if (!ajaxOk) {
        logs.push(`⚠️ AJAX timeout para ${comp.label}`);
        continue;
      }

      // Verify creation
      if (componentExists(comp.index)) {
        logs.push(`✅ ${comp.label} criado com sucesso`);
      } else {
        logs.push(`⚠️ ${comp.label} não detectado após AJAX`);
      }

      // Small delay between creations
      await new Promise(r => setTimeout(r, 500));
    }

    return true;
  };

  // === Markers → Blocos
  const extractByMarkers = (rootHTML) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = rootHTML || '';
    const blocks = [...tmp.querySelectorAll('p,h2,h3,h4,ul,ol')];
    const getText = (el) => (el.textContent || '').replace(/\u00a0/g, ' ').trim();

    let current = null;
    const buf = { intro: '', t1: '', t2: '', t3: '', s1: '', s2: '' };
    const altQ = [];
    const isMeta = (s) => /^(Meta\s*title|Meta\s*description|OG\s*title|OG\s*description|Og\s*title|Og\s*description|URL)\s*:/i.test(s);

    for (const n of blocks) {
      const s = getText(n);
      if (!s) continue;

      const m = s.match(/^Alt-?tag\s*:\s*(.+)$/i);
      if (m) { altQ.push(m[1].trim()); continue; }

      if (/^Intro\s*\(H3\)/i.test(s)) { current = 'intro'; continue; }
      if (/^Text\s*block\s*1/i.test(s)) { current = 't1'; continue; }
      if (/^Text\s*block\s*2/i.test(s)) { current = 't2'; continue; }
      if (/^Text\s*block\s*3/i.test(s)) { current = 't3'; continue; }
      if (/^Image\+Text\s*1(\s*\(summary\))?/i.test(s)) { current = 's1'; continue; }
      if (/^Image\+Text\s*2(\s*\(summary\))?/i.test(s)) { current = 's2'; continue; }

      if (isMeta(s)) { current = null; continue; }

      if (current) buf[current] += n.outerHTML;
    }

    const imgBlocks = [];
    if (buf.s1 || altQ[0]) imgBlocks.push({ alt: altQ[0] || '', summary: buf.s1 || '' });
    if (buf.s2 || altQ[1]) imgBlocks.push({ alt: altQ[1] || '', summary: buf.s2 || '' });

    const any = buf.intro || buf.t1 || buf.t2 || buf.t3 || imgBlocks.length;
    return any ? { intro: buf.intro, t1: buf.t1, t2: buf.t2, t3: buf.t3, imgBlocks } : null;
  };

  // ===== CKEditor helpers =====
  const getCKE5Registry = () => (
    window.Drupal?.CKEditor5Instances || window.Drupal?.ckeditor5Instances || window.Drupal?.CKEditor5?.instances || window.CKEditor5?.instances || null
  );
  const findCKInstance = (textareaEl) => {
    const reg = getCKE5Registry(); if (!reg) return null;
    if (typeof reg.get === 'function' && reg instanceof Map) {
      const byKey = reg.get(textareaEl); if (byKey) return byKey;
      let found = null; reg.forEach((inst, ta) => { const ed = inst?.ui?.getEditableElement?.(); if (ed && (ta === textareaEl || ed.closest('.js-form-item,.paragraphs-subform')?.contains(textareaEl))) found = inst; });
      if (found) return found;
    }
    const list = Array.isArray(reg) ? reg : (typeof reg === 'object' ? Object.values(reg) : []);
    for (const inst of list) { if (!inst) continue; if (inst.sourceElement === textareaEl) return inst; const ed = inst?.ui?.getEditableElement?.(); if (ed && ed.closest('.js-form-item,.paragraphs-subform')?.contains(textareaEl)) return inst; }
    return null;
  };
  const setRichText = async (selector, html, logs) => {
    const ta = await waitFor(selector, { timeout: 8000 }).catch(() => null);
    if (!ta) { logs.push(`❌ Campo não encontrado: ${selector}`); return; }
    pulse(ta);
    let inst = findCKInstance(ta); if (!inst) { await new Promise(r => setTimeout(r, 300)); inst = findCKInstance(ta); }
    if (inst?.setData) { try { inst.setData(html || ''); if (inst.updateSourceElement) inst.updateSourceElement(); ta.value = html || ''; ta.dispatchEvent(new Event('input', { bubbles: true })); logs.push(`✅ CKEditor5 setData OK: ${selector}`); return; } catch (e) { logs.push(`⚠️ CKEditor5 setData falhou (${selector}): ${e.message}`); } }
    const editable = ta.closest('.js-form-item,.paragraphs-subform,.form-wrapper')?.querySelector('.ck-editor__editable[role="textbox"],.ck-content[contenteditable="true"]');
    if (editable) { editable.focus(); try { document.execCommand('selectAll', false, null); } catch { } const ok = document.execCommand('insertHTML', false, html || ''); editable.dispatchEvent(new InputEvent('input', { bubbles: true })); ta.value = html || ''; ta.dispatchEvent(new Event('input', { bubbles: true })); logs.push(ok ? `✅ Fallback insertHTML OK: ${selector}` : `⚠️ Fallback insertHTML sem confirmação: ${selector}`); pulse(editable); return; }
    ta.value = html || ''; ta.dispatchEvent(new Event('input', { bubbles: true })); logs.push(`⚠️ Fallback textarea: ${selector}`);
  };
  const setInput = async (selector, val, logs) => { const el = await waitFor(selector, { timeout: 6000 }).catch(() => null); if (!el) { logs.push(`❌ Campo não encontrado: ${selector}`); return; } el.value = val || ''; el.dispatchEvent(new Event('input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true })); logs.push(`✅ Preenchido: ${selector}`); pulse(el); };

  const resolveSel = (item) => { const f = item.field || {}; if (f.dataDrupalSelector) return `[data-drupal-selector="${f.dataDrupalSelector}"]`; if (f.id) return `#${CSS.escape(f.id)}`; if (f.cssSelector) return f.cssSelector; return null; };

  const openAllParagraphs = async () => {
    const selectors = [
      '.paragraphs-icon-button-edit', '.paragraphs-dropdown .button--edit',
      '.paragraphs-actions input[value="Edit"]', '.paragraphs-actions input[value="Éditer"]', '.paragraphs-actions input[value="Bewerken"]', '.paragraphs-actions input[value="Editar"]',
      'button[aria-label*="Edit"]', 'button[aria-label*="Éditer"]', 'button[aria-label*="Bewerken"]', 'button[aria-label*="Editar"]'
    ];
    const buttons = selectors.flatMap(s => [...document.querySelectorAll(s)]);
    for (const b of buttons) { try { b.click(); await new Promise(r => setTimeout(r, 120)); } catch { } }
    await new Promise(r => setTimeout(r, 350));
  };

  // ===== BOLD → HEADINGS engine =====
  const norm = s => (s || '').replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
  let boldItems = []; // [{id, sentence, bold, level}]

  const isBoldNode = n =>
    n && n.nodeType === 1 && (
      /^(STRONG|B)$/i.test(n.tagName) ||
      (n.tagName === 'A' && n.querySelector('strong,b'))
    );

  const isBetweenOk = n => {
    if (!n) return false;
    if (n.nodeType === 1 && n.tagName === 'BR') return true;
    if (n.nodeType === 3) {
      return /^[\s\u00a0\-–—'’"“”;:?,.]*$/.test(n.textContent || '');
    }
    return false;
  };

  const collectBoldClusters = (block) => {
    const clusters = [];
    const children = Array.from(block.childNodes);
    let i = 0;
    while (i < children.length) {
      const start = children[i];
      if (!isBoldNode(start)) { i++; continue; }

      let startNode = start, endNode = start;
      let textParts = [start.textContent || ''];
      let j = i + 1;

      while (j < children.length) {
        const mid = children[j];
        if (isBetweenOk(mid)) { j++; continue; }
        if (isBoldNode(mid)) {
          endNode = mid;
          textParts.push(mid.textContent || '');
          j++; continue;
        }
        break;
      }

      const clusterText = norm(textParts.join(' '));
      if (clusterText) clusters.push({ startNode, endNode, text: clusterText });

      i = j;
    }
    return clusters;
  };

  const findBoldSentences = (rootHTML) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = rootHTML || '';
    const found = [];
    const seen = new Set();

    // Ignora blocos “técnicos” (ex.: linhas de preview/expected)
    const shouldSkip = (txt) =>
      /expected\s+alt\s+text:/i.test(txt);

    tmp.querySelectorAll('p,li,h2,h3,h4').forEach(block => {
      const full = norm(block.textContent || '');
      if (!full || shouldSkip(full)) return;

      const clusters = collectBoldClusters(block); // grupos de <strong>...> com separadores ok
      clusters.forEach(c => {
        const boldText = norm(c.text);
        if (!boldText) return;

        // dedupe por texto em bold (é o que exibiremos/convertiremos)
        const key = boldText;
        if (seen.has(key)) return;
        seen.add(key);

        found.push({
          id: 'b' + Math.random().toString(36).slice(2, 8),
          display: boldText, // o que aparece na lista
          bold: boldText,    // o que usamos para localizar e converter
          sentence: boldText, // mantemos compatível com o motor atual
          level: 'keep'
        });
      });
    });

    return found;
  };

  const renderBoldList = () => {
    $boldList.innerHTML = '';
    if (!boldItems.length) {
      $boldList.innerHTML = `<div class="meta-preview">Nenhuma sentença em negrito detectada.</div>`;
      return;
    }
    boldItems.forEach(item => {
      const row = document.createElement('div');
      const lvl = item.level || 'keep';
      row.className = 'bolditem';
      row.innerHTML = `
        <div class="txt">${item.display}</div>
        <div>
    <select data-id="${item.id}">
        <option value="keep"${lvl === 'keep' ? ' selected' : ''}>Manter bold</option>
        <option value="h2"${lvl === 'h2' ? ' selected' : ''}>Transformar em H2</option>
      <option value="h3"${lvl === 'h3' ? ' selected' : ''}>Transformar em H3</option>
      <option value="h4"${lvl === 'h4' ? ' selected' : ''}>Transformar em H4</option>
          </select>
        </div>
      `;
      $boldList.appendChild(row);
    });
    $boldList.querySelectorAll('select').forEach(sel => {
      sel.addEventListener('change', e => {
        const it = boldItems.find(x => x.id === e.target.dataset.id);
        if (it) it.level = e.target.value;
      });
    });
  };

  const buildHeadingFromRange = (startNode, endNode, level) => {
    const tag = (level || 'h2').toUpperCase();
    const hx = document.createElement(tag);
    const r = document.createRange();
    r.setStartBefore(startNode);
    r.setEndAfter(endNode);
    const frag = r.cloneContents();
    const container = document.createElement('div'); container.appendChild(frag);
    const onlyA = container.childNodes.length === 1 &&
      container.firstChild.nodeType === 1 &&
      container.firstChild.tagName === 'A';
    hx.innerHTML = onlyA ? container.innerHTML : (container.textContent || '');
    return hx;
  };

  const replaceClusterWithHeading = (block, startNode, endNode, level) => {
    const hx = buildHeadingFromRange(startNode, endNode, level || 'h2');

    const rBefore = document.createRange();
    rBefore.setStart(block, 0);
    rBefore.setEndBefore(startNode);
    const beforeFrag = rBefore.cloneContents();

    const rAfter = document.createRange();
    rAfter.setStartAfter(endNode);
    rAfter.setEnd(block, block.childNodes.length);
    const afterFrag = rAfter.cloneContents();

    const text = s => (s || '').replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
    const hasBefore = text(beforeFrag.textContent) !== '';
    const hasAfter = text(afterFrag.textContent) !== '';

    if (block.tagName === 'LI') {
      block.innerHTML = '';
      if (hasBefore) { const p1 = document.createElement('p'); p1.appendChild(beforeFrag); block.appendChild(p1); }
      block.appendChild(hx);
      if (hasAfter) { const p2 = document.createElement('p'); p2.appendChild(afterFrag); block.appendChild(p2); }
    } else {
      const parent = block.parentNode;
      if (hasBefore) { const p1 = document.createElement('p'); p1.appendChild(beforeFrag); parent.insertBefore(p1, block); }
      parent.insertBefore(hx, block);
      if (hasAfter) { const p2 = document.createElement('p'); p2.appendChild(afterFrag); parent.insertBefore(p2, block); }
      parent.removeChild(block);
    }
  };

  const convertBoldInRoot = (rootEl, item, level) => {
    if (!rootEl) return 0;
    let changes = 0;
    const targetBold = norm(item.bold);
    const targetSentence = norm(item.sentence);

    rootEl.querySelectorAll('p, li').forEach(block => {
      const prev = block.previousElementSibling;
      const next = block.nextElementSibling;
      const isSame = el => el && /^H[2-4]$/i.test(el.tagName) && norm(el.textContent) === targetSentence;
      if (isSame(prev) || isSame(next)) return;

      const clusters = collectBoldClusters(block);
      const hit = clusters.find(c => norm(c.text) === targetBold);
      if (hit) {
        replaceClusterWithHeading(block, hit.startNode, hit.endNode, level);
        changes++; return;
      }

      const full = norm(block.textContent || '');
      if (full === targetSentence) {
        const hx = document.createElement(level.toUpperCase());
        hx.textContent = item.sentence;
        if (block.tagName === 'LI') { block.innerHTML = ''; block.appendChild(hx); }
        else { block.replaceWith(hx); }
        changes++;
      }
    });

    return changes;
  };

  const applyBoldConversions = () => {
    const itemsToApply = Array.from(
      new Map(
        boldItems
          .filter(i => (i.level || 'keep') !== 'keep') // trata undefined como 'keep'
          .map(i => [norm(i.sentence || i.bold || i.display || ''), i])
      ).values()
    );
    if (!itemsToApply.length) { log('Nada para converter.'); return; }

    let total = 0;

    // 1) Editor
    const tmp = document.createElement('div');
    tmp.innerHTML = $ed.innerHTML;
    itemsToApply.forEach(it => { total += convertBoldInRoot(tmp, it, it.level); });
    $ed.innerHTML = sanitizeHTML(tmp.innerHTML);

    // 2) Blocos (exceto Intro)
    const targets = [$t1, $t2, $t3, $i1, $i2];
    itemsToApply.forEach(it => {
      targets.forEach(el => {
        const ttmp = document.createElement('div');
        ttmp.innerHTML = el.innerHTML;
        const changes = convertBoldInRoot(ttmp, it, it.level);
        if (changes) { el.innerHTML = sanitizeHTML(ttmp.innerHTML); total += changes; }
      });
    });

    // 3) Intro sempre H3
    applyHeading($intro, 'h3');

    pulse($ed); targets.forEach(pulse);
    log(`Conversões aplicadas: ${total} heading(s) inseridos (Editor + Blocos).`);
  };

  // ===== Toolbar actions =====
  const onToolbarClick = (ev) => {
    const btn = ev.target.closest('button'); if (!btn) return;
    const cmd = btn.dataset.cmd; const arg = btn.dataset.arg; const act = btn.dataset.act;
    if (cmd) { $ed.focus(); document.execCommand(cmd, false, arg || null); return; }
    if (act === 'link') {
      $ed.focus(); const url = prompt('URL do link:'); if (url) document.execCommand('createLink', false, url);
      return;
    }
    if (act === 'sanitize') {
      $ed.innerHTML = sanitizeHTML($ed.innerHTML); return;
    }
    if (act === 'md-to-editor') {
      const md = ($md?.value || '').trim();
      if (!md) return;
      $ed.innerHTML = markdownToHTML(md);
      log('Markdown convertido e enviado ao Editor.');
      return;
    }
    if (act === 'extract') {
      let parsed = extractByMarkers($ed.innerHTML);
      if (!parsed) parsed = parseArticle($ed.innerHTML);
      $intro.innerHTML = parsed.intro || '';
      $t1.innerHTML = parsed.t1 || '';
      $t2.innerHTML = parsed.t2 || '';
      $t3.innerHTML = parsed.t3 || '';
      $i1.innerHTML = parsed.imgBlocks?.[0]?.summary || '';
      $i2.innerHTML = parsed.imgBlocks?.[1]?.summary || '';
      applyHeading($intro, 'h3');
      $log.textContent = 'Blocos atualizados a partir do Editor (marcadores reconhecidos).';
      return;
    }
  };
  wrap.querySelector('.toolbar').addEventListener('click', onToolbarClick);

  // Helper to set Side Image Position
  const setSideImagePosition = async (index, position, logs) => {
    const wrapperId = `edit-field-article-lp-components-${index}-subform`; // Drupal 10 subform wrapper
    // Fallback to item wrapper if subform not found
    let wrapper = document.getElementById(wrapperId) || document.getElementById(`edit-field-article-lp-components-${index}-item`);

    if (!wrapper) {
      // Try finding by attribute if ID is dynamic
      wrapper = document.querySelector(`[data-drupal-selector="edit-field-article-lp-components-${index}-subform"]`);
    }

    if (!wrapper) {
      logs.push(`⚠️ Wrapper não encontrado para componente ${index} ao definir posição.`);
      return;
    }

    // Normalize position
    const pos = position.toLowerCase();

    // Try Radio Buttons
    // Name format: field_article_lp_components[0][subform][field_side_image_position]
    const radio = wrapper.querySelector(`input[type="radio"][value="${pos}"]`);
    if (radio) {
      radio.click();
      logs.push(`✅ Posição definida: ${pos} (Comp ${index})`);
      return;
    }

    // Try Select (if changed to select)
    const select = wrapper.querySelector(`select[name*="field_side_image_position"]`);
    if (select) {
      select.value = pos;
      select.dispatchEvent(new Event('change', { bubbles: true }));
      logs.push(`✅ Posição definida (Select): ${pos} (Comp ${index})`);
      return;
    }

    logs.push(`⚠️ Campo de posição não encontrado em Comp ${index}`);
  };

  // ===== Fill logic (Meta/OG/URL e H1 sem delay; H1 reforçado) =====
  const fillDrupal = async (mapping, meta) => {
    const logs = [];
    const byNote = (needle) => (mapping.items || []).find(i => (i.note || '').toLowerCase().includes(needle.toLowerCase()));
    const resolve = (it) => resolveSel(it);

    const intro = byNote('Intro');
    const t1 = byNote('First text block');
    const t2 = byNote('Second text block');
    const t3 = byNote('Final text block');
    const i1 = byNote('First Image+Text');
    const i2 = byNote('Second Image+Text');

    const h1Targets = (mapping.items || []).filter(i => /recebe h1/i.test(i.note || ''));

    const metaTitle = (mapping.items || []).find(i => (i.note || '').toLowerCase().includes('meta title'));
    const metaDesc = (mapping.items || []).find(i => (i.note || '').toLowerCase().includes('meta description'));
    const ogTitle = (mapping.items || []).find(i => (i.note || '').toLowerCase().includes('og title'));
    const ogDesc = (mapping.items || []).find(i => (i.note || '').toLowerCase().includes('og description'));
    const urlAlias = (mapping.items || []).find(i => (i.note || '').toLowerCase().includes('url (path'));

    const metaSafe = {
      ...meta,
      ogTitle: meta?.ogTitle || meta?.metaTitle || '',
      ogDesc: meta?.ogDesc || meta?.metaDesc || '',
      urlAlias: meta?.urlAlias || ''
    };

    const getH1Val = () => {
      const ui = (($h1?.innerText || '').trim());
      const metaH1 = (meta?.h1 || '').trim();
      return dequote(ui) || dequote(metaH1);
    };

    const applyH1Once = async () => {
      if (!h1Targets.length) { logs.push('ℹ️ Nenhum alvo de H1 no mapping.'); return; }
      const val = getH1Val();
      if (!val) { logs.push('⚠️ H1 vazio — não alterei os campos de H1.'); return; }
      await Promise.all(h1Targets.map(it => setInput(resolve(it), val, logs)));
      logs.push(`✅ H1 aplicado em ${h1Targets.length} campo(s).`);
    };

    const uncheckPathAuto = async () => {
      const selector = '#edit-path-0-pathauto';
      const cb = document.querySelector(selector);
      if (cb) {
        if (cb.checked) {
          cb.click();
          logs.push('✅ "Generate automatic URL alias" desmarcado.');
        } else {
          logs.push('ℹ️ "Generate automatic URL alias" já estava desmarcado.');
        }
      } else {
        logs.push(`⚠️ Checkbox não encontrado: ${selector}`);
      }
    };

    const upfrontTasks = [];
    upfrontTasks.push(uncheckPathAuto()); // Always uncheck pathauto first
    if (metaTitle) upfrontTasks.push(setInput(resolve(metaTitle), metaSafe.metaTitle || '', logs));
    if (metaDesc) upfrontTasks.push(setInput(resolve(metaDesc), metaSafe.metaDesc || '', logs));
    if (ogTitle) upfrontTasks.push(setInput(resolve(ogTitle), metaSafe.ogTitle || '', logs));
    if (ogDesc) upfrontTasks.push(setInput(resolve(ogDesc), metaSafe.ogDesc || '', logs));
    if (urlAlias) upfrontTasks.push(setInput(resolve(urlAlias), metaSafe.urlAlias || '', logs));
    upfrontTasks.push(applyH1Once());
    const upfront = Promise.all(upfrontTasks);

    await openAllParagraphs();

    // ===== PHASE 2.5: Auto-create missing components (standard format) =====
    if (!meta?.components || meta.components.length === 0) {
      // Standard format - check what components we need
      const neededComponents = mapStandardToComponents($intro, $t1, $t2, $t3, $i1, $i2);

      if (neededComponents.length > 0) {
        logs.push('');
        logs.push('[v1-Phase2.5] 🔍 Verificando componentes necessários...');
        logs.push(`Componentes detectados no DOCX: ${neededComponents.map(c => c.label).join(', ')}`);

        await createMissingComponents(neededComponents, logs);
        logs.push('');
      }
    }

    const contentTasks = [];
    if (intro) contentTasks.push(setRichText(resolve(intro), $intro.innerHTML, logs));
    if (t1) contentTasks.push(setRichText(resolve(t1), $t1.innerHTML, logs));
    if (t2) contentTasks.push(setRichText(resolve(t2), $t2.innerHTML, logs));
    if (t3) contentTasks.push(setRichText(resolve(t3), $t3.innerHTML, logs));
    if (i1) {
      contentTasks.push(setRichText(resolve(i1), $i1.innerHTML, logs));
      // Set Position for i1 (Index 2) -> Left
      contentTasks.push(setSideImagePosition(2, 'left', logs));
    }
    if (i2) {
      contentTasks.push(setRichText(resolve(i2), $i2.innerHTML, logs));
      // Set Position for i2 (Index 4) -> Right
      contentTasks.push(setSideImagePosition(4, 'right', logs));
    }
    await Promise.all(contentTasks);
    await upfront;
    await applyH1Once();

    // ===== PHASE 2: Handle Components =====
    if (meta?.components && meta.components.length > 0) {
      logs.push('');
      logs.push('📦 PHASE 2: Criando componentes...');
      logs.push(`Total de componentes: ${meta.components.length}`);

      const createdComponents = await createDrupalComponents(meta.components, logs);

      // Fill content for each created component
      if (createdComponents.length > 0) {
        logs.push('');
        logs.push('📝 Preenchendo conteúdo dos componentes...');

        let sideImageCount = 0;
        for (const comp of createdComponents) {
          if (comp.content) {
            await fillComponentContent(comp.index, comp.content, logs);
          }

          // Apply Side Image Position (Default: Left -> Right -> Left...)
          if (comp.drupalType === 'c_sideimagetext') {
            sideImageCount++;
            const defaultPos = sideImageCount % 2 !== 0 ? 'left' : 'right';
            const pos = comp.imagePosition || defaultPos;
            await setSideImagePosition(comp.index, pos, logs);
          }
        }

        logs.push(`✅ ${createdComponents.length}/${meta.components.length} componentes processados`);
      }
    }

    // ===== PHASE 9: Handle Sidebar Components =====
    if (meta?.sidebarComponents && meta.sidebarComponents.length > 0) {
      logs.push('');
      logs.push('📦 PHASE 9: Configurando Sidebar...');
      for (const comp of meta.sidebarComponents) {
        if (comp.type === 'Contact Us Small' || comp.drupalType === 'c_signposting') {
          const sidebarInput = document.getElementById('edit-field-article-sidebar-block-0-target-id');
          if (sidebarInput) {
            sidebarInput.value = 'Contact us small (123)'; // Mock ID
            sidebarInput.dispatchEvent(new Event('input', { bubbles: true }));
            logs.push('✅ Sidebar configurada com "Contact us small"');
          } else {
            logs.push('⚠️ Campo de Sidebar não encontrado (edit-field-article-sidebar-block-0-target-id)');
          }
        }
      }
    }

    // ===== PHASE 2: Log Category (if present) =====
    if (meta?.category) {
      logs.push('');
      logs.push(`📂 Categoria detectada: ${meta.category.name}`);
      logs.push(`⚠️ Campo de categoria não implementado ainda - requer mapeamento manual`);
    }

    return logs.join('\n');
  };

  // ===== Wire up buttons =====
  $(`#${ID}-close`).onclick = () => wrap.remove();

  $(`#${ID}-sanitize`).onclick = () => {
    try { $ed.innerHTML = sanitizeHTML($ed.innerHTML); log('HTML sanitizado.'); } catch (e) { console.error(e); log('Erro ao sanitizar:', e.message); }
  };

  $(`#${ID}-extract`).onclick = () => {
    try {
      let parsed = extractByMarkers($ed.innerHTML);
      if (!parsed) parsed = parseArticle($ed.innerHTML);
      if (parsed.h1) $h1.textContent = parsed.h1;
      $intro.innerHTML = parsed.intro || '';
      $t1.innerHTML = parsed.t1 || '';
      $t2.innerHTML = parsed.t2 || '';
      $t3.innerHTML = parsed.t3 || '';
      $i1.innerHTML = parsed.imgBlocks?.[0]?.summary || '';
      $i2.innerHTML = parsed.imgBlocks?.[1]?.summary || '';
      applyHeading($intro, 'h3');
      $log.textContent = 'Blocos atualizados a partir do Editor (via botão).';
    } catch (e) { console.error(e); log('Erro ao extrair:', e.message); }
  };

  $(`#${ID}-preview`).onclick = () => {
    try {
      const parsed = parseArticle($ed.innerHTML);
      showPreview(parsed);
    } catch (e) { console.error(e); log('Erro ao gerar preview:', e.message); }
  };

  $(`#${ID}-analyze`).onclick = async () => {
    try {
      // Fonte padrão = conteúdo atual do Editor
      let src = $ed.innerHTML.trim();

      // Prioridade: .docx > Markdown > Editor
      const f = $docx.files?.[0];
      const md = ($md?.value || '').trim();

      if (f) {
        log('Lendo .docx…');
        src = await getDocxHTML(f);
        $ed.innerHTML = src;
      } else if (md) {
        log('Convertendo Markdown…');
        src = markdownToHTML(md);
        $ed.innerHTML = src;
      }

      const parsed = parseArticle(src || $ed.innerHTML);

      // ===== PHASE 3: Content Validation (RF-13) =====
      const validation = validateContent(parsed);
      if (!validation.valid || validation.warnings.length > 0) {
        let msg = '';
        if (!validation.valid) msg += '❌ ERROS:\n' + validation.errors.join('\n') + '\n\n';
        if (validation.warnings.length > 0) msg += '⚠️ AVISOS:\n' + validation.warnings.join('\n');
        alert(msg);
      }

      $ed.innerHTML = parsed.clean;

      $h1.innerText = parsed.h1 || '';
      $metaPreview.innerHTML = `
      <div><b>Meta title:</b> ${parsed.metaTitle || '—'}</div>
      <div><b>Meta description:</b> ${parsed.metaDesc || '—'}</div>
      <div><b>OG title:</b> ${parsed.ogTitle || '—'}</div>
      <div><b>OG description:</b> ${parsed.ogDesc || '—'}</div>
      <div><b>URL alias:</b> ${parsed.urlAlias || '—'}</div>
    `;

      boldItems = findBoldSentences($ed.innerHTML);
      renderBoldList();

      applyHeading($intro, 'h3');

      $log.textContent =
        `✔ Sanitizado e analisado. Clique em "Extrair → Blocos" para popular os blocos.` +
        `\nH1: "${parsed.h1 || '—'}"` +
        `\nMeta: title="${parsed.metaTitle || '—'}" / desc="${parsed.metaDesc || '—'}"` +
        `\nOG: title="${parsed.ogTitle || parsed.metaTitle || '—'}" / desc="${parsed.ogDesc || parsed.metaDesc || '—'}"` +
        `\nURL alias: ${parsed.urlAlias || '—'}`;
      $log.dataset.meta = JSON.stringify({
        h1: parsed.h1,
        metaTitle: parsed.metaTitle,
        metaDesc: parsed.metaDesc,
        ogTitle: parsed.ogTitle || parsed.metaTitle,
        ogDesc: parsed.ogDesc || parsed.metaDesc,
        urlAlias: parsed.urlAlias,
        components: parsed.components,
        category: parsed.category
      });
    } catch (e) {
      console.error(e);
      log('Erro ao analisar:', e.message);
    }
  };


  $(`#${ID}-bold-apply`).onclick = () => {
    try {
      applyBoldConversions();
    } catch (e) { console.error(e); log('Erro ao aplicar conversões:', e.message); }
  };
  $(`#${ID}-bold-rescan`).onclick = () => {
    try {
      boldItems = findBoldSentences($ed.innerHTML);
      renderBoldList();
      log('Revarrido bolds do Editor.');
    } catch (e) { console.error(e); log('Erro ao revarrer:', e.message); }
  };

  // >>> ALTERADO para usar o dropdown de modelos <<<
  $(`#${ID}-fill`).onclick = async () => {
    try {
      const mapping = MODELS[$model.value] || {};
      const meta = JSON.parse($log.dataset.meta || '{}');
      if (!mapping?.items?.length) { log('Selecione um modelo válido no dropdown.'); return; }
      $log.textContent = 'Abrindo Paragraphs e preenchendo…';
      const result = await fillDrupal(mapping, meta);
      $log.textContent = 'Preenchimento concluído:\n' + result;
    } catch (e) { console.error(e); log('Erro ao preencher:', e.message); }
  };
})();
