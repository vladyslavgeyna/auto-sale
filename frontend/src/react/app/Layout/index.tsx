import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout = () => {
  return (
    <div className="layout">
      <Header />

      <div className="page-content ">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};
