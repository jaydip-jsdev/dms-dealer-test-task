import type { TablePaginationConfig } from "antd";
import { Dayjs } from "dayjs";
import type { Dispatch, SetStateAction } from "react";

export type ModalType = {
  id?: number | string;
  isVisible: boolean;
  status: string;
};

export interface ComplaintListType {
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

export interface ActionLogFormData {
  followUpDate: string;
  followUpBy: string;
  contactPerson: string;
  description: string;
  isVisited: boolean;
  visitedDate: string;
  visitDescription: string;
}

export interface AddComplaintFormData {
  complaintDate: Dayjs;
  complaintTime: Dayjs;
  complaintType: string;
  complaintDescription: string;
  concernPersonName: string;
  contactNo: string;
  referenceInvoiceNo: string;
  invoiceDate: Dayjs;
  complaintBy: string;
  dealerCode: string;
}
export interface ApiPayloadComplaint {
  manufacturerCode: string;
  complaintDate: string;
  complaintTime: string;
  complaintType: string;
  complaintDescription: string;
  concernPersonName: string;
  contactNumber: string;
  referenceInvoiceNo: string;
  invoiceDate: string;
  complaintBy: string;
}

export type DropDownOptionType = {
  label: string;
  value: string;
};
export interface ComplaintManagementProps {
  data: ComplaintListType[];
  loading: boolean;
  pagination: TablePaginationConfig;
  dealers: DropDownOptionType[];
  dealerLoading: boolean;
  addUpdateComplaintLoading: boolean;
  actionLoading: boolean;
  selectedFilterColumns: string[];
  isComplaintSelected: number;
  isAddComplaintModalOpen: ModalType;
  isModalOpen: ModalType;
  actionLogs?: ActionLogItem[];
  initialComplaintData?: ComplaintData | null;
  isAddActionLogOpen: Omit<ModalType, "status">;
  setIsAddActionLogOpen: Dispatch<SetStateAction<Omit<ModalType, "status">>>;
  isActionLogOpen: Omit<ModalType, "status">;
  setIsActionLogOpen: Dispatch<SetStateAction<Omit<ModalType, "status">>>;
  actionLogLoading: boolean;

  onSearch: (value: string) => void;
  onAddClick: (id?: number | string) => void;
  onDeleteClick: (id: string | number) => void;
  onOpenClick: (id: number) => void;
  onCloseClick: (id: number) => void;
  onReopenClick: (id: number) => void;
  onViewActionLogClick: (id: number | string) => void;
  onAddActionLogClick: (id: number | string) => void;
  handleTableChange: (newPagination: TablePaginationConfig) => void;
  onAddComplaintModalClose: () => void;
  onModalClose: () => void;
  onFilterColumnChange: (checkedValues: (string | number)[]) => void;
  onTableSelectionChange: (selectedRowKeys: number[]) => void;
  onModalConfirm: (msg?: string) => Promise<void>;
  onAddActionLog?: (formData: ActionLogFormData) => void;
  onAddComplaintSubmit?: (formData: AddComplaintFormData) => void;
}

export interface ActionLogItem {
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
