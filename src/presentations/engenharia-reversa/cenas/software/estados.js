// ESTADOS e CÂMERAS da cena "software".
// Um estado é uma lista de números. O motor interpola entre eles conforme a rolagem,
// então cada passo do .md vira uma animação (e voltar desfaz exatamente).
// No .md use:  estado: fatia-2   e   camera: fatia-2

export const PADRAO = {
  // celular
  tela: 0, // 0 = apagada, 1 = mostrando o app
  virar: 0, // gira o celular (mostra que por fora não se vê o código)
  duvida: 0, // rótulo "código-fonte: não vem junto"
  camadas: 0, // 0 a 5: quantas camadas já saíram do app
  rotulosCamadas: 0,
  leque: 0, // 1 = todas as camadas abertas lado a lado
  // executável (bloco)
  codigo: 0, // 0 = sem placa · 1 = placa de código-fonte visível · 2 = placa entrou no bloco
  selado: 1, // fenda de cima fechada
  rotuloBloco: 0, // gravação "app" na frente do bloco
  fatias: 0, // 0 a 4: quantas fatias já saíram (binário → assembly → pseudocódigo → lógica)
  pistas: 0, // rótulos "nome perdido" no pseudocódigo
  exposicao: 0, // o miolo do bloco entra na fileira de placas (capítulo da IA)
  // caso da API
  servidor: 0, // 0 = escondido, 1 = de pé
  cabo: 0, // 0 a 1: desenha o cabo
  trafego: 0, // contas indo e voltando no cabo
  congelar: 0, // congela uma requisição e mostra o cartão
  resposta: 0, // mostra o cartão da resposta
  doc: 0, // junta os cartões na documentação
};

const app = { tela: 1 };
const api = { ...app, servidor: 1, cabo: 1 };

export const ESTADOS = {
  selado: {},
  'selado-rotulo': { rotuloBloco: 1 },
  'celular-apagado': {},
  'celular-ligado': { ...app },
  'celular-duvida': { ...app, virar: 1, duvida: 1 },

  fonte: { ...app, codigo: 1, selado: 0 },
  compilado: { ...app, codigo: 2, selado: 1, rotuloBloco: 1 },
  volta: { ...app, rotuloBloco: 1, fatias: 0.35 },
  'volta-pistas': { ...app, rotuloBloco: 1, fatias: 1 },

  'camada-1': { ...app, camadas: 1 },
  'camada-2': { ...app, camadas: 2 },
  'camada-3': { ...app, camadas: 3 },
  'camada-4': { ...app, camadas: 4 },
  'camada-5': { ...app, camadas: 5 },
  'camadas-todas': { ...app, camadas: 5, leque: 1, rotulosCamadas: 1 },

  'fatia-1': { ...app, fatias: 1 },
  'fatia-2': { ...app, fatias: 2 },
  'fatia-3': { ...app, fatias: 3 },
  'fatia-4': { ...app, fatias: 4 },
  pistas: { ...app, fatias: 3, pistas: 1 },

  'ferr-devtools': { ...app, camadas: 2 },
  'ferr-rede': { ...api, trafego: 1 },
  'ferr-ghidra': { ...app, fatias: 2 },
  'ferr-apk': { ...app, camadas: 5, leque: 1, rotulosCamadas: 1 },

  'api-inicio': { ...api },
  'api-trafego': { ...api, trafego: 1 },
  'api-requisicao': { ...api, trafego: 1, congelar: 1 },
  'api-resposta': { ...api, trafego: 1, congelar: 1, resposta: 1 },
  'api-doc': { ...api, congelar: 1, resposta: 1, doc: 1 },

  'uso-malware': { ...app, rotuloBloco: 1 },
  geral: { ...api, trafego: 1, rotuloBloco: 1 },
  ia: { ...app, fatias: 4, exposicao: 1 },
  'ia-pseudo': { ...app, fatias: 4, exposicao: 1, pistas: 1 },
  'final-junto': { ...app, rotuloBloco: 1 },
};

// Posições: executável no centro (x = 0), celular em x ≈ -7,2, servidor em x ≈ -10,2.
// pos = onde a câmera está · alvo = para onde olha · fov = abertura (menor = mais zoom)
export const CAMERAS = {
  'bloco-escuro': { pos: [-2.4, 1.5, 7.8], alvo: [0.3, 0.8, 0], fov: 25 },
  'bloco-perto': { pos: [-1.4, 2.0, 5.8], alvo: [0.3, 0.8, 0], fov: 26 },
  'bloco-estudio': { pos: [4.2, 3.2, 7.6], alvo: [0.3, 0.75, 0], fov: 30 },

  celular: { pos: [-4.8, 2.0, 6.8], alvo: [-7.2, 1.05, 0.4], fov: 30 },
  'celular-perto': { pos: [-5.6, 1.7, 5.4], alvo: [-7.2, 1.1, 0.4], fov: 30 },
  'celular-lado': { pos: [-4.2, 2.2, 4.4], alvo: [-7.2, 1.0, 0.3], fov: 30 },
  'celular-alto': { pos: [-5.0, 4.4, 6.4], alvo: [-7.2, 0.9, 0.4], fov: 30 },

  // camadas: de frente para a tela, para cada camada sair grande na direção do público
  'camadas-inicio': { pos: [-6.6, 1.5, 6.6], alvo: [-7.2, 1.1, 0.7], fov: 30 },
  camadas: { pos: [-6.75, 1.3, 6.0], alvo: [-7.2, 1.15, 1.9], fov: 30 },
  'camadas-fundo': { pos: [-6.75, 1.3, 6.0], alvo: [-7.2, 1.15, 1.9], fov: 30 },
  'camadas-geral': { pos: [-2.6, 2.6, 8.4], alvo: [-6.9, 1.0, 1.8], fov: 30 },

  compilar: { pos: [-0.6, 2.8, 9.2], alvo: [-1.0, 0.9, 0], fov: 30 },
  volta: { pos: [6.6, 3.6, 9.4], alvo: [1.2, 0.5, 0], fov: 30 },

  'fatia-0': { pos: [4.8, 2.6, 5.4], alvo: [0.6, 0.75, 0], fov: 30 },
  'fatia-1': { pos: [5.05, 2.04, 3.25], alvo: [0.84, 0.75, 0], fov: 30 },
  'fatia-2': { pos: [4.76, 2.04, 3.25], alvo: [0.48, 0.75, 0], fov: 30 },
  'fatia-3': { pos: [4.35, 2.04, 3.25], alvo: [0.12, 0.75, 0], fov: 30 },
  'fatia-4': { pos: [4.06, 2.04, 3.25], alvo: [-0.24, 0.75, 0], fov: 30 },

  api: { pos: [-6.2, 3.0, 8.8], alvo: [-8.7, 1.0, 0.5], fov: 30 },
  'api-perto': { pos: [-6.6, 2.5, 7.4], alvo: [-8.5, 1.3, 0.9], fov: 30 },
  'api-doc': { pos: [-7.3, 2.1, 7.0], alvo: [-8.6, 1.3, 1.1], fov: 30 },
  'api-longe': { pos: [-5.4, 4.2, 11.4], alvo: [-8.6, 0.8, 0.3], fov: 30 },

  // capítulo da IA: a fileira de placas atrás do bloco (x de 1,2 a 6,4; z = -2,5)
  'ia-a': { pos: [3.8, 3.4, 10.6], alvo: [3.8, 0.55, -2.5], fov: 30 },
  'ia-b': { pos: [2.4, 1.8, 3.6], alvo: [2.0, 0.55, -2.5], fov: 30 },
  'ia-c': { pos: [2.6, 1.4, 2.2], alvo: [2.5, 0.55, -2.5], fov: 30 },
  'ia-d': { pos: [3.8, 3.0, 9.0], alvo: [3.8, 0.55, -2.5], fov: 30 },

  'final-holofote': { pos: [-2.6, 3.4, 13.2], alvo: [-3.6, 0.6, 0.2], fov: 30 },
  final: { pos: [-3.2, 4.4, 16.0], alvo: [-3.6, 0.6, 0.2], fov: 30 },
};