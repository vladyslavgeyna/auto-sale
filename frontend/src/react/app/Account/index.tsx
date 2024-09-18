import { Route, Routes } from "react-router-dom";
import { Registration } from "./Registration";

export const Account = () => {
  return (
    <Routes>
      <Route path="/registration" element={<Registration />} />
    </Routes>
  );
};
