import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CYKTextarea from "./components/CYKTextArea/CYKTextarea";
import EpsilonRemovalComponent from "./components/RemoveEpsilon/RemoveEpsilon";
import SingularRuleEliminationComponent from "./components/RemoveSingularRules/RemoveSingularRules";
import UnreachableSymbolEliminationComponent from "./components/RemoveUnreachableSymbol/RemoveUnreachableSymbol";
import UnreachableSymbolRemovalComponent from "./components/RemoveInaccesibleSymbol";
import ChomskyNormalFormComponent from "./components/NormalFormChomsky/Chomsky";
import ChomskyNormalFormConverter from "./components/NormalFormChomsky/Chomsky";
import Home from "./components/Home/Home";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/cyk" element={<CYKTextarea />} />
        <Route path="/epsilon" element={<EpsilonRemovalComponent />} />
        <Route
          path="/singulare"
          element={<SingularRuleEliminationComponent />}
        />
        <Route
          path="/neproductive"
          element={<UnreachableSymbolEliminationComponent />}
        />
        <Route
          path="/inaccesibile"
          element={<UnreachableSymbolRemovalComponent />}
        />
        <Route path="/chomsky" element={<ChomskyNormalFormConverter />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
