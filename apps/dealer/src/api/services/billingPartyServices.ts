import type { PendingManufacturer } from "src/modules/WelcomePage/Components/types";
import type {
  BaseApiResponse,
  BillingPartyApiData,
  BillingPartyDataById,
  BillingPartyEditPayload,
  BillingPartyPayload,
  DeleteBillingPartyApiResponse,
  RequestApprovalPayload,
  RequestApprovalResponseData,
} from "src/types";

import { api } from "../client";

export const fetchAllBillingParties = async (): Promise<
  BaseApiResponse<BillingPartyApiData[]>
> => {
  const { data } =
    await api.get<BaseApiResponse<BillingPartyApiData[]>>("/billing-party");
  return data;
};

export const getBillingPartyById = async (
  billingPartyId: number,
): Promise<BaseApiResponse<BillingPartyDataById>> => {
  const { data } = await api.get<BaseApiResponse<BillingPartyDataById>>(
    `/billing-party/${billingPartyId}`,
  );
  return data;
};

export const deleteBillingPartyById = async (
  billingPartyId: number,
): Promise<DeleteBillingPartyApiResponse> => {
  const { data } = await api.delete<DeleteBillingPartyApiResponse>(
    `/billing-party/${billingPartyId}`,
  );
  return data;
};

export const saveBillingParty = async (
  payload: BillingPartyPayload,
): Promise<BaseApiResponse<BillingPartyApiData>> => {
  const { data } = await api.post<BaseApiResponse<BillingPartyApiData>>(
    "/billing-party",
    payload,
  );
  return data;
};

export const editBillingParty = async (
  billingPartyId: number,
  payload: BillingPartyEditPayload,
): Promise<BaseApiResponse<BillingPartyApiData>> => {
  const { data } = await api.patch<BaseApiResponse<BillingPartyApiData>>(
    `/billing-party/${billingPartyId}`,
    payload,
  );
  return data;
};

export const fetchPendingManufacturers = async (
  billingPartyId: number,
): Promise<BaseApiResponse<PendingManufacturer[]>> => {
  const { data } = await api.get<BaseApiResponse<PendingManufacturer[]>>(
    `/billing-party/pending-manufacturers/${billingPartyId}`,
  );
  return data;
};

export const requestBillingPartyApproval = async (
  payload: RequestApprovalPayload,
): Promise<BaseApiResponse<RequestApprovalResponseData>> => {
  const { data } = await api.post<BaseApiResponse<RequestApprovalResponseData>>(
    "/billing-party/request-approval",
    payload,
  );
  return data;
};
