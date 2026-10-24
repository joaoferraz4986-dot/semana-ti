// Mini-parser de Markdown para os capítulos.
// Suporta só o necessário (de propósito, para ser previsível):
//   frontmatter entre ---  ·  **negrito**  ·  *itálico*  ·  parágrafos (quebra de linha = <br>)
//   - lista  ·  1. lista numerada  ·  > nota pequena  ·  A → B → C (fluxo)  ·  C ← B ← A (fluxo reverso)
//   ::: verdade  ...  :::   (cartões de "prova": verdade, exagero, humano, alerta, fato)
//   <!-- passo -->  separa passos internos; aceita atributos: <!-- passo estado=x camera=y clima=holofote -->

const CARIMBOS = {
  verdade: 'Verdade',
  exagero: 'Exagero',
  humano: 'Continua humano',
  alerta: 'Alerta',
  fato: 'O que aconteceu',
};

export function parseFrontmatter(raw) {
  const texto = raw.replace(/^﻿/, '').replace(/\r\n?/g, '\n');
  const m = texto.match(/^---\n([\s\S]*?)\n---\n?/);
  const dados = {};
  if (!m) return { dados, corpo: texto };
  for (const linha of m[1].split('\n')) {
    const lm = linha.match(/^\s*([\w-]+)\s*:\s*(.*)$/);
    if (!lm) continue;
    let valor = lm[2].replace(/\s+#.*$/, '').trim();
    if (/^".*"$|^'.*'$/.test(valor)) valor = valor.slice(1, -1);
    else if (/^-?\d+(\.\d+)?$/.test(valor)) valor = Number(valor);
    dados[lm[1]] = valor;
  }
  return { dados, corpo: texto.slice(m[0].length) };
}

export function parseAtributos(str = '') {
  const out = {};
  for (const m of str.matchAll(/([\w-]+)\s*=\s*("[^"]*"|'[^']*'|[^\s]+)/g)) {
    out[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
  return out;
}

// Separa o corpo em passos. Retorna [{ atributos, markdown }]
export function separarPassos(corpo) {
  const partes = [];
  const re = /<!--\s*passo\b([\s\S]*?)-->/g;
  let ultimo = 0;
  let attrs = {};
  let m;
  while ((m = re.exec(corpo))) {
    partes.push({ atributos: attrs, markdown: corpo.slice(ultimo, m.index) });
    attrs = parseAtributos(m[1]);
    ultimo = m.index + m[0].length;
  }
  partes.push({ atributos: attrs, markdown: corpo.slice(ultimo) });
  return partes;
}

export function inline(txt) {
  return txt
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*(?!\s)(.+?)\*/g, '$1<em>$2</em>');
}

const RE_FLUXO = /\s(→|←)\s/;

function renderFluxo(linha) {
  let rotulo = '';
  let resto = linha;
  const lm = linha.match(/^([^:→←]{2,40}):\s+(.+)$/);
  if (lm) {
    rotulo = lm[1];
    resto = lm[2];
  }
  const reverso = resto.includes('←');
  const itens = resto.split(/\s*[→←]\s*/).filter(Boolean);
  const html = itens
    .map((it, i) => (i ? '<span class="fluxo__seta" aria-hidden="true"></span>' : '') + `<span class="fluxo__item">${inline(it)}</span>`)
    .join('');
  return `<div class="fluxo${reverso ? ' fluxo--reverso' : ''}" role="group" aria-label="${(rotulo || 'fluxo').replace(/"/g, '')}">${
    rotulo ? `<span class="fluxo__rotulo">${inline(rotulo)}</span>` : ''
  }<div class="fluxo__itens">${html}</div></div>`;
}

export function renderBlocos(md) {
  const linhas = md.replace(/\r\n?/g, '\n').split('\n');
  const out = [];
  let i = 0;
  const vazia = (l) => !l || !l.trim();

  while (i < linhas.length) {
    const l = linhas[i];
    if (vazia(l)) {
      i++;
      continue;
    }
    const t = l.trim();

    // ::: prova
    const pm = t.match(/^:::\s*(\w+)(?:\s*\|\s*(.+))?$/);
    if (pm) {
      const tipo = pm[1].toLowerCase();
      const carimbo = pm[2] || CARIMBOS[tipo] || tipo;
      const dentro = [];
      i++;
      while (i < linhas.length && linhas[i].trim() !== ':::') dentro.push(linhas[i++]);
      i++;
      let manchete = '';
      if (dentro.length && /^#\s+/.test(dentro.find((x) => x.trim()) || '')) {
        const idx = dentro.findIndex((x) => x.trim());
        manchete = `<p class="prova__manchete">${inline(dentro[idx].trim().replace(/^#\s+/, ''))}</p>`;
        dentro.splice(idx, 1);
      }
      out.push(
        `<article class="prova prova--${tipo}"><span class="carimbo">${inline(carimbo)}</span>${manchete}${renderBlocos(dentro.join('\n'))}</article>`,
      );
      continue;
    }

    if (/^[-*]\s+/.test(t)) {
      const itens = [];
      while (i < linhas.length && /^\s*[-*]\s+/.test(linhas[i])) itens.push(linhas[i++].trim().replace(/^[-*]\s+/, ''));
      out.push(`<ul class="lista">${itens.map((x) => `<li><span>${inline(x)}</span></li>`).join('')}</ul>`);
      continue;
    }

    if (/^\d+\.\s+/.test(t)) {
      const itens = [];
      while (i < linhas.length && /^\s*\d+\.\s+/.test(linhas[i])) {
        const mm = linhas[i++].trim().match(/^(\d+)\.\s+(.*)$/);
        itens.push([Number(mm[1]), mm[2]]);
      }
      out.push(
        `<ol class="lista lista--numerada">${itens
          .map(([n, x]) => `<li data-n="${String(n).padStart(2, '0')}"><span>${inline(x)}</span></li>`)
          .join('')}</ol>`,
      );
      continue;
    }

    if (/^>\s?/.test(t)) {
      const itens = [];
      while (i < linhas.length && /^\s*>\s?/.test(linhas[i])) itens.push(linhas[i++].trim().replace(/^>\s?/, ''));
      out.push(`<p class="nota">${inline(itens.join('<br>'))}</p>`);
      continue;
    }

    if (RE_FLUXO.test(t)) {
      out.push(renderFluxo(t));
      i++;
      continue;
    }

    // parágrafo
    const par = [];
    while (
      i < linhas.length &&
      !vazia(linhas[i]) &&
      !/^\s*([-*]\s+|\d+\.\s+|>|:::)/.test(linhas[i]) &&
      !RE_FLUXO.test(linhas[i].trim())
    ) {
      par.push(linhas[i++].trim());
    }
    out.push(`<p>${inline(par.join('<br>'))}</p>`);
  }
  return out.join('\n');
}

// Lê um arquivo .md de capítulo inteiro.
export function parseCapitulo(raw, arquivo = '') {
  const { dados, corpo } = parseFrontmatter(raw);
  const passos = separarPassos(corpo).map((p) => ({ ...p, html: renderBlocos(p.markdown) }));
  return { arquivo, dados, passos };
}
