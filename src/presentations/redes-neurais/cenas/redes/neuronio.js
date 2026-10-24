import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { aleatorio } from '../../demo/mlp.js';
import { materialBarro, corpoCelular, curvaFibra, ramificar, tubo } from './organico.js';

// O neurônio biológico (modelo de museu em barro) e o neurônio artificial que nasce dele.
// O exemplo numérico do neurônio artificial é REAL (as contas batem):
//   x = (0,8; 0,2; 0,5)   w = (0,9; −0,4; 0,6)   b = 0,1
//   Σ = 0,8·0,9 + 0,2·(−0,4) + 0,5·0,6 + 0,1 = 1,04      sigmoide(1,04) ≈ 0,74
export const EXEMPLO = { x: [0.8, 0.2, 0.5], w: [0.9, -0.4, 0.6], b: 0.1 };
const soma = EXEMPLO.x.reduce((s, x, i) => s + x * EXEMPLO.w[i], EXEMPLO.b);
const saida = 1 / (1 + Math.exp(-soma));
const fmt = (n, c = 1) => n.toFixed(c).replace('.', ',').replace('-', '−');

const clamp01 = (x) => Math.max(0, Math.min(1, x));
const suave = (x) => {
  const t = clamp01(x);
  return t * t * (3 - 2 * t);
};

export function criarNeuronio({ materiais, annotations, P }) {
  const group = new THREE.Group();
  const rnd = aleatorio(21);
  const barro = materialBarro();
  const mielina = materialBarro('#d99a74');
  const S = new THREE.Vector3(0, 1.65, 0); // centro do corpo celular

  // pedestal de museu + hastes
  const pedestal = new THREE.Mesh(new RoundedBoxGeometry(8.2, 0.22, 2.0, 3, 0.05), materiais.ceramicaCinza());
  pedestal.position.set(0.9, 0.11, 0);
  pedestal.castShadow = pedestal.receiveShadow = true;
  group.add(pedestal);
  const mAlum = materiais.aluminio();
  for (const x of [0, 3.1]) {
    const h = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 1.35, 12), mAlum);
    h.position.set(x, 0.22 + 0.67, 0);
    h.castShadow = true;
    group.add(h);
  }

  // ===================== BIOLÓGICO =====================
  const bio = new THREE.Group();
  bio.position.copy(S);
  group.add(bio);
  const corpo = new THREE.Mesh(corpoCelular(0.5, 4), barro);
  corpo.castShadow = true;
  bio.add(corpo);
  // dendritos (recebem sinais) — saem para a esquerda
  const galhos = [];
  const primarios = [];
  for (let k = 0; k < 5; k++) {
    const ang = Math.PI + (k - 2) * 0.42 + (rnd() - 0.5) * 0.2;
    const dir = new THREE.Vector3(Math.cos(ang), Math.sin(ang), (rnd() - 0.5) * 0.7).normalize();
    const origem = dir.clone().multiplyScalar(0.42);
    const lista = ramificar(origem, dir, 0.95, 0.075, 0, rnd, [], 2);
    primarios.push(lista[0].curva);
    galhos.push(...lista);
  }
  const geoDend = mergeGeometries(galhos.map((g) => tubo(g.curva, g.raio, 16)));
  const dendritos = new THREE.Mesh(geoDend, barro);
  dendritos.castShadow = true;
  bio.add(dendritos);
  // axônio (leva o sinal) — sai para a direita, com bainha de mielina
  const curvaAxonio = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.45, -0.02, 0),
    new THREE.Vector3(1.3, -0.1, 0.06),
    new THREE.Vector3(2.3, 0.04, -0.06),
    new THREE.Vector3(3.3, -0.04, 0),
    new THREE.Vector3(3.8, 0.02, 0),
  ]);
  const axonio = new THREE.Mesh(tubo(curvaAxonio, 0.065, 60), barro);
  axonio.castShadow = true;
  bio.add(axonio);
  for (let k = 0; k < 4; k++) {
    const t = 0.22 + k * 0.17;
    const p = curvaAxonio.getPointAt(t);
    const tan = curvaAxonio.getTangentAt(t);
    const seg = new THREE.Mesh(new THREE.CapsuleGeometry(0.12, 0.34, 6, 16), mielina);
    seg.position.copy(p);
    seg.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), tan);
    seg.castShadow = true;
    bio.add(seg);
  }
  // terminais do axônio
  const fimAxonio = curvaAxonio.getPointAt(1);
  const terminais = [];
  const geoTerm = [];
  for (let k = 0; k < 4; k++) {
    const ang = (k - 1.5) * 0.42;
    const ponta = fimAxonio.clone().add(new THREE.Vector3(Math.cos(ang) * 0.55, Math.sin(ang) * 0.55, (rnd() - 0.5) * 0.3));
    const c = curvaFibra(fimAxonio, ponta, rnd, 0.3);
    geoTerm.push(tubo(c, 0.03, 12));
    const botao = new THREE.Mesh(new THREE.SphereGeometry(0.075, 20, 14), barro);
    botao.position.copy(ponta);
    botao.castShadow = true;
    bio.add(botao);
    terminais.push({ curva: c, ponta });
  }
  bio.add(new THREE.Mesh(mergeGeometries(geoTerm), barro));
  // o próximo neurônio (só um pedaço do dendrito), do outro lado da sinapse
  const alvoSinapse = terminais[2].ponta.clone().add(new THREE.Vector3(0.2, 0.0, 0));
  const vizinho = new THREE.CatmullRomCurve3([alvoSinapse, alvoSinapse.clone().add(new THREE.Vector3(0.5, 0.25, 0)), alvoSinapse.clone().add(new THREE.Vector3(1.0, 0.25, 0.1))]);
  const viz = new THREE.Mesh(tubo(vizinho, 0.045, 16), materialBarro('#b5603f'));
  viz.castShadow = true;
  bio.add(viz);
  const corpoViz = new THREE.Mesh(corpoCelular(0.22, 9, 4), materialBarro('#b5603f'));
  corpoViz.position.copy(alvoSinapse).add(new THREE.Vector3(1.15, 0.25, 0.1));
  bio.add(corpoViz);

  // pulsos quentes (sinais elétricos) e neurotransmissores
  const matPulso = new THREE.MeshBasicMaterial({ color: '#fff0dc' });
  const geoPulso = new THREE.SphereGeometry(0.06, 16, 12);
  const pulsosDend = primarios.map((c, k) => ({ m: new THREE.Mesh(geoPulso, matPulso), c, fase: k / primarios.length }));
  pulsosDend.forEach((p) => bio.add(p.m));
  const pulsoAx = new THREE.Mesh(geoPulso, matPulso);
  bio.add(pulsoAx);
  const neuro = [];
  for (let k = 0; k < 6; k++) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.022, 10, 8), new THREE.MeshBasicMaterial({ color: '#f0b080' }));
    bio.add(m);
    neuro.push({ m, fase: k / 6, dy: (k % 3 - 1) * 0.04 });
  }

  // ===================== ARTIFICIAL =====================
  const art = new THREE.Group();
  art.position.copy(S);
  group.add(art);
  const mNo = materiais.ceramica();
  mNo.clearcoat = 0.7;
  mNo.roughness = 0.3;
  const centro = new THREE.Mesh(new THREE.SphereGeometry(0.42, 48, 32), mNo);
  centro.castShadow = true;
  art.add(centro);
  const anel = new THREE.Mesh(new THREE.TorusGeometry(0.56, 0.018, 12, 80), mAlum);
  art.add(anel);
  const cobalto = new THREE.Color('#2f4fd8');
  const branco = new THREE.Color('#ece7de');
  const entradas = EXEMPLO.x.map((x, k) => {
    const pos = new THREE.Vector3(-3.0, (1 - k) * 0.95, 0);
    const no = new THREE.Mesh(new THREE.SphereGeometry(0.17, 32, 20), materiais.ceramica());
    no.position.copy(pos);
    no.castShadow = true;
    art.add(no);
    const w = EXEMPLO.w[k];
    const dir = new THREE.Vector3().subVectors(new THREE.Vector3(), pos);
    const len = dir.length() - 0.42;
    const cabo = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 1, 12), w >= 0 ? materiais.acento('#2f4fd8') : materiais.acento('#c8643b'));
    cabo.scale.set(0.012 + Math.abs(w) * 0.035, len, 0.012 + Math.abs(w) * 0.035);
    cabo.position.copy(pos).addScaledVector(dir.clone().normalize(), len / 2);
    cabo.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
    cabo.castShadow = true;
    art.add(cabo);
    return { pos, no, cabo, w };
  });
  const posVies = new THREE.Vector3(-1.1, 1.25, 0);
  const vies = new THREE.Mesh(new THREE.SphereGeometry(0.1, 24, 16), materiais.ceramica());
  vies.position.copy(posVies);
  art.add(vies);
  const caboVies = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 1, 8), mAlum);
  {
    const d = posVies.clone().negate();
    caboVies.scale.y = d.length() - 0.42;
    caboVies.position.copy(posVies).addScaledVector(d.clone().normalize(), caboVies.scale.y / 2);
    caboVies.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize());
  }
  art.add(caboVies);
  const posSaida = new THREE.Vector3(2.7, 0, 0);
  const noSaida = new THREE.Mesh(new THREE.SphereGeometry(0.2, 32, 20), materiais.ceramica());
  noSaida.position.copy(posSaida);
  art.add(noSaida);
  const caboSaida = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 2.08, 12), mAlum);
  caboSaida.rotation.z = Math.PI / 2;
  caboSaida.position.set(1.52, 0, 0);
  art.add(caboSaida);
  const matPulsoArt = new THREE.MeshBasicMaterial({ color: '#dfe4fb' });
  const pulsosArt = entradas.map(() => new THREE.Mesh(geoPulso, matPulsoArt));
  pulsosArt.forEach((m) => art.add(m));
  const pulsoSaida = new THREE.Mesh(geoPulso, matPulsoArt);
  art.add(pulsoSaida);
  art.traverse((o) => {
    if (o.isMesh) o.castShadow = true;
  });

  // ===================== RÓTULOS =====================
  const noMundo = (obj, v) => {
    const out = new THREE.Vector3();
    return () => out.copy(v).applyMatrix4(obj.matrixWorld);
  };
  const vis = (f) => () => clamp01(f()) * P.presenca;
  annotations.rotulo({ ancora: noMundo(bio, primarios[1].getPoint(0.7)), texto: 'Dendritos: recebem sinais', direcao: [-0.3, -1], comprimento: 9, visivel: vis(() => P.rotDendritos * (1 - P.artificial)) });
  annotations.rotulo({ ancora: noMundo(bio, new THREE.Vector3(0, 0.45, 0)), texto: 'Corpo celular: junta os estímulos', direcao: [0.3, -1], comprimento: 7, visivel: vis(() => P.rotSoma * (1 - P.artificial)) });
  annotations.rotulo({ ancora: noMundo(bio, curvaAxonio.getPointAt(0.45)), texto: 'Axônio: leva o sinal adiante', direcao: [0.2, 1], comprimento: 7, visivel: vis(() => P.rotAxonio * (1 - P.artificial)) });
  annotations.rotulo({ ancora: noMundo(bio, terminais[2].ponta.clone().add(new THREE.Vector3(0.1, 0, 0))), texto: 'Sinapse: passa para o próximo neurônio', direcao: [0.2, -1], comprimento: 8, visivel: vis(() => P.rotSinapse * (1 - P.artificial)) });
  // artificial: números reais do exemplo
  entradas.forEach((e, k) => {
    annotations.rotulo({ ancora: noMundo(art, e.pos), texto: `x${'₁₂₃'[k]} = ${fmt(EXEMPLO.x[k])}`, direcao: [-1, 0], comprimento: 3, visivel: vis(() => P.entradas * P.artificial) });
    annotations.rotulo({
      ancora: noMundo(art, e.pos.clone().multiplyScalar(0.45)),
      texto: `w${'₁₂₃'[k]} = ${fmt(EXEMPLO.w[k])}`,
      direcao: [0.15, k === 2 ? 1 : -1],
      comprimento: 4,
      visivel: vis(() => P.pesos * P.artificial),
    });
  });
  annotations.rotulo({ ancora: noMundo(art, posVies), texto: `viés b = ${fmt(EXEMPLO.b)}`, direcao: [-0.4, -1], comprimento: 3, visivel: vis(() => P.somaArt * P.artificial) });
  annotations.rotulo({ ancora: noMundo(art, new THREE.Vector3(0, 0.45, 0)), texto: `Σ = ${fmt(soma, 2)}`, direcao: [0.3, -1], comprimento: 7, visivel: vis(() => P.somaArt * P.artificial) });
  annotations.rotulo({ ancora: noMundo(art, new THREE.Vector3(0.4, -0.4, 0)), texto: `ativação (sigmoide): ${fmt(saida, 2)}`, direcao: [0.4, 1], comprimento: 6, visivel: vis(() => P.disparo * P.artificial) });
  annotations.rotulo({ ancora: noMundo(art, posSaida), texto: `saída y = ${fmt(saida, 2)}`, direcao: [0.5, -1], comprimento: 5, visivel: vis(() => P.disparo * P.artificial) });

  let tempo = 0;
  function atualizar(dt) {
    tempo += dt;
    const a = suave(P.artificial);
    // transformação: o barro se recolhe no corpo celular; o neurônio artificial se abre a partir dele
    const sb = Math.max(0.001, 1 - a);
    bio.scale.setScalar(sb);
    bio.visible = sb > 0.01;
    bio.rotation.y = a * 0.8;
    const sa = Math.max(0.001, a);
    art.scale.setScalar(sa);
    art.visible = a > 0.01;
    // pulsos biológicos: dos dendritos para o corpo, depois pelo axônio
    const ciclo = (tempo * 0.45) % 1;
    pulsosDend.forEach((p) => {
      const t = (ciclo + p.fase * 0.15) % 1;
      const u = Math.min(1, t / 0.45);
      p.c.getPoint(1 - u, p.m.position);
      p.m.visible = P.pulsoBio > 0.5 && t < 0.45;
    });
    const ta = (ciclo - 0.45) / 0.45;
    pulsoAx.visible = P.pulsoBio > 0.5 && P.rotAxonio > 0.5 && ta > 0 && ta < 1;
    if (pulsoAx.visible) curvaAxonio.getPointAt(Math.min(1, ta), pulsoAx.position);
    neuro.forEach((n) => {
      const t = (tempo * 0.8 + n.fase) % 1;
      n.m.position.lerpVectors(terminais[2].ponta, alvoSinapse, t);
      n.m.position.y += n.dy * Math.sin(t * Math.PI);
      n.m.visible = P.sinapse > 0.5;
    });
    // artificial: entradas → soma → ativação → saída
    const ce = (tempo * 0.6) % 1;
    pulsosArt.forEach((m, k) => {
      m.position.lerpVectors(entradas[k].pos, new THREE.Vector3(), Math.min(1, ce / 0.6));
      m.visible = P.entradas > 0.5 && ce < 0.6 && a > 0.5;
    });
    pulsoSaida.visible = P.disparo > 0.5 && ce > 0.6 && a > 0.5;
    if (pulsoSaida.visible) pulsoSaida.position.lerpVectors(new THREE.Vector3(0.45, 0, 0), posSaida, (ce - 0.6) / 0.4);
    centro.material.color.copy(branco).lerp(cobalto, clamp01(P.disparo) * 0.85);
    noSaida.material.color.copy(branco).lerp(cobalto, clamp01(P.disparo) * 0.85);
    anel.visible = P.disparo > 0.02;
    anel.scale.setScalar(Math.max(0.001, P.disparo));
    anel.rotation.z = tempo * 0.3;
    entradas.forEach((e) => {
      e.cabo.visible = P.pesos > 0.02 || P.entradas > 0.02;
      const g = Math.max(0.15, P.pesos);
      e.cabo.scale.x = e.cabo.scale.z = (0.012 + Math.abs(e.w) * 0.035) * g;
    });
    vies.visible = caboVies.visible = P.somaArt > 0.02;
  }

  return { group, atualizar };
}
