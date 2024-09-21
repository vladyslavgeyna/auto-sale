import { LoginPayload, useLogin } from "@/queries/account";
import { FormControl } from "@/react/_components/FormControl";
import { Button } from "@/react/_components/ui/button";
import { useLoginForm } from "./_utils/useLoginForm";
import { useErrorToast } from "@/react/_hooks/use-toast";
import { getErrorDescription } from "@/react/_utils/getErrorDescription";
import { ACCESS_TOKEN } from "@/utils/constants";
import { AuthUserContext } from "@/react/_components/AuthUserProvider";
import { useContext } from "react";
import { useDocumentTitle } from "@/react/_hooks/useDocumentTitle";

export const Login = () => {
  useDocumentTitle("Login");

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
    emailRegister,
    passwordRegister,
  } = useLoginForm();

  const { showErrorToast } = useErrorToast();

  const { setAuthUser } = useContext(AuthUserContext);

  const { mutateAsync: login, isPending } = useLogin({
    onError: (error) => {
      showErrorToast({
        title: "Login failed",
        description: getErrorDescription(error),
      });
    },
    onSuccess: (...params) => {
      reset();

      const [loginResponse] = params;

      const { accessToken, ...user } = loginResponse;

      localStorage.setItem(ACCESS_TOKEN, accessToken);

      setAuthUser(user);
    },
  });

  const onSubmit = (data: LoginPayload) => login(data);

  return (
    <div className="login">
      <div className="title">Login</div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="login-form"
        method="post"
      >
        <FormControl
          label="Email"
          name="email"
          isRequired
          inputProps={{
            placeholder: "john@gmail.com",
            type: "email",
            ...emailRegister,
          }}
          errorMessage={errors.email?.message}
        />

        <FormControl
          label="Password"
          name="password"
          isRequired
          inputProps={{ type: "password", ...passwordRegister }}
          errorMessage={errors.password?.message}
        />

        <Button
          type="submit"
          disabled={!isValid || isPending}
          isLoading={isPending}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};
