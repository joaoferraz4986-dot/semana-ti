// Configuração da apresentação "Redes neurais".
import { criarRedes } from './cenas/redes/index.js';

export default {
  titulo: 'Redes neurais · Semana de TI',
  // cobalto = máquina/artificial (terracota, a cor do humano, é usada nas formas orgânicas)
  acento: '#2f4fd8',
  climaPadrao: 'estudio',
  cenaPadrao: 'redes',

  // Capítulos: todos os .md da pasta conteudo/, em ordem alfabética do nome do arquivo.
  conteudo: import.meta.glob('./conteudo/*.md', { query: '?raw', import: 'default', eager: true }),

  cenas: {
    redes: criarRedes,
  },

  // desenho mostrado se o computador não tiver WebGL
  ilustracao: `
<svg viewBox="0 0 400 300" role="img" aria-label="Desenho de uma rede neural" fill="none" stroke="currentColor">
  <g stroke-width="1.2" opacity="0.7">
    <path d="M80 90 L200 70 M80 90 L200 150 M80 150 L200 70 M80 150 L200 150 M80 150 L200 230 M80 210 L200 150 M80 210 L200 230 M200 70 L320 120 M200 150 L320 120 M200 150 L320 190 M200 230 L320 190"/>
  </g>
  <g stroke-width="1.6" fill="#f6f3ed">
    <circle cx="80" cy="90" r="14"/><circle cx="80" cy="150" r="14"/><circle cx="80" cy="210" r="14"/>
    <circle cx="200" cy="70" r="14"/><circle cx="200" cy="150" r="14"/><circle cx="200" cy="230" r="14"/>
    <circle cx="320" cy="120" r="14"/><circle cx="320" cy="190" r="14"/>
  </g>
</svg>`,
};
