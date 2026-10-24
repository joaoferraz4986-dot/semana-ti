# Roteiro — Redes neurais

**11 capítulos · 47 paradas · ~19 min.** Cada "**→**" é um clique no passador (PageDown) ou na seta. **Cada clique faz uma coisa acontecer na tela**: diga a frase daquele passo enquanto a animação acontece. Nada na tela é clicável.

A ideia que amarra tudo: **um sinal atravessa a apresentação inteira**. Ele nasce no escuro, passa por um neurônio de verdade, vira um neurônio matemático, atravessa camadas, volta como erro, aprende ao vivo e, no fim, liga a rede humana à rede da máquina.

Cores: **terracota** = humano/biológico · **cobalto (azul)** = máquina/artificial.

---

## Fala de abertura (~40 s), sobre a tela 1

> "Boa tarde! Tudo o que vocês pensam agora, cada palavra que estão lendo, passa por sinais elétricos minúsculos correndo entre neurônios. Olhem esse pontinho de luz: é um sinal. Sozinho, ele não faz nada. Mas quando milhões se conectam, aparece algo incrível: aprendizado. Hoje a gente vai ver como os computadores copiaram, de um jeito bem simplificado, essa ideia. E vamos ver uma rede neural aprendendo **ao vivo**, aqui na frente de vocês."

---

## 1. Abertura · holofote · ~1 min 15 s · 2 paradas

| Passo | Na tela | Diga |
| --- | --- | --- |
| (início) | No escuro, um único pulso quente perto de um neurônio | Fala de abertura. "Um sinal." |
| → | A rede orgânica cresce a partir dele | "Depois, muitos. A pergunta de hoje é: como uma máquina aprende a partir de exemplos?" |

## 2. O neurônio biológico · ~1 min 45 s · 5 paradas

| Passo | Na tela | Diga |
| --- | --- | --- |
| (entra) | O neurônio inteiro, como modelo de museu | "Isso é um neurônio, a célula do cérebro. Ele recebe sinais, decide e passa adiante." |
| → | Close nos dendritos; pulsos chegando | "Os **dendritos** são como antenas: recebem sinais de outros neurônios." |
| → | O corpo celular | "O **corpo celular** junta tudo. Se a soma dos estímulos for forte o bastante, ele **dispara**. Se não, fica quieto." |
| → | O sinal corre pelo axônio | "O **axônio** é o fio que leva o sinal adiante, às vezes por distâncias enormes para uma célula." |
| → | Pontinhos cruzam a sinapse | "Na **sinapse**, o sinal vira química: substâncias atravessam um espaço minúsculo e passam o recado ao próximo neurônio." |

**Pergunta provável:** "Quantos neurônios a gente tem?" **Resposta:** "Cerca de 86 bilhões, segundo um estudo de 2009. É um valor aproximado. Vamos voltar a esse número."

## 3. Do biológico ao artificial · ~2 min · 5 paradas

| Passo | Na tela | Diga |
| --- | --- | --- |
| (entra) | O barro se recolhe e nasce um neurônio de cerâmica branca | "Os cientistas criaram uma versão **matemática** do neurônio. É inspirada no cérebro, mas **não é uma cópia**: é bem mais simples." |
| → | Três entradas: x₁ = 0,8, x₂ = 0,2, x₃ = 0,5 | "Em vez de sinais elétricos, chegam **números**: as entradas." |
| → | Os cabos ganham espessura; pesos 0,9, −0,4, 0,6 | "Cada entrada tem um **peso**, o quanto ela importa. O cabo mais grosso pesa mais. O peso negativo (terracota) **atrapalha** o disparo." |
| → | Σ = 1,04 e viés 0,1 | "O neurônio **soma** tudo: 0,8 × 0,9 + 0,2 × (−0,4) + 0,5 × 0,6, mais um ajuste chamado **viés**. Dá 1,04." |
| → | O nó acende em azul; saída 0,74 | "A **ativação** transforma essa soma num sinal de saída entre 0 e 1. Aqui deu 0,74: ele 'disparou' forte." |

**Pergunta provável:** "Quem escolhe os pesos?" **Resposta:** "Ninguém escolhe na mão. A rede **aprende** os pesos sozinha durante o treinamento. É o capítulo 5."

## 4. Camadas · ~1 min 30 s · 4 paradas

| Passo | Na tela | Diga |
| --- | --- | --- |
| (entra) | Só a coluna de entrada | "Um neurônio sozinho faz pouco. Então a gente monta **camadas**. Primeiro, a **entrada**: por exemplo, os pixels de uma foto." |
| → | Aparecem as camadas ocultas | "As **camadas ocultas** ficam no meio. Cada neurônio combina o que veio da camada anterior." |
| → | A saída: gato e cachorro | "Na **saída**, um neurônio para cada resposta possível: gato ou cachorro." |
| → | Pulsos atravessam; "cachorro" acende | "O sinal atravessa a rede camada por camada e sai uma resposta. Reparem: ela disse **cachorro**. Era a foto de um gato." |

## 5. Como ela aprende · ~2 min · 4 paradas · **pergunta ao público**

**Antes de entrar, pergunte:** "Como vocês acham que a rede descobre que errou?"

| Passo | Na tela | Diga |
| --- | --- | --- |
| (entra) | O medidor de erro vai lá em cima | "A rede respondeu cachorro, mas era gato. O **erro** mede o quanto a resposta ficou longe da certa. Aqui, está alto." |
| → | Pulsos vermelhos voltam de trás para frente | "Agora o truque: o erro **volta** pela rede, da saída para a entrada. Isso se chama **retropropagação**. Ele mostra a culpa de cada peso no erro." |
| → | Os cabos mudam de espessura; o erro cai pela metade | "Cada **peso** muda um pouquinho, na direção que diminui o erro." |
| → | "Gato" acende; o erro quase zera | "Repetindo isso com milhares de **dados de treino** (cada volta completa é uma **época**), o erro cai. A rede aprendeu." |

**Pergunta provável:** "Ela aprende sozinha, então?" **Resposta:** "Ela ajusta os pesos sozinha, mas alguém escolhe os dados, diz qual é a resposta certa e decide quando parar. Sem bons exemplos, ela aprende errado."

## 6. Demonstração ao vivo · holofote · ~3 min · 5 paradas

É uma **rede neural de verdade treinando no navegador**, sem internet e sem bibliotecas. Os números na tela são reais. A semente é fixa, então **o resultado é sempre o mesmo**: vocês podem ensaiar com tranquilidade.

| Passo | Na tela | Diga | O que vai acontecer |
| --- | --- | --- | --- |
| (entra) | A prancha "Espiral" só com pontos | "Cada ponto é um exemplo. A rede precisa aprender a separar os **terracota** dos **azuis**. É difícil: eles formam duas espirais entrelaçadas." | Nada treina ainda. |
| → | 1 camada · 2 neurônios. A rede começa a treinar | "Primeiro, uma rede com **só 2 neurônios**. Olhem o fundo da prancha: é o que a rede 'acha' de cada lugar. Ela tenta... mas só consegue traçar fronteiras quase retas." | Para em ~**68%** de acertos, erro **0,58**. A fronteira não faz a curva. |
| → | 1 camada · 8 neurônios | "Com **8 neurônios**, cada um pode desenhar um pedacinho de fronteira, e juntos fazem curvas." | Sobe para ~**94%**, erro **0,17**. Melhora, mas ainda erra no miolo. |
| → | 2 camadas · 8 neurônios | "Agora **duas camadas**. A segunda combina as curvas da primeira em formas mais complexas. Olhem o erro despencar." | Chega a **100%**, erro **0,00**. A fronteira acompanha a espiral. |
| → | Círculos e XOR, em sequência | "A **mesma** rede aprende outros padrões: círculos, um dentro do outro, e o XOR, cantos opostos com a mesma cor." | Os dois chegam a 100% em poucos segundos e se alternam. |

**Por que poucos neurônios falham?** Cada neurônio oculto, sozinho, só sabe traçar uma linha "dobrada" num lugar. Com 2 deles a rede só junta 2 dobras, e uma espiral precisa de muitas. Mais neurônios = mais dobras. Mais camadas = dobras de dobras, ou seja, formas mais complexas com menos peças.

**Se algo estranho acontecer:** volte um passo (PageUp) e avance de novo. O treino recomeça do zero, igual.

**Pergunta provável:** "Então é só colocar um monte de neurônios?" **Resposta:** "Mais neurônios dão mais capacidade, mas também custam mais para treinar e podem 'decorar' os exemplos em vez de aprender o padrão. Escolher o tamanho certo é parte do trabalho de quem projeta a rede."

## 7. O que a rede "vê" · ~1 min 45 s · 4 paradas

| Passo | Na tela | Diga |
| --- | --- | --- |
| (entra) | Um gato em pixels | "Para a rede, uma foto não é um gato: é uma grade de **pixels**." |
| → | Os pixels escuros sobem; cartão de números | "Cada pixel vira um **número**: perto de 0 é claro, perto de 1 é escuro. Aqui vocês veem um pedaço da foto em números." |
| → | A rede aparece e os números entram nela | "Esses números entram na rede, um em cada neurônio de entrada." |
| → | Cartões: bordas → formas → objetos | "Em redes de imagem, as primeiras camadas tendem a captar **bordas**; as do meio, **formas**; as finais, **objetos inteiros**. É uma tendência que pesquisadores observaram, não uma regra fixa." |

## 8. Cérebro e máquina · ~2 min 30 s · 6 paradas · **pergunta ao público**

Em cada comparação, **pergunte antes de clicar**: "Quem vocês acham que ganha nisso, cérebro ou máquina?"

| Passo | Na tela | Diga |
| --- | --- | --- |
| (entra) | A rede de barro e a rede de cerâmica lado a lado | "Lado a lado. A rede artificial foi inspirada no cérebro, mas inspiração não é cópia." |
| → | Neurônios | "O cérebro humano tem cerca de **86 bilhões** de neurônios, valor aproximado. Os grandes modelos de IA têm **bilhões de pesos**. São números enormes, mas não dá para comparar um a um: um neurônio de verdade é muito mais complexo que um nó matemático." |
| → | Energia | "Energia: o cérebro funciona com uns **20 watts**, menos que uma lâmpada. Treinar grandes modelos exige **data centers** inteiros." |
| → | Aprendizado | "Uma criança vê dois ou três gatos e já reconhece gatos. Redes costumam precisar de **muitos** exemplos." |
| → | Velocidade e escala | "Mas a máquina processa volumes enormes de dados, rápido e sem cansar." |
| → | Compreensão e consciência | "E entender de verdade, ter consciência, sentir emoção? São **perguntas em aberto**. Cientistas e filósofos ainda debatem." |

## 9. Onde elas já estão · ~1 min 30 s · 6 paradas

Uma frase por clique. Os rótulos da rede mostram o que **entra** e o que **sai** em cada caso.

| Passo | Diga |
| --- | --- |
| (entra) | "**Assistentes de IA**, como ChatGPT e Claude: entra o texto que você digitou, sai a próxima palavra provável, uma de cada vez." |
| → | "**Tradução automática**: entra uma frase em inglês, sai em português." |
| → | "**Desbloqueio pelo rosto**: entra a foto do rosto, sai 'é o dono do celular?'." |
| → | "**Recomendações**: entra o que você já assistiu, sai o que sugerir depois." |
| → | "**Assistência ao motorista**: entra a imagem da câmera, sai faixa, pedestre, placa." |
| → | "**Apoio a diagnóstico por imagem**: a rede aponta regiões para o médico revisar. Quem decide é o médico." |

## 10. E os limites? · ~1 min 15 s · 4 paradas

| Passo | Diga |
| --- | --- |
| (entra) | "**Viés**: se os dados de treino tiverem preconceito, a rede aprende o preconceito junto." |
| → | "**Alucinação**: modelos de linguagem às vezes inventam respostas, com toda a confiança. Sempre confira." |
| → | "**Caixa-preta**: com milhões de pesos, é difícil explicar por que a rede decidiu algo." |
| → | "**Energia**: treinar modelos grandes gasta muita eletricidade." |

**Pergunta provável:** "Dá para tirar o viés?" **Resposta:** "Dá para reduzir: escolhendo melhor os dados, testando a rede com grupos diferentes, corrigindo. Mas exige atenção humana o tempo todo."

## 11. Final · holofote → estúdio · ~1 min 15 s (com encerramento) · 2 paradas · **pergunta ao público**

| Passo | Na tela | Diga |
| --- | --- | --- |
| (entra) | As duas redes se aproximam e uma ponte as liga; o pulso do começo corre por ela | "Lembram do sinal do começo? Ele passou pelo neurônio, virou número, atravessou camadas e aprendeu. A máquina aprende com exemplos. **Nós escolhemos quais exemplos dar.**" |
| → | A luz abre para o estúdio | Fala de encerramento e pergunta final. |

---

## Fala de encerramento (~40 s)

> "Redes neurais não são cérebros, mas aprenderam uma lição com eles: juntar coisas simples, ajustar com os erros e repetir. Hoje vocês viram uma aprendendo ao vivo. E o detalhe mais importante: a rede só aprende o que os exemplos ensinam. Quem escolhe os dados, quem confere as respostas e quem decide onde usar somos nós. Então fica a pergunta: no fim, é IA **contra** humanos, ou IA **com** humanos? Obrigado!"

---

## Os 3 momentos para perguntar ao público

1. **Capítulo 5 (antes de entrar):** "Como vocês acham que a rede descobre que errou?"
2. **Capítulo 8 (a cada comparação):** "Quem ganha nisso, cérebro ou máquina?"
3. **Capítulo 11:** "IA contra humanos, ou IA com humanos?"

## Tempo por capítulo

| Cap. | Paradas | Tempo |
| --- | --- | --- |
| 1 Abertura (com fala) | 2 | 1:15 |
| 2 Neurônio biológico | 5 | 1:45 |
| 3 Do biológico ao artificial | 5 | 2:00 |
| 4 Camadas | 4 | 1:30 |
| 5 Como ela aprende | 4 | 2:00 |
| 6 Demo ao vivo | 5 | 3:00 |
| 7 O que a rede "vê" | 4 | 1:45 |
| 8 Cérebro e máquina | 6 | 2:30 |
| 9 Onde elas já estão | 6 | 1:30 |
| 10 Limites | 4 | 1:15 |
| 11 Final (com encerramento) | 2 | 1:15 |
| **Total** | **47** | **≈ 19:45** |

Para caber em 15 min: no capítulo 8, não esperem respostas do público em todas as comparações (só na de energia); no capítulo 9, uma frase curta por item.

## Colinha de atalhos

| Ação | Tecla |
| --- | --- |
| Avançar | `PageDown` (passador) · `→` · `Espaço` |
| Voltar | `PageUp` (passador) · `←` |
| Tela cheia | `F` |
| Travou ou está lento | `Q` (até "Baixa") |
| Câmera estranha | `R` |
| Ver atalhos | `H` |
| Ir direto à demo | endereço `…/redes-neurais/#capitulo-06` |
