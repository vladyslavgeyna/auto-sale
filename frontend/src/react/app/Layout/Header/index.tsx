import { useLogout } from "@/queries/account";
import { AuthUserContext } from "@/react/_components/AuthUserProvider";
import { Button } from "@/react/_components/ui/button";
import { useErrorToast } from "@/react/_hooks/use-toast";
import { getErrorDescription } from "@/react/_utils/getErrorDescription";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  const { authUser } = useContext(AuthUserContext);

  const isLoggedIn = !!authUser;

  const { showErrorToast } = useErrorToast();

  const { mutateAsync: logout } = useLogout({
    onError: (error) => {
      showErrorToast({
        title: "Logout failed",
        description: getErrorDescription(error),
      });
    },
  });

  return (
    <div className="header">
      <div className="header-content">
        <div className="website-name">
          <Link to="/">Auto Sale</Link>
        </div>
        <div className="actions">
          {!isLoggedIn ? (
            <>
              <Button onClick={() => navigate("/account/registration")}>
                Register
              </Button>
              <Button onClick={() => navigate("/account/login")}>Log in</Button>
            </>
          ) : (
            <Button
              onClick={async () => {
                await logout();

                navigate("/account/login");
              }}
            >
              Log out
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
