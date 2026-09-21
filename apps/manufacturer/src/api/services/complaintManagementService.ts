import type {
  ActionlogPayload,
  ActionLogsListResponse,
  AddActionLogResponse,
  AddUpdateComplaintPayload,
  AddUpdateComplaintResponse,
  AllDealerResponse,
  ComplaintByIdResponse,
  ComplaintListResponse,
  ComplaintStatusResponse,
  DeleteComplaintsPayload,
  DeleteComplaintsResponse,
  QueryParamsType,
} from "../../types";
import { getCleanUrl } from "../../utils";
import { api } from "../client";

export const fetchAllComplaints = async (
  params: QueryParamsType,
): Promise<ComplaintListResponse> => {
  const url = getCleanUrl(params, "complaint");
  const { data } = await api.get<ComplaintListResponse>(url);
  return data;
};

export const fetchComplaintsById = async (
  id: string,
): Promise<ComplaintByIdResponse> => {
  const { data } = await api.get<ComplaintByIdResponse>(`/complaint/${id}`);
  return data;
};

export const addComplaint = async (
  payload: AddUpdateComplaintPayload,
): Promise<AddUpdateComplaintResponse> => {
  const { data } = await api.post<AddUpdateComplaintResponse>(
    "/complaint/add",
    payload,
  );
  return data;
};

export const fetchAllDealer = async (): Promise<AllDealerResponse> => {
  const { data } = await api.get<AllDealerResponse>(
    "/complaint/dealers/dropdown",
  );
  return data;
};

export const updateComplaint = async (
  id: string,
  payload: AddUpdateComplaintPayload,
): Promise<AddUpdateComplaintResponse> => {
  const { data } = await api.patch<AddUpdateComplaintResponse>(
    `complaint/${id}`,
    payload,
  );
  return data;
};

export const openComplaintById = async (
  id: string,
): Promise<ComplaintStatusResponse> => {
  const { data } = await api.patch<ComplaintStatusResponse>(
    `/complaint/${id}/open`,
  );
  return data;
};

export const closeComplaintById = async (
  id: string,
  closingRemark: string,
): Promise<ComplaintStatusResponse> => {
  const { data } = await api.patch<ComplaintStatusResponse>(
    `/complaint/${id}/close`,
    { closingRemark },
  );
  return data;
};

export const reopenComplaintById = async (
  id: string,
): Promise<ComplaintStatusResponse> => {
  const { data } = await api.patch<ComplaintStatusResponse>(
    `/complaint/${id}/reopen`,
  );
  return data;
};

export const deleteComplaints = async (
  payload: DeleteComplaintsPayload,
): Promise<DeleteComplaintsResponse> => {
  const { data } = await api.delete<DeleteComplaintsResponse>(`/complaint`, {
    data: payload,
  });

  return data;
};

export const fetchComplaintActionLogsById = async (
  id: string,
): Promise<ActionLogsListResponse> => {
  const { data } = await api.get<ActionLogsListResponse>(
    `/complaint/${id}/action-log`,
  );
  return data;
};

export const addActionLogById = async (
  id: string,
  payload: ActionlogPayload,
): Promise<AddActionLogResponse> => {
  const { data } = await api.post<AddActionLogResponse>(
    `/complaint/${id}/action-log`,
    payload,
  );
  return data;
};
