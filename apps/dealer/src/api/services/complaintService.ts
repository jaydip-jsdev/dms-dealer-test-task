import type {
  ComplaintQueryParamsType,
  ComplaintResponse,
} from "src/modules/WelcomePage/Components/types";
import type {
  ActionlogPayload,
  ActionLogsListResponse,
  AddActionLogResponse,
  AddUpdateComplaintPayload,
  AddUpdateComplaintResponse,
  ComplaintStatusResponse,
} from "src/types";

import type { ApiPayloadComplaint } from "../../../../../packages/ui/src/common/components/ComplaintManagement/types";
import { getCleanUrl } from "../../../../../packages/ui/src/utils/index";
import { api } from "../client";

export const fetchComplaints = async (
  params: ComplaintQueryParamsType,
): Promise<ComplaintResponse> => {
  const url = getCleanUrl(params, "complaint");
  const { data } = await api.get<ComplaintResponse>(url);
  return data;
};

export const addComplaint = async (
  payload: ApiPayloadComplaint,
): Promise<AddUpdateComplaintResponse> => {
  const { data } = await api.post("/complaint/add", payload);
  return data;
};
export const changeStatusComplaintById = async (
  id: string,
  status: string,
  closingRemark?: string,
): Promise<ComplaintStatusResponse> => {
  const finalStatus = status.toLowerCase().replace(/[-\s]+/g, "");

  const { data } = await api.patch<ComplaintStatusResponse>(
    `/complaint/${id}/${finalStatus}`,
    { closingRemark },
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
export const deleteComplaint = async (payload: string | number) => {
  const ids = payload
    .toString()
    .split(",")
    .map((e) => Number(e));
  const builtPayload = {
    ids,
  };

  const res = await api.delete("/complaint", { data: builtPayload });
  return res;
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
