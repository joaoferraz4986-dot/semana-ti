---
titulo: Juntos,|em camadas
rotulo: 04 · Camadas
estado: rede-entrada
camera: rede-entrada
clima: estudio
layout: esquerda
passos-modo: troca
---

**Entrada**: os pixels de uma foto.

<!-- passo estado=rede-ocultas camera=rede-meio -->
**Camadas ocultas**: cada neurônio combina o que veio da camada anterior.

<!-- passo camera=rede-geral -->
Cada camada **recombina** as anteriores: linhas viram formas, formas viram coisas.

<!-- passo estado=rede-saida camera=rede-saida -->
**Saída**: um neurônio para cada resposta possível: gato ou cachorro.

<!-- passo estado=rede-saida camera=rede -->
Profundidade não é tudo: **camada demais encalha** — o erro não volta direito.

> Mais camadas não é sempre melhor: fundo demais trava a rede. Ao vivo, no capítulo 6, dá para ver acontecer.

<!-- passo estado=rede-avanco camera=rede-geral -->
O sinal atravessa a rede, camada por camada, e sai uma **resposta**.
