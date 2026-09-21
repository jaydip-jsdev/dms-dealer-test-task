import type { TableProps } from "antd";

import type { Design } from "../../types";

export const designTableColumn = (
  page: number,
  pageSize: number,
): TableProps<Design>["columns"] => [
  {
    title: "Sr. No.",
    key: "sr_no",
    render: (_, __, index) => {
      return (page - 1) * pageSize + index + 1;
    },
    width: 70,
  },
  {
    title: "Design Number",
    dataIndex: "designNumber",
  },
];
