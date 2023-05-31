export default {
  check,
  lookup,
};

var elements;
var elementsIndex = {};

await loadPeriodicTable();

// ****************************

async function loadPeriodicTable() {
  elements = await (await fetch("periodic-table.json")).json();

  for (let element of elements) {
    elementsIndex[element.symbol.toLowerCase()] = element;
  }
}

function preProcessElements(inputWord){

	const candidates = new Map()

	for (let i = 0; i < inputWord.length; i++){
	 for ( let element of elements){
		if (inputWord[i] === element.symbol.toLowerCase() || inputWord.slice(i, 2) === element.symbol.toLowerCase()) {
			candidates.set(element.symbol, element)
		}
	 }
	}

	return Array.from(candidates.values())
}


function check(inputWord) {

	const candidates = preProcessElements(inputWord)

  if (inputWord.length > 0) {
    for (let element of candidates) {
      let symbol = element.symbol.toLowerCase();
      if (symbol.length <= inputWord.length) {
        // does the input word have enough chars for whatever symbol we a looking at
        if (inputWord.slice(0, symbol.length) === symbol) {
          if (inputWord.length > symbol.length) {
            let rest = check(inputWord.slice(symbol.length));

            if (rest.length > 0) {
              return [symbol, ...rest];
            }
          } else {
            return [symbol];
          }
        }
      }
    }
  }

  return [];
}

function lookup(elementSymbol) {
  return elementsIndex[elementSymbol];
}
