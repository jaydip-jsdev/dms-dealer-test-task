import type { TableProps } from "antd";

export const priceTableColumn: TableProps["columns"] = [
  { title: "Sr. No.", dataIndex: "sr_no", width: 73 },
  { title: "Item Name", dataIndex: "item_name", width: 179 },
  {
    title: "Sub Grade Name",
    children: [
      {
        title: "1ST",
        children: [
          { title: "A1", dataIndex: "a1" },
          { title: "A2", dataIndex: "a2" },
          { title: "A3", dataIndex: "a3" },
          { title: "A4", dataIndex: "a4" },
        ],
      },
      {
        title: "PQ",
        children: [{ title: "PQ", dataIndex: "pq" }],
      },
      {
        title: "CLQ",
        children: [{ title: "CLQ", dataIndex: "clq" }],
      },
    ],
  },
];
