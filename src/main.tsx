// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "@/App";             // thanks to the @ alias in vite.config.ts
import "@/styles/global.css";        // Tailwind’s base & your custom styles

// Create the root element once Vite injects <div id="root"></div> into index.html
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
