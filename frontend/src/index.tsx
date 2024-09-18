import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div>hello</div>
  </StrictMode>
);
