import { ExportOutlined } from "@ant-design/icons";
import {
  Button,
  Table,
  Typography,
  Flex,
  Select,
  DatePicker,
  Checkbox,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import "./Ledger.scss";
import type { FC } from "react";

import { ledgerRows } from "./constant";
import type { LedgerRow } from "./types";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const columns: ColumnsType<LedgerRow> = [
  { title: "Sr. No.", dataIndex: "sr", key: "sr" },
  { title: "Type", dataIndex: "type", key: "type" },
  { title: "Date", dataIndex: "date", key: "date" },
  { title: "Account", dataIndex: "account", key: "account" },
  { title: "Bill No.", dataIndex: "billNo", key: "billNo" },
  { title: "Doc No.", dataIndex: "docNo", key: "docNo" },
  { title: "Cheque No.", dataIndex: "chequeNo", key: "chequeNo" },
  { title: "Debit", dataIndex: "debit", key: "debit" },
  { title: "Credit", dataIndex: "credit", key: "credit" },
  { title: "Balance", dataIndex: "balance", key: "balance" },
];

const Ledger: FC = () => {
  return (
    <Flex className="ledger-container" vertical gap={12}>
      <Title level={5}>Ledger</Title>
      <Flex justify="end" gap={8}>
        <Select placeholder="Select Billing Party" />
        <RangePicker />
        <Button icon={<ExportOutlined />}>Export</Button>
      </Flex>

      <Flex className="ledger-remark-toggle">
        <Checkbox>Show Remark</Checkbox>
      </Flex>

      <Flex vertical className="ledger-party-info">
        {[
          { label: "Billing Party Name", value: "Rahul Patel" },
          { label: "Address", value: "Ahmedabad" },
          { label: "GST No.", value: "GS034089" },
        ].map(({ label, value }) => (
          <Flex className="info-row" key={label}>
            <Text className="label">{label}</Text>
            <Text className="value">{value}</Text>
          </Flex>
        ))}
      </Flex>

      <Table
        columns={columns}
        dataSource={ledgerRows}
        pagination={{ pageSize: 10 }}
      />
    </Flex>
  );
};

export default Ledger;
