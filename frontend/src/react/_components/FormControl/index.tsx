import { Input, InputProps } from "../ui/input";
import { Label } from "../ui/label";

type Props = {
  inputProps: InputProps & React.RefAttributes<HTMLInputElement>;
  name: string;
  className?: string;
  isRequired?: boolean;
  label: string;
  errorMessage?: string;
};

export const FormControl = ({
  inputProps,
  name,
  isRequired,
  className = "",
  label,
  errorMessage,
}: Props) => {
  return (
    <div className={`form-control ${className}`}>
      <div className="controls">
        <Label htmlFor={name}>
          {label}
          {isRequired ? "*" : ""}
        </Label>
        <Input type="text" {...inputProps} id={name} />
      </div>
      <div className="error-message">{errorMessage}</div>
    </div>
  );
};
