---
titulo: Como ela|aprende
rotulo: 05 · Treinamento
estado: errado
camera: rede-erro
clima: estudio
layout: esquerda
passos-modo: troca
---

Era a foto de um gato. A rede respondeu **cachorro**. O **erro** é grande.

> O erro (em inglês, *loss*) mede o quanto a resposta ficou longe da certa.

<!-- passo estado=retro -->
O erro volta pela rede, de trás para frente: a **retropropagação**.

<!-- passo estado=ajusta camera=rede -->
Cada **peso** muda um pouquinho, na direção que diminui o erro.

<!-- passo estado=epocas camera=rede-geral -->
Repete com milhares de **dados de treino**. Cada volta completa é uma **época**. O erro cai.