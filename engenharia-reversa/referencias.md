# Referências — Engenharia reversa de software

Fontes das afirmações técnicas e legais importantes. Preferimos fontes primárias (leis, documentação oficial, artigos acadêmicos).

## Conceitos

- CHIKOFSKY, E. J.; CROSS, J. H. *Reverse Engineering and Design Recovery: A Taxonomy*. IEEE Software, v. 7, n. 1, p. 13–17, 1990. DOI: [10.1109/52.43044](https://doi.org/10.1109/52.43044). Definição clássica: analisar um sistema para identificar componentes, relações e criar representações dele em outro nível de abstração (capítulos 2 e 3).
- AHO, A. V.; LAM, M. S.; SETHI, R.; ULLMAN, J. D. *Compilers: Principles, Techniques, and Tools* (2. ed.). Pearson, 2006. O compilador traduz código-fonte em código de máquina; nomes e comentários não são necessários para a execução (capítulo 3).
- CIFUENTES, C. *Reverse Compilation Techniques*. Tese de doutorado, Queensland University of Technology, 1994. Trabalho de referência sobre descompilação e seus limites: a descompilação recupera uma aproximação de alto nível, não o código-fonte original (capítulo 5).

## O exemplo da função (capítulos 3 e 5)

- O código C, os bytes, o assembly e o pseudocódigo são um **exemplo simplificado** criado para a apresentação (arquivo `src/presentations/engenharia-reversa/cenas/software/exemplo.js`). Os bytes seguem a codificação x86-64 real: `83 FF 0A` = `cmp edi, 10`; `75 08` = `jne +8`; `F3 0F 59 05 …` = `mulss xmm0, [rip+desl]`; `C3` = `ret`. O valor 0,9 em ponto flutuante de 32 bits é `0x3F666666`. Os argumentos chegam em `xmm0` (float) e `edi` (int) pela convenção System V AMD64. Endereços e nomes `FUN_…`/`LAB_…`/`DAT_…` imitam o padrão de nomes que o Ghidra gera.
- Intel® 64 and IA-32 Architectures Software Developer's Manual, vol. 2 (Instruction Set Reference): [intel.com/sdm](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html).
- System V AMD64 ABI (convenção de chamada): [gitlab.com/x86-psABIs/x86-64-ABI](https://gitlab.com/x86-psABIs/x86-64-ABI).

## Ferramentas (capítulo 6)

- **Ghidra**: framework de engenharia reversa de software criado pela NSA e liberado como código aberto em 2019. [ghidra-sre.org](https://ghidra-sre.org/) · [github.com/NationalSecurityAgency/ghidra](https://github.com/NationalSecurityAgency/ghidra).
- **IDA** (Hex-Rays), disassembler e descompilador comercial: [hex-rays.com/ida-pro](https://hex-rays.com/ida-pro).
- **DevTools** do navegador (Elements, Sources, Network): [developer.chrome.com/docs/devtools](https://developer.chrome.com/docs/devtools).
- **APK**: formato de pacote de apps Android: [developer.android.com/guide/components/fundamentals](https://developer.android.com/guide/components/fundamentals).
- A apresentação mostra só o **conceito** de cada ferramenta. Nenhum passo a passo, nada sobre contornar proteções.

## REA (Reverse Engineer Anything): capítulo 10

Fatos conferidos em 24/10/2026:

- **Repositório oficial:** [github.com/morluto/rea](https://github.com/morluto/rea). O README o descreve como servidor MCP de código aberto (licença MIT) que conecta agentes de IA com suporte a MCP (Claude Code, Codex, Cursor, entre outros) a motores de análise que já existem (Hopper, Ghidra ou IDA). A análise nativa devolve pseudocódigo, assembly, strings, símbolos e referências. O README também diz: "REA is for lawful research, education, interoperability, software preservation, and analysis of software you own or are authorized to examine", e alerta que "A similar repository name or copied README does not establish that a download is official".
- **Crescimento e "conector, não descompilador":** DEV Community, *What Is REA (Reverse Engineer Anything)? The MCP Server That Hit 115K GitHub Stars in a Week*, 12/10/2026: [dev.to/hassann/…](https://dev.to/hassann/what-is-rea-reverse-engineer-anything-the-mcp-server-that-hit-115k-github-stars-in-a-week-1coc). Chama o REA de "one of the fastest-growing repositories GitHub has seen" e "a well-packaged connector between AI agents and reverse-engineering tools that already existed". Recomenda tratar demonstrações de reconstrução "as demonstrations rather than guarantees" e cita uma revisão inicial informal que achou "the gap narrow and the REA run slower" num app simples. O texto foi publicado originalmente pela Apidog, que tem interesse comercial.
- **Verdades e mentiras + caso do trojan:** Pasquale Pillitteri, *REA reverse engineer anything: true/false*, 14/10/2026: [pasqualepillitteri.it](https://pasqualepillitteri.it/en/news/23845/rea-reverse-engineer-anything-github-true-false). Classifica como falso que o REA "reconstrói o código-fonte original" e que é "um novo descompilador". Relata uma cópia falsa do repositório distribuindo um trojan. **Relatado, não verificado de forma independente**, por isso a apresentação diz "foi relatada".
- **Manchetes de "minutos":** Startup Fortune, *An AI tool called REA now reverse engineers software in minutes not years*: [startupfortune.com](https://startupfortune.com/an-ai-tool-called-rea-now-reverse-engineers-software-in-minutes-not-years/).
- **O que NÃO afirmamos:** número exato de estrelas (as fontes discordam e muda todo dia).

## Legislação (capítulo 9)

A apresentação **não** afirma que engenharia reversa é sempre legal ou sempre ilegal.

- **Brasil:** Lei nº 9.609/1998 (Lei do Software), art. 6º. Lista situações que não ofendem os direitos do titular, entre elas a integração de um programa a um aplicativo ou sistema operacional, quando tecnicamente indispensável às necessidades do usuário. [planalto.gov.br](https://www.planalto.gov.br/ccivil_03/leis/l9609.htm)
- **União Europeia:** Diretiva 2009/24/CE, art. 6º. Permite a descompilação, sob condições, para obter interoperabilidade. [eur-lex.europa.eu](https://eur-lex.europa.eu/eli/dir/2009/24/oj)
- **EUA:** 17 U.S.C. §1201 (DMCA). Proíbe contornar proteções técnicas, com exceções, como a §1201(f) para interoperabilidade. [law.cornell.edu](https://www.law.cornell.edu/uscode/text/17/1201)

*Isto não é orientação jurídica.*

## A passada final (capítulo 11)

- A frase sobre a sala das redes neurais — "a máquina também aprende do exemplo de fora e projeta seu modelo como resposta" — é uma **analogia** que amarra as duas apresentações. As fontes dela estão em `redes-neurais/referencias.md`, seção "Projeção e NCM" (VELMANS, 2018; PEREIRA JR., 2018; arXiv:2610.14162). Não é afirmação de neurociência: é o espelho do que a sala anterior mostrou.
- A definição de engenharia reversa usada no fecho permanece a de Chikofsky & Cross (1990), citada em "Conceitos".

## Exemplos fictícios

- O app "Lanchonete Pátio", a API, os endereços, o JSON e o número do pedido são **inventados** para o caso hipotético do capítulo 7. Não representam nenhuma empresa real.
