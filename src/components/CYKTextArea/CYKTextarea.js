import { useState } from "react";
import CYK from "./cyk";

function CYKTextarea() {
  const [grammar, setGrammar] = useState("");
  const [word, setWord] = useState("");
  const [grammarInput, setGrammarInput] = useState(
    "S -> AB | BC\nA -> BA | a\nB -> CC | b\nC -> AB | a",
  );
  const [wordInput, setWordInput] = useState("baaba");

  return (
    <div className="flex flex-row">
      <div className="w-1/4 p-4 max-h-screen">
        <div className="flex flex-col mb-3 mt-6">
          <label className="block font-bold text-red-500  pr-4">
            Trebuie sa fie in forma normala Chomsky
          </label>
          <label className="block font-bold  pr-4">Cuvantul</label>
          <div className="w-full">
            <input
              className="bg-gray-100 border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="inline-full-name"
              type="text"
              value={wordInput}
              onChange={(e) => {
                setWordInput(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex flex-col mb-3 mt-6">
          <label className="block font-bold pr-4">Gramatica</label>
          <div className="w-full">
            <textarea
              className="resize-none hover:resize-y max-h-[80vh] bg-gray-100 border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-40"
              id="inline-full-name"
              type="text"
              value={grammarInput}
              onChange={(e) => setGrammarInput(e.target.value)}
            />
          </div>
        </div>
        <div className="mx-auto w-full">
          <button
            onClick={() => {
              setGrammar(grammarInput);
              setWord(wordInput);
            }}
            className="shadow bg-black w-full hover:bg-gray-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button"
          >
            Tabel
          </button>
        </div>
      </div>
      <div className="w-3/4 p-4">
        {grammar !== "" && word !== "" ? (
          <CYK grammar={grammar} word={word} />
        ) : null}
      </div>
    </div>
  );
}

export default CYKTextarea;
