// Nomes e funções das peças (aparecem ao clicar numa peça na vista explodida).
// Pode editar os textos à vontade. NÃO mude o "id" (é usado pelo código 3D).
// "balao" = direção da linha do número na tela [x, y] (negativo = esquerda/cima).
export const PECAS = [
  { id: 'carcaca', numero: 1, nome: 'Carcaça', funcao: 'Segura tudo alinhado e protege as engrenagens. Em alumínio.', nota: 'Paredes, furos e encaixes definem onde cada peça fica.', balao: [0.5, -1], comprimento: 11 },
  { id: 'tampa', numero: 2, nome: 'Tampa', funcao: 'Fecha a carcaça e apoia os rolamentos da frente.', nota: 'Fixada por parafusos: dá para abrir para manutenção.', balao: [0.2, -1], comprimento: 9 },
  { id: 'eixoEntrada', numero: 3, nome: 'Eixo de entrada', funcao: 'Recebe a rotação do motor.', nota: 'Os degraus do eixo mostram onde entram rolamentos e engrenagem.', balao: [0.5, 1], comprimento: 11 },
  { id: 'pinhao', numero: 4, nome: 'Pinhão', funcao: 'Engrenagem pequena, 12 dentes. Gira rápido e empurra a engrenagem maior.', nota: 'Relação 12 : 24 → a saída gira na metade da velocidade.', balao: [-0.2, 1], comprimento: 8 },
  { id: 'coroa', numero: 5, nome: 'Engrenagem de saída', funcao: '24 dentes. Reduz a velocidade e aumenta a força (torque).', nota: 'É a peça do nosso estudo de caso.', balao: [0.6, -1], comprimento: 8 },
  { id: 'eixoSaida', numero: 6, nome: 'Eixo de saída', funcao: 'Entrega a rotação reduzida para a máquina.', nota: 'Mais grosso que o de entrada: carrega mais torque.', balao: [0.9, -0.9], comprimento: 12 },
  { id: 'rolamentos', numero: 7, nome: 'Rolamentos', funcao: 'Deixam os eixos girarem com pouco atrito.', nota: 'Peça padronizada: dá para identificar pelas medidas e comprar pronta.', balao: [-0.3, 1], comprimento: 9 },
  { id: 'espacadores', numero: 8, nome: 'Espaçadores', funcao: 'Mantêm a engrenagem na posição certa ao longo do eixo.', nota: 'Peça simples, mas a espessura precisa ser exata.', balao: [0.4, -1], comprimento: 12 },
  { id: 'retentor', numero: 9, nome: 'Retentor', funcao: 'Vedação de borracha: segura o óleo dentro e a sujeira fora.', nota: 'O material importa tanto quanto a forma.', balao: [0, 1], comprimento: 10 },
  { id: 'parafusos', numero: 10, nome: 'Parafusos', funcao: 'Prendem a tampa na carcaça.', nota: 'Rosca, comprimento e torque de aperto: tudo é especificação.', balao: [-0.3, -1], comprimento: 8 },
  { id: 'flange', numero: 11, nome: 'Flange de acoplamento', funcao: 'Liga o eixo de saída à máquina.', nota: 'Os furos seguem um padrão de fixação.', balao: [-0.2, -1], comprimento: 11 },
  { id: 'encoder', numero: 12, nome: 'Placa do encoder', funcao: 'Eletrônica que mede o giro do eixo com um ímã e um sensor.', nota: 'Tem firmware: aqui a engenharia reversa vira software.', balao: [0.6, -1], comprimento: 10 },
  { id: 'suporte', numero: 13, nome: 'Base de fixação', funcao: 'Prende o redutor na máquina.', nota: 'Furação e altura do eixo precisam bater com a máquina.', balao: [0.4, 1], comprimento: 8 },
];
