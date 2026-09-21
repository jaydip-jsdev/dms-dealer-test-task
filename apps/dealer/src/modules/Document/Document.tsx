import {
  DownloadOutlined,
  FilterOutlined,
  PaperClipOutlined,
} from "@ant-design/icons";
import {
  Button,
  Table,
  Typography,
  Flex,
  DatePicker,
  Popover,
  Input,
  Space,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import "./Document.scss";

import { documentRows } from "./constant";
import DocumentFilter from "./DocumentFilter";
import type { DocumentRow } from "./types";

const { Title, Link, Text } = Typography;
const { RangePicker } = DatePicker;
const { Search } = Input;

const columns: ColumnsType<DocumentRow> = [
  { title: "Sr. No.", dataIndex: "sr", key: "sr" },
  { title: "Doc No.", dataIndex: "docNo", key: "docNo" },
  { title: "Date", dataIndex: "date", key: "date" },
  { title: "Billing Party", dataIndex: "billingParty", key: "billingParty" },
  { title: "Type", dataIndex: "type", key: "type" },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (amount) => <Text>{amount}</Text>,
  },
  {
    title: "Document",
    key: "document",
    render: (_, record) => (
      <Space size={12}>
        <PaperClipOutlined />
        <Link>{record.document}</Link>
      </Space>
    ),
  },
  {
    key: "download",
    align: "center",
    width: 48,
    render: () => (
      <Button type="link">
        <DownloadOutlined />
      </Button>
    ),
  },
];

const Document = () => {
  return (
    <div className="document-container">
      <Title level={5}>Document</Title>
      <Flex justify="space-between" className="document-tools">
        <Flex>
          <Search placeholder="Search Order" />
        </Flex>
        <Flex gap={10}>
          <RangePicker />
          <Popover
            placement="bottomRight"
            title="Filter Options"
            trigger="click"
            content={
              <DocumentFilter
                onApply={() => {
                  // console.log(values)
                }}
                onReset={() => {
                  // console.log("reset")
                }}
              />
            }
          >
            <Button>
              <FilterOutlined />
              Filter
            </Button>
          </Popover>
        </Flex>
      </Flex>
      <Table
        columns={columns}
        dataSource={documentRows}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default Document;
