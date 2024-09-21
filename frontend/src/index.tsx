import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queries";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Account } from "./react/app/Account";
import { Layout } from "./react/app/Layout";
import "./styles/index.scss";
import { Toaster } from "./react/_components/ui/toaster";
import { AuthUserProvider } from "./react/_components/AuthUserProvider";
import { NotFound } from "./react/app/ErrorPage/NotFound";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthUserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="account/*" element={<Account />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>

          <Toaster />
        </BrowserRouter>
      </AuthUserProvider>
    </QueryClientProvider>
  </StrictMode>
);
