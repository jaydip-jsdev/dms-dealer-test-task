import type { TableProps } from "antd";

import type { PaymentTerm } from "../../types";

export const paymentTermsTableColumn = (
  page: number,
  pageSize: number,
): TableProps<PaymentTerm>["columns"] => [
  {
    title: "Sr. No.",
    key: "sr_no",
    render: (_, __, index) => {
      return (page - 1) * pageSize + index + 1;
    },
    width: 70,
  },
  { title: "Terms", dataIndex: "paymentName" },
  {
    title: "Percentage",
    dataIndex: "paymentPercentage",
    render: (value) =>
      isNaN(parseFloat(value)) ? "N/A" : `${parseFloat(value)}%`,
  },
  { title: "Payment Type", dataIndex: "paymentType" },
  { title: "Credit Days", dataIndex: "dueDays" },
];
