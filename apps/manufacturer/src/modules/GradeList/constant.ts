import type { TableProps } from "antd";

import type { Grade } from "../../types";

export const gradeTableColumn = (
  page: number,
  pageSize: number,
): TableProps<Grade>["columns"] => [
  {
    title: "Sr. No.",
    key: "sr_no",
    render: (_, __, index) => {
      return (page - 1) * pageSize + index + 1;
    },
    width: 70,
  },
  { title: "Code", dataIndex: "gradeCode", width: 155 },
  { title: "Grade", dataIndex: "grade" },
];
