import { Table } from "antd";

import type { SubGrade, TableCompoProps } from "../../../types";
import subGradeTableColumn from "../constant";

const SubGradeTable = ({
  data,
  loading,
  pagination,
  handleTableChange,
}: TableCompoProps<SubGrade>) => {
  const current = pagination.current ?? 1;
  const pageSize = pagination.pageSize ?? 10;
  const columns = subGradeTableColumn(current, pageSize);
  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total,
      }}
      onChange={handleTableChange}
      rowKey="subGradeCode"
    />
  );
};

export default SubGradeTable;
