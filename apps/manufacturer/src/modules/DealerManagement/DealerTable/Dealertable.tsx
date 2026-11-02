import { Table, Tag, type TableColumnType, type TableProps } from "antd";
import dayjs from "dayjs";

import type { DealerManagementData, TableCompoProps } from "../../../types";

import { DealerAction } from "./DealerActions";

interface DealerListTableProp extends TableCompoProps<DealerManagementData> {
  selectedValue: string[];
  Addbtn: boolean;
  setAddbtn: React.Dispatch<React.SetStateAction<boolean>>;
}
const Dealertable = ({
  data,
  loading,
  pagination,
  handleTableChange,
  handleUpdateStatus,
  selectedValue,
  Addbtn,
  setAddbtn,
}: DealerListTableProp) => {
  const current = pagination.current ?? 1;
  const pageSize = pagination.pageSize ?? 10;

  const ShowValue = (value: string) => {
    if (value === null || value === undefined || value === " ") {
      return "-";
    }
    return value;
  };

  const DealerTableColumn: TableProps<DealerManagementData>["columns"] = [
    {
      title: "Sr. No.",
      key: "sr. no.",
      render: (_, __, index) => {
        return (current - 1) * pageSize + index + 1;
      },
      width: 70,
    },
    {
      title: "Code",
      key: "code",
      dataIndex: ["dealer", "code"],
      render: (value) => ShowValue(value),
    },
    {
      title: "Gst No.",
      key: "gst no.",
      dataIndex: ["dealer", "gstNumber"],
      render: (value) => ShowValue(value),
    },
    {
      title: "Address",
      key: "address",
      dataIndex: ["dealer", "address"],
      render: (value) => ShowValue(value),
    },
    {
      title: "Mobile No.",
      key: "mobile no",
      dataIndex: ["dealer", "mobileNumber"],
      render: (value) => ShowValue(value),
    },
    {
      title: "Contact Person",
      key: "contact",
      dataIndex: ["dealer", "contactPerson"],
      render: (value) => ShowValue(value),
    },
    {
      title: "WhatsApp No.",
      key: "whatsapp no.",
      dataIndex: ["dealer", "whatsappNumber"],
      render: (value) => ShowValue(value),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag
          color={
            {
              rejected: "error",
              approved: "success",
              pending: "processing",
            }[status] ?? "default"
          }
          style={{
            borderColor: "currentColor",
            textTransform: "capitalize",
          }}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record: DealerManagementData) => (
        <DealerAction
          record={record}
          handleUpdateStatus={handleUpdateStatus}
          Addbtn={Addbtn}
          setAddbtn={setAddbtn}
        />
      ),
    },
  ];

  const extraColumnMap: Record<
    string,
    TableColumnType<DealerManagementData>
  > = {
    email: {
      title: "Login Email",
      dataIndex: ["dealer", "email"],
      key: "email",
    },

    createdBy: {
      title: "Created By",
      dataIndex: ["dealer", "createdBy"],
      key: "createdBy",
    },

    createdAt: {
      title: "Created At",
      dataIndex: "requestDate",
      key: "createdAt",
      render: (dateString: string) =>
        dateString ? dayjs(dateString).format("DD/MM/YYYY") : "N/A",
    },
  };
  const extraColumns = selectedValue
    .map((name) => extraColumnMap[name])
    .filter(Boolean);

  const actionColumnIndex = DealerTableColumn.length - 1;

  const columns = [
    ...DealerTableColumn.slice(0, actionColumnIndex),
    ...extraColumns,
    ...DealerTableColumn.slice(actionColumnIndex),
  ];
  return (
    <Table<DealerManagementData>
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total,
      }}
      scroll={{
        x: "1200px",
      }}
      onChange={handleTableChange}
      rowKey="id"
    />
  );
};
export default Dealertable;
