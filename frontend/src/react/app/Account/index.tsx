import { Route, Routes } from "react-router-dom";
import { Registration } from "./Registration";
import { Login } from "./Login";

export const Account = () => {
  return (
    <Routes>
      <Route path="/registration" element={<Registration />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
