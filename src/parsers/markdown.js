import { sanitizeHTML, esc, sentenceCase } from '../utils/helpers.js';

export const markdownToHTML = (md) => {
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
