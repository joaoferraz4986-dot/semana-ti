// Ilustração estática usada quando o computador não consegue rodar WebGL.
// Cada apresentação pode passar a sua em config.ilustracao (string SVG).
export const ILUSTRACAO_PADRAO = `
<svg viewBox="0 0 400 300" role="img" aria-label="Desenho de um celular ao lado de um bloco fatiado" fill="none" stroke="currentColor">
  <g stroke-width="1.6">
    <rect x="40" y="40" width="96" height="190" rx="16"/>
    <rect x="48" y="50" width="80" height="170" rx="10" stroke-width="0.8"/>
    <path d="M190 120 h80 v100 h-80 z"/>
    <path d="M270 120 l40 -20 v100 l-40 20"/>
    <path d="M190 120 l40 -20 h80"/>
  </g>
  <g stroke-width="1" stroke-dasharray="4 4" opacity="0.7">
    <line x1="210" y1="120" x2="210" y2="220"/>
    <line x1="230" y1="120" x2="230" y2="220"/>
    <line x1="250" y1="120" x2="250" y2="220"/>
  </g>
  <text x="250" y="256" fill="currentColor" stroke="none" font-size="11" text-anchor="middle" font-family="Instrument Sans, sans-serif">executável · app</text>
</svg>`;
