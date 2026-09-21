import { ExportOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Select, Typography } from "antd";

import "./PriceList.scss";
import PriceTable from "./PriceTable/PriceTable";
import type { PriceListProps } from "./types";

const { Title } = Typography;
const { Search } = Input;

const CommonPriceListComponent = ({
  data,
  effectiveDate,
  onSearch,
  onEffectiveDateChange,
  onExport,
}: PriceListProps) => {
  return (
    <Flex className="price-page-container" vertical gap={20}>
      <Flex vertical>
        <Title level={5}>Price List</Title>
        <Flex justify="space-between">
          <Search
            placeholder="Search Price"
            className="search-field"
            onSearch={onSearch}
          />
          <Flex gap={10}>
            <Select
              className="select-field"
              placeholder="Select Effective Date"
              onChange={onEffectiveDateChange}
            />
            <Button icon={<ExportOutlined />} onClick={onExport}>
              Export
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <PriceTable data={data} effectiveDate={effectiveDate} />
    </Flex>
  );
};

export default CommonPriceListComponent;
