import React, { useState } from "react";

class EpsilonRemover {
  constructor(grammar) {
    this.grammar = grammar;
    this.nullable = {};
    this.epsilonVariables = [];
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
              if (!this.epsilonVariables.includes(variable)) {
                this.epsilonVariables.push(variable);
              }
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
  const [epsilonVariables, setEpsilonVariables] = useState([]);

  const handleRemoveEpsilons = () => {
    const epsilonRemover = new EpsilonRemover(originalGrammar);
    epsilonRemover.findNullableVariables();
    epsilonRemover.removeEpsilons();

    setModifiedGrammar(epsilonRemover.grammar);
    setEpsilonVariables(epsilonRemover.epsilonVariables);
  };

  return (
    <div>
      <h2>Original Grammar</h2>
      <pre>{JSON.stringify(originalGrammar, null, 2)}</pre>

      <button onClick={handleRemoveEpsilons}>Remove Epsilons</button>
      {modifiedGrammar ? (
        <>
          <h2>Modified Grammar</h2>
          <pre>{JSON.stringify(modifiedGrammar, null, 2)}</pre>
          {epsilonVariables.length > 0 && (
            <div>
              <h2>Epsilon Variables</h2>
              <pre>{JSON.stringify(epsilonVariables, null, 2)}</pre>
            </div>
          )}
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
