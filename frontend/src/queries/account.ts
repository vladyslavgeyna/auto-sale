import { User } from "@/types";
import { api, ApiError, credentialsApi } from ".";
import { LOGIN, LOGOUT, REFRESH_TOKEN, REGISTER } from "./queryKeys";
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
  options?: UseMutationOptions<User, ApiError, RegistrationPayload, void>
) =>
  useMutation({
    ...options,
    mutationKey: [REGISTER],
    mutationFn: register,
  });

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
) =>
  useMutation({
    ...options,
    mutationKey: [LOGIN],
    mutationFn: login,
  });

const logout = async () => {
  await credentialsApi.post(`${URL}/logout`);
};

export const useLogout = (
  options?: UseMutationOptions<void, ApiError, void, void>
) =>
  useMutation({
    ...options,
    mutationKey: [LOGOUT],
    mutationFn: logout,
  });

export const refreshToken = async () => {
  const { data } = await credentialsApi.post<LoginResponse>(`${URL}/refresh`);

  return data;
};

export const useRefreshToken = (
  options?: UseMutationOptions<LoginResponse, ApiError, void, void>
) =>
  useMutation({
    ...options,
    mutationKey: [REFRESH_TOKEN],
    mutationFn: refreshToken,
  });
