import { useForm } from "react-hook-form";
import { getPrettyPhoneNumber } from "../_utils/getPrettyPhoneNumber";
import {
  ACCEPT_IMAGE_TYPES,
  EMAIL_REGEX,
  MAX_FILE_SIZE,
  PASSWORD_REGEX,
  PHONE_NUMBER_REGEX,
} from "@/react/_utils/validation";
import { RegistrationPayload } from "@/queries/account";

export const useRegistrationForm = () => {
  const form = useForm<RegistrationPayload>({ mode: "onBlur" });

  const { setValue, register, watch } = form;

  return {
    ...form,
    nameRegister: register("name", {
      required: "Name is required",
      minLength: {
        value: 2,
        message: "Name should be at least 2 symbols",
      },
      maxLength: {
        value: 100,
        message: "Max name length is 100 symbols",
      },
    }),
    surnameRegister: register("surname", {
      required: "Surname is required",
      minLength: {
        value: 2,
        message: "Surname should be at least 2 symbols",
      },
      maxLength: {
        value: 100,
        message: "Max surname length is 100 symbols",
      },
    }),
    emailRegister: register("email", {
      required: "Email is required",
      pattern: {
        value: EMAIL_REGEX,
        message: "Please enter a valid email",
      },
    }),
    phoneRegister: register("phone", {
      pattern: {
        value: PHONE_NUMBER_REGEX,
        message: "Invalid phone number",
      },
      onChange: (e) => {
        if (e.target.value.length >= 12)
          setValue("phone", e.target.value.slice(0, 12));

        setValue("phone", getPrettyPhoneNumber(e.target.value));
      },
    }),
    imageRegister: register("image", {
      validate: (value) => {
        if (!value?.length) return true;

        const file = value[0];

        console.log("file", file);

        if (!ACCEPT_IMAGE_TYPES.some((t) => t === file.type))
          return "Only png and jpeg files are valid.";

        if (file.size > MAX_FILE_SIZE)
          return "Too large file size. Max file size is 5MB.";
      },
    }),
    passwordRegister: register("password", {
      required: "Password is required",
      pattern: {
        value: PASSWORD_REGEX,
        message:
          "Password should contain at least 1 number, 1 uppercase letter and 1 lowercase letter",
      },
      minLength: {
        value: 6,
        message: "Password should be at least 6 symbols",
      },
      maxLength: {
        value: 50,
        message: "Max password length is 50 symbols",
      },
    }),
    passwordConfirmRegister: register("passwordConfirm", {
      required: "Confirm password is required",
      validate: (value: string) => {
        if (watch("password") !== value) return "Passwords don't match";
      },
    }),
  };
};
