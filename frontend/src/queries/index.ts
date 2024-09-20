import { ACCESS_TOKEN } from "@/utils/constants";
import { QueryClient } from "@tanstack/react-query";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

export type ApiError = AxiosError<{
  error: string;
  message: string | string[];
  statusCode: number;
}>;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

const requestAuthInterceptor = (config: InternalAxiosRequestConfig) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
};

const API_URL = String(import.meta.env.VITE_API_URL) + "/api";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: false,
});

export const credentialsApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

credentialsApi.interceptors.request.use(requestAuthInterceptor);

//TODO: Add interceptor to response to refresh token
export const authApi = axios.create({
  baseURL: API_URL,
  withCredentials: false,
});

authApi.interceptors.request.use(requestAuthInterceptor);
