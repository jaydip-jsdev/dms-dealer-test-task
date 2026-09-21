import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

import { PATH } from "../Router/routerPath";

import { onUnauthorized } from ".";

interface ApiClientConfig {
  baseURL: string;
  getToken: () => string | null;
}

export const createHttpClient = ({
  baseURL,
  getToken,
}: ApiClientConfig): AxiosInstance => {
  const client = axios.create({
    baseURL,
    timeout: 30000,
    headers: { "Content-Type": "application/json" },
  });

  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  client.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (
          window.location.pathname !== PATH.LOGIN &&
          window.location.pathname !== PATH.GETOTP
        ) {
          onUnauthorized();
        }
      }
      return Promise.reject(error);
    },
  );

  return client;
};
