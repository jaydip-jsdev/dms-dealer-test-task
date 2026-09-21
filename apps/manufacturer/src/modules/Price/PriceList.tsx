import { ExportOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Select, Typography } from "antd";
import "./PriceList.scss";

import PriceTable from "./PriceTable/PriceTable";
const { Title } = Typography;
const { Search } = Input;
const PriceList = () => {
  return (
    <Flex className="price-page-container" vertical gap={20}>
      <Flex vertical>
        <Title level={5}>Price List</Title>
        <Flex justify="space-between">
          <Search placeholder="Search Price" className="search-field" />
          <Flex gap={10}>
            <Select
              className="select-field"
              placeholder="Select Effective Date"
            />
            <Button icon={<ExportOutlined />}>Export</Button>
          </Flex>
        </Flex>
      </Flex>
      <PriceTable />
    </Flex>
  );
};

export default PriceList;
