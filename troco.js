function calcularSugestoesTroco(totalFloat, pagoFloat) { //converte para centavos inteiros
  const totalCent = Math.round(totalFloat * 100);
  const pagoCent = Math.round(pagoFloat * 100);

  if (pagoCent <= totalCent) {   //validação de valores
    return [];
  }

  const trocoExatoCent = pagoCent - totalCent;
  void trocoExatoCent; 
  return [];
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { calcularSugestoesTroco };
}
