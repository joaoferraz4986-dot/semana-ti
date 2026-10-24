import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { PADRAO, ESTADOS, CAMERAS } from './estados.js';
import {
  textura,
  redesenharQuandoFontesProntas,
  desenharApp,
  desenharCamada,
  desenharFonte,
  desenharFace,
  desenharRotuloBloco,
  desenharServidor,
  desenharRequisicao,
  desenharResposta,
  desenharDoc,
} from './texturas.js';

// Cena "software": três personagens no mesmo estúdio.
//   bloco    — o executável, uma "caixa-preta" que é fatiada (binário → assembly → pseudocódigo → lógica)
//   celular  — o app "Lanchonete Pátio", que se separa em 5 camadas
//   servidor — para o estudo de caso da API (requisições viajando pelo cabo)
// Contrato de cena: ver COMO_EDITAR.md. Tudo aqui é função dos parâmetros (estados.js).

const clamp01 = (x) => Math.max(0, Math.min(1, x));
const suave = (x) => {
  const t = clamp01(x);
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};
const lerp = THREE.MathUtils.lerp;

// placa com cantos arredondados; UV das faces normalizado (0..1) para receber uma textura
function placa(w, h, esp, r, chanfro = 0.008) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  const g = new THREE.ExtrudeGeometry(s, {
    depth: Math.max(0.001, esp - chanfro * 2),
    bevelEnabled: true,
    bevelThickness: chanfro,
    bevelSize: chanfro,
    bevelOffset: -chanfro,
    bevelSegments: 2,
    curveSegments: 10,
  });
  g.translate(0, 0, -esp / 2 + chanfro);
  const pos = g.attributes.position;
  const uv = g.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, (pos.getX(i) + w / 2) / w, (pos.getY(i) + h / 2) / h);
  return g; // grupos: 0 = frente/verso, 1 = laterais
}

function telaGeo(w, h, r) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  const g = new THREE.ShapeGeometry(s, 12);
  const pos = g.attributes.position;
  const uv = g.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, (pos.getX(i) + w / 2) / w, (pos.getY(i) + h / 2) / h);
  return g;
}

const sombra = (o) => {
  o.traverse((m) => {
    if (m.isMesh) m.castShadow = true;
  });
  return o;
};

export function criarSoftware({ stage, annotations, materiais, acento }) {
  const group = new THREE.Group();
  const P = { ...PADRAO };
  const tmp = new THREE.Vector3();
  const pontoEm = (obj, x, y, z) => {
    const v = new THREE.Vector3();
    return () => v.set(x, y, z).applyMatrix4(obj.matrixWorld);
  };

  // sombras de contato extras (o motor já tem uma no centro, debaixo do bloco)
  const contato = (x, z, sx, sz) => {
    const c = stage.chao.contato.clone();
    c.position.set(x, 0.002, z);
    c.scale.set(sx, sz, 1);
    stage.scene.add(c);
    return c;
  };

  // =====================================================================
  // BLOCO (executável): 5 fatias ao longo de X
  // =====================================================================
  const BLOCO = { h: 1.5, d: 2.0 };
  const bloco = new THREE.Group();
  group.add(bloco);
  const mAnod = materiais.anodizado();
  // da direita (fatia 0, a "tampa") para a esquerda (fatia 4, o miolo)
  const LIMITES = [1.2, 0.84, 0.48, 0.12, -0.24, -1.2];
  const fatias = [];
  for (let k = 0; k < 5; k++) {
    const x1 = LIMITES[k];
    const x0 = LIMITES[k + 1];
    const g = new THREE.Group();
    const corpo = new THREE.Mesh(new RoundedBoxGeometry(x1 - x0, BLOCO.h, BLOCO.d, 3, 0.016), mAnod);
    g.add(corpo);
    g.position.set((x0 + x1) / 2, BLOCO.h / 2, 0);
    // face cortada (lado +X) com o nível de leitura gravado: só aparece quando a fatia da frente sai
    if (k >= 1) {
      const tex = textura(1280, 940, desenharFace(k));
      const face = new THREE.Mesh(new THREE.PlaneGeometry(BLOCO.d - 0.08, BLOCO.h - 0.08), materiais.impresso(tex, { roughness: 0.42, metalness: 0.25 }));
      face.rotation.y = Math.PI / 2;
      face.position.x = (x1 - x0) / 2 + 0.003;
      g.add(face);
    }
    if (k === 0) {
      // lado de fora do executável: só a etiqueta
      const etiqueta = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 0.5), new THREE.MeshBasicMaterial({ map: textura(512, 256, desenharRotuloBloco), transparent: true, depthWrite: false }));
      etiqueta.rotation.y = Math.PI / 2;
      etiqueta.position.set((x1 - x0) / 2 + 0.004, 0.15, 0.2);
      g.add(etiqueta);
    }
    sombra(g);
    bloco.add(g);
    fatias.push({ g, casa: g.position.clone(), largura: x1 - x0 });
  }
  // gravação "app" na frente do miolo
  const rotuloMat = new THREE.MeshBasicMaterial({ map: textura(512, 256, desenharRotuloBloco), transparent: true, opacity: 0, depthWrite: false });
  const rotulo = new THREE.Mesh(new THREE.PlaneGeometry(0.84, 0.42), rotuloMat);
  rotulo.position.set(-0.24 - 0.48 - (LIMITES[4] - LIMITES[5]) / 2 + 0.48, 0.95, BLOCO.d / 2 + 0.004);
  rotulo.position.x = (LIMITES[4] + LIMITES[5]) / 2;
  bloco.add(rotulo);
  // fenda por onde entra o código-fonte
  const fenda = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.012, 0.07), new THREE.MeshBasicMaterial({ color: 0x0b0a09 }));
  fenda.position.set(0, BLOCO.h + 0.004, 0);
  bloco.add(fenda);
  // placa do código-fonte
  const mFonte = materiais.impresso(textura(1456, 1000, desenharFonte));
  const mCeram = materiais.ceramica();
  const placaFonte = sombra(new THREE.Mesh(placa(1.6, 1.1, 0.04, 0.05), [mFonte, mCeram]));
  bloco.add(placaFonte);

  // =====================================================================
  // CELULAR (app): corpo cerâmico, aro de alumínio, tela, 5 camadas
  // =====================================================================
  // o lado do app (celular, servidor, cabo, cartões) fica afastado do executável,
  // para que cada capítulo enquadre um personagem só
  const lado = new THREE.Group();
  lado.position.x = -1.8;
  group.add(lado);
  const CEL = { w: 1.5, h: 3.0, esp: 0.16 };
  const celular = new THREE.Group();
  celular.position.set(-5.4, 0, 0.4);
  celular.scale.setScalar(0.62);
  lado.add(celular);
  // base (suporte de mesa)
  const suporte = sombra(new THREE.Mesh(new RoundedBoxGeometry(1.15, 0.24, 0.8, 3, 0.06), materiais.ceramicaCinza()));
  suporte.position.y = 0.12;
  celular.add(suporte);
  const giro = new THREE.Group(); // gira o aparelho no lugar
  giro.position.y = 0.2;
  celular.add(giro);
  const inclinado = new THREE.Group();
  inclinado.rotation.x = -0.12;
  giro.add(inclinado);
  const aparelho = new THREE.Group();
  aparelho.position.y = CEL.h / 2;
  inclinado.add(aparelho);
  const mAlum = materiais.aluminio();
  const corpo = new THREE.Mesh(placa(CEL.w, CEL.h, CEL.esp, 0.22, 0.03), [materiais.ceramica(), mAlum]);
  aparelho.add(corpo);
  // módulo de câmera (atrás)
  const modulo = new THREE.Mesh(new RoundedBoxGeometry(0.5, 0.5, 0.05, 3, 0.1), materiais.ceramica());
  modulo.position.set(-0.36, 1.0, -CEL.esp / 2 - 0.02);
  aparelho.add(modulo);
  for (const [lx, ly] of [
    [-0.47, 1.1],
    [-0.27, 0.9],
  ]) {
    const lente = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.05, 32), materiais.vidro());
    lente.rotation.x = Math.PI / 2;
    lente.position.set(lx, ly, -CEL.esp / 2 - 0.05);
    aparelho.add(lente);
  }
  // botões laterais
  for (const [by, bh] of [
    [0.75, 0.36],
    [0.25, 0.22],
  ]) {
    const b = new THREE.Mesh(new RoundedBoxGeometry(0.03, bh, 0.06, 2, 0.012), mAlum);
    b.position.set(CEL.w / 2 + 0.012, by, 0);
    aparelho.add(b);
  }
  // tela
  const texApp = textura(768, 1536, (g, w, h) => desenharApp(g, w, h, { acento }));
  const mTela = new THREE.MeshStandardMaterial({ color: 0x0c0c0d, roughness: 0.14, metalness: 0, emissive: 0xffffff, emissiveMap: texApp, emissiveIntensity: 0 });
  const tela = new THREE.Mesh(telaGeo(CEL.w - 0.12, CEL.h - 0.12, 0.17), mTela);
  tela.position.z = CEL.esp / 2 + 0.002;
  aparelho.add(tela);
  sombra(aparelho);
  contato(-7.2, 0.4, 1.3, 0.95);

  // as 5 camadas
  const NOMES = [
    ['interface', '1 · Interface'],
    ['logica', '2 · Lógica'],
    ['rede', '3 · Rede'],
    ['dados', '4 · Dados'],
    ['binario', '5 · Binário'],
  ];
  const camadas = NOMES.map(([tipo, nome], k) => {
    const tex = textura(768, 1536, desenharCamada(tipo, acento));
    const frente = tipo === 'interface' ? new THREE.MeshStandardMaterial({ color: 0xffffff, map: tex, roughness: 0.5, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.25 }) : materiais.impresso(tex);
    const m = sombra(new THREE.Mesh(placa(CEL.w - 0.12, CEL.h - 0.12, 0.045, 0.16), [frente, mCeram]));
    m.visible = false;
    aparelho.add(m);
    annotations.rotulo({
      ancora: pontoEm(m, 0, -(CEL.h - 0.12) / 2, 0),
      texto: nome,
      direcao: [0.35, 1],
      comprimento: 3 + (k % 2) * 3,
      visivel: () => P.rotulosCamadas * P.presenca * clamp01(P.camadas - k) * suave(P.leque),
    });
    return { m, zFinal: 0.6 + (4 - k) * 0.95 };
  });
  annotations.rotulo({
    ancora: pontoEm(aparelho, 0, 0.2, 0),
    texto: 'código-fonte: não vem junto',
    direcao: [1, -0.8],
    comprimento: 9,
    visivel: () => P.duvida * P.presenca,
  });

  // =====================================================================
  // SERVIDOR + cabo + contas (requisições) + cartões
  // =====================================================================
  const servidor = new THREE.Group();
  servidor.position.set(-8.4, 0, -0.4);
  servidor.rotation.y = 0.35;
  lado.add(servidor);
  const torre = sombra(new THREE.Mesh(new RoundedBoxGeometry(1.1, 2.4, 1.2, 3, 0.07), materiais.ceramica()));
  torre.position.y = 1.32;
  const pe = sombra(new THREE.Mesh(new RoundedBoxGeometry(1.25, 0.12, 1.35, 2, 0.03), materiais.anodizado()));
  pe.position.y = 0.06;
  const frenteServ = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 2.25), materiais.impresso(textura(512, 1152, desenharServidor(acento))));
  frenteServ.position.set(0, 1.32, 0.603);
  servidor.add(torre, pe, frenteServ);
  const contatoServ = contato(-10.2, -0.4, 1.4, 1.5);

  const curva = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-5.1, 0.035, 0.75),
    new THREE.Vector3(-5.9, 0.035, 1.6),
    new THREE.Vector3(-7.3, 0.035, 1.5),
    new THREE.Vector3(-8.1, 0.035, 0.5),
    new THREE.Vector3(-8.25, 0.035, 0.15),
  ]);
  const geoCabo = new THREE.TubeGeometry(curva, 160, 0.03, 8, false);
  const cabo = new THREE.Mesh(geoCabo, materiais.borracha());
  cabo.receiveShadow = false;
  lado.add(cabo);
  const totalIndices = geoCabo.index.count;
  // a curva é amostrada uma vez; o ponto em u (0..1) vem de interpolação simples
  const amostras = curva.getSpacedPoints(240);
  const pontoNoCabo = (u, out) => {
    const x = Math.max(0, Math.min(1, u || 0)) * (amostras.length - 1);
    const i = Math.min(amostras.length - 2, Math.floor(x));
    return out.lerpVectors(amostras[i], amostras[i + 1], x - i);
  };

  const mIda = materiais.acento(acento);
  const mVolta = materiais.ceramica();
  const esfera = new THREE.SphereGeometry(0.075, 24, 16);
  const contas = [];
  for (let i = 0; i < 8; i++) {
    const ida = i < 4;
    const c = new THREE.Mesh(esfera, ida ? mIda : mVolta);
    c.castShadow = true;
    lado.add(c);
    contas.push({ c, ida, fase: (i % 4) / 4 });
  }

  const cartaoMat = (tex) => {
    const m = materiais.impresso(tex, { transparent: true, opacity: 0, roughness: 0.7 });
    m.depthWrite = false;
    return m;
  };
  const mkCartao = (tex, w, h) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), cartaoMat(tex));
    m.castShadow = false;
    lado.add(m);
    return m;
  };
  const cReq = mkCartao(textura(1024, 640, desenharRequisicao(acento)), 1.5, 0.94);
  const cResp = mkCartao(textura(1024, 640, desenharResposta(acento)), 1.5, 0.94);
  const cDoc = mkCartao(textura(1024, 1330, desenharDoc(acento)), 1.5, 1.95);
  const viradoPara = (obj, alvoCam) => {
    obj.lookAt(alvoCam);
  };
  const camApi = new THREE.Vector3(...CAMERAS['api-perto'].pos);

  // =====================================================================
  // anotações
  // =====================================================================
  annotations.rotulo({
    ancora: pontoEm(placaFonte, -0.2, 0.55, 0.02),
    texto: 'código-fonte: escrito para pessoas',
    direcao: [-0.35, -1],
    comprimento: 5,
    visivel: () => P.presenca * clamp01(1 - Math.abs(P.codigo - 1) * 2.5),
  });
  annotations.rotulo({
    ancora: pontoEm(bloco, -1.2, 1.5, 1.0),
    texto: 'executável: escrito para o processador',
    direcao: [-1, -0.7],
    comprimento: 6,
    visivel: () => P.presenca * clamp01((P.codigo - 1.5) * 2) * clamp01(1 - P.fatias * 3),
  });
  annotations.rotulo({
    ancora: pontoEm(fatias[3].g, fatias[3].largura / 2 + 0.004, 0.27, 0.1),
    texto: 'preco virou param_1',
    direcao: [0.25, -1],
    comprimento: 6,
    visivel: () => P.pistas * P.presenca * clamp01((P.fatias - 2.6) * 3) * (P.fatias > 3.2 ? 0.0 + clamp01((P.fatias - 3.9) * 10) : 1),
  });
  annotations.rotulo({
    ancora: pontoEm(fatias[3].g, fatias[3].largura / 2 + 0.004, -0.2, 0.75),
    texto: 'comentários: perdidos',
    direcao: [0.25, 1],
    comprimento: 5,
    visivel: () => P.pistas * P.presenca * clamp01((P.fatias - 2.6) * 3) * (P.fatias > 3.2 ? 0.0 + clamp01((P.fatias - 3.9) * 10) : 1),
  });
  annotations.rotulo({
    ancora: pontoEm(servidor, 0, 2.6, 0),
    texto: 'sistema sem documentação',
    direcao: [1, -0.6],
    comprimento: 5,
    visivel: () => P.presenca * clamp01(P.servidor * 2 - 1) * (1 - P.congelar),
  });

  redesenharQuandoFontesProntas();

  // =====================================================================
  // aplicar parâmetros (chamado todo quadro, já interpolado pela rolagem)
  // =====================================================================
  let tempo = 0;
  function apply(p) {
    Object.assign(P, p);
    group.visible = P.presenca > 0.01;
  }

  function update(dt) {
    if (!group.visible) return;
    tempo += dt;

    // ---- bloco: fatias saem para a direita e se enfileiram atrás
    for (let k = 0; k < 4; k++) {
      const f = fatias[k];
      const e = clamp01(P.fatias - k);
      const a = suave(Math.min(1, e * 1.8)); // desliza para fora
      const b = suave((e - 0.45) / 0.55); // vai para a fila
      // destino: placas de "museu" lado a lado atrás do bloco, viradas para a frente
      const destinoX = 2.5 + (3 - k) * 1.3;
      const esc = 1 - 0.42 * b;
      f.g.position.set(
        f.casa.x + a * 0.9 + b * (destinoX - f.casa.x - 0.9),
        lerp(f.casa.y, f.casa.y * esc, b) + Math.sin(b * Math.PI) * 0.45,
        f.casa.z - b * 2.5,
      );
      f.g.rotation.y = (-Math.PI / 2) * b;
      f.g.scale.setScalar(esc);
    }
    // exposição (capítulo da IA): o miolo também vira uma placa da fileira
    {
      const f = fatias[4];
      const ex = suave(P.exposicao);
      const esc = 1 - 0.42 * ex;
      f.g.position.set(lerp(f.casa.x, 1.2, ex), lerp(f.casa.y, f.casa.y * esc, ex) + Math.sin(ex * Math.PI) * 0.45, f.casa.z - ex * 2.5);
      f.g.rotation.y = (-Math.PI / 2) * ex;
      f.g.scale.setScalar(esc);
    }
    rotuloMat.opacity = P.rotuloBloco * 0.95;
    rotulo.visible = rotuloMat.opacity > 0.01;
    fenda.scale.x = Math.max(0.001, 1 - P.selado);
    fenda.visible = P.selado < 0.99;
    // placa do código-fonte: aparece à esquerda (1) e entra pela fenda (2)
    const c1 = suave(clamp01(P.codigo));
    const c2 = clamp01(P.codigo - 1);
    const ida = suave(c2 / 0.55);
    const desce = suave((c2 - 0.5) / 0.5);
    placaFonte.visible = c1 > 0.01 && desce < 0.999;
    placaFonte.scale.setScalar(Math.max(0.001, c1));
    placaFonte.position.set(lerp(-2.7, 0, ida), lerp(1.25, BLOCO.h + 0.75, ida) - desce * 1.15, lerp(0.6, 0, ida));
    placaFonte.rotation.y = lerp(0.18, 0, ida);
    placaFonte.scale.y = Math.max(0.001, c1 * (1 - desce * 0.15));

    // ---- celular
    // camada por camada: cada uma sai da tela, grande e de frente para a câmera;
    // quando a próxima vem, a anterior volta para dentro. No "leque", todas se abrem.
    const lq = suave(P.leque);
    mTela.emissiveIntensity = P.tela * (1 - suave(clamp01(P.camadas * 2))) * 0.95;
    giro.rotation.y = suave(P.virar) * 2.5;
    camadas.forEach((c, k) => {
      const sai = suave(clamp01((P.camadas - k) * 2 - 1)); // 2ª metade da transição: sai da tela
      const volta = suave(clamp01((P.camadas - k - 1) * 2)); // 1ª metade da próxima: volta para dentro
      const destaque = sai * (1 - volta);
      const abre = lq * suave(clamp01(P.camadas - k));
      c.m.visible = destaque > 0.001 || abre > 0.001;
      c.m.position.set(
        lerp(0, (k - 2) * 0.12, abre),
        lerp(0.1 * destaque, 0.06 * (2 - k), abre),
        lerp(2.4 * destaque, c.zFinal, abre),
      );
    });

    // ---- servidor, cabo e contas
    const s = suave(P.servidor);
    servidor.visible = s > 0.01;
    servidor.scale.set(0.78, 0.78 * Math.max(0.001, s), 0.78);
    contatoServ.visible = servidor.visible;
    cabo.visible = P.cabo > 0.01;
    geoCabo.setDrawRange(0, Math.floor((totalIndices * clamp01(P.cabo)) / 3) * 3);
    const tr = clamp01(P.trafego);
    const cong = suave(P.congelar);
    const resp = suave(P.resposta);
    const doc = suave(P.doc);
    contas.forEach((ct, i) => {
      let u = (tempo * 0.22 + ct.fase) % 1;
      if (!ct.ida) u = 1 - u;
      pontoNoCabo(u, tmp);
      let escala = tr;
      // a 1ª conta de ida é a requisição congelada; a 1ª de volta é a resposta
      const especialReq = i === 0;
      const especialResp = i === 4;
      if (especialReq && cong > 0) {
        const alvo = pontoNoCabo(0.5, new THREE.Vector3()).add(new THREE.Vector3(0, 0.9, 0));
        tmp.lerp(alvo, cong);
        escala = Math.max(tr, cong) * (1 + cong * 1.6) * (1 - doc);
      } else if (especialResp && resp > 0) {
        const alvo = pontoNoCabo(0.32, new THREE.Vector3()).add(new THREE.Vector3(0, 0.9, 0));
        tmp.lerp(alvo, resp);
        escala = Math.max(tr, resp) * (1 + resp * 1.6) * (1 - doc);
      } else {
        escala *= 1 - Math.max(cong, resp) * 0.85;
      }
      ct.c.position.copy(tmp);
      ct.c.position.y += 0.06;
      ct.c.scale.setScalar(Math.max(0.001, escala));
      ct.c.visible = escala > 0.01 && P.cabo > 0.5;
    });
    // cartões
    const posReq = new THREE.Vector3(-6.35, 1.75, 1.7);
    const posResp = new THREE.Vector3(-7.75, 1.55, 1.25);
    const posDoc = new THREE.Vector3(-7.0, 1.3, 1.3);
    cReq.position.copy(posReq).lerp(posDoc, doc);
    cResp.position.copy(posResp).lerp(posDoc, doc);
    cReq.material.opacity = cong * (1 - doc);
    cResp.material.opacity = resp * (1 - doc);
    cReq.scale.setScalar(Math.max(0.001, (0.6 + 0.4 * cong) * (1 - doc * 0.6)));
    cResp.scale.setScalar(Math.max(0.001, (0.6 + 0.4 * resp) * (1 - doc * 0.6)));
    cDoc.position.copy(posDoc);
    cDoc.material.opacity = doc;
    cDoc.scale.setScalar(Math.max(0.001, 0.85 + 0.15 * doc));
    for (const c of [cReq, cResp, cDoc]) {
      c.visible = c.material.opacity > 0.01;
      viradoPara(c, camApi);
    }
  }

  return {
    group,
    defaults: PADRAO,
    states: ESTADOS,
    cameras: CAMERAS,
    cameraPadrao: 'bloco-estudio',
    apply,
    update,
    dispose() {
      group.traverse((o) => {
        o.geometry?.dispose();
        if (o.material) [].concat(o.material).forEach((m) => m.dispose());
      });
    },
  };
}
