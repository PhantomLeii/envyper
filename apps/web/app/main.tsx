import React from "react";
import { createRoot } from "react-dom/client";

function App() {
  return (
    <>
      <h1>Hello World</h1>
      <p>Welcome to your React app</p>
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
