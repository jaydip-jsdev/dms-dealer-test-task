import type { ComplaintListType } from "@repo/ui";
import type { PaginatedApiResponse } from "src/types";
export interface SystemCheck {
  id: number;
  name: string;
  status: "approved" | "rejected" | "pending";
}

export interface Manufacturer {
  id: number;
  name: string;
  gstNo: string;
  address: string;
  action: "open" | "request-approval";
}

export type ModalValules = {
  partyName: string;
  gstNo: string;
  address: string;
  mobileNo: string;
  email: string;
};

export type ModalState = {
  isVisible: boolean;
  status: "Add" | "Edit";
};

export type ComplaintQueryParamsType = {
  manufacturerCode: string;
  search?: string;
  page?: number;
  limit?: number;
  orderBy?: string;
  sort?: "ASC" | "DESC";
};
export type ComplaintResponse = PaginatedApiResponse<ComplaintListType>;

export interface PendingManufacturer {
  manufacturerCode: string;
  manufacturerName: string;
  gstNumber: string;
  address: string | null;
}
