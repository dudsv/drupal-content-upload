import { MODELS } from '../config/models.js';
import { markdownToHTML } from '../parsers/markdown.js';
import { getDocxHTML } from '../parsers/docx.js';
import { parseArticle } from '../parsers/format-detector.js';
import { fillDrupal } from '../drupal/adapter.js';
import { sanitizeHTML, esc, pulse } from '../utils/helpers.js';

export const createPanel = () => {
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
        <h3>NPPE – Paste Filler (Modular v2)</h3>
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
            <div class="toolbar">
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
        <button class="secondary" id="${ID}-autotag">Auto-Tag</button>
        <button class="secondary" id="${ID}-analyze">Analisar</button>
        <button id="${ID}-fill">Preencher Drupal</button>
        <button class="secondary" id="${ID}-close">Fechar</button>
      </div>
    </div>
  `;
    document.body.appendChild(wrap);

    // Refs
    const $ = sel => wrap.querySelector(sel);
    const $model = $(`#${ID}-model`);
    const $docx = $(`#${ID}-docx`);
    const $md = $(`#${ID}-md`);
    const $log = $(`#${ID}-log`);
    const $ed = $(`#${ID}-editor`);
    const $h1 = $(`#${ID}-h1`);
    const $metaPreview = $(`#${ID}-meta-preview`);
    const $boldList = $(`#${ID}-bold-list`);
    const $boldRescan = $(`#${ID}-bold-rescan`);
    const $boldApply = $(`#${ID}-bold-apply`);
    const $autotag = $(`#${ID}-autotag`);
    const $sanitize = $(`#${ID}-sanitize`);
    const $analyze = $(`#${ID}-analyze`);
    const $fill = $(`#${ID}-fill`);
    const $close = $(`#${ID}-close`);
    const $intro = $(`#${ID}-intro`), $t1 = $(`#${ID}-t1`), $t2 = $(`#${ID}-t2`), $t3 = $(`#${ID}-t3`), $i1 = $(`#${ID}-i1`), $i2 = $(`#${ID}-i2`);

    const log = (...a) => { $log.textContent = a.join(' '); };

    // Init Dropdown
    (() => {
        const keys = Object.keys(MODELS);
        $model.innerHTML = keys.map(k => `<option value="${k}">${k}</option>`).join('');
        if (keys.length) $model.value = keys[0];
    })();

    // Event Listeners
    $close.onclick = () => { wrap.remove(); style.remove(); };

    $model.onchange = () => {
        const k = $model.value;
        const m = MODELS[k];
        if (m) log('Modelo selecionado:', k, '\nURL:', m.url);
    };

    $docx.onchange = async () => {
        if (!$docx.files[0]) return;
        try {
            log('Lendo DOCX...');
            const html = await getDocxHTML($docx.files[0]);
            $ed.innerHTML = html;
            log('DOCX carregado no Editor. Clique em "Analisar" para distribuir nos blocos.');
        } catch (e) {
            console.error(e);
            log('Erro ao ler DOCX:', e.message);
        }
    };

    $sanitize.onclick = () => {
        const clean = sanitizeHTML($ed.innerHTML);
        $ed.innerHTML = clean;
        log('HTML sanitizado.');
    };

    $analyze.onclick = () => {
        if ($md.value.trim()) {
            $ed.innerHTML = markdownToHTML($md.value);
        }

        const html = $ed.innerHTML;
        const res = parseArticle(html);

        $h1.innerText = res.h1;
        $metaPreview.innerHTML = `
      <div><b>Meta Title:</b> ${esc(res.metaTitle)}</div>
      <div><b>Meta Desc:</b> ${esc(res.metaDesc)}</div>
      <div><b>OG Title:</b> ${esc(res.ogTitle)}</div>
      <div><b>OG Desc:</b> ${esc(res.ogDesc)}</div>
      <div><b>URL Alias:</b> ${esc(res.urlAlias)}</div>
      <div style="margin-top:6px;font-size:0.9em;color:#666">
        Componentes detectados: ${res.components.length}
        ${res.components.length ? ' (Modo Template)' : ' (Modo Standard)'}
      </div>
    `;

        $log.dataset.meta = JSON.stringify(res);

        $intro.innerHTML = res.intro;
        $t1.innerHTML = res.t1;
        $t2.innerHTML = res.t2;
        $t3.innerHTML = res.t3;

        if (res.imgBlocks && res.imgBlocks.length) {
            $i1.innerHTML = res.imgBlocks[0]?.summary || '';
            $i2.innerHTML = res.imgBlocks[1]?.summary || '';
        } else {
            $i1.innerHTML = '(Ver componentes)';
            $i2.innerHTML = '(Ver componentes)';
        }

        // Bold scan logic would go here (simplified for now)
        log('Análise concluída.');
    };

    $fill.onclick = async () => {
        if (!$log.dataset.meta) {
            log('Analise o conteúdo primeiro.');
            return;
        }
        const meta = JSON.parse($log.dataset.meta);
        try {
            const resultLog = await fillDrupal(meta, { $intro, $t1, $t2, $t3, $i1, $i2 });
            log(resultLog);
        } catch (e) {
            console.error(e);
            log('Erro no preenchimento:', e.message);
        }
    };

    // Toolbar
    wrap.querySelector('.toolbar').addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;
        const act = btn.dataset.act;
        if (act === 'md-to-editor') {
            const md = $md.value;
            if (!md.trim()) { alert('Cole Markdown na caixa acima primeiro.'); return; }
            $ed.innerHTML = markdownToHTML(md);
        }
    });

    // Mini Controls Logic (simplified)
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
        toList.forEach(p => p.remove());
        ed.insertBefore(ul, start.nextSibling);
    };

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

    log('Painel carregado.');
};
