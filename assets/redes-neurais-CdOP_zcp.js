var Po=n=>{throw TypeError(n)};var fe=(n,e,o)=>e.has(n)||Po("Cannot "+o);var Uo=(n,e,o)=>e.has(n)?Po("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(n):e.set(n,o);var mo=(n,e,o)=>(fe(n,e,"access private method"),o);import"./base-z0CO-Qoj.js";import{j as ve,k as ge,l as xe,m as K,I as be,V as g,e as Go,T as we,n as re,G as no,b as wo,f as to,c as Eo,o as No,p as ie,Q as ce,a as S,R as Do,q as Me,r as ye,P as Qo,C as Ae,S as Se,i as Ce}from"./RoundedBoxGeometry-m7QAofEk.js";const Ee=`---
titulo: Redes|neurais
rotulo: Sala temática · IA vs Humanos
cena: redes
estado: pulso
camera: dupla-escuro
clima: holofote
layout: esquerda
destaque: sim
---

Um sinal. Depois, muitos.

<!-- passo estado=crescendo camera=dupla-crescer -->
Como uma máquina **aprende** a partir de exemplos?`,Te=`---
titulo: Tudo começa|num neurônio
rotulo: 02 · O neurônio biológico
estado: neuronio
camera: neuronio
clima: estudio
layout: esquerda
passos-modo: troca
---

No cérebro, um neurônio recebe sinais, decide e passa adiante.

<!-- passo estado=dendritos camera=dendritos -->
Os **dendritos** recebem sinais de outros neurônios.

<!-- passo estado=corpo camera=corpo -->
O **corpo celular** junta tudo. Se o estímulo for forte o bastante, ele **dispara**.

<!-- passo estado=axonio camera=axonio -->
O **axônio** leva o sinal adiante.

<!-- passo estado=sinapse camera=sinapse -->
Na **sinapse**, substâncias químicas passam o recado para o próximo neurônio.`,Re=`---
titulo: Do biológico|ao artificial
rotulo: 03 · O neurônio artificial
estado: artificial
camera: artificial
clima: estudio
layout: esquerda
passos-modo: troca
---

Uma versão **matemática** do neurônio: inspirada no cérebro, não uma cópia dele.

<!-- passo estado=art-entradas camera=art-perto -->
**Entradas**: números que chegam (x₁, x₂, x₃).

<!-- passo estado=art-pesos -->
Cada entrada tem um **peso**: o quanto ela importa.

<!-- passo estado=art-soma camera=artificial -->
O neurônio **soma** tudo: entrada × peso, mais um ajuste (o viés).

> 0,8·0,9 + 0,2·(−0,4) + 0,5·0,6 + 0,1 = 1,04

<!-- passo estado=art-dispara camera=art-saida -->
A **ativação** transforma a soma num sinal de saída: aqui, 0,74.`,qe=`---
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

<!-- passo estado=rede-saida camera=rede-saida -->
**Saída**: um neurônio para cada resposta possível: gato ou cachorro.

<!-- passo estado=rede-avanco camera=rede -->
O sinal atravessa a rede, camada por camada, e sai uma **resposta**.`,_e=`---
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
Repete com milhares de **dados de treino**. Cada volta completa é uma **época**. O erro cai.`,ze=`---
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

> Treino de verdade, aqui no navegador. A semente é fixa: o resultado se repete.`,Oe=`---
titulo: O que a rede|“vê”
rotulo: 07 · Imagens
estado: pixels
camera: pixels
clima: estudio
layout: direita
passos-modo: troca
---

Para a rede, uma foto é uma grade de **pixels**.

<!-- passo estado=numeros -->
Cada pixel vira um **número**: claro perto de 0, escuro perto de 1.

<!-- passo estado=pixels-entram camera=pixels-rede -->
Esses números entram na rede.

<!-- passo estado=padroes camera=padroes -->
Em redes de imagem, as primeiras camadas tendem a captar **bordas**; depois, **formas**; no fim, **objetos**.

> Uma tendência geral, não uma regra.`,je=`---
titulo: Cérebro e máquina
rotulo: 08 · Comparação
estado: dupla
camera: dupla
clima: estudio
layout: rodape
passos-modo: troca
---

Lado a lado. Inspiração não é cópia.

<!-- passo camera=dupla-org -->
**Neurônios**: o cérebro humano tem cerca de **86 bilhões** (valor aproximado). Grandes modelos de IA têm bilhões de **pesos**.

<!-- passo camera=dupla-alto -->
**Energia**: o cérebro funciona com cerca de **20 watts**. Treinar grandes modelos de IA exige **data centers** inteiros.

<!-- passo camera=dupla-org -->
**Aprendizado**: uma criança aprende com poucos exemplos. Redes costumam precisar de **muitos** dados.

<!-- passo camera=dupla-maq -->
**Velocidade e escala**: máquinas processam volumes enormes de dados, sem cansar.

<!-- passo camera=dupla -->
**Compreensão, consciência, emoção**: perguntas em aberto. Ainda estão em debate.`,Ie=`---
titulo: Onde elas|já estão
rotulo: 09 · No dia a dia
estado: app-1
camera: app-a
clima: estudio
layout: esquerda
---

- Assistentes de IA (ChatGPT, Claude)

<!-- passo estado=app-2 -->
- Tradução automática

<!-- passo estado=app-3 camera=app-b -->
- Desbloqueio pelo rosto

<!-- passo estado=app-4 -->
- Recomendações de vídeos e músicas

<!-- passo estado=app-5 camera=app-c -->
- Assistência ao motorista

<!-- passo estado=app-6 -->
- Apoio a diagnóstico por imagem: quem decide é o médico`,Ne=`---
titulo: E os|limites?
rotulo: 10 · Cuidados
estado: limites
camera: rede-geral
clima: estudio
layout: esquerda
---

- **Viés**: aprende também os preconceitos dos dados

<!-- passo camera=rede-saida -->
- **Alucinação**: inventa respostas com toda a confiança

<!-- passo camera=rede-meio -->
- **Caixa-preta**: é difícil explicar por que decidiu

<!-- passo camera=rede -->
- **Energia**: treinar modelos grandes gasta muita eletricidade`,De=`---
titulo: A máquina aprende com exemplos.|Nós escolhemos quais exemplos dar.
rotulo: 11 · Final
estado: final-unido
camera: final-holofote
clima: holofote
layout: rodape
---

Um sinal. Dois mundos. Uma rede.

<!-- passo camera=final clima=estudio -->
No fim, IA vs Humanos ou **IA com Humanos**?`,so={dupla:-14,neuronio:0,exemplo:12,demo:26},Zo={crescer:0,maquina:0,unir:0,pulsoDupla:0,rotDendritos:0,rotSoma:0,rotAxonio:0,rotSinapse:0,pulsoBio:0,sinapse:0,artificial:0,entradas:0,pesos:0,somaArt:0,disparo:0,rede:0,camadasRede:0,avanco:0,retro:0,ajuste:0,mostrarSaida:0,acerto:.5,mostrarErro:0,erroRede:.9,imagem:0,numeros:0,entrar:0,padroes:0,app:0,demo:0},Y={rede:1,camadasRede:4},Jo={crescer:1,maquina:1,pulsoDupla:1},Be={pulso:{crescer:.04,pulsoDupla:1},crescendo:{crescer:1,pulsoDupla:1},neuronio:{},dendritos:{rotDendritos:1,pulsoBio:1},corpo:{rotDendritos:1,rotSoma:1,pulsoBio:1},axonio:{rotSoma:1,rotAxonio:1,pulsoBio:1},sinapse:{rotAxonio:1,rotSinapse:1,pulsoBio:1,sinapse:1},artificial:{artificial:1},"art-entradas":{artificial:1,entradas:1},"art-pesos":{artificial:1,entradas:1,pesos:1},"art-soma":{artificial:1,entradas:1,pesos:1,somaArt:1},"art-dispara":{artificial:1,entradas:1,pesos:1,somaArt:1,disparo:1},"rede-entrada":{rede:1,camadasRede:1},"rede-ocultas":{rede:1,camadasRede:3},"rede-saida":{...Y},"rede-avanco":{...Y,avanco:1,mostrarSaida:1,acerto:.2},errado:{...Y,mostrarSaida:1,acerto:.2,mostrarErro:1,erroRede:.92},retro:{...Y,mostrarSaida:1,acerto:.2,mostrarErro:1,erroRede:.92,retro:1},ajusta:{...Y,mostrarSaida:1,acerto:.45,mostrarErro:1,erroRede:.55,retro:.6,ajuste:.5},epocas:{...Y,mostrarSaida:1,acerto:.92,mostrarErro:1,erroRede:.08,avanco:1,retro:.4,ajuste:1},demo:{demo:1},pixels:{ajuste:1,imagem:1},numeros:{ajuste:1,imagem:1,numeros:1},"pixels-entram":{...Y,ajuste:1,imagem:1,numeros:1,entrar:1,avanco:1},padroes:{...Y,ajuste:1,imagem:1,entrar:1,avanco:1,padroes:1,mostrarSaida:1,acerto:.92},dupla:{...Jo},"final-unido":{...Jo,unir:1},"app-1":{...Y,ajuste:1,avanco:1,app:1},"app-2":{...Y,ajuste:1,avanco:1,app:2},"app-3":{...Y,ajuste:1,avanco:1,app:3},"app-4":{...Y,ajuste:1,avanco:1,app:4},"app-5":{...Y,ajuste:1,avanco:1,app:5},"app-6":{...Y,ajuste:1,avanco:1,app:6},limites:{...Y,ajuste:.5,avanco:.5,mostrarSaida:1,acerto:.5}},H=so.dupla,D=so.exemplo,Ko=so.demo,Ge={"dupla-escuro":{pos:[H-.8,2,7.4],alvo:[H-2,1.6,0],fov:26},"dupla-crescer":{pos:[H-.6,2.4,9.6],alvo:[H-1.6,1.7,0],fov:28},dupla:{pos:[H-.1,2.6,13],alvo:[H-.1,1.75,0],fov:30},"dupla-org":{pos:[H-1.6,2.4,9.4],alvo:[H-1.6,1.75,0],fov:30},"dupla-maq":{pos:[H+1.8,2.4,9.4],alvo:[H+1.6,1.75,0],fov:30},"dupla-alto":{pos:[H,6.4,11.6],alvo:[H-.1,1.6,0],fov:30},"final-holofote":{pos:[H+.2,2.5,11.6],alvo:[H,1.7,0],fov:28},final:{pos:[H,3.6,15],alvo:[H,1.7,0],fov:30},neuronio:{pos:[1.2,3.2,14.2],alvo:[.6,1.5,0],fov:30},dendritos:{pos:[-1,2.4,8],alvo:[-1.4,1.7,0],fov:30},corpo:{pos:[-.2,2.4,7.4],alvo:[-.6,1.7,0],fov:30},axonio:{pos:[1.6,2.6,8.6],alvo:[1,1.6,0],fov:30},sinapse:{pos:[4.6,2.4,6.6],alvo:[3.7,1.66,0],fov:30},artificial:{pos:[-1,2.6,12.6],alvo:[-1.2,1.6,0],fov:30},"art-perto":{pos:[-2,2.3,9.8],alvo:[-2,1.65,0],fov:30},"art-saida":{pos:[-.4,2.3,9.6],alvo:[-.6,1.65,0],fov:30},rede:{pos:[D+.4,2.8,16],alvo:[D+.2,1.95,0],fov:30},"rede-entrada":{pos:[D-2.9,2.4,9.6],alvo:[D-3.3,1.95,0],fov:30},"rede-meio":{pos:[D-1.6,2.5,11],alvo:[D-1.9,1.95,0],fov:30},"rede-saida":{pos:[D+.2,2.4,10.4],alvo:[D-.3,1.95,0],fov:30},"rede-erro":{pos:[D+.4,2.8,15],alvo:[D-.4,1.9,0],fov:30},"rede-geral":{pos:[D-.6,3,15.4],alvo:[D-1,2,0],fov:30},pixels:{pos:[D-3.6,2,8.8],alvo:[D-3.2,1.4,0],fov:30},"pixels-rede":{pos:[D-.9,3.2,21],alvo:[D-.8,1.8,0],fov:30},padroes:{pos:[D+1,3.6,16],alvo:[D+1.6,2.6,0],fov:30},"app-a":{pos:[D-1,2.4,14.4],alvo:[D-1.2,1.95,0],fov:30},"app-b":{pos:[D+.2,2.8,14.2],alvo:[D-1,1.95,0],fov:30},"app-c":{pos:[D-2.2,3.2,14.4],alvo:[D-1.4,1.95,0],fov:30},demo:{pos:[Ko,2.3,9],alvo:[Ko,1.9,0],fov:30}};function co(n=1){let e=n>>>0;return()=>{e=e+1831565813>>>0;let o=e;return o=Math.imul(o^o>>>15,o|1),o^=o+Math.imul(o^o>>>7,o|61),((o^o>>>14)>>>0)/4294967296}}const Ue=n=>1/(1+Math.exp(-n));class We{constructor(e,{semente:o=1,taxa:t=.05,momento:a=.9,escala:r=2}={}){this.tamanhos=e,this.escala=r,this.taxa=t,this.momento=a;const c=co(o);this.W=[],this.b=[],this.vW=[],this.vb=[];for(let u=0;u<e.length-1;u++){const l=e[u],i=e[u+1],s=Math.sqrt(6/(l+i)),d=new Float64Array(l*i);for(let m=0;m<d.length;m++)d[m]=(c()*2-1)*s;this.W.push(d),this.b.push(new Float64Array(i)),this.vW.push(new Float64Array(l*i)),this.vb.push(new Float64Array(i))}this.a=e.map(u=>new Float64Array(u)),this.d=e.map(u=>new Float64Array(u)),this.gW=this.W.map(u=>new Float64Array(u.length)),this.gb=this.b.map(u=>new Float64Array(u.length))}prever(e,o){const t=this.a;t[0][0]=e*this.escala,t[0][1]=o*this.escala;const a=this.W.length;for(let r=0;r<a;r++){const c=this.tamanhos[r],u=this.tamanhos[r+1],l=this.W[r];for(let i=0;i<u;i++){let s=this.b[r][i];for(let d=0;d<c;d++)s+=l[i*c+d]*t[r][d];t[r+1][i]=r===a-1?Ue(s):Math.tanh(s)}}return t[a][0]}treinarLote(e,o){const t=this.W.length;for(const c of this.gW)c.fill(0);for(const c of this.gb)c.fill(0);let a=0;for(const c of o){const u=e[c],l=this.prever(u.x,u.y),i=u.classe;a+=-(i*Math.log(l+1e-9)+(1-i)*Math.log(1-l+1e-9)),this.d[t][0]=l-i;for(let s=t-1;s>=0;s--){const d=this.tamanhos[s],m=this.tamanhos[s+1],p=this.W[s];for(let w=0;w<m;w++){const f=this.d[s+1][w];this.gb[s][w]+=f;for(let b=0;b<d;b++)this.gW[s][w*d+b]+=f*this.a[s][b]}if(s>0)for(let w=0;w<d;w++){let f=0;for(let R=0;R<m;R++)f+=p[R*d+w]*this.d[s+1][R];const b=this.a[s][w];this.d[s][w]=f*(1-b*b)}}}const r=o.length;for(let c=0;c<t;c++){const u=this.W[c],l=this.vW[c];for(let i=0;i<u.length;i++)l[i]=this.momento*l[i]-this.taxa*this.gW[c][i]/r,u[i]+=l[i];for(let i=0;i<this.b[c].length;i++)this.vb[c][i]=this.momento*this.vb[c][i]-this.taxa*this.gb[c][i]/r,this.b[c][i]+=this.vb[c][i]}return a/r}erro(e){let o=0;for(const t of e){const a=this.prever(t.x,t.y);o+=-(t.classe*Math.log(a+1e-9)+(1-t.classe)*Math.log(1-a+1e-9))}return o/e.length}acuracia(e){let o=0;for(const t of e)this.prever(t.x,t.y)>.5==(t.classe===1)&&o++;return o/e.length}}function ke(n,e,o,t=10){const a=e.map((r,c)=>c);for(let r=a.length-1;r>0;r--){const c=Math.floor(o()*(r+1));[a[r],a[c]]=[a[c],a[r]]}for(let r=0;r<a.length;r+=t)n.treinarLote(e,a.slice(r,r+t))}function oe(n,e=!1){const o=n[0].index!==null,t=new Set(Object.keys(n[0].attributes)),a=new Set(Object.keys(n[0].morphAttributes)),r={},c={},u=n[0].morphTargetsRelative,l=new ve;let i=0;for(let s=0;s<n.length;++s){const d=n[s];let m=0;if(o!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+s+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const p in d.attributes){if(!t.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+s+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;r[p]===void 0&&(r[p]=[]),r[p].push(d.attributes[p]),m++}if(m!==t.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+s+". Make sure all geometries have the same number of attributes."),null;if(u!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+s+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const p in d.morphAttributes){if(!a.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+s+".  .morphAttributes must be consistent throughout all geometries."),null;c[p]===void 0&&(c[p]=[]),c[p].push(d.morphAttributes[p])}if(e){let p;if(o)p=d.index.count;else if(d.attributes.position!==void 0)p=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+s+". The geometry must have either an index or a position attribute"),null;l.addGroup(i,p,s),i+=p}}if(o){let s=0;const d=[];for(let m=0;m<n.length;++m){const p=n[m].index;for(let w=0;w<p.count;++w)d.push(p.getX(w)+s);s+=n[m].attributes.position.count}l.setIndex(d)}for(const s in r){const d=ee(r[s]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+s+" attribute."),null;l.setAttribute(s,d)}for(const s in c){const d=c[s][0].length;if(d===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[s]=[];for(let m=0;m<d;++m){const p=[];for(let f=0;f<c[s].length;++f)p.push(c[s][f][m]);const w=ee(p);if(!w)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+s+" morphAttribute."),null;l.morphAttributes[s].push(w)}}return l}function ee(n){let e,o,t,a=-1,r=0;for(let i=0;i<n.length;++i){const s=n[i];if(e===void 0&&(e=s.array.constructor),e!==s.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(o===void 0&&(o=s.itemSize),o!==s.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(t===void 0&&(t=s.normalized),t!==s.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(a===-1&&(a=s.gpuType),a!==s.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=s.count*o}const c=new e(r),u=new ge(c,o,t);let l=0;for(let i=0;i<n.length;++i){const s=n[i];if(s.isInterleavedBufferAttribute){const d=l/o;for(let m=0,p=s.count;m<p;m++)for(let w=0;w<o;w++){const f=s.getComponent(m,w);u.setComponent(m+d,w,f)}}else c.set(s.array,l);l+=s.count*o}return a!==void 0&&(u.gpuType=a),u}function $e(n,e=1e-4){e=Math.max(e,Number.EPSILON);const o={},t=n.getIndex(),a=n.getAttribute("position"),r=t?t.count:a.count;let c=0;const u=Object.keys(n.attributes),l={},i={},s=[],d=["getX","getY","getZ","getW"],m=["setX","setY","setZ","setW"];for(let y=0,_=u.length;y<_;y++){const T=u[y],E=n.attributes[T];l[T]=new E.constructor(new E.array.constructor(E.count*E.itemSize),E.itemSize,E.normalized);const P=n.morphAttributes[T];P&&(i[T]||(i[T]=[]),P.forEach((k,j)=>{const U=new k.array.constructor(k.count*k.itemSize);i[T][j]=new k.constructor(U,k.itemSize,k.normalized)}))}const p=e*.5,w=Math.log10(1/e),f=Math.pow(10,w),b=p*f;for(let y=0;y<r;y++){const _=t?t.getX(y):y;let T="";for(let E=0,P=u.length;E<P;E++){const k=u[E],j=n.getAttribute(k),U=j.itemSize;for(let B=0;B<U;B++)T+=`${~~(j[d[B]](_)*f+b)},`}if(T in o)s.push(o[T]);else{for(let E=0,P=u.length;E<P;E++){const k=u[E],j=n.getAttribute(k),U=n.morphAttributes[k],B=j.itemSize,W=l[k],G=i[k];for(let z=0;z<B;z++){const A=d[z],L=m[z];if(W[L](c,j[A](_)),U)for(let I=0,X=U.length;I<X;I++)G[I][L](c,U[I][A](_))}}o[T]=c,s.push(c),c++}}const R=n.clone();for(const y in n.attributes){const _=l[y];if(R.setAttribute(y,new _.constructor(_.array.slice(0,c*_.itemSize),_.itemSize,_.normalized)),y in i)for(let T=0;T<i[y].length;T++){const E=i[y][T];R.morphAttributes[y][T]=new E.constructor(E.array.slice(0,c*E.itemSize),E.itemSize,E.normalized)}}return R.setIndex(s),R}function Ro(n="#c06a46"){return new xe({color:new K(n),roughness:.72,metalness:0,sheen:1,sheenColor:new K("#f4b892"),sheenRoughness:.45,clearcoat:.05})}function $o(n,e=1,o=5){const t=$e(new be(n,o).deleteAttribute("uv").deleteAttribute("normal")),a=t.attributes.position,r=new g,c=co(e),u=[c()*3+2,c()*3+2,c()*3+2],l=[c()*6,c()*6,c()*6];for(let i=0;i<a.count;i++){r.fromBufferAttribute(a,i).normalize();const s=Math.sin(r.x*u[0]+l[0])*Math.sin(r.y*u[1]+l[1])*Math.sin(r.z*u[2]+l[2]);r.multiplyScalar(n*(1+s*.12)),a.setXYZ(i,r.x,r.y,r.z)}return t.computeVertexNormals(),t}function Ho(n,e,o,t=.25){const a=new g().lerpVectors(n,e,.5),r=n.distanceTo(e);a.add(new g((o()-.5)*r*t,(o()-.5)*r*t,(o()-.5)*r*t));const c=new g().lerpVectors(n,a,.5),u=new g().lerpVectors(a,e,.5);return new Go([n.clone(),c,a,u,e.clone()])}function Xo(n,e,o,t,a,r,c=[],u=3){const l=n.clone().addScaledVector(e,o),i=Ho(n,l,r,.35);if(c.push({curva:i,raio:t,nivel:a}),a<u){const s=a===0?3:2;for(let d=0;d<s;d++){const m=e.clone();m.applyAxisAngle(new g(0,0,1),(r()-.5)*1.3),m.applyAxisAngle(new g(0,1,0),(r()-.5)*1),m.normalize(),Xo(l,m,o*(.55+r()*.15),t*.62,a+1,r,c,u)}}return c}function bo(n,e,o=24){return new we(n,o,e,8,!1)}const Wo=new K("#2f4fd8"),Le=new K("#c8643b"),Ve=new K("#a8a196"),te=new K("#ece7de"),Fe=new K("#b8442b"),po=new re,To=new ce,ho=new g,zo=new g,So=new K,He=new g(0,1,0);var qo,Lo;class Yo{constructor({materiais:e,camadas:o,espacoX:t=1.6,espacoY:a=.55,raio:r=.15,maxPulsos:c=18}){Uo(this,qo);this.group=new no,this.materiais=e,this.espacoX=t,this.espacoY=a,this.raio=r,this.matNo=e.ceramica(),this.matNo.clearcoat=.6,this.matNo.roughness=.35,this.matCabo=e.ceramica(),this.matCabo.roughness=.5,this.matPulso=new wo({color:16777215}),this.geoNo=new to(1,32,20),this.geoCabo=new Eo(1,1,1,10,1,!0),this.geoPulso=new to(1,16,12),this.maxPulsos=c,this.pulsos=[],this.tempo=0,this.construir(o)}construir(e){this.descartarMalhas(),this.camadas=e;const o=[],t=e.length;e.forEach((c,u)=>{const l=(u-(t-1)/2)*this.espacoX;for(let i=0;i<c;i++)o.push({l:u,i,pos:new g(l,(i-(c-1)/2)*this.espacoY,0),ativ:0})}),this.nos=o,this.indice=[];let a=0;e.forEach((c,u)=>{this.indice[u]=[];for(let l=0;l<c;l++)this.indice[u][l]=a++});const r=[];for(let c=0;c<t-1;c++)for(let u=0;u<e[c+1];u++)for(let l=0;l<e[c];l++)r.push({l:c,i:l,j:u,a:this.indice[c][l],b:this.indice[c+1][u],peso:.3,alvo:.3});this.conex=r,this.malhaNos=new No(this.geoNo,this.matNo,o.length),this.malhaNos.castShadow=!0,this.malhaCabos=new No(this.geoCabo,this.matCabo,Math.max(1,r.length)),this.malhaCabos.castShadow=!0,this.malhaPulsos=new No(this.geoPulso,this.matPulso,this.maxPulsos);for(const c of[this.malhaNos,this.malhaCabos,this.malhaPulsos])c.instanceColor=new ie(new Float32Array(c.count*3),3),c.frustumCulled=!1;this.group.add(this.malhaCabos,this.malhaNos,this.malhaPulsos),this.pulsos=[],this.atualizar(1)}descartarMalhas(){for(const e of[this.malhaNos,this.malhaCabos,this.malhaPulsos])e&&(this.group.remove(e),e.dispose())}definirPesos(e){for(const o of this.conex){const t=this.camadas[o.l];o.alvo=e?e[o.l][o.j*t+o.i]:o.alvo}}pesosAleatorios(e,o=1){for(const t of this.conex)t.alvo=(e()*2-1)*o}posicaoNo(e,o){return this.nos[this.indice[e][o]].pos}atualizar(e,{ativ:o=null,presenca:t=1,montar:a=1,camadasVisiveis:r=99,suavizar:c=8}={}){const u=1-Math.exp(-e*c);this.nos.forEach((i,s)=>{const d=Math.max(0,Math.min(1,r-i.l)),m=o?o(i.l,i.i):0;i.ativ+=(m-i.ativ)*u;const p=this.raio*t*d*a;ho.copy(i.pos),po.compose(ho,To.identity(),zo.setScalar(Math.max(1e-4,p))),this.malhaNos.setMatrixAt(s,po),So.copy(te).lerp(Wo,Math.min(1,i.ativ)),this.malhaNos.setColorAt(s,So)});let l=1e-4;for(const i of this.conex)i.peso+=(i.alvo-i.peso)*u,l=Math.max(l,Math.abs(i.peso));this.conex.forEach((i,s)=>{const d=this.nos[i.a].pos,m=this.nos[i.b].pos,p=Math.max(0,Math.min(1,r-i.l-1)),w=Math.min(1,Math.abs(i.peso)/Math.max(1.2,l*.8)),f=(.006+w*.03)*t*p*a;ho.subVectors(m,d);const b=ho.length();To.setFromUnitVectors(He,ho.normalize()),po.compose(zo.addVectors(d,m).multiplyScalar(.5),To,new g(Math.max(1e-4,f),b,Math.max(1e-4,f))),this.malhaCabos.setMatrixAt(s,po),So.copy(Ve).lerp(i.peso>=0?Wo:Le,.25+w*.75),this.malhaCabos.setColorAt(s,So)}),this.malhaNos.instanceMatrix.needsUpdate=!0,this.malhaNos.instanceColor.needsUpdate=!0,this.malhaCabos.instanceMatrix.needsUpdate=!0,this.malhaCabos.instanceColor.needsUpdate=!0}pulsar(e,{avanco:o=0,retro:t=0,velocidade:a=1.3,presenca:r=1}={}){this.tempo+=e;const c=this.camadas.length,u=Math.round(o*this.maxPulsos*.6),l=Math.round(t*this.maxPulsos*.6),i=this.pulsos.filter(d=>d.t<c-1),s=d=>i.filter(m=>m.sentido===d).length;s(1)<u&&Math.random()<e*6&&i.push(mo(this,qo,Lo).call(this,1)),s(-1)<l&&Math.random()<e*6&&i.push(mo(this,qo,Lo).call(this,-1)),this.pulsos=i;for(let d=0;d<this.maxPulsos;d++){const m=this.pulsos[d];if(!m||r<.01){po.compose(ho.set(0,-50,0),To.identity(),zo.setScalar(1e-4)),this.malhaPulsos.setMatrixAt(d,po);continue}m.t+=e*a;const p=Math.min(c-2,Math.floor(m.t)),w=m.t-p,f=m.sentido>0?p:c-1-p,b=m.sentido>0?p+1:c-2-p,R=this.posicaoNo(f,m.caminho[f]),y=this.posicaoNo(b,m.caminho[b]);ho.lerpVectors(R,y,Math.min(1,w));const _=.055*r*Math.sin(Math.min(1,m.t/(c-1))*Math.PI)**.3;po.compose(ho,To.identity(),zo.setScalar(Math.max(1e-4,_))),this.malhaPulsos.setMatrixAt(d,po),this.malhaPulsos.setColorAt(d,m.sentido>0?So.copy(Wo).lerp(te,.55):So.copy(Fe))}this.malhaPulsos.instanceMatrix.needsUpdate=!0,this.malhaPulsos.instanceColor&&(this.malhaPulsos.instanceColor.needsUpdate=!0)}dispose(){this.descartarMalhas(),this.geoNo.dispose(),this.geoCabo.dispose(),this.geoPulso.dispose()}}qo=new WeakSet,Lo=function(e){return{sentido:e,t:0,caminho:this.camadas.map(o=>Math.floor(Math.random()*o))}};const Vo=n=>Math.max(0,Math.min(1,n)),ko=n=>{const e=Vo(n);return e*e*(3-2*e)};function Xe({materiais:n,P:e}){const o=new no,t=co(5),a=Ro(),r=new no;o.add(r);const c=[new g(-3,1.55,.1),new g(-2.2,2.35,-.3),new g(-2,1,.35),new g(-1.2,1.9,0),new g(-.9,.85,-.4),new g(-.35,2.55,.25),new g(-.2,1.5,.15)],u=[[0,1],[0,2],[1,3],[2,3],[2,4],[3,5],[3,6],[4,6],[5,6]],l=[],i=c.map((j,U)=>{const B=new S($o(.2+t()*.07,30+U,4),a);return B.position.copy(j),B.castShadow=!0,r.add(B),B}),s=[0,1,1,2,2,3,3],d=u.map(([j,U],B)=>{const W=Ho(c[j],c[U],t,.45),G=bo(W,.038,40),z=new S(G,a);z.castShadow=!0,r.add(z);const A=Math.max(s[j],s[U])-.5+B*.02;return l.push({m:z,onda:A,total:G.index.count}),{curva:W,a:j,b:U}});c.forEach((j,U)=>{for(let W=0;W<3;W++){const G=new g(t()-.5,t()-.5,t()-.5).normalize(),z=Xo(j.clone().addScaledVector(G,.18),G,.35,.022,1,t,[],2);for(const A of z){const L=bo(A.curva,A.raio,10),I=new S(L,a);r.add(I),l.push({m:I,onda:s[U]+.3+A.nivel*.15,total:L.index.count})}}});const m=[d[1],d[3],d[6]],p=new wo({color:"#ffe2c4"}),w=new S(new to(.07,18,12),p);r.add(w);const f=new S(new to(.2,18,12),new wo({color:"#ffb27a",transparent:!0,opacity:.09,depthWrite:!1}));w.add(f);const b=new Yo({materiais:n,camadas:[3,4,4,3],espacoX:.8,espacoY:.52,raio:.13,maxPulsos:10});b.group.position.set(1.7,1.7,0),b.pesosAleatorios(co(8),1.2),o.add(b.group);const R=c[6].clone(),y=new g(1.7-1.2,1.7,0),_=new Go([R,R.clone().lerp(y,.5).add(new g(0,.25,.1)),y]),T=bo(_,.04,40),E=new S(T,n.aluminio());o.add(E);let P=0;function k(j){P+=j;const B=Vo(e.crescer)*4.2;i.forEach((I,X)=>{const lo=ko(B-s[X]+(X===0?1:0));I.scale.setScalar(Math.max(.001,lo)),I.visible=lo>.01});for(const I of l){const X=Vo((B-I.onda)/.9);I.m.visible=X>.005,I.m.geometry.setDrawRange(0,Math.floor(I.total*X/3)*3)}const W=ko(e.unir);r.position.x=W*.55,b.group.position.x=1.7-W*.55;const G=P*.35%1,z=Math.min(2,Math.floor(G*3)),A=G*3-z;m[z].curva.getPoint(A,w.position),w.visible=e.pulsoDupla>.5,f.visible=e.crescer<.6,E.visible=W>.01,T.setDrawRange(0,Math.floor(T.index.count*W/3)*3);const L=ko(e.maquina);b.group.visible=L>.01,b.atualizar(j,{presenca:L,ativ:I=>e.pulsoDupla>.5?.15+.25*Math.max(0,Math.sin(P*2-I)):0}),b.pulsar(j,{avanco:L*e.pulsoDupla,presenca:L})}return{group:o,atualizar:k,geo:b}}const fo={x:[.8,.2,.5],w:[.9,-.4,.6],b:.1},le=fo.x.reduce((n,e,o)=>n+e*fo.w[o],fo.b),ae=1/(1+Math.exp(-le)),Co=(n,e=1)=>n.toFixed(e).replace(".",",").replace("-","−"),Bo=n=>Math.max(0,Math.min(1,n)),Ye=n=>{const e=Bo(n);return e*e*(3-2*e)};function Pe({materiais:n,annotations:e,P:o}){const t=new no,a=co(21),r=Ro(),c=Ro("#d99a74"),u=new g(0,1.65,0),l=new S(new Do(8.2,.22,2,3,.05),n.ceramicaCinza());l.position.set(.9,.11,0),l.castShadow=l.receiveShadow=!0,t.add(l);const i=n.aluminio();for(const x of[0,3.1]){const M=new S(new Eo(.018,.018,1.35,12),i);M.position.set(x,.22+.67,0),M.castShadow=!0,t.add(M)}const s=new no;s.position.copy(u),t.add(s);const d=new S($o(.5,4),r);d.castShadow=!0,s.add(d);const m=[],p=[];for(let x=0;x<5;x++){const M=Math.PI+(x-2)*.42+(a()-.5)*.2,V=new g(Math.cos(M),Math.sin(M),(a()-.5)*.7).normalize(),J=V.clone().multiplyScalar(.42),$=Xo(J,V,.95,.075,0,a,[],2);p.push($[0].curva),m.push(...$)}const w=oe(m.map(x=>bo(x.curva,x.raio,16))),f=new S(w,r);f.castShadow=!0,s.add(f);const b=new Go([new g(.45,-.02,0),new g(1.3,-.1,.06),new g(2.3,.04,-.06),new g(3.3,-.04,0),new g(3.8,.02,0)]),R=new S(bo(b,.065,60),r);R.castShadow=!0,s.add(R);for(let x=0;x<4;x++){const M=.22+x*.17,V=b.getPointAt(M),J=b.getTangentAt(M),$=new S(new Me(.12,.34,6,16),c);$.position.copy(V),$.quaternion.setFromUnitVectors(new g(0,1,0),J),$.castShadow=!0,s.add($)}const y=b.getPointAt(1),_=[],T=[];for(let x=0;x<4;x++){const M=(x-1.5)*.42,V=y.clone().add(new g(Math.cos(M)*.55,Math.sin(M)*.55,(a()-.5)*.3)),J=Ho(y,V,a,.3);T.push(bo(J,.03,12));const $=new S(new to(.075,20,14),r);$.position.copy(V),$.castShadow=!0,s.add($),_.push({curva:J,ponta:V})}s.add(new S(oe(T),r));const E=_[2].ponta.clone().add(new g(.2,0,0)),P=new Go([E,E.clone().add(new g(.5,.25,0)),E.clone().add(new g(1,.25,.1))]),k=new S(bo(P,.045,16),Ro("#b5603f"));k.castShadow=!0,s.add(k);const j=new S($o(.22,9,4),Ro("#b5603f"));j.position.copy(E).add(new g(1.15,.25,.1)),s.add(j);const U=new wo({color:"#fff0dc"}),B=new to(.06,16,12),W=p.map((x,M)=>({m:new S(B,U),c:x,fase:M/p.length}));W.forEach(x=>s.add(x.m));const G=new S(B,U);s.add(G);const z=[];for(let x=0;x<6;x++){const M=new S(new to(.022,10,8),new wo({color:"#f0b080"}));s.add(M),z.push({m:M,fase:x/6,dy:(x%3-1)*.04})}const A=new no;A.position.copy(u),t.add(A);const L=n.ceramica();L.clearcoat=.7,L.roughness=.3;const I=new S(new to(.42,48,32),L);I.castShadow=!0,A.add(I);const X=new S(new ye(.56,.018,12,80),i);A.add(X);const lo=new K("#2f4fd8"),_o=new K("#ece7de"),Mo=fo.x.map((x,M)=>{const V=new g(-3,(1-M)*.95,0),J=new S(new to(.17,32,20),n.ceramica());J.position.copy(V),J.castShadow=!0,A.add(J);const $=fo.w[M],vo=new g().subVectors(new g,V),go=vo.length()-.42,O=new S(new Eo(1,1,1,12),$>=0?n.acento("#2f4fd8"):n.acento("#c8643b"));return O.scale.set(.012+Math.abs($)*.035,go,.012+Math.abs($)*.035),O.position.copy(V).addScaledVector(vo.clone().normalize(),go/2),O.quaternion.setFromUnitVectors(new g(0,1,0),vo.clone().normalize()),O.castShadow=!0,A.add(O),{pos:V,no:J,cabo:O,w:$}}),h=new g(-1.1,1.25,0),v=new S(new to(.1,24,16),n.ceramica());v.position.copy(h),A.add(v);const C=new S(new Eo(.008,.008,1,8),i);{const x=h.clone().negate();C.scale.y=x.length()-.42,C.position.copy(h).addScaledVector(x.clone().normalize(),C.scale.y/2),C.quaternion.setFromUnitVectors(new g(0,1,0),x.normalize())}A.add(C);const F=new g(2.7,0,0),Z=new S(new to(.2,32,20),n.ceramica());Z.position.copy(F),A.add(Z);const Q=new S(new Eo(.03,.03,2.08,12),i);Q.rotation.z=Math.PI/2,Q.position.set(1.52,0,0),A.add(Q);const oo=new wo({color:"#dfe4fb"}),yo=Mo.map(()=>new S(B,oo));yo.forEach(x=>A.add(x));const Ao=new S(B,oo);A.add(Ao),A.traverse(x=>{x.isMesh&&(x.castShadow=!0)});const eo=(x,M)=>{const V=new g;return()=>V.copy(M).applyMatrix4(x.matrixWorld)},q=x=>()=>Bo(x())*o.presenca;e.rotulo({ancora:eo(s,p[1].getPoint(.7)),texto:"Dendritos: recebem sinais",direcao:[-.3,-1],comprimento:9,visivel:q(()=>o.rotDendritos*(1-o.artificial))}),e.rotulo({ancora:eo(s,new g(0,.45,0)),texto:"Corpo celular: junta os estímulos",direcao:[.3,-1],comprimento:7,visivel:q(()=>o.rotSoma*(1-o.artificial))}),e.rotulo({ancora:eo(s,b.getPointAt(.45)),texto:"Axônio: leva o sinal adiante",direcao:[.2,1],comprimento:7,visivel:q(()=>o.rotAxonio*(1-o.artificial))}),e.rotulo({ancora:eo(s,_[2].ponta.clone().add(new g(.1,0,0))),texto:"Sinapse: passa para o próximo neurônio",direcao:[.2,-1],comprimento:8,visivel:q(()=>o.rotSinapse*(1-o.artificial))}),Mo.forEach((x,M)=>{e.rotulo({ancora:eo(A,x.pos),texto:`x${"₁₂₃"[M]} = ${Co(fo.x[M])}`,direcao:[-1,0],comprimento:3,visivel:q(()=>o.entradas*o.artificial)}),e.rotulo({ancora:eo(A,x.pos.clone().multiplyScalar(.45)),texto:`w${"₁₂₃"[M]} = ${Co(fo.w[M])}`,direcao:[.15,M===2?1:-1],comprimento:4,visivel:q(()=>o.pesos*o.artificial)})}),e.rotulo({ancora:eo(A,h),texto:`viés b = ${Co(fo.b)}`,direcao:[-.4,-1],comprimento:3,visivel:q(()=>o.somaArt*o.artificial)}),e.rotulo({ancora:eo(A,new g(0,.45,0)),texto:`Σ = ${Co(le,2)}`,direcao:[.3,-1],comprimento:7,visivel:q(()=>o.somaArt*o.artificial)}),e.rotulo({ancora:eo(A,new g(.4,-.4,0)),texto:`ativação (sigmoide): ${Co(ae,2)}`,direcao:[.4,1],comprimento:6,visivel:q(()=>o.disparo*o.artificial)}),e.rotulo({ancora:eo(A,F),texto:`saída y = ${Co(ae,2)}`,direcao:[.5,-1],comprimento:5,visivel:q(()=>o.disparo*o.artificial)});let N=0;function uo(x){N+=x;const M=Ye(o.artificial),V=Math.max(.001,1-M);s.scale.setScalar(V),s.visible=V>.01,s.rotation.y=M*.8;const J=Math.max(.001,M);A.scale.setScalar(J),A.visible=M>.01;const $=N*.45%1;W.forEach(O=>{const ro=($+O.fase*.15)%1,he=Math.min(1,ro/.45);O.c.getPoint(1-he,O.m.position),O.m.visible=o.pulsoBio>.5&&ro<.45});const vo=($-.45)/.45;G.visible=o.pulsoBio>.5&&o.rotAxonio>.5&&vo>0&&vo<1,G.visible&&b.getPointAt(Math.min(1,vo),G.position),z.forEach(O=>{const ro=(N*.8+O.fase)%1;O.m.position.lerpVectors(_[2].ponta,E,ro),O.m.position.y+=O.dy*Math.sin(ro*Math.PI),O.m.visible=o.sinapse>.5});const go=N*.6%1;yo.forEach((O,ro)=>{O.position.lerpVectors(Mo[ro].pos,new g,Math.min(1,go/.6)),O.visible=o.entradas>.5&&go<.6&&M>.5}),Ao.visible=o.disparo>.5&&go>.6&&M>.5,Ao.visible&&Ao.position.lerpVectors(new g(.45,0,0),F,(go-.6)/.4),I.material.color.copy(_o).lerp(lo,Bo(o.disparo)*.85),Z.material.color.copy(_o).lerp(lo,Bo(o.disparo)*.85),X.visible=o.disparo>.02,X.scale.setScalar(Math.max(.001,o.disparo)),X.rotation.z=N*.3,Mo.forEach(O=>{O.cabo.visible=o.pesos>.02||o.entradas>.02;const ro=Math.max(.15,o.pesos);O.cabo.scale.x=O.cabo.scale.z=(.012+Math.abs(O.w)*.035)*ro}),v.visible=C.visible=o.somaArt>.02}return{group:t,atualizar:uo}}const io=n=>Math.max(0,Math.min(1,n)),xo=n=>{const e=io(n);return e*e*(3-2*e)},Qe=["............",".#........#.",".##......##.",".###....###.",".##########.","############","###..##..###","############","#####..#####",".####..####.","..########..","....####...."],Oo=Qe.map((n,e)=>[...n].map((o,t)=>o==="#"?.88+(t*7+e*3)%10/100:.04+(t+e*5)%6/100)),Ze=[null,["texto que você digitou","próxima palavra provável"],["frase em inglês","frase em português"],["foto do rosto","é o dono do celular?"],["o que você já assistiu","o que sugerir depois"],["câmera do carro","faixa, pedestre, placa"],["exame de imagem","região para o médico revisar"]];function jo(n,e=512){const o=document.createElement("canvas");o.width=o.height=e;const t=o.getContext("2d"),a=new Ae(o);a.colorSpace=Se,a.anisotropy=8;const r=()=>{t.fillStyle="#f6f3ed",t.fillRect(0,0,e,e),t.strokeStyle="rgba(25,23,20,0.25)",t.lineWidth=4,t.strokeRect(4,4,e-8,e-8),n(t,e),a.needsUpdate=!0};return r(),document.fonts?.ready.then(r),a}const Je='"Instrument Sans", sans-serif',Ke='"Instrument Serif", serif',ot='"Cascadia Mono", Consolas, monospace',Io=(n,e,o,t)=>{n.fillStyle="#191714",n.font=`400 ${o*.13}px ${Ke}`,n.fillText(e,o*.08,o*.17),n.fillStyle="#6e685f",n.font=`500 ${o*.055}px ${Je}`,n.fillText(t,o*.08,o*.26)};function et({materiais:n,annotations:e,P:o}){const t=new no,a=new Yo({materiais:n,camadas:[6,5,4,2],espacoX:1.7,espacoY:.55,raio:.16,maxPulsos:22}),r=1.95;a.group.position.set(0,r,0),t.add(a.group),a.pesosAleatorios(co(4),.7);const c=a.conex.map(h=>h.alvo);a.pesosAleatorios(co(9),1.6);const u=a.conex.map(h=>h.alvo),l=new no;l.position.set(1.7*1.5+1.25,r-.9,0),t.add(l);const i=n.aluminio(),s=new S(new Do(.5,.08,.5,2,.02),i);l.add(s);for(const h of[-.17,.17]){const v=new S(new Eo(.012,.012,1.85,8),i);v.position.set(h,.95,0),l.add(v)}const d=new S(new Do(.24,1,.24,2,.03),n.acento("#b8442b"));l.add(d),l.traverse(h=>{h.isMesh&&(h.castShadow=!0)});const m=new no;m.position.set(-1.7*1.5-2.3,r,0),m.rotation.y=.18,t.add(m);const p=12,w=.15,f=new No(new Do(.135,.135,1,2,.015),n.ceramica(),p*p);f.instanceColor=new ie(new Float32Array(p*p*3),3),f.castShadow=!0,m.add(f);const b=new K("#f3efe8"),R=new K("#1d1b18"),y=new K;for(let h=0;h<p;h++)for(let v=0;v<p;v++)f.setColorAt(h*p+v,y.copy(b).lerp(R,Oo[h][v]));const _=jo((h,v)=>{Io(h,"Em números",v,"canto superior esquerdo da foto"),h.font=`500 ${v*.062}px ${ot}`;for(let C=0;C<5;C++)for(let F=0;F<5;F++){const Z=Oo[C][F];h.fillStyle=Z>.5?"#2f4fd8":"#6e685f",h.fillText(Z.toFixed(1).replace(".",","),v*(.08+F*.17),v*(.4+C*.12))}}),T=new S(new Qo(1.1,1.1),n.impresso(_));T.position.set(0,-1.65,.35),T.castShadow=!0,m.add(T);const E=new wo({color:"#c9d1f5"}),P=Array.from({length:6},(h,v)=>{const C=new S(new to(.05,14,10),E);return t.add(C),{m:C,fase:v/6}}),k=jo((h,v)=>{Io(h,"Bordas",v,"primeiras camadas"),h.strokeStyle="#191714",h.lineWidth=v*.02,h.lineCap="round";for(let C=0;C<6;C++){const F=v*(.15+C%3*.27),Z=v*(.45+Math.floor(C/3)*.26),Q=C*.7%Math.PI;h.beginPath(),h.moveTo(F,Z),h.lineTo(F+Math.cos(Q)*v*.16,Z+Math.sin(Q)*v*.16),h.stroke()}}),j=jo((h,v)=>{Io(h,"Formas",v,"camadas do meio"),h.strokeStyle="#191714",h.lineWidth=v*.018,h.beginPath(),h.moveTo(v*.15,v*.75),h.lineTo(v*.27,v*.45),h.lineTo(v*.39,v*.75),h.closePath(),h.stroke(),h.beginPath(),h.arc(v*.66,v*.58,v*.13,0,Math.PI*2),h.stroke(),h.beginPath(),h.ellipse(v*.5,v*.86,v*.12,v*.05,0,0,Math.PI*2),h.stroke()}),U=jo((h,v)=>{Io(h,"Objetos",v,"camadas finais");const C=v*.045,F=v*.23,Z=v*.33;for(let Q=0;Q<12;Q++)for(let oo=0;oo<12;oo++)h.fillStyle=Oo[Q][oo]>.5?"#2f4fd8":"rgba(25,23,20,0.06)",h.fillRect(F+oo*C,Z+Q*C,C-2,C-2)}),B=[[k,-.85],[j,.85],[U,2.55]].map(([h,v])=>{const C=new S(new Qo(1.05,1.05),n.impresso(h));return C.position.set(v,r+2.05,0),C.castShadow=!0,t.add(C),C}),W=h=>{const v=new g;return()=>v.copy(h()).applyMatrix4(a.group.matrixWorld)},G=h=>()=>io(h())*o.presenca,z=()=>Ze[Math.round(o.app)];e.rotulo({ancora:W(()=>a.posicaoNo(0,0)),texto:()=>z()?`entrada: ${z()[0]}`:"entrada: os pixels da foto",direcao:[-.4,-1],comprimento:5,visivel:G(()=>o.rede*Math.min(1,o.camadasRede)*(o.imagem>.5?0:1))}),e.rotulo({ancora:W(()=>a.posicaoNo(3,0)),texto:"gato",direcao:[1,-.3],comprimento:3,visivel:G(()=>o.rede*io(o.camadasRede-3)*(z()?0:1))}),e.rotulo({ancora:W(()=>a.posicaoNo(3,1)),texto:"cachorro",direcao:[1,.3],comprimento:3,visivel:G(()=>o.rede*io(o.camadasRede-3)*(z()?0:1))}),e.rotulo({ancora:W(()=>a.posicaoNo(3,0)),texto:()=>z()?`saída: ${z()[1]}`:"",direcao:[1,-.6],comprimento:4,visivel:G(()=>z()?o.rede:0)}),e.rotulo({ancora:W(()=>a.posicaoNo(1,0)),texto:"camadas ocultas",direcao:[.6,-1],comprimento:4,visivel:G(()=>o.rede*io(o.camadasRede-1.5)*(1-o.padroes)*(z()?0:1))});const A=new g;e.rotulo({ancora:()=>A.set(0,.15+Math.max(.05,o.erroRede)*1.75,0).applyMatrix4(l.matrixWorld),texto:()=>`erro: ${o.erroRede.toFixed(2).replace(".",",")}`,direcao:[1,-.4],comprimento:3,visivel:G(()=>o.mostrarErro)}),e.rotulo({ancora:()=>A.set(0,.95,.1).applyMatrix4(m.matrixWorld),texto:"cada pixel vira um número de 0 a 1",direcao:[.3,-1],comprimento:5,visivel:G(()=>o.numeros*(1-o.entrar))});let L=0;const I=new re,X=new g,lo=new g,_o=new ce;function Mo(h){L+=h;const v=xo(o.rede);a.group.visible=v>.01;const C=xo(o.ajuste);a.conex.forEach((q,N)=>q.alvo=c[N]+(u[N]-c[N])*C);const F=io(o.acerto),Z=io(o.mostrarSaida);a.atualizar(h,{presenca:v,camadasVisiveis:o.camadasRede,ativ:(q,N)=>q===3?Z*(N===0?F:1-F):o.avanco*(.2+.5*Math.max(0,Math.sin(L*2.2-q*.9+N)))}),a.pulsar(h,{avanco:o.avanco,retro:o.retro,presenca:v}),l.visible=o.mostrarErro>.01,l.scale.setScalar(Math.max(.001,xo(o.mostrarErro)));const Q=Math.max(.05,o.erroRede)*1.75;d.scale.y=Q,d.position.y=.08+Q/2;const oo=xo(o.imagem);m.visible=oo>.01;const yo=xo(o.numeros);for(let q=0;q<p;q++)for(let N=0;N<p;N++){const uo=Oo[q][N],x=.05+yo*uo*.6;X.set((N-(p-1)/2)*w,((p-1)/2-q)*w,x/2),lo.set(oo,oo,x*oo),I.compose(X,_o,lo),f.setMatrixAt(q*p+N,I)}f.instanceMatrix.needsUpdate=!0,f.instanceColor&&(f.instanceColor.needsUpdate=!0),T.visible=yo>.01,T.scale.setScalar(Math.max(.001,yo));const Ao=io(o.entrar);P.forEach((q,N)=>{const uo=(L*.5+q.fase)%1,x=new g((N%3-1)*.5,(1-Math.floor(N/3)*2)*.4,.4).applyMatrix4(m.matrixWorld),M=a.posicaoNo(0,N).clone().applyMatrix4(a.group.matrixWorld);q.m.position.lerpVectors(x,M,uo),q.m.visible=Ao>.5});const eo=xo(o.padroes);B.forEach((q,N)=>{const uo=xo(io(eo*3-N));q.visible=uo>.01,q.scale.setScalar(Math.max(.001,uo))})}return{group:t,atualizar:Mo,rede:a}}const de={espiral:"Espiral",circulos:"Círculos",xor:"XOR",grupos:"Dois grupos"};function tt(n,{n:e=200,semente:o=7,ruido:t=.06}={}){const a=co(o),r=()=>{const u=Math.max(1e-9,a()),l=a();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*l)},c=[];for(let u=0;u<e;u++){const l=u%2;let i,s;if(n==="espiral"){const d=(u>>1)/(e/2),m=.08+d*.85,p=d*2.6*Math.PI+l*Math.PI;i=m*Math.cos(p)+r()*t*.6,s=m*Math.sin(p)+r()*t*.6}else if(n==="circulos"){const d=a()*Math.PI*2,m=l===1?a()*.38:.62+a()*.3;i=m*Math.cos(d)+r()*t*.5,s=m*Math.sin(d)+r()*t*.5}else if(n==="xor"){i=a()*1.8-.9,s=a()*1.8-.9;const d=.08;Math.abs(i)<d&&(i+=Math.sign(i||1)*d),Math.abs(s)<d&&(s+=Math.sign(s||1)*d),c.push({x:i,y:s,classe:i*s>0?1:0});continue}else{const d=l===1?.45:-.45;i=d+r()*.18,s=d*.6+r()*.18}c.push({x:Math.max(-1,Math.min(1,i)),y:Math.max(-1,Math.min(1,s)),classe:l})}return c}const at=[200,100,59],st=[47,79,216],nt=[236,196,172],rt=[190,200,240],se=[240,236,229],it=2,ne=(n,e,o)=>n.map((t,a)=>Math.round(t+(e[a]-t)*o)),ct=(n,e=2)=>n.toFixed(e).replace(".",",");function lt(n={}){const e=(o,t)=>n[o]!=null&&n[o]!==""?Number(n[o]):t;return{dados:String(n["demo-dados"]||"espiral").split(",").map(o=>o.trim()).filter(o=>de[o]),ocultas:Math.max(1,Math.min(3,e("demo-ocultas",1))),neuronios:Math.max(1,Math.min(8,e("demo-neuronios",2))),taxa:e("demo-taxa",.03),epocas:e("demo-epocas",400),treinar:String(n["demo-treinar"]||"sim")!=="nao",semente:e("demo-semente",3)}}var ao,Fo,ue,me,pe;class dt{constructor(e){Uo(this,ao);const o=document.createElement("aside");o.className="demo-painel",o.setAttribute("aria-label","Demonstração: rede neural aprendendo"),o.innerHTML=`
      <div class="demo-cabeca">
        <span class="demo-dados"></span>
        <span class="demo-arq"></span>
      </div>
      <canvas class="demo-mapa"></canvas>
      <div class="demo-numeros">
        <div><span>Época</span><b class="demo-epoca">0</b></div>
        <div><span>Erro</span><b class="demo-erro">–</b></div>
        <div><span>Acertos</span><b class="demo-acerto">–</b></div>
      </div>
      <canvas class="demo-grafico"></canvas>`,e.appendChild(o),this.el=o,this.mapa=o.querySelector(".demo-mapa"),this.grafico=o.querySelector(".demo-grafico"),this.txtDados=o.querySelector(".demo-dados"),this.txtArq=o.querySelector(".demo-arq"),this.txtEpoca=o.querySelector(".demo-epoca"),this.txtErro=o.querySelector(".demo-erro"),this.txtAcerto=o.querySelector(".demo-acerto"),this.peq=document.createElement("canvas"),this.peq.width=this.peq.height=56,this.ativo=!1,this.quadro=0,this.chave=""}iniciar(e){this.cfg=e,this.indiceDados=0,mo(this,ao,Fo).call(this),this.ativo=!0}parar(){this.ativo=!1}passo(){if(!this.ativo||!this.cfg)return;this.quadro++;const e=this.cfg;if(e.treinar&&this.epoca<e.epocas){for(let o=0;o<it&&this.epoca<e.epocas;o++)ke(this.rede,this.pontos,this.rnd),this.epoca++,this.historico.push(this.rede.erro(this.pontos));(this.quadro%2===0||this.epoca>=e.epocas)&&this.desenharTudo()}else e.treinar&&e.dados.length>1&&(this.espera++,this.espera>70&&(this.indiceDados=(this.indiceDados+1)%e.dados.length,mo(this,ao,Fo).call(this)))}desenharTudo(){mo(this,ao,ue).call(this),mo(this,ao,me).call(this),mo(this,ao,pe).call(this);const e=this.historico[this.historico.length-1];this.txtEpoca.textContent=String(this.epoca),this.txtErro.textContent=this.cfg.treinar?ct(e):"–",this.txtAcerto.textContent=this.cfg.treinar?`${Math.round(this.rede.acuracia(this.pontos)*100)}%`:"–"}mostrar(e){this.el.style.opacity=String(e),this.el.style.visibility=e>.01?"visible":"hidden",this.el.style.transform=`translateY(-50%) translateY(${(1-e)*24}px)`}dispose(){this.el.remove()}}ao=new WeakSet,Fo=function(){const e=this.cfg,o=e.dados[this.indiceDados]||"espiral";this.tipo=o,this.pontos=tt(o);const t=[2,...Array(e.ocultas).fill(e.neuronios),1];this.rede=new We(t,{semente:e.semente,taxa:e.taxa}),this.rnd=co(11),this.epoca=0,this.historico=[this.rede.erro(this.pontos)],this.espera=0,this.txtDados.textContent=de[o];const a=(r,c,u)=>`${r} ${r===1?c:u}`;this.txtArq.textContent=`${a(e.ocultas,"camada oculta","camadas ocultas")} · ${a(e.neuronios,"neurônio","neurônios")} em cada`,this.desenharTudo()},ue=function(){const e=Math.min(2,window.devicePixelRatio||1);for(const o of[this.mapa,this.grafico]){const t=Math.round(o.clientWidth*e),a=Math.round(o.clientHeight*e);t&&a&&(o.width!==t||o.height!==a)&&(o.width=t,o.height=a)}},me=function(){const e=this.mapa,o=e.getContext("2d"),t=e.width,a=e.height;if(!t||!a)return;const r=this.peq,c=r.getContext("2d"),u=c.createImageData(r.width,r.height),l=this.cfg.treinar&&this.epoca>0;for(let s=0;s<r.height;s++)for(let d=0;d<r.width;d++){const m=d/(r.width-1)*2-1,p=1-s/(r.height-1)*2,w=l?this.rede.prever(m,p):.5,f=w<.5?ne(se,nt,(.5-w)*2):ne(se,rt,(w-.5)*2),b=(s*r.width+d)*4;u.data[b]=f[0],u.data[b+1]=f[1],u.data[b+2]=f[2],u.data[b+3]=255}c.putImageData(u,0,0),o.imageSmoothingEnabled=!0,o.imageSmoothingQuality="high",o.drawImage(r,0,0,t,a);const i=t*.0105;for(const s of this.pontos){const d=(s.x+1)/2*t,m=(1-s.y)/2*a;o.beginPath(),o.arc(d,m,i,0,Math.PI*2),o.fillStyle=`rgb(${(s.classe?st:at).join(",")})`,o.fill(),o.lineWidth=i*.45,o.strokeStyle="#f6f3ed",o.stroke()}o.strokeStyle="rgba(25,23,20,0.35)",o.lineWidth=Math.max(1,t*.002),o.strokeRect(.5,.5,t-1,a-1)},pe=function(){const e=this.grafico,o=e.getContext("2d"),t=e.width,a=e.height;if(!t||!a)return;o.clearRect(0,0,t,a);const r=this.historico,c=Math.max(.75,...r.slice(0,5)),u=Math.max(this.cfg.epocas,1),l=a*.08;if(o.strokeStyle="rgba(25,23,20,0.25)",o.lineWidth=Math.max(1,a*.012),o.beginPath(),o.moveTo(0,a-l),o.lineTo(t,a-l),o.stroke(),!this.cfg.treinar||r.length<2)return;o.strokeStyle="#191714",o.lineWidth=Math.max(1.5,a*.035),o.lineJoin="round",o.beginPath(),r.forEach((s,d)=>{const m=d/u*t,p=a-l-Math.min(s,c)/c*(a-l*2);d===0?o.moveTo(m,p):o.lineTo(m,p)}),o.stroke();const i=r[r.length-1];o.fillStyle="#2f4fd8",o.beginPath(),o.arc((r.length-1)/u*t,a-l-Math.min(i,c)/c*(a-l*2),a*.07,0,Math.PI*2),o.fill()};const ut=n=>Math.max(0,Math.min(1,n));function mt({stage:n,annotations:e,materiais:o}){const t=new no,a={...Zo,presenca:1},r=Xe({materiais:o,P:a});r.group.position.x=so.dupla,t.add(r.group);const c=Pe({materiais:o,annotations:e,P:a});c.group.position.x=so.neuronio,t.add(c.group);const u=et({materiais:o,annotations:e,P:a});u.group.position.x=so.exemplo,t.add(u.group);for(const[f,b,R]of[[so.dupla,6,2.6],[so.exemplo,7,2.4],[so.demo,4.5,2.2]]){const y=n.chao.contato.clone();y.position.set(f,.002,0),y.scale.set(b,R,1),y.material=n.chao.contato.material,n.scene.add(y)}n.chao.contato.scale.set(8,2.4,1),n.chao.contato.position.x=1;const l=new dt(document.body),i=new Yo({materiais:o,camadas:[2,2,1],espacoX:.75,espacoY:.42,raio:.12,maxPulsos:16});i.group.position.set(so.demo,1.9,0),t.add(i.group);let s="2,2,1";function d(f){if(f?.attrs&&f.attrs["demo-dados"]!=null&&f.cena==="redes"){const R=lt(f.attrs),y=[2,...Array(R.ocultas).fill(R.neuronios),1],_=y.join(",");_!==s&&(i.construir(y),s=_),l.iniciar(R)}else l.parar()}function m(f){Object.assign(a,f),t.visible=a.presenca>.01}let p=0;function w(f){if(!t.visible){l.mostrar(0);return}p++,r.atualizar(f),c.atualizar(f),u.atualizar(f);const b=ut(a.demo)*a.presenca;if(l.mostrar(b),i.group.visible=b>.01,b>.01){l.passo();const R=l.ativo&&l.cfg?.treinar&&l.epoca<l.cfg.epocas;l.rede&&i.definirPesos(l.rede.W),l.rede&&p%3===0&&l.rede.prever(.35,.3),i.atualizar(f,{presenca:b,ativ:(y,_)=>l.rede&&l.cfg?.treinar?Math.min(1,Math.abs(l.rede.a[y]?.[_]??0))*.8:0}),i.pulsar(f,{avanco:R?1:.15,retro:R?.7:0,presenca:b,velocidade:2})}}return{group:t,defaults:Zo,states:Be,cameras:Ge,cameraPadrao:"neuronio",apply:m,update:w,onStop:d,dispose(){l.dispose(),t.traverse(f=>{f.geometry?.dispose(),f.material&&[].concat(f.material).forEach(b=>b.dispose())})}}}const pt={titulo:"Redes neurais · Semana de TI",acento:"#2f4fd8",climaPadrao:"estudio",cenaPadrao:"redes",conteudo:Object.assign({"./conteudo/01-abertura.md":Ee,"./conteudo/02-neuronio.md":Te,"./conteudo/03-artificial.md":Re,"./conteudo/04-camadas.md":qe,"./conteudo/05-aprende.md":_e,"./conteudo/06-demo.md":ze,"./conteudo/07-o-que-ve.md":Oe,"./conteudo/08-cerebro-maquina.md":je,"./conteudo/09-onde-estao.md":Ie,"./conteudo/10-limites.md":Ne,"./conteudo/11-final.md":De}),cenas:{redes:mt},ilustracao:`
<svg viewBox="0 0 400 300" role="img" aria-label="Desenho de uma rede neural" fill="none" stroke="currentColor">
  <g stroke-width="1.2" opacity="0.7">
    <path d="M80 90 L200 70 M80 90 L200 150 M80 150 L200 70 M80 150 L200 150 M80 150 L200 230 M80 210 L200 150 M80 210 L200 230 M200 70 L320 120 M200 150 L320 120 M200 150 L320 190 M200 230 L320 190"/>
  </g>
  <g stroke-width="1.6" fill="#f6f3ed">
    <circle cx="80" cy="90" r="14"/><circle cx="80" cy="150" r="14"/><circle cx="80" cy="210" r="14"/>
    <circle cx="200" cy="70" r="14"/><circle cx="200" cy="150" r="14"/><circle cx="200" cy="230" r="14"/>
    <circle cx="320" cy="120" r="14"/><circle cx="320" cy="190" r="14"/>
  </g>
</svg>`};Ce(pt);
