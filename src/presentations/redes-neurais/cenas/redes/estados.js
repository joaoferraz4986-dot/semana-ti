// ESTADOS e CÂMERAS da cena "redes".
// Um estado é uma lista de números. O motor interpola entre eles conforme a navegação:
// cada passo do .md vira uma animação (e voltar desfaz exatamente).

// onde fica cada "ilha" no eixo X
export const POSICOES = { dupla: -14, neuronio: 0, exemplo: 12, demo: 26 };

export const PADRAO = {
  // dupla (abertura, cérebro vs máquina, final)
  crescer: 0, // 0 = só um pulso · 1 = rede orgânica crescida
  maquina: 0, // rede geométrica (cobalto)
  unir: 0, // aproxima as duas e liga com uma ponte
  pulsoDupla: 0, // pulsos andando nas duas redes
  // neurônio biológico
  rotDendritos: 0,
  rotSoma: 0,
  rotAxonio: 0,
  rotSinapse: 0,
  pulsoBio: 0, // sinais andando nos dendritos/axônio
  sinapse: 0, // neurotransmissores atravessando a sinapse
  // neurônio artificial
  artificial: 0, // 0 = biológico · 1 = artificial (transformação)
  entradas: 0,
  pesos: 0,
  somaArt: 0,
  disparo: 0,
  // rede de exemplo
  rede: 0,
  camadasRede: 0, // 0 a 4: quantas camadas aparecem
  avanco: 0, // pulsos para frente
  retro: 0, // pulsos para trás (retropropagação)
  ajuste: 0, // 0 = pesos antes de aprender · 1 = depois
  mostrarSaida: 0,
  acerto: 0.5, // 1 = "gato" aceso · 0 = "cachorro" aceso
  mostrarErro: 0,
  erroRede: 0.9, // altura do medidor de erro
  imagem: 0, // foto em pixels
  numeros: 0, // pixels viram números (relevo)
  entrar: 0, // números entram na rede
  padroes: 0, // cartões bordas → formas → objetos
  app: 0, // aplicação mostrada nos rótulos (0 = gato/cachorro; 1 a 6 = aplicações)
  // demo ao vivo
  demo: 0,
};

const rede = { rede: 1, camadasRede: 4 };
const dupla = { crescer: 1, maquina: 1, pulsoDupla: 1 };

export const ESTADOS = {
  // abertura
  pulso: { crescer: 0.04, pulsoDupla: 1 },
  crescendo: { crescer: 1, pulsoDupla: 1 },
  // neurônio biológico
  neuronio: {},
  dendritos: { rotDendritos: 1, pulsoBio: 1 },
  corpo: { rotDendritos: 1, rotSoma: 1, pulsoBio: 1 },
  axonio: { rotSoma: 1, rotAxonio: 1, pulsoBio: 1 },
  sinapse: { rotAxonio: 1, rotSinapse: 1, pulsoBio: 1, sinapse: 1 },
  // neurônio artificial
  artificial: { artificial: 1 },
  'art-entradas': { artificial: 1, entradas: 1 },
  'art-pesos': { artificial: 1, entradas: 1, pesos: 1 },
  'art-soma': { artificial: 1, entradas: 1, pesos: 1, somaArt: 1 },
  'art-dispara': { artificial: 1, entradas: 1, pesos: 1, somaArt: 1, disparo: 1 },
  // camadas
  'rede-entrada': { rede: 1, camadasRede: 1 },
  'rede-ocultas': { rede: 1, camadasRede: 3 },
  'rede-saida': { ...rede },
  'rede-avanco': { ...rede, avanco: 1, mostrarSaida: 1, acerto: 0.2 },
  // como aprende
  errado: { ...rede, mostrarSaida: 1, acerto: 0.2, mostrarErro: 1, erroRede: 0.92 },
  retro: { ...rede, mostrarSaida: 1, acerto: 0.2, mostrarErro: 1, erroRede: 0.92, retro: 1 },
  ajusta: { ...rede, mostrarSaida: 1, acerto: 0.45, mostrarErro: 1, erroRede: 0.55, retro: 0.6, ajuste: 0.5 },
  epocas: { ...rede, mostrarSaida: 1, acerto: 0.92, mostrarErro: 1, erroRede: 0.08, avanco: 1, retro: 0.4, ajuste: 1 },
  // demo ao vivo
  demo: { demo: 1 },
  // o que a rede vê
  pixels: { ajuste: 1, imagem: 1 },
  numeros: { ajuste: 1, imagem: 1, numeros: 1 },
  'pixels-entram': { ...rede, ajuste: 1, imagem: 1, numeros: 1, entrar: 1, avanco: 1 },
  padroes: { ...rede, ajuste: 1, imagem: 1, entrar: 1, avanco: 1, padroes: 1, mostrarSaida: 1, acerto: 0.92 },
  // cérebro vs máquina / final
  dupla: { ...dupla },
  'final-unido': { ...dupla, unir: 1 },
  // aplicações
  'app-1': { ...rede, ajuste: 1, avanco: 1, app: 1 },
  'app-2': { ...rede, ajuste: 1, avanco: 1, app: 2 },
  'app-3': { ...rede, ajuste: 1, avanco: 1, app: 3 },
  'app-4': { ...rede, ajuste: 1, avanco: 1, app: 4 },
  'app-5': { ...rede, ajuste: 1, avanco: 1, app: 5 },
  'app-6': { ...rede, ajuste: 1, avanco: 1, app: 6 },
  limites: { ...rede, ajuste: 0.5, avanco: 0.5, mostrarSaida: 1, acerto: 0.5 },
};

// pos = onde a câmera está · alvo = para onde olha · fov = abertura (menor = mais zoom)
const D = POSICOES.dupla;
const X = POSICOES.exemplo;
const M = POSICOES.demo;
export const CAMERAS = {
  // dupla
  'dupla-escuro': { pos: [D - 0.8, 2.0, 7.4], alvo: [D - 2.0, 1.6, 0], fov: 26 },
  'dupla-crescer': { pos: [D - 0.6, 2.4, 9.6], alvo: [D - 1.6, 1.7, 0], fov: 28 },
  dupla: { pos: [D - 0.1, 2.6, 13.0], alvo: [D - 0.1, 1.75, 0], fov: 30 },
  'dupla-org': { pos: [D - 1.6, 2.4, 9.4], alvo: [D - 1.6, 1.75, 0], fov: 30 },
  'dupla-maq': { pos: [D + 1.8, 2.4, 9.4], alvo: [D + 1.6, 1.75, 0], fov: 30 },
  'dupla-alto': { pos: [D, 6.4, 11.6], alvo: [D - 0.1, 1.6, 0], fov: 30 },
  'final-holofote': { pos: [D + 0.2, 2.5, 11.6], alvo: [D, 1.7, 0], fov: 28 },
  final: { pos: [D, 3.6, 15.0], alvo: [D, 1.7, 0], fov: 30 },
  // neurônio (o modelo vai de x ≈ -1,6 a 4,8)
  neuronio: { pos: [1.2, 3.2, 14.2], alvo: [0.6, 1.5, 0], fov: 30 },
  dendritos: { pos: [-1.0, 2.4, 8.0], alvo: [-1.4, 1.7, 0], fov: 30 },
  corpo: { pos: [-0.2, 2.4, 7.4], alvo: [-0.6, 1.7, 0], fov: 30 },
  axonio: { pos: [1.6, 2.6, 8.6], alvo: [1.0, 1.6, 0], fov: 30 },
  sinapse: { pos: [4.6, 2.4, 6.6], alvo: [3.7, 1.66, 0], fov: 30 },
  // neurônio artificial (de x ≈ -3,2 a 2,9)
  artificial: { pos: [-1.0, 2.6, 12.6], alvo: [-1.2, 1.6, 0], fov: 30 },
  'art-perto': { pos: [-2.0, 2.3, 9.8], alvo: [-2.0, 1.65, 0], fov: 30 },
  'art-saida': { pos: [-0.4, 2.3, 9.6], alvo: [-0.6, 1.65, 0], fov: 30 },
  // rede de exemplo (texto à esquerda: o alvo fica à esquerda do centro, a rede aparece à direita)
  rede: { pos: [X - 1.0, 2.7, 14.0], alvo: [X - 1.4, 1.95, 0], fov: 30 },
  'rede-entrada': { pos: [X - 2.9, 2.4, 9.6], alvo: [X - 3.3, 1.95, 0], fov: 30 },
  'rede-meio': { pos: [X - 1.6, 2.5, 11.0], alvo: [X - 1.9, 1.95, 0], fov: 30 },
  'rede-saida': { pos: [X + 0.2, 2.4, 10.4], alvo: [X - 0.3, 1.95, 0], fov: 30 },
  'rede-erro': { pos: [X + 0.4, 2.8, 15.0], alvo: [X - 0.4, 1.9, 0], fov: 30 },
  'rede-geral': { pos: [X - 0.6, 3.0, 15.4], alvo: [X - 1.0, 2.0, 0], fov: 30 },
  // capítulo 7 (texto à direita: o alvo fica à direita)
  pixels: { pos: [X - 3.6, 2.2, 8.0], alvo: [X - 3.2, 1.7, 0], fov: 30 },
  'pixels-rede': { pos: [X + 0.2, 2.9, 14.0], alvo: [X + 0.8, 1.9, 0], fov: 30 },
  padroes: { pos: [X + 2.6, 3.4, 12.4], alvo: [X + 3.0, 2.8, 0], fov: 30 },
  'app-a': { pos: [X - 1.0, 2.4, 14.4], alvo: [X - 1.2, 1.95, 0], fov: 30 },
  'app-b': { pos: [X + 0.2, 2.8, 14.2], alvo: [X - 1.0, 1.95, 0], fov: 30 },
  'app-c': { pos: [X - 2.2, 3.2, 14.4], alvo: [X - 1.4, 1.95, 0], fov: 30 },
  // demo
  demo: { pos: [M, 2.3, 9.0], alvo: [M, 1.9, 0], fov: 30 },
};