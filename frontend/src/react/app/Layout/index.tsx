import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <div className="page-content ">
        <Outlet />
      </div>
      <div>Footer</div>
    </div>
  );
};
