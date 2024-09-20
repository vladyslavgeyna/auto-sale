import { useForm } from "react-hook-form";
import { EMAIL_REGEX } from "@/react/_utils/validation";
import { LoginPayload } from "@/queries/account";

export const useLoginForm = () => {
  const form = useForm<LoginPayload>({ mode: "onBlur" });

  const { register } = form;

  return {
    ...form,
    emailRegister: register("email", {
      required: "Email is required",
      pattern: {
        value: EMAIL_REGEX,
        message: "Please enter a valid email",
      },
    }),
    passwordRegister: register("password", {
      required: "Password is required",
    }),
  };
};
