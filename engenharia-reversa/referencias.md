# Referências — Engenharia reversa

Fontes das afirmações técnicas e legais importantes da apresentação. Preferimos fontes primárias (leis, normas, documentação oficial, artigos acadêmicos).

## Definição e conceitos

- CHIKOFSKY, E. J.; CROSS, J. H. *Reverse Engineering and Design Recovery: A Taxonomy*. IEEE Software, v. 7, n. 1, p. 13–17, 1990. DOI: [10.1109/52.43044](https://doi.org/10.1109/52.43044). Definição clássica de engenharia reversa como análise de um sistema para identificar componentes e relações e criar representações dele. É a base dos capítulos 2 e 3.
- JCGM 100:2008. *Evaluation of measurement data — Guide to the expression of uncertainty in measurement* (GUM). BIPM. [bipm.org](https://www.bipm.org/en/doi/10.59161/JCGM100-2008E). Toda medição tem incerteza (capítulos 6 e 9).

## Software: ferramentas e análise

- Ghidra, framework de engenharia reversa de software da NSA, código aberto: [ghidra-sre.org](https://ghidra-sre.org/) e [github.com/NationalSecurityAgency/ghidra](https://github.com/NationalSecurityAgency/ghidra). Ferramenta citada nos capítulos 7 e 11.
- Descompilação não recupera o código-fonte original: nomes, comentários e estrutura original não existem no binário. A própria documentação do REA diz que a análise nativa devolve "pseudocode and assembly" (ver abaixo).

## REA (Reverse Engineer Anything): capítulos 7 e 11

Fatos conferidos em 24/10/2026:

- **Repositório oficial:** [github.com/morluto/rea](https://github.com/morluto/rea). O README diz que é um servidor MCP de código aberto (licença MIT) que conecta agentes de IA com suporte a MCP local (Claude Code, Codex, Cursor, entre outros) a motores de análise já existentes (Hopper, Ghidra ou IDA) e a outras ferramentas. A análise nativa devolve pseudocódigo, assembly, strings, símbolos e referências. O README também afirma: "REA is for lawful research, education, interoperability, software preservation, and analysis of software you own or are authorized to examine", e alerta que "A similar repository name or copied README does not establish that a download is official".
- **Crescimento e "conector, não descompilador":** DEV Community, *What Is REA (Reverse Engineer Anything)? The MCP Server That Hit 115K GitHub Stars in a Week*, 12/10/2026: [dev.to/hassann/…](https://dev.to/hassann/what-is-rea-reverse-engineer-anything-the-mcp-server-that-hit-115k-github-stars-in-a-week-1coc). Descreve o REA como "one of the fastest-growing repositories GitHub has seen" e "a well-packaged connector between AI agents and reverse-engineering tools that already existed". Diz que a decompilação nativa "requires an analysis engine such as Hopper, Ghidra, or IDA". Recomenda tratar as demos de reconstrução de aplicativos inteiros "as demonstrations rather than guarantees" e cita uma revisão inicial informal que achou "the gap narrow and the REA run slower" num app simples. Atenção: o texto foi publicado originalmente pela Apidog, que tem interesse comercial no tema.
- **Verificação de "verdades e mentiras" e caso do trojan:** Pasquale Pillitteri, *REA reverse engineer anything: true/false*, 14/10/2026: [pasqualepillitteri.it](https://pasqualepillitteri.it/en/news/23845/rea-reverse-engineer-anything-github-true-false). Classifica como falso que o REA "reconstrói o código-fonte original" e que é "um novo descompilador". Relata uma cópia falsa do repositório que distribuía um trojan (detectado como Wacatac). **O caso do trojan foi relatado, mas não verificado de forma independente**, por isso a apresentação diz "foi relatada".
- **O que NÃO afirmamos:** número exato de estrelas (as fontes discordam e o número muda todo dia) e o título literal "o software acabou". As manchetes falavam em reconstruir software "em minutos" ([Startup Fortune](https://startupfortune.com/an-ai-tool-called-rea-now-reverse-engineers-software-in-minutes-not-years/)), por isso o cartão usa essa formulação.

## Legislação (capítulo 9)

A apresentação **não** afirma que engenharia reversa é sempre legal ou sempre ilegal. Depende do país, do contrato e do uso.

- **Brasil:** Lei nº 9.609/1998 (Lei do Software), art. 6º. Lista situações que não ofendem os direitos do titular, entre elas a integração de um programa a um aplicativo ou sistema operacional quando tecnicamente indispensável às necessidades do usuário. [planalto.gov.br](https://www.planalto.gov.br/ccivil_03/leis/l9609.htm)
- **Brasil:** Lei nº 9.279/1996 (Lei da Propriedade Industrial: patentes, desenhos industriais, segredos). [planalto.gov.br](https://www.planalto.gov.br/ccivil_03/leis/l9279.htm)
- **União Europeia:** Diretiva 2009/24/CE, art. 6º. Permite a descompilação só sob condições, para obter interoperabilidade. [eur-lex.europa.eu](https://eur-lex.europa.eu/eli/dir/2009/24/oj)
- **EUA:** 17 U.S.C. §1201 (DMCA). Proíbe contornar proteções técnicas, com exceções, entre elas a §1201(f) para interoperabilidade. [law.cornell.edu](https://www.law.cornell.edu/uscode/text/17/1201)
- **EUA:** 18 U.S.C. §1839(6)(B). Engenharia reversa é considerada meio legítimo de obter informação, no contexto de segredos comerciais. [law.cornell.edu](https://www.law.cornell.edu/uscode/text/18/1839)

*Isto não é orientação jurídica.*

## Valores e caso hipotético

- As medidas mostradas (Ø 52 mm, 11 mm, módulo 2, ± 0,05 mm, ± 0,2 mm) são **ilustrativas** e derivadas do modelo 3D fictício (engrenagem de 24 dentes com módulo 2: diâmetro primitivo de 48 mm e externo de 52 mm, pela fórmula padrão de engrenagens de dentes retos: d = m·z, dₐ = m·(z+2)).
- O "caso da engrenagem" (capítulo 10) é **hipotético**: não cita empresas, economias ou resultados reais.
- O redutor 3D é um objeto original, criado proceduralmente para a apresentação. Não reproduz nenhum produto comercial.
