import { User } from "@/types";
import { api } from ".";
import { REGISTER } from "./queryKeys";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

const URL = "account";

export type RegistrationPayload = {
  name: string;
  surname: string;
  email: string;
  phone?: string;
  password: string;
  passwordConfirm: string;
  image: FileList | null;
};

const register = async (userData: RegistrationPayload) => {
  const formData = new FormData();

  for (const key in userData) {
    const value = userData[key as keyof RegistrationPayload];

    if (!value) continue;

    formData.append(key, value instanceof FileList ? value[0] : value);
  }

  const { data } = await api.post<User>(`${URL}/register`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
};

export const useRegister = (
  options?: UseMutationOptions<User, void, RegistrationPayload, void>
) => {
  return useMutation({
    ...options,
    mutationKey: [REGISTER],
    mutationFn: register,
  });
};
