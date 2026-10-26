# Referências — Redes neurais

Fontes das afirmações importantes. Distinguimos **analogia** (o cérebro inspirou) de **mecanismo** (como a rede artificial funciona), e **fato estabelecido** de **debate em aberto**.

## Neurônio biológico e números do cérebro (capítulos 2 e 8)

- AZEVEDO, F. A. C. et al. *Equal numbers of neuronal and nonneuronal cells make the human brain an isometrically scaled-up primate brain*. Journal of Comparative Neurology, v. 513, n. 5, p. 532–541, 2009. DOI: [10.1002/cne.21974](https://doi.org/10.1002/cne.21974). Estima cerca de **86 bilhões** de neurônios no cérebro humano. A apresentação diz "valor aproximado".
- RAICHLE, M. E.; GUSNARD, D. A. *Appraising the brain's energy budget*. PNAS, v. 99, n. 16, p. 10237–10239, 2002. DOI: [10.1073/pnas.172399499](https://doi.org/10.1073/pnas.172399499). O cérebro consome cerca de 20% da energia do corpo em repouso, o que dá algo na ordem de **20 W** (valor aproximado e amplamente citado).
- KANDEL, E. R. et al. *Principles of Neural Science* (6. ed.). McGraw-Hill, 2021. Referência geral para dendritos, corpo celular, axônio, potencial de ação e sinapse química (capítulo 2, explicação simplificada).

## Neurônio artificial e aprendizado (capítulos 3, 4, 5 e 6)

- McCULLOCH, W. S.; PITTS, W. *A logical calculus of the ideas immanent in nervous activity*. Bulletin of Mathematical Biophysics, v. 5, p. 115–133, 1943. DOI: [10.1007/BF02478259](https://doi.org/10.1007/BF02478259). Primeiro modelo matemático de neurônio: inspirado no biológico, muito mais simples.
- RUMELHART, D. E.; HINTON, G. E.; WILLIAMS, R. J. *Learning representations by back-propagating errors*. Nature, v. 323, p. 533–536, 1986. DOI: [10.1038/323533a0](https://doi.org/10.1038/323533a0). Retropropagação: o erro volta pela rede e ajusta os pesos.
- GOODFELLOW, I.; BENGIO, Y.; COURVILLE, A. *Deep Learning*. MIT Press, 2016. [deeplearningbook.org](https://www.deeplearningbook.org/). Referência geral para camadas, ativação (tanh, sigmoide), erro (entropia cruzada), descida do gradiente com mini-lotes e momento, e épocas.
- **Exemplo do capítulo 3**: as contas são reais. 0,8·0,9 + 0,2·(−0,4) + 0,5·0,6 + 0,1 = 1,04, e sigmoide(1,04) = 1/(1+e^−1,04) ≈ 0,74.
- **Demo ao vivo (capítulo 6)**: uma rede MLP escrita em JavaScript puro (`src/presentations/redes-neurais/demo/mlp.js`), com tanh nas camadas ocultas, sigmoide na saída, entropia cruzada, retropropagação e SGD com momento. Os números mostrados (época, erro e acertos) são calculados de verdade. Resultados verificados com semente 3, taxa 0,03: espiral com 1×2 neurônios ≈ 68% de acertos (erro 0,58); 1×8 ≈ 94% (0,17); 2×8 = 100% (≈ 0,00); 4×8 = 100%; 8×8 **encalha ≈ 59% (0,68)** — com 3× as épocas chega só a ≈ 62%; 12×8 a 1 200 épocas ≈ 50%; círculos e XOR = 100%. Ver "Profundidade × degradação" abaixo. Os conjuntos de dados (espiral, círculos, XOR, dois grupos) são clássicos didáticos, gerados pelo próprio código.

## Profundidade × degradação (capítulos 4 e 6)

- GLOROT, X.; BENGIO, Y. *Understanding the difficulty of training deep feedforward neural networks*. AISTATS 2010, PMLR v. 9, p. 249–256. [proceedings.mlr.press/v9/glorot10a](https://proceedings.mlr.press/v9/glorot10a.html). Em redes fundas com sigmoide/tanh e inicialização comum, o gradiente que retropropaga fica menor camada a camada ("saturação") — o mecanismo por trás de "camada demais encalha".
- HE, K.; ZHANG, X.; REN, S.; SUN, J. *Deep Residual Learning for Image Recognition*. IEEE CVPR, 2016. [arXiv:1512.03385](https://arxiv.org/abs/1512.03385). Documenta o **problema de degradação**: redes "planas" de 34 camadas erram mais que as de 18 (28,5% vs 27,9% no ImageNet) — mais camadas em sequência não é atalho. Redes fundas treináveis contornam isso com ReLU e **conexões que pulam camadas** (o ResNet treinou 152 camadas com ganho real de acerto).
- A demo ao vivo reproduz o fenômeno na minirrede (tanh + inicialização de Xavier): 2–4 camadas convergem; 8 encalha perto de 60% mesmo com 3× o tempo; 12 fica perto do acaso. Não afirmamos que encalhar é sempre gradiente morrendo: com inicialização melhor e otimizadores modernos, redes fundas treinam — daí o "sem técnica" na nota da demonstração.

## O que a rede "vê" (capítulo 7)

- ZEILER, M. D.; FERGUS, R. *Visualizing and Understanding Convolutional Networks*. ECCV 2014. [arXiv:1311.2901](https://arxiv.org/abs/1311.2901). Mostra que, em redes de imagem, camadas iniciais respondem a bordas e texturas simples e camadas mais profundas a partes e objetos. A apresentação trata isso como **tendência**, não como regra.
- O gato em pixels é desenhado pelo próprio código (12×12). Não usa imagem de terceiros.

## Cérebro × máquina (capítulo 8)

- **Bilhões de pesos**: por exemplo, o GPT-3 tem 175 bilhões de parâmetros. BROWN, T. et al. *Language Models are Few-Shot Learners*. NeurIPS 2020. [arXiv:2005.14165](https://arxiv.org/abs/2005.14165). A apresentação diz só "bilhões de pesos" e avisa que **não dá para comparar um a um** com neurônios.
- **Poucos exemplos × muitos dados**: LAKE, B. M. et al. *Building machines that learn and think like people*. Behavioral and Brain Sciences, v. 40, e253, 2017. DOI: [10.1017/S0140525X16001837](https://doi.org/10.1017/S0140525X16001837).
- **Energia para treinar**: STRUBELL, E.; GANESH, A.; McCALLUM, A. *Energy and Policy Considerations for Deep Learning in NLP*. ACL 2019. [arXiv:1906.02243](https://arxiv.org/abs/1906.02243). Mantivemos a afirmação **qualitativa** ("data centers inteiros"), sem números.
- **Consciência e compreensão**: apresentadas como **debate em aberto**, sem conclusão.

## Projeção e NCM (capítulo 11 · Projeção)

- PEREIRA JR., A. *The projective theory of consciousness: from neuroscience to philosophical psychology*. Trans/Form/Ação, v. 41 (número especial), 2018. DOI: [10.1590/0101-3173.2018.v41esp.02.p9](https://doi.org/10.1590/0101-3173.2018.v41esp.02.p9). Teoria projetiva: o sistema nervoso monta um modelo interno e o "projeta" como o mundo percebido.
- VELMANS, M. *How to investigate perceptual projection: a commentary on Pereira Jr. "The projective theory of consciousness"*. Trans/Form/Ação, v. 41 (número especial), 2018. DOI: [10.1590/0101-3173.2018.v41esp.12.p233](https://doi.org/10.1590/0101-3173.2018.v41esp.12.p233). Defende a projeção perceptual como **efeito psicológico real**, estudado experimentalmente: profundidade em visão e audição, imagens estereoscópicas, cinemas 3D, hologramas e realidade virtual.
- KUMBONG, H.; KHARE, I. S.; MLAUZI, I. et al. *Next-Concept Modeling: Fast, Parallel Coarse-to-Fine Text Generation*. Preprint arXiv:2610.14162, Stanford (Hazy Research / Scaling Intelligence Lab), 2026. [arXiv:2610.14162](https://arxiv.org/abs/2610.14162) · [blog do grupo](https://hazyresearch.stanford.edu/blog/2026-10-12-ncm). NCM encoda texto numa hierarquia de códigos discretos do grosso ao fino; o transformer gera um nível por vez, prevendo em paralelo todos os códigos do nível. Nos testes: 10–31× mais rápido que fortes baselines de difusão, com 4–5× menos tokens de treino. **Preprint — sem revisão por pares.**
- A comparação NCM ↔ percepção é apresentada como **semelhança de estrutura** (grosso → fino, esboço → detalhe), nunca como mecanismo igual. A ponte "cérebro ↔ rede neural ↔ engenharia reversa" é uma **analogia**: os três montam um modelo interno a partir do que chega de fora (sinais, exemplos, comportamento) e o devolvem ao mundo — como percebido, como resposta, como documentação.

## Aplicações e limites (capítulos 9 e 10)

- **Modelos de linguagem preveem a próxima palavra (token)**: BROWN et al., 2020 (acima).
- **Viés**: BUOLAMWINI, J.; GEBRU, T. *Gender Shades: Intersectional Accuracy Disparities in Commercial Gender Classification*. PMLR 81, 2018. [proceedings.mlr.press/v81/buolamwini18a](https://proceedings.mlr.press/v81/buolamwini18a.html).
- **Alucinação**: JI, Z. et al. *Survey of Hallucination in Natural Language Generation*. ACM Computing Surveys, v. 55, n. 12, 2023. DOI: [10.1145/3571730](https://doi.org/10.1145/3571730).
- **Energia**: STRUBELL et al., 2019 (acima).
- **Diagnóstico por imagem**: apresentado como **apoio** à decisão médica, nunca como substituição. Não citamos nenhum produto, hospital ou taxa de acerto.
- Os produtos citados (ChatGPT, Claude) são exemplos conhecidos de assistentes baseados em redes neurais. Não fazemos nenhuma afirmação sobre o desempenho deles.
