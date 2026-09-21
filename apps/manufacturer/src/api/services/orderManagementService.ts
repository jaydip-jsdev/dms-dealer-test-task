import type {
  OrderManagementFiltersResponse,
  OrderManagementListResponse,
  OrderManagementQueryParamsType,
} from "../../types";
import { getCleanUrl } from "../../utils";
import { api } from "../client";

export const fetchOrders = async (
  params: OrderManagementQueryParamsType,
): Promise<OrderManagementListResponse> => {
  const url = getCleanUrl(params, "orders/list");
  const { data } = await api.get<OrderManagementListResponse>(url);
  return data;
};

export const fetchOrdersFilters =
  async (): Promise<OrderManagementFiltersResponse> => {
    const { data } =
      await api.get<OrderManagementFiltersResponse>("orders/filters");
    return data;
  };
