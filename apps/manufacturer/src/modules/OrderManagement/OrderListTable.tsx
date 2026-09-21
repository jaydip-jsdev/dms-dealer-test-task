import { FilterFilled } from "@ant-design/icons";
import { Table, Tag, type TableColumnType, type TableProps } from "antd";
import dayjs from "dayjs";

import type { OrderManagement, TableCompoProps } from "../../types";

interface OrderListTableProps extends TableCompoProps<OrderManagement> {
  selectedValue: string[];
}

const OrderListTable = ({
  selectedValue,
  data,
  loading,
  pagination,
  handleTableChange,
}: OrderListTableProps) => {
  const current = pagination?.current ?? 1;
  const pageSize = pagination?.pageSize ?? 10;

  const allColumns: TableProps<OrderManagement>["columns"] = [
    {
      title: "Sr. No.",
      key: "sr_no",
      width: 70,
      render: (_, __, index: number) => {
        return (current - 1) * pageSize + index + 1;
      },
    },
    {
      title: "Order No.",
      dataIndex: "orderNumber",
    },
    {
      title: "Company Name",
      dataIndex: "billingPartyName",
    },
    {
      title: "Order Ref No",
      dataIndex: "orderRefNumber",
    },
    {
      title: "Party Name",
      dataIndex: "partyName",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Item Name",
      dataIndex: "itemName",
    },
    {
      title: "Pieces / Box",
      dataIndex: "boxPieces",
    },
    {
      title: "Quantity (in Kgs.)",
      dataIndex: "quantity",
    },
    {
      title: "Rate",
      dataIndex: "rate",
    },
    {
      title: "Remark",
      dataIndex: "remark",
    },
    {
      title: "Status",
      dataIndex: "status",
      filterIcon: <FilterFilled />,
      render: (status: string) => {
        let color = "default";
        let statusFullForm = "";
        switch (status?.toLowerCase()) {
          case "a":
            color = "success";
            statusFullForm = "Approved";
            break;
          case "p":
            color = "processing";
            statusFullForm = "Pending";
            break;
          case "r":
            color = "error";
            statusFullForm = "Rejected";
            break;
          case "h":
            color = "orange";
            statusFullForm = "Hold";
            break;
        }
        return <Tag color={color}>{statusFullForm || "N/A"}</Tag>;
      },
    },
  ];

  const extraColumnMap: Record<string, TableColumnType<OrderManagement>> = {
    "Party Group": { title: "Party Group", dataIndex: "partyGroup" },
    "Order Date": {
      title: "Order Date",
      dataIndex: "orderDate",
      render: (dateString: string) =>
        dateString ? dayjs(dateString).format("DD/MM/YYYY") : "N/A",
    },
    "Lot No.": { title: "Lot No.", dataIndex: "lotNumber" },
    Grade: { title: "Grade", dataIndex: "grade" },
    Subgrade: { title: "Subgrade", dataIndex: "subGrade" },
    "Cops/Cheese": { title: "Cops/Cheese", dataIndex: "copsPieces" },
    Design: { title: "Design", dataIndex: "design" },
    Color: { title: "Color", dataIndex: "color" },
    Shade: { title: "Shade", dataIndex: "shade" },
    Ends: { title: "Ends", dataIndex: "ends" },
    Width: { title: "Width", dataIndex: "width" },
    Length: { title: "Length", dataIndex: "length" },
  };

  const extraColumns = selectedValue
    .map((name) => extraColumnMap[name])
    .filter(Boolean);
  const insertIndex = 11;
  const columns = [
    ...allColumns.slice(0, insertIndex),
    ...extraColumns,
    ...allColumns.slice(insertIndex),
  ];

  return (
    <Table
      dataSource={data}
      columns={columns}
      scroll={{
        x: "1200px",
      }}
      rowKey="orderNumber"
      loading={loading}
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total,
      }}
      onChange={handleTableChange}
    />
  );
};

export default OrderListTable;
