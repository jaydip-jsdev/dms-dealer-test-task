import type {
  AddDealerPayload,
  AddDealerResponse,
  DealerBillingPartyStatusUpdateResponse,
  DealerDetailsResponse,
  DealerManagementDeliveryAddressResponse,
  DealerManagementListResponse,
  DealerManagementQueryParamsType,
  DealerPermissionPayload,
  DealerPermissionResponse,
  DealerPermissionUpdateResponse,
  DealerUpdateStatusPayload,
  UpdateDealerStatusResponse,
} from "../../types";
import { getCleanUrl } from "../../utils";
import { api } from "../client";

export const addDealer = async (
  payload: AddDealerPayload,
): Promise<AddDealerResponse> => {
  const { data } = await api.post<AddDealerResponse>("/dealers/add", payload);
  return data;
};

export const fetchAllDealers = async (
  params: DealerManagementQueryParamsType,
): Promise<DealerManagementListResponse> => {
  const url = getCleanUrl(params, "dealers/list");

  const { data } = await api.get<DealerManagementListResponse>(url);
  return data;
};

export const updateDealerStatusById = async (
  id: string,
  payload: DealerUpdateStatusPayload,
): Promise<UpdateDealerStatusResponse> => {
  const { data } = await api.patch<UpdateDealerStatusResponse>(
    `dealers/${id}/status`,
    payload,
  );
  return data;
};

export const fetchDealerDetailsByCode = async (
  dealerCode: string,
): Promise<DealerDetailsResponse> => {
  const { data } = await api.get<DealerDetailsResponse>(
    `dealers/${dealerCode}`,
  );
  return data;
};

export const fetchDealerDeliveryAddressByCode = async (
  dealerCode: string,
): Promise<DealerManagementDeliveryAddressResponse> => {
  const { data } = await api.get<DealerManagementDeliveryAddressResponse>(
    `/dealers/${dealerCode}/delivery-address`,
  );
  return data;
};

export const updateDealerBillingPartyStatus = async (
  requestId: number,
  payload: DealerUpdateStatusPayload,
): Promise<DealerBillingPartyStatusUpdateResponse> => {
  const { data } = await api.patch<DealerBillingPartyStatusUpdateResponse>(
    `dealers/${requestId}/billing-party/status`,
    payload,
  );
  return data;
};

export const getDealerPermissionByCode = async (
  dealerCode: string,
): Promise<DealerPermissionResponse> => {
  const { data } = await api.get<DealerPermissionResponse>(
    `dealers/permissions/${dealerCode}`,
  );
  return data;
};

export const updateDealerPermissionByCode = async (
  dealerCode: string,
  payload: DealerPermissionPayload,
): Promise<DealerPermissionUpdateResponse> => {
  const { data } = await api.post<DealerPermissionUpdateResponse>(
    `dealers/permissions/${dealerCode}`,
    {
      permissions: payload,
    },
  );
  return data;
};
