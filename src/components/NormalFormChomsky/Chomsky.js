import React, { useState } from "react";

const ChomskyNormalFormConverter = () => {
  const originalGrammar = {
    S: ["abL"],
    L: ["IX", "abA"],
    X: ["dL"],
    I: ["abA"],
    A: ["dY", "d"],
    Y: ["cA", "abA"],
  };
  const [chomskyGrammar, setChomskyGrammar] = useState(null);

  const handleConvertToChomskyNormalForm = () => {
    const newGrammar = {};
    let variableIndex = 1;

    const generateNewVariable = (originalSymbol) => {
      const newVariable = `V${variableIndex++}`;
      newGrammar[newVariable] = [originalSymbol];
      return newVariable;
    };

    for (const variable in originalGrammar) {
      newGrammar[variable] = originalGrammar[variable].map((production) => {
        return production
          .split("")
          .map((symbol) => {
            if (!originalGrammar[symbol]) {
              return generateNewVariable(symbol);
            }
            return symbol;
          })
          .join("");
      });
    }

    setChomskyGrammar(newGrammar);
  };

  const generateWordFromCNFGrammar = (grammar) => {
    const generateWordRecursively = (symbol) => {
      if (!grammar[symbol]) {
        // If symbol is not a key in grammar, return it as is
        return symbol;
      }

      if (
        grammar[symbol].length === 1 &&
        grammar[symbol][0].length === 1 &&
        grammar[symbol][0].match(/[a-z]/)
      ) {
        // If the symbol generates a terminal, return it
        return grammar[symbol][0];
      } else {
        // Otherwise, apply the production rules recursively
        const production =
          grammar[symbol][Math.floor(Math.random() * grammar[symbol].length)];
        const symbols = production.split("");

        const generatedWord = symbols
          .map((s) => generateWordRecursively(s))
          .join("");
        return generatedWord;
      }
    };

    // Start the generation from the start symbol
    return generateWordRecursively("S");
  };

  return (
    <>
      {/*<div>*/}
      {/*<h2>Original Grammar</h2>*/}
      {/*<pre>{JSON.stringify(originalGrammar, null, 2)}</pre>*/}
      {/*<button onClick={handleConvertToChomskyNormalForm}>*/}
      {/*  Convert to Chomsky Normal Form*/}
      {/*</button>*/}
      {/*<h2>Chomsky Normal Form</h2>*/}
      {/*{chomskyGrammar && (*/}
      {/*  <>*/}
      {/*    <pre>{JSON.stringify(chomskyGrammar, null, 2)}</pre>*/}
      {/*    <button*/}
      {/*      onClick={() =>*/}
      {/*        console.log(generateWordFromCNFGrammar(chomskyGrammar))*/}
      {/*      }*/}
      {/*    >*/}
      {/*      Generate Word*/}
      {/*    </button>*/}
      {/*  </>*/}
      {/*)}*/}

      {/*</div>*/}
      <div className="flex items-center justify-center h-[95vh]">
        <a href="https://mahshidhp.pythonanywhere.com/" target="_blank">
          Chomsky normal form
        </a>
      </div>
    </>
  );
};

export default ChomskyNormalFormConverter;
