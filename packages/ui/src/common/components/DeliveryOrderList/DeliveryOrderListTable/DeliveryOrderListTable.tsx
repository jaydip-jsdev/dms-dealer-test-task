import { MoreOutlined } from "@ant-design/icons";
import {
  Checkbox,
  Flex,
  Table,
  Tag,
  type CheckboxChangeEvent,
  Dropdown,
  type MenuProps,
} from "antd";
import type { ColumnType } from "antd/es/table";
import { useState, type ReactElement } from "react";

import "./DeliveryOrderListTable.scss";
import type { DeliveryOrderType, ColumnOption } from "../types";

interface DeliveryOrderTableProps {
  data: DeliveryOrderType[];
  columnOptions: ColumnOption[];
  onEditClick?: (record: DeliveryOrderType) => void;
}

const DeliveryOrderListTable = ({
  data,
  columnOptions,
  onEditClick,
}: DeliveryOrderTableProps) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  const allSelected = selectedRowKeys.length === data.length;

  const handleHeaderCheck = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setSelectedRowKeys(data.map((d) => d.sr_no));
    } else {
      setSelectedRowKeys([]);
    }
  };

  const handleRowCheck = (sr_no: number, checked: boolean) => {
    if (checked) {
      setSelectedRowKeys([...selectedRowKeys, sr_no]);
    } else {
      setSelectedRowKeys(selectedRowKeys.filter((key) => key !== sr_no));
    }
  };

  const baseColumns: ColumnType<DeliveryOrderType>[] = [
    {
      title: <Checkbox checked={allSelected} onChange={handleHeaderCheck} />,
      dataIndex: "checkbox",
      render: (_: ReactElement, record: DeliveryOrderType) => (
        <Checkbox
          checked={selectedRowKeys.includes(record.sr_no)}
          onChange={(e) => handleRowCheck(record.sr_no, e.target.checked)}
        />
      ),
      width: 50,
    },
    {
      title: "Sr. No.",
      dataIndex: "sr_no",
      width: 80,
    },
    {
      title: "Code",
      dataIndex: "code",
      width: 100,
    },
    {
      title: "Order No.",
      dataIndex: "order_no",
      width: 100,
    },
    {
      title: "Party Name",
      dataIndex: "party_name",
      width: 120,
    },
    {
      title: "Item Name",
      dataIndex: "item_name",
      width: 100,
    },
    {
      title: "Quantity (in Kgs.)",
      dataIndex: "quantity",
      width: 120,
    },
    {
      title: "Address",
      dataIndex: "address",
      width: 120,
    },
    {
      title: "Gst",
      dataIndex: "gst",
      width: 100,
    },
    {
      title: "Rate",
      dataIndex: "rate",
      width: 80,
    },
    {
      title: "Pieces / Box",
      dataIndex: "pieces_box",
      width: 100,
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 100,
      render: (_: string, record: DeliveryOrderType) => (
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
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 80,
      align: "center",
      render: (_: unknown, record: DeliveryOrderType) => {
        const items: MenuProps["items"] = [
          {
            key: "edit",
            label: "Edit",
            onClick: () => onEditClick?.(record),
          },
        ];

        return (
          <Dropdown menu={{ items }}>
            <MoreOutlined style={{ cursor: "pointer" }} />
          </Dropdown>
        );
      },
    },
  ];

  const dynamicColumns: ColumnType<DeliveryOrderType>[] = selectedColumns.map(
    (colKey) => {
      const option = columnOptions.find((o) => o.key === colKey);
      return {
        title: option?.label || colKey,
        dataIndex: colKey as keyof DeliveryOrderType,
        render: (val?: string | number | null) => val || "-",
        width: 120,
      };
    },
  );

  const statusCol = baseColumns.find((c) => c.dataIndex === "status");
  const actionCol = baseColumns.find((c) => c.key === "action");
  const filteredBaseColumns = baseColumns.filter(
    (c) => c.dataIndex !== "status" && c.key !== "action",
  );
  const columns: ColumnType<DeliveryOrderType>[] = [
    ...filteredBaseColumns,
    ...dynamicColumns,
  ];
  if (statusCol) {
    columns.push(statusCol);
  }
  if (actionCol) {
    columns.push(actionCol);
  }

  return (
    <>
      <Flex gap={10} align="center" wrap="wrap" className="deliverytable-flex">
        {columnOptions.map((opt) => (
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
        rowKey="sr_no"
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10, total: data.length }}
      />
    </>
  );
};

export default DeliveryOrderListTable;
