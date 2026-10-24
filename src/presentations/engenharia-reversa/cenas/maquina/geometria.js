import * as THREE from 'three';
import { toCreasedNormals, mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

// Geometrias procedurais do redutor. Unidade: 1 = ~22 mm (módulo 0,09 ≙ 2 mm).
// Convenção: os eixos (shafts) ficam alinhados com Z.

const VINCO = THREE.MathUtils.degToRad(24);

// normais "vincadas": suaviza curvas, mantém quinas vivas
export function vincar(geo, ang = VINCO) {
  const g = toCreasedNormals(geo, ang);
  geo.dispose();
  return g;
}

// Peça torneada (LatheGeometry) com eixo em Z. perfil = [[raio, z], ...]
export function torneado(perfil, segmentos = 72) {
  const pts = perfil.map(([r, z]) => new THREE.Vector2(Math.max(0.0001, r), z));
  const g = new THREE.LatheGeometry(pts, segmentos);
  g.rotateX(Math.PI / 2);
  return vincar(g);
}

// Extrusão ao longo de Z, começando em z0, com chanfro
export function extrudar(shape, z0, profundidade, { chanfro = 0.02, curva = 64 } = {}) {
  const g = new THREE.ExtrudeGeometry(shape, {
    depth: profundidade - chanfro * 2,
    bevelEnabled: chanfro > 0,
    bevelThickness: chanfro,
    bevelSize: chanfro,
    bevelOffset: -chanfro,
    bevelSegments: 3,
    curveSegments: curva,
  });
  g.translate(0, 0, z0 + chanfro);
  return vincar(g);
}

export function circulo(x, y, r, horario = false) {
  const p = new THREE.Path();
  p.absarc(x, y, r, 0, Math.PI * 2, horario);
  return p;
}

// Contorno da carcaça: envoltória convexa de dois círculos (formato "gota dupla" típico de redutor).
export function envoltoria(c1, r1, c2, r2) {
  const d = c2.x - c1.x;
  const nx = -(r2 - r1) / d;
  const ny = Math.sqrt(1 - nx * nx);
  const aSup = Math.atan2(ny, nx);
  const aInf = Math.atan2(-ny, nx);
  const s = new THREE.Shape();
  s.moveTo(c1.x + r1 * nx, c1.y - r1 * ny);
  s.lineTo(c2.x + r2 * nx, c2.y - r2 * ny);
  s.absarc(c2.x, c2.y, r2, aInf, aSup, false);
  s.lineTo(c1.x + r1 * nx, c1.y + r1 * ny);
  s.absarc(c1.x, c1.y, r1, aSup, aInf + Math.PI * 2, false);
  return { shape: s, tangente: { nx, ny } };
}

export function envoltoriaPath(c1, r1, c2, r2) {
  const { shape } = envoltoria(c1, r1, c2, r2);
  const p = new THREE.Path();
  p.curves = shape.curves;
  p.currentPoint = shape.currentPoint;
  return p;
}

// Engrenagem de dentes retos com flanco evolvente (ângulo de pressão 20°)
export function perfilEngrenagem(z, m, { furo = 0.1, alivios = null } = {}) {
  const pa = THREE.MathUtils.degToRad(20);
  const rp = (m * z) / 2;
  const ra = rp + m;
  const rf = rp - 1.25 * m;
  const rb = rp * Math.cos(pa);
  const inv = (a) => Math.tan(a) - a;
  const meio = Math.PI / (2 * z) + inv(pa); // meia-espessura angular na base
  const tMax = Math.sqrt((ra / rb) ** 2 - 1);
  const N = 7;
  const flanco = [];
  for (let i = 0; i <= N; i++) {
    const t = (tMax * i) / N;
    const r = rb * Math.sqrt(1 + t * t);
    const th = t - Math.atan(t);
    flanco.push([r, th]);
  }
  const s = new THREE.Shape();
  const pt = (r, a) => [r * Math.cos(a), r * Math.sin(a)];
  for (let k = 0; k < z; k++) {
    const c = (k / z) * Math.PI * 2;
    const ini = pt(Math.min(rf, rb), c - meio);
    if (k === 0) s.moveTo(...ini);
    else s.lineTo(...ini);
    for (const [r, th] of flanco) s.lineTo(...pt(r, c - meio + th));
    // topo levemente arredondado
    s.lineTo(...pt(ra, c));
    for (let i = flanco.length - 1; i >= 0; i--) s.lineTo(...pt(flanco[i][0], c + meio - flanco[i][1]));
    s.lineTo(...pt(Math.min(rf, rb), c + meio));
    // fundo do dente (arco de raiz)
    const prox = ((k + 1) / z) * Math.PI * 2 - meio;
    for (let i = 1; i < 4; i++) {
      const a = c + meio + ((prox - (c + meio)) * i) / 4;
      s.lineTo(...pt(rf, a));
    }
  }
  s.closePath();
  s.holes.push(circulo(0, 0, furo, true));
  if (alivios) {
    const { n, raio, r } = alivios;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + Math.PI / n;
      s.holes.push(circulo(Math.cos(a) * raio, Math.sin(a) * raio, r, true));
    }
  }
  return { shape: s, rp, ra, rf };
}

export function engrenagem(z, m, largura, opcoes = {}) {
  const { shape, rp, ra, rf } = perfilEngrenagem(z, m, opcoes);
  const corpo = new THREE.ExtrudeGeometry(shape, {
    depth: largura - 0.04,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.012,
    bevelOffset: -0.012,
    bevelSegments: 2,
    curveSegments: 24,
  });
  corpo.translate(0, 0, -largura / 2 + 0.02);
  const partes = [vincar(corpo)];
  if (opcoes.cubo) {
    const { r, alto } = opcoes.cubo;
    const f = opcoes.furo ?? 0.1;
    const h = largura / 2 + alto;
    partes.push(
      torneado([
        [f, -h],
        [r - 0.02, -h],
        [r, -h + 0.02],
        [r, h - 0.02],
        [r - 0.02, h],
        [f, h],
        [f, -h],
      ]),
    );
  }
  const g = partes.length > 1 ? mergeGeometries(partes) : partes[0];
  return { geo: g, rp, ra, rf };
}

// Rolamento de esferas: anel externo + anel interno (torneados) + esferas (instanciadas)
export function rolamento(ri, re, largura) {
  const h = largura / 2;
  const c = 0.012;
  const meio = (ri + re) / 2;
  const folga = (re - ri) * 0.22;
  const externo = torneado([
    [meio + folga, -h],
    [re - c, -h],
    [re, -h + c],
    [re, h - c],
    [re - c, h],
    [meio + folga, h],
    [meio + folga * 0.6, h * 0.35],
    [meio + folga * 0.6, -h * 0.35],
    [meio + folga, -h],
  ]);
  const interno = torneado([
    [ri, -h],
    [meio - folga, -h],
    [meio - folga * 0.6, -h * 0.35],
    [meio - folga * 0.6, h * 0.35],
    [meio - folga, h],
    [ri, h],
    [ri, -h],
  ]);
  const rEsfera = (re - ri) * 0.24;
  const nEsferas = Math.max(7, Math.round((2 * Math.PI * meio) / (rEsfera * 2.6)));
  return { externo, interno, rEsfera, nEsferas, raioEsferas: meio };
}

// Parafuso Allen (cabeça cilíndrica com sextavado interno) — eixo em Z, cabeça em z=0..alto
export function parafuso(rCabeca = 0.055, alto = 0.07, rCorpo = 0.032, comprimento = 0.42) {
  const c = 0.012;
  const cabeca = torneado([
    [0.0001, alto],
    [rCabeca - c, alto],
    [rCabeca, alto - c],
    [rCabeca, 0],
    [rCorpo, 0],
    [rCorpo, -comprimento + 0.01],
    [rCorpo - 0.01, -comprimento],
    [0.0001, -comprimento],
  ], 40);
  // sextavado: um prisma escuro levemente afundado na cabeça
  const hex = new THREE.Shape();
  const rh = rCabeca * 0.48;
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    if (i === 0) hex.moveTo(Math.cos(a) * rh, Math.sin(a) * rh);
    else hex.lineTo(Math.cos(a) * rh, Math.sin(a) * rh);
  }
  hex.closePath();
  const sext = new THREE.ExtrudeGeometry(hex, { depth: 0.004, bevelEnabled: false });
  sext.translate(0, 0, alto - 0.002);
  return { cabeca, sext };
}

// Textura da placa do encoder: máscara de solda escura, trilhas, serigrafia discreta
export function texturaPlaca(acento = '#e4572e') {
  const S = 1024;
  const c = document.createElement('canvas');
  c.width = c.height = S;
  const g = c.getContext('2d');
  g.fillStyle = '#1f201d';
  g.fillRect(0, 0, S, S);
  // espelhada: a face visível da placa é a de trás (vista por trás do redutor)
  g.translate(S, 0);
  g.scale(-1, 1);
  // trilhas
  g.strokeStyle = '#2b2d29';
  g.lineWidth = 7;
  g.lineCap = 'round';
  g.lineJoin = 'round';
  const trilhas = [
    [[512, 512], [512, 380], [640, 300], [760, 300]],
    [[512, 512], [380, 512], [300, 430], [300, 330]],
    [[560, 560], [700, 560], [760, 620], [760, 700]],
    [[470, 560], [470, 700], [400, 770]],
    [[560, 470], [650, 380], [800, 380]],
    [[440, 470], [360, 390], [360, 300]],
    [[600, 512], [820, 512]],
    [[512, 600], [512, 820]],
  ];
  for (const t of trilhas) {
    g.beginPath();
    t.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y)));
    g.stroke();
  }
  // vias
  g.fillStyle = '#b89650';
  for (const [x, y] of [[760, 300], [300, 330], [760, 700], [400, 770], [800, 380], [360, 300], [820, 512], [512, 820]]) {
    g.beginPath();
    g.arc(x, y, 11, 0, Math.PI * 2);
    g.fill();
  }
  // serigrafia
  g.strokeStyle = '#d9d3c7';
  g.fillStyle = '#d9d3c7';
  g.lineWidth = 3;
  g.strokeRect(430, 430, 164, 164);
  g.font = '600 34px sans-serif';
  g.fillText('U1', 440, 410);
  g.fillText('J1', 690, 860);
  g.fillText('C3', 260, 610);
  g.font = '500 30px sans-serif';
  g.fillText('ENC-R2', 430, 225);
  // marca de orientação em cor de destaque
  g.fillStyle = acento;
  g.beginPath();
  g.arc(452, 452, 7, 0, Math.PI * 2);
  g.fill();
  // anel externo dourado (plano de terra)
  g.strokeStyle = '#b89650';
  g.lineWidth = 18;
  g.beginPath();
  g.arc(S / 2, S / 2, S / 2 - 24, 0, Math.PI * 2);
  g.stroke();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}
