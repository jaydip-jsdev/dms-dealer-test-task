import type {
  ItemListResponse,
  QueryParamsType,
  UpdateIsActiveItemPayload,
  UpdateIsActiveItemResponse,
} from "../../types";
import { getCleanUrl } from "../../utils";
import { api } from "../client";

export const fetchItem = async (
  params: QueryParamsType,
): Promise<ItemListResponse> => {
  const url = getCleanUrl(params, "item/list");
  const { data } = await api.get<ItemListResponse>(url);
  return data;
};

export const updateIsActiveItem = async (
  id: string,
  payload: UpdateIsActiveItemPayload,
): Promise<UpdateIsActiveItemResponse> => {
  const { data } = await api.patch<UpdateIsActiveItemResponse>(
    `item/${id}/update-isActive`,
    payload,
  );
  return data;
};
