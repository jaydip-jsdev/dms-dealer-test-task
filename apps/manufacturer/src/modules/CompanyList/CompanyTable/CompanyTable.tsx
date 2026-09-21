import { Table } from "antd";

import type { Company, TableCompoProps } from "../../../types";
import { companyTableColumn } from "../constant";

const CompanyTable = ({
  data,
  loading,
  pagination,
  handleTableChange,
}: TableCompoProps<Company>) => {
  const current = pagination.current ?? 1;
  const pageSize = pagination.pageSize ?? 10;
  const columns = companyTableColumn(current, pageSize);

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
      rowKey="companyCode"
    />
  );
};

export default CompanyTable;
