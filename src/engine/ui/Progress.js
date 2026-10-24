// Indicador de progresso: um segmento por capítulo (largura proporcional ao nº de paradas),
// número e título do capítulo atual.
export class Progress {
  constructor(container, capitulos) {
    this.capitulos = capitulos;
    const el = document.createElement('nav');
    el.className = 'ui-progresso';
    el.setAttribute('aria-label', 'Progresso da apresentação');
    el.innerHTML = `
      <span class="ui-progresso__num" aria-live="polite"></span>
      <div class="ui-progresso__trilha">${capitulos
        .map((c) => `<span class="ui-progresso__seg" style="--peso:${c.nParadas}"><i></i></span>`)
        .join('')}</div>
      <span class="ui-progresso__dica"><kbd>H</kbd> atalhos</span>`;
    container.appendChild(el);
    this.num = el.querySelector('.ui-progresso__num');
    this.segs = [...el.querySelectorAll('.ui-progresso__seg')];
    this.ultimoCap = -1;
  }

  update(t) {
    const caps = this.capitulos;
    let atual = 0;
    caps.forEach((c, i) => {
      const ini = c.primeiraParada;
      const fim = ini + c.nParadas; // o segmento enche até a próxima parada
      const p = Math.max(0, Math.min(1, (t - ini + 1) / (fim - ini + 0)));
      this.segs[i].style.setProperty('--p', p.toFixed(3));
      if (t >= ini - 0.5) atual = i;
    });
    if (atual !== this.ultimoCap) {
      this.ultimoCap = atual;
      caps.forEach((_, i) => this.segs[i].classList.toggle('ativo', i === atual));
      const titulo = String(caps[atual].dados.titulo || '').replace(/\|/g, ' ');
      this.num.textContent = `${String(atual + 1).padStart(2, '0')} / ${String(caps.length).padStart(2, '0')}  ${titulo}`;
    }
  }
}
