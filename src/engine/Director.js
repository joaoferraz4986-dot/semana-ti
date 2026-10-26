import * as THREE from 'three';

// Diretor: transforma a posição de rolagem (t = índice fracionário da parada)
// em câmera, clima e parâmetros das cenas. Tudo é FUNÇÃO de t,
// então voltar ou pular para qualquer ponto sempre reconstrói o mesmo quadro.

// Deslocamento do enquadramento por layout: empurra o objeto para o lado oposto ao texto.
export const DESLOCAMENTOS = {
  esquerda: { x: -0.17, y: 0 },
  direita: { x: 0.17, y: 0 },
  centro: { x: 0, y: 0 },
  inferior: { x: 0, y: 0.17 },
  topo: { x: 0, y: -0.14 },
  rodape: { x: 0, y: 0.2 },
  painel: { x: 0.02, y: 0 },
};

const suave = (f) => f * f * (3 - 2 * f);
const curva = (f) => THREE.MathUtils.lerp(f, suave(f), 0.65);

const _off = new THREE.Vector3();
const _sa = new THREE.Spherical();
const _sb = new THREE.Spherical();
const _right = new THREE.Vector3();
const _up = new THREE.Vector3();

function interpolarParams(a, b, f) {
  const out = {};
  for (const k in a) out[k] = typeof a[k] === 'number' && typeof b[k] === 'number' ? a[k] + (b[k] - a[k]) * f : f < 0.5 ? a[k] : b[k];
  for (const k in b) if (!(k in out)) out[k] = b[k];
  return out;
}

export class Director {
  constructor({ stage, moods, paradas, cenas, reduzido = false }) {
    this.stage = stage;
    this.moods = moods;
    this.paradas = paradas;
    this.cenas = cenas; // { nome: instancia }
    this.reduzido = reduzido;

    this.pos = new THREE.Vector3();
    this.alvo = new THREE.Vector3();
    this.fov = 30;
    this.desl = { x: 0, y: 0 };
    this.desejo = { pos: new THREE.Vector3(), alvo: new THREE.Vector3(), fov: 30, desl: { x: 0, y: 0 } };

    this.ponteiro = { x: 0, y: 0, sx: 0, sy: 0 };
    this.intro = 1; // multiplicador de luz da abertura
    this.primeiro = true;
    if (!reduzido) {
      window.addEventListener('pointermove', (e) => {
        this.ponteiro.x = (e.clientX / window.innerWidth) * 2 - 1;
        this.ponteiro.y = (e.clientY / window.innerHeight) * 2 - 1;
      });
    }
  }

  // Abertura: o objeto surge do escuro (só quando a apresentação começa na parada 0)
  iniciarIntro(gsap) {
    if (this.reduzido) return;
    this.intro = 0;
    this.dollyIntro = 1;
    gsap.to(this, { intro: 1, duration: 4.2, ease: 'power2.inOut', delay: 0.3 });
    gsap.to(this, { dollyIntro: 0, duration: 6, ease: 'power3.out' });
  }

  resetarParallax() {
    this.ponteiro.x = this.ponteiro.y = this.ponteiro.sx = this.ponteiro.sy = 0;
  }

  #camera(p) {
    return p.camera;
  }

  update(t, dt) {
    const n = this.paradas.length;
    const tc = THREE.MathUtils.clamp(t, 0, n - 1);
    const i0 = Math.floor(tc);
    const i1 = Math.min(n - 1, i0 + 1);
    const fr = tc - i0;
    const f = curva(fr);
    const A = this.paradas[i0];
    const B = this.paradas[i1];

    // --- câmera: interpolação esférica em torno do alvo (movimento orbital, não atravessa o objeto)
    const ca = this.#camera(A);
    const cb = this.#camera(B);
    const d = this.desejo;
    d.alvo.lerpVectors(ca.alvo, cb.alvo, f);
    _sa.setFromVector3(_off.subVectors(ca.pos, ca.alvo));
    _sb.setFromVector3(_off.subVectors(cb.pos, cb.alvo));
    let dTheta = _sb.theta - _sa.theta;
    if (dTheta > Math.PI) dTheta -= Math.PI * 2;
    if (dTheta < -Math.PI) dTheta += Math.PI * 2;
    _sa.set(
      THREE.MathUtils.lerp(_sa.radius, _sb.radius, f),
      THREE.MathUtils.lerp(_sa.phi, _sb.phi, f),
      _sa.theta + dTheta * f,
    );
    d.pos.setFromSpherical(_sa).add(d.alvo);
    d.fov = THREE.MathUtils.lerp(ca.fov, cb.fov, f);
    d.desl.x = THREE.MathUtils.lerp(A.desl.x, B.desl.x, f);
    d.desl.y = THREE.MathUtils.lerp(A.desl.y, B.desl.y, f);

    if (this.dollyIntro) {
      _off.subVectors(d.pos, d.alvo).multiplyScalar(this.dollyIntro * 0.35);
      d.pos.add(_off);
    }

    // amortecimento: absorve trancos sem acumular erro (sempre persegue o alvo calculado)
    const k = this.primeiro || this.reduzido ? 1 : 1 - Math.exp(-dt * 6.5);
    this.primeiro = false;
    this.pos.lerp(d.pos, k);
    this.alvo.lerp(d.alvo, k);
    this.fov += (d.fov - this.fov) * k;
    this.desl.x += (d.desl.x - this.desl.x) * k;
    this.desl.y += (d.desl.y - this.desl.y) * k;

    // parallax leve do ponteiro
    const p = this.ponteiro;
    const kp = 1 - Math.exp(-dt * 2.2);
    p.sx += (p.x - p.sx) * kp;
    p.sy += (p.y - p.sy) * kp;

    const st = this.stage;
    if (st) {
      const cam = st.camera;
      cam.position.copy(this.pos);
      cam.lookAt(this.alvo);
      const dist = this.pos.distanceTo(this.alvo);
      _right.setFromMatrixColumn(cam.matrix, 0);
      _up.setFromMatrixColumn(cam.matrix, 1);
      // parallax quase imperceptível (só dá vida; nada reage a clique)
      cam.position.addScaledVector(_right, p.sx * dist * 0.005).addScaledVector(_up, -p.sy * dist * 0.003);
      cam.lookAt(this.alvo);
      const { w, h } = st.tamanho;
      // telas mais estreitas que 16:9 (ex.: 16:10, 4:3): abre a lente para manter a largura do enquadramento
      const aspecto = w / h;
      cam.fov = aspecto < 16 / 9 ? THREE.MathUtils.radToDeg(2 * Math.atan((Math.tan(THREE.MathUtils.degToRad(this.fov / 2)) * (16 / 9)) / aspecto)) : this.fov;
      cam.setViewOffset(w, h, this.desl.x * w, this.desl.y * h, w, h);
      cam.updateProjectionMatrix();
      // o holofote ilumina aquilo para onde a câmera olha
      st.focar?.(this.alvo);
    }

    // --- clima
    const clima = THREE.MathUtils.lerp(A.clima, B.clima, suave(fr));
    this.moods.aplicar(clima, this.intro, dt);
    this.clima = clima;

    // --- cenas
    for (const nome in this.cenas) {
      const pa = A.params[nome];
      const pb = B.params[nome];
      if (!pa || !pb) continue;
      const params = interpolarParams(pa, pb, f);
      this.cenas[nome].apply?.(params, { clima, t: tc });
    }
  }
}
