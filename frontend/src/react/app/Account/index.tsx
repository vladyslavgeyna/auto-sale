import { Route, Routes } from "react-router-dom";
import { Registration } from "./Registration";
import { Login } from "./Login";
import { NotFound } from "../ErrorPage/NotFound";
import { useRedirectIfAuthenticated } from "@/react/_hooks/useRedirectIfAuthenticated";

export const Account = () => {
  useRedirectIfAuthenticated();

  return (
    <Routes>
      <Route path="/registration" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
