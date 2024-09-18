import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.scss";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queries";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <div>hello</div>
    </QueryClientProvider>
  </StrictMode>
);
