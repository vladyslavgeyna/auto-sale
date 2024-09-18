import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

const API_URL = String(import.meta.env.VITE_API_URL) + "/api";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: false,
});

export const credentialsApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

//TODO: Add interceptors to add token to requests
export const authApi = axios.create({
  baseURL: API_URL,
  withCredentials: false,
});
