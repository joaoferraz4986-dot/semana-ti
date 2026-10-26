import * as THREE from 'three';
import { PADRAO, ESTADOS, CAMERAS, POSICOES } from './estados.js';
import { criarDupla } from './dupla.js';
import { criarNeuronio } from './neuronio.js';
import { criarExemplo } from './exemplo.js';
import { Rede3D } from './rede3d.js';
import { Demo, lerConfig } from '../../demo/demo.js';

// Cena "redes": um estúdio contínuo com quatro "ilhas" ao longo do eixo X.
//   dupla (x ≈ -14)    rede orgânica × rede geométrica — abertura, cérebro vs máquina, final
//   neurônio (x = 0)    neurônio biológico → neurônio artificial
//   exemplo (x = 12)    camadas, aprendizado, pixels, aplicações
//   demo (x = 26)       rede 3D ligada aos pesos REAIS da demo ao vivo (painel impresso à esquerda)
// Contrato de cena: ver COMO_EDITAR.md. Tudo segue os parâmetros (estados.js);
// a demo é a exceção de propósito: ela treina em tempo real, sempre com a mesma semente.

const clamp01 = (x) => Math.max(0, Math.min(1, x));

export function criarRedes({ stage, annotations, materiais }) {
  const group = new THREE.Group();
  const P = { ...PADRAO, presenca: 1 };

  const dupla = criarDupla({ materiais, P });
  dupla.group.position.x = POSICOES.dupla;
  group.add(dupla.group);

  const neuronio = criarNeuronio({ materiais, annotations, P });
  neuronio.group.position.x = POSICOES.neuronio;
  group.add(neuronio.group);

  const exemplo = criarExemplo({ materiais, annotations, P });
  exemplo.group.position.x = POSICOES.exemplo;
  group.add(exemplo.group);

  // sombras de contato extras (a do motor fica no centro, debaixo do neurônio)
  for (const [x, sx, sz] of [
    [POSICOES.dupla, 6, 2.6],
    [POSICOES.exemplo, 7, 2.4],
    [POSICOES.demo, 4.5, 2.2],
  ]) {
    const c = stage.chao.contato.clone();
    c.position.set(x, 0.002, 0);
    c.scale.set(sx, sz, 1);
    c.material = stage.chao.contato.material;
    stage.scene.add(c);
  }
  stage.chao.contato.scale.set(8, 2.4, 1);
  stage.chao.contato.position.x = 1;

  // ---------- demo ----------
  const demo = new Demo(document.body);
  const redeDemo = new Rede3D({ materiais, camadas: [2, 2, 1], espacoX: 0.75, espacoY: 0.42, raio: 0.12, maxPulsos: 16 });
  redeDemo.group.position.set(POSICOES.demo, 1.9, 0);
  group.add(redeDemo.group);
  let topologia = '2,2,1';

  function ajustarDemo(tamanhos) {
    // redes fundas (8+ camadas) ficam estreitas pra caber no quadro;
    // redes com 8 neurônios por camada achatam um pouco de altura
    const L = tamanhos.length;
    const n = Math.max(...tamanhos);
    const funda = L > 4;
    const espacoX = funda ? Math.min(0.75, 3.4 / (L - 1)) : 0.75;
    const espacoY = L > 4 && n >= 6 ? Math.min(0.42, 2.1 / (n - 1)) : 0.42;
    redeDemo.construir(tamanhos, { espacoX, espacoY, raio: L > 4 && n >= 6 ? 0.1 : 0.12 });
    // rede funda: afasta um pouco do painel à esquerda
    redeDemo.group.position.x = POSICOES.demo + (funda ? 1.15 : 0);
  }

  function onStop(p) {
    const temDemo = p?.attrs && p.attrs['demo-dados'] != null && p.cena === 'redes';
    if (temDemo) {
      const cfg = lerConfig(p.attrs);
      const tamanhos = [2, ...Array(cfg.ocultas).fill(cfg.neuronios), 1];
      const chave = tamanhos.join(',');
      if (chave !== topologia) {
        ajustarDemo(tamanhos);
        topologia = chave;
      }
      demo.iniciar(cfg); // sempre recomeça do zero, com a mesma semente
    } else {
      demo.parar();
    }
  }

  function apply(params) {
    Object.assign(P, params);
    group.visible = P.presenca > 0.01;
  }

  let quadro = 0;
  function update(dt) {
    if (!group.visible) {
      demo.mostrar(0);
      return;
    }
    quadro++;
    dupla.atualizar(dt);
    neuronio.atualizar(dt);
    exemplo.atualizar(dt);
    // demo
    const d = clamp01(P.demo) * P.presenca;
    demo.mostrar(d);
    redeDemo.group.visible = d > 0.01;
    if (d > 0.01) {
      demo.passo();
      const treinando = demo.ativo && demo.cfg?.treinar && demo.epoca < demo.cfg.epocas;
      if (demo.rede) redeDemo.definirPesos(demo.rede.W);
      // cor dos nós = ativação da rede para um ponto de exemplo
      if (demo.rede && quadro % 3 === 0) demo.rede.prever(0.35, 0.3);
      redeDemo.atualizar(dt, {
        presenca: d,
        ativ: (l, i) => (demo.rede && demo.cfg?.treinar ? Math.min(1, Math.abs(demo.rede.a[l]?.[i] ?? 0)) * 0.8 : 0),
      });
      redeDemo.pulsar(dt, { avanco: treinando ? 1 : 0.15, retro: treinando ? 0.7 : 0, presenca: d, velocidade: 2 });
    }
  }

  return {
    group,
    defaults: PADRAO,
    states: ESTADOS,
    cameras: CAMERAS,
    cameraPadrao: 'neuronio',
    apply,
    update,
    onStop,
    dispose() {
      demo.dispose();
      group.traverse((o) => {
        o.geometry?.dispose();
        if (o.material) [].concat(o.material).forEach((m) => m.dispose());
      });
    },
  };
}
