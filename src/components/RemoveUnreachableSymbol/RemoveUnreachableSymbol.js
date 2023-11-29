import React, { useState } from "react";

class UnproductiveSymbolEliminator {
  constructor(grammar) {
    this.grammar = grammar;
    this.nonTerminals = Object.keys(grammar);
    this.terminals = this.findTerminals();
    this.reachable = new Set(["S"]); // Start with the start symbol
    this.unproductive = new Set();
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

  eliminateUnproductiveSymbols() {
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
    }

    // Identify unproductive symbols
    for (const variable of this.nonTerminals) {
      if (!this.reachable.has(variable)) {
        this.unproductive.add(variable);
      }
    }

    // Remove unproductive symbols
    for (const variable in this.grammar) {
      this.grammar[variable] = this.grammar[variable].filter(
        (production) =>
          production !== "" && !this.isProductionUnproductive(production),
      );
    }

    // Remove unproductive variables
    this.nonTerminals = Array.from(this.reachable);
  }

  isProductionUnproductive(production) {
    for (const symbol of production) {
      if (this.nonTerminals.includes(symbol) && this.unproductive.has(symbol)) {
        return true;
      }
    }
    return false;
  }
}

const UnproductiveSymbolEliminationComponent = () => {
  const [originalGrammar, setOriginalGrammar] = useState({
    S: ["abL"],
    L: ["IX", "abA"],
    X: ["dL"],
    I: ["abA"],
    A: ["dY", "d"],
    Y: ["cA"],
  });

  const [modifiedGrammar, setModifiedGrammar] = useState(null);
  const [productiveSymbols, setProductiveSymbols] = useState([]);
  const [unproductiveSymbols, setUnproductiveSymbols] = useState([]);

  const handleEliminateUnproductiveSymbols = () => {
    const unproductiveSymbolEliminator = new UnproductiveSymbolEliminator(
      originalGrammar,
    );
    unproductiveSymbolEliminator.eliminateUnproductiveSymbols();
    setModifiedGrammar(unproductiveSymbolEliminator.grammar);
    setProductiveSymbols(Array.from(unproductiveSymbolEliminator.reachable));
    setUnproductiveSymbols(
      Array.from(unproductiveSymbolEliminator.unproductive),
    );
  };

  return (
    <div>
      <h2>Original Grammar</h2>
      <pre>{JSON.stringify(originalGrammar, null, 2)}</pre>

      <button onClick={handleEliminateUnproductiveSymbols}>
        Eliminate Unproductive Symbols
      </button>

      <h2>Modified Grammar</h2>
      {modifiedGrammar ? (
        <pre>{JSON.stringify(modifiedGrammar, null, 2)}</pre>
      ) : (
        <p>
          Click "Eliminate Unproductive Symbols" to see the modified grammar.
        </p>
      )}

      <h2>Productive Symbols</h2>
      <pre>{JSON.stringify(productiveSymbols, null, 2)}</pre>

      <h2>Unproductive Symbols</h2>
      <pre>{JSON.stringify(unproductiveSymbols, null, 2)}</pre>
    </div>
  );
};

export default UnproductiveSymbolEliminationComponent;
