import React, { useState } from "react";

class SingularRuleEliminator {
  constructor(grammar) {
    this.grammar = grammar;
    this.changed = true;
  }

  eliminateSingularRules() {
    while (this.changed) {
      this.changed = false;

      for (const variable in this.grammar) {
        const productions = new Set(this.grammar[variable]);

        for (const production of productions) {
          const nonTerminals = this.findNonTerminals(production);

          if (nonTerminals.length === 1 && this.grammar[nonTerminals[0]]) {
            const nonTerminalProductions = this.grammar[nonTerminals[0]];

            for (const subProduction of nonTerminalProductions) {
              productions.add(
                production.replace(nonTerminals[0], subProduction),
              );
              this.changed = true;
            }

            if (nonTerminalProductions.includes("")) {
              productions.add(production.replace(nonTerminals[0], ""));
              this.changed = true;
            }
          }
        }

        this.grammar[variable] = Array.from(productions);
      }
    }
  }

  findNonTerminals(str) {
    return str.match(/[A-Z]/g) || [];
  }
}

const SingularRuleEliminationComponent = () => {
  // const [originalGrammar, setOriginalGrammar] = useState({
  //   S: ["abL"],
  //   L: ["IX", "I"],
  //   X: ["dL"],
  //   I: ["abA"],
  //   A: ["dY", "d"],
  //   Y: ["cA"],
  // });

  const [originalGrammar, setOriginalGrammar] = useState({
    S: ["abL"],
    L: ["IX", "abA"],
    X: ["dL"],
    I: ["abA"],
    A: ["dY", "d"],
    Y: ["cA"],
  });

  const [modifiedGrammar, setModifiedGrammar] = useState(null);

  const handleEliminateSingularRules = () => {
    const singularRuleEliminator = new SingularRuleEliminator(originalGrammar);
    singularRuleEliminator.eliminateSingularRules();
    setModifiedGrammar(singularRuleEliminator.grammar);
  };

  return (
    <div>
      <h2>Original Grammar</h2>
      <pre>{JSON.stringify(originalGrammar, null, 2)}</pre>

      <button onClick={handleEliminateSingularRules}>
        Eliminate Singular Rules
      </button>

      <h2>Modified Grammar</h2>
      {modifiedGrammar ? (
        <pre>{JSON.stringify(modifiedGrammar, null, 2)}</pre>
      ) : (
        <p>Click "Eliminate Singular Rules" to see the modified grammar.</p>
      )}
    </div>
  );
};

export default SingularRuleEliminationComponent;
