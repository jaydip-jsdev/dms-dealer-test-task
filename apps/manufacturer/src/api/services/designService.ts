import type { DesignListResponse, QueryParamsType } from "../../types";
import { getCleanUrl } from "../../utils";
import { api } from "../client";

export const fetchDesigns = async (params: QueryParamsType) => {
  const url = getCleanUrl(params, "design/list");
  const { data } = await api.get<DesignListResponse>(url);
  return data;
};
