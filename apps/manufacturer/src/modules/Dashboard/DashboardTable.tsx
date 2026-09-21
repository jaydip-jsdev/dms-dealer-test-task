import { Table } from "antd";

import { columns, data } from "./constant";

export const DashboardTable = () => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{ pageSize: 10, total: data.length }}
    />
  );
};
