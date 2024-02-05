import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { StateProvider } from "./utils/StateProvider.tsx";
import reducer, { initialState } from "./utils/reducer.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StateProvider initialstate={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>
);
