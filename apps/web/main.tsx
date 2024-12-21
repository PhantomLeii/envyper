import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.css";

function App() {
  return (
    <>
      <h1 className="text-6xl font-bold w-full text-center tracking-wide">
        Hello World
      </h1>
      <p className="text-xl tracking-tight">Welcome to your React app</p>
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
