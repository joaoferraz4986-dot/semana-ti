# Roteiro — Engenharia reversa

**Tempo total estimado: ~18 min** (12 capítulos, 30 paradas). Cada "→" abaixo é um clique no passador (PageDown).

Combinem antes quem fala cada capítulo. Falem para o público, não para a tela: o texto da tela é curto de propósito e quem explica são vocês.

---

## Fala de abertura (~40 s), sobre a tela 1

> "Boa tarde! Olhem esse objeto aqui. É uma peça mecânica, uma máquina pequena. Agora imaginem que vocês trabalham numa fábrica, essa máquina para de funcionar e ninguém tem o desenho dela. O fabricante fechou, o manual sumiu. O que vocês fariam? Jogariam fora? Ou abririam para descobrir como ela funciona? Esse 'abrir para descobrir' tem nome: **engenharia reversa**. E no fim a gente vai falar de uma coisa que aconteceu agora em outubro: uma ferramenta de IA que promete fazer engenharia reversa de qualquer software. Será que é verdade?"

---

## 1. Abertura (≈ 1 min 15 s · 2 paradas)

- **Ideia principal:** apresentar o problema: ter o objeto sem ter o projeto.
- **Fala sugerida:** (a fala de abertura acima) → no segundo clique: "Essa é a pergunta que a gente vai responder hoje."
- **Exemplo concreto:** uma peça de máquina antiga cujo fabricante não existe mais.
- **Transição:** "Então, o que é engenharia reversa, exatamente?"
- **Pergunta provável:** "Isso é a mesma coisa que copiar?" **Resposta:** "Não necessariamente. Copiar é reproduzir. Engenharia reversa é entender. O que se faz depois com esse entendimento é outra discussão, e a gente chega nela."

## 2. O que é (≈ 1 min 15 s · 2 paradas) · **momento de perguntar ao público**

- **Ideia principal:** investigar algo que já existe para entender como foi feito e como funciona. Objeto → análise → conhecimento.
- **Fala sugerida:** "Engenharia reversa é pegar algo pronto e fazer o caminho de volta. Em vez de começar pelo projeto, a gente começa pelo produto." → "O resultado não é o objeto. É **conhecimento** sobre ele."
- **Pergunta ao público:** "Quem aqui já desmontou alguma coisa só para ver como era por dentro? Controle remoto, brinquedo, mouse?" (espere as mãos levantarem e comente: "isso já é o começo de engenharia reversa".)
- **Transição:** "Para entender melhor, vamos comparar com o jeito 'normal' de fazer engenharia."
- **Pergunta provável:** "Engenharia reversa é só com máquina?" **Resposta:** "Não: vale para peças, eletrônica e software. Vamos ver os três."

## 3. Duas direções (≈ 1 min 15 s · 1 parada)

- **Ideia principal:** a engenharia convencional vai de requisitos a produto; a reversa vai do produto a um modelo.
- **Fala sugerida:** "Em cima, o caminho normal: alguém define o que precisa, projeta, faz protótipo e chega no produto. Embaixo, o caminho contrário: a gente parte do produto pronto, inspeciona, analisa e chega num modelo. Reparem que as setas vão em sentidos opostos."
- **Exemplo concreto:** o redutor aparece como desenho técnico, que é o tipo de resultado da engenharia reversa.
- **Destaque importante:** "O caminho de volta **não** devolve o projeto original exato. Ele gera um modelo novo, baseado em evidências."
- **Transição:** "E como se faz esse caminho de volta, na prática?"
- **Pergunta provável:** "Por que não dá para recuperar o projeto original?" **Resposta:** "Porque muita informação não fica no objeto: a intenção do projetista, as tolerâncias que ele escolheu, os cálculos. A gente deduz, mas não lê isso direto."

## 4. O processo (≈ 2 min · 5 paradas)

- **Ideia principal:** observar, medir, analisar, modelar, validar.
- **Fala sugerida (um clique por etapa):**
  1. "**Observar**: forma, encaixes, parafusos, marcas de fabricação."
  2. "**Medir**: paquímetro, micrômetro ou scanner 3D. Olhem as cotas aparecendo na carcaça."
  3. "**Analisar**: como as peças se encaixam e o que cada uma faz."
  4. "**Modelar**: passar tudo para o computador, num programa CAD. Vira um desenho técnico."
  5. "**Validar**: testar se o modelo bate com o original. Sem isso, é só um palpite bonito."
- **Exemplo concreto:** cada etapa muda o 3D (cotas, peças se afastando, desenho técnico).
- **Transição:** "Agora vamos abrir essa máquina de verdade."
- **Pergunta provável:** "Precisa sempre de scanner 3D?" **Resposta:** "Não. Para peças simples, paquímetro resolve. Scanner ajuda em formas complexas, mas também tem erro e precisa de tratamento."

## 5. A máquina por dentro (≈ 2 min · 2 paradas · interativo)

- **Ideia principal:** uma superfície esconde uma estrutura: cada peça tem função.
- **Fala sugerida:** "Por fora é uma caixa." → clique em **Desmontar** (ou →) → "Por dentro: carcaça, tampa, dois eixos, engrenagens, rolamentos, espaçadores, retentor, parafusos e até uma plaquinha eletrônica."
- **Demonstração:** clique na **engrenagem laranja** e leia a etiqueta. Clique no **retentor** (vedação de borracha). Aperte `Esc` para soltar. Se quiser, use **Reconstruir** e **Desmontar** de novo.
- **Exemplo concreto:** pinhão de 12 dentes e engrenagem de 24: a saída gira na metade da velocidade, mas com mais força.
- **Transição:** "Desmontar mostra as peças. Mas e o que está escondido dentro delas?"
- **Pergunta provável:** "Por que tem rolamento?" **Resposta:** "Para o eixo girar com pouco atrito e ficar alinhado. Sem rolamento, ele gastaria a carcaça."

## 6. Corte e medição (≈ 1 min 45 s · 3 paradas)

- **Ideia principal:** um corte (vista em seção) revela o interior; medidas viram modelo digital.
- **Fala sugerida:** "Isso aqui é uma **vista em corte**, como nos desenhos técnicos. As listras (hachuras) mostram onde o material foi 'cortado'." → "Agora a gente mede a engrenagem: diâmetro, largura, número de dentes. Esses números são **ilustrativos**, só para o exemplo." → "Com as medidas, a engrenagem vira um modelo digital, que pode ser testado e fabricado."
- **Exemplo concreto:** 24 dentes, módulo 2 → diâmetro externo de 52 mm (valores ilustrativos).
- **Transição:** "E quando o que a gente quer entender não é uma peça, é um programa?"
- **Pergunta provável:** "Scanner 3D já dá o modelo pronto?" **Resposta:** "Não. Ele dá uma nuvem de pontos ou uma malha com ruído. Transformar isso num modelo de engenharia dá trabalho e exige decisão humana."

## 7. Software também se investiga (≈ 1 min 45 s · 2 paradas)

- **Ideia principal:** software também se investiga: análise estática, dinâmica, formatos e protocolos.
- **Fala sugerida:** "Lembram da plaquinha? Ela tem um microcontrolador com **firmware**, um programa gravado. Investigar software tem dois jeitos principais: ler o programa sem rodar (**estática**) e observar o comportamento rodando (**dinâmica**). Um uso muito comum e legítimo é entender um formato de arquivo ou protocolo para fazer dois sistemas conversarem." → "E um detalhe: descompilar não devolve o código original, devolve uma aproximação."
- **Segundo clique (gancho):** "Isso está acontecendo agora: em outubro de 2026 viralizou um projeto chamado **REA**, que conecta agentes de IA a ferramentas de engenharia reversa. A IA aprendeu a fazer engenharia reversa? Guardem essa pergunta."
- **Exemplo concreto:** salvar e abrir um arquivo de um programa antigo num programa novo (interoperabilidade).
- **Transição:** "Antes de responder, onde isso tudo é usado no mundo real?"
- **Pergunta provável:** "Isso não é coisa de hacker?" **Resposta:** "A técnica é a mesma usada por pesquisadores de segurança autorizados, por quem faz manutenção e por quem precisa de compatibilidade. O que muda é a autorização e o objetivo. Aqui não vamos ensinar a quebrar proteção de nada."

## 8. Onde é usado (≈ 1 min · 1 parada)

- **Ideia principal:** aplicações reais.
- **Fala sugerida:** "Manutenção industrial: peça quebrada sem reposição. Peças de fabricante que não existe mais. Interoperabilidade entre sistemas. Pesquisa de segurança, sempre autorizada. E preservação: restaurar máquinas antigas, carros antigos, até jogos antigos."
- **Transição:** "Mas não é mágica. Tem limites."
- **Pergunta provável:** "Qual área usa mais?" **Resposta:** "Não temos um número confiável para dizer qual usa mais. Manutenção industrial e segurança são áreas onde é bem comum."

## 9. Limites e cuidados (≈ 1 min 15 s · 1 parada)

- **Ideia principal:** reconstruir não é saber tudo.
- **Fala sugerida:** "Reparem nas cotas agora: '± 0,2 mm'. Toda medida tem **incerteza**. O material e o tratamento térmico não aparecem na foto. Leva tempo e custa dinheiro. E tem a questão legal: propriedade intelectual depende do país, do contrato e do que você faz com o resultado. Engenharia reversa não é automaticamente legal nem ilegal."
- **Transição:** "Vamos ver isso num caso concreto."
- **Pergunta provável:** "Então é ilegal?" **Resposta:** "Depende. Muitas leis permitem estudar e garantir compatibilidade, com condições, mas copiar e vender um produto protegido pode violar direitos. No Brasil, a Lei de Software (9.609/98) e a Lei de Propriedade Industrial (9.279/96) tratam disso. Na dúvida, procure orientação jurídica."

## 10. O caso da engrenagem (≈ 1 min 45 s · 3 paradas)

- **Ideia principal:** um caso **hipotético** que junta tudo.
- **Fala sugerida:** "Imaginem: uma máquina parada numa fábrica por causa dessa engrenagem. Não tem desenho e o fabricante não existe mais." → "O caminho: problema, inspeção, medição, depois modelo CAD, fabricação e validação." → "Mas copiar a forma não basta: qual aço? Qual tratamento térmico? Qual tolerância? Se errar o material, a peça nova quebra em uma semana. Isso exige **julgamento de engenharia**."
- **Exemplo concreto:** dente de engrenagem com dureza errada se desgasta rápido.
- **Transição:** "E aí entra a pergunta da nossa sala: e a inteligência artificial?"
- **Pergunta provável:** "Como descobrir o material?" **Resposta:** "Com ensaios: dureza, análise química, às vezes micrografia. Não dá para saber só olhando."

## 11. A IA vai fazer engenharia reversa sozinha? (≈ 2 min 30 s · 6 paradas) · **momento de perguntar ao público**

- **Antes do primeiro clique, pergunte:** "Levanta a mão quem acha que a IA já consegue fazer engenharia reversa sozinha." (conte as mãos, sem julgar.)
- **Fala sugerida (um clique por cartão):**
  1. **O que aconteceu:** "Em outubro, o REA virou um dos repositórios que mais cresceram na história do GitHub. Apareceram manchetes dizendo que reconstruir qualquer software virou coisa de minutos."
  2. **Verdade:** "É verdade que agentes de IA já conseguem operar ferramentas profissionais como Ghidra, IDA e Hopper e ler programas compilados bem mais rápido. A barreira para começar caiu."
  3. **Exagero:** "Mas o REA não é um descompilador novo. Ele é um **conector** entre a IA e ferramentas que já existem há décadas. E ele não devolve o código-fonte original: devolve pseudocódigo, assembly e evidências. Relatos informais mostram que nem sempre é mais rápido que o jeito simples."
  4. **Continua humano:** "A própria documentação do REA diz que ele é para pesquisa legítima, com autorização, e que a responsabilidade é de quem usa. A ferramenta não muda a lei."
  5. **Alerta:** "E uma lição de segurança: no auge do hype, foi relatada uma cópia falsa do repositório espalhando um vírus (um trojan). Hype atrai golpe. Baixe só de fonte oficial. Na mecânica é igual: scanners e algoritmos aceleram a medição, mas quem decide se está certo é a pessoa."
  6. **Fecho:** "A IA lê as evidências mais rápido. Quem decide o que fazer com elas ainda somos nós."
- **Regras:** não mostrem números de estrelas do GitHub (mudam todo dia e as fontes discordam) e não demonstrem comandos da ferramenta.
- **Transição:** "Então vamos voltar para a nossa máquina, uma última vez."
- **Pergunta provável:** "Então a IA vai substituir engenheiro?" **Resposta:** "Ela acelera partes do trabalho, como ler, procurar e resumir. Decidir o que é certo, seguro e legal continua sendo trabalho de gente. Hoje é mais 'IA com humanos' do que 'IA contra humanos'."

## 12. Final — Agora você enxerga (≈ 1 min · 2 paradas) · **momento de perguntar ao público**

- **Ideia principal:** fechar o ciclo: a mesma máquina do início, agora entendida.
- **Fala sugerida:** "Lembram da caixa do começo, no escuro? Agora vocês sabem o que tem dentro: observar, medir, analisar, modelar, validar." → (a luz abre e a máquina se remonta) → fala de encerramento.
- **Pergunta ao público:** "Se vocês pudessem investigar qualquer tecnologia, qual escolheriam?" (ouça duas ou três respostas.)

---

## Fala de encerramento (~40 s)

> "Engenharia reversa é transformar curiosidade em conhecimento. Começa com uma pergunta simples, 'como isso funciona?', e passa por observar, medir, analisar, modelar e validar. Hoje a IA ajuda a ler as evidências muito mais rápido. Mas decidir o que é seguro, legal e certo continua sendo trabalho nosso. Então fica a pergunta: se vocês pudessem investigar qualquer tecnologia, qual seria? Obrigado!"

---

## Os 3 momentos para perguntar ao público

1. **Capítulo 2:** "Quem já desmontou alguma coisa só para ver por dentro?"
2. **Capítulo 11 (antes do 1º cartão):** "Quem acha que a IA já faz engenharia reversa sozinha?"
3. **Capítulo 12:** "Se pudessem investigar qualquer tecnologia, qual escolheriam?"

## Tempo por capítulo

| Cap. | Tempo |
| --- | --- |
| 1 Abertura (com fala de abertura) | 1:15 |
| 2 O que é | 1:15 |
| 3 Duas direções | 1:15 |
| 4 O processo | 2:00 |
| 5 A máquina por dentro | 2:00 |
| 6 Corte e medição | 1:45 |
| 7 Software | 1:45 |
| 8 Onde é usado | 1:00 |
| 9 Limites | 1:15 |
| 10 O caso da engrenagem | 1:45 |
| 11 IA sozinha? | 2:30 |
| 12 Final (com encerramento) | 1:00 |
| **Total** | **≈ 18:45** |

Se precisarem cortar para 15 min: encurtem os capítulos 4 e 8 e passem mais rápido pelos cartões 2 e 3 do capítulo 11.

## Colinha de atalhos

| Ação | Tecla |
| --- | --- |
| Avançar | `PageDown` (passador) · `→` · `Espaço` |
| Voltar | `PageUp` (passador) · `←` |
| Tela cheia | `F` |
| Travou ou está lento | `Q` (até "Baixa") |
| Câmera estranha / soltar peça | `R` ou `Esc` |
| Ver atalhos | `H` |
| Ir direto a um capítulo | endereço `…/#capitulo-05` |

**Paradas por capítulo** (para saber quantos cliques): 1 → 2 · 2 → 2 · 3 → 1 · 4 → 5 · 5 → 2 · 6 → 3 · 7 → 2 · 8 → 1 · 9 → 1 · 10 → 3 · 11 → 6 · 12 → 2.
