import type { TablePaginationConfig } from "antd";
import type { SorterResult } from "antd/es/table/interface";

export type SubscriptionType =
  | "yearly"
  | "half_yearly"
  | "quarterly"
  | "monthly";
export interface SubscriptionListType {
  subscriptionCode: string;
  allowedDealersNumber: number;
  subscriptionType: SubscriptionType;
  startDate: string;
  endDate: string;
  invoiceNumber: string;
  invoiceDate: string;
  isActive: boolean;
  createdAt: string;
  createdBy: string;
  updatedBy: string;
  updatedAt: string;
}

export interface DeliveryOrderAddonType {
  party_group?: string;
  lot_no?: string;
  order_quantity?: string;
  sale_quantity?: string;
  do_quantity?: string;
  balance_quantity?: string;
  payment_terms?: string;
  list_price?: string;
  basic_rate?: string;
  net_rate?: string;
  advanced_received?: string;
  grade?: string;
  subgrade?: string;
  cops_cheese?: string;
  remark?: string;
  order_date?: string;
}

export interface DeliveryOrderType {
  sr_no: number;
  code: string;
  order_no: string;
  party_name: string;
  item_name: string;
  quantity: string;
  address: string;
  gst: string;
  rate: string;
  pieces_box: string;
  status: string;
  addon?: DeliveryOrderAddonType;
}

export interface ComplaintListType {
  sr_no: number;
  code: string;
  complaint_type: string;
  complaint_description: string;
  concern_person_name: string;
  contact_no: number;
  complaint_date: string;
  complaint_by: string;
  status: string;
  dealer_name: string;
  reference_invoice_no: number;
  invoice_date: string;
  created_at: string;
  created_by: string;
}

export interface DealerListType {
  sr_no: number;
  code: string;
  dealer_name: string;
  gst_no: string;
  address: string;
  mobile_no: number;
  contact_person: string;
  whatsapp_no: number;
  status: string;
}
export interface modalType {
  isVisible: boolean;
  status: string;
}

export interface PriceListDataType {
  sr_no: number;
  item_name: string;
  a1: number;
  a2: number;
  a3: number;
  a4: number;
  pq: number;
  clq: string | number;
}

export interface TableCompoProps<T> {
  data: T[];
  loading: boolean;
  pagination: TablePaginationConfig;
  handleTableChange: (
    pagination: TablePaginationConfig,
    filters: unknown,
    sorter: SorterResult<T> | SorterResult<T>[],
  ) => void;
  loadData?: () => void;
}

export type SubscriptionsDealersType = {
  dealerCode: string;
  dealerName: string;
  gstNumber: string;
  mobileNumber: string;
  contactPerson: string;
  whatsappNumber: string;
  email: string;
  isActive: boolean;
};

export type SubscriptionDetailsType = {
  activeDealerCount: number;
  allowedDealersNumber: string;
  endDate: string;
  dealers: SubscriptionsDealersType[];
  inactiveDealerCount: number;
  startDate: string;
  subscriptionCode: string;
};

export type UnionKey<T extends readonly string[]> = T[number];

export const COMPANY_KEYS = [
  "id",
  "manufacturerCode",
  "companyCode",
  "companyName",
  "officeAddress",
  "factoryAddress",
  "companyVersion",
  "businessCode",
  "officePhone",
  "gstNumber",
  "email",
  "createdAt",
  "updatedAt",
] as const;

export type CompanyKey = UnionKey<typeof COMPANY_KEYS>;

export type Company = Record<CompanyKey, string>;

export const DESIGN_KEYS = ["designNumber"] as const;

export type DesignKey = UnionKey<typeof DESIGN_KEYS>;

export type Design = Record<DesignKey, string>;

export const LOT_KEYS = ["id", "lotNumber", "itemName"] as const;
export const SUB_GRADE_KEYS = ["grade", "subGrade"] as const;

export type SubGradeKey = UnionKey<typeof SUB_GRADE_KEYS>;

export type SubGrade = Record<SubGradeKey, string>;

export type LotKey = UnionKey<typeof LOT_KEYS>;
export type Lot = Record<LotKey, string> & { isActive: boolean };

export const ITEMS_KEYS = [
  "id",
  "itemCode",
  "itemName",
  "hsnCode",
  "itemGroup",
  "itemCategory",
  "itemUnit",
] as const;
export type ItemKey = UnionKey<typeof ITEMS_KEYS>;
export type Item = Record<ItemKey, string> & { isActive: boolean };

export const GRADE_KEYS = ["gradeCode", "grade"] as const;

export type GradeKey = UnionKey<typeof GRADE_KEYS>;

export type Grade = Record<GradeKey, string>;

export const PAYMENT_TERM_KEYS = [
  "id",
  "manufacturerCode",
  "paymentCode",
  "paymentName",
  "paymentPercentage",
  "paymentType",
  "dueDays",
  "createdAt",
  "updatedAt",
] as const;

export type PaymentTermKey = UnionKey<typeof PAYMENT_TERM_KEYS>;

export type PaymentTerm = Record<PaymentTermKey, string>;

export const ORDER_MANAGEMENT_STRING_KEYS = [
  "orderNumber",
  "billingPartyName",
  "orderRefNumber",
  "partyName",
  "address",
  "orderDate",
  "status",
  "partyGroup",
  "itemName",
  "lotNumber",
  "grade",
  "quantityInKgs",
  "rate",
  "remark",
  "design",
  "color",
  "shade",
  "ends",
  "width",
  "length",
] as const;

export type OrderManagementKey = UnionKey<typeof ORDER_MANAGEMENT_STRING_KEYS>;

export type OrderManagement = Record<OrderManagementKey, string> & {
  subGrade: number;
  boxPieces: number;
  copsCheese: number;
};

export interface ItemData {
  itemCode: string;
  itemName: string;
}

export interface DealerData {
  dealerCode: string;
  dealerName: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface QueryParamsType {
  search: string;
  page: number;
  limit: number;
  sort?: string;
  order?: "ASC" | "DESC";
}

export interface OrderManagementQueryParamsType extends QueryParamsType {
  itemCode: string;
  dealerCode: string;
  status: string;
}

export interface DealerManagementQueryParamsType extends QueryParamsType {
  status?: string;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
}
export interface DealerUpdateStatusPayload {
  status: string;
  rejectionReason?: string;
}

export interface PaginatedApiResponse<T> {
  isError: boolean;
  message: string;
  data: T[];
  meta: PaginationMeta;
}

export interface ApiResponse<T> {
  isError: boolean;
  message: string;
  data: T;
  meta: PaginationMeta;
}

export interface Dealer {
  dealerCode: string;
  dealerName: string;
}

export interface DealerOption {
  dealers: Dealer[];
}

export interface AddDealerPayload {
  dealerCodes?: string[];
}

export type SubscriptionDetailsResponse = ApiResponse<SubscriptionDetailsType>;

export type CompanyListResponse = PaginatedApiResponse<Company>;

export type DealerOptionResponse = ApiResponse<DealerOption>;

export type DesignListResponse = PaginatedApiResponse<Design>;

export type LotListResponse = PaginatedApiResponse<Lot>;

export type ItemListResponse = PaginatedApiResponse<Item>;

export type GradeListResponse = PaginatedApiResponse<Grade>;

export type SubGradeListResponse = PaginatedApiResponse<SubGrade>;

export type PaymentTermListResponse = PaginatedApiResponse<PaymentTerm>;

export type ComplaintListResponse = PaginatedApiResponse<ComplaintData>;

export type ActionLogsListResponse = PaginatedApiResponse<ActionLogsData>;

export type OrderManagementListResponse = PaginatedApiResponse<OrderManagement>;
export type DealerManagementListResponse =
  PaginatedApiResponse<DealerManagementData>;

export type DeliveryOrdersManagementListResponse =
  PaginatedApiResponse<DeliveryOrdersManagementData>;

export interface OrderManagementFiltersRes {
  itemData: Array<ItemData>;
  dealerData: Array<DealerData>;
  statusData: Array<{ key: string; value: string }>;
}

export interface OrderManagementFiltersResponse {
  isError: boolean;
  message: string;
  data: OrderManagementFiltersRes;
}
export type SubscriptionListResponse =
  PaginatedApiResponse<SubscriptionListType>;

export interface DealerBase {
  dealerName: string;
  gstNumber: string;
  address: string;
  mobileNumber: string;
  contactPerson: string;
  whatsappNumber: string;
  email: string;
  password: string;
}

export interface AddDealerPayload extends DealerBase {
  manufacturerCode: string;
  isActive: boolean;
}

export interface DealerResponse extends Omit<DealerBase, "password"> {
  dealerCode: string;
  createdBy: string;
  updatedBy: string;
  status: "pending" | "approved" | "rejected";
  dealerRequestStatus: "pending" | "approved" | "rejected";
  requestDate: string;
  dealerRequestCreatedAt: string;
  dealerRequestUpdatedAt: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export type AddDealerResponse = {
  isError: boolean;
  message: string;
  data: DealerResponse;
};

export interface SubscriptionQueryParamsType extends QueryParamsType {
  createdBy?: string;
  startDate?: string;
  endDate?: string;
}

export interface SubscriptionFiltersRes {
  createdBy: string[];
}

export interface SubscriptionFiltersResponse {
  isError: boolean;
  message: string;
  data: SubscriptionFiltersRes;
}

export interface UpdateIsActiveLotPayload {
  isActive: boolean;
}
export interface UpdateIsActiveItemPayload {
  isActive: boolean;
}

export interface UpdateIsActiveLotResponse extends UpdateIsActiveLotPayload {
  id: string;
}

export interface UpdateIsActiveItemResponse extends UpdateIsActiveItemPayload {
  id: string;
}

export interface ActionlogPayload {
  followUpDate: string;
  followUpBy: string;
  contactPerson: string;
  description: string;
  isVisited: boolean;
  visitedDate: string;
  visitDescription: string;
}

export interface AddActionLog extends ActionlogPayload {
  id: number;
  complaintId: string;
  createdAt: string;
}

export interface AddActionLogResponse {
  isError: boolean;
  message: string;
  data: ActionLogsData;
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
  dealerCode: string;
  complaintBy: string;
}

export type ComplaintData = {
  id: number;
  manufacturerCode: string;
  complaintNumber: string;
  complaintDate: string;
  complaintTime: string;
  complaintType: string;
  complaintDescription: string;
  concernPersonName: string;
  contactNumber: string;
  complaintBy: string;
  status: string;
  referenceInvoiceNo: string;
  invoiceDate: string;
  createdBy: string;
  createdAt: string;
  dealerName: string;
  dealerCode: string;
};

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

export type AddUpdateComplaintResponse = {
  isError: boolean;
  message: string;
  data: ComplaintData[];
};

export type ComplaintByIdResponse = {
  isError: boolean;
  message: string;
  data: ComplaintData;
};

export type DealerResponseData = {
  dealerCode: string;
  dealerName: string;
};

export type AllDealerResponse = {
  isError: boolean;
  message: string;
  data: DealerResponseData[];
};

export type DropDownOptionType = {
  label: string;
  value: string;
};

export type ComplaintStatusResponse = {
  id: number;
  complaintNumber: string;
  status: string;
  updatedAt: string;
};

export interface DeleteComplaintsPayload {
  ids: number[];
}

export interface DeleteComplaintsResponse {
  message: string;
}

export interface DeliveryOrdersManagementData {
  deliveryOrderNumber: string;
  orderNumber: string;
  partyGroup: string;
  partyName: string;
  itemName: string;
  lotNumber: string;
  orderQuantityInKgs: number;
  saleQuantityInKgs: number;
  balanceQuantityInKgs: number;
  doQuantityInKgs: number;
  address: string;
  gst: string;
  paymentTerms: string;
  listPrice: number;
  rate: number;
  basicRate: number;
  netRate: number;
  advanceReceived: boolean;
  grade: string;
  subGrade: number;
  boxPieces: number;
  copsCheese: string;
  doDateAndTime: string;
  remark: string;
  orderDate: string;
  status: string;
}

export interface RemoveDealerType {
  isVisible: boolean;
  dealerCode: string;
}

export interface Orders {
  totalPendingOrders: number;
  totalPendingQuantity: number;
}

export interface Complaints {
  totalPendingComplaints: number;
}

export interface Dealers {
  active: number;
  inactive: number;
}

export interface DashboardStatsType {
  orders: Orders;
  complaints: Complaints;
  dealers: Dealers;
  lastSyncAt: string;
}

export type DashboardStatsResponse = {
  isError: boolean;
  message: string;
  data: DashboardStatsType;
};

export interface DealerManagementData {
  id: number;
  dealerCode: string;
  manufacturerCode: string;
  status: string;
  requestDate: string;
  requestRemark: string;
  dealer: DealerData;
}

export interface DealerData {
  code: string;
  dealerName: string;
  email: string;
  mobileNumber: string;
  gstNumber: string;
  address: string;
  contactPerson: string;
  whatsappNumber: string;
  createdBy: string;
  updatedBy: string;
}

export interface DealerUpdateStatusDataRes {
  dealerCode: string;
  status: string;
}

export interface UpdateDealerStatusResponse {
  isError: boolean;
  message: string;
  data: DealerUpdateStatusDataRes;
}

export interface BillingParties {
  id: number;
  partyName: string;
  gstNumber: string;
  mobileNumber: string;
  email: string;
  isActive: boolean;
}

export interface DealerApprovalData {
  requestId: number;
  approvalStatus: string;
  billingParties: BillingParties;
}

export interface DealerDetailsData {
  dealerCode: string;
  dealerName: string;
  address: string;
  mobileNumber: string;
  contactPerson: string;
  email: string;
  activeBillingPartiesCount: number;
  inactiveBillingPartiesCount: number;
  approvals: DealerApprovalData[];
}

export interface DealerDetailsResponse {
  isError: boolean;
  message: string;
  data: DealerDetailsData;
}
export interface DealerBillingPartyStatusUpdateResponse {
  isError: boolean;
  message: string;
  data: {
    id: string;
    approvalStatus: string;
  };
}

export interface DealerPermissionPayload {
  orderEntryAccess: boolean;
  orderRepeatAccess: boolean;
  outstandingReportAccess: boolean;
  ledgerReportAccess: boolean;
  complaintManagementAccess: boolean;
  chatbotAccess: boolean;
}

export interface DealerPermissionResponse {
  isError: boolean;
  message: string;
  data: {
    permissions: DealerPermissionPayload;
    editablePermissions: DealerPermissionPayload;
  };
}

export interface DealerPermissionUpdateResponse {
  isError: boolean;
  message: string;
  data: {
    permissions: DealerPermissionPayload;
  };
}

export interface DeliveryAddressData {
  partyName: string;
  address: string;
  groupName: string;
}

export interface DealerManagementDeliveryAddressResponse {
  isError: boolean;
  message: string;
  data: DeliveryAddressData[];
}
