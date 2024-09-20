import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useContext } from "react";
import { AuthUserContext } from "@/react/_components/AuthUserProvider";
import { LoadingPage } from "./LoadingPage";

export const Layout = () => {
  const { isUserLoading } = useContext(AuthUserContext);

  return (
    <div className="layout">
      <Header />

      <div className="page-content ">
        {isUserLoading ? <LoadingPage /> : <Outlet />}
      </div>

      <Footer />
    </div>
  );
};
