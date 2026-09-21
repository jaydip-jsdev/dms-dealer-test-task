import { CommonComplaintManagement } from "@repo/ui";
import type {
  ActionLogFormData,
  AddComplaintFormData,
  ApiErrorResponse,
  ModalType,
  ComplaintListType,
} from "@repo/ui";
import { message, type TablePaginationConfig } from "antd";
import { AxiosError, isAxiosError } from "axios";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";

import {
  addActionLogById,
  addComplaint,
  changeStatusComplaintById,
  deleteComplaint,
  fetchComplaintActionLogsById,
  fetchComplaints,
  updateComplaint,
} from "../../api/services/complaintService";
import { SELECTED_MANUFACTURER, type ActionLogsData } from "../../types";

const ComplaintManagement = () => {
  const [selectedFilterColumns, setSelectedFilterColumns] = useState<string[]>(
    [],
  );
  const [complaintData, setComplaintData] = useState<ComplaintListType | null>(
    null,
  );

  const [actionLogs, setActionLogs] = useState<ActionLogsData[]>([]);
  const [actionLogLoading, setActionLogLoading] = useState<boolean>(false);
  const [isComplaintSelected, setIsComplaintSelected] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ComplaintListType[]>();
  const [isAddComplaintModalOpen, setIsAddComplaintModalOpen] =
    useState<ModalType>({
      id: undefined,
      isVisible: false,
      status: "",
    });

  const [isModalOpen, setIsModalOpen] = useState<ModalType>({
    id: undefined,
    isVisible: false,
    status: "",
  });

  const [isAddActionLogOpen, setIsAddActionLogOpen] = useState<
    Omit<ModalType, "status">
  >({
    id: undefined,
    isVisible: false,
  });

  const [isActionLogOpen, setIsActionLogOpen] = useState<
    Omit<ModalType, "status">
  >({
    id: undefined,
    isVisible: false,
  });

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: data?.length,
  });
  const { current = 1, pageSize = 10 } = pagination;

  const loadData = useCallback(
    async (page: number, limit: number, search?: string) => {
      setLoading(true);
      try {
        const manuCode = localStorage.getItem(SELECTED_MANUFACTURER) || "";
        const response = await fetchComplaints({
          page,
          manufacturerCode: manuCode,
          limit,
          search,
        });

        setData(response.data);
        setPagination((prev) => ({
          ...prev,
          current: page,
          total: response.meta.total,
        }));
      } catch (err: unknown) {
        if (isAxiosError<ApiErrorResponse>(err)) {
          message.error(err.response?.data?.message ?? err.message);
        } else {
          message.error("Unable to fetch Data");
        }
      } finally {
        setLoading(false);
      }
    },
    [],
  );
  useEffect(() => {
    loadData(current, pageSize);
  }, [current, pageSize, isAddComplaintModalOpen]);

  const fetchActionLogs = useCallback(async (id: string) => {
    setActionLogLoading(true);
    try {
      const res = await fetchComplaintActionLogsById(id);
      setActionLogs(res.data);
    } catch (error: unknown) {
      if (isAxiosError<ApiErrorResponse>(error)) {
        message.error(error.response?.data?.message ?? error.message);
      } else {
        message.error("Unable to fetch Action Logs");
      }
      setActionLogs([]);
    } finally {
      setActionLogLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isActionLogOpen.isVisible || !isActionLogOpen.id) {
      setActionLogs([]);
      return;
    }
    fetchActionLogs(String(isActionLogOpen.id));
  }, [isActionLogOpen.isVisible, isActionLogOpen.id, fetchActionLogs]);
  const handleSearch = (value: string) => {
    setPagination((prev) => ({ ...prev, current: 1 })); // Reset to page 1 on search
    loadData(1, pageSize, value);
  };

  const handleTableChange = (newPagination: TablePaginationConfig) =>
    setPagination(newPagination);

  const handleAddClick = (id?: number | string) => {
    if (id) {
      setIsAddComplaintModalOpen({
        id: Number(id),
        isVisible: true,
        status: "Edit",
      });
      const foundComplaint = data?.find(
        (complaint) => complaint.id === Number(id),
      );
      setComplaintData(foundComplaint || null);
    } else {
      setIsAddComplaintModalOpen({
        id: undefined,
        isVisible: true,
        status: "Add",
      });
      setComplaintData(null);
    }
  };

  const prepareComplaintFormData = (formData: AddComplaintFormData) => {
    const manufacturerCode = localStorage.getItem(SELECTED_MANUFACTURER) || "";
    const data = {
      contactNumber: formData.contactNo,
      manufacturerCode,
      complaintDate: formData.complaintDate.format("YYYY-MM-DD"),
      complaintTime: formData.complaintTime.format("HH:mm"),
      invoiceDate: formData.invoiceDate.format("YYYY-MM-DD"),
      complaintDescription: formData.complaintDescription,
      concernPersonName: formData.concernPersonName,
      complaintType: formData.complaintType,
      referenceInvoiceNo: formData.referenceInvoiceNo,
      complaintBy: formData.complaintBy,
    };
    return data;
  };
  const handleDeleteClick = (id?: number | string) => {
    setIsModalOpen({ id, isVisible: true, status: "Delete" });
  };

  const handleOpenClick = (id?: number | string) => {
    setIsModalOpen({ id: Number(id), isVisible: true, status: "Open" });
  };

  const handleCloseClick = (id?: number | string) =>
    setIsModalOpen({ id: Number(id), isVisible: true, status: "Close" });

  const handleReopenClick = (id?: number | string) =>
    setIsModalOpen({ id: Number(id), isVisible: true, status: "Re-Open" });

  const handleViewActionLogClick = (id: number | string) =>
    setIsActionLogOpen({ id: Number(id), isVisible: true });

  const handleAddActionLogClick = (id: number | string) =>
    setIsAddActionLogOpen({ id: Number(id), isVisible: true });

  const handleAddComplaintModalClose = () =>
    setIsAddComplaintModalOpen({ id: undefined, isVisible: false, status: "" });

  const handleModalClose = () => {
    setIsModalOpen({ id: undefined, isVisible: false, status: "" });
  };
  const handleFilterColumnChange = (checkedValues: (string | number)[]) =>
    setSelectedFilterColumns(checkedValues as string[]);

  const handleTableSelectionChange = (selectedRowKeys: number[]) =>
    setIsComplaintSelected(selectedRowKeys.length);

  const handleAddActionLog = async (formData: ActionLogFormData) => {
    if (!isAddActionLogOpen.id) return;

    try {
      setActionLogLoading(true);
      const payload: ActionLogFormData = {
        followUpDate: dayjs(formData.followUpDate).format("YYYY-MM-DD"),
        followUpBy: formData.followUpBy,
        contactPerson: formData.contactPerson,
        description: formData.description,
        isVisited: formData.isVisited,
        visitedDate: formData.visitedDate
          ? dayjs(formData.visitedDate).format("YYYY-MM-DD")
          : "",
        visitDescription: formData.visitDescription,
      };
      const res = await addActionLogById(
        String(isAddActionLogOpen.id),
        payload,
      );
      if (res.isError) {
        message.error("Unable to add ActionLog");
      } else {
        message.success("Action log added");
      }
      setIsAddActionLogOpen({ id: undefined, isVisible: false });
    } catch (error: unknown) {
      if (isAxiosError<ApiErrorResponse>(error)) {
        message.error(error.response?.data?.message ?? error.message);
      } else {
        message.error("Unable to fetch Action Logs");
      }
    } finally {
      setActionLogLoading(false);
    }
  };
  const handleAddComplaintSubmit = async (formData: AddComplaintFormData) => {
    try {
      const payload = prepareComplaintFormData(formData);
      const isEdit = isAddComplaintModalOpen.status === "Edit";
      const complaintId = isAddComplaintModalOpen.id;

      if (isEdit && complaintId) {
        await updateComplaint(String(complaintId), payload);
      } else {
        await addComplaint(payload);
      }

      message.success(`Complaint ${isEdit ? "Updated" : "Added"} successfully`);
      setIsAddComplaintModalOpen({
        id: undefined,
        isVisible: false,
        status: "",
      });
    } catch (error: unknown) {
      if (isAxiosError<ApiErrorResponse>(error)) {
        message.error(error.response?.data?.message ?? error.message);
      } else {
        message.error("Somthing went wrong");
      }
    }
  };

  const handleModalConfirm = async (closingRemark?: string) => {
    const { id, status } = isModalOpen;

    if (!id || !status) return;

    try {
      if (status === "Delete") {
        try {
          const res = await deleteComplaint(id);
          if (!res.data.isError) {
            message.success(
              res.data.message || "Complaint deleted successfully",
            );

            loadData(current, pageSize, "");
          } else {
            message.error(
              res.data.message || "only pending complaints can be deleted",
            );
          }
        } catch (error: unknown) {
          const err = error as AxiosError<ApiErrorResponse>;
          message.error(err.response?.data.message ?? err.message);
        }
      } else {
        const res = await changeStatusComplaintById(
          String(id),
          status,
          closingRemark,
        );

        message.success(`Complaint ${res.status} successfully`);
      }

      loadData(current, pageSize);

      setIsModalOpen({ id: undefined, isVisible: false, status: "" });
    } catch (error) {
      console.error("Action failed", error);
      message.error("Action failed. Please try again.");
    }
  };

  return (
    <CommonComplaintManagement
      data={data || []}
      loading={loading}
      pagination={pagination}
      selectedFilterColumns={selectedFilterColumns}
      initialComplaintData={complaintData}
      isComplaintSelected={isComplaintSelected}
      isAddComplaintModalOpen={isAddComplaintModalOpen}
      isModalOpen={isModalOpen}
      isAddActionLogOpen={isAddActionLogOpen}
      setIsAddActionLogOpen={setIsAddActionLogOpen}
      isActionLogOpen={isActionLogOpen}
      setIsActionLogOpen={setIsActionLogOpen}
      handleTableChange={handleTableChange}
      onSearch={handleSearch}
      onAddClick={handleAddClick}
      onDeleteClick={handleDeleteClick}
      onOpenClick={handleOpenClick}
      onCloseClick={handleCloseClick}
      onReopenClick={handleReopenClick}
      onViewActionLogClick={handleViewActionLogClick}
      onAddActionLogClick={handleAddActionLogClick}
      onAddComplaintModalClose={handleAddComplaintModalClose}
      onModalClose={handleModalClose}
      onFilterColumnChange={handleFilterColumnChange}
      onTableSelectionChange={handleTableSelectionChange}
      onModalConfirm={handleModalConfirm}
      onAddActionLog={handleAddActionLog}
      onAddComplaintSubmit={handleAddComplaintSubmit}
      actionLogs={actionLogs}
      actionLogLoading={actionLogLoading}
      actionLoading={false}
      dealerLoading={false}
      dealers={[]}
      addUpdateComplaintLoading={false}
    />
  );
};

export default ComplaintManagement;
