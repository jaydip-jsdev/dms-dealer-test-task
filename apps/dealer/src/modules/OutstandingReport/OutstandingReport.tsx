import { ExportOutlined, FilterOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Popover, Select, Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useState, useMemo } from "react";

import "./OutstandingReport.scss";
import {
  OutstandingBoxData,
  OutstandingReportDetail,
  outstandingTableData,
} from "./constant";
import ManageFormatModal from "./ManageFormatForm";
import OutstandingFilter from "./OutstandingFilter";
import type {
  ManageFormatData,
  ModalState,
  OutstandingFilterValues,
} from "./types";

const { Title, Text } = Typography;

type OutstandingRecord = {
  key: number;
  sr: number;
  billNo: string;
  billDate: string;
  dueAmount: number;
  totalDays: number;
  creditDays: number;
  dueDays: number;
  lpsAmount: number;
  netOrs: number;
};

const OutstandingReport: React.FC = () => {
  const [manageFormatModal, setManageFormatModal] = useState<ModalState>({
    isVisible: false,
  });

  const columns = useMemo<ColumnsType<OutstandingRecord>>(
    () => [
      {
        title: "Sr. No.",
        dataIndex: "sr",
        key: "sr",
        width: 60,
        align: "center",
      },
      {
        title: "Bill No.",
        dataIndex: "billNo",
        key: "billNo",
        width: 100,
        render: (billNo: string) => <Button type="link">{billNo}</Button>,
      },
      {
        title: "Bill Date",
        dataIndex: "billDate",
        key: "billDate",
        width: 120,
      },
      {
        title: "Due Amount",
        dataIndex: "dueAmount",
        key: "dueAmount",
        width: 120,
        align: "right",
        render: (value: number) => value.toFixed(2),
      },
      {
        title: "Total Days",
        dataIndex: "totalDays",
        key: "totalDays",
        width: 100,
        align: "center",
      },
      {
        title: "Credit Days",
        dataIndex: "creditDays",
        key: "creditDays",
        width: 110,
        align: "center",
      },
      {
        title: "Due Days",
        dataIndex: "dueDays",
        key: "dueDays",
        width: 100,
        align: "center",
      },
      {
        title: "LPS Amount",
        dataIndex: "lpsAmount",
        key: "lpsAmount",
        width: 120,
        align: "right",
        render: (value: number) => value.toFixed(2),
      },
      {
        title: "Net O/s",
        dataIndex: "netOrs",
        key: "netOrs",
        width: 120,
        align: "right",
        render: (value: number) => value.toFixed(2),
      },
    ],
    [],
  );

  const handleFormatSubmit = (data: ManageFormatData) => {
    void data;
  };

  const handleFilterApply = (values: OutstandingFilterValues) => {
    void values;
  };

  const handleFilterReset = () => {};

  return (
    <Flex className="outstanding-container" vertical gap={12}>
      <Flex gap={16}>
        {OutstandingBoxData.map((item) => (
          <Card key={item.id} className="outstanding-box">
            <Flex vertical align="start" gap={2}>
              <Text>{item.name}</Text>
              <Text className="box-value">{item.value}</Text>
            </Flex>
          </Card>
        ))}
      </Flex>

      <Title level={5}>Outstanding Report</Title>
      <Flex justify="end" gap={8}>
        <Select placeholder="Select Format" />
        <Popover
          placement="bottomRight"
          title="Filter Options"
          trigger="click"
          content={
            <OutstandingFilter
              onApply={handleFilterApply}
              onReset={handleFilterReset}
            />
          }
        >
          <Button>
            <FilterOutlined />
            Filter
          </Button>
        </Popover>
        <Button icon={<ExportOutlined />}>Export</Button>
        <Button
          type="primary"
          onClick={() => setManageFormatModal({ isVisible: true })}
        >
          Manage Format
        </Button>
      </Flex>

      <ManageFormatModal
        modalState={manageFormatModal}
        setModalState={setManageFormatModal}
        onSubmit={handleFormatSubmit}
      />

      {/* Outstanding Info Section */}
      <Flex className="outstanding-party-info">
        {OutstandingReportDetail.map(({ label, value }) => (
          <Flex className="info-row" key={label}>
            <Text className="label">{label}</Text>
            <Text className="value">{value}</Text>
          </Flex>
        ))}
      </Flex>

      {/* Table Section */}
      <Table
        columns={columns}
        dataSource={outstandingTableData}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1000 }}
        className="outstanding-table"
      />
    </Flex>
  );
};

export default OutstandingReport;
