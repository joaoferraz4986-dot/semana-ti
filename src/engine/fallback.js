// Ilustração estática usada quando o computador não consegue rodar WebGL.
// Cada apresentação pode passar a sua em config.ilustracao (string SVG).
export const ILUSTRACAO_PADRAO = `
<svg viewBox="0 0 400 300" role="img" aria-label="Desenho técnico de um redutor de engrenagens" fill="none" stroke="currentColor">
  <g stroke-width="1.6">
    <path d="M95 92 L262 52 A98 98 0 0 1 262 248 L95 208 A58 58 0 0 1 95 92 Z"/>
    <circle cx="110" cy="150" r="38"/>
    <circle cx="250" cy="150" r="74"/>
  </g>
  <g stroke-width="0.8" stroke-dasharray="10 4 2 4" opacity="0.7">
    <line x1="40" y1="150" x2="370" y2="150"/>
    <line x1="110" y1="80" x2="110" y2="220"/>
    <line x1="250" y1="50" x2="250" y2="250"/>
  </g>
  <g stroke-width="1">
    <circle cx="110" cy="150" r="10"/>
    <circle cx="250" cy="150" r="16"/>
    <line x1="176" y1="276" x2="324" y2="276"/>
    <line x1="176" y1="268" x2="176" y2="284"/>
    <line x1="324" y1="268" x2="324" y2="284"/>
  </g>
  <text x="250" y="294" fill="currentColor" stroke="none" font-size="11" text-anchor="middle" font-family="sans-serif">Ø 52 (ilustrativo)</text>
</svg>`;
