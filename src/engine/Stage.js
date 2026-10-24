import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

// Palco: renderer, cena, câmera, luz de estúdio, chão infinito com sombra,
// níveis de qualidade e recuperação de perda de contexto WebGL.

export const QUALIDADES = {
  alta: { nome: 'Alta', dpr: 1.5, larguraMax: 3840, sombra: 2048, sombraSpot: true },
  media: { nome: 'Média', dpr: 1.0, larguraMax: 2560, sombra: 1024, sombraSpot: true },
  baixa: { nome: 'Baixa', dpr: 0.75, larguraMax: 1600, sombra: 512, sombraSpot: false },
};
export const ORDEM_QUALIDADE = ['alta', 'media', 'baixa'];

function texturaRadial(stops, tamanho = 256) {
  const c = document.createElement('canvas');
  c.width = c.height = tamanho;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(tamanho / 2, tamanho / 2, 0, tamanho / 2, tamanho / 2, tamanho / 2);
  for (const [o, cor] of stops) grad.addColorStop(o, cor);
  g.fillStyle = grad;
  g.fillRect(0, 0, tamanho, tamanho);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export class Stage {
  constructor(container, { qualidade = 'media', aoPerderContexto } = {}) {
    this.container = container;
    this.aoPerderContexto = aoPerderContexto;

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance', stencil: true });
    if (!renderer.getContext()) throw new Error('WebGL indisponível');
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.VSMShadowMap;
    renderer.localClippingEnabled = true;
    container.appendChild(renderer.domElement);
    this.renderer = renderer;
    this.canvas = renderer.domElement;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(30, 1, 0.1, 120);
    this.camera.position.set(6, 3, 10);

    this.#criarAmbiente();
    this.#criarLuzes();
    this.#criarChao();

    this.tamanho = { w: 1, h: 1 };
    this.aoRedimensionar = new Set();
    this.setQualidade(qualidade);
    this.redimensionar();
    window.addEventListener('resize', () => this.redimensionar());

    this.canvas.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
      this.perdido = true;
      this.aoPerderContexto?.(true);
    });
    this.canvas.addEventListener('webglcontextrestored', () => {
      this.perdido = false;
      this.#criarAmbiente();
      this.aoPerderContexto?.(false);
    });
  }

  #criarAmbiente() {
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    const sala = new RoomEnvironment();
    this.scene.environment?.dispose?.();
    this.scene.environment = pmrem.fromScene(sala, 0.04).texture;
    sala.traverse((o) => {
      o.geometry?.dispose();
      o.material?.dispose?.();
    });
    pmrem.dispose();
  }

  #criarLuzes() {
    const s = this.scene;
    // luz principal: um "softbox" grande, alto, à esquerda
    const chave = new THREE.DirectionalLight(0xfff4e8, 2.6);
    chave.position.set(-5, 9, 6);
    chave.castShadow = true;
    const sc = chave.shadow.camera;
    // o frustum da sombra cobre todo o chão (senão aparece uma linha na borda)
    sc.left = -19;
    sc.right = 19;
    sc.top = 19;
    sc.bottom = -19;
    sc.near = 1;
    sc.far = 30;
    chave.shadow.radius = 14;
    chave.shadow.blurSamples = 20;
    chave.shadow.bias = -0.0004;
    s.add(chave, chave.target);

    // preenchimento suave à direita
    const preench = new THREE.DirectionalLight(0xf1ece6, 0.6);
    preench.position.set(7, 3, 4);
    s.add(preench);

    // contra-luz para recortar silhuetas
    const recorte = new THREE.DirectionalLight(0xfff0dc, 0.4);
    recorte.position.set(2, 5, -8);
    s.add(recorte);

    // holofote de museu
    const spot = new THREE.SpotLight(0xffe7cc, 0, 40, 0.34, 0.85, 0);
    spot.position.set(1.2, 11, 3.2);
    spot.castShadow = true;
    spot.shadow.radius = 10;
    spot.shadow.blurSamples = 16;
    spot.shadow.bias = -0.0004;
    spot.shadow.camera.near = 4;
    spot.shadow.camera.far = 22;
    s.add(spot, spot.target);

    this.luzes = { chave, preench, recorte, spot };
  }

  #criarChao() {
    // chão infinito: só recebe sombra, a cor vem do fundo (clear color)
    const sombra = new THREE.Mesh(
      new THREE.PlaneGeometry(30, 30),
      new THREE.ShadowMaterial({ color: 0x2a2219, opacity: 0.3 }),
    );
    sombra.rotation.x = -Math.PI / 2;
    sombra.receiveShadow = true;
    sombra.renderOrder = -2;

    // sombra de contato (oclusão no ponto em que o objeto toca o chão)
    const contato = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({
        map: texturaRadial([
          [0, 'rgba(20,16,12,0.9)'],
          [0.45, 'rgba(20,16,12,0.38)'],
          [1, 'rgba(20,16,12,0)'],
        ]),
        transparent: true,
        depthWrite: false,
        toneMapped: false,
      }),
    );
    contato.rotation.x = -Math.PI / 2;
    contato.position.y = 0.002;
    contato.scale.set(5.5, 3.6, 1);
    contato.renderOrder = -1;

    // poça de luz do holofote no chão
    const poca = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({
        map: texturaRadial([
          [0, 'rgba(255,236,214,0.30)'],
          [0.4, 'rgba(255,236,214,0.13)'],
          [1, 'rgba(255,236,214,0)'],
        ]),
        transparent: true,
        depthWrite: false,
        toneMapped: false,
      }),
    );
    poca.rotation.x = -Math.PI / 2;
    poca.position.set(0.3, 0.001, 0.6);
    poca.scale.set(13, 10, 1);
    poca.renderOrder = -3;

    this.scene.add(poca, sombra, contato);
    this.chao = { sombra, contato, poca };
    this.scene.fog = new THREE.Fog(0xece8e1, 18, 48);
  }

  // posiciona o holofote (e a poça de luz no chão) sobre um ponto da cena
  focar(alvo) {
    const { spot } = this.luzes;
    spot.position.set(alvo.x + 1.2, 11, alvo.z + 3.2);
    spot.target.position.set(alvo.x, 0, alvo.z);
    this.chao.poca.position.set(alvo.x + 0.3, 0.001, alvo.z + 0.6);
  }

  setQualidade(chave) {
    const q = QUALIDADES[chave] || QUALIDADES.media;
    this.qualidade = chave in QUALIDADES ? chave : 'media';
    this.q = q;
    const { chave: luz, spot } = this.luzes;
    luz.shadow.mapSize.set(q.sombra, q.sombra);
    spot.shadow.mapSize.set(q.sombra, q.sombra);
    luz.shadow.map?.dispose();
    luz.shadow.map = null;
    spot.shadow.map?.dispose();
    spot.shadow.map = null;
    spot.castShadow = q.sombraSpot;
    this.redimensionar();
  }

  redimensionar() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.tamanho = { w, h };
    const dpr = Math.min(window.devicePixelRatio || 1, this.q.dpr, this.q.larguraMax / w);
    this.renderer.setPixelRatio(Math.max(0.5, dpr));
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    for (const fn of this.aoRedimensionar) fn(w, h);
  }

  render() {
    if (this.perdido) return;
    this.renderer.render(this.scene, this.camera);
  }
}
