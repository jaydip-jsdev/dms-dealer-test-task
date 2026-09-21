import type { QueryParamsType, SubGradeListResponse } from "../../types";
import { getCleanUrl } from "../../utils";
import { api } from "../client";

export const fetchSubGrade = async (
  params: QueryParamsType,
): Promise<SubGradeListResponse> => {
  const url = getCleanUrl(params, "sub-grade");
  const { data } = await api.get<SubGradeListResponse>(url);
  return data;
};
