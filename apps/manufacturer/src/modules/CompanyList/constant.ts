import type { TableProps } from "antd";

import type { Company } from "../../types";

export const companyTableColumn = (
  page: number,
  pageSize: number,
): TableProps<Company>["columns"] => [
  {
    title: "Sr. No.",
    key: "sr_no",
    render: (_, __, index) => {
      return (page - 1) * pageSize + index + 1;
    },
    width: 70,
  },
  {
    title: "Company Name",
    dataIndex: "companyName",
  },
  {
    title: "Office Address",
    dataIndex: "officeAddress",
  },
  {
    title: "Factory Address",
    dataIndex: "factoryAddress",
  },
  {
    title: "Mobile No.",
    dataIndex: "officePhone",
  },
  {
    title: "Gst No.",
    dataIndex: "gstNumber",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
];
