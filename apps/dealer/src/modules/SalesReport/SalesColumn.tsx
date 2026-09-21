import { Button, Flex, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";

import type { Sale } from "./types";

const { Text } = Typography;

export const getSalesColumns = (
  expandedRowKeys: number[],
  toggleExpand: (id: number) => void,
): ColumnsType<Sale> => [
  {
    title: "Sr. No.",
    dataIndex: "id",
    render: (id: number) => {
      const expanded = expandedRowKeys.includes(id);

      return (
        <Flex gap={10} align="center">
          <Button
            type="text"
            size="small"
            className="expand-box"
            onClick={() => toggleExpand(id)}
          >
            {expanded ? "−" : "+"}
          </Button>
          <Text>{id}</Text>
        </Flex>
      );
    },
  },
  { title: "Bill Date", dataIndex: "billDate" },
  { title: "Bill No.", dataIndex: "billNo" },
  { title: "Party Name", dataIndex: "partyName" },
  { title: "Quantity", dataIndex: "quantity" },
  { title: "Net Amount", dataIndex: "netAmount" },
  { title: "Total Qty", dataIndex: "totalQuantity" },
  { title: "Gross Amount", dataIndex: "grossAmount" },
  { title: "Add/Less", dataIndex: "addLess" },
  { title: "Taxable Amount", dataIndex: "taxableAmount" },
  { title: "Total Tax", dataIndex: "totalTax" },
];
