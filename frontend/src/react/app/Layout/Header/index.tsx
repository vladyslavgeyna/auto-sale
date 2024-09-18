import { Button } from "@/react/_components/ui/button";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="header-content">
        <div className="website-name">
          <Link to="/">Auto Sale</Link>
        </div>
        <div className="actions">
          <Button onClick={() => navigate("/account/registration")}>
            Register
          </Button>
          <Button onClick={() => navigate("/account/login")}>Log in</Button>
        </div>
      </div>
    </div>
  );
};
