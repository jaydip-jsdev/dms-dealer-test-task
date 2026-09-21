import { FilterFilled, MoreOutlined } from "@ant-design/icons";
import {
  Button,
  Dropdown,
  Table,
  Tag,
  type MenuProps,
  type TablePaginationConfig,
} from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import type { OrderManagementData } from "src/types";

import { PATH } from "../../../Routers/routerPath";
import {
  INSERT_EXTRA_COLUMNS_AFTER_REMARK,
  STATUS_COLOR_MAP,
  type StatusType,
} from "../constant";

interface OrderListTableProps {
  data: OrderManagementData[];
  loading: boolean;
  selectedValue: string[];
  onEdit: (order: OrderManagementData) => void;
  pagination: TablePaginationConfig;
  handleTableChange: (newPagination: TablePaginationConfig) => void;
}

const OrderListTable = ({
  data,
  loading,
  selectedValue,
  onEdit,
  pagination,
  handleTableChange,
}: OrderListTableProps) => {
  const navigate = useNavigate();

  const handleOrderClick = (orderNo: string) => {
    navigate(`${PATH.ORDER_MANAGEMENT}/${orderNo}`);
  };

  const getStatusFullText = (status: string) => {
    switch (status) {
      case "p":
        return "Pending";
      case "a":
        return "Approved";
      case "h":
        return "Hold";
      case "r":
        return "Rejected";
      default:
        return "Unknown status";
    }
  };

  const getActionMenu = (record: OrderManagementData): MenuProps["items"] => [
    {
      key: "edit",
      label: "Edit",
      onClick: () => onEdit(record),
    },
  ];

  const allColumns = [
    {
      title: "Order No.",
      dataIndex: "orderNumber",
      render: (text: string) => (
        <Button type="link" onClick={() => handleOrderClick(text)}>
          {text}
        </Button>
      ),
    },
    {
      title: "Billing Party",
      dataIndex: "billingPartyName",
      render: (value: string) => value || "-",
    },
    {
      title: "Order Ref No",
      dataIndex: "orderRefNumber",
      render: (value: string) => value || "-",
    },
    {
      title: "Party Name",
      dataIndex: "partyName",
      render: (value: string) => value || "-",
    },
    {
      title: "Address",
      dataIndex: "address",
      render: (value: string) => value || "-",
    },
    {
      title: "Item Name",
      dataIndex: "itemName",
      render: (value: string) => value || "-",
    },
    {
      title: "Pieces / Box",
      dataIndex: "boxPieces",
      render: (value: string) => value || "-",
    },
    {
      title: "Quantity (in Kgs.)",
      dataIndex: "quantity",
      render: (value: number) => value || "-",
    },
    {
      title: "Rate",
      dataIndex: "rate",
      render: (value: number) => value || "-",
    },
    {
      title: "Status",
      dataIndex: "status",
      filterIcon: <FilterFilled />,
      render: (status: string) => {
        const color =
          STATUS_COLOR_MAP[status.toLowerCase() as StatusType] ?? "gray";
        const text = getStatusFullText(status.toLowerCase());
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: OrderManagementData) => (
        <Dropdown menu={{ items: getActionMenu(record) }} trigger={["click"]}>
          <MoreOutlined />
        </Dropdown>
      ),
    },
  ];

  const extraColumnMap: {
    [key: string]: {
      title: string;
      dataIndex: string;
      render?: (value: string | number) => string | number;
    };
  } = {
    "Party Group": {
      title: "Party Group",
      dataIndex: "partyGroup",
      render: (value) => value || "-",
    },
    "Order Date": {
      title: "Order Date",
      dataIndex: "orderDate",
      render: (value) => (value ? dayjs(value).format("DD/MM/YYYY") : "-"),
    },
    "Lot No.": {
      title: "Lot No.",
      dataIndex: "lotNumber",
      render: (value) => value || "-",
    },
    Grade: {
      title: "Grade",
      dataIndex: "grade",
      render: (value) => value || "-",
    },
    Subgrade: {
      title: "Subgrade",
      dataIndex: "subgrade",
      render: (value) => value || "-",
    },
    "Cops/Cheese": {
      title: "Cops/Cheese",
      dataIndex: "copsPieces",
      render: (value) => value || "-",
    },
    Design: {
      title: "Design",
      dataIndex: "design",
      render: (value) => value || "-",
    },
    Color: {
      title: "Color",
      dataIndex: "color",
      render: (value) => value || "-",
    },
    Shade: {
      title: "Shade",
      dataIndex: "shade",
      render: (value) => value || "-",
    },
    Ends: {
      title: "Ends",
      dataIndex: "ends",
      render: (value) => value || "-",
    },
    Width: {
      title: "Width",
      dataIndex: "width",
      render: (value) => value || "-",
    },
    Length: {
      title: "Length",
      dataIndex: "length",
      render: (value) => value || "-",
    },
  };

  const extraColumns = selectedValue.map((name) => extraColumnMap[name]);

  const columns = [
    ...allColumns.slice(0, INSERT_EXTRA_COLUMNS_AFTER_REMARK),
    ...extraColumns,
    ...allColumns.slice(INSERT_EXTRA_COLUMNS_AFTER_REMARK),
  ];

  return (
    <Table
      dataSource={data}
      columns={columns}
      loading={loading}
      scroll={{
        x: "1200px",
      }}
      rowKey="orderNumber"
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
