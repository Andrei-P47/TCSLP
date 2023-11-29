import React, { useState } from "react";
import { Route } from "react-router-dom";
import CYKTextarea from "../CYKTextArea/CYKTextarea";
import EpsilonRemovalComponent from "../RemoveEpsilon/RemoveEpsilon";
import SingularRuleEliminationComponent from "../RemoveSingularRules/RemoveSingularRules";
import UnreachableSymbolEliminationComponent from "../RemoveUnreachableSymbol/RemoveUnreachableSymbol";
import UnreachableSymbolRemovalComponent from "../RemoveInaccesibleSymbol";
import ChomskyNormalFormConverter from "../NormalFormChomsky/Chomsky";

const Home = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-[95vh]">
      {/*<Route path="/cyk" element={<CYKTextarea />} />*/}
      {/*<Route path="/epsilon" element={<EpsilonRemovalComponent />} />*/}
      {/*<Route path="/singulare" element={<SingularRuleEliminationComponent />} />*/}
      {/*<Route*/}
      {/*  path="/neproductive"*/}
      {/*  element={<UnreachableSymbolEliminationComponent />}*/}
      {/*/>*/}
      {/*<Route*/}
      {/*  path="/inaccesibile"*/}
      {/*  element={<UnreachableSymbolRemovalComponent />}*/}
      {/*/>*/}
      {/*<Route path="/chomsky" element={<ChomskyNormalFormConverter />} />*/}

      <a href="/epsilon">
        <button>epsilon</button>
      </a>
      <a href="/singulare">
        <button>singulare</button>
      </a>
      <a href="/neproductive">
        <button>neproductive</button>
      </a>
      <a href="/inaccesibile">
        <button>inaccesibile</button>
      </a>
      <a href="/chomsky">
        <button>chomsky</button>
      </a>
    </div>
  );
};

export default Home;
