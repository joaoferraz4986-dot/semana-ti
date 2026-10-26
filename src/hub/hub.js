import '../engine/styles/tokens.css';
import '../engine/styles/base.css';
import './hub.css';
import lista from './apresentacoes.js';

// Tema claro/escuro: mesma tecla (D) que a das apresentações, mesma memória
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
document.documentElement.classList.toggle('tema-escuro', ler('tema', 'claro') === 'escuro');

const ul = document.querySelector('.hub__lista');
ul.innerHTML = lista
  .map((a, i) => {
    const miolo = `
      <span class="hub__marca" aria-hidden="true"></span>
      <span><span class="hub__nome">${a.titulo}</span><span class="hub__resumo">${a.resumo}</span></span>
      <span class="hub__acao">${a.pronta ? `Abrir <kbd>${i + 1}</kbd>` : 'Em preparação'}</span>`;
    return `<li class="hub__item${a.pronta ? '' : ' indisponivel'}" style="--cor:${a.acento}">${
      a.pronta ? `<a href="./${a.pasta}/">${miolo}</a>` : `<div>${miolo}</div>`
    }</li>`;
  })
  .join('');

const links = [...ul.querySelectorAll('a')];
links[0]?.focus();
window.addEventListener('keydown', (e) => {
  const n = Number(e.key);
  if (n >= 1 && n <= lista.length && lista[n - 1].pronta) location.href = `./${lista[n - 1].pasta}/`;
  // D troca o tema claro/escuro (mesmo atalho das apresentações)
  if (e.key.toLowerCase() === 'd') {
    const escuro = ler('tema', 'claro') !== 'escuro';
    document.documentElement.classList.toggle('tema-escuro', escuro);
    gravar('tema', escuro ? 'escuro' : 'claro');
  }
  const i = links.indexOf(document.activeElement);
  if (['ArrowDown', 'ArrowRight', 'PageDown'].includes(e.key)) {
    e.preventDefault();
    links[Math.min(links.length - 1, i + 1)]?.focus();
  }
  if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.key)) {
    e.preventDefault();
    links[Math.max(0, i - 1)]?.focus();
  }
});
