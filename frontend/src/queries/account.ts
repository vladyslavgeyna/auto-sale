import { User } from "@/types";
import { api, ApiError, credentialsApi } from ".";
import { LOGIN, LOGOUT, REGISTER } from "./queryKeys";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthUserContext } from "@/react/_components/AuthUserProvider";

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
  options?: UseMutationOptions<User, ApiError, RegistrationPayload, void>
) => {
  return useMutation({
    ...options,
    mutationKey: [REGISTER],
    mutationFn: register,
  });
};

export type LoginPayload = {
  email: string;
  password: string;
};

type LoginResponse = User & { accessToken: string };

const login = async (userData: LoginPayload) => {
  const { data } = await credentialsApi.post<LoginResponse>(
    `${URL}/login`,
    userData
  );

  return data;
};

export const useLogin = (
  options?: UseMutationOptions<LoginResponse, ApiError, LoginPayload, void>
) => {
  const { setAuthUser } = useContext(AuthUserContext);

  return useMutation({
    ...options,
    mutationKey: [LOGIN],
    mutationFn: login,
    onSuccess: (...params) => {
      options?.onSuccess?.(...params);

      const [loginResponse] = params;

      const { accessToken, ...user } = loginResponse;

      localStorage.setItem("accessToken", accessToken);

      setAuthUser(user);
    },
  });
};

const logout = async () => {
  await credentialsApi.post(`${URL}/logout`);
};

export const useLogout = (
  options?: UseMutationOptions<void, ApiError, void, void>
) => {
  const { setAuthUser } = useContext(AuthUserContext);

  return useMutation({
    ...options,
    mutationKey: [LOGOUT],
    mutationFn: logout,
    onSuccess: (...params) => {
      options?.onSuccess?.(...params);

      localStorage.removeItem("accessToken");

      setAuthUser(undefined);
    },
  });
};
