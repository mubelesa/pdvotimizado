# PDV Otimizado

Tela de caixa para calcular o troco e sugerir ajustes no valor pago que facilitem sua devolução. Desenvolvida com HTML5, CSS3 e JavaScript puro, sem bibliotecas externas.

## Como executar

Abra o arquivo `index.html` em um navegador moderno, com JavaScript habilitado. Não é necessário instalar dependências, compilar ou iniciar um servidor.

## Como usar

1. Preencha **Total da Compra** e **Valor Pago** em reais, com até duas casas decimais.
2. Confira o **Troco padrão**, atualizado automaticamente ao digitar.
3. Se houver sugestões, clique em um card ou use seu atalho. O sistema preenche o novo valor pago e recalcula a tela.
4. Pressione **Enter** para limpar os campos, remover as sugestões e voltar o foco para o total da próxima compra.

Se o pagamento for insuficiente, a tela informa o valor que falta e mantém o troco em zero. Campos vazios ou inválidos também deixam o troco em zero e removem as sugestões.

## Atalhos

| Tecla | Ação |
| --- | --- |
| F1, F2 ou F3 | Seleciona a 1ª, 2ª ou 3ª sugestão exibida, inclusive com foco nos campos. |
| 1, 2 ou 3 | Seleciona a sugestão correspondente quando o foco estiver fora dos campos de edição. |
| Enter | Limpa a tela e foca em **Total da Compra**. |

Atalhos sem sugestão correspondente não alteram os valores. Combinações com Ctrl, Alt, Shift ou Meta são ignoradas.

## Regras das sugestões

- Os cálculos são feitos em centavos inteiros e os valores são exibidos em reais.
- O troco padrão corresponde ao valor pago menos o total da compra, limitado a zero quando o pagamento é insuficiente.
- As sugestões aproximam o troco para o múltiplo mais próximo de **R$ 1, R$ 5 ou R$ 10**.
- Resultados repetidos são agrupados; opções sem alteração no valor pago são omitidas. Por isso, podem aparecer de zero a três cards.
- Cada card informa quanto pedir a mais ou reduzir no pagamento, além do novo valor pago e do troco resultante.
- Selecionar um card apenas ajusta o campo na tela; o operador deve conferir o valor efetivamente recebido do cliente.

**Exemplo:** para uma compra de **R$ 42,30** paga com **R$ 50,00**, o troco padrão é **R$ 7,70**. Uma sugestão pede mais **R$ 0,30**, ajustando o pagamento para **R$ 50,30** e o troco para **R$ 8,00**.

## Estrutura dos arquivos

```text
index.html       Estrutura da tela e carregamento dos scripts
style.css        Visual responsivo, contraste e estilos dos cards
src/
  troco.js       Cálculo das sugestões e formatação monetária
  app.js         Eventos dos campos, renderização, seleção e atalhos
script.js        Versão original da lógica, não carregada pela página
```

O HTML carrega `src/troco.js` antes de `src/app.js`, usando tags `<script defer>` padrão. Para alterar o cálculo usado pela tela, edite `src/troco.js`.

## Escopo atual

O sistema funciona localmente e não salva os dados ao recarregar ou fechar a página. Não inclui registro de vendas, controle de estoque, integração com pagamentos ou emissão fiscal.
