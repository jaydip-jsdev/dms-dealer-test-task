import type { TableProps } from "antd";

import type { SubGrade } from "../../types";
const subGradeTableColumn = (
  page: number,
  pageSize: number,
): TableProps<SubGrade>["columns"] => [
  {
    title: "Sr. No.",
    dataIndex: "sr_no",
    width: 75,
    render: (_, __, index) => {
      return (page - 1) * pageSize + index + 1;
    },
  },
  { title: "Grade", dataIndex: "grade" },
  { title: "Sub Grade", dataIndex: "subGrade" },
];

export default subGradeTableColumn;
