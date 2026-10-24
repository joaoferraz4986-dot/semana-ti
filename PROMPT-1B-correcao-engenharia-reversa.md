# PROMPT 1B — CORRECTION: "ENGENHARIA REVERSA" MUST BE ABOUT SOFTWARE

This repository contains the shared presentation engine and a first version of the **Engenharia Reversa** presentation, built from `PROMPT-1-template-e-engenharia-reversa.md`.

**What's good and must be KEPT:** the engine (Stage, Moods "estúdio"/"holofote", Director/camera path, hybrid navigation with Lenis + ScrollTrigger + keys/clicker + hash + steps, Markdown content system, Annotations, quality tiers, offline build), the art direction (warm studio, real shadows, matte/physical materials, Instrument Serif/Sans, technical-drawing annotations, orange accent), and the documentation structure.

**What's wrong and must be REPLACED:** the presentation is about **mechanical** reverse engineering (gearbox, gears). The audience and presenters are students of **Desenvolvimento de Sistemas** (software development). The presentation must be about **reverse engineering of SOFTWARE**. Nothing mechanical should remain.

All visible text in **Brazilian Portuguese**. Work autonomously; don't ask ordinary design questions. Usage budget is limited: reuse what exists, don't rewrite the engine, no endless refinement. Commit after each stage.

---

## 1. NEW INTERACTION RULE (applies to the whole presentation)

- **No clickable or hoverable elements in the presentation.** Remove the Desmontar/Reconstruir buttons, part selection, click-to-inspect labels, hover highlights, and any "hotspot" UI.
- The **only** interaction is navigation (arrows, PageUp/PageDown clicker, Space, scroll), exactly as the engine already does.
- **"Uma passada para cada explicação":** every navigation stop (chapter or internal step) must trigger one clear, choreographed animated change that illustrates exactly one idea the presenter is saying. Use many internal steps (typically 2–5 per chapter). The screen should never sit static between presses: each press = something visibly happens.
- Going backward replays the previous state correctly (the engine already restores state per stop — keep it that way).
- Pointer parallax: either remove it or keep it barely perceptible. Nothing reacts to clicks.
- Keep the keyboard shortcuts (F, Q, H) — they're for the presenter, not visible UI.
- Update the engine docs/`COMO_EDITAR.md` to describe steps as the way to add animated beats, and remove any mention of clickable parts.

---

## 2. REMOVE

- The gearbox scene module(s), gear geometry, mechanical case study, section-cut of the housing, mechanical materials that are no longer used, and all mechanical chapter Markdown files.
- Any mechanical references in README, COMO_EDITAR, roteiro and referências.
- Keep generic engine utilities (materials library, annotations, clipping helpers, explode helpers) if they're reusable — adapt rather than delete.

---

## 3. THE TWO 3D CHARACTERS (both procedural, studio style)

### A) "O app" — a smartphone
- A believable, original phone in **matte ceramic** (off-white) with a slightly darker aluminum frame, rounded body, camera module, side buttons; no real brand, no logos.
- Its screen shows a simple **fictional** app (canvas texture): e.g. a delivery or school-agenda app with a header, a list, a button — invented name (e.g. "Lanchonete Pátio"), clean UI in the presentation's own style.
- **Software exploded view (signature moment):** step by step, the screen lifts off and the app separates into physical layered plates floating apart along the depth axis, each plate representing a layer, labeled with technical-drawing balloons and leader lines:
  1. Interface (o que o usuário vê)
  2. Lógica do app (o código)
  3. Rede (requisições para a API)
  4. Dados (armazenamento / banco)
  5. Binário (o que o processador executa)
  Each plate has a subtle surface texture hinting its content (UI wireframe, code lines, arrows/packets, table grid, dense bits), engraved/printed on the ceramic — tactile, not neon.
- One layer per step, then all together, then reassembled at the right moment.

### B) "O executável" — a sealed block
- A sealed, dark anodized block (a literal "caixa-preta") on the studio floor, a small engraved label like `app` (generic).
- **Compile (forward direction):** a plate of readable **source code** slides in and is pressed/compressed into the block → the block seals. Message: compiling turns readable code into machine instructions.
- **Decompile / reverse (backward direction):** the block is **sliced** step by step (clipping plane / slices sliding out like a deli slicer or a museum section model). Each cut face reveals a deeper level of understanding, rendered as canvas textures engraved on the cut face:
  1. Binário (hex bytes)
  2. Assembly
  3. Pseudocódigo
  4. Lógica entendida (a clean flow diagram)
- Use one small, **real and consistent example** throughout: a tiny function in C (e.g. `calcular_desconto(preco, cupom)`), its plausible x86-64 assembly (simplified but technically sound; label as "exemplo simplificado"), and the pseudocode a decompiler would produce. Make clear the recovered pseudocode is NOT the original source (names and comments are lost).

Both characters live in the same continuous studio space; the camera travels between them.

---

## 4. CHAPTERS (~10, 15–20 min spoken, many steps)

1. **Abertura** (holofote, character B): the sealed block in a single spotlight. Title "Engenharia reversa". Question: "E se você tivesse o programa, mas não o código?"
2. **O que é** (estúdio, A): engenharia reversa de software = estudar um programa que já existe para entender como ele funciona, sem acesso ao código-fonte. Steps: phone appears → "você vê o app" → "mas não vê como ele foi feito".
3. **Duas direções** (B): step 1 código-fonte → compilador → executável (compile animation); step 2 the reverse arrow; step 3 "o caminho de volta não devolve o código original — devolve pistas".
4. **Por dentro de um app** (holofote, A): the software exploded view, one layer per step, then the full stack.
5. **Descompilando** (B): the slicing sequence, one level per step (binário → assembly → pseudocódigo → lógica).
6. **As ferramentas** (estúdio): one per step, shown as clean typographic compositions with a matching subtle change on a character: DevTools do navegador (inspecionar HTML, JS e rede de um site), captura de tráfego de rede, decompiladores/disassemblers (Ghidra — free, released by the NSA in 2019; IDA), análise de APK Android. Conceptual only: **no commands, no step-by-step usage, nothing about bypassing protections**.
7. **O caso da API sem documentação** (A + a simple ceramic "servidor" tower): a hypothetical, clearly labeled case — a system you're **authorized** to integrate with has no documentation. Steps: the app sends requests (beads travel along a cable to the server) → a request is "frozen" and annotated (método, endereço, corpo JSON — invented example) → the response comes back annotated → pieces assemble into a documentation sheet. Message: observing behavior to understand and interoperate. Very relevant to DS students.
8. **Onde é usado** (steps): segurança e análise de malware; interoperabilidade entre sistemas; manutenção de sistemas legados sem código-fonte; preservação de jogos e software antigos; auditoria de segurança autorizada.
9. **Limites e ética** (steps): o código recuperado é incompleto; leva tempo e exige conhecimento; leis de direito autoral, termos de uso e contratos podem restringir — depends on country and purpose; never claim it's universally legal or illegal; always have authorization. Brazil context may be mentioned only if you can source it reliably (e.g. Lei de Software 9.609/98) — otherwise keep it general.
10. **"A IA vai fazer engenharia reversa sozinha?"** — reuse/adapt the REA fact-check chapter from the current version (it's already about software; keep its content, sources and rules: no exact star counts, no usage commands, fair debate, the trojan lesson). Convert any click interaction into steps. Replace the gearbox/mechanical tie-in with the block (B): AI speeds up reading the slices, humans decide what's correct, legal and ethical. Closing beat: "A IA lê as evidências mais rápido. Quem decide o que fazer com elas ainda somos nós."
11. **Final** (holofote → estúdio): the block reassembles, the phone sits next to it, light opens to the full studio. Headline: "Entender o que já existe é o primeiro passo para criar o que vem depois." Closing question: "Se você pudesse investigar qualquer software, qual escolheria?"

Accuracy: no invented companies, statistics or real-world cases; hypothetical examples labeled as such.

---

## 5. DOCS TO UPDATE (Portuguese)

- `engenharia-reversa/roteiro_apresentacao.md`: rewrite fully for the new chapters, **listing what to say on each step** ("aperte → e diga..."), timings totaling 15–20 min, opening/closing speeches, 3 audience questions, cheat sheet.
- `engenharia-reversa/referencias.md`: update sources (keep valid REA sources; add sources for compilation/decompilation, Ghidra, legal notes).
- `README.md` and `COMO_EDITAR.md`: remove mechanical and clickable references; document steps-as-animation-beats with an example of adding a new step.

---

## 6. ORDER (commit after each)

1. Remove mechanical content and all click/hover interaction; replace chapter files with the new chapters (final text, placeholder visuals). Run it.
2. Character B (block): compile + slicing sequence with the real C/assembly/pseudocode example.
3. Character A (phone) + software exploded view.
4. API case (server tower, request beads, annotations), tools, uses, ethics, REA chapter adaptation, opening, final.
5. Verify one pass (below), then docs.

## 7. VERIFICATION (one efficient pass)

- No console errors, no external requests, offline build still works.
- If browser automation is available: go through **every stop** forward and backward with PageDown/PageUp; confirm each stop produces a visible change and backward restores state. Max ~8 screenshots at 1920×1080 (opening, phone, exploded layers, slicing, API case, REA, final). Fix real problems, then stop.
- Confirm no element reacts to clicks/hover and that `grep` finds no leftover gear/mechanical content.
- Never claim a test you didn't run.

## 8. FINAL REPORT (Portuguese, concise)

What changed, what was removed, commands, total number of stops, what was verified, limitations.

**Execute now.**
