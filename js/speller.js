export default {
  check,
  lookup,
};

var elements;
var elementsIndex = {}

await loadPeriodicTable();

// ****************************

async function loadPeriodicTable() {
  elements = await (await fetch("periodic-table.json")).json();

	elements.forEach(element => elementsIndex[element.symbol.toLowerCase()] = element);
}

function check(inputWord) {
  // TODO: determine if `inputWord` can be spelled
  // with periodic table symbols; return array with
  // them if so (empty array otherwise)
  //we are going to chech our entire elements list for a portion of the word that matchs the substring of the provided input

  if (inputWord.length > 0) {
    for (let element in elementsIndex) {
			let symbol = element;

      if (symbol.length <= inputWord.length) {
        if (symbol === inputWord.slice(0, symbol.length)) {
          if (inputWord.length > symbol.length) {
            let rest = check(inputWord.slice(symbol.length));

            if (rest?.length > 0) {
              return [symbol, ...rest];
            }
          } else {
            return [symbol];
          }
        }
      }
    }
  }
}

function lookup(elementSymbol) {
  // TODO: return the element entry based on specified
  // symbol (case-insensitive)
  return (
    elements.find(
      (element) => element.symbol.toLowerCase() === elementSymbol
    ) ?? {}
  );
}
