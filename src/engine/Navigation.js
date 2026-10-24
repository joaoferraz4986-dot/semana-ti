import Lenis from 'lenis';

// Navegação híbrida: rolagem livre (Lenis) + setas/passador que vão de parada em parada.
// Cada parada ocupa exatamente 1 altura de tela no trilho de rolagem.
// t = scrollY / alturaDaTela  →  índice fracionário da parada (0 = primeira).

// ease cinematográfico (quart in-out)
const easeCinema = (x) => (x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2);

const PROXIMO = new Set(['ArrowRight', 'ArrowDown', 'PageDown', ' ', 'Spacebar']);
const ANTERIOR = new Set(['ArrowLeft', 'ArrowUp', 'PageUp']);
const PASSADOR = new Set(['PageUp', 'PageDown']);

function digitando(el) {
  if (!el || el === document.body) return false;
  const tag = el.tagName;
  if (el.isContentEditable || tag === 'TEXTAREA' || tag === 'SELECT') return true;
  if (tag === 'INPUT') return true; // inclui sliders (type=range)
  if (el.getAttribute?.('role') === 'slider') return true;
  return false;
}

export class Navigation {
  constructor({ total, trilho, reduzido = false, aoMudarParada }) {
    this.total = total;
    this.trilho = trilho;
    this.reduzido = reduzido;
    this.aoMudarParada = aoMudarParada;
    this.t = 0;
    this.ativa = -1;
    this.alvo = null; // parada para onde estamos indo (teclas acumulam a partir dela)
    this.ultimaEntrada = 0;
    this.atalhos = {}; // tecla → função (F, Q, H, R…)

    history.scrollRestoration = 'manual';
    this.#dimensionar();
    window.addEventListener('resize', () => {
      const parada = Math.round(this.t);
      this.#dimensionar();
      this.irPara(parada, { imediato: true });
    });

    this.lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.75,
      touchMultiplier: 1.4,
      smoothWheel: !reduzido,
    });
    this.lenis.on('scroll', () => {
      this.#atualizarT();
    });
    const marcar = () => {
      this.ultimaEntrada = performance.now();
      // o usuário assumiu a rolagem: cancela qualquer animação nossa
      this.animando = false;
      this.porTecla = false;
      this.alvo = null;
    };
    window.addEventListener('wheel', marcar, { passive: true });
    window.addEventListener('touchmove', marcar, { passive: true });

    window.addEventListener('keydown', (e) => this.#tecla(e));
    window.addEventListener('hashchange', () => {
      const p = this.paradaDoHash?.(location.hash);
      if (p != null && p !== Math.round(this.t)) this.irPara(p);
    });
  }

  #dimensionar() {
    this.alturaTela = window.innerHeight;
    this.trilho.style.height = `${(this.total - 1) * this.alturaTela + window.innerHeight}px`;
  }

  #atualizarT() {
    const y = this.lenis ? this.lenis.animatedScroll : window.scrollY;
    this.t = Math.max(0, Math.min(this.total - 1, y / this.alturaTela));
    const ativa = Math.round(this.t);
    if (ativa !== this.ativa) {
      const anterior = this.ativa;
      this.ativa = ativa;
      this.aoMudarParada?.(ativa, anterior);
    }
  }

  irPara(parada, { imediato = false, duracao } = {}) {
    parada = Math.max(0, Math.min(this.total - 1, parada));
    const y = parada * this.alturaTela;
    const distancia = Math.abs(parada - this.t);
    if (imediato || this.reduzido) {
      this.lenis.scrollTo(y, { immediate: true, force: true });
      this.alvo = null;
      this.#atualizarT();
      return;
    }
    this.alvo = parada;
    this.animando = true;
    this.porTecla = true;
    this.lenis.scrollTo(y, {
      duration: duracao ?? Math.min(2.4, 1.35 + Math.max(0, distancia - 1) * 0.18),
      easing: easeCinema,
      force: true,
      onComplete: () => {
        this.animando = false;
        this.porTecla = false;
        this.alvo = null;
      },
    });
  }

  proxima() {
    const base = this.alvo ?? Math.round(this.t);
    this.irPara(base + 1);
  }
  anterior() {
    const base = this.alvo ?? Math.round(this.t);
    this.irPara(base - 1);
  }

  #tecla(e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const el = document.activeElement;
    const k = e.key;
    if (digitando(el) && !PASSADOR.has(k)) return;
    // espaço/enter num botão focado: deixa o botão agir
    if ((k === ' ' || k === 'Enter') && el?.tagName === 'BUTTON') return;

    if (PROXIMO.has(k)) {
      e.preventDefault();
      this.proxima();
    } else if (ANTERIOR.has(k)) {
      e.preventDefault();
      this.anterior();
    } else if (k === 'Home') {
      e.preventDefault();
      this.irPara(0);
    } else if (k === 'End') {
      e.preventDefault();
      this.irPara(this.total - 1);
    } else {
      const fn = this.atalhos[k.toLowerCase()];
      if (fn) {
        e.preventDefault();
        fn(e);
      }
    }
  }

  // chamado a cada quadro
  update(tempo) {
    this.lenis.raf(tempo);
    this.#atualizarT();
    // assentamento suave: quando o usuário para de rolar entre duas paradas,
    // a página desliza gentilmente até a mais próxima
    if (!this.animando && !this.reduzido) {
      const parado = performance.now() - this.ultimaEntrada > 260 && Math.abs(this.lenis.velocity) < 0.08;
      const perto = Math.round(this.t);
      if (parado && Math.abs(this.t - perto) > 0.004) {
        this.animando = true;
        this.porTecla = false;
        this.lenis.scrollTo(perto * this.alturaTela, {
          duration: 0.9,
          easing: (x) => 1 - Math.pow(1 - x, 3),
          onComplete: () => {
            this.animando = false;
          },
        });
      }
    }
  }
}
