import { LoginPayload, useLogin } from "@/queries/account";
import { FormControl } from "@/react/_components/FormControl";
import { Button } from "@/react/_components/ui/button";
import { useLoginForm } from "./_utils/useLoginForm";
import { useErrorToast } from "@/react/_hooks/use-toast";
import { getErrorDescription } from "@/react/_utils/getErrorDescription";

export const Login = () => {
  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
    emailRegister,
    passwordRegister,
  } = useLoginForm();

  const { showErrorToast } = useErrorToast();

  const { mutateAsync: login, isPending } = useLogin({
    onError: (error) => {
      showErrorToast({
        title: "Login failed",
        description: getErrorDescription(error),
      });
    },
    onSuccess: () => reset(),
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
