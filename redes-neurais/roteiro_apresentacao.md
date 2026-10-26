# Roteiro — Redes neurais

**12 capítulos · 57 paradas · ~23 min.** Cada avanço (seta, Espaço, PageDown) é uma **parada**, e cada parada faz **uma coisa animada acontecer na tela**. Este roteiro explica, capítulo a capítulo: o que aparece na tela, o que você diz (entre aspas) e a base das afirmações mais fortes. Os textos da tela são curtos de propósito — **o detalhe fica na fala**: a tela guarda uma pista, a voz carrega a explicação.

A ideia que amarra tudo: **um sinal atravessa a apresentação inteira** — nasce no escuro, passa por um neurônio de verdade, vira um neurônio matemático, atravessa camadas, volta como erro, aprende ao vivo e, no fim, revela que cérebro e máquina fazem o mesmo movimento: **montar um modelo interno a partir do que chega de fora e devolvê-lo ao mundo**.

Cores: **terracota** = humano/biológico · **cobalto (azul)** = máquina/artificial.

---

## Como usar este roteiro

- Fale **para o público**, não para a tela. As falas aqui são um apoio; adapte ao seu jeito, mantendo o conteúdo.
- Troque de parada **enquanto** diz a frase correspondente — a animação ilustra o que você está falando.
- No cap. 6 (demo ao vivo), deixe o treino correr 2 a 4 segundos antes de trocar: os números subindo fazem parte da explicação.
- Atalhos: **`D`** alterna tema claro/escuro (se o salão pedir, troque no começo), `H` mostra todos os atalhos, `F` tela cheia, `Q` qualidade gráfica.
- Toda afirmação forte tem entrada em [`referencias.md`](referencias.md). Este roteiro cita a fonte só onde o público pode levantar dúvida.

## Base didática herdada pelo desenho

A sessão segue dois modelos estabelecidos, e é bom que o apresentador saiba disso:

**Gagné, Golas, Wager & Keller, *Principles of Instructional Design* (5. ed., Thomson/Wadsworth, 2005)** — os *nove eventos de instrução* dão o arco: chamar a atenção (cap. 1), informar os objetivos (fala de abertura), estimular a memória anterior (caps. 2–3, o neurônio que o público já conhece do corpo), apresentar o conteúdo (caps. 4–5), conduzir com exercício e feedback (caps. 5–7, com a demo ao vivo no 6 e o medidor de erro no 7), avaliar com comparação honesta e limites (caps. 8–10) e fechar com retenção e transferência (caps. 11–12).

**Mayer (org.), *The Cambridge Handbook of Multimedia Learning* (3. ed., Cambridge UP, 2021)** — rege as paradas individuais, aquela "uma ideia por clique": **segmentação** (cada parada é um pedaço navegável; a mensagem por partes ensina melhor), **sinalização** (negrito e anotações no 3D guiam o olho ao essencial), **redundância** (texto curto na tela *porque* a narração já leva o detalhe — tela que repete a fala por completo atrapalha), **coerência** (nada na tela existe sem função) e **contiguidade** (o objeto 3D fica ao lado do texto que o explica).

## A ordem dos capítulos, e por quê

1. **Abertura** garante o gancho de atenção (Gagné 1) com o pulso de luz que retorna no final.
2. **Neurônio biológico** ativa a memória anterior (Gagné 3): todo mundo já viu essa versão do corpo humano em sala de aula; é dela que a ideia de rede nasce.
3. **Neurônio artificial** faz a ponte biológico→matemático antes de aparecer qualquer sinal de treino — modelo mental primeiro, formalismo depois.
4. **Camadas** entrega o conceito central (e o contraintuitivo: *mais camadas não é melhor* — o tema do cap. 6).
5. **Treinamento** explica o ciclo erro→retorno→ajuste **antes** de mostrá-lo ao vivo, para que a demo seja reconhecida em vez de surpresa.
6. **Demonstração ao vivo** é o evento de "desempenho + feedback" (Gagné 6–7): a rede treina de verdade no navegador.
7. **Imagens** fecha o aprendizado com o caso mais comum no dia a dia (visão por computador), reaproveitando a "recombinação por camadas".
8. **Cérebro × máquina** compara com honestidade (Gagné 8: avaliar) — as alegações fortes (86 bilhões de neurônios, 20 W) e as que ficam em debate são separadas de propósito.
9. **No dia a dia** e 10. **Cuidados** aplicam o aprendizado ao cotidiano e aos limites — apresentação que só mostra vitórias não serve para decidir nada.
11. **Projeção** é a síntese (Gagné 9): teoria projetiva, NCM e a ponte com a sala de engenharia reversa. Fica perto do fim de propósito: a síntese pertence ao fecho, não ao meio.
12. **Final** devolve a pergunta de abertura em escala maior ("IA vs Humanos ou IA com Humanos?") — transferência do que foi visto para a vida do público.

---

## Fala de abertura (~45 s), sobre a tela 1

> "Boa tarde! Tudo o que vocês pensam agora, cada palavra sendo ouvida, passa por sinais elétricos minúsculos correndo entre neurônios. Olhem esse pontinho de luz: é um sinal. Sozinho, ele não faz nada — mas quando milhões se conectam, aparece algo incrível: aprendizado. Hoje vocês vão ver como os computadores copiaram, de um jeito bem simplificado, essa ideia, com uma rede neural aprendendo **ao vivo**, aqui na frente de vocês. No fim, eu fecho o arco com a sala de engenharia reversa: os dois mundos fazem o mesmo movimento — do que chega de fora, montam um modelo próprio e o devolvem ao mundo."

**Se o salão pede:** ambiente escuro e TV forte são hora de apertar `D` para o tema escuro (e de novo para voltar).

---

## 1. Abertura — 2 paradas · ~1 min 30 (inclui a fala de abertura) · Gagné: atenção

**Parada 1.** Na tela: "*Um sinal. Depois, muitos.*" — um único pulso de luz num fundo escuro. Este é o sinal que vai atravessar tudo. Diga a fala de abertura devagar e termine apontando de novo para o pulso: a luz e o sinal elétrico precisam ficar associados na cabeça do público.

**Parada 2.** Na tela: "Como uma máquina **aprende** a partir de exemplos?" — aponte a palavra **exemplos** e diga: *"Guardem essa palavra: ela volta em todo capítulo e explica por que a mesma rede erra no começo e acerta depois."* Troque de capítulo.

## 2. O neurônio biológico — 5 paradas · ~1 min 30 · Gagné: memória anterior

**Objetivo:** ativar o que o público já conhece do corpo humano — é dessa máquina de verdade que a rede artificial nasce.

**Parada 1.** Na tela: "No cérebro, um neurônio recebe sinais, decide e passa adiante." — o neurônio de barro no centro, silencioso. Diga: *"No cérebro, vocês têm cerca de 86 bilhões desses — estimativa de Azevedo e colegas, de 2009. Este aqui agora está mudo; vamos ligá-lo."*

**Parada 2.** Na tela: "Os **dendritos** recebem sinais de outros neurônios." — *"Os dendritos são as ramificações que chegam: antenas que recebem o que os vizinhos mandam — estímulo fraco ou forte, tudo entra por aqui."*

**Parada 3.** Na tela: "O **corpo celular** junta tudo. Se o estímulo for forte o bastante, ele **dispara**." — *"Este é o neurônio decidindo: soma o que veio e, passou do limite, dispara um pulso elétrico rumo ao fio de saída."*

**Parada 4.** Na tela: "O **axônio** leva o sinal adiante." — *"O axônio é o cabo de transmissão: leva o pulso disparado do corpo até as pontas."*

**Parada 5.** Na tela: "Na **sinapse**, substâncias químicas passam o recado para o próximo neurônio." — *"No fim do cabo tem uma fenda: neurotransmissores atravessam e entregam o recado ao neurônio seguinte — químico entra, elétrico de novo."* Resuma para fixar: *"Antena → soma → cabo → fenda. Guardem: a matemática vai copiar exatamente essa ordem."*

## 3. O neurônio artificial — 5 paradas · ~1 min 30 · Gagné: memória anterior → conteúdo

**Parada 1.** Na tela: "Uma versão **matemática** do neurônio: inspirada no cérebro, não uma cópia dele." — o neurônio de barro se transforma em esferas. Diga: *"Em 1943, McCulloch e Pitts transformaram o neurônio numa função matemática. O que vocês veem não é cópia do biológico — é inspiração simplificada. E a simplificação é o que permite fazer funcionar."*

**Parada 2.** Na tela: "**Entradas**: números que chegam (x₁, x₂, x₃)." — *"Tudo é número: texto, imagem, som — cada coisa vira um número e entra por uma antena."*

**Parada 3.** Na tela: "Cada entrada tem um **peso**: o quanto ela importa." — *"O peso é a força da sinapse: o quanto esse sinal pesa na decisão. Peso alto pesa mais — peso perto de zero quase não conta."*

**Parada 4.** Na tela: "O neurônio **soma** tudo: entrada × peso, mais um ajuste (o viés)." + a conta no rodapé: 0,8·0,9 + 0,2·(−0,4) + 0,5·0,6 + 0,1 = 1,04. *"A conta da tela é real — está no documento de referências. O sinal negativo puxa para baixo: é assim que evidência contra entra na soma."*

**Parada 5.** Na tela: "A **ativação** transforma a soma num sinal de saída: aqui, 0,74." — *"A soma vira sigmoide — 0,74: mais 'sim' do que 'não'. Notem o paralelo com o biológico: antena chega, corpo soma, cabo leva."*

## 4. Camadas — 6 paradas · ~2 min · Gagné: conteúdo (o capítulo central)

**Objetivo:** profundidade — o que cada camada acrescenta e por que **mais camada não é melhor camada**. Este capítulo prepara a lição do cap. 6: fundo demais, sem técnica, encalha.

**Parada 1.** Na tela: "**Entrada**: os pixels de uma foto." — *"Um neurônio de entrada por dado bruto — neste exemplo, os pixels de uma foto de gato."*

**Parada 2.** Na tela: "**Camadas ocultas**: cada neurônio combina o que veio da camada anterior." — *"Cada neurônio oculto soma entradas com pesos: são milhares de opiniões que ninguém programou à mão — elas vêm dos exemplos."*

**Parada 3.** Na tela: "Cada camada **recombina** as anteriores: linhas viram formas, formas viram coisas." — *"A recombinação se repete camada a camada. Em redes de imagem (Zeiler e Fergus, 2014), as primeiras acham bordas; as seguintes juntam bordas em formas; as últimas juntam formas em objetos. Como Lego: cada camada constrói com os blocos da anterior."*

**Parada 4.** Na tela: "**Saída**: um neurônio para cada resposta possível: gato ou cachorro." — *"Cada neurônio final dá a chance de uma resposta; o maior ganha."*

**Parada 5.** Na tela: "Profundidade não é tudo: **camada demais encalha** — o erro não volta direito." + nota "Mais camadas não é sempre melhor: fundo demais trava a rede. Ao vivo, no capítulo 6, dá para ver acontecer." — *"Este é o ponto forte do capítulo: camadas demais, o sinal de erro que volta se enfraquece de camada em camada. O nome técnico é vanishing gradient (Glorot e Bengio, 2010). E no capítulo 6 vocês verão acontecer ao vivo."*

**Parada 6.** Na tela: "O sinal atravessa a rede, camada por camada, e sai uma **resposta**." — *"Percorra com o olho: da esquerda, a foto entra; cada camada combina; na direita, sai a resposta. Mas como os pesos ficam certos? — vem agora."*

## 5. Treinamento — 4 paradas · ~1 min 30 · Gagné: conteúdo e condução

**Parada 1.** Na tela: "Era a foto de um gato. A rede respondeu **cachorro**. O **erro** é grande." + nota "O erro (em inglês, *loss*) mede o quanto a resposta ficou longe da certa." — *"A rede começou errando: pesos aleatórios, chutes puros. O número grande no medidor é o tamanho dessa falha."*

**Parada 2.** Na tela: "O erro volta pela rede, de trás para frente: a **retropropagação**." — *"Do erro no final, seguindo o caminho avesso, camada por camada, a rede pergunta: 'quanto cada peso foi culpado?' (Rumelhart, Hinton e Williams, 1986 — o artigo que popularizou a técnica)."*

**Parada 3.** Na tela: "Cada **peso** muda um pouquinho, na direção que diminui o erro." — *"É a descida do gradiente — como descer um vale enevoado: sempre para o lado mais íngreme, com passos curtos."*

**Parada 4.** Na tela: "Repete com milhares de **dados de treino**. Cada volta completa é uma **época**. O erro cai." — *"Milhares de exemplos, milhares de voltas — e o medidor desce época após época. E no capítulo seguinte, vocês mesmos vão treinar comigo."*

## 6. Demonstração ao vivo — 8 paradas · ~3 min · Gagné: desempenho + feedback

**Objetivo:** treinar de verdade, no navegador, com semente fixa. **Os números garantidos** estão no apêndice, no fim deste roteiro.

**Parada 1.** Na tela: "Cada ponto é um exemplo. A rede precisa separar **terracota** de **azul**." — paisagem em espiral; ao lado, a rede imatura (1 camada × 2 neurônios), ainda sem treinar. *"Cada ponto é um exemplo; a rede precisa separar terracota de azul. Ainda não treinei nada: a fronteira atual é chute puro."*

**Parada 2.** Na tela: "**2 neurônios**: poucos demais. A fronteira não consegue fazer a curva." — o treino arranca. *"Dois neurônios tentando desenhar uma curva com uma régua: o erro fica em cima — é a experiência toda do capítulo 4, faltando potência (cerca de 68% de acerto; os números exatos estão no apêndice)."*

**Parada 3.** Na tela: "**8 neurônios**: a fronteira começa a curvar." — *"Com oito neurônios, a fronteira se dobra — a rede aprendeu boa parte (94%). Falta resolver o miolo da espiral."*

**Parada 4.** Na tela: "**2 camadas** de 8: agora ela acompanha a espiral. O erro vai a quase zero." — *"Com duas camadas de oito, a rede acompanha a espiral inteira: 100%. Duas camadas bastam para este problema."*

**Parada 5.** Na tela: "**4 camadas**: de novo a zero. O ganho de cada camada nova já está diminuído." — *"Com quatro camadas, acerta igual — mas o ganho já não cresce. Mais camada aqui não acrescenta: é o começo da lição 'mais não é sempre melhor'."*

**Parada 6.** Na tela: "**8 camadas**: encalha perto de 60%. Fundo demais, sem técnica, fica **pior**." + nota "O sinal de erro enfraquece a cada camada que retrocede (Glorot–Bengio, 2010). Fundas de verdade treinam com ReLU e atalhos entre camadas (ResNet)." — *"Oito camadas deveriam ser mais espertas ainda… e ficam perto de 60% — não melhoram. O sinal de erro morre no caminho de volta (Glorot e Bengio, 2010). Redes fundas de verdade contornam isso com ReLU e atalhos entre camadas — o ResNet, de 2016. Aqui, sem técnica: piorou."*

**Parada 7.** Na tela: "**12 camadas** com o triplo do tempo: nada. Empilhar camada não é atalho." — *"Doze camadas e o triplo do tempo: perto de 50% — igual a chutar. O instinto 'mais camada é mais inteligente' não vale para este problema e este treino. Empilhar camada não é atalho."*

**Parada 8.** Na tela: "A mesma rede aprende outros padrões: **círculos** e **XOR**." + nota "Treino de verdade, aqui no navegador. A semente é fixa: o resultado se repete." — *"Novos padrões, mesma rede de duas camadas: 100% nos dois. E aí está o fecho: desenho certo vale mais que força bruta."*

## 7. Imagens — 4 paradas · ~1 min 30 · Gagné: feedback

**Parada 1.** Na tela: "Para a rede, uma foto é uma grade de **pixels**." — *"Para a rede, a foto não é um gato: é uma grade de pixels."*

**Parada 2.** Na tela: "Cada pixel vira um **número**: claro perto de 0, escuro perto de 1." — *"Cada ponto da foto vira número — e daqui para a frente é só matemática."*

**Parada 3.** Na tela: "Esses números entram na rede." — *"É o mesmo caminho que os pontos da demonstração percorreram: números entrando pela primeira camada."*

**Parada 4.** Na tela: "Em redes de imagem, as primeiras camadas tendem a captar **bordas**; depois, **formas**; no fim, **objetos**." + nota "Uma tendência geral, não uma regra." — *"As primeiras camadas captam bordas; as seguintes juntam em formas; as últimas acham objetos (Zeiler e Fergus, 2014). É a mesma recombinação em camadas do capítulo 4, agora com prova visual."*

## 8. Cérebro × máquina — 6 paradas · ~2 min · Gagné: avaliação

**Objetivo:** comparar com honestidade — o que é medida e o que é debate.

**Parada 1.** Na tela: "Lado a lado. Inspiração não é cópia." — as duas redes lado a lado, barro contra esferas. *"Coloco as duas redes frente a frente. A regra: comparação honesta — nem exaltar, nem ridicularizar."*

**Parada 2.** Na tela: "**Neurônios**: o cérebro humano tem cerca de **86 bilhões** (valor aproximado). Grandes modelos de IA têm bilhões de **pesos**." — *"86 bilhões de neurônios (Azevedo, 2009) contra bilhões de pesos. Cuidado: neurônio e peso não são a mesma coisa — a comparação aqui é de grandeza, não de valor."*

**Parada 3.** Na tela: "**Energia**: o cérebro funciona com cerca de **20 watts**. Treinar grandes modelos de IA exige **data centers** inteiros." — *"O cérebro roda com cerca de 20 watts — uma lâmpada fraca (Raichle e Gusnard, 2002). Treinar modelos grandes envolve data centers inteiros (Strubell e colegas, 2019)."*

**Parada 4.** Na tela: "**Aprendizado**: uma criança aprende com poucos exemplos. Redes costumam precisar de **muitos** dados." — *"Uma criança sai dos poucos exemplos; redes, muitas vezes, precisam de milhares (Lake e colegas, 2017)."*

**Parada 5.** Na tela: "**Velocidade e escala**: máquinas processam volumes enormes de dados, sem cansar." — *"No volume, a máquina ganha: milhões de exemplos, sem cansar, sem dormir."*

**Parada 6.** Na tela: "**Compreensão, consciência, emoção**: perguntas em aberto. Ainda estão em debate." — *"E as perguntas grandes ficam em aberto — não afirmamos que a rede 'entende'. 'O debate está em aberto' é a frase honesta."*

## 9. No dia a dia — 6 paradas · ~1 min 45 · Gagné: avaliação

**Objetivo:** perder o distanciamento — cada aplicação mostrada é uma rede **que o público usou hoje**.

**Parada 1.** Na tela: "Assistentes de IA (ChatGPT, Claude)." — pergunte ao público: *"Levantem a mão quem usou um deles esta semana."* — e comente o resultado vindo da sala.

**Parada 2.** Na tela: "Tradução automática." — *"O tradutor do celular passa por uma rede neural."*

**Parada 3.** Na tela: "Desbloqueio pelo rosto." — *"Desbloqueou o celular com o rosto hoje? Foi uma rede treinada no seu rosto — e você a chama uma dúzia de vezes por dia."*

**Parada 4.** Na tela: "Recomendações de vídeos e músicas." — *"A rede que escolhe seu próximo vídeo soma tudo o que você assistiu até aqui."*

**Parada 5.** Na tela: "Assistência ao motorista." — *"E a ajuda no carro: manter na faixa, frear à frente de algo."*

**Parada 6.** Na tela: "Apoio a diagnóstico por imagem: quem decide é o médico." — *"Na medicina, a rede **apoia**: não substitui o médico. Guarde este ponto — ele volta no capítulo seguinte."*

## 10. Cuidados — 4 paradas · ~1 min 30 · Gagné: avaliação

**Parada 1.** Na tela: "**Viés**: aprende também os preconceitos dos dados". — *"A rede não sabe o que é justo — aprende o que os dados mostram. Dados com viés geram rede com viés: é o caso Gender Shades (Buolamwini e Gebru, 2018), de sistemas de rosto errando mais com mulheres de pele escura."*

**Parada 2.** Na tela: "**Alucinação**: inventa respostas com toda a confiança". — *"Quando não sabe, às vezes inventa a resposta com cara de verdade — o nome disso é alucinação (Ji e colegas, 2023). Sempre comprove o que ela diz."*

**Parada 3.** Na tela: "**Caixa-preta**: é difícil explicar por que decidiu". — *"A rede decide por soma e pesos: ninguém a abre e lê um 'porquê'. Abrir essas caixas-pretas é um tema ativo de pesquisa."*

**Parada 4.** Na tela: "**Energia**: treinar modelos grandes gasta muita eletricidade". — *"E o custo: treinar modelos grandes gasta energia real (Strubell e colegas, 2019). Vale em certos casos — mas não é de graça."*

## 11. Projeção — 5 paradas · ~2 min · Gagné: avaliação → síntese

**Fala-entre:** "Agora, o movimento que reúne as duas salas."

**Parada 1.** Na tela: "Duas salas, uma ideia: de sinais que chegam a um **modelo interno** que responde." — *"Do começo ao fim da apresentação: sinais chegam, um modelo interno se forma, e sai uma resposta. É o cérebro; é a rede; é a outra sala."*

**Parada 2.** Na tela: "**Teoria projetiva**: o cérebro nunca vê o mundo direto — monta um modelo interno e o **projeta** como mundo percebido." + nota "Velmans e Pereira Jr. (2018): projeção perceptual é efeito real, medido da visão de profundidade a cinemas 3D e hologramas." — a rede orgânica segura a da máquina sob o holofote. *"É o que Velmans e Pereira Jr. (2018) propõem: não vemos o mundo lá fora em direto — vemos a projeção do modelo que o cérebro monta. E projeção, aqui, é efeito medido: de percepção de profundidade a cinemas 3D e hologramas."*

**Parada 3.** Na tela: "**NCM** (Stanford, out/2026) sai do 'palavra por palavra': gera primeiro um esboço do conceito e refina nível por nível, em paralelo." + nota "Preprint: nos testes, 10–31× mais rápido que modelos de difusão recentes. Estrutura parecida com a percepção — mecânica diferente." — padrões em cascata na tela. *"Em outubro de 2026, um time de Stanford propôs o NCM (Next-Concept Modeling): sair do 'palavra por palavra'. Esboça primeiro o conceito e refina os detalhes nível por nível, em paralelo — nos testes, 10 a 31 vezes mais rápido que modelos de difusão recentes. É preprint, sem revisão por pares; o que importa aqui não é o recorde, é a forma: esboço antes, detalhe depois — como uma criança desenha."*

**Parada 4.** Na tela: "**Engenharia reversa** também monta um modelo interno vendo só o comportamento de fora. A rede o aprende por exemplos — e o **projeta** como resposta." — a rede da máquina e a orgânica se tocam. *"E a mesma ideia serve para a outra sala: a engenharia reversa também monta um modelo interno — vendo só o comportamento de fora, sem o código. Nos dois casos, do que chega de fora a um modelo próprio, e de volta para fora."*

**Parada 5.** Na tela: "Cérebro, rede e analista começam no sinal que chega e terminam com o modelo interno **projetado**: mundo percebido, resposta, documentação." — as duas redes unidas na mesma estrutura. *"Cérebro, rede e analista: todos começam no sinal que chega e terminam com o modelo interno projetado — mundo percebido, resposta, documentação. Essa é a ideia do dia inteiro."*

## 12. Final — 2 paradas · ~1 min · Gagné: retenção/transferência

**Parada 1.** Na tela: "Um sinal. Dois mundos. Uma rede." — o sinal da abertura atravessa as duas redes unidas. *"Um sinal. Dois mundos. Uma mesma ideia de rede — aprendida de maneiras diferentes."*

**Parada 2.** Na tela: "No fim, IA vs Humanos ou **IA com Humanos**?" — *"Depois de tudo o que vocês viram: o que acham — rival ou ferramenta? (pausa) Pra mim, a pergunta fica melhor assim: 'IA com Humanos'. Obrigado!"*

---

# Apêndice — os números exatos da demo (cap. 6)

Estes números vêm do próprio código (`src/presentations/redes-neurais/demo/mlp.js`), rede treinada no navegador com semente fixa (3) e taxa de aprendizado 0,03 — cada apresentação mostra exatamente os mesmos valores:

- Espiral, **1 camada × 2 neurônios**: ≈ 68% de acertos (erro 0,58).
- Espiral, **1 camada × 8 neurônios**: ≈ 94% (erro 0,17).
- Espiral, **2 camadas × 8**: 100% (erro ≈ 0,00).
- Espiral, **4 camadas × 8**: 100% (erro 0,00).
- Espiral, **8 camadas × 8** (400 épocas): ≈ 59% (erro 0,68) — e com 1 200 épocas só chega a ≈ 62%.
- Espiral, **12 camadas × 8** (1 200 épocas): ≈ 50% (erro 0,69).
- Círculos e XOR (2 camadas × 8): 100% nos dois.

**O "ponto ideal" de camadas, em detalhe.** Os acertos sobem até 2–4 camadas e **degradam** depois — este é um fenômeno publicado (He e colegas, 2016: no ImageNet, uma rede 'plana' de 34 camadas errou **mais** que uma de 18: 28,5% contra 27,9%). Não é que "oito vença"; é que **a partir de oito, sem técnica, a mini-rede deixa de melhorar** — e redes fundas de verdade só funcionam com ReLU e **conexões que pulam camadas** (ResNet). A apresentação nunca promete mais que o achado real.

**Perguntas prováveis do público — e respostas prontas:**

- *"Por que 8 camadas não vence, se tem mais capacidade?"* — O gradiente que volta enfraquece a cada camada (Glorot e Bengio, 2010). "Capacidade" não vence sem técnica; para redes fundas, o que resolve é ReLU + atalhos (ResNet).
- *"O NCM matou o LLM?"* — Não: é preprint de 2026, comparado a modelos de difusão, com trade-offs próprios. O que ofereceu foi um desenho diferente (esboço → detalhe).
- *"A rede entende o que faz?"* — Debate em aberto (cap. 8): nem afirmamos, nem negamos.
- *"IA vai substituir o médico?"* — Nas imagens, a rede **apoia** o diagnóstico; quem decide é o profissional (cap. 9).
- *"E a energia, quanto dá?"* — Ficamos no qualitativo: "data centers inteiros" (Strubell et al., 2019), sem números — eles mudam rápido e dependem do modelo.

---

*Fontes de cada afirmação: [`referencias.md`](referencias.md). Base didática: GAGNÉ, R. M.; GOLAS, K. C.; WAGER, W. W.; KELLER, J. M. Principles of Instructional Design (5. ed., 2005); MAYER, R. E. (org.) The Cambridge Handbook of Multimedia Learning (3. ed., 2021).*
