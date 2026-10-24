# PROMPT 1 — SHARED TEMPLATE + "ENGENHARIA REVERSA"

You are building a real, running, cinematic 3D web presentation system for a school IT Week (ETEC, technical course in Desenvolvimento de Sistemas). Themed room: **"IA vs Humanos"**. Two presentations will use the same system:

1. **Engenharia Reversa** — built in THIS session.
2. **Redes Neurais** — built in a LATER session, reusing everything you build now.

So in this session you build: **(A)** a reusable, well-documented template/engine and **(B)** the Engenharia Reversa presentation on top of it.

All visible text is in **Brazilian Portuguese**. Code, identifiers and comments may be in English; documentation files are in Portuguese.

Work autonomously: inspect the folder, plan briefly, implement, run, verify, fix. Don't stop after a plan. Don't ask me ordinary design questions — decide well.

Before starting, read `referencias/prompt-original-engenharia-reversa.md`. It was written by the Engenharia Reversa group and is the **source of their content, chapter ideas and intent**. Use its content and educational requirements. Wherever it conflicts with THIS prompt (art direction, navigation, scope, stack, audio, Blender, testing loops), **this prompt wins**.

If the `frontend-design` skill/plugin is available, use it for all visual decisions.

---

## 0. CONSTRAINTS THAT SHAPE EVERYTHING

- Presented live on a **large TV** (assume 1920×1080 or 3840×2160) by students, in ~36 hours. Reliability > ambition. A few unforgettable moments executed perfectly beat many mediocre ones.
- **Token/usage budget is limited.** Be efficient: don't rewrite working code for taste, don't loop endlessly refining, don't add dependencies you don't need, don't produce long reports mid-way.
- Must run **fully offline** after build (school network is unreliable).
- **Other students with basic coding skills must be able to edit the content later** without touching 3D code. Editability is a first-class requirement, not an afterthought.
- **Total spoken time: 15–20 minutes.**

---

## 1. ART DIRECTION — "ESTÚDIO + HOLOFOTE" (must NOT look AI-generated)

The goal: it should feel like a premium physical product page (think Nothing, Apple product pages, Teenage Engineering, high-end industrial design studios) crossed with a museum exhibit — **made by a human design studio**, not by an AI.

### Two lighting moods (the core visual idea)

**MOOD "estúdio" (default, explanatory chapters):**
- Warm light background: off-white / sand (e.g. `#ECE8E1`, `#E3DDD2`). Ink-dark text (`#191714`), secondary warm gray (`#6E685F`).
- Objects in a photographic studio: soft large key light, gentle fill, **real soft shadows on an infinite floor (shadow catcher / contact shadows)**, subtle ambient occlusion feel.
- Materials: matte ceramic (off-white, light gray), brushed/bead-blasted aluminum, dark anodized metal, black rubber, a few parts in the accent color as if painted/powder-coated. Use `MeshPhysicalMaterial`/`MeshStandardMaterial` with carefully tuned roughness. Environment lighting via Three.js `RoomEnvironment` + `PMREMGenerator` (no external HDRI download needed → offline-safe).

**MOOD "holofote" (dramatic moments only):**
- The studio light dims; background shifts to a **warm** deep charcoal (e.g. `#151311`, never blue-black), a single spotlight with soft penumbra isolates the object, like a museum piece. Optional very subtle film grain.
- Used for: the opening, the exploded view climax, and the final reveal. Mood transitions are smooth and choreographed (background color, lights, fog, shadow intensity tweened together).

### Accent color
- Engenharia Reversa accent: **signal orange** (around `#E4572E`) — used sparingly: one component painted orange, dimension lines highlights, small markers, the progress indicator.
- Redes Neurais (later session) will use a different accent (cobalt) with the same system. Make accent a per-presentation config value.

### Typography
- Display: a characterful editorial face — default **Instrument Serif** for huge headlines. Body/UI: **Instrument Sans** (or a comparable non-default grotesk). Self-host via `@fontsource` packages. If unavailable, pick equivalent free fonts and self-host them.
- Huge headlines (TV is read from several meters away), short body text (max ~25 words visible per chapter), generous whitespace, asymmetric editorial layouts aligned to a real grid.
- Small labels in the sans with tabular numbers and letter-spacing — **not** monospace hacker style.

### Technical drawing language (signature for this presentation)
- Annotations look like real engineering drawings: thin ink lines, dimension lines with arrows/ticks, leader lines, part numbers in small circles (balloons), section hatching. Drawn crisply (lines in 3D or SVG overlays projected from 3D positions). In "estúdio" mood they're ink-dark; in "holofote" mood they're warm off-white.

### BANNED (these make it look AI-made)
Neon glows, cyan-on-black, purple/blue gradients, glassmorphism, fake HUD/telemetry text ("SYSTEM 001", "ANALYSIS ACTIVE"), random floating particles as decoration, heavy bloom, lens flares, generic rounded cards, gradient text, emoji, stock "futuristic" grids, centered hero + subtitle + button template, Inter/Space Grotesk/JetBrains Mono defaults.

Every element must have a reason to exist.

---

## 2. MOTION — FLUID AND CINEMATIC

- Treat it as **motion design**: every chapter has a choreographed entrance (staggered text, camera move, object action, annotation draw-on), built with GSAP timelines and custom eases (no linear, no default bouncy eases).
- Camera is continuous across the whole presentation: one master "camera path" through keyframes (position + target + FOV + mood), so moving between chapters feels like one continuous shot, not slide cuts.
- Text reveals: line-by-line masks, subtle y-offset, letter-spacing settle. Restrained.
- Annotation lines "draw" themselves (stroke-dashoffset or growing geometry).
- Pointer parallax only a few degrees, damped.
- Respect `prefers-reduced-motion` (crossfades instead of big camera moves).

---

## 3. NAVIGATION — HYBRID SCROLL + ARROWS (critical)

One long page, one fixed WebGL canvas behind DOM chapter overlays.

- **Lenis** smooth scrolling + **GSAP ScrollTrigger**. Scroll position drives the camera path and chapter timelines (scrubbed, smoothed).
- **Keys / presenter clicker:** `→ ↓ PageDown Space` = next stop; `← ↑ PageUp` = previous; `Home/End`. Each press animates the scroll smoothly to the next stop (`lenis.scrollTo` with a cinematic duration ~1.2–1.8s and custom ease). Presenter clickers send PageUp/PageDown — must work.
- **Stops** = chapters, plus optional internal **steps** inside a chapter (e.g. reveal 1, 2, 3). Steps are just extra stops.
- **Free scroll** with mouse/trackpad also works and feels great; when scrolling stops near a stop, gently settle onto it (soft snap, never fighting the user).
- Going backward or jumping restores exact state (everything is a function of scroll progress or of the current stop — no accumulated animation errors).
- URL hash per chapter (`#capitulo-04`), so the presenter can jump.
- `F` fullscreen · `Q` cycle quality (Alta/Média/Baixa) · `H` help overlay with shortcuts · `R` reset camera of the current chapter (useful after free interaction).
- Thin, elegant progress indicator + chapter number/title (small, bottom corner).
- Navigation keys must not fire while typing in an input or while a slider is focused (except PageUp/PageDown from the clicker).

---

## 4. THE TEMPLATE / ENGINE (built for reuse and editing)

Use **Vite (multi-page)** + vanilla JS ES modules + Three.js + GSAP (+ScrollTrigger) + Lenis. Pin stable versions. No React.

Suggested structure (adapt if you find something cleaner, but keep the spirit):

```
semana-ti/
  index.html                         ← hub: pick a presentation (styled, keyboard-friendly)
  engenharia-reversa/index.html
  redes-neurais/                     ← created in the next session
  src/
    engine/                          ← shared, presentation-agnostic
      Stage.js        renderer, scene, environment, shadow floor, resize, quality tiers, context loss
      Moods.js        "estudio" / "holofote" definitions + tweened transitions
      Director.js     camera keyframes per stop, smoothing, parallax
      Navigation.js   Lenis + ScrollTrigger + keys + clicker + hash + steps + soft snap
      Chapters.js     builds DOM overlays from content files, layouts, text reveal animations
      Annotations.js  technical-drawing lines, dimension lines, balloons, leaders (3D → screen)
      materials.js    shared material library (ceramica, aluminio, anodizado, borracha, accent)
      ui/             progress, help overlay, buttons, toast
      styles/         tokens.css (design tokens), base.css, layouts.css
    presentations/
      engenharia-reversa/
        config.js     title, accent color, default mood, list of scenes
        conteudo/     ← ONE MARKDOWN FILE PER CHAPTER (what students edit)
        cenas/        ← 3D scene modules for this presentation
  public/            ← fonts copied/bundled as needed
  README.md
  COMO_EDITAR.md
```

### Content format (the most important part for editability)

Each chapter is a Markdown file in `conteudo/`, ordered by filename (`01-abertura.md`, `02-o-que-e.md`, ...), with simple frontmatter:

```markdown
---
titulo: Do objeto ao conhecimento
rotulo: 02 — O que é
cena: maquina            # which scene module is shown
estado: revelada         # which state of that scene (scene-defined)
clima: estudio           # estudio | holofote
layout: esquerda         # esquerda | direita | centro | inferior
passos: 2                # optional internal steps
---

Engenharia reversa é investigar algo que **já existe** para entender
como foi feito e como funciona.

<!-- passo -->
Objeto → Análise → Conhecimento.
```

- Load with Vite's `import.meta.glob(..., { query: '?raw', eager: true })` and a tiny parser (or a small, well-maintained frontmatter lib). Support bold/italic/line breaks and a simple `<!-- passo -->` separator for steps.
- Camera keyframes per chapter live in the scene module or a `cameras.js` next to it, with readable names (`'vista-geral'`, `'close-engrenagem'`), so a chapter can also set `camera: close-engrenagem` in frontmatter.
- Adding/removing/reordering a chapter = adding/removing/renaming a Markdown file. No code change needed. Verify this actually works.

### Scene module contract

Each scene module exports something like `createScene(stage)` returning `{ group, states, cameras, setState(name, progress), update(dt), dispose() }`. Document this contract clearly in `COMO_EDITAR.md` with a minimal example, so the next session (and students) can add scenes.

### Quality and performance (big TV)
- Target smooth 60 fps. Cap device pixel ratio (e.g. ≤1.5 at Alta, 1.0 at Média, 0.75 render scale at Baixa); on 4K TVs render at a lower internal resolution if needed.
- Soft shadows only from the objects that matter; small shadow map sizes per tier.
- Default to **Média**, auto-drop a tier if FPS stays low for a few seconds.
- Dispose resources properly; never recreate the renderer.
- WebGL failure → chapters still display (text + simple static illustration), never a blank screen.

---

## 5. THE ENGENHARIA REVERSA PRESENTATION

### Central character
One original, **procedural**, coherent mechanical assembly built in Three.js — e.g. a compact precision **gearbox / reduction unit**: two-part housing (aluminum + ceramic-white cover), input and output shafts, bearings, spur gears, spacers, bolts, a seal, and one part powder-coated in the accent orange. It must look like a real designed product (bevels via `ExtrudeGeometry` with bevel, `LatheGeometry` for turned parts, proper gear teeth profiles, chamfers), not a pile of primitives. Each component is a separate mesh/group with a name, a role, and an exploded offset.

### Signature moments (spend your effort here)
1. **Opening in "holofote":** the closed unit emerges from darkness under a single spotlight while the camera slowly dollies in. Title "Engenharia reversa" in huge serif. Question: "E se você tivesse o objeto, mas não o projeto original?"
2. **Exploded view:** smooth, engineered separation along plausible axes with staggered timing, balloons (part numbers) and leader lines drawing in. Buttons **[ Desmontar ]** / **[ Reconstruir ]** + scrubbing via scroll. Click a part → it lifts slightly, others fade back, a clean editorial label shows name + role. Works repeatedly with no drift.
3. **Section cut:** a clipping plane slices the housing to reveal the inside, with hatching on cut faces (or the closest convincing alternative), like a real engineering section view.
4. **Measurement → model:** dimension lines appear on a gear (values clearly labeled as illustrative); then the physical gear transitions into a "digital model" look — clean edges/outline rendering in ink lines on the light background (technical drawing style, not neon wireframe).
5. **Final in "holofote" → "estúdio":** the unit reassembles, the light opens up to the full studio, everything understood. Closing line and audience question.

### Chapters (~12, total 15–20 min spoken — keep each chapter tight)
Use the original group's prompt for the content of each chapter; condense to fit:
1. Abertura — o desconhecido (holofote)
2. O que é engenharia reversa (objeto → análise → conhecimento)
3. Duas direções (engenharia convencional vs reversa — animate both flows in opposite directions)
4. O processo: observar, medir, analisar, modelar, validar (steps)
5. A máquina por dentro — exploded view (holofote, interactive)
6. Corte e medição (section view + dimensions → digital model)
7. Software também se investiga (reverse engineering of software at an educational, legal level: understanding file formats/protocols for interoperability, analyzing a program's behavior; no instructions for cracking or bypassing protection). Visual: keep the studio language — e.g. the gearbox's "controller board" or a typographic composition; no Matrix/hacker clichés.
   **Final step of this chapter — hook "Isso está acontecendo agora":** a short, punchy step introducing **REA (Reverse Engineer Anything)**, the open-source project (`morluto/rea` on GitHub) that went viral in October 2026: an MCP server that connects AI coding agents (Claude Code, Codex, Cursor) to long-established reverse-engineering tools (Ghidra, IDA, Hopper). Just plant the question here ("a IA aprendeu a fazer engenharia reversa?"); the full discussion comes in chapter 11.
8. Onde é usado (manutenção industrial, peças sem fabricante, interoperabilidade, pesquisa de segurança autorizada, preservação/restauração)
9. Limites e cuidados (incerteza de medição, o que não dá pra ver, custo/tempo, propriedade intelectual — without claiming it's universally legal or illegal)
10. O caso da engrenagem (hypothetical, clearly labeled: problema → inspeção → medição → modelo CAD → fabricação → validação). Show that copying visible geometry is not enough: material, tolerances, heat treatment and validation require human engineering judgment.
11. **"A IA vai fazer engenharia reversa sozinha?"** — the climax connecting to the room theme "IA vs Humanos" (use steps; good moment to ask the audience first). Structure it as a fact-check, "o que é verdade e o que é exagero":
    - O que aconteceu: REA became one of the fastest-growing repositories in GitHub's history in October 2026, with headlines claiming "o software acabou".
    - Verdade: AI agents can now drive professional tools (Ghidra, IDA, Hopper, browser devtools) to read compiled programs, network captures and apps much faster, lowering the skill barrier.
    - Exagero: REA is not a new decompiler — it's a connector between agents and tools that already existed for decades; it does not recover the original source code (it returns pseudocode, assembly, structure and evidence); reported informal tests show it isn't always faster than simpler approaches.
    - O que continua humano: deciding what is legal and ethical, authorization, validation, judgment — the tool's own documentation says it is for lawful research and that users are responsible for authorization and legal compliance; it doesn't change the legal limits on what you do with what you learn.
    - Lição de segurança: during the hype, a fake copy of the repository distributed a trojan — hype attracts scams; only download from official sources.
    - Tie back to the mechanical world: the same pattern exists with 3D scanners + AI processing scan data — the machine accelerates the measurement, humans decide what's right.
    - Closing beat of the chapter: "A IA lê as evidências mais rápido. Quem decide o que fazer com elas ainda somos nós."
    Rules for this chapter: **do not show exact GitHub star counts** (sources disagree and numbers change daily — use qualitative phrasing); do not show commands or instructions for using REA against any software; present debate fairly, no hype and no fear-mongering. Before writing it, **search the web** to confirm the current facts about REA and cite the sources used in `referencias.md` (prefer the official repository/README and reputable reporting). If any claim above can't be confirmed, drop or soften it.
    Visual: studio mood; a typographic, editorial composition (e.g. a stack of "headline" cards being stamped VERDADE / EXAGERO like an editor's proofs), and the gearbox/controller board in the background. No GitHub UI screenshots, no hacker clichés.
12. Final — "Agora você enxerga" (holofote → estúdio), closing question: "Se você pudesse investigar qualquer tecnologia, qual escolheria?"

Accuracy: no invented companies, numbers, savings or cases. Illustrative values are labeled as such.

---

## 6. DOCUMENTATION (in Portuguese)

- **README.md**: what it is, requirements, `npm install`, `npm run dev`, `npm run build`, `npm run apresentar` (builds + serves production locally), how to open on the TV PC, offline instructions, keyboard/clicker shortcuts, troubleshooting ("se travar, aperte Q").
- **COMO_EDITAR.md**: written for students with basic coding knowledge. With copy-paste examples:
  - trocar o texto de um capítulo;
  - adicionar, remover e reordenar capítulos;
  - usar passos internos;
  - mudar clima (estúdio/holofote), layout e câmera de um capítulo;
  - mudar a cor de destaque e as fontes (tokens);
  - criar uma nova apresentação usando o template;
  - criar uma nova cena 3D (contract + minimal working example);
  - onde fica cada coisa no projeto.
- **engenharia-reversa/roteiro_apresentacao.md**: per chapter — ideia principal, fala sugerida (natural student speech), exemplo concreto, transição, pergunta provável do público + resposta, tempo estimado. Opening and closing speech (~40s each), 3 moments to ask the audience, and a shortcut cheat sheet. Times must add up to 15–20 min.
- **engenharia-reversa/referencias.md**: sources for the important technical/legal claims (prefer primary/official/academic sources).

---

## 7. OFFLINE BUILD

- No runtime requests to external domains (fonts, libs, everything bundled).
- `npm run build` outputs a static `dist/` that works when served by any static server; add `npm run apresentar` to build + serve it.
- Additionally try to produce a **double-click version** per presentation (single-file HTML, e.g. `vite-plugin-singlefile` with a per-presentation build). Verify via `file://`. If not reliable, document why in the README and provide the simplest alternative (e.g. a one-line command or a tiny included server script).

---

## 8. BUILD ORDER (protects the deadline and the usage budget)

Keep the app runnable and **commit after every stage** (`git init` if needed):

1. Project setup, fonts, tokens, hub page, engine skeleton: Stage + Moods + Navigation (hybrid, keys, clicker, hash, steps, soft snap) + Chapters from Markdown. All Engenharia Reversa chapters present with final text and a placeholder object. Run it.
2. The procedural gearbox + materials + studio lighting + shadow floor. Make it look like a real product.
3. Director: continuous camera path across chapters; mood transitions (estúdio ↔ holofote).
4. Exploded view + part selection + Desmontar/Reconstruir.
5. Annotations (balloons, dimension lines), section cut, digital-model transition.
6. Remaining chapter visuals (including the REA fact-check chapter, after a quick web search to confirm facts), opening and final choreography.
7. Quality tiers, fallback, reduced motion.
8. Offline build(s).
9. Docs: README, COMO_EDITAR, roteiro, referências.

---

## 9. VERIFICATION (one efficient pass)

- Run dev and production builds; check the console for errors and that no external requests happen.
- If browser automation (e.g. Playwright) is available: do **one** pass — navigate all stops forward and backward with PageDown/PageUp and arrows, screenshot at 1920×1080 the opening, an estúdio chapter, the exploded view, the section/measurement chapter and the final (max ~8 screenshots). Judge honestly: does anything look AI-generated or cheap (see banned list)? Is text readable from far away? Overlaps? Fix real problems in code, then stop — no endless loops.
- Test Desmontar/Reconstruir several times; test adding a dummy chapter file and removing it.
- Never claim a test you didn't run.

## 10. FINAL REPORT (in Portuguese, concise)

Files/structure, commands, how to open offline, shortcuts, what was verified and how, known limitations, and a short note for the next session about anything the Redes Neurais build should know about the engine.

**Execute now.**
