import * as THREE from 'three';
import { LineSegments2 } from 'three/addons/lines/LineSegments2.js';
import { LineSegmentsGeometry } from 'three/addons/lines/LineSegmentsGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { montar, A, B, R1, R2, ALTURA_EIXO, MM } from './montagem.js';
import { PECAS } from './pecas.js';
import { ESTADOS, CAMERAS, PADRAO } from './estados.js';

// Cena "maquina": o redutor de engrenagens.
// Contrato de cena (ver COMO_EDITAR.md): { group, states, defaults, cameras, cameraPadrao, apply, update, onPointer, onStop, reset, dispose }

const H = ALTURA_EIXO;
const clamp01 = (x) => Math.max(0, Math.min(1, x));
const easeInOut = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const janela = (v, [a, b]) => easeInOut(clamp01((v - a) / (b - a)));

const HACHURA_VERT = `
  varying vec3 vMundo;
  void main() {
    vec4 m = modelMatrix * vec4(position, 1.0);
    vMundo = m.xyz;
    gl_Position = projectionMatrix * viewMatrix * m;
  }`;
const HACHURA_FRAG = `
  uniform vec3 uFundo;
  uniform vec3 uLinha;
  uniform float uAngulo;
  uniform float uPasso;
  varying vec3 vMundo;
  void main() {
    vec2 p = vMundo.xz;
    float c = cos(uAngulo), s = sin(uAngulo);
    float d = (p.x * c + p.y * s) / uPasso;
    float w = fwidth(d);
    float f = abs(fract(d) - 0.5);
    float linha = 1.0 - smoothstep(0.09 - w, 0.09 + w, f);
    gl_FragColor = vec4(mix(uFundo, uLinha, linha * 0.85), 1.0);
  }`;

export function criarMaquina({ stage, annotations, materiais, globais, acento, gsap }) {
  const { raiz, pecas, coroa } = montar({ materiais, acento });
  const group = new THREE.Group();
  group.add(raiz);

  const info = new Map(PECAS.map((p) => [p.id, p]));
  const lista = [...pecas.values()];
  const todasMalhas = lista.flatMap((p) => p.meshes);

  // ---------- corte (plano de seção com tampa hachurada) ----------
  const plano = new THREE.Plane(new THREE.Vector3(0, -1, 0), 99);
  const CORTADAS = ['carcaca', 'tampa', 'rolamentos', 'retentor', 'parafusos', 'encoder'];
  for (const id of CORTADAS) {
    for (const m of pecas.get(id).mats) {
      m.clippingPlanes = [plano];
      m.clipShadows = true;
    }
  }
  const tampas = [];
  const COM_TAMPA = [
    ['carcaca', 0xd3cfc8, 0.785],
    ['tampa', 0xf0ece5, -0.785],
    ['encoder', 0x56524d, 0.4],
  ];
  COM_TAMPA.forEach(([id, cor, angulo], k) => {
    const p = pecas.get(id);
    const base = 1 + k * 3;
    const fundo = new THREE.Color(cor);
    const matCap = new THREE.ShaderMaterial({
      uniforms: {
        uFundo: { value: new THREE.Vector3(fundo.r, fundo.g, fundo.b) },
        uLinha: { value: new THREE.Vector3(0.16, 0.145, 0.13) },
        uAngulo: { value: angulo },
        uPasso: { value: 0.07 },
      },
      vertexShader: HACHURA_VERT,
      fragmentShader: HACHURA_FRAG,
      stencilWrite: true,
      stencilRef: 0,
      stencilFunc: THREE.NotEqualStencilFunc,
      stencilFail: THREE.ReplaceStencilOp,
      stencilZFail: THREE.ReplaceStencilOp,
      stencilZPass: THREE.ReplaceStencilOp,
    });
    const cap = new THREE.Mesh(new THREE.PlaneGeometry(9, 6), matCap);
    cap.rotation.x = -Math.PI / 2;
    cap.renderOrder = base + 1;
    cap.onAfterRender = (r) => r.clearStencil();
    cap.visible = false;
    raiz.add(cap);
    // malhas que só escrevem no stencil (frente decrementa, verso incrementa)
    const stencil = (lado, op) =>
      new THREE.MeshBasicMaterial({
        side: lado,
        clippingPlanes: [plano],
        colorWrite: false,
        depthWrite: false,
        depthTest: false,
        stencilWrite: true,
        stencilFunc: THREE.AlwaysStencilFunc,
        stencilFail: op,
        stencilZFail: op,
        stencilZPass: op,
      });
    const mVerso = stencil(THREE.BackSide, THREE.IncrementWrapStencilOp);
    const mFrente = stencil(THREE.FrontSide, THREE.DecrementWrapStencilOp);
    const extras = [];
    for (const it of p.itens) {
      if (id === 'encoder' && it.papel !== 'copo') continue;
      it.grupo.children.forEach((m) => {
        if (!m.isMesh) return;
        for (const mm of [mVerso, mFrente]) {
          const s = new THREE.Mesh(m.geometry, mm);
          s.renderOrder = base;
          s.position.copy(m.position);
          s.rotation.copy(m.rotation);
          s.visible = false;
          it.grupo.add(s);
          extras.push(s);
        }
      });
    }
    tampas.push({ cap, extras });
  });

  // ---------- modo "desenho técnico": contornos em tinta ----------
  const resolucao = new THREE.Vector2(stage.tamanho.w, stage.tamanho.h);
  const contornos = [];
  for (const p of lista) {
    const mLinha = new LineMaterial({ color: 0x191714, linewidth: 1.6, transparent: true, opacity: 0, resolution: resolucao, depthWrite: false });
    p.matLinha = mLinha;
    for (const m of p.meshes) {
      if (m.isInstancedMesh) continue;
      const geo = new LineSegmentsGeometry().fromEdgesGeometry(new THREE.EdgesGeometry(m.geometry, 28));
      const l = new LineSegments2(geo, mLinha);
      l.position.copy(m.position);
      l.rotation.copy(m.rotation);
      l.visible = false;
      l.renderOrder = 20;
      m.parent.add(l);
      contornos.push(l);
    }
  }
  stage.aoRedimensionar.add((w, h) => resolucao.set(w, h));

  // ---------- anotações ----------
  const P = { ...PADRAO };
  const tmp = new THREE.Vector3();
  const centros = new Map();
  group.updateMatrixWorld(true);
  for (const p of lista) {
    const it = p.itens[0];
    const box = new THREE.Box3();
    for (const m of it.grupo.children) if (m.isMesh && m.geometry) box.expandByObject(m);
    const c = box.getCenter(new THREE.Vector3());
    centros.set(p.id, it.grupo.worldToLocal(c.clone()));
  }
  const ancoraDe = (id) => () => {
    const it = pecas.get(id).itens[0];
    return tmp.copy(centros.get(id)).applyMatrix4(it.grupo.matrixWorld);
  };
  for (const dados of PECAS) {
    if (!pecas.has(dados.id)) continue;
    annotations.balao({
      numero: dados.numero,
      ancora: ancoraDe(dados.id),
      direcao: dados.balao,
      comprimento: dados.comprimento || 9,
      visivel: () => P.baloes * P.presenca * (selecionada && selecionada !== dados.id ? 0.35 : 1),
      destaque: () => (selecionada === dados.id ? 1 : 0),
    });
  }

  // pontos fixos (coordenadas do grupo raiz → mundo)
  const ponto = (x, y, z) => {
    const v = new THREE.Vector3();
    return () => v.set(x, y, z).applyMatrix4(raiz.matrixWorld);
  };
  const ra = coroa.ra;
  const fmt = (n) => String(n).replace('.', ',');
  const comIncerteza = (txt, inc) => () => (P.incerteza > 0.5 ? `${txt} ± ${inc} mm` : `${txt} mm`);
  // engrenagem: diâmetro externo e largura
  annotations.cota({
    de: ponto(B.x - ra, ra, 0.25),
    ate: ponto(B.x + ra, ra, 0.25),
    texto: comIncerteza(`Ø ${fmt(Math.round(ra * 2 * MM))}`, '0,05'),
    deslocamento: -4.5,
    visivel: () => P.cotas * P.presenca,
  });
  annotations.cota({
    de: ponto(B.x + ra, -0.15, 0.25),
    ate: ponto(B.x + ra, -0.15, -0.25),
    texto: `${Math.round(0.5 * MM)} mm`,
    deslocamento: 4,
    visivel: () => P.cotas * P.presenca,
  });
  annotations.rotulo({
    ancora: ponto(B.x + Math.cos(2.2) * ra * 0.97, Math.sin(2.2) * ra * 0.97, 0.25),
    texto: '24 dentes · módulo 2',
    direcao: [-1, -0.7],
    comprimento: 7,
    visivel: () => P.cotas * P.presenca,
  });
  // carcaça: comprimento e altura totais
  const xEsq = A.x - R1;
  const xDir = B.x + R2;
  annotations.cota({
    de: ponto(xEsq, R2 - 0.02, 0.58),
    ate: ponto(xDir, R2 - 0.02, 0.58),
    texto: comIncerteza(`${Math.round((xDir - xEsq) * MM)}`, '0,2'),
    deslocamento: -3.5,
    visivel: () => P.cotasCaixa * P.presenca,
  });
  annotations.cota({
    de: ponto(2.05, -H, 0.7),
    ate: ponto(2.05, R2, 0.7),
    texto: comIncerteza(`${Math.round((R2 + H) * MM)}`, '0,2'),
    deslocamento: -3.5,
    visivel: () => P.cotasCaixa * P.presenca,
  });
  // encoder
  const placaIt = pecas.get('encoder').itens.find((i) => i.papel === 'placa');
  const naPlaca = (x, y, z) => {
    const v = new THREE.Vector3();
    return () => v.set(x, y, z).applyMatrix4(placaIt.grupo.matrixWorld);
  };
  annotations.rotulo({ ancora: naPlaca(0, 0, -0.04), texto: 'Microcontrolador: guarda o firmware', direcao: [1, -1.2], comprimento: 11, visivel: () => P.rotulosPlaca * P.presenca });
  annotations.rotulo({ ancora: naPlaca(-0.13, -0.27, -0.07), texto: 'Conector: por onde passam os dados', direcao: [1, 0.7], comprimento: 9, visivel: () => P.rotulosPlaca * P.presenca });
  annotations.rotulo({
    ancora: () => tmp.set(0, 0, 0).applyMatrix4(pecas.get('encoder').itens.find((i) => i.papel === 'ima').grupo.matrixWorld),
    texto: 'Ímã no eixo: o sensor lê o giro',
    direcao: [1, 0.1],
    comprimento: 12,
    visivel: () => P.rotulosPlaca * P.presenca,
  });
  // dúvidas do estudo de caso: o que a forma não revela
  const DUVIDAS = [
    ['Qual aço?', 0.4, [1, -1]],
    ['Tratamento térmico?', 1.3, [1, -0.4]],
    ['Tolerâncias?', 3.6, [-1, 0.6]],
    ['Dureza dos dentes?', 2.4, [-1, -0.8]],
  ];
  DUVIDAS.forEach(([texto, ang, dir], i) => {
    annotations.rotulo({
      ancora: ponto(B.x + Math.cos(ang) * ra * 0.8, Math.sin(ang) * ra * 0.8, 0.25),
      texto,
      direcao: dir,
      comprimento: 7 + (i % 2) * 2,
      visivel: () => clamp01(P.perguntas * 1.6 - i * 0.18) * P.presenca,
    });
  });

  // ---------- seleção de peça ----------
  let selecionada = null;
  let sobre = null;
  const etiqueta = document.createElement('aside');
  etiqueta.className = 'etiqueta-peca';
  etiqueta.setAttribute('aria-live', 'polite');
  document.body.appendChild(etiqueta);
  const posicionarEtiqueta = () => {
    const u = annotations.u;
    etiqueta.style.right = `calc(var(--margem-x))`;
    etiqueta.style.bottom = `${u * 13}px`;
  };
  const selecionar = (id) => {
    selecionada = id;
    if (id) {
      const d = info.get(id);
      etiqueta.innerHTML = `<span class="etiqueta-peca__num">${d.numero}</span><h3>${d.nome}</h3><p>${d.funcao}</p>${d.nota ? `<small>${d.nota}</small>` : ''}`;
      posicionarEtiqueta();
      gsap.fromTo(etiqueta, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' });
    } else {
      gsap.to(etiqueta, { opacity: 0, duration: 0.3 });
    }
  };

  const acertar = (raio) => {
    const vis = todasMalhas.filter((m) => {
      let o = m;
      while (o) {
        if (!o.visible) return false;
        o = o.parent;
      }
      return true;
    });
    const hit = raio.intersectObjects(vis, false)[0];
    return hit?.object.userData.peca || null;
  };

  // ---------- estado animado ----------
  let angulo = 0;
  // aquecimento: nos primeiros quadros renderiza variantes (transparente, corte, contornos)
  // para o navegador compilar os shaders antes da apresentação começar — evita engasgos.
  let aquecer = 3;

  function apply(params) {
    Object.assign(P, params);
    group.visible = P.presenca > 0.01;
    if (!group.visible) return;
    if (P.interativo < 0.9 && selecionada) selecionar(null);

    // plano de corte: do alto até a linha dos eixos (coordenadas do mundo)
    const hCorte = THREE.MathUtils.lerp(R2 + 0.25, 0.0, easeInOut(clamp01(P.corte)));
    plano.constant = H + hCorte;
    const cortando = P.corte > 0.001;
    for (const t of tampas) {
      t.cap.visible = cortando;
      t.cap.position.y = hCorte;
      for (const e of t.extras) e.visible = cortando;
    }

    globais.uDigital.value = P.digital;
  }

  function update(dt) {
    if (!group.visible) return;
    angulo += dt * P.girar * 1.4;
    for (const p of lista) {
      // opacidade: isolamento (foco na engrenagem) + seleção
      let alpha = P.presenca;
      if (p.id !== 'coroa') alpha *= 1 - P.foco;
      const alvoSel = selecionada ? (selecionada === p.id ? 1 : 0) : 0;
      p.selecao += (alvoSel - p.selecao) * (1 - Math.exp(-dt * 8));
      if (selecionada && selecionada !== p.id) alpha *= 0.22;
      if (!selecionada && sobre && sobre !== p.id && P.interativo > 0.9) alpha *= 0.85;
      p.alpha += (alpha - p.alpha) * (1 - Math.exp(-dt * 7));
      const a = p.alpha;
      const transp = a < 0.995;
      for (const m of p.mats) {
        m.opacity = a;
        if (m.transparent !== transp) {
          m.transparent = transp;
          m.needsUpdate = true;
        }
        m.depthWrite = a > 0.6;
      }
      p.matLinha.opacity = P.digital * a;
      for (const it of p.itens) {
        it.grupo.visible = a > 0.01;
        const e = janela(P.explodir, it.janela);
        let ex = e;
        // placa (capítulo de software): abre o encoder
        if (p.id === 'encoder') {
          const k = easeInOut(clamp01(P.placa));
          if (it.papel === 'copo') {
            it.grupo.position.set(0.35 * k, 1.75 * k, -0.55 * k);
            it.grupo.rotation.x = -0.9 * k;
          } else if (it.papel === 'placa') {
            it.grupo.position.set(0, 0.1 * k, -0.62 * k);
            it.grupo.rotation.y = 0.45 * k;
          } else it.grupo.position.set(0, 0, 0);
          it.grupo.position.add(it.casa).addScaledVector(it.offset, ex);
        } else {
          it.grupo.position.copy(it.casa).addScaledVector(it.offset, ex);
        }
        it.grupo.position.y += p.selecao * 0.3;
        it.grupo.rotation.z = angulo * it.eixo + (it.giroExplodir ? -it.giroExplodir * e : 0);
      }
    }
    for (const l of contornos) l.visible = P.digital > 0.01 && l.parent.visible;

    if (aquecer > 0) {
      aquecer--;
      const transp = aquecer === 2;
      for (const p of lista) {
        for (const m of p.mats) {
          m.transparent = transp;
          m.needsUpdate = true;
        }
        for (const it of p.itens) it.grupo.visible = true;
      }
      for (const t of tampas) {
        t.cap.visible = aquecer > 0;
        for (const e of t.extras) e.visible = aquecer > 0;
      }
      for (const l of contornos) l.visible = aquecer > 0;
      if (aquecer > 0) group.visible = true;
    }
  }

  function onPointer(tipo, raio) {
    if (P.interativo < 0.9 || P.presenca < 0.5) {
      sobre = null;
      return false;
    }
    const id = acertar(raio);
    if (tipo === 'move') {
      sobre = id;
      return !!id;
    }
    if (tipo === 'click') selecionar(id && id !== selecionada ? id : null);
    return !!id;
  }

  return {
    group,
    defaults: PADRAO,
    states: ESTADOS,
    cameras: CAMERAS,
    cameraPadrao: 'tres-quartos',
    apply,
    update,
    onPointer,
    onStop() {
      if (selecionada && P.interativo < 0.9) selecionar(null);
    },
    reset() {
      selecionar(null);
    },
    dispose() {
      group.traverse((o) => {
        o.geometry?.dispose();
        if (o.material) [].concat(o.material).forEach((m) => m.dispose());
      });
      etiqueta.remove();
    },
  };
}
