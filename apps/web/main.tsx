import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.css";

const App = () => {
  return (
    <>
      <div className="h-screen flex items-center justify-center w-full">
        <h1 className="text-6xl font-bold tracking-wide text-center">
          App.tsx works
        </h1>
        <p className="text-xl tracking-tight">Entry Point</p>
      </div>
    </>
  );
};

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
