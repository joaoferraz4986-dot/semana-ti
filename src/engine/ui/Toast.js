// Mensagem curta no canto (ex.: "Qualidade: Baixa").
export class Toast {
  constructor(container) {
    this.el = document.createElement('div');
    this.el.className = 'ui-toast';
    this.el.setAttribute('role', 'status');
    container.appendChild(this.el);
  }
  mostrar(texto, ms = 1800) {
    this.el.textContent = texto;
    this.el.classList.add('visivel');
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.el.classList.remove('visivel'), ms);
  }
}
