import { useContext, useEffect } from "react";
import { AuthUserContext } from "../_components/AuthUserProvider";
import { useNavigate } from "react-router-dom";

export const useRedirectIfAuthenticated = () => {
  const { authUser, isUserLoading } = useContext(AuthUserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser || isUserLoading) return;

    navigate("/");
  }, [authUser, navigate, isUserLoading]);
};
