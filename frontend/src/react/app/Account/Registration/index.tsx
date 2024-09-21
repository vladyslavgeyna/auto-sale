import { Button } from "@/react/_components/ui/button";
import { useRegistrationForm } from "./_hooks/useRegistrationForm";
import { FormControl } from "@/react/_components/FormControl";
import { RegistrationPayload, useRegister } from "@/queries/account";
import { useErrorToast, useSuccessToast } from "@/react/_hooks/use-toast";
import { getErrorDescription } from "@/react/_utils/getErrorDescription";
import { useDocumentTitle } from "@/react/_hooks/useDocumentTitle";

export const Registration = () => {
  useDocumentTitle("Registration");

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
    nameRegister,
    getValues,
    surnameRegister,
    emailRegister,
    phoneRegister,
    imageRegister,
    passwordConfirmRegister,
    passwordRegister,
  } = useRegistrationForm();

  const { showSuccessToast } = useSuccessToast();
  const { showErrorToast } = useErrorToast();

  const { mutateAsync: register, isPending } = useRegister({
    onError: (error) => {
      showErrorToast({
        title: "Registration failed",
        description: getErrorDescription(error),
      });
    },
    onSuccess: () => {
      showSuccessToast({
        title: "Registration successful",
        description: `You have successfully registered. Please visit your ${getValues(
          "email"
        )} email to verify your account`,
      });

      reset();
    },
  });

  const onSubmit = (data: RegistrationPayload) =>
    register({
      ...data,
      phone: data.phone?.replace(/\s/g, ""), // remove spaces from phone number
    });

  return (
    <div className="registration">
      <div className="title">Registration</div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="registration-form"
        encType="multipart/form-data"
        method="post"
      >
        <FormControl
          label="Name"
          name="name"
          isRequired
          inputProps={{ placeholder: "John", ...nameRegister }}
          errorMessage={errors.name?.message}
        />

        <FormControl
          label="Surname"
          name="surname"
          isRequired
          inputProps={{ placeholder: "Appleseed", ...surnameRegister }}
          errorMessage={errors.surname?.message}
        />

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

        <FormControl
          label="Confirm password"
          name="confirm-password"
          isRequired
          inputProps={{ type: "password", ...passwordConfirmRegister }}
          errorMessage={errors.passwordConfirm?.message}
        />

        <FormControl
          label="Phone"
          name="phone"
          inputProps={{
            placeholder: "096 888 3838",
            ...phoneRegister,
          }}
          errorMessage={errors.phone?.message}
        />
        <FormControl
          label="Image"
          name="image"
          inputProps={{ type: "file", ...imageRegister }}
          errorMessage={errors.image?.message}
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
