---
titulo: Aprendendo|ao vivo
rotulo: 06 · Demonstração
estado: demo
camera: demo
clima: holofote
layout: painel
passos-modo: troca
demo-dados: espiral
demo-treinar: nao
demo-ocultas: 1
demo-neuronios: 2
---

Cada ponto é um exemplo. A rede precisa separar **terracota** de **azul**.

<!-- passo demo-treinar=sim -->
**2 neurônios**: poucos demais. A fronteira não consegue fazer a curva.

<!-- passo demo-neuronios=8 -->
**8 neurônios**: a fronteira começa a curvar.

<!-- passo demo-ocultas=2 -->
**2 camadas** de 8: agora ela acompanha a espiral. O erro vai a quase zero.

<!-- passo demo-ocultas=4 -->
**4 camadas**: de novo a zero. O ganho de cada camada nova já está diminuído.

<!-- passo demo-ocultas=8 -->
**8 camadas**: encalha perto de 60%. Fundo demais, sem técnica, fica **pior**.

> O sinal de erro enfraquece a cada camada que retrocede (Glorot–Bengio, 2010). Fundas de verdade treinam com ReLU e atalhos entre camadas (ResNet).

<!-- passo demo-ocultas=12 demo-epocas=1200 -->
**12 camadas** com o triplo do tempo: nada. Empilhar camada não é atalho.

<!-- passo demo-dados=circulos,xor demo-epocas=400 -->
A mesma rede aprende outros padrões: **círculos** e **XOR**.

> Treino de verdade, aqui no navegador. A semente é fixa: o resultado se repete.
