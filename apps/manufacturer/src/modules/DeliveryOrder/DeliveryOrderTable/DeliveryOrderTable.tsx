import { Checkbox, Flex, Table, Tag } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

import "./DeliveryTable.scss";
import type {
  DeliveryOrdersManagementData,
  TableCompoProps,
} from "../../../types";

const allOptions = [
  { key: "partyGroup", label: "Party Group" },
  { key: "lotNumber", label: "Lot No." },
  {
    key: "orderQuantityInKgs",
    label: "Order Quantity(in Kgs.)",
  },
  {
    key: "saleQuantityInKgs",
    label: "Sale Quantity(in Kgs.)",
  },
  {
    key: "doQuantityInKgs",
    label: "Do Quantity(in Kgs.)",
  },
  {
    key: "balanceQuantityInKgs",
    label: "Balance Quantity(in Kgs.)",
  },
  { key: "paymentTerms", label: "Payment Terms" },
  { key: "listPrice", label: "List Price" },
  { key: "basicRate", label: "Basic Rate" },
  { key: "netRate", label: "Net Rate" },
  {
    key: "advanceReceived",
    label: "Advanced Received",
    render: (value: boolean) => (value ? "Yes" : "No"),
  },
  { key: "grade", label: "Grade" },
  { key: "subGrade", label: "Subgrade" },
  { key: "copsCheese", label: "Cops/Cheese" },
  { key: "remark", label: "Remark" },
  { key: "rate", label: "Rate" },
  { key: "boxPieces", label: "Pieces/Box" },
  {
    key: "orderDate",
    label: "Order Date",
    render: (value: string) =>
      value ? dayjs(value).format("DD/MM/YYYY HH:mm") : "-",
  },
  {
    key: "doDateAndTime",
    label: "D.O. Date & Time",
    render: (value: string) =>
      value ? dayjs(value).format("DD/MM/YYYY HH:mm") : "-",
  },
];

const DeliveryOrderTable = ({
  data,
  loading,
  pagination,
  handleTableChange,
}: TableCompoProps<DeliveryOrdersManagementData>) => {
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  const baseColumns = [
    {
      title: "Sr. No.",
      dataIndex: "srNo",
      render: (_: unknown, __: unknown, index: number) => {
        const currentPage = pagination?.current ?? 1;
        const pageSize = pagination?.pageSize ?? 10;

        return (currentPage - 1) * pageSize + index + 1;
      },
    },
    {
      title: "Order No.",
      dataIndex: "orderNumber",
    },
    {
      title: "D.O. No.",
      dataIndex: "deliveryOrderNumber",
    },
    { title: "Party Group", dataIndex: "partyGroup" },
    {
      title: "Party Name",
      dataIndex: "partyName",
    },
    {
      title: "Item Name",
      dataIndex: "itemName",
    },
    {
      title: "Quantity (in Kgs.)",
      dataIndex: "orderQuantityInKgs",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Gst",
      dataIndex: "gst",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (_: string, record: DeliveryOrdersManagementData) =>
        record.status ? (
          <Tag
            color={
              record.status === "Rejected"
                ? "error"
                : record.status === "Approved"
                  ? "success"
                  : record.status === "Pending"
                    ? "processing"
                    : "default"
            }
          >
            {record.status}
          </Tag>
        ) : (
          "-"
        ),
    },
  ];

  const dynamicColumns = selectedColumns.map((colKey) => {
    const option = allOptions.find((o) => o.key === colKey);
    return {
      title: option?.label || colKey,
      dataIndex: colKey,
      render:
        option?.render ||
        ((value: unknown) =>
          value === null || value === undefined || value === ""
            ? "-"
            : String(value)),
    };
  });

  const statusIndex = baseColumns.findIndex((c) => c.dataIndex === "status");

  let columns = [];

  if (statusIndex !== -1) {
    columns = [
      ...baseColumns.slice(0, statusIndex),
      ...dynamicColumns,
      baseColumns[statusIndex],
    ];
  } else {
    columns = [...baseColumns, ...dynamicColumns];
  }

  return (
    <>
      <Flex gap={10} align="center" wrap="wrap" className="deliverytable-flex">
        {allOptions.map((opt) => (
          <Checkbox
            key={opt.key}
            className="text-table"
            checked={selectedColumns.includes(opt.key)}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedColumns([...selectedColumns, opt.key]);
              } else {
                setSelectedColumns(
                  selectedColumns.filter((c) => c !== opt.key),
                );
              }
            }}
          >
            {opt.label}
          </Checkbox>
        ))}
      </Flex>

      <Table
        className="delivery-table-component"
        rowKey="orderNumber"
        columns={columns}
        dataSource={data as DeliveryOrdersManagementData[]}
        loading={loading}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
        }}
        onChange={handleTableChange}
        scroll={{
          x: "1200px",
        }}
      />
    </>
  );
};

export default DeliveryOrderTable;
