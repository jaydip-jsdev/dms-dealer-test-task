import { CommonComplaintManagement } from "@repo/ui";
import type {
  ActionLogFormData,
  AddComplaintFormData,
  ApiErrorResponse,
  ModalType,
} from "@repo/ui";
import { message, type TablePaginationConfig } from "antd";
import type { AxiosError } from "axios";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";

import {
  addActionLogById,
  addComplaint,
  closeComplaintById,
  deleteComplaints,
  fetchAllComplaints,
  fetchAllDealer,
  fetchComplaintActionLogsById,
  fetchComplaintsById,
  openComplaintById,
  reopenComplaintById,
  updateComplaint,
} from "../../api/services/complaintManagementService";
import type {
  ActionLogsData,
  ComplaintData,
  DropDownOptionType,
} from "../../types";

const ComplaintList = () => {
  const [selectedFilterColumns, setSelectedFilterColumns] = useState<string[]>(
    [],
  );
  const [isComplaintSelected, setIsComplaintSelected] = useState<number>(0);
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
  const [actionLogs, setActionLogs] = useState<ActionLogsData[]>([]);
  const [actionLogLoading, setActionLogLoading] = useState<boolean>(false);

  const [data, setData] = useState<ComplaintData[]>([]);
  const [complaintData, setComplaintData] = useState<ComplaintData | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const { current = 1, pageSize = 10 } = pagination;
  const [searchText, setSearchText] = useState<string>("");
  const [dealers, setDealers] = useState<DropDownOptionType[]>([]);
  const [dealerLoading, setDealerLoading] = useState<boolean>(false);
  const [addUpdateComplaintLoading, setAddUpdateComplaintLoading] =
    useState<boolean>(false);
  const editComplaintId = isAddComplaintModalOpen?.id;

  const handleSearch = (value: string) => {
    setSearchText(value);
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const loadData = useCallback(
    async (page: number, limit: number, search: string) => {
      setLoading(true);
      try {
        const response = await fetchAllComplaints({ page, limit, search });

        setData(response.data);
        setPagination((prev) => ({
          ...prev,
          current: page,
          total: response.meta.total,
        }));
      } catch (err) {
        const error = err as AxiosError<ApiErrorResponse>;
        message.error(error.response?.data.message ?? error.message);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    setPagination((prev) => ({
      ...prev,
      current: newPagination.current,
      pageSize: newPagination.pageSize,
    }));
  };

  const handleAddClick = (id?: number | string) => {
    if (id) {
      setIsAddComplaintModalOpen({
        id: Number(id),
        isVisible: true,
        status: "Edit",
      });
      setComplaintData(
        data.find((complaint) => complaint.id === Number(id)) || null,
      );
    } else {
      setIsAddComplaintModalOpen({
        id: undefined,
        isVisible: true,
        status: "Add",
      });
      setComplaintData(null);
    }
  };

  const handleDeleteClick = (id: number | string) =>
    setIsModalOpen({ id: id, isVisible: true, status: "Delete" });

  const handleOpenClick = (id: number | string) =>
    setIsModalOpen({ id: id, isVisible: true, status: "Open" });

  const handleCloseClick = (id: number | string) =>
    setIsModalOpen({ id: id, isVisible: true, status: "Close" });

  const handleReopenClick = (id: number | string) =>
    setIsModalOpen({ id: id, isVisible: true, status: "Re-Open" });

  const handleAddComplaintModalClose = () => {
    setIsAddComplaintModalOpen({
      id: undefined,
      isVisible: false,
      status: "",
    });
    setComplaintData(null);
  };
  const handleModalClose = () =>
    setIsModalOpen({ id: undefined, isVisible: false, status: "" });

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
      await addActionLogById(String(isAddActionLogOpen.id), payload);

      message.success("Action log added");

      const res = await fetchComplaintActionLogsById(
        String(isAddActionLogOpen.id),
      );
      setActionLogs(res.data);
      setIsAddActionLogOpen({ id: undefined, isVisible: false });
    } catch (error) {
      console.error("Failed to add action log", error);
      message.error("Failed to add log");
    } finally {
      setActionLogLoading(false);
    }
  };

  const handleAddComplaintSubmit = async (formData: AddComplaintFormData) => {
    try {
      setAddUpdateComplaintLoading(true);
      const payload = {
        complaintDate: dayjs(formData.complaintDate).format("YYYY-MM-DD"),
        complaintTime: dayjs(formData.complaintTime).format("HH:mm"),
        complaintType: formData.complaintType,
        complaintDescription: formData.complaintDescription,
        concernPersonName: formData.concernPersonName,
        contactNumber: formData.contactNo,
        referenceInvoiceNo: formData.referenceInvoiceNo,
        invoiceDate: dayjs(formData.invoiceDate).format("YYYY-MM-DD"),
        dealerCode: formData.dealerCode,
        complaintBy: formData.complaintBy,
      };

      const isEdit =
        isAddComplaintModalOpen.status === "Edit" && isAddComplaintModalOpen.id;

      if (isEdit) {
        await updateComplaint(String(isAddComplaintModalOpen.id), payload);
        message.success("Complaint updated successfully");
      } else {
        await addComplaint(payload);
        message.success("Complaint added successfully");
      }

      loadData(current, pageSize, searchText);

      setIsAddComplaintModalOpen({
        id: undefined,
        isVisible: false,
        status: "",
      });
    } catch (error) {
      console.error("Save complaint failed", error);
      message.error("Something went wrong");
    } finally {
      setAddUpdateComplaintLoading(false);
    }
  };

  const handleViewActionLogClick = async (id: number | string) => {
    try {
      setIsActionLogOpen({ id: Number(id), isVisible: true });
      setActionLogLoading(true);

      const res = await fetchComplaintActionLogsById(String(id));
      setActionLogs(res.data);
    } catch (error) {
      console.error("Failed to load action logs", error);
    } finally {
      setActionLogLoading(false);
    }
  };

  const handleAddActionLogClick = (id: number | string) => {
    setIsAddActionLogOpen({ id: Number(id), isVisible: true });
  };

  const handleModalConfirm = async (closingRemark?: string) => {
    const { id, status } = isModalOpen;

    if (!id || !status) return;

    try {
      setActionLoading(true);
      if (status === "Open") {
        await openComplaintById(String(id));
        message.success("Complaint opened successfully");
      }

      if (status === "Close") {
        await closeComplaintById(String(id), closingRemark || "");
        message.success("Complaint closed successfully");
      }

      if (status === "Re-Open") {
        await reopenComplaintById(String(id));
        message.success("Complaint reopened successfully");
      }

      if (status === "Delete") {
        await deleteComplaints({ ids: id.toString().split(",").map(Number) });
        message.success("Complaint deleted successfully");
        setIsComplaintSelected(0);
      }

      loadData(current, pageSize, searchText);

      setIsModalOpen({ id: undefined, isVisible: false, status: "" });
    } catch (error) {
      console.error("Action failed", error);
      message.error("Action failed. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  useEffect(() => {
    loadData(current, pageSize, searchText);
  }, [current, pageSize, searchText, loadData]);

  useEffect(() => {
    const loadDealers = async () => {
      try {
        setDealerLoading(true);
        const res = await fetchAllDealer();

        const options = res.data.map((dealer) => ({
          label: dealer.dealerName,
          value: dealer.dealerCode,
        }));

        setDealers(options);
      } catch (err) {
        console.error("Dealer fetch failed", err);
      } finally {
        setDealerLoading(false);
      }
    };

    if (isAddComplaintModalOpen.isVisible) {
      loadDealers();
    }
  }, [isAddComplaintModalOpen]);

  useEffect(() => {
    const loadComplaint = async () => {
      if (!editComplaintId || isAddComplaintModalOpen.status !== "Edit") return;

      try {
        setAddUpdateComplaintLoading(true);

        const res = await fetchComplaintsById(String(editComplaintId));
        const complaint = res.data;
        setComplaintData(complaint);
      } catch (error) {
        console.error("Failed to fetch complaint", error);
      } finally {
        setAddUpdateComplaintLoading(false);
      }
    };

    if (isAddComplaintModalOpen.isVisible) {
      loadComplaint();
    }
  }, [editComplaintId, isAddComplaintModalOpen]);

  return (
    <CommonComplaintManagement
      data={data}
      pagination={pagination}
      loading={loading}
      dealers={dealers}
      dealerLoading={dealerLoading}
      addUpdateComplaintLoading={addUpdateComplaintLoading}
      actionLoading={actionLoading}
      initialComplaintData={complaintData}
      actionLogLoading={actionLogLoading}
      selectedFilterColumns={selectedFilterColumns}
      isComplaintSelected={isComplaintSelected}
      isAddComplaintModalOpen={isAddComplaintModalOpen}
      isModalOpen={isModalOpen}
      isAddActionLogOpen={isAddActionLogOpen}
      setIsAddActionLogOpen={setIsAddActionLogOpen}
      isActionLogOpen={isActionLogOpen}
      setIsActionLogOpen={setIsActionLogOpen}
      onSearch={handleSearch}
      onAddClick={handleAddClick}
      onDeleteClick={handleDeleteClick}
      onOpenClick={handleOpenClick}
      onCloseClick={handleCloseClick}
      onReopenClick={handleReopenClick}
      handleTableChange={handleTableChange}
      onAddComplaintModalClose={handleAddComplaintModalClose}
      onViewActionLogClick={handleViewActionLogClick}
      onAddActionLogClick={handleAddActionLogClick}
      onModalClose={handleModalClose}
      onFilterColumnChange={handleFilterColumnChange}
      onTableSelectionChange={handleTableSelectionChange}
      onModalConfirm={handleModalConfirm}
      onAddActionLog={handleAddActionLog}
      onAddComplaintSubmit={handleAddComplaintSubmit}
      actionLogs={actionLogs}
    />
  );
};

export default ComplaintList;
