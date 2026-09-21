import { Table } from "antd";

import type { PaymentTerm, TableCompoProps } from "../../../types";
import { paymentTermsTableColumn } from "../constant";

const PaymentTermsTable = ({
  data,
  loading,
  pagination,
  handleTableChange,
}: TableCompoProps<PaymentTerm>) => {
  const current = pagination.current ?? 1;
  const pageSize = pagination.pageSize ?? 10;
  const columns = paymentTermsTableColumn(current, pageSize);

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
      rowKey="paymentCode"
    />
  );
};

export default PaymentTermsTable;
