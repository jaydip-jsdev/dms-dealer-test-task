import { MoreOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Dropdown,
  Flex,
  Form,
  Input,
  Modal,
  Table,
  Tag,
} from "antd";
import type { CheckboxChangeEvent, MenuProps } from "antd";
import type { ColumnType, TablePaginationConfig } from "antd/es/table";
import dayjs from "dayjs";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";

import type {
  ComplaintListType,
  ModalType,
  ActionLogFormData,
  ActionLogItem,
} from "../types";

import ActionLog from "./ActionLog/ActionLog";
import AddActionLog from "./ActionLog/AddActionLog/AddActionLog";

interface ComplainManagementTableProps {
  data: ComplaintListType[];
  loading: boolean;
  pagination: TablePaginationConfig;
  selectedComplaintList: string[];
  isModalOpen: ModalType;
  selectedRowKeys: number[];
  actionLoading: boolean;
  isAddActionLogOpen: Omit<ModalType, "status">;
  isActionLogOpen: Omit<ModalType, "status">;
  setSelectedRowKeys: Dispatch<SetStateAction<number[]>>;
  setIsAddActionLogOpen: Dispatch<SetStateAction<Omit<ModalType, "status">>>;
  setIsActionLogOpen: Dispatch<SetStateAction<Omit<ModalType, "status">>>;
  actionLogLoading: boolean;
  onTableSelectionChange: (selectedRowKeys: number[]) => void;
  onModalClose: () => void;
  onModalConfirm: (msg?: string) => void;
  onViewActionLogClick: (id: number | string) => void;
  onAddActionLogClick: (id: number | string) => void;
  onAddComplaintEdit: (id: number) => void;
  onOpenClick: (id: number) => void;
  onCloseClick: (id: number) => void;
  onDeleteClick: (id: number | string) => void;
  onReopenClick: (id: number) => void;
  onAddActionLog?: (formData: ActionLogFormData) => void;
  handleTableChange: (newPagination: TablePaginationConfig) => void;
  actionLogs?: ActionLogItem[];
}

const ComplainManagementTable = ({
  data,
  loading,
  pagination,
  selectedComplaintList,
  isModalOpen,
  selectedRowKeys,
  actionLoading,
  setSelectedRowKeys,
  handleTableChange,
  onTableSelectionChange,
  onModalClose,
  onModalConfirm,
  onViewActionLogClick,
  onAddActionLogClick,
  isAddActionLogOpen,
  setIsAddActionLogOpen,
  isActionLogOpen,
  actionLogLoading,
  setIsActionLogOpen,
  onAddComplaintEdit,
  onOpenClick,
  onCloseClick,
  onDeleteClick,
  onReopenClick,
  onAddActionLog,
  actionLogs,
}: ComplainManagementTableProps) => {
  const [closingReason, setClosingReason] = useState<string>("");
  const [selectedRecord, setSelectedRecord] =
    useState<ComplaintListType | null>(null);

  const getMenuItems = (record: ComplaintListType): MenuProps["items"] => {
    const { id, status } = record;

    const handleClick = (callback?: (id: number) => void) => {
      setSelectedRecord(record);
      if (callback) callback(id);
    };

    return [
      {
        key: "log",
        label: (
          <div onClick={() => handleClick(onViewActionLogClick)}>
            Action Log
          </div>
        ),
      },
      {
        key: "open",
        label: (
          <div
            onClick={
              status === "pending" ? () => handleClick(onOpenClick) : undefined
            }
            style={{ color: status === "pending" ? undefined : "grey" }}
          >
            Open
          </div>
        ),
        disabled: status !== "pending",
      },
      {
        key: "close",
        label: (
          <div
            onClick={
              status === "open" ? () => handleClick(onCloseClick) : undefined
            }
            style={{ color: status === "open" ? undefined : "grey" }}
          >
            Close
          </div>
        ),
        disabled: status !== "open",
      },
      {
        key: "reopen",
        label: (
          <div
            onClick={
              status === "close" ? () => handleClick(onReopenClick) : undefined
            }
            style={{ color: status === "close" ? undefined : "grey" }}
          >
            Reopen
          </div>
        ),
        disabled: status !== "close",
      },
      {
        key: "edit",
        label: (
          <div
            onClick={
              status === "pending"
                ? () => handleClick(onAddComplaintEdit)
                : undefined
            }
            style={{ color: status === "pending" ? undefined : "grey" }}
          >
            Edit
          </div>
        ),
        disabled: status !== "pending",
      },
      {
        key: "delete",
        label: (
          <div
            onClick={
              status === "pending"
                ? () => handleClick(onDeleteClick)
                : undefined
            }
            style={{ color: status === "pending" ? undefined : "grey" }}
          >
            Delete
          </div>
        ),
        disabled: status !== "pending",
      },
    ];
  };

  const allSelected = selectedRowKeys.length === data?.length;

  const handleHeaderCheck = (e: CheckboxChangeEvent) => {
    let updatedKeys: number[];
    if (e.target.checked) {
      updatedKeys = data.map((d) => d.id);
    } else {
      updatedKeys = [];
    }
    setSelectedRowKeys(updatedKeys);
    onTableSelectionChange(updatedKeys);
  };

  const handleRowCheck = (id: number, checked: boolean) => {
    let updatedKeys: number[];
    if (checked) {
      updatedKeys = [...selectedRowKeys, id];
    } else {
      updatedKeys = selectedRowKeys.filter((key) => key !== id);
    }
    setSelectedRowKeys(updatedKeys);
    onTableSelectionChange(updatedKeys);
  };

  const columns: ColumnType<ComplaintListType>[] = [
    {
      title: <Checkbox checked={allSelected} onChange={handleHeaderCheck} />,
      key: "checkbox",
      render: (_: unknown, record: ComplaintListType) => (
        <Checkbox
          checked={selectedRowKeys.includes(record.id)}
          onChange={(e) => handleRowCheck(record.id, e.target.checked)}
        />
      ),
    },
    {
      title: "Sr. No.",
      key: "srNo",
      render: (_: unknown, __: ComplaintListType, index: number) =>
        ((pagination.current || 1) - 1) * (pagination.pageSize || 10) +
        index +
        1,
    },
    {
      title: "Complaint No.",
      dataIndex: "complaintNumber",
    },
    {
      title: "Complaint Date & Time",
      dataIndex: "complaintDate",
      render: (_: string, record: ComplaintListType) => {
        const dateTime = `${record.complaintDate}T${record.complaintTime}`;
        const formattedDateTime = dayjs(dateTime);
        return formattedDateTime.isValid()
          ? formattedDateTime.format("DD/MM/YYYY HH:mm")
          : "--";
      },
    },
    {
      title: "Complaint Type",
      dataIndex: "complaintType",
    },
    {
      title: "Complaint Description",
      dataIndex: "complaintDescription",
    },
    {
      title: "Concern Person Name",
      dataIndex: "concernPersonName",
    },
    {
      title: "Contact No.",
      dataIndex: "contactNumber",
    },
    {
      title: "Complaint By",
      dataIndex: "complaintBy",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (_: string, record: ComplaintListType) => (
        <Tag
          color={
            record.status === "pending"
              ? "processing"
              : record.status === "open"
                ? "success"
                : "error"
          }
        >
          {record?.status?.charAt(0).toUpperCase() + record?.status?.slice(1)}
        </Tag>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_: unknown, record) => (
        <Dropdown menu={{ items: getMenuItems(record) }} trigger={["click"]}>
          <MoreOutlined style={{ cursor: "pointer" }} />
        </Dropdown>
      ),
    },
  ];

  const extraColumnMap: {
    [key: string]: ColumnType<ComplaintListType>;
  } = {
    "Reference Invoice No.": {
      title: "Reference Invoice No.",
      dataIndex: "referenceInvoiceNo",
    },
    "Invoice Date": {
      title: "Invoice Date",
      dataIndex: "invoiceDate",
    },
    "Created At": {
      title: "Created At",
      dataIndex: "createdAt",
      render: (value: string) =>
        value ? dayjs(value).format("DD/MM/YYYY HH:mm") : "-",
    },
    "Created By": { title: "Created By", dataIndex: "createdBy" },
  };

  const extraColumns = selectedComplaintList
    .map((name) => extraColumnMap[name])
    .filter((col): col is ColumnType<ComplaintListType> => col !== undefined);

  const insertIndex = 8;
  const columnsWithOptional: ColumnType<ComplaintListType>[] = [
    ...columns.slice(0, insertIndex),
    ...extraColumns,
    ...columns.slice(insertIndex),
  ];

  return (
    <>
      <Table
        dataSource={data}
        loading={loading}
        columns={columnsWithOptional}
        scroll={{
          x: "1200px",
        }}
        rowKey="id"
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
        }}
        onChange={handleTableChange}
      />
      <ActionLog
        isActionLogOpen={isActionLogOpen.isVisible}
        setIsActionLogOpen={(isOpen) => {
          setIsActionLogOpen({
            id: isActionLogOpen.id,
            isVisible: isOpen as boolean,
          });
        }}
        setIsAddActionLogOpen={(isOpen) => {
          setIsAddActionLogOpen({
            id: isActionLogOpen.id,
            isVisible: isOpen as boolean,
          });
          onAddActionLogClick(isActionLogOpen.id as number | string);
        }}
        actionLogs={actionLogs}
        actionLogLoading={actionLogLoading}
        disableAddLog={
          data.find((d) => d.id === isActionLogOpen.id)?.status !== "open"
        }
        isStatusClosed={selectedRecord?.status === "close"}
      />
      <AddActionLog
        isAddActionLogOpen={isAddActionLogOpen.isVisible}
        setIsAddActionLogOpen={(isOpen) => {
          setIsAddActionLogOpen({
            id: isActionLogOpen.id,
            isVisible: isOpen as boolean,
          });
        }}
        onSubmit={onAddActionLog}
        actionLogLoading={actionLogLoading}
        complaintDate={selectedRecord?.complaintDate}
      />
      <Modal
        open={isModalOpen.isVisible}
        title={`Are you sure you want to ${isModalOpen.status} Complaint?`}
        onOk={() => onModalConfirm(closingReason)}
        onCancel={onModalClose}
        closable={false}
        footer={
          <Flex justify="space-between">
            <Button onClick={onModalClose}>No</Button>
            <Button
              onClick={() => onModalConfirm(closingReason)}
              type="primary"
              loading={actionLoading}
            >
              Yes
            </Button>
          </Flex>
        }
      >
        {isModalOpen.status === "Close" && (
          <Form layout="vertical">
            <Form.Item label="Closing Remark" name="closing-remark">
              <Input.TextArea
                value={closingReason}
                onChange={(e) => setClosingReason(e.target.value)}
                placeholder="Enter"
              />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default ComplainManagementTable;
