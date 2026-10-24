import { aleatorio } from './mlp.js';

// Conjuntos de dados 2D com duas classes: 0 = terracota (humano), 1 = cobalto (máquina).
// Todos os pontos ficam entre -1 e 1. A semente garante os mesmos pontos sempre.

export const NOMES = {
  espiral: 'Espiral',
  circulos: 'Círculos',
  xor: 'XOR',
  grupos: 'Dois grupos',
};

export function gerarDados(tipo, { n = 200, semente = 7, ruido = 0.06 } = {}) {
  const rnd = aleatorio(semente);
  const gauss = () => {
    // Box-Muller
    const u = Math.max(1e-9, rnd());
    const v = rnd();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };
  const pontos = [];
  for (let k = 0; k < n; k++) {
    const classe = k % 2;
    let x;
    let y;
    if (tipo === 'espiral') {
      // duas espirais entrelaçadas
      const t = (k >> 1) / (n / 2); // 0..1
      const r = 0.08 + t * 0.85;
      const ang = t * 2.6 * Math.PI + classe * Math.PI;
      x = r * Math.cos(ang) + gauss() * ruido * 0.6;
      y = r * Math.sin(ang) + gauss() * ruido * 0.6;
    } else if (tipo === 'circulos') {
      // um círculo dentro de um anel
      const ang = rnd() * Math.PI * 2;
      const r = classe === 1 ? rnd() * 0.38 : 0.62 + rnd() * 0.3;
      x = r * Math.cos(ang) + gauss() * ruido * 0.5;
      y = r * Math.sin(ang) + gauss() * ruido * 0.5;
    } else if (tipo === 'xor') {
      // quadrantes: mesma cor nos cantos opostos
      x = rnd() * 1.8 - 0.9;
      y = rnd() * 1.8 - 0.9;
      const margem = 0.08;
      if (Math.abs(x) < margem) x += Math.sign(x || 1) * margem;
      if (Math.abs(y) < margem) y += Math.sign(y || 1) * margem;
      pontos.push({ x, y, classe: x * y > 0 ? 1 : 0 });
      continue;
    } else {
      // dois grupos separados
      const cx = classe === 1 ? 0.45 : -0.45;
      x = cx + gauss() * 0.18;
      y = cx * 0.6 + gauss() * 0.18;
    }
    pontos.push({ x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)), classe });
  }
  return pontos;
}
