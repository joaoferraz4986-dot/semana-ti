import"./base-z0CO-Qoj.js";import{C as ia,S as ra,M as ca,G as N,V as h,a as q,R as w,P as to,b as $o,B as la,c as da,d as Oo,e as pa,T as fa,f as ma,g as No,E as ua,h as va,i as xa}from"./RoundedBoxGeometry-m7QAofEk.js";const ba=`---
titulo: Engenharia|reversa
rotulo: Semana de TI · Sala IA vs Humanos
cena: software
estado: selado
camera: bloco-escuro
clima: holofote
layout: esquerda
destaque: sim
---

Descobrir o que um programa faz por dentro.

<!-- passo camera=bloco-perto estado=selado-rotulo -->
E se você tivesse o programa, mas **não o código?**
`,ya=`---
titulo: Estudar o que|já existe
rotulo: 02 · O que é
estado: celular-apagado
camera: celular
clima: estudio
layout: direita
---

Engenharia reversa de software é estudar um programa pronto para entender **como ele funciona**, sem ter o código-fonte.

<!-- passo estado=celular-ligado camera=celular-perto -->
Você vê o app.

<!-- passo estado=celular-duvida camera=celular-lado -->
Mas não vê **como ele foi feito**.
`,Sa=`---
titulo: Compilar é uma direção.|Investigar é a outra.
rotulo: 03 · Duas direções
estado: fonte
camera: compilar
clima: estudio
layout: inferior
---

O **código-fonte** é texto escrito para pessoas lerem.

<!-- passo estado=compilado -->
Compilar: Código-fonte → Compilador → Executável

<!-- passo estado=volta camera=volta -->
Engenharia reversa: Pistas ← Análise ← Executável

<!-- passo estado=volta-pistas -->
> O caminho de volta não devolve o código original. Devolve **pistas**.
`,Ta=`---
titulo: Por dentro|de um app
rotulo: 04 · Camadas
estado: celular-ligado
camera: camadas-inicio
clima: holofote
layout: esquerda
passos-modo: troca
---

Na tela, um app parece **uma coisa só**.

<!-- passo estado=camada-1 camera=camadas -->
1. **Interface** o que o usuário vê

<!-- passo estado=camada-2 -->
2. **Lógica** o código que decide

<!-- passo estado=camada-3 -->
3. **Rede** a conversa com o servidor

<!-- passo estado=camada-4 -->
4. **Dados** o que fica guardado

<!-- passo estado=camada-5 camera=camadas-fundo -->
5. **Binário** o que o processador executa

<!-- passo estado=camadas-todas camera=camadas-geral -->
Cada camada se investiga de um jeito diferente.
`,$a=`---
titulo: Fatiando o|executável
rotulo: 05 · Descompilando
estado: selado
camera: fatia-0
clima: estudio
layout: esquerda
passos-modo: troca
---

Vamos abrir o executável, **uma camada de cada vez**.

<!-- passo estado=fatia-1 camera=fatia-1 -->
**Binário**: os bytes que o processador lê.

> Exemplo simplificado: uma função de 14 bytes.

<!-- passo estado=fatia-2 camera=fatia-2 -->
**Assembly**: as mesmas instruções, uma por linha.

<!-- passo estado=fatia-3 camera=fatia-3 -->
**Pseudocódigo**: o que um descompilador reconstrói.

> Nomes e comentários se perderam: preco virou param_1.

<!-- passo estado=fatia-4 camera=fatia-4 -->
**Lógica entendida**: a conclusão é de quem investiga.
`,_a=`---
titulo: Cada pergunta,|uma ferramenta
rotulo: 06 · As ferramentas
estado: ferr-devtools
camera: camadas
clima: estudio
layout: direita
passos-modo: troca
---

**DevTools do navegador**
Inspecionar o HTML, o JavaScript e a rede de um site.

<!-- passo estado=ferr-rede camera=api -->
**Captura de tráfego**
Ver as mensagens que o app troca com o servidor.

<!-- passo estado=ferr-ghidra camera=fatia-2 -->
**Disassemblers e descompiladores**
Ghidra (gratuito, liberado pela NSA em 2019) e IDA.

<!-- passo estado=ferr-apk camera=camadas-geral -->
**Análise de APK**
Abrir o pacote de um app Android para ver como ele se organiza.

> Só a ideia de cada ferramenta: nada aqui ensina a contornar proteções.
`,qa=`---
titulo: Uma API|sem manual
rotulo: 07 · Estudo de caso
estado: api-inicio
camera: api
clima: estudio
layout: esquerda
passos-modo: troca
---

Você foi **autorizado** a integrar seu sistema com outro. Mas não existe documentação.

> Caso hipotético, com dados inventados.

<!-- passo estado=api-trafego -->
O app conversa com o servidor **o tempo todo**.

<!-- passo estado=api-requisicao camera=api-perto -->
Congelamos uma **requisição**: método, endereço e dados enviados.

<!-- passo estado=api-resposta -->
E a **resposta** que volta.

<!-- passo estado=api-doc camera=api-doc -->
Juntando as peças, escrevemos a **documentação** que faltava.
`,Ma=`---
titulo: Onde isso|é usado
rotulo: 08 · Aplicações
estado: uso-malware
camera: bloco-estudio
clima: estudio
layout: direita
---

- Segurança e análise de malware

<!-- passo estado=api-trafego camera=api-longe -->
- Interoperabilidade entre sistemas

<!-- passo estado=fatia-3 camera=fatia-3 -->
- Sistemas legados sem código-fonte

<!-- passo estado=celular-ligado camera=celular-alto -->
- Preservação de jogos e software antigo

<!-- passo estado=camadas-todas camera=camadas-geral -->
- Auditoria de segurança autorizada
`,Aa=`---
titulo: Limites|e ética
rotulo: 09 · Cuidados
estado: pistas
camera: fatia-3
clima: estudio
layout: esquerda
---

- O código recuperado é **incompleto**

<!-- passo estado=fatia-2 camera=fatia-2 -->
- Leva **tempo** e exige conhecimento

<!-- passo estado=selado camera=bloco-estudio -->
- Leis, termos de uso e contratos podem **restringir**

<!-- passo estado=api-doc camera=api-doc -->
- Sempre com **autorização**

> Não é automaticamente legal nem ilegal: depende do país e do objetivo.
`,ha=`---
titulo: A IA vai fazer engenharia|reversa sozinha?
rotulo: 10 · IA vs Humanos
estado: ia
camera: ia-a
clima: estudio
layout: esquerda
passos-modo: troca
---

::: fato
# “Reconstruir qualquer software virou coisa de minutos”
Em outubro de 2026, o REA virou um dos repositórios que mais cresceram na história do GitHub. Vieram as manchetes.
:::

<!-- passo camera=ia-b -->
::: verdade
# Agentes de IA já operam ferramentas profissionais
Ghidra, IDA, Hopper, ferramentas do navegador: a IA lê programas compilados e capturas de rede bem mais rápido. A barreira de entrada caiu.
:::

<!-- passo camera=ia-c estado=ia-pseudo -->
::: exagero
# “É um novo descompilador que devolve o código original”
Não. É um conector entre agentes e ferramentas que existem há décadas. Devolve pseudocódigo, assembly e evidências, não o código-fonte original.

> Relatos informais mostram que nem sempre é mais rápido que abordagens simples.
:::

<!-- passo camera=ia-a estado=ia -->
::: humano
# Decidir o que é legal, ético e correto
A documentação do próprio REA diz: uso para pesquisa legítima, com autorização, e a responsabilidade é de quem usa. A ferramenta não muda a lei.
:::

<!-- passo camera=ia-b -->
::: alerta | Golpe
# Hype atrai golpe
No auge do sucesso, foi relatada uma cópia falsa do repositório distribuindo um trojan. Baixe só de fontes oficiais.
:::

<!-- passo camera=ia-d -->
A IA lê as fatias mais rápido. **Quem decide o que fazer com elas ainda somos nós.**
`,Ca=`---
titulo: Entender o que já existe é o primeiro passo|para criar o que vem depois
rotulo: 11 · Final
estado: final-junto
camera: final-holofote
clima: holofote
layout: rodape
---

Observar. Analisar. Documentar. Com autorização.

<!-- passo camera=final clima=estudio -->
Se você pudesse investigar **qualquer software**, qual escolheria?
`,Go={tela:0,virar:0,duvida:0,camadas:0,rotulosCamadas:0,leque:0,codigo:0,selado:1,rotuloBloco:0,fatias:0,pistas:0,exposicao:0,servidor:0,cabo:0,trafego:0,congelar:0,resposta:0,doc:0},b={tela:1},Y={...b,servidor:1,cabo:1},Pa={selado:{},"selado-rotulo":{rotuloBloco:1},"celular-apagado":{},"celular-ligado":{...b},"celular-duvida":{...b,virar:1,duvida:1},fonte:{...b,codigo:1,selado:0},compilado:{...b,codigo:2,selado:1,rotuloBloco:1},volta:{...b,rotuloBloco:1,fatias:.35},"volta-pistas":{...b,rotuloBloco:1,fatias:1},"camada-1":{...b,camadas:1},"camada-2":{...b,camadas:2},"camada-3":{...b,camadas:3},"camada-4":{...b,camadas:4},"camada-5":{...b,camadas:5},"camadas-todas":{...b,camadas:5,leque:1,rotulosCamadas:1},"fatia-1":{...b,fatias:1},"fatia-2":{...b,fatias:2},"fatia-3":{...b,fatias:3},"fatia-4":{...b,fatias:4},pistas:{...b,fatias:3,pistas:1},"ferr-devtools":{...b,camadas:2},"ferr-rede":{...Y,trafego:1},"ferr-ghidra":{...b,fatias:2},"ferr-apk":{...b,camadas:5,leque:1,rotulosCamadas:1},"api-inicio":{...Y},"api-trafego":{...Y,trafego:1},"api-requisicao":{...Y,trafego:1,congelar:1},"api-resposta":{...Y,trafego:1,congelar:1,resposta:1},"api-doc":{...Y,congelar:1,resposta:1,doc:1},"uso-malware":{...b,rotuloBloco:1},geral:{...Y,trafego:1,rotuloBloco:1},ia:{...b,fatias:4,exposicao:1},"ia-pseudo":{...b,fatias:4,exposicao:1,pistas:1},"final-junto":{...b,rotuloBloco:1}},jo={"bloco-escuro":{pos:[-2.4,1.5,7.8],alvo:[.3,.8,0],fov:25},"bloco-perto":{pos:[-1.4,2,5.8],alvo:[.3,.8,0],fov:26},"bloco-estudio":{pos:[4.2,3.2,7.6],alvo:[.3,.75,0],fov:30},celular:{pos:[-4.8,2,6.8],alvo:[-7.2,1.05,.4],fov:30},"celular-perto":{pos:[-5.6,1.7,5.4],alvo:[-7.2,1.1,.4],fov:30},"celular-lado":{pos:[-4.2,2.2,4.4],alvo:[-7.2,1,.3],fov:30},"celular-alto":{pos:[-5,4.4,6.4],alvo:[-7.2,.9,.4],fov:30},"camadas-inicio":{pos:[-6.6,1.5,6.6],alvo:[-7.2,1.1,.7],fov:30},camadas:{pos:[-6.75,1.3,6],alvo:[-7.2,1.15,1.9],fov:30},"camadas-fundo":{pos:[-6.75,1.3,6],alvo:[-7.2,1.15,1.9],fov:30},"camadas-geral":{pos:[-2.6,2.6,8.4],alvo:[-6.9,1,1.8],fov:30},compilar:{pos:[-.6,2.8,9.2],alvo:[-1,.9,0],fov:30},volta:{pos:[6.6,3.6,9.4],alvo:[1.2,.5,0],fov:30},"fatia-0":{pos:[4.8,2.6,5.4],alvo:[.6,.75,0],fov:30},"fatia-1":{pos:[5.05,2.04,3.25],alvo:[.84,.75,0],fov:30},"fatia-2":{pos:[4.76,2.04,3.25],alvo:[.48,.75,0],fov:30},"fatia-3":{pos:[4.35,2.04,3.25],alvo:[.12,.75,0],fov:30},"fatia-4":{pos:[4.06,2.04,3.25],alvo:[-.24,.75,0],fov:30},api:{pos:[-6.2,3,8.8],alvo:[-8.7,1,.5],fov:30},"api-perto":{pos:[-6.6,2.5,7.4],alvo:[-8.5,1.3,.9],fov:30},"api-doc":{pos:[-7.3,2.1,7],alvo:[-8.6,1.3,1.1],fov:30},"api-longe":{pos:[-5.4,4.2,11.4],alvo:[-8.6,.8,.3],fov:30},"ia-a":{pos:[3.8,3.4,10.6],alvo:[3.8,.55,-2.5],fov:30},"ia-b":{pos:[2.4,1.8,3.6],alvo:[2,.55,-2.5],fov:30},"ia-c":{pos:[2.6,1.4,2.2],alvo:[2.5,.55,-2.5],fov:30},"ia-d":{pos:[3.8,3,9],alvo:[3.8,.55,-2.5],fov:30},"final-holofote":{pos:[-2.6,3.4,13.2],alvo:[-3.6,.6,.2],fov:30},final:{pos:[-3.2,4.4,16],alvo:[-3.6,.6,.2],fov:30}},Ea=`// Aplica o desconto do cupom da cantina
float calcular_desconto(float preco, int cupom)
{
    if (cupom == 10) {
        return preco * 0.9f;  // 10% off
    }
    return preco;
}`,oo={inicio:1052976,antes:[93,195,15,31,128,0,0,0,0],funcao:[131,255,10,117,8,243,15,89,5,186,14,0,0,195],depois:[102,46,15,31,132,0,0,0,0,0,15,31,64,0,243,15,30,250,72,131,236,8,72,131,196,8,195]},Ra=[["FUN_00101139:",""],["  cmp","edi, 10"],["  jne","LAB_00101145"],["  mulss","xmm0, [DAT_00102000]"],["LAB_00101145:",""],["  ret",""]],Ia=`float FUN_00101139(float param_1, int param_2)
{
  if (param_2 == 10) {
    param_1 = param_1 * 0.9;
  }
  return param_1;
}`,_="#191714",P="#6e685f",ka="#ebe6dd",S='"Instrument Sans", "Segoe UI", sans-serif',Q='"Instrument Serif", Georgia, serif',j='"Cascadia Mono", Consolas, "Courier New", monospace',Fo=[];function O(e,o,a,{srgb:s=!0}={}){const n=document.createElement("canvas");n.width=e,n.height=o;const t=n.getContext("2d",{willReadFrequently:!0}),i=new ia(n);s&&(i.colorSpace=ra),i.anisotropy=8;const r={tex:i,redesenhar(){t.save(),t.clearRect(0,0,e,o),a(t,e,o),t.restore(),i.needsUpdate=!0}};return r.redesenhar(),Fo.push(r),i}function Ba(){const e=[`600 40px ${S}`,`400 40px ${S}`,`400 40px ${Q}`];Promise.all(e.map(o=>document.fonts?.load(o).catch(()=>null))).then(()=>document.fonts?.ready).then(()=>Fo.forEach(o=>o.redesenhar())).catch(()=>{})}function y(e,o,a,s,n=_,t="rgba(255,255,255,0.55)"){e.fillStyle=t,e.fillText(o,a+1.5,s+2),e.fillStyle=n,e.fillText(o,a,s)}function mo(e,o,a,s,n,t){e.beginPath(),e.moveTo(o+t,a),e.arcTo(o+s,a,o+s,a+n,t),e.arcTo(o+s,a+n,o,a+n,t),e.arcTo(o,a+n,o,a,t),e.arcTo(o,a,o+s,a,t),e.closePath()}function qo(e,o,a,s=ka){e.fillStyle=s,e.fillRect(0,0,o,a);const n=e.getImageData(0,0,o,a);for(let t=0;t<n.data.length;t+=4){const i=(Math.random()-.5)*7;n.data[t]+=i,n.data[t+1]+=i,n.data[t+2]+=i}e.putImageData(n,0,0)}function Lo(e,o,a,{acento:s}){e.fillStyle="#f6f2ec",e.fillRect(0,0,o,a);const n=o*.08;e.fillStyle=_,e.font=`600 ${o*.04}px ${S}`,e.fillText("9:41",n,a*.045),e.fillRect(o-n-o*.09,a*.028,o*.09,a*.018),e.fillStyle=s,e.fillRect(n,a*.09,o*.12,a*.008),e.fillStyle=_,e.font=`400 ${o*.115}px ${Q}`,e.fillText("Lanchonete",n,a*.155),e.fillText("Pátio",n,a*.21),e.fillStyle=P,e.font=`400 ${o*.045}px ${S}`,e.fillText("Cardápio do intervalo",n,a*.25);const t=[["X-salada","R$ 12,00"],["Pão de queijo","R$ 4,50"],["Coxinha","R$ 5,00"],["Suco natural","R$ 6,00"],["Bolo de cenoura","R$ 5,50"]];let i=a*.31;for(const[r,c]of t)e.strokeStyle="rgba(25,23,20,0.14)",e.lineWidth=2,e.beginPath(),e.moveTo(n,i),e.lineTo(o-n,i),e.stroke(),e.fillStyle="#e3ddd2",mo(e,n,i+a*.018,o*.16,o*.16,o*.03),e.fill(),e.fillStyle=_,e.font=`500 ${o*.055}px ${S}`,e.fillText(r,n+o*.21,i+a*.05),e.fillStyle=P,e.font=`400 ${o*.045}px ${S}`,e.fillText(c,n+o*.21,i+a*.078),e.fillStyle=_,e.font=`400 ${o*.07}px ${S}`,e.fillText("+",o-n-o*.06,i+a*.064),i+=a*.105;e.fillStyle=_,mo(e,n,a*.86,o-2*n,a*.065,o*.03),e.fill(),e.fillStyle="#f6f2ec",e.font=`600 ${o*.055}px ${S}`,e.textAlign="center",e.fillText("Fazer pedido · 2 itens",o/2,a*.9),e.textAlign="left"}function po(e,o,a,s,n){e.font=`600 ${o*.05}px ${S}`,y(e,`${s}`,o*.08,a*.06,"#c4502b"),e.font=`400 ${o*.13}px ${Q}`,y(e,n,o*.17,a*.07),e.strokeStyle="rgba(25,23,20,0.35)",e.lineWidth=3,e.beginPath(),e.moveTo(o*.08,a*.092),e.lineTo(o*.92,a*.092),e.stroke()}function za(e,o){return(a,s,n)=>{if(e==="interface")return Lo(a,s,n,{acento:o});qo(a,s,n);const t=s*.08;if(e==="logica"){po(a,s,n,2,"Lógica"),a.font=`500 ${s*.05}px ${j}`,["adicionar(item) {","  carrinho.push(item)","  total += item.preco","}","","fazerPedido() {","  if (vazio) return",'  api.post("/pedidos")',"}"].forEach((r,c)=>y(a,r,t,n*(.16+c*.058),_));for(let r=0;r<10;r++){const c=n*(.73+r*.022),l=r%4*s*.05;a.fillStyle=r%5===2?"rgba(196,80,43,0.55)":"rgba(25,23,20,0.28)",a.fillRect(t+l,c,s*(.25+r*37%40/100),n*.008)}}else if(e==="rede"){po(a,s,n,3,"Rede");const i=(c,l,d)=>{a.strokeStyle=_,a.lineWidth=3,mo(a,c,l,s*.34,n*.07,10),a.stroke(),a.font=`500 ${s*.06}px ${S}`,y(a,d,c+s*.04,l+n*.047)};i(t,n*.18,"app"),i(s-t-s*.34,n*.18,"servidor"),a.font=`500 ${s*.05}px ${j}`,["GET  /cardapio","200  [ … ]","POST /pedidos","201  { pedido }"].forEach((c,l)=>{const d=n*(.33+l*.12),u=l%2===0;a.strokeStyle=u?"#c4502b":_,a.lineWidth=3,a.beginPath(),a.moveTo(t+s*.17,d),a.lineTo(s-t-s*.17,d),a.stroke();const T=u?s-t-s*.17:t+s*.17,E=u?-1:1;a.beginPath(),a.moveTo(T,d),a.lineTo(T+E*22,d-12),a.moveTo(T,d),a.lineTo(T+E*22,d+12),a.stroke(),y(a,c,t+s*.2,d-n*.02)})}else if(e==="dados"){po(a,s,n,4,"Dados");const i=[t,t+s*.17,t+s*.58];[["id","item","preço"],["1","X-salada","12,00"],["2","Pão de queijo","4,50"],["3","Coxinha","5,00"],["4","Suco natural","6,00"],["5","Bolo","5,50"]].forEach((c,l)=>{const d=n*(.17+l*.07);a.font=l===0?`600 ${s*.056}px ${S}`:`500 ${s*.05}px ${j}`,c.forEach((u,T)=>y(a,u,i[T],d,l===0?"#c4502b":_)),a.strokeStyle="rgba(25,23,20,0.3)",a.lineWidth=l===0?3:1.5,a.beginPath(),a.moveTo(t,d+n*.022),a.lineTo(s-t,d+n*.022),a.stroke()});for(const c of[i[1]-s*.03,i[2]-s*.03])a.beginPath(),a.moveTo(c,n*.13),a.lineTo(c,n*.58),a.stroke()}else if(e==="binario"){po(a,s,n,5,"Binário"),a.font=`500 ${s*.046}px ${j}`;let i=7;const r=()=>(i=i*16807%2147483647)/2147483647;for(let c=0;c<25;c++){let l="";for(let d=0;d<6;d++)l+=Math.floor(r()*256).toString(2).padStart(8,"0").slice(0,4)+" ";a.fillStyle=c%6===2?"rgba(196,80,43,0.9)":"rgba(25,23,20,0.7)",a.fillText(l,t,n*(.15+c*.033))}}}}function Da(e,o,a){qo(e,o,a,"#efeae2");const s=o*.06;e.font=`600 ${o*.026}px ${S}`,y(e,"desconto.c",s,a*.1,P),e.font=`400 ${o*.034}px ${j}`,Ea.split(`
`).forEach((n,t)=>{const i=a*(.22+t*.09);if((n.trim().startsWith("//")||n.includes("// "))&&n.includes("// ")&&!n.trim().startsWith("//")){const[c,l]=n.split("// ");y(e,c,s,i,_);const d=e.measureText(c).width;y(e,"// "+l,s+d,i,"#8a8378")}else y(e,n,s,i,n.trim().startsWith("//")?"#8a8378":_)})}function fo(e,o,a,s,n){e.fillStyle="#cfccc6",e.fillRect(0,0,o,a),e.save(),e.translate(o*.5,a*1.6);for(let i=40;i<o*1.6;i+=3)e.strokeStyle=`rgba(${i%7<3?"255,255,255":"90,86,80"},${.05+i*13%10/260})`,e.lineWidth=1.2,e.beginPath(),e.arc(0,0,i,0,Math.PI*2),e.stroke();e.restore();const t=o*.06;return e.font=`600 ${o*.024}px ${S}`,y(e,`nível ${n}`,t,a*.1,"#c4502b","rgba(255,255,255,0.6)"),e.font=`400 ${o*.06}px ${Q}`,y(e,s,t,a*.19,_,"rgba(255,255,255,0.6)"),e.strokeStyle="rgba(25,23,20,0.45)",e.lineWidth=2,e.beginPath(),e.moveTo(t,a*.225),e.lineTo(o-t,a*.225),e.stroke(),t}function Oa(e){return(o,a,s)=>{if(e===1){const n=fo(o,a,s,"Binário",1);o.font=`400 ${a*.03}px ${j}`;const t=[...oo.antes,...oo.funcao,...oo.depois],i=oo.antes.length,r=i+oo.funcao.length;for(let c=0;c<4;c++){const l=s*(.33+c*.11),d=(oo.inicio+c*16).toString(16).padStart(8,"0");y(o,d,n,l,P,"rgba(255,255,255,0.6)");for(let u=0;u<16;u++){const T=c*16+u,E=t[T];if(E===void 0)continue;const ao=n+a*.2+u*a*.044+(u>=8?a*.015:0),K=T>=i&&T<r;y(o,E.toString(16).padStart(2,"0").toUpperCase(),ao,l,K?"#b8441f":"rgba(25,23,20,0.5)","rgba(255,255,255,0.6)")}}o.font=`400 ${a*.024}px ${S}`,y(o,"em laranja: os 14 bytes da função · exemplo simplificado",n,s*.86,P,"rgba(255,255,255,0.6)")}else if(e===2){const n=fo(o,a,s,"Assembly",2);o.font=`400 ${a*.036}px ${j}`,Ra.forEach(([t,i],r)=>{const c=s*(.33+r*.095),l=!t.startsWith(" ");y(o,t.trim(),n+(l?0:a*.05),c,l?"#b8441f":_,"rgba(255,255,255,0.6)"),i&&y(o,i,n+a*.24,c,_,"rgba(255,255,255,0.6)")})}else if(e===3){const n=fo(o,a,s,"Pseudocódigo",3);o.font=`400 ${a*.03}px ${j}`,Ia.split(`
`).forEach((t,i)=>{const r=s*(.32+i*.08);y(o,t,n,r,_,"rgba(255,255,255,0.6)")}),o.font=`400 ${a*.024}px ${S}`,y(o,"sem nomes, sem comentários: só a estrutura",n,s*.92,P,"rgba(255,255,255,0.6)")}else{fo(o,a,s,"Lógica entendida",4),o.strokeStyle=_,o.fillStyle=_,o.lineWidth=3;const n=a*.5,t=(c,l,d,u,T)=>{mo(o,c-d/2,l-u/2,d,u,12),o.stroke(),o.font=`500 ${a*.03}px ${S}`,o.textAlign="center",y(o,T,c,l+a*.01,_,"rgba(255,255,255,0.6)"),o.textAlign="left"},i=(c,l,d,u)=>{o.beginPath(),o.moveTo(c,l),o.lineTo(d,u),o.stroke();const T=Math.atan2(u-l,d-c);o.beginPath(),o.moveTo(d,u),o.lineTo(d-16*Math.cos(T-.45),u-16*Math.sin(T-.45)),o.moveTo(d,u),o.lineTo(d-16*Math.cos(T+.45),u-16*Math.sin(T+.45)),o.stroke()};t(n,s*.33,a*.44,s*.09,"recebe preço e cupom"),i(n,s*.375,n,s*.45);const r=s*.53;o.beginPath(),o.moveTo(n,r-s*.08),o.lineTo(n+a*.17,r),o.lineTo(n,r+s*.08),o.lineTo(n-a*.17,r),o.closePath(),o.strokeStyle="#b8441f",o.stroke(),o.strokeStyle=_,o.font=`500 ${a*.03}px ${S}`,o.textAlign="center",y(o,"cupom = 10?",n,r+a*.01,"#b8441f","rgba(255,255,255,0.6)"),o.textAlign="left",i(n+a*.17,r,a*.8,r),o.font=`500 ${a*.024}px ${S}`,y(o,"sim",n+a*.19,r-s*.02,P,"rgba(255,255,255,0.6)"),y(o,"não",n+a*.015,r+s*.12,P,"rgba(255,255,255,0.6)"),t(a*.8,s*.66,a*.25,s*.09,"preço × 0,9"),i(a*.8,r,a*.8,s*.615),i(n,r+s*.08,n,s*.76),i(a*.8,s*.705,a*.8,s*.8),i(a*.8,s*.8,n+a*.16,s*.8),t(n,s*.8,a*.3,s*.08,"devolve o preço"),o.font=`400 ${a*.024}px ${S}`,y(o,"“dá 10% de desconto quando o cupom é 10”",a*.06,s*.93,P,"rgba(255,255,255,0.6)")}}}function Wo(e,o,a){e.clearRect(0,0,o,a),e.font=`400 ${a*.5}px ${Q}`,e.fillStyle="rgba(0,0,0,0.55)",e.fillText("app",o*.05+2,a*.62+2),e.fillStyle="rgba(210,205,196,0.9)",e.fillText("app",o*.05,a*.62),e.font=`500 ${a*.14}px ${S}`,e.fillStyle="rgba(210,205,196,0.65)",e.fillText("executável · x86-64",o*.06,a*.88)}function Ga(e){return(o,a,s)=>{qo(o,a,s,"#e6e1d8");const n=a*.12;for(let t=0;t<26;t++){const i=s*.1+t*s*.022;o.fillStyle="rgba(25,23,20,0.5)",o.fillRect(n,i,a-2*n,s*.007),o.fillStyle="rgba(255,255,255,0.6)",o.fillRect(n,i+s*.007,a-2*n,2)}for(let t=0;t<3;t++)o.fillStyle=t===0?e:"rgba(25,23,20,0.55)",o.beginPath(),o.arc(n+t*a*.1,s*.8,a*.025,0,Math.PI*2),o.fill();o.font=`500 ${a*.075}px ${S}`,y(o,"servidor",n,s*.9,P)}}function Vo(e,o,a,s,n,t,i){e.fillStyle="#f7f4ee",e.fillRect(0,0,o,a),e.strokeStyle="rgba(25,23,20,0.25)",e.lineWidth=3,e.strokeRect(6,6,o-12,a-12);const r=o*.07;e.fillStyle=i,e.fillRect(r,a*.08,o*.08,a*.012),e.font=`600 ${o*.034}px ${S}`,e.fillStyle=P,e.fillText(n,r+o*.11,a*.1),e.font=`400 ${o*.075}px ${Q}`,e.fillStyle=_,e.fillText(s,r,a*.25),e.font=`400 ${o*.04}px ${j}`,t.forEach((c,l)=>{e.fillStyle=c.startsWith("  ")||c==="{"||c==="}"?_:"#b8441f",e.fillText(c,r,a*(.4+l*.085))})}const ja=e=>(o,a,s)=>Vo(o,a,s,"POST /api/pedidos","requisição · app → servidor",["Content-Type: application/json","{",'  "item": "X-salada",','  "quantidade": 2,','  "retirada": "intervalo"',"}"],e),Wa=e=>(o,a,s)=>Vo(o,a,s,"201 Created","resposta · servidor → app",["Content-Type: application/json","{",'  "pedido": 4812,','  "status": "em preparo",','  "previsao_min": 7',"}"],e),Na=e=>(o,a,s)=>{o.fillStyle="#f7f4ee",o.fillRect(0,0,a,s);const n=a*.08;o.fillStyle=e,o.fillRect(n,s*.06,a*.1,s*.008),o.fillStyle=P,o.font=`600 ${a*.032}px ${S}`,o.fillText("documentação reconstruída · exemplo fictício",n,s*.1),o.fillStyle=_,o.font=`400 ${a*.085}px ${Q}`,o.fillText("API da",n,s*.18),o.fillText("Lanchonete Pátio",n,s*.24),[["GET","/api/cardapio","lista os itens e preços"],["POST","/api/pedidos","cria um pedido (item, quantidade)"],["GET","/api/pedidos/{id}","consulta o status do pedido"]].forEach(([i,r,c],l)=>{const d=s*(.35+l*.16);o.strokeStyle="rgba(25,23,20,0.2)",o.lineWidth=2,o.beginPath(),o.moveTo(n,d-s*.04),o.lineTo(a-n,d-s*.04),o.stroke(),o.font=`600 ${a*.04}px ${j}`,o.fillStyle="#b8441f",o.fillText(i,n,d),o.fillStyle=_,o.fillText(r,n+a*.17,d),o.font=`400 ${a*.04}px ${S}`,o.fillStyle=P,o.fillText(c,n,d+s*.05)}),o.font=`400 ${a*.034}px ${S}`,o.fillStyle=P,o.fillText("Fonte: tráfego observado, com autorização.",n,s*.88)},M=e=>Math.max(0,Math.min(1,e)),A=e=>{const o=M(e);return o<.5?4*o*o*o:1-Math.pow(-2*o+2,3)/2},G=ca.lerp;function _o(e,o,a,s,n=.008){const t=new No,i=-e/2,r=-o/2;t.moveTo(i+s,r),t.lineTo(i+e-s,r),t.quadraticCurveTo(i+e,r,i+e,r+s),t.lineTo(i+e,r+o-s),t.quadraticCurveTo(i+e,r+o,i+e-s,r+o),t.lineTo(i+s,r+o),t.quadraticCurveTo(i,r+o,i,r+o-s),t.lineTo(i,r+s),t.quadraticCurveTo(i,r,i+s,r);const c=new ua(t,{depth:Math.max(.001,a-n*2),bevelEnabled:!0,bevelThickness:n,bevelSize:n,bevelOffset:-n,bevelSegments:2,curveSegments:10});c.translate(0,0,-a/2+n);const l=c.attributes.position,d=c.attributes.uv;for(let u=0;u<d.count;u++)d.setXY(u,(l.getX(u)+e/2)/e,(l.getY(u)+o/2)/o);return c}function Fa(e,o,a){const s=new No,n=-e/2,t=-o/2;s.moveTo(n+a,t),s.lineTo(n+e-a,t),s.quadraticCurveTo(n+e,t,n+e,t+a),s.lineTo(n+e,t+o-a),s.quadraticCurveTo(n+e,t+o,n+e-a,t+o),s.lineTo(n+a,t+o),s.quadraticCurveTo(n,t+o,n,t+o-a),s.lineTo(n,t+a),s.quadraticCurveTo(n,t,n+a,t);const i=new va(s,12),r=i.attributes.position,c=i.attributes.uv;for(let l=0;l<c.count;l++)c.setXY(l,(r.getX(l)+e/2)/e,(r.getY(l)+o/2)/o);return i}const J=e=>(e.traverse(o=>{o.isMesh&&(o.castShadow=!0)}),e);function La({stage:e,annotations:o,materiais:a,acento:s}){const n=new N,t={...Go},i=new h,r=(p,f,m,v)=>{const C=new h;return()=>C.set(f,m,v).applyMatrix4(p.matrixWorld)},c=(p,f,m,v)=>{const C=e.chao.contato.clone();return C.position.set(p,.002,f),C.scale.set(m,v,1),e.scene.add(C),C},l={h:1.5,d:2},d=new N;n.add(d);const u=a.anodizado(),T=[1.2,.84,.48,.12,-.24,-1.2],E=[];for(let p=0;p<5;p++){const f=T[p],m=T[p+1],v=new N,C=new q(new w(f-m,l.h,l.d,3,.016),u);if(v.add(C),v.position.set((m+f)/2,l.h/2,0),p>=1){const R=O(1280,940,Oa(p)),Z=new q(new to(l.d-.08,l.h-.08),a.impresso(R,{roughness:.42,metalness:.25}));Z.rotation.y=Math.PI/2,Z.position.x=(f-m)/2+.003,v.add(Z)}if(p===0){const R=new q(new to(1,.5),new $o({map:O(512,256,Wo),transparent:!0,depthWrite:!1}));R.rotation.y=Math.PI/2,R.position.set((f-m)/2+.004,.15,.2),v.add(R)}J(v),d.add(v),E.push({g:v,casa:v.position.clone(),largura:f-m})}const ao=new $o({map:O(512,256,Wo),transparent:!0,opacity:0,depthWrite:!1}),K=new q(new to(.84,.42),ao);K.position.set(-.24-.48-(T[4]-T[5])/2+.48,.95,l.d/2+.004),K.position.x=(T[4]+T[5])/2,d.add(K);const so=new q(new la(1.7,.012,.07),new $o({color:723465}));so.position.set(0,l.h+.004,0),d.add(so);const Uo=a.impresso(O(1456,1e3,Da)),Mo=a.ceramica(),V=J(new q(_o(1.6,1.1,.04,.05),[Uo,Mo]));d.add(V);const U=new N;U.position.x=-1.8,n.add(U);const B={w:1.5,h:3,esp:.16},eo=new N;eo.position.set(-5.4,0,.4),eo.scale.setScalar(.62),U.add(eo);const Ao=J(new q(new w(1.15,.24,.8,3,.06),a.ceramicaCinza()));Ao.position.y=.12,eo.add(Ao);const no=new N;no.position.y=.2,eo.add(no);const uo=new N;uo.rotation.x=-.12,no.add(uo);const z=new N;z.position.y=B.h/2,uo.add(z);const ho=a.aluminio(),Xo=new q(_o(B.w,B.h,B.esp,.22,.03),[a.ceramica(),ho]);z.add(Xo);const Co=new q(new w(.5,.5,.05,3,.1),a.ceramica());Co.position.set(-.36,1,-.16/2-.02),z.add(Co);for(const[p,f]of[[-.47,1.1],[-.27,.9]]){const m=new q(new da(.075,.075,.05,32),a.vidro());m.rotation.x=Math.PI/2,m.position.set(p,f,-.16/2-.05),z.add(m)}for(const[p,f]of[[.75,.36],[.25,.22]]){const m=new q(new w(.03,f,.06,2,.012),ho);m.position.set(B.w/2+.012,p,0),z.add(m)}const Ho=O(768,1536,(p,f,m)=>Lo(p,f,m,{acento:s})),Po=new Oo({color:789517,roughness:.14,metalness:0,emissive:16777215,emissiveMap:Ho,emissiveIntensity:0}),Eo=new q(Fa(B.w-.12,B.h-.12,.17),Po);Eo.position.z=B.esp/2+.002,z.add(Eo),J(z),c(-7.2,.4,1.3,.95);const Yo=[["interface","1 · Interface"],["logica","2 · Lógica"],["rede","3 · Rede"],["dados","4 · Dados"],["binario","5 · Binário"]].map(([p,f],m)=>{const v=O(768,1536,za(p,s)),C=p==="interface"?new Oo({color:16777215,map:v,roughness:.5,emissive:16777215,emissiveMap:v,emissiveIntensity:.25}):a.impresso(v),R=J(new q(_o(B.w-.12,B.h-.12,.045,.16),[C,Mo]));return R.visible=!1,z.add(R),o.rotulo({ancora:r(R,0,-2.88/2,0),texto:f,direcao:[.35,1],comprimento:3+m%2*3,visivel:()=>t.rotulosCamadas*t.presenca*M(t.camadas-m)*A(t.leque)}),{m:R,zFinal:.6+(4-m)*.95}});o.rotulo({ancora:r(z,0,.2,0),texto:"código-fonte: não vem junto",direcao:[1,-.8],comprimento:9,visivel:()=>t.duvida*t.presenca});const F=new N;F.position.set(-8.4,0,-.4),F.rotation.y=.35,U.add(F);const Ro=J(new q(new w(1.1,2.4,1.2,3,.07),a.ceramica()));Ro.position.y=1.32;const Io=J(new q(new w(1.25,.12,1.35,2,.03),a.anodizado()));Io.position.y=.06;const ko=new q(new to(1,2.25),a.impresso(O(512,1152,Ga(s))));ko.position.set(0,1.32,.603),F.add(Ro,Io,ko);const Jo=c(-10.2,-.4,1.4,1.5),Bo=new pa([new h(-5.1,.035,.75),new h(-5.9,.035,1.6),new h(-7.3,.035,1.5),new h(-8.1,.035,.5),new h(-8.25,.035,.15)]),vo=new fa(Bo,160,.03,8,!1),xo=new q(vo,a.borracha());xo.receiveShadow=!1,U.add(xo);const Qo=vo.index.count,io=Bo.getSpacedPoints(240),bo=(p,f)=>{const m=Math.max(0,Math.min(1,p||0))*(io.length-1),v=Math.min(io.length-2,Math.floor(m));return f.lerpVectors(io[v],io[v+1],m-v)},Ko=a.acento(s),Zo=a.ceramica(),go=new ma(.075,24,16),zo=[];for(let p=0;p<8;p++){const f=p<4,m=new q(go,f?Ko:Zo);m.castShadow=!0,U.add(m),zo.push({c:m,ida:f,fase:p%4/4})}const wo=p=>{const f=a.impresso(p,{transparent:!0,opacity:0,roughness:.7});return f.depthWrite=!1,f},yo=(p,f,m)=>{const v=new q(new to(f,m),wo(p));return v.castShadow=!1,U.add(v),v},ro=yo(O(1024,640,ja(s)),1.5,.94),co=yo(O(1024,640,Wa(s)),1.5,.94),lo=yo(O(1024,1330,Na(s)),1.5,1.95),oa=(p,f)=>{p.lookAt(f)},aa=new h(...jo["api-perto"].pos);o.rotulo({ancora:r(V,-.2,.55,.02),texto:"código-fonte: escrito para pessoas",direcao:[-.35,-1],comprimento:5,visivel:()=>t.presenca*M(1-Math.abs(t.codigo-1)*2.5)}),o.rotulo({ancora:r(d,-1.2,1.5,1),texto:"executável: escrito para o processador",direcao:[-1,-.7],comprimento:6,visivel:()=>t.presenca*M((t.codigo-1.5)*2)*M(1-t.fatias*3)}),o.rotulo({ancora:r(E[3].g,E[3].largura/2+.004,.27,.1),texto:"preco virou param_1",direcao:[.25,-1],comprimento:6,visivel:()=>t.pistas*t.presenca*M((t.fatias-2.6)*3)*(t.fatias>3.2?0+M((t.fatias-3.9)*10):1)}),o.rotulo({ancora:r(E[3].g,E[3].largura/2+.004,-.2,.75),texto:"comentários: perdidos",direcao:[.25,1],comprimento:5,visivel:()=>t.pistas*t.presenca*M((t.fatias-2.6)*3)*(t.fatias>3.2?0+M((t.fatias-3.9)*10):1)}),o.rotulo({ancora:r(F,0,2.6,0),texto:"sistema sem documentação",direcao:[1,-.6],comprimento:5,visivel:()=>t.presenca*M(t.servidor*2-1)*(1-t.congelar)}),Ba();let Do=0;function ea(p){Object.assign(t,p),n.visible=t.presenca>.01}function ta(p){if(!n.visible)return;Do+=p;for(let x=0;x<4;x++){const $=E[x],k=M(t.fatias-x),W=A(Math.min(1,k*1.8)),I=A((k-.45)/.55),L=2.5+(3-x)*1.3,g=1-.42*I;$.g.position.set($.casa.x+W*.9+I*(L-$.casa.x-.9),G($.casa.y,$.casa.y*g,I)+Math.sin(I*Math.PI)*.45,$.casa.z-I*2.5),$.g.rotation.y=-Math.PI/2*I,$.g.scale.setScalar(g)}{const x=E[4],$=A(t.exposicao),k=1-.42*$;x.g.position.set(G(x.casa.x,1.2,$),G(x.casa.y,x.casa.y*k,$)+Math.sin($*Math.PI)*.45,x.casa.z-$*2.5),x.g.rotation.y=-Math.PI/2*$,x.g.scale.setScalar(k)}ao.opacity=t.rotuloBloco*.95,K.visible=ao.opacity>.01,so.scale.x=Math.max(.001,1-t.selado),so.visible=t.selado<.99;const f=A(M(t.codigo)),m=M(t.codigo-1),v=A(m/.55),C=A((m-.5)/.5);V.visible=f>.01&&C<.999,V.scale.setScalar(Math.max(.001,f)),V.position.set(G(-2.7,0,v),G(1.25,l.h+.75,v)-C*1.15,G(.6,0,v)),V.rotation.y=G(.18,0,v),V.scale.y=Math.max(.001,f*(1-C*.15));const R=A(t.leque);Po.emissiveIntensity=t.tela*(1-A(M(t.camadas*2)))*.95,no.rotation.y=A(t.virar)*2.5,Yo.forEach((x,$)=>{const k=A(M((t.camadas-$)*2-1)),W=A(M((t.camadas-$-1)*2)),I=k*(1-W),L=R*A(M(t.camadas-$));x.m.visible=I>.001||L>.001,x.m.position.set(G(0,($-2)*.12,L),G(.1*I,.06*(2-$),L),G(2.4*I,x.zFinal,L))});const Z=A(t.servidor);F.visible=Z>.01,F.scale.set(.78,.78*Math.max(.001,Z),.78),Jo.visible=F.visible,xo.visible=t.cabo>.01,vo.setDrawRange(0,Math.floor(Qo*M(t.cabo)/3)*3);const So=M(t.trafego),X=A(t.congelar),H=A(t.resposta),D=A(t.doc);zo.forEach((x,$)=>{let k=(Do*.22+x.fase)%1;x.ida||(k=1-k),bo(k,i);let W=So;const I=$===0,L=$===4;if(I&&X>0){const g=bo(.5,new h).add(new h(0,.9,0));i.lerp(g,X),W=Math.max(So,X)*(1+X*1.6)*(1-D)}else if(L&&H>0){const g=bo(.32,new h).add(new h(0,.9,0));i.lerp(g,H),W=Math.max(So,H)*(1+H*1.6)*(1-D)}else W*=1-Math.max(X,H)*.85;x.c.position.copy(i),x.c.position.y+=.06,x.c.scale.setScalar(Math.max(.001,W)),x.c.visible=W>.01&&t.cabo>.5});const sa=new h(-6.35,1.75,1.7),na=new h(-7.75,1.55,1.25),To=new h(-7,1.3,1.3);ro.position.copy(sa).lerp(To,D),co.position.copy(na).lerp(To,D),ro.material.opacity=X*(1-D),co.material.opacity=H*(1-D),ro.scale.setScalar(Math.max(.001,(.6+.4*X)*(1-D*.6))),co.scale.setScalar(Math.max(.001,(.6+.4*H)*(1-D*.6))),lo.position.copy(To),lo.material.opacity=D,lo.scale.setScalar(Math.max(.001,.85+.15*D));for(const x of[ro,co,lo])x.visible=x.material.opacity>.01,oa(x,aa)}return{group:n,defaults:Go,states:Pa,cameras:jo,cameraPadrao:"bloco-estudio",apply:ea,update:ta,dispose(){n.traverse(p=>{p.geometry?.dispose(),p.material&&[].concat(p.material).forEach(f=>f.dispose())})}}}const Va={titulo:"Engenharia reversa · Semana de TI",acento:"#e4572e",climaPadrao:"estudio",cenaPadrao:"software",conteudo:Object.assign({"./conteudo/01-abertura.md":ba,"./conteudo/02-o-que-e.md":ya,"./conteudo/03-duas-direcoes.md":Sa,"./conteudo/04-por-dentro.md":Ta,"./conteudo/05-descompilando.md":$a,"./conteudo/06-ferramentas.md":_a,"./conteudo/07-caso-api.md":qa,"./conteudo/08-onde-e-usado.md":Ma,"./conteudo/09-limites-etica.md":Aa,"./conteudo/10-ia-sozinha.md":ha,"./conteudo/11-final.md":Ca}),cenas:{software:La}};xa(Va);
