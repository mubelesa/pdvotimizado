(() => {
  'use strict';

  const total = document.getElementById('total');
  const pago = document.getElementById('pago');
  const troco = document.getElementById('troco');
  const container = document.getElementById('sugestoes');
  let sugestoes = [];

  function lerCentavos(campo) {
    const valor = campo.valueAsNumber;
    const centavos = Math.round(valor * 100);
    return campo.value !== '' && campo.validity.valid && valor >= 0 &&
      Number.isSafeInteger(centavos) ? centavos : null;
  }

  function selecionar(indice) {
    const sugestao = sugestoes[indice];
    if (!sugestao) return;
    pago.value = (sugestao.pagoCent / 100).toFixed(2);
    pago.dispatchEvent(new Event('input', { bubbles: true }));
    pago.focus();
  }

  function atualizar() {
    const totalCent = lerCentavos(total);
    const pagoCent = lerCentavos(pago);
    sugestoes = [];
    container.replaceChildren();
    troco.value = formatarCentavos(0);
    if (totalCent === null || pagoCent === null) return;

    troco.value = formatarCentavos(Math.max(0, pagoCent - totalCent));
    if (pagoCent < totalCent) {
      const aviso = document.createElement('p');
      aviso.textContent = `Faltam ${formatarCentavos(totalCent - pagoCent)} para completar o pagamento.`;
      container.append(aviso);
      return;
    }

    sugestoes = calcularSugestoesTroco(totalCent / 100, pagoCent / 100)
      .filter((item) => item.trocoCent >= 0 && item.diferencaCent !== 0 &&
        Number.isSafeInteger(totalCent + item.trocoCent))
      .map((item) => ({ ...item, pagoCent: totalCent + item.trocoCent }));

    sugestoes.forEach((sugestao, indice) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'sugestao-card';
      card.setAttribute('aria-keyshortcuts', `F${indice + 1} ${indice + 1}`);
      const titulo = document.createElement('span');
      titulo.textContent = `F${indice + 1} · ${sugestao.diferencaCent < 0 ? 'Pedir mais' : 'Reduzir valor pago'}`;
      const adicional = document.createElement('strong');
      adicional.className = 'valor-adicional';
      adicional.textContent = formatarCentavos(Math.abs(sugestao.diferencaCent));
      const detalhe = document.createElement('span');
      detalhe.textContent = `Pago: ${formatarCentavos(sugestao.pagoCent)} · Troco: ${formatarCentavos(sugestao.trocoCent)}`;
      card.append(titulo, adicional, detalhe);
      card.addEventListener('click', () => selecionar(indice));
      container.append(card);
    });
  }

  total.addEventListener('input', atualizar);
  pago.addEventListener('input', atualizar);

  window.addEventListener('keydown', (evento) => {
    if (evento.isComposing || evento.ctrlKey || evento.altKey || evento.metaKey || evento.shiftKey) return;
    if (evento.key === 'Enter') {
      evento.preventDefault();
      if (evento.repeat) return;
      total.value = '';
      pago.value = '';
      atualizar();
      total.focus();
      return;
    }

    const funcao = /^F([1-3])$/.exec(evento.key);
    const digitando = evento.target instanceof Element &&
      (evento.target.closest('input, textarea, select') || evento.target.isContentEditable);
    const numero = !digitando && /^([1-3])$/.exec(evento.key);
    const atalho = funcao || numero;
    if (!atalho) return;
    evento.preventDefault();
    if (!evento.repeat) selecionar(Number(atalho[1]) - 1);
  });

  atualizar();
})();
