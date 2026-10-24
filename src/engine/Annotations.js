import * as THREE from 'three';

// Anotações de desenho técnico projetadas do 3D para a tela (SVG):
//   balao  – número da peça num círculo + linha de chamada
//   cota   – linha de cota com setas, linhas de extensão e valor
//   rotulo – ponto + linha de chamada com ombro + texto
// Cada anotação recebe uma função visivel() → 0..1 que controla o "desenho" (draw-on).
// Use valores vindos dos parâmetros da cena: assim tudo segue a rolagem e nunca fica fora de sincronia.

const NS = 'http://www.w3.org/2000/svg';
const el = (tag, attrs = {}, pai) => {
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  pai?.appendChild(e);
  return e;
};
const clamp01 = (x) => Math.max(0, Math.min(1, x));
const faixa = (v, a, b) => clamp01((v - a) / (b - a));
const _v = new THREE.Vector3();

export class Annotations {
  constructor(container) {
    this.svg = el('svg', { class: 'anotacoes', 'aria-hidden': 'true' });
    container.appendChild(this.svg);
    this.itens = [];
    this.u = 10;
  }

  #projetar(vec, camera, w, h, out) {
    _v.copy(vec).project(camera);
    out.x = (_v.x * 0.5 + 0.5) * w;
    out.y = (-_v.y * 0.5 + 0.5) * h;
    out.atras = _v.z > 1;
    return out;
  }

  balao({ numero, ancora, direcao = [0, -1], comprimento = 9, visivel, destaque = () => 0, opacidade = () => 1 }) {
    const g = el('g', {}, this.svg);
    const linha = el('line', { 'stroke-width': 1.2, stroke: 'currentColor' }, g);
    const ponto = el('circle', { r: 2.6, fill: 'currentColor' }, g);
    const circ = el('circle', { fill: 'none', stroke: 'currentColor', 'stroke-width': 1.4 }, g);
    const txt = el('text', { 'text-anchor': 'middle', 'dominant-baseline': 'central', 'font-weight': 600 }, g);
    txt.textContent = String(numero);
    const item = { tipo: 'balao', g, linha, ponto, circ, txt, ancora, direcao, comprimento, visivel, destaque, opacidade, a: {} };
    this.itens.push(item);
    return item;
  }

  cota({ de, ate, texto, deslocamento = 5, visivel }) {
    const g = el('g', {}, this.svg);
    const ext1 = el('line', { stroke: 'currentColor', 'stroke-width': 0.9 }, g);
    const ext2 = el('line', { stroke: 'currentColor', 'stroke-width': 0.9 }, g);
    const linha = el('line', { stroke: 'currentColor', 'stroke-width': 1.2 }, g);
    const s1 = el('path', { fill: 'currentColor' }, g);
    const s2 = el('path', { fill: 'currentColor' }, g);
    const txt = el('text', { 'text-anchor': 'middle', 'dominant-baseline': 'central', 'font-weight': 500, 'paint-order': 'stroke', 'stroke-linejoin': 'round' }, g);
    const item = { tipo: 'cota', g, ext1, ext2, linha, s1, s2, txt, de, ate, texto, deslocamento, visivel, a: {}, b: {} };
    this.itens.push(item);
    return item;
  }

  rotulo({ ancora, texto, direcao = [1, -1], comprimento = 8, visivel }) {
    const g = el('g', {}, this.svg);
    const linha = el('polyline', { fill: 'none', stroke: 'currentColor', 'stroke-width': 1.2 }, g);
    const ponto = el('circle', { r: 3, fill: 'currentColor' }, g);
    const txt = el('text', { 'dominant-baseline': 'central', 'font-weight': 500 }, g);
    const item = { tipo: 'rotulo', g, linha, ponto, txt, ancora, texto, direcao, comprimento, visivel, a: {} };
    this.itens.push(item);
    return item;
  }

  update(camera, w, h) {
    const u = Math.min(h / 100, (w * 0.5625) / 100);
    this.u = u;
    const fonte = u * 1.9;
    for (const it of this.itens) {
      const vis = clamp01(it.visivel());
      if (vis <= 0.001) {
        if (it.g.style.display !== 'none') it.g.style.display = 'none';
        continue;
      }
      it.g.style.display = '';
      if (it.tipo === 'balao') this.#balao(it, vis, camera, w, h, u, fonte);
      else if (it.tipo === 'cota') this.#cota(it, vis, camera, w, h, u, fonte);
      else this.#rotulo(it, vis, camera, w, h, u, fonte);
    }
  }

  #balao(it, vis, camera, w, h, u, fonte) {
    const a = this.#projetar(it.ancora(), camera, w, h, it.a);
    const [dx, dy] = it.direcao;
    const n = Math.hypot(dx, dy) || 1;
    const r = u * 2.3;
    const L = it.comprimento * u;
    const bx = a.x + (dx / n) * L;
    const by = a.y + (dy / n) * L;
    const pL = faixa(vis, 0, 0.6);
    const pC = faixa(vis, 0.4, 1);
    // a linha vai do ponto até a borda do círculo
    const ex = bx - (dx / n) * r;
    const ey = by - (dy / n) * r;
    it.linha.setAttribute('x1', a.x);
    it.linha.setAttribute('y1', a.y);
    it.linha.setAttribute('x2', a.x + (ex - a.x) * pL);
    it.linha.setAttribute('y2', a.y + (ey - a.y) * pL);
    it.ponto.setAttribute('cx', a.x);
    it.ponto.setAttribute('cy', a.y);
    it.ponto.setAttribute('opacity', pL > 0 ? 1 : 0);
    const circ = 2 * Math.PI * r;
    it.circ.setAttribute('cx', bx);
    it.circ.setAttribute('cy', by);
    it.circ.setAttribute('r', r);
    it.circ.setAttribute('stroke-dasharray', `${circ * pC} ${circ}`);
    it.circ.setAttribute('transform', `rotate(-90 ${bx} ${by})`);
    it.g.style.opacity = it.opacidade();
    const dest = clamp01(it.destaque());
    it.circ.setAttribute('fill', dest > 0.5 ? 'var(--acento)' : 'none');
    it.circ.setAttribute('stroke', dest > 0.5 ? 'var(--acento)' : 'currentColor');
    it.txt.setAttribute('x', bx);
    it.txt.setAttribute('y', by);
    it.txt.setAttribute('font-size', fonte);
    it.txt.setAttribute('opacity', faixa(vis, 0.75, 1));
    it.txt.style.fill = dest > 0.5 ? '#fff' : '';
  }

  #cota(it, vis, camera, w, h, u, fonte) {
    const a = this.#projetar(it.de(), camera, w, h, it.a);
    const b = this.#projetar(it.ate(), camera, w, h, it.b);
    let dx = b.x - a.x;
    let dy = b.y - a.y;
    const len = Math.hypot(dx, dy) || 1;
    dx /= len;
    dy /= len;
    // normal (perpendicular) para afastar a linha de cota do objeto
    const nx = -dy;
    const ny = dx;
    const off = it.deslocamento * u;
    const a2 = { x: a.x + nx * off, y: a.y + ny * off };
    const b2 = { x: b.x + nx * off, y: b.y + ny * off };
    const extra = u * 1.2;
    const pE = faixa(vis, 0, 0.4);
    const pL = faixa(vis, 0.25, 0.85);
    const pT = faixa(vis, 0.7, 1);
    const ext = (linha, p) => {
      linha.setAttribute('x1', p.x + nx * u * 0.8);
      linha.setAttribute('y1', p.y + ny * u * 0.8);
      linha.setAttribute('x2', p.x + nx * u * 0.8 + nx * (off - u * 0.8 + extra) * pE);
      linha.setAttribute('y2', p.y + ny * u * 0.8 + ny * (off - u * 0.8 + extra) * pE);
    };
    ext(it.ext1, a);
    ext(it.ext2, b);
    // a linha de cota cresce do centro para as pontas
    const mx = (a2.x + b2.x) / 2;
    const my = (a2.y + b2.y) / 2;
    const hl = (len / 2) * pL;
    it.linha.setAttribute('x1', mx - dx * hl);
    it.linha.setAttribute('y1', my - dy * hl);
    it.linha.setAttribute('x2', mx + dx * hl);
    it.linha.setAttribute('y2', my + dy * hl);
    const seta = (path, p, dir) => {
      const s = u * 1.3 * pL;
      const k = u * 0.42 * pL;
      const px = p.x;
      const py = p.y;
      const bx = px - dx * dir * s;
      const by = py - dy * dir * s;
      path.setAttribute('d', `M${px},${py} L${bx + nx * k},${by + ny * k} L${bx - nx * k},${by - ny * k} Z`);
    };
    seta(it.s1, { x: mx - dx * hl, y: my - dy * hl }, -1);
    seta(it.s2, { x: mx + dx * hl, y: my + dy * hl }, 1);
    let ang = (Math.atan2(dy, dx) * 180) / Math.PI;
    if (ang > 90) ang -= 180;
    if (ang < -90) ang += 180;
    // texto do lado de fora da linha de cota
    const lado = Math.sign(it.deslocamento) || 1;
    const tx = mx + nx * u * 1.7 * lado;
    const ty = my + ny * u * 1.7 * lado;
    it.txt.textContent = typeof it.texto === 'function' ? it.texto() : it.texto;
    it.txt.setAttribute('x', tx);
    it.txt.setAttribute('y', ty);
    it.txt.setAttribute('font-size', fonte);
    it.txt.setAttribute('transform', `rotate(${ang} ${tx} ${ty})`);
    it.txt.setAttribute('opacity', pT);
    it.txt.setAttribute('stroke', 'var(--fundo)');
    it.txt.setAttribute('stroke-width', u * 0.8);
  }

  #rotulo(it, vis, camera, w, h, u, fonte) {
    const a = this.#projetar(it.ancora(), camera, w, h, it.a);
    const [dx, dy] = it.direcao;
    const n = Math.hypot(dx, dy) || 1;
    const L = it.comprimento * u;
    const p1 = { x: a.x + (dx / n) * L, y: a.y + (dy / n) * L };
    const ombro = u * 4 * Math.sign(dx || 1);
    const p2 = { x: p1.x + ombro, y: p1.y };
    const pL = faixa(vis, 0, 0.7);
    // polilinha que se desenha: ponto → cotovelo → ombro
    const seg1 = L;
    const seg2 = Math.abs(ombro);
    const total = seg1 + seg2;
    const andado = total * pL;
    let pts;
    if (andado <= seg1) {
      const k = andado / seg1;
      pts = `${a.x},${a.y} ${a.x + (p1.x - a.x) * k},${a.y + (p1.y - a.y) * k}`;
    } else {
      const k = (andado - seg1) / seg2;
      pts = `${a.x},${a.y} ${p1.x},${p1.y} ${p1.x + ombro * k},${p1.y}`;
    }
    it.linha.setAttribute('points', pts);
    it.ponto.setAttribute('cx', a.x);
    it.ponto.setAttribute('cy', a.y);
    it.txt.textContent = typeof it.texto === 'function' ? it.texto() : it.texto;
    it.txt.setAttribute('x', p2.x + u * 1 * Math.sign(dx || 1));
    it.txt.setAttribute('y', p2.y);
    it.txt.setAttribute('text-anchor', dx < 0 ? 'end' : 'start');
    it.txt.setAttribute('font-size', fonte * 1.12);
    it.txt.setAttribute('opacity', faixa(vis, 0.65, 1));
  }
}
