import { gsap } from 'gsap';
import { parseCapitulo } from './markdown.js';

// Capítulos: lê os arquivos .md, monta as camadas de texto e a lista de "paradas".
// Uma parada = um capítulo ou um passo interno de um capítulo.

const CLIMA = { estudio: 0, 'estúdio': 0, holofote: 1 };

export function carregarCapitulos(conteudo) {
  return Object.keys(conteudo)
    .filter((caminho) => !/\/_[^/]*$/.test(caminho)) // arquivos que começam com _ são ignorados
    .sort((a, b) => a.localeCompare(b, 'pt-BR', { numeric: true }))
    .map((caminho) => parseCapitulo(conteudo[caminho], caminho.split('/').pop()));
}

export function montarParadas(capitulos, padrao = {}) {
  const paradas = [];
  capitulos.forEach((cap, ci) => {
    const d = cap.dados;
    let herdado = {
      cena: d.cena || padrao.cena,
      estado: d.estado || 'padrao',
      camera: d.camera || null,
      clima: d.clima || padrao.clima || 'estudio',
      layout: d.layout || 'esquerda',
    };
    cap.primeiraParada = paradas.length;
    cap.passos.forEach((passo, pi) => {
      // cada passo herda do anterior e pode sobrescrever: <!-- passo estado=x camera=y clima=z layout=w -->
      herdado = { ...herdado, ...passo.atributos };
      paradas.push({
        cap: ci,
        passo: pi,
        cena: herdado.cena,
        estado: herdado.estado,
        camera: herdado.camera,
        clima: CLIMA[herdado.clima] ?? 0,
        layout: herdado.layout,
      });
    });
    cap.nParadas = cap.passos.length;
  });
  return paradas;
}

const reduzido = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export class Chapters {
  constructor({ container, capitulos, paradas, aoIrPasso, aoAcao }) {
    this.container = container;
    this.capitulos = capitulos;
    this.paradas = paradas;
    this.aoIrPasso = aoIrPasso;
    this.aoAcao = aoAcao;
    this.atual = { cap: -1, passo: -1 };
    this.#construir();
  }

  #construir() {
    const total = this.capitulos.length;
    this.capitulos.forEach((cap, ci) => {
      const d = cap.dados;
      const el = document.createElement('section');
      const layout = d.layout || 'esquerda';
      const modo = d['passos-modo'] === 'troca' ? 'troca' : 'soma';
      el.className = `capitulo layout-${layout} passos-${modo}${d.destaque === 'sim' ? ' destaque' : ''}`;
      el.id = `capitulo-${String(ci + 1).padStart(2, '0')}`;
      el.setAttribute('aria-label', `Capítulo ${ci + 1} de ${total}`);
      const linhas = String(d.titulo || '')
        .split('|')
        .map((l) => `<span class="linha"><span>${l.trim()}</span></span>`)
        .join('');
      const Tag = ci === 0 ? 'h1' : 'h2';
      el.innerHTML = `
        <div class="capitulo__caixa">
          <header class="capitulo__cabeca">
            ${d.rotulo ? `<p class="capitulo__rotulo">${d.rotulo}</p>` : ''}
            <${Tag} class="capitulo__titulo">${linhas}</${Tag}>
          </header>
          <div class="capitulo__corpo">
            ${cap.passos.map((p, pi) => `<div class="passo" data-passo="${pi}" hidden>${p.html}</div>`).join('')}
          </div>
        </div>`;
      this.container.appendChild(el);
      cap.el = el;
      cap.modo = modo;
      cap.passosEls = [...el.querySelectorAll('.passo')];
      cap.linhas = [...el.querySelectorAll('.capitulo__titulo .linha > span')];
      cap.rotuloEl = el.querySelector('.capitulo__rotulo');
      cap.caixa = el.querySelector('.capitulo__caixa');
      cap.botoes = [...el.querySelectorAll('.botao')];
      // passos vazios (ex.: só mudam a câmera) não ocupam espaço
      cap.passosEls.forEach((p) => (p.dataset.vazio = p.textContent.trim() ? '' : 'sim'));

      for (const b of cap.botoes) {
        b.addEventListener('click', () => {
          if (b.dataset.passo != null) this.aoIrPasso?.(ci, Number(b.dataset.passo));
          if (b.dataset.acao != null) this.aoAcao?.(b.dataset.acao, ci);
          b.blur();
        });
      }
    });
  }

  mostrar(indiceParada) {
    const p = this.paradas[indiceParada];
    if (!p) return;
    const { cap, passo } = p;
    if (cap !== this.atual.cap) {
      if (this.atual.cap >= 0) this.#sair(this.capitulos[this.atual.cap]);
      this.#entrar(this.capitulos[cap], passo);
    } else if (passo !== this.atual.passo) {
      this.#passos(this.capitulos[cap], passo, passo > this.atual.passo);
    }
    this.atual = { cap, passo };
    for (const b of this.capitulos[cap].botoes) b.classList.toggle('ativo', b.dataset.passo != null && Number(b.dataset.passo) === passo);
  }

  #visiveis(cap, passo) {
    return cap.passosEls.filter((_, i) => (cap.modo === 'troca' ? i === passo : i <= passo));
  }

  #entrar(cap, passo) {
    const rm = reduzido();
    gsap.killTweensOf([cap.caixa, ...cap.linhas, cap.rotuloEl, ...cap.passosEls].filter(Boolean));
    cap.el.classList.add('visivel');
    gsap.set(cap.caixa, { opacity: 1, y: 0 });
    cap.passosEls.forEach((el, i) => {
      el.hidden = !this.#visiveis(cap, passo).includes(el);
    });

    if (rm) {
      gsap.fromTo(cap.caixa, { opacity: 0 }, { opacity: 1, duration: 0.4 });
      gsap.set(cap.linhas, { yPercent: 0 });
      return;
    }
    const tl = gsap.timeline({ delay: 0.28 });
    if (cap.rotuloEl) {
      tl.fromTo(cap.rotuloEl, { opacity: 0, '--traco-rotulo': 0 }, { opacity: 1, '--traco-rotulo': 1, duration: 0.9, ease: 'expo.out' }, 0);
    }
    tl.fromTo(
      cap.linhas,
      { yPercent: 112, letterSpacing: '0.02em' },
      { yPercent: 0, letterSpacing: '-0.012em', duration: 1.25, ease: 'expo.out', stagger: 0.09 },
      0.05,
    );
    let at = 0.45 + cap.linhas.length * 0.09;
    for (const bloco of this.#visiveis(cap, passo)) {
      at = this.#animarBloco(bloco, tl, at, true) + 0.12;
    }
    cap.tl = tl;
  }

  #sair(cap) {
    gsap.killTweensOf([cap.caixa, ...cap.linhas]);
    cap.tl?.kill();
    if (reduzido()) {
      cap.el.classList.remove('visivel');
      return;
    }
    gsap.to(cap.caixa, {
      opacity: 0,
      y: -14,
      duration: 0.38,
      ease: 'power2.in',
      onComplete: () => {
        cap.el.classList.remove('visivel');
        gsap.set(cap.caixa, { opacity: 1, y: 0 });
      },
    });
  }

  #passos(cap, passo, avancando) {
    const visiveis = this.#visiveis(cap, passo);
    const tl = gsap.timeline();
    let at = cap.modo === 'troca' ? 0.32 : 0.08;
    cap.passosEls.forEach((el) => {
      const deve = visiveis.includes(el);
      gsap.killTweensOf(el);
      if (deve && el.hidden) {
        if (cap.modo === 'troca') {
          // espera o anterior sair para ocupar o mesmo lugar
          gsap.delayedCall(at - 0.04, () => (el.hidden = false));
        } else el.hidden = false;
        at = this.#animarBloco(el, tl, at, avancando) + 0.1;
      } else if (!deve && !el.hidden) {
        gsap.to(el, {
          opacity: 0,
          y: avancando ? -12 : 12,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => {
            el.hidden = true;
            gsap.set(el, { opacity: 1, y: 0 });
          },
        });
      }
    });
  }

  // entrada coreografada de um bloco de passo; devolve o tempo em que termina
  #animarBloco(bloco, tl, at) {
    if (reduzido()) {
      tl.fromTo(bloco, { opacity: 0 }, { opacity: 1, duration: 0.3 }, at);
      return at + 0.3;
    }
    gsap.set(bloco, { opacity: 1, y: 0 });
    const filhos = [...bloco.children];
    for (const f of filhos) {
      if (f.classList.contains('fluxo')) {
        const reverso = f.classList.contains('fluxo--reverso');
        const partes = [...f.querySelectorAll('.fluxo__item, .fluxo__seta')];
        const ordem = reverso ? partes.reverse() : partes;
        const rot = f.querySelector('.fluxo__rotulo');
        if (rot) tl.fromTo(rot, { opacity: 0 }, { opacity: 1, duration: 0.5 }, at);
        ordem.forEach((el, i) => {
          const t0 = at + 0.1 + i * 0.16;
          if (el.classList.contains('fluxo__seta')) tl.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 0.45, ease: 'power3.inOut' }, t0);
          else tl.fromTo(el, { opacity: 0, x: reverso ? 18 : -18 }, { opacity: 1, x: 0, duration: 0.7, ease: 'expo.out' }, t0);
        });
        at += 0.2 + ordem.length * 0.16;
      } else if (f.classList.contains('lista')) {
        const itens = [...f.children];
        tl.fromTo(itens, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out', stagger: 0.09 }, at);
        at += 0.25 + itens.length * 0.09;
      } else if (f.classList.contains('prova')) {
        const giro = (Number(bloco.dataset.passo) % 2 ? 1 : -1) * 0.9;
        f.style.setProperty('--giro', `${giro}deg`);
        tl.fromTo(f, { opacity: 0, y: 46, rotate: giro * 3 }, { opacity: 1, y: 0, rotate: giro, duration: 0.9, ease: 'expo.out' }, at);
        const carimbo = f.querySelector('.carimbo');
        if (carimbo) {
          tl.fromTo(
            carimbo,
            { opacity: 0, scale: 1.9, rotate: -16 },
            { opacity: 1, scale: 1, rotate: -7, duration: 0.32, ease: 'power4.in' },
            at + 0.55,
          );
          tl.fromTo(f, { x: 0 }, { x: 2, duration: 0.06, yoyo: true, repeat: 1, ease: 'none' }, at + 0.87);
        }
        at += 1.0;
      } else {
        tl.fromTo(f, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out' }, at);
        at += 0.16;
      }
    }
    return at;
  }

  paradaDoHash(hash) {
    const m = String(hash).match(/capitulo-(\d+)/);
    if (!m) return null;
    const cap = this.capitulos[Number(m[1]) - 1];
    return cap ? cap.primeiraParada : null;
  }
}
