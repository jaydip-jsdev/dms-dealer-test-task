import type {
  ComplaintData,
  ComplaintListType,
} from "../../../packages/ui/src/common/components/ComplaintManagement/types";

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  isError: boolean;
  message: string;
  data: T;
  meta: PaginationMeta;
}

export interface PaginatedApiResponse<T> {
  isError: boolean;
  message: string;
  data: T[];
  meta: PaginationMeta;
}

export interface ManufacturerListData {
  manufacturerCode: string;
  manufacturerName: string;
  gstNumber: string;
  address: string;
  requestedStatus: string;
  permissions: Permissions;
}
export type ComplaintStatusResponse = {
  id: number;
  complaintNumber: string;
  status: string;
  updatedAt: string;
};

export type OrderManagementData = {
  orderNumber: string;
  orderRefNumber: string;
  billingPartyName: string;
  partyName: string;
  address: string;
  partyGroup: string;
  itemName: string;
  status: string;
  orderDate: string;
  lotNumber: string;
  grade: string;
  subGrade: number;
  boxPieces: number;
  quantity: string;
  copsPieces: number;
  rate: string;
  remark: string;
  design: string;
  color: string;
  shade: string;
  ends: string;
  width: number | string;
  length: number | string;
  approvedByName: string;
  approvedQuantity: string;
};

export type ActionLogsListResponse = PaginatedApiResponse<ActionLogsData>;
export type OrderManagementResponse = PaginatedApiResponse<OrderManagementData>;

export interface ActionlogPayload {
  followUpDate: string;
  followUpBy: string;
  contactPerson: string;
  description: string;
  isVisited: boolean;
  visitedDate: string;
  visitDescription: string;
}
export interface ActionLogsData {
  id: number;
  complaintId: number;
  followUpDate: string;
  followUpBy: string;
  contactPerson: string;
  description: string;
  isVisited: boolean;
  visitedDate: string;
  visitDescription: string;
  createdAt: string;
  updatedAt: string;
  isClosingEntry: boolean;
  closingRemark: string;
  closingDate: string;
  closingBy: string;
}

export interface ApiResponse<T> {
  isError: boolean;
  message: string;
  data: T;
}
export type AddActionLogResponse = ApiResponse<ActionLogsData>;

export interface Permissions {
  orderEntryAccess: boolean;
  orderReportAccess: boolean;
  outstandingReportAccess: boolean;
  ledgerReportAccess: boolean;
  complaintManagementAccess: boolean;
  chatbotAccess: boolean;
}
export interface AddUpdateComplaintPayload {
  complaintDate: string;
  complaintTime: string;
  complaintType: string;
  complaintDescription: string;
  concernPersonName: string;
  contactNumber: string;
  referenceInvoiceNo: string;
  invoiceDate: string;
  dealerCode?: string;
  complaintBy: string;
}
export type AddUpdateResponse<T> = {
  isError: boolean;
  message: string;
  data: T[];
};

export type AddUpdateComplaintResponse = AddUpdateResponse<ComplaintData>;

export type ManufacturerListResponse =
  PaginatedApiResponse<ManufacturerListData>;

export interface BillingPartyApprovals {
  manufacturerName: string;
  approvalStatus: "approved" | "pending" | "rejected";
}
export type ComplaintQueryParamsType = {
  manufacturerCode: string;
  search?: string;
  page?: number;
  limit?: number;
  orderBy?: string;
  sort?: "ASC" | "DESC";
};
export type ComplaintResponse = PaginatedApiResponse<ComplaintListType>;

export interface BillingPartyApiData {
  billingPartyId: number;
  dealerCode: string;
  partyName: string;
  gstNumber: string;
  mobileNumber: string;
  email: string;
  isActive: boolean;
  address?: string;
  approvals: BillingPartyApprovals[];
}

export interface BillingPartyDataById extends Omit<
  BillingPartyApiData,
  "billingPartyId" | "dealerCode" | "approvals"
> {
  id: number;
}

export interface BillingPartyPayload {
  partyName: string;
  gstNumber: string;
  mobileNumber: string;
  address: string;
  email: string;
}

export interface BillingPartyEditPayload extends Partial<BillingPartyPayload> {
  isActive?: boolean;
}

export interface BaseApiResponse<T> {
  isError: boolean;
  message: string;
  data: T;
}

export type DeleteBillingPartyApiResponse = Omit<
  BaseApiResponse<unknown>,
  "data"
>;

export interface ApiErrorResponse {
  isError: boolean;
  code: number;
  message: string;
  data: Record<string, unknown>;
}

export interface RequestApprovalPayload {
  billingPartyId: number;
  manufacturerCode: string;
}

export interface RequestApprovalResponseData {
  billingPartyId: number;
  dealerCode: string;
  manufacturerCode: string;
  approvalStatus: BillingPartyApprovals["approvalStatus"];
  createdAt: string;
}
export const SELECTED_MANUFACTURER = "selectedManufacturer";

export interface QueryParamsType {
  search: string;
  page: number;
  limit: number;
  orderBy?: string;
  sort?: "ASC" | "DESC";
}

export type OrderManagementQueryParamsType = {
  manufacturerCode: string;
  search?: string;
  page?: number;
  limit?: number;
  orderBy?: string;
  sort?: "ASC" | "DESC";
  status?: string;
};

export interface OrderConfigObj {
  label: string;
  isActive: boolean;
}

export const ORDER_CONFIG_KEYS = [
  "company",
  "orderRefNo",
  "partyGroup",
  "party",
  "address",
  "itemName",
  "lotNo",
  "grade",
  "subGrade",
  "pieceBox",
  "quantity",
  "copsCheese",
  "rate",
  "remark",
  "design",
  "colour",
  "shade",
  "ends",
  "width",
  "length",
] as const;

export type OrderConfig = (typeof ORDER_CONFIG_KEYS)[number];

export type OrderConfigData = Record<OrderConfig, OrderConfigObj> & {
  manufacturerCode: string;
};

export type OrderConfigResponse = ApiResponse<OrderConfigData>;

export interface DropdownBillingPartyObj {
  id: number;
  name: string;
}
export type DropdownBillingPartyData = DropdownBillingPartyObj[];
export type DropdownBillingPartyResponse =
  ApiResponse<DropdownBillingPartyData>;

export interface DropdownPartyGroupObj {
  groupCode: string;
  groupName: string;
}
export type DropdownPartyGroupData = DropdownPartyGroupObj[];
export type DropdownPartyGroupResponse = ApiResponse<DropdownPartyGroupData>;

export interface DropdownPartyNameObj {
  partyCode: string;
  partyName: string;
  address: string;
}
export type DropdownPartyNameData = DropdownPartyNameObj[];
export type DropdownPartyNameResponse = ApiResponse<DropdownPartyNameData>;

export interface DropdownItemNameObj {
  itemCode: string;
  itemName: string;
}
export type DropdownItemNameData = DropdownItemNameObj[];
export type DropdownItemNameResponse = ApiResponse<DropdownItemNameData>;

export interface DropdownLotNoObj {
  lotNumber: string;
  lotName: string;
}
export type DropdownLotNoData = DropdownLotNoObj[];
export type DropdownLotNoResponse = ApiResponse<DropdownLotNoData>;

export interface DropdownGradeObj {
  gradeCode: string;
  gradeName: string;
}
export type DropdownGradeData = DropdownGradeObj[];
export type DropdownGradeResponse = ApiResponse<DropdownGradeData>;

export interface DropdownSubGradeObj {
  subGradeCode: number;
  subGradeName: string;
}
export type DropdownSubGradeData = DropdownSubGradeObj[];
export type DropdownSubGradeResponse = ApiResponse<DropdownSubGradeData>;

export interface DropdownRateObj {
  itemRate: number;
}
export type DropdownRateResponse = ApiResponse<DropdownRateObj>;

export interface DropdownRateQueryParamsType {
  itemCode: string;
  gradeName: string;
  subGradeCode: number;
}

export interface EditingOrderData extends Partial<
  Omit<OrderManagementData, "partyGroup" | "groupCode">
> {
  partyGroup?: string | number;
  itemName?: string;
  grade?: string;
  groupCode?: string;
  itemCode?: string;
  itemGrade?: string;
}

export interface CreateOrderPayload {
  manufacturerCode: string;
  billingPartyId: number;
  itemCode: string;
  subGradeCode: number;
  boxPieces?: number;
  itemQuantity?: number;
  copsPieces?: number;
  rate?: number;
  orderRemark?: string;
  lotNumber?: string;
  itemGrade: string;
  orderRefNumber?: string;
  groupCode: string | number;
  partyCode: string;
  agePercentage?: number;
  itemDesign?: string;
  itemColor?: string;
  shadeName?: string;
  beamEnds?: number;
  beamWidth?: number;
  beamLength?: number;
}

export interface CreateOrderData {
  id: string;
  manufacturerCode: string;
  dealerCode: string;
  billingPartyId: number;
  orderNumber: string;
  orderDate: string;
  itemCode: string;
  lotNumber: string;
  itemGrade: string;
  subGradeCode: number;
  boxPieces: number;
  itemQuantity: number;
  copsPieces: number;
  itemRate: number;
  mrpRate: number;
  itemAmount: number;
  entryDate: string;
  orderStatus: string;
  approvalDate: string | null;
  orderRemark: string;
  orderNumber1: number;
  groupCode: string;
  partyCode: string;
  orderRefNumber: string;
  approvalStatus: string | null;
  approvedByName: string | null;
  approvedQuantity: number;
  agePercentage: string;
  itemDesign: string;
  itemColor: string;
  shadeName: string;
  beamEnds: number;
  beamWidth: number;
  beamLength: number;
  createdAt: string;
  updatedAt: string;
}

export type CreateOrderResponse = BaseApiResponse<CreateOrderData>;

export type UpdateOrderPayload = Omit<CreateOrderPayload, "manufacturerCode">;

export type UpdateOrderResponse = BaseApiResponse<CreateOrderData>;

export interface OrderDetailResponseData {
  id: string;
  manufacturerCode: string;
  dealerCode: string;
  orderNumber: string;
  orderDate: string;
  boxPieces: number;
  itemQuantity: string | number;
  copsPieces: number;
  itemRate: string | number;
  mrpRate: string | number;
  itemAmount: string | number;
  entryDate: string;
  orderStatus: string;
  approvalDate: string | null;
  orderRemark: string;
  orderRefNumber: string;
  approvalStatus: string | null;
  approvedByName: string | null;
  approvedQuantity: string | number;
  agePercentage: string | number;
  itemDesign: string;
  itemColor: string;
  shadeName: string;
  beamEnds: number;
  beamWidth: string | number;
  beamLength: string | number;
  billingParty?: DropdownBillingPartyObj;
  partyGroup?: DropdownPartyGroupObj;
  partyName?: DropdownPartyNameObj;
  itemName?: DropdownItemNameObj;
  grade?: DropdownGradeObj;
  subGrade?: DropdownSubGradeObj;
  lotNumber?: DropdownLotNoObj;
}

export type GetOrderByIdResponse = BaseApiResponse<OrderDetailResponseData>;
