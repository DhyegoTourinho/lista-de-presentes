import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { Provider } from "./provider.tsx";
import "@/styles/globals.css";

// Determinar basename baseado no ambiente
const getBasename = () => {
  const baseUrl = import.meta.env.BASE_URL || "";
  if (baseUrl.includes("dhyegotourinho") || window.location.href.includes("dhyegotourinho")) {
    return "/lista-de-presentes";
  }
  return "/";
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={getBasename()}>
      <Provider>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
