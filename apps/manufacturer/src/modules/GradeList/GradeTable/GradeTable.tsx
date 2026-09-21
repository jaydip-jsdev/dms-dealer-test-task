import { Table } from "antd";

import type { Grade, TableCompoProps } from "../../../types";
import { gradeTableColumn } from "../constant";

const GradeTable = ({
  data,
  loading,
  pagination,
  handleTableChange,
}: TableCompoProps<Grade>) => {
  const current = pagination.current ?? 1;
  const pageSize = pagination.pageSize ?? 10;
  const columns = gradeTableColumn(current, pageSize);

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
      rowKey="gradeCode"
    />
  );
};

export default GradeTable;
