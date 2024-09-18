import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.scss";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queries";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Account } from "./react/app/Account";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div>Header</div>
        <Routes>
          <Route path="/account/*" element={<Account />} />
        </Routes>
        <div>Footer</div>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
