// Import directly from UI package
import { createHttpClient } from "@repo/ui";

export const api = createHttpClient({
  baseURL: import.meta.env.VITE_DEALER_API_URL,
  getToken: () => localStorage.getItem("token"),
});
