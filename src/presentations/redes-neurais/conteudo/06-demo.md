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

<!-- passo demo-dados=circulos,xor -->
A mesma rede aprende outros padrões: **círculos** e **XOR**.

> Treino de verdade, aqui no navegador. A semente é fixa: o resultado se repete.