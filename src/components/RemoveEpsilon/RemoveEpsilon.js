import React, { useState } from "react";

class EpsilonRemover {
  constructor(grammar) {
    this.grammar = grammar;
    this.nullable = {};
  }

  findNullableVariables() {
    let changed = true;

    while (changed) {
      changed = false;

      for (const variable in this.grammar) {
        if (!this.nullable[variable]) {
          for (const production of this.grammar[variable]) {
            if (this.isProductionNullable(production)) {
              this.nullable[variable] = true;
              changed = true;
              break;
            }
          }
        }
      }
    }
  }

  isProductionNullable(production) {
    for (const symbol of production) {
      if (!this.nullable[symbol] && symbol !== "") {
        return false;
      }
    }
    return true;
  }

  removeEpsilons() {
    for (const variable in this.grammar) {
      this.grammar[variable] = this.grammar[variable]
        .filter((production) => production !== "")
        .map((production) =>
          this.replaceNullableVariables(variable, production),
        );
    }

    for (const variable in this.grammar) {
      this.grammar[variable] = this.grammar[variable].filter(
        (production) => production !== "",
      );
    }
  }

  replaceNullableVariables(variable, production) {
    if (this.nullable[variable]) {
      const newProductions = [];

      const recurse = (prefix, remaining) => {
        if (remaining === "") {
          newProductions.push(prefix);
          return;
        }

        const firstSymbol = remaining[0];
        const rest = remaining.slice(1);

        if (this.nullable[firstSymbol]) {
          recurse(prefix, rest);
        }

        recurse(prefix + firstSymbol, rest);
      };

      recurse("", production);

      return newProductions;
    }

    return production;
  }
}

const EpsilonRemovalComponent = () => {
  const [originalGrammar, setOriginalGrammar] = useState({
    S: ["abL"],
    L: ["IX"],
    X: ["", "dL"],
    I: ["abA"],
    A: ["dY"],
    Y: ["", "cA"],
  });

  const [modifiedGrammar, setModifiedGrammar] = useState(null);

  const handleRemoveEpsilons = () => {
    const epsilonRemover = new EpsilonRemover(originalGrammar);
    epsilonRemover.findNullableVariables();
    epsilonRemover.removeEpsilons();

    setModifiedGrammar(epsilonRemover.grammar);
  };

  return (
    <div>
      <h2>Original Grammar</h2>
      <pre>{JSON.stringify(originalGrammar, null, 2)}</pre>

      <button onClick={handleRemoveEpsilons}>Remove Epsilons</button>
      {modifiedGrammar ? (
        <>
          <pre>{JSON.stringify(modifiedGrammar, null, 2)}</pre>
          <p>
            WARNING: Am eliminat epsilon dar daca mai este vreo valoare unde se
            foloseste epsilon atunci dublam odata cu epsilon si odata fara de
            epsilon
          </p>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default EpsilonRemovalComponent;
