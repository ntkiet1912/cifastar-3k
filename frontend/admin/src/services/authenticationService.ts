import {
  getToken,
  removeToken,
  setToken
} from "./localStorageService";
import httpClient from "../configurations/httpClient";
import {
  API
} from "../configurations/configuration";
import { useAuthStore } from "@/stores";

export const login = async (loginIdentifier: string, password: string) => {
  const response = await httpClient.post(API.LOGIN, {
    loginIdentifier: loginIdentifier,
    password: password,
  });

  const token = response.data?.result?.token;
  const user = response.data?.result?.user;

  if (token) {
    setToken(token);
    
    // Update Zustand store
    useAuthStore.getState().setAuth(token, user || {
      id: response.data?.result?.userId || '',
      email: loginIdentifier,
      username: loginIdentifier,
    });
  }

  return response;
};

export const logOut = () => {
  removeToken();
  // Clear Zustand store
  useAuthStore.getState().clearAuth();
};

export const isAuthenticated = () => {
  return getToken();
};