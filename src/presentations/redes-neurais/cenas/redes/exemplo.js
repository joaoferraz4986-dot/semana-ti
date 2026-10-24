import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { aleatorio } from '../../demo/mlp.js';
import { Rede3D } from './rede3d.js';

// Rede de exemplo (capítulos 4, 5, 7 e 9): entrada → 2 camadas ocultas → saída ("gato" / "cachorro").
// Também mostra: medidor de erro, a foto em pixels que vira números e os "padrões" das camadas.

const clamp01 = (x) => Math.max(0, Math.min(1, x));
const suave = (x) => {
  const t = clamp01(x);
  return t * t * (3 - 2 * t);
};

// Gato em pixel art 12×12 (desenhado aqui mesmo — nenhuma imagem de terceiros)
const GATO = [
  '............',
  '.#........#.',
  '.##......##.',
  '.###....###.',
  '.##########.',
  '############',
  '###..##..###',
  '############',
  '#####..#####',
  '.####..####.',
  '..########..',
  '....####....',
];
export const PIXELS = GATO.map((linha, j) => [...linha].map((c, i) => (c === '#' ? 0.88 + ((i * 7 + j * 3) % 10) / 100 : 0.04 + ((i + j * 5) % 6) / 100)));

// Aplicações (capítulo 9): o que entra e o que sai da rede
export const APLICACOES = [
  null,
  ['texto que você digitou', 'próxima palavra provável'],
  ['frase em inglês', 'frase em português'],
  ['foto do rosto', 'é o dono do celular?'],
  ['o que você já assistiu', 'o que sugerir depois'],
  ['câmera do carro', 'faixa, pedestre, placa'],
  ['exame de imagem', 'região para o médico revisar'],
];

function cartao(desenhar, tam = 512) {
  const c = document.createElement('canvas');
  c.width = c.height = tam;
  const g = c.getContext('2d');
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  const pintar = () => {
    g.fillStyle = '#f6f3ed';
    g.fillRect(0, 0, tam, tam);
    g.strokeStyle = 'rgba(25,23,20,0.25)';
    g.lineWidth = 4;
    g.strokeRect(4, 4, tam - 8, tam - 8);
    desenhar(g, tam);
    tex.needsUpdate = true;
  };
  pintar();
  document.fonts?.ready.then(pintar);
  return tex;
}
const SANS = '"Instrument Sans", sans-serif';
const SERIF = '"Instrument Serif", serif';
const MONO = '"Cascadia Mono", Consolas, monospace';
const titulo = (g, t, s, sub) => {
  g.fillStyle = '#191714';
  g.font = `400 ${s * 0.13}px ${SERIF}`;
  g.fillText(t, s * 0.08, s * 0.17);
  g.fillStyle = '#6e685f';
  g.font = `500 ${s * 0.055}px ${SANS}`;
  g.fillText(sub, s * 0.08, s * 0.26);
};

export function criarExemplo({ materiais, annotations, P }) {
  const group = new THREE.Group();
  const rede = new Rede3D({ materiais, camadas: [6, 5, 4, 2], espacoX: 1.7, espacoY: 0.55, raio: 0.16, maxPulsos: 22 });
  const ALT = 1.95;
  rede.group.position.set(0, ALT, 0);
  group.add(rede.group);
  // dois conjuntos de pesos: "antes de aprender" e "depois de aprender"
  rede.pesosAleatorios(aleatorio(4), 0.7);
  const antes = rede.conex.map((c) => c.alvo);
  rede.pesosAleatorios(aleatorio(9), 1.6);
  const depois = rede.conex.map((c) => c.alvo);

  // ---------- medidor de erro ----------
  const medidor = new THREE.Group();
  medidor.position.set(1.7 * 1.5 + 1.25, ALT - 0.9, 0);
  group.add(medidor);
  const mAlum = materiais.aluminio();
  const base = new THREE.Mesh(new RoundedBoxGeometry(0.5, 0.08, 0.5, 2, 0.02), mAlum);
  medidor.add(base);
  for (const x of [-0.17, 0.17]) {
    const trilho = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 1.85, 8), mAlum);
    trilho.position.set(x, 0.95, 0);
    medidor.add(trilho);
  }
  const preenche = new THREE.Mesh(new RoundedBoxGeometry(0.24, 1, 0.24, 2, 0.03), materiais.acento('#b8442b'));
  medidor.add(preenche);
  medidor.traverse((o) => {
    if (o.isMesh) o.castShadow = true;
  });

  // ---------- foto em pixels ----------
  const placaPx = new THREE.Group();
  placaPx.position.set(-1.7 * 1.5 - 2.3, ALT, 0);
  placaPx.rotation.y = 0.18;
  group.add(placaPx);
  const N = 12;
  const passo = 0.15;
  const tiles = new THREE.InstancedMesh(new RoundedBoxGeometry(0.135, 0.135, 1, 2, 0.015), materiais.ceramica(), N * N);
  tiles.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(N * N * 3), 3);
  tiles.castShadow = true;
  placaPx.add(tiles);
  const papel = new THREE.Color('#f3efe8');
  const tinta = new THREE.Color('#1d1b18');
  const cor = new THREE.Color();
  for (let j = 0; j < N; j++)
    for (let i = 0; i < N; i++) tiles.setColorAt(j * N + i, cor.copy(papel).lerp(tinta, PIXELS[j][i]));
  // cartão com um pedaço da imagem em números
  const texNumeros = cartao((g, s) => {
    titulo(g, 'Em números', s, 'canto superior esquerdo da foto');
    g.font = `500 ${s * 0.062}px ${MONO}`;
    for (let j = 0; j < 5; j++)
      for (let i = 0; i < 5; i++) {
        const v = PIXELS[j][i];
        g.fillStyle = v > 0.5 ? '#2f4fd8' : '#6e685f';
        g.fillText(v.toFixed(1).replace('.', ','), s * (0.08 + i * 0.17), s * (0.4 + j * 0.12));
      }
  });
  const cartaoNum = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.1), materiais.impresso(texNumeros));
  cartaoNum.position.set(0, -1.65, 0.35);
  cartaoNum.castShadow = true;
  placaPx.add(cartaoNum);
  // contas que levam os números até a entrada da rede
  const matConta = new THREE.MeshBasicMaterial({ color: '#c9d1f5' });
  const contas = Array.from({ length: 6 }, (_, k) => {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.05, 14, 10), matConta);
    group.add(m);
    return { m, fase: k / 6 };
  });

  // ---------- padrões que as camadas aprendem (tendência geral) ----------
  const texBordas = cartao((g, s) => {
    titulo(g, 'Bordas', s, 'primeiras camadas');
    g.strokeStyle = '#191714';
    g.lineWidth = s * 0.02;
    g.lineCap = 'round';
    for (let k = 0; k < 6; k++) {
      const x = s * (0.15 + (k % 3) * 0.27);
      const y = s * (0.45 + Math.floor(k / 3) * 0.26);
      const a = (k * 0.7) % Math.PI;
      g.beginPath();
      g.moveTo(x, y);
      g.lineTo(x + Math.cos(a) * s * 0.16, y + Math.sin(a) * s * 0.16);
      g.stroke();
    }
  });
  const texFormas = cartao((g, s) => {
    titulo(g, 'Formas', s, 'camadas do meio');
    g.strokeStyle = '#191714';
    g.lineWidth = s * 0.018;
    g.beginPath();
    g.moveTo(s * 0.15, s * 0.75);
    g.lineTo(s * 0.27, s * 0.45);
    g.lineTo(s * 0.39, s * 0.75);
    g.closePath();
    g.stroke();
    g.beginPath();
    g.arc(s * 0.66, s * 0.58, s * 0.13, 0, Math.PI * 2);
    g.stroke();
    g.beginPath();
    g.ellipse(s * 0.5, s * 0.86, s * 0.12, s * 0.05, 0, 0, Math.PI * 2);
    g.stroke();
  });
  const texObjetos = cartao((g, s) => {
    titulo(g, 'Objetos', s, 'camadas finais');
    const p = s * 0.045;
    const x0 = s * 0.23;
    const y0 = s * 0.33;
    for (let j = 0; j < 12; j++)
      for (let i = 0; i < 12; i++) {
        g.fillStyle = PIXELS[j][i] > 0.5 ? '#2f4fd8' : 'rgba(25,23,20,0.06)';
        g.fillRect(x0 + i * p, y0 + j * p, p - 2, p - 2);
      }
  });
  const padroes = [
    [texBordas, -0.85],
    [texFormas, 0.85],
    [texObjetos, 2.55],
  ].map(([tex, x]) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(1.05, 1.05), materiais.impresso(tex));
    m.position.set(x, ALT + 2.05, 0);
    m.castShadow = true;
    group.add(m);
    return m;
  });

  // ---------- rótulos ----------
  const noMundo = (getter) => {
    const out = new THREE.Vector3();
    return () => out.copy(getter()).applyMatrix4(rede.group.matrixWorld);
  };
  const vis = (f) => () => clamp01(f()) * P.presenca;
  const app = () => APLICACOES[Math.round(P.app)];
  annotations.rotulo({
    ancora: noMundo(() => rede.posicaoNo(0, 0)),
    texto: () => (app() ? `entrada: ${app()[0]}` : 'entrada: os pixels da foto'),
    direcao: [-0.4, -1],
    comprimento: 5,
    visivel: vis(() => P.rede * Math.min(1, P.camadasRede) * (P.imagem > 0.5 ? 0 : 1)),
  });
  annotations.rotulo({ ancora: noMundo(() => rede.posicaoNo(3, 0)), texto: 'gato', direcao: [1, -0.3], comprimento: 3, visivel: vis(() => P.rede * clamp01(P.camadasRede - 3) * (app() ? 0 : 1)) });
  annotations.rotulo({ ancora: noMundo(() => rede.posicaoNo(3, 1)), texto: 'cachorro', direcao: [1, 0.3], comprimento: 3, visivel: vis(() => P.rede * clamp01(P.camadasRede - 3) * (app() ? 0 : 1)) });
  annotations.rotulo({
    ancora: noMundo(() => rede.posicaoNo(3, 0)),
    texto: () => (app() ? `saída: ${app()[1]}` : ''),
    direcao: [1, -0.6],
    comprimento: 4,
    visivel: vis(() => (app() ? P.rede : 0)),
  });
  annotations.rotulo({ ancora: noMundo(() => rede.posicaoNo(1, 0)), texto: 'camadas ocultas', direcao: [0.6, -1], comprimento: 4, visivel: vis(() => P.rede * clamp01(P.camadasRede - 1.5) * (1 - P.padroes) * (app() ? 0 : 1)) });
  const ancoraMedidor = new THREE.Vector3();
  annotations.rotulo({
    ancora: () => ancoraMedidor.set(0, 0.15 + Math.max(0.05, P.erroRede) * 1.75, 0).applyMatrix4(medidor.matrixWorld),
    texto: () => `erro: ${P.erroRede.toFixed(2).replace('.', ',')}`,
    direcao: [1, -0.4],
    comprimento: 3,
    visivel: vis(() => P.mostrarErro),
  });
  annotations.rotulo({
    ancora: () => ancoraMedidor.set(0.0, 0.95, 0.1).applyMatrix4(placaPx.matrixWorld),
    texto: 'cada pixel vira um número de 0 a 1',
    direcao: [0.3, -1],
    comprimento: 5,
    visivel: vis(() => P.numeros * (1 - P.entrar)),
  });

  let tempo = 0;
  const mtx = new THREE.Matrix4();
  const pos = new THREE.Vector3();
  const esc = new THREE.Vector3();
  const quat = new THREE.Quaternion();
  function atualizar(dt) {
    tempo += dt;
    const pr = suave(P.rede);
    rede.group.visible = pr > 0.01;
    // pesos: antes → depois, conforme o "ajuste"
    const aj = suave(P.ajuste);
    rede.conex.forEach((c, k) => (c.alvo = antes[k] + (depois[k] - antes[k]) * aj));
    const acerto = clamp01(P.acerto);
    const ms = clamp01(P.mostrarSaida);
    rede.atualizar(dt, {
      presenca: pr,
      camadasVisiveis: P.camadasRede,
      ativ: (l, i) => {
        if (l === 3) return ms * (i === 0 ? acerto : 1 - acerto);
        return P.avanco * (0.2 + 0.5 * Math.max(0, Math.sin(tempo * 2.2 - l * 0.9 + i)));
      },
    });
    rede.pulsar(dt, { avanco: P.avanco, retro: P.retro, presenca: pr });
    // medidor
    medidor.visible = P.mostrarErro > 0.01;
    medidor.scale.setScalar(Math.max(0.001, suave(P.mostrarErro)));
    const h = Math.max(0.05, P.erroRede) * 1.75;
    preenche.scale.y = h;
    preenche.position.y = 0.08 + h / 2;
    // pixels
    const im = suave(P.imagem);
    placaPx.visible = im > 0.01;
    const nu = suave(P.numeros);
    for (let j = 0; j < N; j++)
      for (let i = 0; i < N; i++) {
        const v = PIXELS[j][i];
        const prof = 0.05 + nu * v * 0.6;
        pos.set((i - (N - 1) / 2) * passo, ((N - 1) / 2 - j) * passo, prof / 2);
        esc.set(im, im, prof * im);
        mtx.compose(pos, quat, esc);
        tiles.setMatrixAt(j * N + i, mtx);
      }
    tiles.instanceMatrix.needsUpdate = true;
    if (tiles.instanceColor) tiles.instanceColor.needsUpdate = true;
    cartaoNum.visible = nu > 0.01;
    cartaoNum.scale.setScalar(Math.max(0.001, nu));
    // contas: da foto até cada nó de entrada
    const ent = clamp01(P.entrar);
    contas.forEach((c, k) => {
      const t = (tempo * 0.5 + c.fase) % 1;
      const de = new THREE.Vector3((k % 3 - 1) * 0.5, (1 - Math.floor(k / 3) * 2) * 0.4, 0.4).applyMatrix4(placaPx.matrixWorld);
      const para = rede.posicaoNo(0, k).clone().applyMatrix4(rede.group.matrixWorld);
      c.m.position.lerpVectors(de, para, t);
      c.m.visible = ent > 0.5;
    });
    // padrões
    const pd = suave(P.padroes);
    padroes.forEach((m, k) => {
      const s = suave(clamp01(pd * 3 - k));
      m.visible = s > 0.01;
      m.scale.setScalar(Math.max(0.001, s));
    });
  }

  return { group, atualizar, rede };
}
