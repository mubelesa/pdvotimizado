function calcularSugestoesTroco(totalFloat, pagoFloat) {
  // conversão para centavos inteiros
  const totalCent = Math.round(totalFloat * 100);
  const pagoCent = Math.round(pagoFloat * 100);
 
  // validação inicial
  if (pagoCent <= totalCent) {
    return [];
  }
 
  const trocoExatoCent = pagoCent - totalCent;
 
  // tipos de cenários
  const cenarios = [
    { id: 1, unidadeCent: 100 },  // Zerar centavos (R$ 1)
    { id: 2, unidadeCent: 500 },  // Nota de R$ 5 mais próxima
    { id: 3, unidadeCent: 1000 }, // Nota de R$ 10 mais próxima
  ];
 
  // função Map para evitar duplicações
  const sugestoes = new Map();
 
  for (const { id, unidadeCent } of cenarios) {
    const trocoCent = Math.round(trocoExatoCent / unidadeCent) * unidadeCent;
 
    // resto em centavos precisa ser divisível por 50
    if (trocoCent % 50 !== 0) continue;
 
    if (sugestoes.has(trocoCent)) {
      sugestoes.get(trocoCent).cenarios.push(id); // mesmo valor: só registra o cenário
    } else {
      sugestoes.set(trocoCent, {
        cenarios: [id],
        trocoCent,
        diferencaCent: trocoExatoCent - trocoCent,
      });
    }
  }
 
  return Array.from(sugestoes.values());
}
 
// permite uso no navegador e no Node, sem compilador
if (typeof module !== "undefined" && module.exports) {
  module.exports = { calcularSugestoesTroco };
}