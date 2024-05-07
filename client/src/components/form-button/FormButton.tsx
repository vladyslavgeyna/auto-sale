import { Loader2 } from "lucide-react";
import { Button } from "../ui/Button";

type PropsType = {
  /**
   * The class name to apply to the button.
   */
  className?: string;
  /**
   * Whether the button is in a loading state.
   */
  isLoading?: boolean;
  /**
   * Whether the button is disabled.
   */
  isDisabled?: boolean;
  /**
   * The content of the button.
   */
  children: React.ReactNode;
};

const FormButton = ({
  isDisabled = false,
  isLoading = false,
  className = "",
  children,
}: PropsType) => {
  return (
    <Button disabled={isDisabled} className={" " + className} type="submit">
      {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : children}
    </Button>
  );
};

export default FormButton;
