import type { ColumnsType } from "antd/es/table";

import type { SaleItem, SaleTax } from "./types";

export const SalesItemColumn: ColumnsType<SaleItem> = [
  {
    title: "",
    dataIndex: "__empty1",
    width: 60,
    render: () => null,
  },
  {
    title: "",
    dataIndex: "__empty2",
    width: 80,
    render: () => null,
  },
  {
    title: "Item Name",
    dataIndex: "itemName",
  },
  {
    title: "Item Rate",
    dataIndex: "itemRate",
  },
  {
    title: "Gross Amount",
    dataIndex: "grossAmount",
  },
  {
    title: "Add / Less",
    dataIndex: "addLess",
  },
  {
    title: "Taxable Amount",
    dataIndex: "taxableAmount",
  },
  {
    title: "Tax",
    dataIndex: "tax",
  },
  {
    title: "Item Amount",
    dataIndex: "itemAmount",
  },
];

export const SalesTaxSubColumn: ColumnsType<SaleTax> = [
  {
    title: "",
    dataIndex: "__empty1",
    width: 60,
    render: () => null,
  },
  {
    title: "",
    dataIndex: "__empty2",
    width: 80,
    render: () => null,
  },
  {
    title: "CGST",
    dataIndex: "cgst",
  },
  {
    title: "SGST",
    dataIndex: "sgst",
  },
  {
    title: "IGST",
    dataIndex: "igst",
  },
  {
    title: "TDS",
    dataIndex: "tds",
  },
  {
    title: "Total Tax",
    dataIndex: "totalTax",
  },
];
