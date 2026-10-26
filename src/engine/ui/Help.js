// Painel de atalhos (tecla H).
const ATALHOS = [
  ['→ ↓ Espaço PageDown', 'Próxima parada'],
  ['← ↑ PageUp', 'Parada anterior'],
  ['Home / End', 'Início / fim'],
  ['F', 'Tela cheia'],
  ['Q', 'Qualidade gráfica (Alta, Média, Baixa)'],
  ['D', 'Tema escuro ou claro'],
  ['R', 'Recentralizar a câmera'],
  ['H', 'Mostrar ou esconder esta ajuda'],
  ['Esc', 'Fechar esta ajuda'],
];

export class Help {
  constructor(container, titulo) {
    const el = document.createElement('div');
    el.className = 'ui-ajuda';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-label', 'Atalhos de teclado');
    el.innerHTML = `
      <div class="ui-ajuda__folha">
        <h2>Atalhos</h2>
        <dl>${ATALHOS.map(([k, d]) => `<dt>${k}</dt><dd>${d}</dd>`).join('')}</dl>
        <p>${titulo}. O passador de slides (PageUp/PageDown) funciona direto. Rolar com o mouse também funciona. Se a animação travar, aperte Q.</p>
      </div>`;
    el.addEventListener('click', () => this.alternar(false));
    container.appendChild(el);
    this.el = el;
    this.aberta = false;
  }
  alternar(forcar) {
    this.aberta = forcar ?? !this.aberta;
    this.el.classList.toggle('visivel', this.aberta);
  }
}
