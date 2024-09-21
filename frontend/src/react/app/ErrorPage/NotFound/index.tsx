import { Button } from "@/react/_components/ui/button";
import { useDocumentTitle } from "@/react/_hooks/useDocumentTitle";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  useDocumentTitle("Page Not Found");

  const navigate = useNavigate();

  return (
    <div className="not-found">
      <div className="title">404</div>
      <div className="description">Oops... The page was not found</div>
      <Button onClick={() => navigate("/")} className="action">
        Go to home page
      </Button>
    </div>
  );
};
