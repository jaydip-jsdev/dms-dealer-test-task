import type {
  DeliveryOrdersManagementListResponse,
  QueryParamsType,
} from "../../types";
import { getCleanUrl } from "../../utils";
import { api } from "../client";

export const fetchAllDeliveryOrderList = async (
  params: QueryParamsType,
): Promise<DeliveryOrdersManagementListResponse> => {
  const url = getCleanUrl(params, "delivery-orders");
  const { data } = await api.get<DeliveryOrdersManagementListResponse>(url);
  return data;
};
