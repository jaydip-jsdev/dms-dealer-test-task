import { createHttpClient } from "@repo/ui";
export const api = createHttpClient({
  baseURL: import.meta.env.VITE_MANUFACTURER_API_URL,
  getToken: () => localStorage.getItem("token"),
});
