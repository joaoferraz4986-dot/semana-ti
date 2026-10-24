import * as THREE from 'three';

// Biblioteca de materiais compartilhada.
// Cada chamada devolve um material NOVO (para cada peça poder ter opacidade própria),
// mas todos compartilham o uniform "digital": 0 = físico, 1 = desenho técnico (papel).

export const globais = {
  uDigital: { value: 0 },
  // cor do "papel" já em sRGB (aplicada depois do tone mapping)
  uPapel: { value: new THREE.Vector3(0.957, 0.945, 0.922) },
};

function comDigital(mat) {
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uDigital = globais.uDigital;
    shader.uniforms.uPapel = globais.uPapel;
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform float uDigital;\nuniform vec3 uPapel;')
      .replace(
        '#include <dithering_fragment>',
        `#include <dithering_fragment>
        if (uDigital > 0.001) {
          float lum = dot(gl_FragColor.rgb, vec3(0.299, 0.587, 0.114));
          vec3 papel = uPapel * (0.9 + 0.1 * smoothstep(0.0, 0.8, lum));
          gl_FragColor.rgb = mix(gl_FragColor.rgb, papel, uDigital);
        }`,
      );
  };
  mat.customProgramCacheKey = () => 'digital-v1';
  return mat;
}

const fisico = (props) => comDigital(new THREE.MeshPhysicalMaterial(props));

export const materiais = {
  // cerâmica fosca off-white
  ceramica: () => fisico({ color: 0xe3ded4, roughness: 0.6, metalness: 0, clearcoat: 0.12, clearcoatRoughness: 0.55 }),
  ceramicaCinza: () => fisico({ color: 0xc4c0b8, roughness: 0.62, metalness: 0 }),
  // alumínio jateado (micro-esferas)
  aluminio: () => fisico({ color: 0xbdbab4, roughness: 0.52, metalness: 1 }),
  // aço usinado
  aco: () => fisico({ color: 0xb4b2ae, roughness: 0.26, metalness: 1 }),
  acoEscuro: () => fisico({ color: 0x8a8884, roughness: 0.34, metalness: 1 }),
  // alumínio anodizado escuro
  anodizado: () => fisico({ color: 0x2e2c2a, roughness: 0.42, metalness: 0.65 }),
  borracha: () => fisico({ color: 0x1d1c1b, roughness: 0.92, metalness: 0 }),
  // pintura eletrostática na cor de destaque
  acento: (cor) => fisico({ color: new THREE.Color(cor), roughness: 0.5, metalness: 0, clearcoat: 0.25, clearcoatRoughness: 0.45 }),
  // superfícies impressas/gravadas: cor vem da textura (map)
  impresso: (mapa, props = {}) => fisico({ color: 0xffffff, map: mapa || null, roughness: 0.62, metalness: 0, ...props }),
  vidro: () => fisico({ color: 0x0d0d0e, roughness: 0.12, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.05 }),
};

export { comDigital };
