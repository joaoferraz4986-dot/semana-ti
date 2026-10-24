# PROMPT 2 — "REDES NEURAIS" ON THE EXISTING TEMPLATE

This repository already contains a working cinematic 3D presentation engine and the **Engenharia Reversa** presentation, built for a school IT Week (themed room **"IA vs Humanos"**).

Your job in this session: build the **Redes Neurais** presentation using the existing engine. All visible text in **Brazilian Portuguese**.

Work autonomously: read, plan briefly, implement, run, verify, fix. Don't ask me ordinary design questions. If the `frontend-design` skill/plugin is available, use it for visual decisions.

---

## 0. FIRST: UNDERSTAND WHAT EXISTS (cheaply)

Read `README.md`, `COMO_EDITAR.md`, the engine in `src/engine/`, and skim `src/presentations/engenharia-reversa/` (config, one or two content files, one scene module) to learn the conventions: content Markdown + frontmatter, scene module contract, moods ("estudio"/"holofote"), camera keyframes, annotations, navigation stops/steps, quality tiers.

Rules:
- **Reuse the engine. Don't rewrite it.** Follow the same structure and conventions so students can edit both presentations the same way.
- Only change engine code if strictly necessary; keep changes backward compatible and re-check that Engenharia Reversa still works afterward.
- Usage budget is limited: be efficient, no endless refinement loops, no unnecessary dependencies.
- Context: presented live on a **large TV**, by students, in ~36 hours; **15–20 minutes** spoken; must run **offline**.

---

## 1. ART DIRECTION (same system, own personality)

Same "Estúdio + Holofote" language as Engenharia Reversa: warm off-white studio with real soft shadows and matte/physical materials for explanatory chapters; warm-charcoal single-spotlight "museum" mood for dramatic moments. Same typography and banned list (no neon, no cyan-on-black, no purple gradients, no glassmorphism, no fake HUD text, no decorative particle fog, no heavy bloom). It must look designed by a human studio, not AI-generated.

Differences for this presentation:
- **Accent: cobalt** (around `#2F4FD8`) = machine/artificial.
- **Secondary: terracotta** (around `#C8643B`) = human/biological.
- The human vs machine contrast is expressed through **materials and form**, not neon:
  - Biological: organic, irregular, branching forms in a soft terracotta/clay-like ceramic, slightly translucent warm material where it helps (subsurface feel via transmission/sheen, if performant).
  - Artificial: precise spheres/nodes in glossy white ceramic and brushed aluminum, perfectly straight or perfectly curved cables, cobalt accents.
- **Signals**: small luminous beads traveling along fibers/cables — warm light in the biological parts, cool white/cobalt in the artificial network. Restrained: a few meaningful pulses, not a particle storm. Backpropagation pulses in a distinct color (terracotta-red) and travel backward.

---

## 2. CENTRAL IDEA

**One signal travels through the whole presentation.** It starts as a single impulse in darkness, runs through a biological neuron, the neuron transforms into an artificial neuron, artificial neurons assemble into layers, signals flow forward, errors flow backward, the network learns live in front of the audience, and at the end the human and machine networks stand side by side.

Use the engine's continuous camera path so the audience feels they are following that signal through one continuous space.

---

## 3. CHAPTERS (~10, total 15–20 min spoken)

One Markdown file per chapter, same format as Engenharia Reversa. Steps inside chapters where reveals help the presenter.

1. **Abertura** (holofote): darkness → one warm pulse → it branches into a growing network. Title "Redes neurais" (huge serif). Question: "Como uma máquina aprende a partir de exemplos?" Small label: "Sala temática · IA vs Humanos".
2. **O neurônio biológico** (estúdio): a sculptural 3D neuron (dendrites, cell body, axon, synaptic terminals) on the studio floor, like a museum model. Pulses travel dendrites → body → axon. Technical-drawing style labels draw in, step by step. At the synapse, a few tiny beads cross the gap (simplified neurotransmitters). Idea: it receives signals; if the combined stimulus is strong enough, it fires.
3. **Do biológico ao artificial**: the organic neuron morphs (or is reassembled) into an artificial neuron: inputs x₁ x₂ x₃, weights w, sum Σ, bias, activation, output. Numbers flow in, the sum crosses a threshold, the node lights up. State clearly: inspired by the brain, not a copy of it.
4. **Camadas**: nodes assemble into input → hidden → output layers in 3D; the camera travels through them; forward pass pulses. Example framing: input = pixels of a picture, output = "gato" ou "cachorro".
5. **Como ela aprende** (steps): wrong answer → error measured (a simple visual "erro" gauge) → backpropagation pulses flow backward → cable thickness/brightness changes as weights adjust → repeat several times, error shrinks. Introduce: dados de treino, erro (loss), pesos, épocas — simply.
6. **Demo ao vivo — a rede aprendendo** (holofote around the demo): see section 4. Signature moment.
7. **O que a rede "vê"**: a simple image (procedurally drawn on canvas — no copyrighted images) becomes a grid of pixel values that enters the network. Mention, as a general tendency in image networks, that deeper layers capture more complex patterns (bordas → formas → objetos).
8. **Cérebro vs máquina** (split composition, steps): terracotta organic network on one side, cobalt geometric network on the other, the same pulse running through both. Reveal comparisons one by one (so the presenter can ask the audience first):
   - Número de neurônios do cérebro humano: ~86 bilhões (Azevedo et al., 2009) — labeled approximate.
   - Energia: o cérebro usa ~20 W; treinar grandes modelos de IA exige data centers inteiros (keep qualitative unless you have a reliable source).
   - Aprendizado: humanos aprendem com poucos exemplos; redes costumam precisar de muitos dados.
   - Velocidade e escala: máquinas processam volumes enormes sem cansar.
   - Compreensão, consciência, emoção, contexto: open questions — present as debate, not settled fact.
9. **Onde elas já estão** + limites: assistentes de IA/modelos de linguagem (ChatGPT, Claude), tradução, desbloqueio facial, recomendações, assistência ao motorista, apoio a diagnóstico por imagem (assistive, not replacing doctors). Limits: viés nos dados, "alucinações", caixa-preta, consumo de energia. Quick, elegant transitions.
10. **Final** (holofote → estúdio): the single pulse from the opening, now inside a network that is half terracotta, half cobalt, joined in the middle. Headline: "A máquina aprende com exemplos. Nós escolhemos quais exemplos dar." Closing question: "No fim, IA vs Humanos — ou IA com Humanos?"

Accuracy: no fabricated numbers, sources or cases; distinguish analogy vs mechanism and established facts vs open debate.

---

## 4. SIGNATURE MOMENT — OWN LIVE LEARNING DEMO

A real neural network training live, in the same studio visual language (do NOT embed TensorFlow Playground or anything with a foreign look).

- **Model**: tiny MLP in plain JavaScript (no ML libraries): 2 inputs → 1–3 hidden layers → 1 output; tanh/ReLU + sigmoid; real forward pass + backprop + mini-batch SGD. Put it in its own small module with clear comments (students may read it).
- **Datasets** (2D, two classes: terracotta vs cobalt points): Círculos, Espiral, XOR, Dois grupos.
- **Plot**: the points plus a live **decision-boundary map** (soft terracotta ↔ cobalt tint) evolving as it trains. Render it so it fits the studio aesthetic — e.g. as a printed panel/board standing in the 3D scene, or a clean editorial canvas overlay. Crisp and readable on a TV.
- **Network view**: the same network in 3D next to it (nodes = ceramic spheres, connections = cables), with cable thickness/brightness bound to the **real current weights** and pulses flowing while training.
- **Live numbers**: época and erro (loss) with a small elegant line chart. All values are real computed values.
- **No buttons, sliders or clickable controls.** The demo is driven ONLY by presentation navigation (arrows / clicker / scroll), one stop per beat, like the rest of the presentation. Each stop sets a scripted configuration and starts training automatically:
  1. Dataset "Espiral" appears (points only). "A rede precisa separar laranja de azul."
  2. 1 hidden layer, 2 neurons → trains live for a few seconds → visibly fails (boundary can't follow the spiral, error stays high).
  3. More neurons (e.g. 8) → trains live → improves.
  4. 2–3 hidden layers → trains live → solves the spiral, error drops near zero.
  5. Quick montage: the same network solving "Círculos" and "XOR".
  Going backward restores that stop's configuration and retrains from a fixed seed, so it behaves the same every time (use a seeded PRNG so the presenter knows what will happen).
- The configuration of each stop lives in the chapter's Markdown frontmatter (or a small, documented config file) so students can change datasets/neurons per step without touching code.
- Teaching script (put in the roteiro, per step): explain why few neurons fail and more neurons/layers succeed.

### Interaction rule for the whole presentation
No clickable or hoverable elements anywhere. Every navigation stop = one visible, choreographed animated change illustrating one idea ("uma passada para cada explicação"). Use 2–5 internal steps per chapter. If the engine still contains click/hover UI from earlier versions, don't use it in this presentation.

---

## 5. DOCUMENTATION (Portuguese)

- Update `README.md` and `COMO_EDITAR.md` only where needed (e.g. how to tweak the demo: datasets, defaults, colors).
- `redes-neurais/roteiro_apresentacao.md`: per chapter — ideia principal, fala sugerida (natural student speech), exemplo concreto, transição, pergunta provável + resposta, tempo estimado (total 15–20 min). Opening and closing speeches (~40s), 3 moments to ask the audience, a step-by-step guide for the live demo, and the shortcut cheat sheet.
- `redes-neurais/referencias.md`: sources for important claims.

---

## 6. BUILD ORDER (commit after each stage)

1. Register the presentation (config, hub link, accent colors), create all chapter Markdown files with final text and placeholder visuals. Run it.
2. Live demo (MLP, datasets, boundary map, chart, scripted per-step configurations with seeded PRNG). Verify it really learns (spiral solvable with enough neurons).
3. Artificial network scene + forward/backprop visuals (chapters 4–5) + demo network view bound to real weights.
4. Biological neuron + morph to artificial neuron (chapters 2–3), opening and final.
5. Brain vs machine, "o que a rede vê", applications.
6. Offline build(s) for this presentation (same approach as Engenharia Reversa).
7. Docs.

---

## 7. VERIFICATION (one efficient pass)

- Dev + production build run with no console errors and no external requests.
- If browser automation is available: one pass through all stops forward/backward with PageDown/PageUp and arrows; max ~8 screenshots at 1920×1080 (opening, neuron, network, backprop, demo while training, brain vs machine, final). Judge honestly against the banned list and TV readability; fix real problems; stop.
- Test the demo by navigating its steps forward and backward repeatedly: each step must reproduce the same result.
- Re-check that Engenharia Reversa still loads and navigates if you touched the engine.
- Never claim a test you didn't run.

## 8. FINAL REPORT (Portuguese, concise)

What was created, commands, how to open offline, shortcuts, demo guide summary, what was verified and how, known limitations.

**Execute now.**
