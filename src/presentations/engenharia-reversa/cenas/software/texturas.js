import * as THREE from 'three';
import { FONTE, BINARIO, ASSEMBLY, PSEUDO } from './exemplo.js';

// Texturas desenhadas em canvas: tela do app, camadas, faces do executável, cartões da API.
// Tudo é redesenhado quando as fontes terminam de carregar (para usar a Instrument Sans/Serif).

const TINTA = '#191714';
const TINTA2 = '#6e685f';
const CERAMICA = '#ebe6dd';
export const SANS = '"Instrument Sans", "Segoe UI", sans-serif';
export const SERIF = '"Instrument Serif", Georgia, serif';
export const MONO = '"Cascadia Mono", Consolas, "Courier New", monospace';

const todas = [];

export function textura(w, h, desenhar, { srgb = true } = {}) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const g = c.getContext('2d', { willReadFrequently: true });
  const tex = new THREE.CanvasTexture(c);
  if (srgb) tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  const item = {
    tex,
    redesenhar() {
      g.save();
      g.clearRect(0, 0, w, h);
      desenhar(g, w, h);
      g.restore();
      tex.needsUpdate = true;
    },
  };
  item.redesenhar();
  todas.push(item);
  return tex;
}

export function redesenharQuandoFontesProntas() {
  const fontes = [`600 40px ${SANS}`, `400 40px ${SANS}`, `400 40px ${SERIF}`];
  Promise.all(fontes.map((f) => document.fonts?.load(f).catch(() => null)))
    .then(() => document.fonts?.ready)
    .then(() => todas.forEach((t) => t.redesenhar()))
    .catch(() => {});
}

// texto "gravado": sombra clara deslocada embaixo dá a sensação de baixo-relevo
function gravado(g, txt, x, y, cor = TINTA, luz = 'rgba(255,255,255,0.55)') {
  g.fillStyle = luz;
  g.fillText(txt, x + 1.5, y + 2);
  g.fillStyle = cor;
  g.fillText(txt, x, y);
}

function retArred(g, x, y, w, h, r) {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}

function fundoCeramica(g, w, h, cor = CERAMICA) {
  g.fillStyle = cor;
  g.fillRect(0, 0, w, h);
  // grão muito leve, para não parecer plástico liso
  const img = g.getImageData(0, 0, w, h);
  for (let i = 0; i < img.data.length; i += 4) {
    const n = (Math.random() - 0.5) * 7;
    img.data[i] += n;
    img.data[i + 1] += n;
    img.data[i + 2] += n;
  }
  g.putImageData(img, 0, 0);
}

// ---------- o app fictício "Lanchonete Pátio" ----------
export function desenharApp(g, w, h, { acento }) {
  g.fillStyle = '#f6f2ec';
  g.fillRect(0, 0, w, h);
  const m = w * 0.08;
  // barra de status
  g.fillStyle = TINTA;
  g.font = `600 ${w * 0.04}px ${SANS}`;
  g.fillText('9:41', m, h * 0.045);
  g.fillRect(w - m - w * 0.09, h * 0.028, w * 0.09, h * 0.018);
  // cabeçalho
  g.fillStyle = acento;
  g.fillRect(m, h * 0.09, w * 0.12, h * 0.008);
  g.fillStyle = TINTA;
  g.font = `400 ${w * 0.115}px ${SERIF}`;
  g.fillText('Lanchonete', m, h * 0.155);
  g.fillText('Pátio', m, h * 0.21);
  g.fillStyle = TINTA2;
  g.font = `400 ${w * 0.045}px ${SANS}`;
  g.fillText('Cardápio do intervalo', m, h * 0.25);
  // lista
  const itens = [
    ['X-salada', 'R$ 12,00'],
    ['Pão de queijo', 'R$ 4,50'],
    ['Coxinha', 'R$ 5,00'],
    ['Suco natural', 'R$ 6,00'],
    ['Bolo de cenoura', 'R$ 5,50'],
  ];
  let y = h * 0.31;
  for (const [nome, preco] of itens) {
    g.strokeStyle = 'rgba(25,23,20,0.14)';
    g.lineWidth = 2;
    g.beginPath();
    g.moveTo(m, y);
    g.lineTo(w - m, y);
    g.stroke();
    g.fillStyle = '#e3ddd2';
    retArred(g, m, y + h * 0.018, w * 0.16, w * 0.16, w * 0.03);
    g.fill();
    g.fillStyle = TINTA;
    g.font = `500 ${w * 0.055}px ${SANS}`;
    g.fillText(nome, m + w * 0.21, y + h * 0.05);
    g.fillStyle = TINTA2;
    g.font = `400 ${w * 0.045}px ${SANS}`;
    g.fillText(preco, m + w * 0.21, y + h * 0.078);
    g.fillStyle = TINTA;
    g.font = `400 ${w * 0.07}px ${SANS}`;
    g.fillText('+', w - m - w * 0.06, y + h * 0.064);
    y += h * 0.105;
  }
  // botão
  g.fillStyle = TINTA;
  retArred(g, m, h * 0.86, w - 2 * m, h * 0.065, w * 0.03);
  g.fill();
  g.fillStyle = '#f6f2ec';
  g.font = `600 ${w * 0.055}px ${SANS}`;
  g.textAlign = 'center';
  g.fillText('Fazer pedido · 2 itens', w / 2, h * 0.9);
  g.textAlign = 'left';
}

// ---------- as 5 camadas (placas de cerâmica impressas) ----------
function cabecalhoCamada(g, w, h, n, nome) {
  g.font = `600 ${w * 0.05}px ${SANS}`;
  gravado(g, `${n}`, w * 0.08, h * 0.06, '#c4502b');
  g.font = `400 ${w * 0.09}px ${SERIF}`;
  gravado(g, nome, w * 0.16, h * 0.065);
  g.strokeStyle = 'rgba(25,23,20,0.35)';
  g.lineWidth = 2;
  g.beginPath();
  g.moveTo(w * 0.08, h * 0.085);
  g.lineTo(w * 0.92, h * 0.085);
  g.stroke();
}

export function desenharCamada(tipo, acento) {
  return (g, w, h) => {
    if (tipo === 'interface') return desenharApp(g, w, h, { acento });
    fundoCeramica(g, w, h);
    const m = w * 0.08;
    if (tipo === 'logica') {
      cabecalhoCamada(g, w, h, 2, 'Lógica');
      g.font = `400 ${w * 0.036}px ${MONO}`;
      const linhas = [
        'function adicionar(item) {',
        '  carrinho.push(item)',
        '  total += item.preco',
        '  atualizarTela()',
        '}',
        '',
        'function fazerPedido() {',
        '  if (carrinho.length === 0)',
        '    return avisar("vazio")',
        '  api.post("/pedidos", carrinho)',
        '}',
      ];
      linhas.forEach((l, i) => gravado(g, l, m, h * (0.15 + i * 0.045), TINTA));
      // o resto vira "textura de código" (barras), como num mapa
      for (let i = 0; i < 13; i++) {
        const y = h * (0.66 + i * 0.024);
        const ind = (i % 4) * w * 0.05;
        g.fillStyle = i % 5 === 2 ? 'rgba(196,80,43,0.55)' : 'rgba(25,23,20,0.28)';
        g.fillRect(m + ind, y, w * (0.25 + ((i * 37) % 40) / 100), h * 0.008);
      }
    } else if (tipo === 'rede') {
      cabecalhoCamada(g, w, h, 3, 'Rede');
      const caixa = (x, y, txt) => {
        g.strokeStyle = TINTA;
        g.lineWidth = 3;
        retArred(g, x, y, w * 0.34, h * 0.07, 10);
        g.stroke();
        g.font = `500 ${w * 0.04}px ${SANS}`;
        gravado(g, txt, x + w * 0.04, y + h * 0.045);
      };
      caixa(m, h * 0.18, 'app');
      caixa(w - m - w * 0.34, h * 0.18, 'servidor');
      g.font = `400 ${w * 0.034}px ${MONO}`;
      const msgs = ['GET  /cardapio', '200  [ … ]', 'POST /pedidos', '201  { pedido }'];
      msgs.forEach((t, i) => {
        const y = h * (0.33 + i * 0.12);
        const ida = i % 2 === 0;
        g.strokeStyle = ida ? '#c4502b' : TINTA;
        g.lineWidth = 3;
        g.beginPath();
        g.moveTo(m + w * 0.17, y);
        g.lineTo(w - m - w * 0.17, y);
        g.stroke();
        const ax = ida ? w - m - w * 0.17 : m + w * 0.17;
        const d = ida ? -1 : 1;
        g.beginPath();
        g.moveTo(ax, y);
        g.lineTo(ax + d * 22, y - 12);
        g.moveTo(ax, y);
        g.lineTo(ax + d * 22, y + 12);
        g.stroke();
        gravado(g, t, m + w * 0.2, y - h * 0.02);
      });
    } else if (tipo === 'dados') {
      cabecalhoCamada(g, w, h, 4, 'Dados');
      const cols = [m, m + w * 0.17, m + w * 0.58];
      const linhas = [
        ['id', 'item', 'preço'],
        ['1', 'X-salada', '12,00'],
        ['2', 'Pão de queijo', '4,50'],
        ['3', 'Coxinha', '5,00'],
        ['4', 'Suco natural', '6,00'],
        ['5', 'Bolo', '5,50'],
      ];
      linhas.forEach((l, i) => {
        const y = h * (0.17 + i * 0.07);
        g.font = i === 0 ? `600 ${w * 0.042}px ${SANS}` : `400 ${w * 0.042}px ${MONO}`;
        l.forEach((t, j) => gravado(g, t, cols[j], y, i === 0 ? '#c4502b' : TINTA));
        g.strokeStyle = 'rgba(25,23,20,0.3)';
        g.lineWidth = i === 0 ? 3 : 1.5;
        g.beginPath();
        g.moveTo(m, y + h * 0.022);
        g.lineTo(w - m, y + h * 0.022);
        g.stroke();
      });
      for (const x of [cols[1] - w * 0.03, cols[2] - w * 0.03]) {
        g.beginPath();
        g.moveTo(x, h * 0.13);
        g.lineTo(x, h * 0.58);
        g.stroke();
      }
    } else if (tipo === 'binario') {
      cabecalhoCamada(g, w, h, 5, 'Binário');
      g.font = `400 ${w * 0.03}px ${MONO}`;
      let s = 7;
      const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
      for (let i = 0; i < 36; i++) {
        let linha = '';
        for (let j = 0; j < 8; j++) linha += Math.floor(rnd() * 256).toString(2).padStart(8, '0').slice(0, 4) + ' ';
        g.fillStyle = i % 9 === 4 ? 'rgba(196,80,43,0.85)' : 'rgba(25,23,20,0.62)';
        g.fillText(linha, m, h * (0.13 + i * 0.023));
      }
    }
  };
}

// ---------- placa com o código-fonte ----------
export function desenharFonte(g, w, h) {
  fundoCeramica(g, w, h, '#efeae2');
  const m = w * 0.06;
  g.font = `600 ${w * 0.026}px ${SANS}`;
  gravado(g, 'desconto.c', m, h * 0.1, TINTA2);
  g.font = `400 ${w * 0.034}px ${MONO}`;
  FONTE.split('\n').forEach((l, i) => {
    const y = h * (0.22 + i * 0.09);
    const comentario = l.trim().startsWith('//') || l.includes('// ');
    if (comentario && l.includes('// ') && !l.trim().startsWith('//')) {
      const [codigo, com] = l.split('// ');
      gravado(g, codigo, m, y, TINTA);
      const larg = g.measureText(codigo).width;
      gravado(g, '// ' + com, m + larg, y, '#8a8378');
    } else gravado(g, l, m, y, l.trim().startsWith('//') ? '#8a8378' : TINTA);
  });
}

// ---------- faces cortadas do executável ----------
function faceMetal(g, w, h, titulo, nivel) {
  // alumínio usinado: marcas circulares de faceamento
  g.fillStyle = '#cfccc6';
  g.fillRect(0, 0, w, h);
  g.save();
  g.translate(w * 0.5, h * 1.6);
  for (let r = 40; r < w * 1.6; r += 3) {
    g.strokeStyle = `rgba(${r % 7 < 3 ? '255,255,255' : '90,86,80'},${0.05 + ((r * 13) % 10) / 260})`;
    g.lineWidth = 1.2;
    g.beginPath();
    g.arc(0, 0, r, 0, Math.PI * 2);
    g.stroke();
  }
  g.restore();
  const m = w * 0.06;
  g.font = `600 ${w * 0.024}px ${SANS}`;
  gravado(g, `nível ${nivel}`, m, h * 0.1, '#c4502b', 'rgba(255,255,255,0.6)');
  g.font = `400 ${w * 0.06}px ${SERIF}`;
  gravado(g, titulo, m, h * 0.19, TINTA, 'rgba(255,255,255,0.6)');
  g.strokeStyle = 'rgba(25,23,20,0.45)';
  g.lineWidth = 2;
  g.beginPath();
  g.moveTo(m, h * 0.225);
  g.lineTo(w - m, h * 0.225);
  g.stroke();
  return m;
}

export function desenharFace(nivel) {
  return (g, w, h) => {
    if (nivel === 1) {
      const m = faceMetal(g, w, h, 'Binário', 1);
      g.font = `400 ${w * 0.03}px ${MONO}`;
      const todos = [...BINARIO.antes, ...BINARIO.funcao, ...BINARIO.depois];
      const ini = BINARIO.antes.length;
      const fim = ini + BINARIO.funcao.length;
      for (let l = 0; l < 4; l++) {
        const y = h * (0.33 + l * 0.11);
        const end = (BINARIO.inicio + l * 16).toString(16).padStart(8, '0');
        gravado(g, end, m, y, TINTA2, 'rgba(255,255,255,0.6)');
        for (let k = 0; k < 16; k++) {
          const i = l * 16 + k;
          const b = todos[i];
          if (b === undefined) continue;
          const x = m + w * 0.2 + k * w * 0.044 + (k >= 8 ? w * 0.015 : 0);
          const naFuncao = i >= ini && i < fim;
          gravado(g, b.toString(16).padStart(2, '0').toUpperCase(), x, y, naFuncao ? '#b8441f' : 'rgba(25,23,20,0.5)', 'rgba(255,255,255,0.6)');
        }
      }
      g.font = `400 ${w * 0.024}px ${SANS}`;
      gravado(g, 'em laranja: os 14 bytes da função · exemplo simplificado', m, h * 0.86, TINTA2, 'rgba(255,255,255,0.6)');
    } else if (nivel === 2) {
      const m = faceMetal(g, w, h, 'Assembly', 2);
      g.font = `400 ${w * 0.036}px ${MONO}`;
      ASSEMBLY.forEach(([op, args], i) => {
        const y = h * (0.33 + i * 0.095);
        const rotulo = !op.startsWith(' ');
        gravado(g, op.trim(), m + (rotulo ? 0 : w * 0.05), y, rotulo ? '#b8441f' : TINTA, 'rgba(255,255,255,0.6)');
        if (args) gravado(g, args, m + w * 0.24, y, TINTA, 'rgba(255,255,255,0.6)');
      });
    } else if (nivel === 3) {
      const m = faceMetal(g, w, h, 'Pseudocódigo', 3);
      g.font = `400 ${w * 0.03}px ${MONO}`;
      PSEUDO.split('\n').forEach((l, i) => {
        const y = h * (0.32 + i * 0.08);
        gravado(g, l, m, y, TINTA, 'rgba(255,255,255,0.6)');
      });
      g.font = `400 ${w * 0.024}px ${SANS}`;
      gravado(g, 'sem nomes, sem comentários: só a estrutura', m, h * 0.92, TINTA2, 'rgba(255,255,255,0.6)');
    } else {
      const m = faceMetal(g, w, h, 'Lógica entendida', 4);
      // fluxograma limpo
      g.strokeStyle = TINTA;
      g.fillStyle = TINTA;
      g.lineWidth = 3;
      const cx = w * 0.5;
      const caixa = (x, y, bw, bh, txt) => {
        retArred(g, x - bw / 2, y - bh / 2, bw, bh, 12);
        g.stroke();
        g.font = `500 ${w * 0.03}px ${SANS}`;
        g.textAlign = 'center';
        gravado(g, txt, x, y + w * 0.01, TINTA, 'rgba(255,255,255,0.6)');
        g.textAlign = 'left';
      };
      const seta = (x1, y1, x2, y2) => {
        g.beginPath();
        g.moveTo(x1, y1);
        g.lineTo(x2, y2);
        g.stroke();
        const a = Math.atan2(y2 - y1, x2 - x1);
        g.beginPath();
        g.moveTo(x2, y2);
        g.lineTo(x2 - 16 * Math.cos(a - 0.45), y2 - 16 * Math.sin(a - 0.45));
        g.moveTo(x2, y2);
        g.lineTo(x2 - 16 * Math.cos(a + 0.45), y2 - 16 * Math.sin(a + 0.45));
        g.stroke();
      };
      caixa(cx, h * 0.33, w * 0.44, h * 0.09, 'recebe preço e cupom');
      seta(cx, h * 0.375, cx, h * 0.45);
      // losango
      const ly = h * 0.53;
      g.beginPath();
      g.moveTo(cx, ly - h * 0.08);
      g.lineTo(cx + w * 0.17, ly);
      g.lineTo(cx, ly + h * 0.08);
      g.lineTo(cx - w * 0.17, ly);
      g.closePath();
      g.strokeStyle = '#b8441f';
      g.stroke();
      g.strokeStyle = TINTA;
      g.font = `500 ${w * 0.03}px ${SANS}`;
      g.textAlign = 'center';
      gravado(g, 'cupom = 10?', cx, ly + w * 0.01, '#b8441f', 'rgba(255,255,255,0.6)');
      g.textAlign = 'left';
      seta(cx + w * 0.17, ly, w * 0.8, ly);
      g.font = `500 ${w * 0.024}px ${SANS}`;
      gravado(g, 'sim', cx + w * 0.19, ly - h * 0.02, TINTA2, 'rgba(255,255,255,0.6)');
      gravado(g, 'não', cx + w * 0.015, ly + h * 0.12, TINTA2, 'rgba(255,255,255,0.6)');
      caixa(w * 0.8, h * 0.66, w * 0.25, h * 0.09, 'preço × 0,9');
      seta(w * 0.8, ly, w * 0.8, h * 0.615);
      seta(cx, ly + h * 0.08, cx, h * 0.76);
      seta(w * 0.8, h * 0.705, w * 0.8, h * 0.8);
      seta(w * 0.8, h * 0.8, cx + w * 0.16, h * 0.8);
      caixa(cx, h * 0.8, w * 0.3, h * 0.08, 'devolve o preço');
      g.font = `400 ${w * 0.024}px ${SANS}`;
      gravado(g, '“dá 10% de desconto quando o cupom é 10”', w * 0.06, h * 0.93, TINTA2, 'rgba(255,255,255,0.6)');
    }
  };
}

// rótulo gravado na frente do bloco
export function desenharRotuloBloco(g, w, h) {
  g.clearRect(0, 0, w, h);
  g.font = `400 ${h * 0.5}px ${SERIF}`;
  g.fillStyle = 'rgba(0,0,0,0.55)';
  g.fillText('app', w * 0.05 + 2, h * 0.62 + 2);
  g.fillStyle = 'rgba(210,205,196,0.9)';
  g.fillText('app', w * 0.05, h * 0.62);
  g.font = `500 ${h * 0.14}px ${SANS}`;
  g.fillStyle = 'rgba(210,205,196,0.65)';
  g.fillText('executável · x86-64', w * 0.06, h * 0.88);
}

// frente do servidor: grade de ventilação e luzes de status
export function desenharServidor(acento) {
  return (g, w, h) => {
    fundoCeramica(g, w, h, '#e6e1d8');
    const m = w * 0.12;
    for (let i = 0; i < 26; i++) {
      const y = h * 0.1 + i * h * 0.022;
      g.fillStyle = 'rgba(25,23,20,0.5)';
      g.fillRect(m, y, w - 2 * m, h * 0.007);
      g.fillStyle = 'rgba(255,255,255,0.6)';
      g.fillRect(m, y + h * 0.007, w - 2 * m, 2);
    }
    for (let k = 0; k < 3; k++) {
      g.fillStyle = k === 0 ? acento : 'rgba(25,23,20,0.55)';
      g.beginPath();
      g.arc(m + k * w * 0.1, h * 0.8, w * 0.025, 0, Math.PI * 2);
      g.fill();
    }
    g.font = `500 ${w * 0.075}px ${SANS}`;
    gravado(g, 'servidor', m, h * 0.9, TINTA2);
  };
}

// ---------- cartões do caso da API ----------
function cartao(g, w, h, titulo, etiqueta, linhas, acento) {
  g.fillStyle = '#f7f4ee';
  g.fillRect(0, 0, w, h);
  g.strokeStyle = 'rgba(25,23,20,0.25)';
  g.lineWidth = 3;
  g.strokeRect(6, 6, w - 12, h - 12);
  const m = w * 0.07;
  g.fillStyle = acento;
  g.fillRect(m, h * 0.08, w * 0.08, h * 0.012);
  g.font = `600 ${w * 0.034}px ${SANS}`;
  g.fillStyle = TINTA2;
  g.fillText(etiqueta, m + w * 0.11, h * 0.1);
  g.font = `400 ${w * 0.075}px ${SERIF}`;
  g.fillStyle = TINTA;
  g.fillText(titulo, m, h * 0.25);
  g.font = `400 ${w * 0.04}px ${MONO}`;
  linhas.forEach((l, i) => {
    g.fillStyle = l.startsWith('  ') || l === '{' || l === '}' ? TINTA : '#b8441f';
    g.fillText(l, m, h * (0.4 + i * 0.085));
  });
}

export const desenharRequisicao = (acento) => (g, w, h) =>
  cartao(g, w, h, 'POST /api/pedidos', 'requisição · app → servidor', ['Content-Type: application/json', '{', '  "item": "X-salada",', '  "quantidade": 2,', '  "retirada": "intervalo"', '}'], acento);

export const desenharResposta = (acento) => (g, w, h) =>
  cartao(g, w, h, '201 Created', 'resposta · servidor → app', ['Content-Type: application/json', '{', '  "pedido": 4812,', '  "status": "em preparo",', '  "previsao_min": 7', '}'], acento);

export const desenharDoc = (acento) => (g, w, h) => {
  g.fillStyle = '#f7f4ee';
  g.fillRect(0, 0, w, h);
  const m = w * 0.08;
  g.fillStyle = acento;
  g.fillRect(m, h * 0.06, w * 0.1, h * 0.008);
  g.fillStyle = TINTA2;
  g.font = `600 ${w * 0.032}px ${SANS}`;
  g.fillText('documentação reconstruída · exemplo fictício', m, h * 0.1);
  g.fillStyle = TINTA;
  g.font = `400 ${w * 0.085}px ${SERIF}`;
  g.fillText('API da', m, h * 0.18);
  g.fillText('Lanchonete Pátio', m, h * 0.24);
  const eps = [
    ['GET', '/api/cardapio', 'lista os itens e preços'],
    ['POST', '/api/pedidos', 'cria um pedido (item, quantidade)'],
    ['GET', '/api/pedidos/{id}', 'consulta o status do pedido'],
  ];
  eps.forEach(([met, rota, desc], i) => {
    const y = h * (0.35 + i * 0.16);
    g.strokeStyle = 'rgba(25,23,20,0.2)';
    g.lineWidth = 2;
    g.beginPath();
    g.moveTo(m, y - h * 0.04);
    g.lineTo(w - m, y - h * 0.04);
    g.stroke();
    g.font = `600 ${w * 0.04}px ${MONO}`;
    g.fillStyle = '#b8441f';
    g.fillText(met, m, y);
    g.fillStyle = TINTA;
    g.fillText(rota, m + w * 0.17, y);
    g.font = `400 ${w * 0.04}px ${SANS}`;
    g.fillStyle = TINTA2;
    g.fillText(desc, m, y + h * 0.05);
  });
  g.font = `400 ${w * 0.034}px ${SANS}`;
  g.fillStyle = TINTA2;
  g.fillText('Fonte: tráfego observado, com autorização.', m, h * 0.88);
};
