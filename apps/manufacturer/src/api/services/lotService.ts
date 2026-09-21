import type {
  LotListResponse,
  QueryParamsType,
  UpdateIsActiveLotPayload,
  UpdateIsActiveLotResponse,
} from "../../types";
import { getCleanUrl } from "../../utils";
import { api } from "../client";

export const fetchLots = async (
  params: QueryParamsType,
): Promise<LotListResponse> => {
  const url = getCleanUrl(params, "lot");
  const { data } = await api.get<LotListResponse>(url);
  return data;
};

export const updateIsActiveLot = async (
  id: string,
  payload: UpdateIsActiveLotPayload,
): Promise<UpdateIsActiveLotResponse> => {
  const { data } = await api.patch<UpdateIsActiveLotResponse>(
    `lot/${id}/update-isActive`,
    payload,
  );
  return data;
};
