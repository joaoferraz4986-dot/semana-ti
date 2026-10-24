// O EXEMPLO usado do começo ao fim: uma função pequena em C.
// Pode editar os textos, mas mantenha a coerência entre as 4 versões.
// O assembly e os bytes são de x86-64 (convenção System V: preco chega em xmm0, cupom em edi).
// É um exemplo SIMPLIFICADO, mas tecnicamente plausível: 0x3F666666 é 0,9 em float.

export const FONTE = `// Aplica o desconto do cupom da cantina
float calcular_desconto(float preco, int cupom)
{
    if (cupom == 10) {
        return preco * 0.9f;  // 10% off
    }
    return preco;
}`;

// Bytes da função (endereço ilustrativo 0x00101139). A função de verdade
// tem 14 bytes: cmp edi,10 (83 FF 0A) · jne +8 (75 08) · mulss (F3 0F 59 05 …) · ret (C3)
export const BINARIO = {
  inicio: 0x00101130,
  // bytes "vizinhos" (antes/depois) só para parecer um trecho real de memória
  antes: [0x5d, 0xc3, 0x0f, 0x1f, 0x80, 0x00, 0x00, 0x00, 0x00],
  funcao: [0x83, 0xff, 0x0a, 0x75, 0x08, 0xf3, 0x0f, 0x59, 0x05, 0xba, 0x0e, 0x00, 0x00, 0xc3],
  depois: [0x66, 0x2e, 0x0f, 0x1f, 0x84, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0f, 0x1f, 0x40, 0x00, 0xf3, 0x0f, 0x1e, 0xfa, 0x48, 0x83, 0xec, 0x08, 0x48, 0x83, 0xc4, 0x08, 0xc3],
};

export const ASSEMBLY = [
  ['FUN_00101139:', ''],
  ['  cmp', 'edi, 10'],
  ['  jne', 'LAB_00101145'],
  ['  mulss', 'xmm0, [DAT_00102000]'],
  ['LAB_00101145:', ''],
  ['  ret', ''],
];

export const PSEUDO = `float FUN_00101139(float param_1, int param_2)
{
  if (param_2 == 10) {
    param_1 = param_1 * 0.9;
  }
  return param_1;
}`;
