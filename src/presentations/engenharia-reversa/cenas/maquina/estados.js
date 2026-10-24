// ESTADOS e CÂMERAS da cena "maquina".
// Um estado é só uma lista de números (0 a 1). O motor interpola entre eles conforme a rolagem.
// No .md do capítulo use:  estado: explodida   e   camera: explodida

export const PADRAO = {
  explodir: 0, // 0 = montada, 1 = vista explodida
  baloes: 0, // números das peças
  interativo: 0, // 1 = dá para clicar nas peças
  corte: 0, // vista em corte (seção)
  digital: 0, // 0 = físico, 1 = desenho técnico
  foco: 0, // 1 = só a engrenagem laranja aparece
  cotas: 0, // cotas da engrenagem
  cotasCaixa: 0, // cotas da carcaça
  incerteza: 0, // mostra "± x mm" nas cotas
  placa: 0, // abre o encoder (capítulo de software)
  rotulosPlaca: 0, // rótulos da placa
  perguntas: 0, // perguntas em volta da engrenagem (estudo de caso)
  girar: 0, // velocidade de giro das engrenagens
};

export const ESTADOS = {
  fechada: {},
  girando: { girar: 1 },
  cotada: { cotasCaixa: 1 },
  parcial: { explodir: 0.42 },
  digital: { digital: 1 },
  'digital-meio': { digital: 1, girar: 0.4 },
  explodida: { explodir: 1, baloes: 1, interativo: 1 },
  'explodida-limpa': { explodir: 1 },
  cortada: { corte: 1 },
  medida: { foco: 1, cotas: 1 },
  modelo: { foco: 1, cotas: 1, digital: 1 },
  engrenagem: { foco: 1, girar: 0.25 },
  duvidas: { foco: 1, perguntas: 1 },
  incerteza: { cotasCaixa: 1, incerteza: 1 },
  placa: { placa: 1, rotulosPlaca: 1 },
  'placa-fundo': { placa: 1, girar: 0.5 },
};

// pos = onde a câmera está · alvo = para onde olha · fov = abertura da lente (menor = mais "tele")
export const CAMERAS = {
  escuro: { pos: [4.6, 1.7, 10.4], alvo: [0.15, 1.45, 0], fov: 25 },
  'abertura-perto': { pos: [3.4, 2.5, 7.4], alvo: [0.15, 1.5, 0], fov: 26 },
  'tres-quartos': { pos: [6.4, 4.4, 9.6], alvo: [0.25, 1.4, 0.2], fov: 30 },
  'tres-quartos-perto': { pos: [4.4, 3.3, 7.3], alvo: [0.25, 1.5, 0.2], fov: 30 },
  'vista-geral': { pos: [5.8, 3.6, 9.8], alvo: [0.25, 1.35, 0.1], fov: 30 },
  distante: { pos: [6.5, 6.8, 13.5], alvo: [0.25, 1.3, 0], fov: 30 },
  'vista-esquerda': { pos: [-6.2, 4.0, 9.6], alvo: [0.1, 1.4, 0.3], fov: 30 },
  alta: { pos: [5.0, 8.4, 8.6], alvo: [0.2, 1.2, 0], fov: 30 },
  'perfil-holofote': { pos: [7.8, 2.6, 6.8], alvo: [0.2, 1.5, 0.3], fov: 28 },
  explodida: { pos: [13.2, 4.6, 2.6], alvo: [0.1, 1.55, 0.9], fov: 31 },
  corte: { pos: [3.2, 8.6, 6.4], alvo: [0.15, 1.25, 0], fov: 30 },
  engrenagem: { pos: [3.0, 2.7, 4.8], alvo: [0.67, 1.52, 0], fov: 30 },
  'engrenagem-modelo': { pos: [1.4, 3.4, 5.4], alvo: [0.67, 1.52, 0], fov: 30 },
  'engrenagem-caso': { pos: [-1.6, 2.9, 5.6], alvo: [0.67, 1.52, 0], fov: 30 },
  traseira: { pos: [-5.6, 3.4, -6.6], alvo: [-0.7, 1.6, -1.0], fov: 30 },
  'traseira-perto': { pos: [-3.4, 2.6, -4.8], alvo: [-0.9, 1.6, -1.3], fov: 30 },
  ia: { pos: [-6.2, 3.8, 8.8], alvo: [-0.2, 1.5, -0.3], fov: 30 },
  'final-holofote': { pos: [12.6, 5.0, 6.4], alvo: [0.1, 1.6, 0.9], fov: 31 },
  final: { pos: [0.2, 3.1, 12.8], alvo: [0.15, 1.4, 0], fov: 30 },
};
