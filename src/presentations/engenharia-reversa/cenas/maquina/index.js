// PROVISÓRIO (etapa 1): caixa simples só para testar o motor.
export function criarMaquina({ THREE, materiais }) {
  const group = new THREE.Group();
  const caixa = new THREE.Mesh(new THREE.BoxGeometry(3, 2.4, 1.2), materiais.ceramica());
  caixa.position.y = 1.2;
  caixa.castShadow = true;
  group.add(caixa);
  return {
    group,
    defaults: { explodir: 0 },
    states: { fechada: {} },
    cameras: { 'vista-geral': { pos: [7, 4, 10], alvo: [0, 1.2, 0], fov: 30 } },
    cameraPadrao: 'vista-geral',
    apply(p) {
      group.visible = p.presenca > 0.01;
    },
    update() {},
    dispose() {},
  };
}
