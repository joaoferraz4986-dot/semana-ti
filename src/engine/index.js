import * as THREE from 'three';
import { gsap } from 'gsap';
import './styles/tokens.css';
import './styles/base.css';
import './styles/layouts.css';

import { Stage, ORDEM_QUALIDADE, QUALIDADES } from './Stage.js';
import { Moods } from './Moods.js';
import { Director, DESLOCAMENTOS } from './Director.js';
import { Navigation } from './Navigation.js';
import { Chapters, carregarCapitulos, montarParadas } from './Chapters.js';
import { Annotations } from './Annotations.js';
import { materiais, globais } from './materials.js';
import { Progress } from './ui/Progress.js';
import { Help } from './ui/Help.js';
import { Toast } from './ui/Toast.js';
import { ILUSTRACAO_PADRAO } from './fallback.js';

const CAMERA_PADRAO = { pos: [7, 4, 10], alvo: [0, 1.2, 0], fov: 30 };

const ler = (k, padrao) => {
  try {
    return localStorage.getItem(k) ?? padrao;
  } catch {
    return padrao;
  }
};
const gravar = (k, v) => {
  try {
    localStorage.setItem(k, v);
  } catch {
    /* modo privado: ignora */
  }
};

function camera(def) {
  const c = def || CAMERA_PADRAO;
  return { pos: new THREE.Vector3(...c.pos), alvo: new THREE.Vector3(...c.alvo), fov: c.fov ?? 30 };
}

/**
 * Inicia uma apresentação.
 * @param {object} config  ver src/presentations/<nome>/config.js
 */
export function iniciarApresentacao(config) {
  const raiz = document.documentElement;
  raiz.style.setProperty('--acento', config.acento || '#e4572e');
  if (config.titulo) document.title = config.titulo;
  const reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- conteúdo ----------
  const capitulos = carregarCapitulos(config.conteudo);
  const paradas = montarParadas(capitulos, { cena: config.cenaPadrao, clima: config.climaPadrao });

  // ---------- DOM ----------
  const body = document.body;
  const palco = document.createElement('div');
  palco.className = 'palco';
  const grao = document.createElement('div');
  grao.className = 'grao';
  const camada = document.createElement('main');
  camada.className = 'capitulos';
  const trilho = document.createElement('div');
  trilho.className = 'trilho';
  body.append(palco, grao, camada, trilho);

  const toast = new Toast(body);

  // ---------- 3D (com fallback) ----------
  let stage = null;
  try {
    stage = new Stage(palco, {
      qualidade: ler('qualidade', 'media'),
      aoPerderContexto: (perdido) => toast.mostrar(perdido ? 'Recuperando o 3D…' : '3D recuperado'),
    });
  } catch (err) {
    console.warn('[apresentação] WebGL indisponível, usando ilustração estática.', err);
    body.classList.add('sem-webgl');
    palco.innerHTML = config.ilustracao || ILUSTRACAO_PADRAO;
  }

  const annotations = stage ? new Annotations(body) : null;
  const moods = new Moods(stage, config.climas);
  const cenas = {};
  if (stage) {
    for (const [nome, criar] of Object.entries(config.cenas || {})) {
      const usada = paradas.some((p) => p.cena === nome);
      if (!usada) continue;
      const cena = criar({ stage, THREE, gsap, annotations, materiais, globais, acento: config.acento, reduzido });
      cena.nome = nome;
      stage.scene.add(cena.group);
      cenas[nome] = cena;
    }
  }

  // ---------- resolve cada parada: câmera, enquadramento e parâmetros das cenas ----------
  const avisados = new Set();
  const avisar = (p, msg) => {
    const txt = `[conteúdo] ${capitulos[p.cap].arquivo}: ${msg}`;
    if (!avisados.has(txt)) console.warn(txt);
    avisados.add(txt);
  };
  for (const p of paradas) {
    const cena = cenas[p.cena];
    if (stage && p.cena && !cena && !config.cenas?.[p.cena]) avisar(p, `cena "${p.cena}" não existe`);
    let cam = p.camera && (cena?.cameras?.[p.camera] || config.cameras?.[p.camera]);
    if (p.camera && !cam && stage) avisar(p, `câmera "${p.camera}" não existe — usando a padrão`);
    cam = cam || cena?.cameras?.[cena.cameraPadrao] || config.cameras?.padrao || CAMERA_PADRAO;
    p.camera = camera(cam);
    p.desl = DESLOCAMENTOS[p.layout] || DESLOCAMENTOS.esquerda;
    p.params = {};
    if (cena && p.estado && p.estado !== 'padrao' && !cena.states?.[p.estado]) avisar(p, `estado "${p.estado}" não existe na cena "${p.cena}"`);
  }
  for (const nome in cenas) {
    const cena = cenas[nome];
    const base = cena.defaults || {};
    const ativas = paradas.map((p, i) => (p.cena === nome ? i : -1)).filter((i) => i >= 0);
    paradas.forEach((p, i) => {
      let fonte = i;
      if (p.cena !== nome) {
        // fora da cena: mantém o estado da parada ativa mais próxima, mas invisível
        fonte = ativas.reduce((m, j) => (Math.abs(j - i) < Math.abs(m - i) ? j : m), ativas[0]);
      }
      const est = paradas[fonte].estado;
      p.params[nome] = { ...base, ...(cena.states?.[est] || {}), presenca: p.cena === nome ? 1 : 0 };
    });
  }

  // ---------- peças do motor ----------
  const director = new Director({ stage, moods, paradas, cenas, reduzido });
  let nav;
  const chapters = new Chapters({
    container: camada,
    capitulos,
    paradas,
  });
  const progresso = new Progress(body, capitulos);
  const ajuda = new Help(body, config.titulo || 'Apresentação');

  // ---------- tema claro/escuro (tecla D) ----------
  const aplicarTema = (escuro, { aviso = false } = {}) => {
    document.documentElement.classList.toggle('tema-escuro', escuro);
    moods.setTema(escuro, { imediato: true });
    gravar('tema', escuro ? 'escuro' : 'claro');
    if (aviso) toast.mostrar(escuro ? 'Tema escuro' : 'Tema claro');
  };
  aplicarTema(ler('tema', 'claro') === 'escuro');

  let ultimoHash = '';
  nav = new Navigation({
    total: paradas.length,
    trilho,
    reduzido,
    aoMudarParada: (i, anterior) => {
      chapters.mostrar(i);
      const p = paradas[i];
      const hash = `#capitulo-${String(p.cap + 1).padStart(2, '0')}`;
      if (hash !== ultimoHash) {
        ultimoHash = hash;
        history.replaceState(null, '', hash);
      }
      for (const nome in cenas) cenas[nome].onStop?.(p, paradas[anterior]);
      if (reduzido && anterior >= 0) gsap.fromTo(palco, { opacity: 0.2 }, { opacity: 1, duration: 0.45 });
    },
  });
  nav.paradaDoHash = (h) => chapters.paradaDoHash(h);

  // ---------- atalhos ----------
  const trocarQualidade = (chave, motivo = '') => {
    if (!stage) return;
    stage.setQualidade(chave);
    gravar('qualidade', chave);
    toast.mostrar(`Qualidade: ${QUALIDADES[chave].nome}${motivo}`);
  };
  nav.atalhos = {
    f: () => {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen?.().catch(() => {});
      else document.exitFullscreen?.();
    },
    q: () => {
      if (!stage) return toast.mostrar('Modo sem 3D');
      const i = ORDEM_QUALIDADE.indexOf(stage.qualidade);
      trocarQualidade(ORDEM_QUALIDADE[(i + 1) % ORDEM_QUALIDADE.length]);
      fps.quedas = 99; // escolha manual: desliga o ajuste automático
    },
    d: () => aplicarTema(ler('tema', 'claro') !== 'escuro', { aviso: true }),
    h: () => ajuda.alternar(),
    r: () => {
      director.resetarParallax();
      for (const nome in cenas) cenas[nome].reset?.();
      nav.irPara(Math.round(nav.t));
      toast.mostrar('Câmera recentralizada');
    },
    escape: () => ajuda.alternar(false),
  };

  // ---------- estado inicial ----------
  const inicial = chapters.paradaDoHash(location.hash) ?? 0;
  nav.irPara(inicial, { imediato: true });
  if (nav.ativa !== inicial || chapters.atual.cap < 0) chapters.mostrar(inicial);
  if (inicial === 0) director.iniciarIntro(gsap);

  // ---------- monitor de desempenho: baixa um nível se o FPS ficar baixo ----------
  const fps = { quadros: 0, desde: performance.now() + 4000, ruins: 0, quedas: 0 };
  const medirFps = (agora) => {
    if (!stage || document.hidden) return;
    if (agora < fps.desde) return;
    fps.quadros++;
    const dur = agora - fps.desde;
    if (dur < 3000) return;
    const media = (fps.quadros * 1000) / dur;
    fps.quadros = 0;
    fps.desde = agora;
    fps.ruins = media < 42 ? fps.ruins + 1 : 0;
    if (fps.ruins >= 2 && fps.quedas < 2) {
      const i = ORDEM_QUALIDADE.indexOf(stage.qualidade);
      if (i < ORDEM_QUALIDADE.length - 1) {
        fps.quedas++;
        fps.ruins = 0;
        trocarQualidade(ORDEM_QUALIDADE[i + 1], ' (automático)');
      }
    }
  };
  document.addEventListener('visibilitychange', () => {
    fps.desde = performance.now() + 1500;
    fps.quadros = 0;
  });

  // ---------- laço principal ----------
  let anterior = performance.now();
  const quadro = (agora) => {
    // (o primeiro quadro pode vir com horário anterior ao início: nunca deixa dt negativo)
    const dt = Math.max(0, Math.min(0.1, (agora - anterior) / 1000));
    anterior = agora;
    nav.update(agora);
    director.update(nav.t, dt);
    for (const nome in cenas) cenas[nome].update?.(dt, agora / 1000);
    progresso.update(nav.t);
    if (stage) {
      annotations.update(stage.camera, stage.tamanho.w, stage.tamanho.h);
      stage.render();
    }
    medirFps(agora);
    requestAnimationFrame(quadro);
  };
  requestAnimationFrame(quadro);

  // útil para depurar no console: window.apresentacao
  window.apresentacao = { stage, nav, director, cenas, paradas, capitulos };
  return window.apresentacao;
}
