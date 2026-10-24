import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { torneado, extrudar, circulo, envoltoria, engrenagem, rolamento, parafuso, texturaPlaca } from './geometria.js';

// Monta o redutor: carcaça (alumínio) + tampa (cerâmica) + eixos, engrenagens, rolamentos,
// espaçadores, retentor, parafusos, flange, encoder e base.
// Cada peça recebe: posição de casa, deslocamento da vista explodida e janela de tempo.

export const M = 0.09; // módulo
export const A = new THREE.Vector2(-0.95, 0); // eixo de entrada
export const B = new THREE.Vector2(0.67, 0); // eixo de saída (A–B = 1,62 = (12+24)·M/2)
export const R1 = 0.88;
export const R2 = 1.42;
export const PAREDE = 0.16;
export const ALTURA_EIXO = 1.52; // do chão até o centro dos eixos
export const MM = 22.2; // 1 unidade ≈ 22 mm (ilustrativo)
const E = 0.85; // escala geral da explosão

export function montar({ materiais, acento }) {
  const raiz = new THREE.Group();
  raiz.position.y = ALTURA_EIXO;
  const pecas = new Map();

  const peca = (id) => {
    if (!pecas.has(id)) pecas.set(id, { id, itens: [], mats: new Set(), meshes: [], selecao: 0, alpha: 1, cache: {} });
    return pecas.get(id);
  };
  const mat = (p, tipo, ...args) => {
    const chave = tipo + args.join();
    if (!p.cache[chave]) {
      const m = materiais[tipo](...args);
      m.side = THREE.DoubleSide;
      m.forceSinglePass = true; // evita compilar variantes extras (verso/frente) ao ficar transparente
      p.cache[chave] = m;
      p.mats.add(m);
    }
    return p.cache[chave];
  };
  const item = (id, objetos, { pos = [0, 0, 0], offset = [0, 0, 0], janela = [0, 1], eixo = 0, giroExplodir = 0 } = {}) => {
    const p = peca(id);
    const g = new THREE.Group();
    g.position.set(...pos);
    for (const o of objetos) {
      g.add(o);
      o.traverse((m) => {
        if (m.isMesh) {
          m.castShadow = true;
          m.userData.peca = id;
          p.meshes.push(m);
        }
      });
    }
    raiz.add(g);
    const it = { grupo: g, casa: g.position.clone(), offset: new THREE.Vector3(...offset).multiplyScalar(E), janela, eixo, giroExplodir };
    p.itens.push(it);
    return it;
  };
  const malha = (geo, m) => new THREE.Mesh(geo, m);

  // ---------- carcaça (base, alumínio) ----------
  {
    const p = peca('carcaca');
    const casca = envoltoria(A, R1, B, R2).shape;
    casca.holes.push(holePath(envoltoria(A, R1 - PAREDE, B, R2 - PAREDE).shape));
    const fundo = envoltoria(A, R1, B, R2).shape;
    fundo.holes.push(circulo(A.x, A.y, 0.25, true), circulo(B.x, B.y, 0.33, true));
    const geo = mergeGeometries([
      extrudar(fundo, -0.58, 0.15, { chanfro: 0.025 }),
      extrudar(casca, -0.45, 0.47, { chanfro: 0.02 }),
      ressalto(B, 0.33, 0.45, -0.66, -0.56),
      ressalto(A, 0.25, 0.38, -0.64, -0.56),
    ]);
    item('carcaca', [malha(geo, mat(p, 'aluminio'))]);
  }

  // ---------- tampa (cerâmica) ----------
  {
    const p = peca('tampa');
    const casca = envoltoria(A, R1, B, R2).shape;
    casca.holes.push(holePath(envoltoria(A, R1 - PAREDE, B, R2 - PAREDE).shape));
    const frente = envoltoria(A, R1, B, R2).shape;
    frente.holes.push(circulo(A.x, A.y, 0.25, true), circulo(B.x, B.y, 0.33, true));
    const geo = mergeGeometries([
      extrudar(casca, 0.02, 0.44, { chanfro: 0.02 }),
      extrudar(frente, 0.44, 0.15, { chanfro: 0.03 }),
      ressalto(A, 0.25, 0.37, 0.56, 0.66),
      ressalto(B, 0.33, 0.47, 0.56, 0.69),
    ]);
    item('tampa', [malha(geo, mat(p, 'ceramica'))], { offset: [0, 0, 2.3], janela: [0.2, 0.6] });
  }

  // ---------- engrenagens ----------
  const pinhao = engrenagem(12, M, 0.56, { furo: 0.12 });
  {
    const p = peca('pinhao');
    item('pinhao', [malha(pinhao.geo, mat(p, 'acoEscuro'))], { pos: [A.x, A.y, 0], offset: [0, 0, 1.0], janela: [0.45, 0.85], eixo: 1 });
  }
  const coroa = engrenagem(24, M, 0.5, { furo: 0.17, alivios: { n: 6, raio: 0.68, r: 0.15 }, cubo: { r: 0.3, alto: 0.05 } });
  {
    const p = peca('coroa');
    const m = malha(coroa.geo, mat(p, 'acento', acento));
    m.rotation.z = Math.PI / 24; // meio passo: o dente do pinhão encaixa no vão
    item('coroa', [m], { pos: [B.x, B.y, 0], offset: [0, 0, 1.0], janela: [0.45, 0.85], eixo: -0.5 });
  }

  // ---------- eixos ----------
  {
    const p = peca('eixoEntrada');
    const geo = torneado(chanfrarPerfil([
      [0.07, -0.68],
      [0.11, -0.62],
      [0.11, -0.4],
      [0.14, -0.4],
      [0.14, -0.3],
      [0.12, -0.3],
      [0.12, 0.3],
      [0.14, 0.3],
      [0.14, 0.4],
      [0.11, 0.4],
      [0.11, 0.62],
      [0.09, 0.62],
      [0.09, 1.05],
    ]));
    item('eixoEntrada', [malha(geo, mat(p, 'aco'))], { pos: [A.x, A.y, 0], offset: [0, 0, 0.6], janela: [0.5, 0.9], eixo: 1 });
  }
  {
    const p = peca('eixoSaida');
    const geo = torneado(chanfrarPerfil([
      [0.16, -0.6],
      [0.16, -0.4],
      [0.2, -0.4],
      [0.2, -0.3],
      [0.17, -0.3],
      [0.17, 0.44],
      [0.16, 0.44],
      [0.16, 0.7],
      [0.15, 0.7],
      [0.15, 1.32],
    ]));
    item('eixoSaida', [malha(geo, mat(p, 'aco'))], { pos: [B.x, B.y, 0], offset: [0, 0, 0.6], janela: [0.5, 0.9], eixo: -0.5 });
  }

  // ---------- rolamentos (4) ----------
  {
    const p = peca('rolamentos');
    const conj = [
      [A, 0.11, 0.24, 0.12, 0.51, 1.8, 1],
      [A, 0.11, 0.24, 0.12, -0.51, -0.8, 1],
      [B, 0.16, 0.32, 0.14, 0.51, 1.8, -0.5],
      [B, 0.16, 0.32, 0.14, -0.51, -0.8, -0.5],
    ];
    const esfera = new THREE.SphereGeometry(1, 16, 12);
    for (const [c, ri, re, w, z, dz, eixo] of conj) {
      const r = rolamento(ri, re, w);
      const bolas = new THREE.InstancedMesh(esfera, mat(p, 'aco'), r.nEsferas);
      const tmp = new THREE.Object3D();
      for (let i = 0; i < r.nEsferas; i++) {
        const a = (i / r.nEsferas) * Math.PI * 2;
        tmp.position.set(Math.cos(a) * r.raioEsferas, Math.sin(a) * r.raioEsferas, 0);
        tmp.scale.setScalar(r.rEsfera);
        tmp.updateMatrix();
        bolas.setMatrixAt(i, tmp.matrix);
      }
      item('rolamentos', [malha(r.externo, mat(p, 'aco')), malha(r.interno, mat(p, 'aco')), bolas], {
        pos: [c.x, c.y, z],
        offset: [0, 0, dz],
        janela: dz > 0 ? [0.3, 0.7] : [0.4, 0.8],
        eixo: eixo * 0, // os anéis externos não giram
      });
    }
  }

  // ---------- espaçadores ----------
  {
    const p = peca('espacadores');
    const geo = torneado([
      [0.17, -0.07],
      [0.26, -0.07],
      [0.27, -0.06],
      [0.27, 0.06],
      [0.26, 0.07],
      [0.17, 0.07],
      [0.17, -0.07],
    ]);
    const m = mat(p, 'ceramicaCinza');
    item('espacadores', [malha(geo, m)], { pos: [B.x, B.y, 0.37], offset: [0, 0, 1.4], janela: [0.35, 0.75], eixo: -0.5 });
    item('espacadores', [malha(geo, m)], { pos: [B.x, B.y, -0.37], offset: [0, 0, 0.35], janela: [0.5, 0.9], eixo: -0.5 });
  }

  // ---------- retentor (vedação de borracha) ----------
  {
    const p = peca('retentor');
    const geo = torneado([
      [0.155, 0.0],
      [0.2, 0.0],
      [0.2, 0.025],
      [0.31, 0.025],
      [0.33, 0.04],
      [0.33, 0.1],
      [0.18, 0.1],
      [0.155, 0.07],
      [0.155, 0.0],
    ]);
    item('retentor', [malha(geo, mat(p, 'borracha'))], { pos: [B.x, B.y, 0.6], offset: [0, 0, 2.75], janela: [0.15, 0.55] });
  }

  // ---------- parafusos ----------
  {
    const p = peca('parafusos');
    const { cabeca, sext } = parafuso();
    const { nx, ny } = envoltoria(A, R1, B, R2).tangente;
    const rA = R1 - PAREDE / 2;
    const rB = R2 - PAREDE / 2;
    const pontos = [];
    for (const g of [135, 225]) pontos.push([A.x + Math.cos(THREE.MathUtils.degToRad(g)) * rA, A.y + Math.sin(THREE.MathUtils.degToRad(g)) * rA]);
    for (const g of [62, 0, -62]) pontos.push([B.x + Math.cos(THREE.MathUtils.degToRad(g)) * rB, B.y + Math.sin(THREE.MathUtils.degToRad(g)) * rB]);
    for (const s of [1, -1]) {
      const t1 = [A.x + rA * nx, A.y + s * rA * ny];
      const t2 = [B.x + rB * nx, B.y + s * rB * ny];
      pontos.push([(t1[0] + t2[0]) / 2, (t1[1] + t2[1]) / 2]);
    }
    const mc = mat(p, 'anodizado');
    const ms = mat(p, 'borracha');
    pontos.forEach(([x, y], i) => {
      const radial = new THREE.Vector2(x - 0.1, y).normalize().multiplyScalar(0.18);
      item('parafusos', [malha(cabeca, mc), malha(sext, ms)], {
        pos: [x, y, 0.59],
        offset: [radial.x, radial.y, 3.1],
        janela: [0.02 + i * 0.025, 0.4 + i * 0.025],
        giroExplodir: Math.PI * 6,
      });
    });
  }

  // ---------- flange de acoplamento ----------
  {
    const p = peca('flange');
    const s = new THREE.Shape();
    s.absarc(0, 0, 0.42, 0, Math.PI * 2, false);
    s.holes.push(circulo(0, 0, 0.15, true));
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
      s.holes.push(circulo(Math.cos(a) * 0.29, Math.sin(a) * 0.29, 0.045, true));
    }
    const disco = extrudar(s, 0, 0.12, { chanfro: 0.02, curva: 48 });
    const cubo = torneado([
      [0.15, -0.16],
      [0.22, -0.16],
      [0.24, -0.14],
      [0.24, 0.0],
      [0.15, 0.0],
      [0.15, -0.16],
    ]);
    const geo = mergeGeometries([disco, cubo]);
    item('flange', [malha(geo, mat(p, 'anodizado'))], { pos: [B.x, B.y, 1.18], offset: [0, 0, 3.5], janela: [0, 0.4], eixo: -0.5 });
  }

  // ---------- encoder: tampa escura, placa e ímã ----------
  {
    const p = peca('encoder');
    const copo = torneado([
      [0.46, -0.6],
      [0.5, -0.6],
      [0.5, -0.9],
      [0.47, -0.94],
      [0.0001, -0.94],
      [0.0001, -0.9],
      [0.46, -0.9],
      [0.46, -0.6],
    ]);
    item('encoder', [malha(copo, mat(p, 'anodizado'))], { pos: [A.x, A.y, 0], offset: [0, 0, -1.9], janela: [0.1, 0.55] }).papel = 'copo';

    const disco = new THREE.Shape();
    disco.absarc(0, 0, 0.42, 0, Math.PI * 2, false);
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2 + Math.PI / 2;
      disco.holes.push(circulo(Math.cos(a) * 0.35, Math.sin(a) * 0.35, 0.03, true));
    }
    const tex = texturaPlaca(acento);
    tex.repeat.set(1 / 0.84, 1 / 0.84);
    tex.offset.set(0.5, 0.5);
    const placa = new THREE.ExtrudeGeometry(disco, { depth: 0.025, bevelEnabled: false, curveSegments: 48 });
    const mPlaca = mat(p, 'pcb', tex);
    const mChip = mat(p, 'chip');
    const mConector = mat(p, 'ceramica');
    const mLatao = mat(p, 'latao');
    const grupoPlaca = [malha(placa, mPlaca)];
    // componentes no verso (visíveis por trás)
    const caixa = (w, h, d, x, y, m) => {
      const b = malha(new THREE.BoxGeometry(w, h, d), m);
      b.position.set(x, y, -d / 2);
      return b;
    };
    grupoPlaca.push(caixa(0.19, 0.19, 0.035, 0, 0, mChip)); // microcontrolador
    grupoPlaca.push(caixa(0.22, 0.08, 0.07, -0.13, -0.27, mConector)); // conector
    grupoPlaca.push(caixa(0.05, 0.03, 0.02, 0.2, 0.08, mLatao));
    grupoPlaca.push(caixa(0.05, 0.03, 0.02, 0.2, -0.02, mLatao));
    grupoPlaca.push(caixa(0.03, 0.05, 0.02, -0.21, 0.12, mLatao));
    grupoPlaca.push(caixa(0.09, 0.06, 0.025, 0.12, 0.24, mChip));
    // sensor magnético na frente (voltado para o ímã)
    const sensor = malha(new THREE.BoxGeometry(0.12, 0.12, 0.02), mChip);
    sensor.position.z = 0.035;
    grupoPlaca.push(sensor);
    item('encoder', grupoPlaca, { pos: [A.x, A.y, -0.755], offset: [0, 0, -1.25], janela: [0.2, 0.65] }).papel = 'placa';

    const ima = torneado([
      [0.0001, -0.012],
      [0.065, -0.012],
      [0.07, -0.007],
      [0.07, 0.012],
      [0.0001, 0.012],
    ], 40);
    item('encoder', [malha(ima, mat(p, 'acoEscuro'))], { pos: [A.x, A.y, -0.695], offset: [0, 0, -0.6], janela: [0.3, 0.7], eixo: 1 }).papel = 'ima';
  }

  // ---------- base de fixação ----------
  {
    const p = peca('suporte');
    const yChao = -ALTURA_EIXO;
    const placa = new THREE.Shape();
    const [x0, x1, z0, z1] = [-1.75, 2.05, -0.7, 0.7];
    placa.moveTo(x0 + 0.12, z0);
    placa.lineTo(x1 - 0.12, z0);
    placa.quadraticCurveTo(x1, z0, x1, z0 + 0.12);
    placa.lineTo(x1, z1 - 0.12);
    placa.quadraticCurveTo(x1, z1, x1 - 0.12, z1);
    placa.lineTo(x0 + 0.12, z1);
    placa.quadraticCurveTo(x0, z1, x0, z1 - 0.12);
    placa.lineTo(x0, z0 + 0.12);
    placa.quadraticCurveTo(x0, z0, x0 + 0.12, z0);
    for (const [hx, hz] of [[x0 + 0.22, z0 + 0.22], [x1 - 0.22, z0 + 0.22], [x0 + 0.22, z1 - 0.22], [x1 - 0.22, z1 - 0.22]]) {
      placa.holes.push(circulo(hx, hz, 0.06, true));
    }
    const gPlaca = extrudar(placa, 0, 0.12, { chanfro: 0.025 });
    gPlaca.rotateX(Math.PI / 2); // a placa fica deitada (espessura em Y)
    gPlaca.translate(0, yChao + 0.12, 0);

    // pedestal: acompanha a linha tangente inferior da carcaça
    const { nx, ny } = envoltoria(A, R1, B, R2).tangente;
    const t1 = new THREE.Vector2(A.x + R1 * nx, A.y - R1 * ny);
    const t2 = new THREE.Vector2(B.x + R2 * nx, B.y - R2 * ny);
    const yLinha = (x) => t1.y + ((t2.y - t1.y) * (x - t1.x)) / (t2.x - t1.x);
    const topo = yChao + 0.12;
    const ped = new THREE.Shape();
    const [pa, pb] = [-1.15, 0.12];
    ped.moveTo(pa, topo - 0.01);
    ped.lineTo(pb, topo - 0.01);
    ped.lineTo(pb, yLinha(pb) + 0.03);
    ped.lineTo(pa, yLinha(pa) + 0.03);
    ped.closePath();
    const gPed = extrudar(ped, -0.5, 1.0, { chanfro: 0.025 });
    item('suporte', [malha(mergeGeometries([gPlaca, gPed]), mat(p, 'anodizado'))]);
  }

  return { raiz, pecas, coroa, pinhao };
}

// ---------- utilidades locais ----------
function holePath(shape) {
  const p = new THREE.Path();
  p.curves = shape.curves;
  return p;
}

function ressalto(c, ri, re, z0, z1) {
  const ch = 0.02;
  const g = torneado([
    [ri, z0],
    [re - ch, z0],
    [re, z0 + ch],
    [re, z1 - ch],
    [re - ch, z1],
    [ri, z1],
    [ri, z0],
  ]);
  g.translate(c.x, c.y, 0);
  return g;
}

// Perfil de eixo: degraus retos com pequenos chanfros nas pontas + fecha no centro
function chanfrarPerfil(pts) {
  const c = 0.012;
  const [r0, z0] = pts[0];
  const [rn, zn] = pts[pts.length - 1];
  return [[0.0001, z0], [r0 - c, z0], [r0, z0 + c], ...pts.slice(1, -1), [rn, zn - c], [rn - c, zn], [0.0001, zn]];
}
