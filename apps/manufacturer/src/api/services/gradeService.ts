import type { GradeListResponse, QueryParamsType } from "../../types";
import { getCleanUrl } from "../../utils";
import { api } from "../client";

export const fetchGrades = async (
  params: QueryParamsType,
): Promise<GradeListResponse> => {
  const url = getCleanUrl(params, "grade");
  const { data } = await api.get<GradeListResponse>(url);
  return data;
};
