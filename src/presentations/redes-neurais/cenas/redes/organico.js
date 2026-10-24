import * as THREE from 'three';
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';
import { aleatorio } from '../../demo/mlp.js';

// Formas orgânicas em "barro" terracota: corpo celular, fibras que se ramificam, terminais.

export const TERRACOTA = '#c8643b';

export function materialBarro(cor = '#c06a46') {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(cor),
    roughness: 0.72,
    metalness: 0,
    sheen: 1,
    sheenColor: new THREE.Color('#f4b892'),
    sheenRoughness: 0.45,
    clearcoat: 0.05,
  });
}

// esfera "modelada à mão": deslocamento suave por senos (determinístico)
export function corpoCelular(raio, semente = 1, detalhe = 5) {
  // mergeVertices: sem isso o icosaedro fica facetado (cada triângulo com normal própria)
  const g = mergeVertices(new THREE.IcosahedronGeometry(raio, detalhe).deleteAttribute('uv').deleteAttribute('normal'));
  const pos = g.attributes.position;
  const v = new THREE.Vector3();
  const r = aleatorio(semente);
  const f = [r() * 3 + 2, r() * 3 + 2, r() * 3 + 2];
  const fase = [r() * 6, r() * 6, r() * 6];
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i).normalize();
    const n = Math.sin(v.x * f[0] + fase[0]) * Math.sin(v.y * f[1] + fase[1]) * Math.sin(v.z * f[2] + fase[2]);
    v.multiplyScalar(raio * (1 + n * 0.12));
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  g.computeVertexNormals();
  return g;
}

// Uma fibra: curva suave entre dois pontos, com um leve "bojo" aleatório
export function curvaFibra(a, b, rnd, curvatura = 0.25) {
  const meio = new THREE.Vector3().lerpVectors(a, b, 0.5);
  const d = a.distanceTo(b);
  meio.add(new THREE.Vector3((rnd() - 0.5) * d * curvatura, (rnd() - 0.5) * d * curvatura, (rnd() - 0.5) * d * curvatura));
  const q1 = new THREE.Vector3().lerpVectors(a, meio, 0.5);
  const q2 = new THREE.Vector3().lerpVectors(meio, b, 0.5);
  return new THREE.CatmullRomCurve3([a.clone(), q1, meio, q2, b.clone()]);
}

// Galho que se ramifica (dendritos). Devolve lista de { curva, raio, nivel }
export function ramificar(origem, direcao, comprimento, raio, nivel, rnd, saida = [], maxNivel = 3) {
  const fim = origem.clone().addScaledVector(direcao, comprimento);
  const curva = curvaFibra(origem, fim, rnd, 0.35);
  saida.push({ curva, raio, nivel });
  if (nivel < maxNivel) {
    const filhos = nivel === 0 ? 3 : 2;
    for (let k = 0; k < filhos; k++) {
      const dir = direcao.clone();
      dir.applyAxisAngle(new THREE.Vector3(0, 0, 1), (rnd() - 0.5) * 1.3);
      dir.applyAxisAngle(new THREE.Vector3(0, 1, 0), (rnd() - 0.5) * 1.0);
      dir.normalize();
      ramificar(fim, dir, comprimento * (0.55 + rnd() * 0.15), raio * 0.62, nivel + 1, rnd, saida, maxNivel);
    }
  }
  return saida;
}

export function tubo(curva, raio, segmentos = 24) {
  return new THREE.TubeGeometry(curva, segmentos, raio, 8, false);
}
