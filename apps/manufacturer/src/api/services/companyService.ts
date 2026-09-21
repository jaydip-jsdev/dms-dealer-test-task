import type { CompanyListResponse, QueryParamsType } from "../../types";
import { getCleanUrl } from "../../utils";
import { api } from "../client";

export const fetchCompanies = async (params: QueryParamsType) => {
  const url = getCleanUrl(params, "company");
  const { data } = await api.get<CompanyListResponse>(url);
  return data;
};
