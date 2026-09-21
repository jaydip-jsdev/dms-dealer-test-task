import type {
  OrderManagementResponse,
  OrderManagementQueryParamsType,
  OrderConfigResponse,
  DropdownPartyGroupResponse,
  DropdownBillingPartyResponse,
  DropdownPartyNameResponse,
  DropdownItemNameResponse,
  DropdownLotNoResponse,
  DropdownGradeResponse,
  DropdownSubGradeResponse,
  DropdownRateResponse,
  DropdownRateQueryParamsType,
  CreateOrderPayload,
  CreateOrderResponse,
  UpdateOrderPayload,
  UpdateOrderResponse,
  GetOrderByIdResponse,
} from "src/types";

import { getCleanUrl } from "../../../../../packages/ui/src/utils/index";
import { getManufacturerCodeFromLocal } from "../../utils/index";
import { api } from "../client";

export const fetchOrderManagementList = async (
  params: OrderManagementQueryParamsType,
): Promise<OrderManagementResponse> => {
  const url = getCleanUrl(params, "orders");
  const { data } = await api.get<OrderManagementResponse>(url);
  return data;
};

export const fetchOrderConfig = async (): Promise<OrderConfigResponse> => {
  const { data } = await api.get<OrderConfigResponse>(
    `orders/orderConfig/${getManufacturerCodeFromLocal()}`,
  );
  return data;
};

export const fetchDropdownBillingParty =
  async (): Promise<DropdownBillingPartyResponse> => {
    const { data } = await api.get<DropdownBillingPartyResponse>(
      `orders/dropdown/billingParty?manufacturerCode=${getManufacturerCodeFromLocal()}`,
    );
    return data;
  };

export const fetchDropdownPartyGroup =
  async (): Promise<DropdownPartyGroupResponse> => {
    const { data } = await api.get<DropdownPartyGroupResponse>(
      `orders/dropdown/partyGroup?manufacturerCode=${getManufacturerCodeFromLocal()}`,
    );
    return data;
  };

export const fetchDropdownPartyName = async (
  partyGroupCode: string,
): Promise<DropdownPartyNameResponse> => {
  const { data } = await api.get<DropdownPartyNameResponse>(
    `orders/dropdown/partyName?manufacturerCode=${getManufacturerCodeFromLocal()}&partyGroupCode=${partyGroupCode}`,
  );
  return data;
};

export const fetchDropdownItemName =
  async (): Promise<DropdownItemNameResponse> => {
    const { data } = await api.get<DropdownItemNameResponse>(
      `orders/dropdown/itemName?manufacturerCode=${getManufacturerCodeFromLocal()}`,
    );
    return data;
  };

export const fetchDropdownLotNo = async (
  itemCode: string,
): Promise<DropdownLotNoResponse> => {
  const { data } = await api.get<DropdownLotNoResponse>(
    `orders/dropdown/lotNo?manufacturerCode=${getManufacturerCodeFromLocal()}&itemCode=${itemCode}`,
  );
  return data;
};

export const fetchDropdownGrade = async (): Promise<DropdownGradeResponse> => {
  const { data } = await api.get<DropdownGradeResponse>(
    `orders/dropdown/grade?manufacturerCode=${getManufacturerCodeFromLocal()}`,
  );
  return data;
};

export const fetchDropdownSubGrade = async (
  gradeCode: string,
): Promise<DropdownSubGradeResponse> => {
  const { data } = await api.get<DropdownSubGradeResponse>(
    `orders/dropdown/subGrade?manufacturerCode=${getManufacturerCodeFromLocal()}&gradeCode=${gradeCode}`,
  );
  return data;
};

export const fetchDropdownRate = async (
  params: DropdownRateQueryParamsType,
): Promise<DropdownRateResponse> => {
  const { data } = await api.get<DropdownRateResponse>(
    `orders/dropdown/rate?manufacturerCode=${getManufacturerCodeFromLocal()}&itemCode=${params.itemCode}&gradeName=${params.gradeName}&subGradeCode=${params.subGradeCode}`,
  );
  return data;
};

export const createOrder = async (
  payload: CreateOrderPayload,
): Promise<CreateOrderResponse> => {
  const { data } = await api.post<CreateOrderResponse>(
    "orders/create",
    payload,
  );
  return data;
};

export const updateOrder = async (
  manufacturerCode: string,
  orderId: string,
  payload: UpdateOrderPayload,
): Promise<UpdateOrderResponse> => {
  const { data } = await api.patch<UpdateOrderResponse>(
    `orders/${manufacturerCode}/${orderId}`,
    payload,
  );
  return data;
};

export const fetchOrderById = async (
  manufacturerCode: string,
  orderId: string,
): Promise<GetOrderByIdResponse> => {
  const { data } = await api.get<GetOrderByIdResponse>(
    `orders/${manufacturerCode}/${orderId}`,
  );
  return data;
};
