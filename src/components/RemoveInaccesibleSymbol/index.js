import React, { useState } from "react";

class UnreachableSymbolRemover {
  constructor(grammar) {
    this.grammar = grammar;
    this.nonTerminals = Object.keys(grammar);
    this.terminals = this.findTerminals();
    this.reachable = new Set(["S"]); // Start with the start symbol
    this.unreachable = new Set();
  }

  findTerminals() {
    const terminals = new Set();

    for (const variable in this.grammar) {
      for (const production of this.grammar[variable]) {
        for (const symbol of production) {
          if (!this.nonTerminals.includes(symbol) && symbol !== "") {
            terminals.add(symbol);
          }
        }
      }
    }

    return Array.from(terminals);
  }

  findUnreachableSymbols() {
    let changed = true;

    while (changed) {
      changed = false;

      for (const variable of this.nonTerminals) {
        if (this.reachable.has(variable)) {
          for (const production of this.grammar[variable]) {
            for (const symbol of production) {
              if (
                this.nonTerminals.includes(symbol) &&
                !this.reachable.has(symbol)
              ) {
                this.reachable.add(symbol);
                changed = true;
              }
            }
          }
        }
      }

      // Identify unreachable symbols
      for (const variable of this.nonTerminals) {
        if (!this.reachable.has(variable)) {
          this.unreachable.add(variable);
        }
      }
    }

    // Remove unreachable symbols from the grammar
    for (const variable of this.unreachable) {
      delete this.grammar[variable];
    }

    for (const variable in this.grammar) {
      this.grammar[variable] = this.grammar[variable].map((production) =>
        production
          .split("")
          .filter((symbol) => !this.unreachable.has(symbol))
          .join(""),
      );
    }
  }
}

const UnreachableSymbolRemovalComponent = () => {
  const [originalGrammar, setOriginalGrammar] = useState({
    S: ["abL"],
    L: ["IX", "abA"],
    X: ["dL"],
    I: ["abA"],
    A: ["dY", "d"],
    Y: ["cA", "abA"],
  });

  const [modifiedGrammar, setModifiedGrammar] = useState(null);
  const [reachableSymbols, setReachableSymbols] = useState([]);
  const [unreachableSymbols, setUnreachableSymbols] = useState([]);

  const handleRemoveUnreachableSymbols = () => {
    const symbolRemover = new UnreachableSymbolRemover(originalGrammar);
    symbolRemover.findUnreachableSymbols();
    setModifiedGrammar(symbolRemover.grammar);
    setReachableSymbols(Array.from(symbolRemover.reachable));
    setUnreachableSymbols(Array.from(symbolRemover.unreachable));
  };

  return (
    <div>
      <h2>Original Grammar</h2>
      <pre>{JSON.stringify(originalGrammar, null, 2)}</pre>

      <button onClick={handleRemoveUnreachableSymbols}>
        Remove inaccessible Symbols
      </button>

      <h2>Modified Grammar</h2>
      {modifiedGrammar ? (
        <pre>{JSON.stringify(modifiedGrammar, null, 2)}</pre>
      ) : (
        <p>Click "Remove Unreachable Symbols" to see the modified grammar.</p>
      )}

      <h2>accessible Symbols</h2>
      <pre>{JSON.stringify(reachableSymbols, null, 2)}</pre>

      <h2>inaccessible Symbols</h2>
      <pre>{JSON.stringify(unreachableSymbols, null, 2)}</pre>
    </div>
  );
};

export default UnreachableSymbolRemovalComponent;
