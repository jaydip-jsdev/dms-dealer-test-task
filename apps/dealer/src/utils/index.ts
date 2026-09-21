import { SELECTED_MANUFACTURER } from "./constants";

export const getCleanUrl = (
  params: Record<string, unknown>,
  endpoint: string,
) => {
  const cleanParams = Object.entries(params).reduce(
    (acc, [key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        acc[key] = String(value);
      }
      return acc;
    },
    {} as Record<string, string>,
  );

  const queryString = new URLSearchParams(cleanParams).toString();

  const url = queryString ? `/${endpoint}?${queryString}` : `/${endpoint}`;
  return url;
};

export const getManufacturerCodeFromLocal = () =>
  localStorage.getItem(SELECTED_MANUFACTURER) || "";
