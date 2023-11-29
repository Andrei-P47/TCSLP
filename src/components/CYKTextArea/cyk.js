function CYK(props) {
  let { grammar, word } = props;
  const lines = grammar.split("\n");
  let tokens = lines.map((line) => {
    return line.split("→");
  });

  tokens = tokens.map((token) => {
    if (token.length > 1) {
      return [token[0], ...token[1].split("|")];
    }
    return [];
  });

  tokens = tokens.filter((token) => {
    return token.length !== 0;
  });

  tokens = tokens.map((line) => {
    return line.map((token) => {
      return token.trim();
    });
  });

  let tokenMap = {};

  tokens.forEach((line) => {
    for (let i = 1; i < line.length; i++) {
      if (!(line[i] in tokenMap)) {
        tokenMap[line[i]] = [];
      }
      tokenMap[line[i]].push(line[0]);
    }
  });

  let n = word.length;
  let table = [];

  for (let i = n; i >= 1; i--) {
    table.push(new Array(i));
  }

  for (let i = 0; i < n; i++) {
    const letter = word[i];
    if (tokenMap[letter]) {
      table[0][i] = tokenMap[letter];
    } else {
      table[0][i] = ["-"];
    }
  }

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < n - i; j++) {
      const stateSet = new Set();

      for (let x = 0; x < i; x++) {
        for (const letter1 of table[x][j]) {
          for (const letter2 of table[i - x - 1][j + x + 1]) {
            const state = letter1 + letter2;

            if (tokenMap[state]) {
              tokenMap[state].forEach(stateSet.add, stateSet);
            }
          }
        }
      }
      table[i][j] = Array.from(stateSet);
      if (table[i][j].length === 0) table[i][j].push("-");
    }
  }

  table.reverse();

  let isInGrammar = false;
  if (table[0][0].includes("S")) {
    isInGrammar = true;
  }

  return (
    <div className="mx-auto mb-3 mt-3">
      <div className="h-full flex p-6 rounded-lg">
        <table>
          <tbody>
            <tr>
              {Array.from(word).map((letter, index) => {
                return (
                  <td key={index} className="px-6 py-2 font-bold">
                    {letter}
                  </td>
                );
              })}
            </tr>
            {table.reverse().map((t1, index) => {
              return (
                <tr key={index}>
                  {t1.map((t2, index) => {
                    return (
                      <td key={index} className="border px-8 py-4">
                        {t2.join(", ")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div
        className={
          isInGrammar
            ? "mx-auto mb-5 text-green-500 p-6"
            : "mx-auto mb-5 text-red-500 p-6"
        }
      >
        {isInGrammar ? "Bun." : "Nu e bun."}
      </div>
    </div>
  );
}

export default CYK;
