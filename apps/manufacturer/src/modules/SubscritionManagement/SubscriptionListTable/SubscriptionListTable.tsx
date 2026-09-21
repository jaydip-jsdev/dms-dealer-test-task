import { Table } from "antd";
import "./SubscriptionListTable.scss";

import type { SubscriptionListType, TableCompoProps } from "../../../types";
import columns from "../constant";

const SubscriptionListTable = ({
  data,
  loading,
  pagination,
  handleTableChange,
}: TableCompoProps<SubscriptionListType>) => {
  const current = pagination.current ?? 1;
  const pageSize = pagination.pageSize ?? 10;
  return (
    <Table
      className="table-component"
      columns={columns(current, pageSize)}
      dataSource={data}
      loading={loading}
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total,
      }}
      scroll={{
        x: "1200px",
      }}
      onChange={handleTableChange}
      rowKey="subscriptionCode"
    />
  );
};

export default SubscriptionListTable;
