import { Table } from "antd";

import type { Design, TableCompoProps } from "../../../types";
import { designTableColumn } from "../constant";

export const DesignTable = ({
  data,
  loading,
  pagination,
  handleTableChange,
}: TableCompoProps<Design>) => {
  const current = pagination.current ?? 1;
  const pageSize = pagination.pageSize ?? 10;
  const columns = designTableColumn(current, pageSize);
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
      rowKey="designCode"
    />
  );
};
