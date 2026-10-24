# Roteiro — Engenharia reversa de software

**11 capítulos · 47 paradas · ~19 min.** Cada "**→**" é um clique no passador (PageDown) ou na seta. **Cada clique faz uma coisa acontecer na tela**: diga a frase daquele passo *enquanto* a animação acontece. Não há nada para clicar com o mouse.

Combinem antes quem fala cada capítulo. Falem para o público, não para a tela.

---

## Fala de abertura (~40 s), sobre a tela 1

> "Boa tarde! Todo app que vocês usam (o do banco, o do jogo, o da escola) chegou no celular de vocês como um programa pronto, fechado. Ninguém mandou o código junto. Mas e se vocês precisassem entender como ele funciona por dentro? Para integrar com outro sistema, para achar uma falha de segurança, para manter um sistema antigo que ninguém mais sabe como foi feito? Isso tem nome: **engenharia reversa de software**. E no final a gente vai falar de algo que aconteceu agora em outubro: uma ferramenta de IA que promete fazer isso sozinha. Será?"

---

## 1. Abertura · holofote · ~1 min 30 s (com a fala de abertura) · 2 paradas

| Passo | Na tela | Diga |
| --- | --- | --- |
| (início) | O bloco preto surge do escuro sob o holofote | Fala de abertura. "Esse bloco é um **programa pronto**, um executável." |
| → | A câmera se aproxima; aparece "app" gravado | "E se você tivesse o programa, mas não o código? É essa a pergunta de hoje." |

**Pergunta provável:** "Isso é pirataria?" **Resposta:** "Não necessariamente. Pirataria é copiar e distribuir sem permissão. Engenharia reversa é **entender**. Ainda vamos falar dos limites."

## 2. O que é · ~1 min 15 s · 3 paradas · **pergunta ao público**

| Passo | Na tela | Diga |
| --- | --- | --- |
| (entra) | Celular com a tela apagada | "Engenharia reversa de software é estudar um programa pronto para entender como ele funciona, **sem ter o código-fonte**." |
| → | A tela acende: app "Lanchonete Pátio" | "Você vê o app: a lista, os preços, o botão." |
| → | O celular gira e mostra as costas: "código-fonte: não vem junto" | "Mas não vê **como ele foi feito**. O código-fonte fica com quem desenvolveu." |

**Pergunta ao público (antes do 3º clique):** "Quem aqui já apertou F12 num site para ver o código da página?" Comente: "isso já é o comecinho de engenharia reversa".

## 3. Duas direções · ~1 min 45 s · 4 paradas

| Passo | Na tela | Diga |
| --- | --- | --- |
| (entra) | Placa com código C (`calcular_desconto`) ao lado do bloco aberto | "Isso é **código-fonte**: texto escrito para pessoas lerem, com nomes e comentários." |
| → | A placa entra no bloco, que se fecha; fluxo **Código-fonte → Compilador → Executável** | "O **compilador** transforma esse texto em instruções de máquina. Sai um executável, feito para o processador, não para gente." |
| → | Uma fatia do bloco começa a sair; fluxo reverso **Pistas ← Análise ← Executável** | "Engenharia reversa é o caminho de volta: a gente parte do executável e analisa." |
| → | A primeira fatia sai e mostra bytes | "Mas atenção: o caminho de volta **não devolve o código original**, devolve **pistas**. Nomes e comentários se perdem na compilação." |

**Pergunta provável:** "Dá para 'descompilar' e pegar o código igualzinho?" **Resposta:** "Não. O descompilador reconstrói algo parecido, mas os nomes, os comentários e a organização original não existem mais no executável."

## 4. Por dentro de um app · holofote · ~2 min 15 s · 7 paradas

| Passo | Na tela | Diga |
| --- | --- | --- |
| (entra) | Celular sob o holofote | "Na tela, um app parece uma coisa só. Mas ele tem camadas." |
| → | A **interface** sai da tela e flutua | "1, **Interface**: o que o usuário vê e toca." |
| → | Sai a placa de **lógica** (código) | "2, **Lógica**: o código que decide: adicionar ao carrinho, calcular o total." |
| → | Sai a placa de **rede** (setas app ↔ servidor) | "3, **Rede**: o app conversa com um servidor pela internet, pedindo o cardápio e enviando o pedido." |
| → | Sai a placa de **dados** (tabela) | "4, **Dados**: o que fica guardado: itens, preços, pedidos." |
| → | Sai a placa de **binário** | "5, **Binário**: no fundo, tudo vira bytes que o processador executa." |
| → | A câmera recua e mostra as 5 camadas | "Cada camada se investiga de um jeito diferente. Vamos ver a mais profunda primeiro." |

**Pergunta provável:** "Todo app tem essas camadas?" **Resposta:** "Quase todos. Às vezes a lógica fica mais no servidor do que no celular, mas a ideia é a mesma."

## 5. Descompilando · ~2 min · 5 paradas

| Passo | Na tela | Diga |
| --- | --- | --- |
| (entra) | O bloco fechado | "Vamos abrir o executável, uma camada de cada vez." |
| → | Sai a 1ª fatia: **binário** (bytes em hexadecimal, a função em laranja) | "Primeiro nível: os **bytes**. Os laranjas são os 14 bytes da nossa função. Para nós, ilegível." |
| → | Sai a 2ª: **assembly** | "Um **disassembler** traduz os bytes em instruções: compara com 10, pula, multiplica, retorna. Já dá para ler, com esforço." |
| → | Sai a 3ª: **pseudocódigo** | "Um **descompilador**, como o Ghidra, reconstrói algo parecido com C. Mas reparem: `preco` virou `param_1`, e o comentário sumiu." |
| → | Sai a 4ª: **lógica entendida** (fluxograma) | "E a conclusão é de quem investiga: 'dá 10% de desconto quando o cupom é 10'. Isso nenhuma ferramenta escreve para você com certeza: **você confirma**." |

**Pergunta provável:** "Por que os nomes somem?" **Resposta:** "O processador não precisa de nomes, só de endereços. Então o compilador joga fora. Às vezes sobram nomes de funções exportadas ou informações de depuração, mas não dá para contar com isso."

## 6. As ferramentas · ~1 min 45 s · 4 paradas

| Passo | Na tela | Diga |
| --- | --- | --- |
| (entra) | O app com interface e lógica levantadas | "**DevTools do navegador**: a ferramenta que vocês já têm. Mostra o HTML, o JavaScript e a aba Rede de qualquer site." |
| → | Servidor aparece; contas correm pelo cabo | "**Captura de tráfego**: ver as mensagens que um app troca com o servidor." |
| → | Volta para a fatia de assembly | "**Disassemblers e descompiladores**: o Ghidra é gratuito e foi liberado pela NSA, a agência de segurança dos EUA, em 2019. O IDA é o clássico comercial." |
| → | As camadas do app abertas | "**Análise de APK**: um app Android é um pacote, e dá para abrir e ver como ele se organiza. Só a ideia: aqui não ensinamos a contornar proteção nenhuma." |

**Pergunta provável:** "Isso é difícil de aprender?" **Resposta:** "O DevTools vocês aprendem numa tarde. Assembly e descompiladores levam mais tempo, mas a base é a mesma que vocês já estudam: lógica de programação."

## 7. Estudo de caso: uma API sem manual · ~2 min · 5 paradas

| Passo | Na tela | Diga |
| --- | --- | --- |
| (entra) | Celular, cabo e o servidor ("sistema sem documentação") | "Caso hipotético: vocês foram **autorizados** a integrar o sistema da escola com o app da lanchonete. Mas a API não tem documentação nenhuma." |
| → | Contas correm pelo cabo nos dois sentidos | "O app conversa com o servidor o tempo todo: as laranjas vão, as brancas voltam." |
| → | Uma conta para no ar; cartão **POST /api/pedidos** | "A gente congela uma **requisição**: o método (POST), o endereço e os dados em JSON. Agora sabemos como se faz um pedido." |
| → | Volta a resposta: **201 Created** | "E a **resposta**: o pedido criado, número 4812, status 'em preparo'." |
| → | Os cartões viram uma folha de documentação | "Juntando as peças, escrevemos a **documentação** que faltava, só observando o comportamento, sem ver uma linha do código do servidor." |

**Pergunta provável:** "Por que não pedir a documentação para a empresa?" **Resposta:** "Sempre peça primeiro! Engenharia reversa é para quando ela não existe ou se perdeu, e sempre com autorização."

## 8. Onde é usado · ~1 min 15 s · 5 paradas

| Passo | Na tela | Diga |
| --- | --- | --- |
| (entra) | O executável fechado | "**Segurança**: analistas abrem vírus e malware para entender o que fazem e como se defender." |
| → | O tráfego do caso da API | "**Interoperabilidade**: fazer sistemas diferentes conversarem." |
| → | A fatia de pseudocódigo | "**Sistemas legados**: programas antigos que funcionam, mas cujo código se perdeu." |
| → | O app visto de cima | "**Preservação**: manter jogos e softwares antigos funcionando." |
| → | Tudo junto | "**Auditoria de segurança autorizada**: empresas contratam gente para achar falhas antes dos criminosos." |

## 9. Limites e ética · ~1 min 15 s · 4 paradas

| Passo | Na tela | Diga |
| --- | --- | --- |
| (entra) | Pseudocódigo com "preco virou param_1" e "comentários: perdidos" | "O código recuperado é **incompleto**: sem nomes, sem comentários, sem a intenção de quem escreveu." |
| → | A fatia de assembly | "Leva **tempo** e exige conhecimento." |
| → | O executável fechado | "**Leis, termos de uso e contratos** podem restringir o que você pode fazer. Depende do país e do objetivo." |
| → | Visão geral | "E a regra de ouro: **sempre com autorização**. Engenharia reversa não é automaticamente legal nem ilegal." |

**Pergunta provável:** "No Brasil pode?" **Resposta:** "A Lei de Software (9.609/98) trata dos direitos sobre programas e lista algumas exceções, como integrar um programa a outro quando é indispensável para o usuário. Mas cada caso depende do contrato e do uso. Na dúvida, peça autorização e orientação jurídica."

## 10. A IA vai fazer engenharia reversa sozinha? · ~2 min 30 s · 6 paradas · **pergunta ao público**

**Antes do 1º cartão, pergunte:** "Levanta a mão quem acha que a IA já consegue fazer engenharia reversa sozinha." (Conte as mãos, sem julgar.)

| Passo | Na tela | Diga |
| --- | --- | --- |
| (entra) | Cartão **O que aconteceu**; as fatias expostas como peças de museu | "Em outubro, o REA virou um dos repositórios que mais cresceram na história do GitHub. Vieram manchetes dizendo que reconstruir qualquer software virou coisa de minutos." |
| → | **Verdade** | "É verdade que agentes de IA já operam ferramentas profissionais, como Ghidra, IDA e Hopper, e leem programas compilados muito mais rápido. A barreira para começar caiu." |
| → | **Exagero**, com a fatia de pseudocódigo | "Mas o REA não é um descompilador novo: é um **conector** entre a IA e ferramentas que já existem há décadas. E ele devolve pseudocódigo e evidências, não o código original. Olhem: `param_1` continua `param_1`. Relatos informais mostram que nem sempre é mais rápido." |
| → | **Continua humano** | "A própria documentação do REA diz: uso legítimo, com autorização, e a responsabilidade é de quem usa. A ferramenta não muda a lei." |
| → | **Golpe** | "Lição de segurança: no auge do hype, foi relatada uma cópia falsa do repositório espalhando um trojan. Hype atrai golpe. Baixe só de fonte oficial." |
| → | Frase final | "A IA lê as fatias mais rápido. **Quem decide o que fazer com elas ainda somos nós.**" |

**Regras:** não mostrem número de estrelas do GitHub (muda todo dia e as fontes discordam) e não demonstrem comandos da ferramenta.

**Pergunta provável:** "A IA vai substituir o programador?" **Resposta:** "Ela acelera ler, buscar e resumir. Decidir o que é certo, seguro e legal continua sendo trabalho de gente. É mais 'IA com humanos' do que 'IA contra humanos'."

## 11. Final · holofote → estúdio · ~1 min 30 s (com encerramento) · 2 paradas · **pergunta ao público**

| Passo | Na tela | Diga |
| --- | --- | --- |
| (entra) | O executável se fecha de novo, o app ao lado, sob o holofote | "Lembram da caixa-preta do começo? Agora vocês sabem o que tem dentro e como se investiga: observar, analisar, documentar, com autorização." |
| → | A luz abre para o estúdio inteiro | Fala de encerramento + pergunta: "Se vocês pudessem investigar **qualquer software**, qual escolheriam?" (ouçam 2 ou 3 respostas) |

---

## Fala de encerramento (~40 s)

> "Engenharia reversa é transformar curiosidade em entendimento. Começa com uma pergunta simples, 'como esse programa funciona?', e passa por observar, analisar e documentar. Hoje a IA ajuda a ler as evidências muito mais rápido, mas decidir o que é seguro, legal e certo continua sendo trabalho nosso. Entender o que já existe é o primeiro passo para criar o que vem depois. E aí: se vocês pudessem investigar qualquer software, qual seria? Obrigado!"

---

## Os 3 momentos para perguntar ao público

1. **Capítulo 2:** "Quem já apertou F12 num site?"
2. **Capítulo 10 (antes do 1º cartão):** "Quem acha que a IA já faz engenharia reversa sozinha?"
3. **Capítulo 11:** "Se pudessem investigar qualquer software, qual escolheriam?"

## Tempo por capítulo

| Cap. | Paradas | Tempo |
| --- | --- | --- |
| 1 Abertura (com fala) | 2 | 1:30 |
| 2 O que é | 3 | 1:15 |
| 3 Duas direções | 4 | 1:45 |
| 4 Por dentro de um app | 7 | 2:15 |
| 5 Descompilando | 5 | 2:00 |
| 6 As ferramentas | 4 | 1:45 |
| 7 Uma API sem manual | 5 | 2:00 |
| 8 Onde é usado | 5 | 1:15 |
| 9 Limites e ética | 4 | 1:15 |
| 10 A IA sozinha? | 6 | 2:30 |
| 11 Final (com encerramento) | 2 | 1:30 |
| **Total** | **47** | **≈ 19:00** |

Para caber em 15 min: passem rápido pelo capítulo 8 (uma frase por item) e juntem os passos 3 e 4 do capítulo 7.

## Colinha de atalhos

| Ação | Tecla |
| --- | --- |
| Avançar | `PageDown` (passador) · `→` · `Espaço` |
| Voltar | `PageUp` (passador) · `←` |
| Tela cheia | `F` |
| Travou ou está lento | `Q` (até "Baixa") |
| Câmera estranha | `R` |
| Ver atalhos | `H` |
| Ir direto a um capítulo | endereço `…/#capitulo-07` |
