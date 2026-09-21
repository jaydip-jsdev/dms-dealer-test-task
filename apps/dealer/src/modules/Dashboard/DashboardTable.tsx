import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

import { doTableData } from "./constant";
import type { DoRow } from "./types";

export const DashboardTable = () => {
  const columns: ColumnsType<DoRow> = [
    { title: "D.O. No.", dataIndex: "doNo", key: "doNo" },
    { title: "Order No.", dataIndex: "orderNo", key: "orderNo" },
    { title: "Party Name", dataIndex: "partyName", key: "partyName" },
    { title: "Item Name", dataIndex: "itemName", key: "itemName" },
    { title: "Quantity (in Kgs.)", dataIndex: "quantity", key: "quantity" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Gst", dataIndex: "gst", key: "gst" },
    { title: "Rate", dataIndex: "rate", key: "rate" },
    { title: "Pieces / Box", dataIndex: "pieces", key: "pieces" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag
          color={
            status === "Approved"
              ? "green"
              : status === "Rejected"
                ? "red"
                : "gold"
          }
        >
          {status}
        </Tag>
      ),
    },
  ];

  return (
    <Table columns={columns} dataSource={doTableData} pagination={false} />
  );
};
