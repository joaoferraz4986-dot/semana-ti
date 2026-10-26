# Roteiro — Engenharia reversa de software

**11 capítulos · 48 paradas · ~21 min.** Cada avanço (seta, Espaço, PageDown) é uma **parada**, e cada parada faz **uma coisa animada acontecer na tela**. Este roteiro explica, capítulo a capítulo: o que aparece na tela, o que você diz (entre aspas) e a base das afirmações mais fortes. Os textos da tela são curtos de propósito — **o detalhe fica na fala**.

O fio condutor desta sala: **observar um programa de fora até entender o que ele faz por dentro** — e, no fecho, a conexão com a sala vizinha (redes neurais): os dois fazem o mesmo movimento.

Linguagem visual: **laranja sinal (#e4572e)** é a marca da apresentação; os objetos 3D são blocos, chips e um celular que se abre em fatias.

---

## Como usar este roteiro

- Fale **para o público**; as falas aqui são um apoio; adapte ao seu jeito, mantendo o conteúdo.
- Troque de parada **enquanto** diz a frase — a animação ilustra o que está sendo dito.
- Este deck **não tem demo ao vivo**: o cap. 7 é um caso conduzido com dados inventados (avisados na tela). No cap. 10 há a notícia de outubro de 2026 (REA) e o debate IA × engenheiro.
- Atalhos: **`D`** alterna tema claro/escuro, `H` abre os atalhos, `F` tela cheia, `Q` qualidade gráfica.
- Toda afirmação forte tem entrada em [`referencias.md`](referencias.md); os fatos do cap. 10 foram conferidos em fontes publicadas até 24/10/2026.

## Base didática herdada pelo desenho

**Gagné, Golas, Wager & Keller, *Principles of Instructional Design* (5. ed., Thomson/Wadsworth, 2005)** — o arco dos 9 eventos: atenção (cap. 1, o bloco selado), objetivos (fala de abertura), memória anterior (cap. 2, o celular que todo mundo carrega), conteúdo e condução (caps. 3–6), desempenho (cap. 7, seguir o caso reconstruindo a documentação), feedback (o resultado da documentação comparada com pistas), avaliação (caps. 8–10: onde se usa, o quanto custa, o que pode) e retenção/transferência (cap. 11, o fecho com a sala vizinha).

**Mayer (org.), *The Cambridge Handbook of Multimedia Learning* (3. ed., Cambridge UP, 2021)** — cada parada é um movimento (segmentação), o que importa é sinalizado (negrito e anotações), o texto na tela é curto porque a fala leva o detalhe (redundância), não há nada apenas decorativo (coerência) e o objeto 3D fica do lado do texto que o explica (contiguidade).

## A ordem dos capítulos, e por quê

1. **Abertura** ganha a atenção com o mistério (Gagné 1): um bloco selado — o que há dentro?
2. **O que é** ancora no objeto do dia a dia — o app no celular — antes de qualquer palavra técnica (memória prévia; Gagné 3).
3. **Duas direções** entrega o mapa do capítulo: existe o caminho de ida (compilar) e o caminho de volta (investigar).
4. **Por dentro** abre o "app" em cinco camadas — é a estrutura que todos os próximos capítulos vão usar.
5. **Descompilando** desce até os bytes e mostra o processo de reconstrução completo — o coração técnico.
6. **As ferramentas** dá nome aos instrumentos (DevTools, captura de tráfego, Ghidra/IDA, APK) — agora que o conceito já está formado.
7. **Estudo de caso** acompanha um caso do começo ao fim — desempenho e feedback (Gagné 6–7).
8. **Aplicações** mostra os usos reais (segurança, interoperabilidade, legados) e prepara o terreno ético.
9. **Limites e ética** delimita honestamente o que é possível — apresentação que só mostra poder não serve para decidir nada.
10. **IA vs Humanos** enfrenta a pergunta da semana: se quase tudo se automatiza, o que sobra para o humano? (REA, out/2026 — com fontes.)
11. **Final** devolve o mistério da abertura e faz a ponte para a sala das redes neurais — a transferência (Gagné 9).

---

## Fala de abertura (~40 s), sobre a tela 1

> "Boa tarde! Todo app que vocês usam — o do banco, o do jogo, o da escola — chegou ao celular como um programa pronto e fechado. Ninguém mandou o código junto. Mas e se vocês precisassem entender como ele funciona por dentro? Para integrar com outro sistema, para achar uma falha de segurança, para manter um sistema antigo que ninguém mais sabe como foi feito? Isso tem nome: **engenharia reversa de software**. E vamos terminar falando de uma notícia deste mês: uma ferramenta de IA que promete fazer isso sozinha. Será?"

---

## 1. Abertura — 2 paradas · ~1 min (com a fala de abertura) · Gagné: atenção

**Parada 1.** Na tela: "Descobrir o que um programa faz por dentro." — um bloco selado no escuro. Diga a fala de abertura e apoie no bloco: *"É só um bloco: fechado, intacto — e o desafio é descobrir o que ele faz."*

**Parada 2.** Na tela: "E se você tivesse o programa, mas **não o código?**" — a câmera se aproxima. Diga: *"O programa funciona e traz recursos úteis. Mas o texto com que ele foi construído — o código-fonte — não veio junto. Este capítulo é sobre esse universo fechado."*

## 2. O que é — 3 paradas · ~1 min 15 · Gagné: memória anterior

**Parada 1.** Na tela: "Engenharia reversa de software é estudar um programa pronto para entender **como ele funciona**, sem ter o código-fonte." — o celular apagado no centro. Diga: *"A definição é a clássica de Chikofsky e Cross (1990): analisar um sistema para reconstruir representações dele em outro nível de abstração. Na prática: entender o funcionamento a partir do programa, quando o projeto não veio junto."*

**Parada 2.** Na tela: "Você vê o app." — o celular liga. *"Na superfície: janelas, botões, animações. Tudo funciona — e é só esse 'tudo funcionando' que dá para observar."*

**Parada 3.** Na tela: "Mas não vê **como ele foi feito**." — o celular fica em interrogação. *"Dá para adivinhar como cada recurso foi construído? Nada do desenho interno se revela. Agora vamos contrastar com o caminho normal."*

## 3. Duas direções — 4 paradas · ~1 min 30 · Gagné: conteúdo

**Parada 1.** Na tela: "O **código-fonte** é texto escrito para pessoas lerem." — o código aparece na tela. Diga: *"O código-fonte é texto para humanos: nomes, comentários, a intenção de cada parte. (Neste exemplo, em C, simplificado — está nas referências.)"*

**Parada 2.** Na tela: "Compilar: Código-fonte → Compilador → Executável" — o bloco caminha do código para o compilador e sai como executável. *"O compilador converte linguagem humana em instrução de processador (Aho, Lam, Sethi e Ullman, 2006). Detalhe importante: **nomes e comentários não são necessários para rodar** — e é nessa viagem que grande parte do sentido se perde."*

**Parada 3.** Na tela: "Engenharia reversa: Pistas ← Análise ← Executável" — as setas invertem o fluxo. *"A engenharia reversa é o caminho oposto: só pistas chegam, e é delas que se infere. A direção muda; a pergunta continua a mesma: como isso funciona?"*

**Parada 4.** Na tela: "O caminho de volta não devolve o código original. Devolve **pistas**." — *"Ponto importante: **nunca** afirme que se recupera 'o código'. A descompilação devolve uma construção aproximada — Cifuentes (1994) estabeleceu os limites disso. O caminho de volta devolve um desenho possível, não o original."*

## 4. Por dentro de um app — 7 paradas · ~2 min · Gagné: conteúdo

**Objetivo:** trocar o mistério "app" pela estrutura em camadas — é essa organização que sustenta tudo o que vem.

**Parada 1.** Na tela: "Na tela, um app parece **uma coisa só**." — o celular ligado aparece no centro. Diga: *"Para quem usa, o app é uma coisa só. Por dentro, é um prédio."*

**Parada 2.** Na tela: "1. **Interface** o que o usuário vê" — a camada 1 acende. *"Tela, botões, gestos: a parte visível."*

**Parada 3.** Na tela: "2. **Lógica** o código que decide" — *"É onde as regras rodam: o que acontece a cada toque, o que é salvo, quando se decide."*

**Parada 4.** Na tela: "3. **Rede** a conversa com o servidor" — *"Quase todo app de hoje conversa com um servidor; as mensagens viajam pela rede. É uma conversa aberta — dá para ouvir."*

**Parada 5.** Na tela: "4. **Dados** o que fica guardado" — *"Preferências, cache, bancos locais: o que sobrevive ao fechar o app."*

**Parada 6.** Na tela: "5. **Binário** o que o processador executa" — *"E no fundo, a raiz: instruções nativas. É aí que 'programa fechado' é fechado de verdade."*

**Parada 7.** Na tela: "Cada camada se investiga de um jeito diferente." — *"Cinco camadas, cinco perguntas — e um tipo de ferramenta para cada uma. As ferramentas vêm daqui a pouco."*

## 5. Descompilando — 5 paradas · ~2 min · Gagné: conteúdo

**Objetivo:** desmontar uma função real (simplificada) de 14 bytes, do binário à lógica — o processo reconstrutivo completo em quatro degraus.

**Parada 1.** Na tela: "Vamos abrir o executável, **uma camada de cada vez**." — o bloco selado é fatiado. Diga: *"Fatiando: do fundo (os bytes) ao topo (o sentido)."*

**Parada 2.** Na tela: "**Binário**: os bytes que o processador lê." + nota "Exemplo simplificado: uma função de 14 bytes." — *"Os bytes seguem a codificação x86-64 real: comparar dois valores, saltar se forem diferentes, multiplicar, retornar. Menos de vinte bytes — e, para um humano olhando de fora, pouco amigável."*

**Parada 3.** Na tela: "**Assembly**: as mesmas instruções, uma por linha." — *"O disassembler dá nome a cada instrução: legível para quem foi treinado, mas ainda sem lógica 'humana'."*

**Parada 4.** Na tela: "**Pseudocódigo**: o que um descompilador reconstrói." + nota "Nomes e comentários se perderam: preco virou param_1." — *"O descompilador devolve algo próximo de C — mas sem nomes e sem comentários (que nunca viajaram no binário). 'preco' virou 'param_1': o sentido original se perde."*

**Parada 5.** Na tela: "**Lógica entendida**: a conclusão é de quem investiga." — *"O último degrau é do humano (hoje, às vezes, com IA no meio): juntar as pistas e dar nome ao que a função faz. 'Entendida' quando a lógica é reconstruída."*

## 6. As ferramentas — 4 paradas · ~1 min 30 · Gagné: conteúdo

**Objetivo:** dar nome às ferramentas de cada camada — só o conceito, sem receita.

**Parada 1.** Na tela: "**DevTools do navegador** / Inspecionar o HTML, o JavaScript e a rede de um site." — *"Para páginas web, o navegador já traz o instrumento embutido."*

**Parada 2.** Na tela: "**Captura de tráfego** / Ver as mensagens que o app troca com o servidor." — *"Ouvir a conversa da camada 3: essas mensagens abertas viram dados que a gente pode ler."*

**Parada 3.** Na tela: "**Disassemblers e descompiladores** / Ghidra (gratuito, liberado pela NSA em 2019) e IDA." — *"Ghidra é código aberto da NSA desde 2019; a IDA é o padrão comercial. São as chaves da camada do binário — do capítulo anterior."*

**Parada 4.** Na tela: "**Análise de APK** / Abrir o pacote de um app Android para ver como ele se organiza." + nota "Só a ideia de cada ferramenta: nada aqui ensina a contornar proteções." — *"O Android guarda os recursos num pacote examinável; olhar a organização é o começo. Nada aqui ensina a contornar proteções."*

## 7. Estudo de caso — 5 paradas · ~2 min · Gagné: desempenho + feedback

**Objetivo:** acompanhar um caso completo sem tocar em código — o público constrói mentalmente a documentação.

**Parada 1.** Na tela: "Você foi **autorizado** a integrar seu sistema com outro. Mas não existe documentação." + nota "Caso hipotético, com dados inventados." — *"Cenário autorizado, típico da rotina de integração. O manual não existe; o sistema, sim: ele conversa."*

**Parada 2.** Na tela: "O app conversa com o servidor **o tempo todo**." — *"Vemos o tráfego passar: requisições e respostas, umas atrás das outras."*

**Parada 3.** Na tela: "Congelamos uma **requisição**: método, endereço e dados enviados." — *"Olhamos uma de perto: o método diz a ação, o endereço diz a quem pedir, os dados levam o conteúdo — tudo junto, num pacote."*

**Parada 4.** Na tela: "E a **resposta** que volta." — *"E a resposta volta com o número do pedido — confere com o padrão."*

**Parada 5.** Na tela: "Juntando as peças, escrevemos a **documentação** que faltava." — *"Fecha o caso: método, endpoint, dados e resposta documentados. A documentação foi o produto final — a engenharia reversa também tem esse lado de produção. (Fonte do caso: rotina fictícia; dados inventados e avisados na tela.)"*

## 8. Aplicações — 5 paradas · ~1 min 30 · Gagné: avaliação

**Objetivo:** mostrar onde isso aparece no mundo real (e por que é útil).

**Parada 1.** Na tela: "Segurança e análise de malware" — *"Todo laboratório antivírus abre o executável de um vírus: aquilo é engenharia reversa."*

**Parada 2.** Na tela: "Interoperabilidade entre sistemas" — *"Quando não há manual, o comportamento observado vira a documentação — é o caso do capítulo anterior."*

**Parada 3.** Na tela: "Sistemas legados sem código-fonte" — *"Sistemas escritos há 30 anos que perderam o código: é pela engenharia reversa que continuam funcionando (e, às vezes, são migrados)."*

**Parada 4.** Na tela: "Preservação de jogos e software antigo" — *"Jogos antigos não rodariam mais no hardware de hoje: quem preserva estuda o programa por fora."*

**Parada 5.** Na tela: "Auditoria de segurança autorizada" — *"E a auditoria: achar a vulnerabilidade antes que quem ataca encontre."*

## 9. Limites e ética — 4 paradas · ~1 min 30 · Gagné: avaliação

**Objetivo:** o freio antes da aceleração — nada do que vimos autoriza a ignorar lei, contrato e ética.

**Parada 1.** Na tela: "O código recuperado é **incompleto**" — *"De volta ao ponto do capítulo 5: o retorno é incompleto — nomes, intenções e comentários não têm garantia."*

**Parada 2.** Na tela: "Leva **tempo** e exige conhecimento" — *"Não existe botão 'entender'. A reconstrução leva dias e exige conhecimento do sistema analisado."*

**Parada 3.** Na tela: "Leis, termos de uso e contratos podem **restringir**" — *"As leis variam: no Brasil, Lei 9.609/98 (art. 6º); na UE, Diretiva 2009/24 (art. 6º); nos EUA, DMCA §1201, com exceção para interoperabilidade (§1201-f). Nada disso é automático."*

**Parada 4.** Na tela: "Sempre com **autorização**" + nota "Não é automaticamente legal nem ilegal: depende do país e do objetivo." — *"E a regra de ouro desta sala: sempre com **autorização**. A decisão legal depende do país e do objetivo."*

## 10. IA vs Humanos — 6 paradas · ~2 min 30 · Gagné: avaliação (a notícia de outubro de 2026)

**Objetivo:** trazer a notícia real de outubro/2026 (REA) e separar fato, verdade, exagero e o papel humano.

**Parada 1. Cartão fato.** Na tela: "'Reconstruir qualquer software virou coisa de minutos' / Em outubro de 2026, o REA virou um dos repositórios que mais cresceram na história do GitHub. Vieram as manchetes." — *"Em outubro de 2026, o REA (*Reverse Engineer Anything*) virou um dos repositórios que mais cresceram na história do GitHub, e as manchetes garantiam: 'minutos, não anos'. O repositório é real; o crescimento é real. O número exato, não citamos: as fontes discordam e muda todo dia."*

**Parada 2. Cartão verdade.** Na tela: "Agentes de IA já operam ferramentas profissionais / Ghidra, IDA, Hopper, ferramentas do navegador: a IA lê programas compilados e capturas de rede bem mais rápido. A barreira de entrada caiu." — *"Isto é verdade e há meses acontece: agentes de IA já conectam Ghidra, IDA e afins e executam o ciclo completo. A barreira de entrada caiu."*

**Parada 3. Cartão exagero.** Na tela: "'É um novo descompilador que devolve o código original' / Não. É um conector entre agentes e ferramentas que existem há décadas. Devolve pseudocódigo, assembly e evidências, não o código-fonte original." + nota "Relatos informais mostram que nem sempre é mais rápido que abordagens simples." — *"E este é o ponto central: **não** é descompilador e **não** devolve o código original — é um conector entre ferramentas que já existiam (o próprio projeto diz). Com essa frase, o exagero do dia desaba."*

**Parada 4. Cartão humano.** Na tela: "Decidir o que é legal, ético e correto / A documentação do próprio REA diz: uso para pesquisa legítima, com autorização, e a responsabilidade é de quem usa. A ferramenta não muda a lei." — *"A pergunta que permanece: quem autoriza, quem assina, quem responde por um uso indevido? Isso não cabe em ferramenta: é decisão humana."*

**Parada 5. Cartão alerta.** Na tela: "Hype atrai golpe / No auge do sucesso, foi relatada uma cópia falsa do repositório distribuindo um trojan. Baixe só de fontes oficiais." — *"Caso real, relatado (não verificado de forma independente): no auge do hype, uma cópia falsa do repositório distribuía trojan. Baixe só de fonte oficial — e veja como hype e golpe andam juntos."*

**Parada 6.** Na tela: "A IA lê as fatias mais rápido. **Quem decide o que fazer com elas ainda somos nós.**" — *"Frase final: a aceleração é real; a responsabilidade continua nossa."*

## 11. Final — 3 paradas · ~1 min · Gagné: retenção/transferência · a ponte entre as salas

**Parada 1.** Na tela: "Observar. Analisar. Documentar. Com autorização." — o bloco aberto e o aplicativo montado, lado a lado. Diga: *"Estes quatro passos resumem o método: observamos, analisamos, documentamos — sempre com autorização."*

**Parada 2.** Na tela: "Na sala das **redes neurais**, a máquina também aprende do exemplo de fora — e projeta seu modelo como resposta." — a rede de esferas acende ao fundo. *"E aqui fechamos com a sala vizinha: o mesmo movimento. Do que se vê de fora, as duas constroem um modelo interno — a engenharia reversa devolve **compreensão**; a rede neural devolve **respostas projetadas**."*

**Parada 3.** Na tela: "Se você pudesse investigar **qualquer software**, qual escolheria?" — *Feche com a pergunta no público; colha algumas respostas em voz alta e agradeça: "Obrigado!"*

---

# Apêndice — o exemplo técnico (cap. 5) e a notícia (cap. 10)

**O exemplo dos 14 bytes.** A função é simplificada, mas os bytes são **reais**: `83 FF 0A` = `cmp edi, 10` (comparar); `75 08` = `jne +8` (saltar se os valores forem diferentes); `F3 0F 59 05…` = `mulss` (multiplicar em ponto flutuante); `C3` = `ret` (retornar) — tudo em x86-64, com a convenção de chamada System V AMD64 usada em Linux/macOS. O código C, o assembly e o pseudocódigo estão em `referencias.md` (seção "O exemplo da função").

**A notícia do REA (fontes conferidas em 24/10/2026).** O repositório é real (`github.com/morluto/rea`), anuncia crescimento recorde e é um **conector MCP** entre agentes de IA e ferramentas de análise clássicas (Hopper, Ghidra, IDA). Cifras divergem entre as fontes e mudam todo dia — por isso a apresentação diz "um dos repositórios que mais cresceram" **sem número**. Todas as fontes estão em `referencias.md`.

**Perguntas prováveis do público — e respostas prontas:**

- *"Engenharia reversa é 'hackear'?"* — Não: é analisar (Chikofsky e Cross, 1990). Legalidade depende da lei local e do objetivo (cap. 9).
- *"A IA vai substituir o analista?"* — Não por enquanto: a IA não devolve código-fonte (cap. 10, cartão 'exagero'). O analista **entende**, decide e responde pela conclusão — trabalha menos no braço, mais na decisão.
- *"A IA devolve o código original?"* — Não: nomes e comentários nunca viajaram no binário (caps. 3 e 5); o que sai é pseudocódigo e evidências.
- *"Isso é legal?"* — Depende do país e do objetivo (cap. 9): no Brasil, Lei 9.609/98; na UE, Diretiva 2009/24; nos EUA, DMCA §1201. E sempre com autorização.

---

*Fontes de cada afirmação: [`referencias.md`](referencias.md). Base didática: GAGNÉ, R. M.; GOLAS, K. C.; WAGER, W. W.; KELLER, J. M. Principles of Instructional Design (5. ed., 2005); MAYER, R. E. (org.) The Cambridge Handbook of Multimedia Learning (3. ed., 2021).*
