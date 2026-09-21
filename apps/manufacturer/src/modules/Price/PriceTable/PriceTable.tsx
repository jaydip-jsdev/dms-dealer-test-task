import { Table, Typography } from "antd";

import { priceTableColumn, priceTableData } from "../constant";
const { Title } = Typography;

const PriceTable = () => {
  return (
    <Table
      columns={priceTableColumn}
      title={() => <Title level={5}>Effective Date: 19/08/2025</Title>}
      dataSource={priceTableData}
      rowKey="sr_no"
    />
  );
};

export default PriceTable;
