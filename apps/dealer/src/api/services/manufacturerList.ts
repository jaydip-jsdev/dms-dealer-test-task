import type { ManufacturerListResponse } from "src/types";

import { api } from "../client";

export const fetchAllManufacturer =
  async (): Promise<ManufacturerListResponse> => {
    const { data } = await api.get<ManufacturerListResponse>("/manufacturer");
    return data;
  };

export const requestManufacturerByCode = async (
  code: string,
): Promise<ManufacturerListResponse> => {
  const { data } = await api.post<ManufacturerListResponse>(
    "/manufacturer/request-authorization",
    {
      manufacturerCode: code,
    },
  );
  return data;
};
