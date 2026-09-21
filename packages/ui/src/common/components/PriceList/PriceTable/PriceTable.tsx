import { Table, Typography } from "antd";

import { priceTableColumn } from "./columns";

const { Title } = Typography;

interface PriceTableProps<T> {
  data: T[];
  effectiveDate: string;
}

const PriceTable = <T extends object>({
  data,
  effectiveDate,
}: PriceTableProps<T>) => {
  return (
    <Table
      columns={priceTableColumn}
      dataSource={data}
      title={() => <Title level={5}>Effective Date: {effectiveDate}</Title>}
      rowKey="sr_no"
    />
  );
};

export default PriceTable;
