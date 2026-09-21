import { ExportOutlined } from "@ant-design/icons";
import { Button, Card, DatePicker, Flex, Table, Typography } from "antd";
import React, { useState } from "react";

import "./SalesReport.scss";
import { salesRows, SalesBoxData } from "./constant";
import { getSalesColumns } from "./SalesColumn";
import { SalesItemColumn, SalesTaxSubColumn } from "./SalesSubColumn";
import type { Sale, SaleTax } from "./types";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const SalesReport: React.FC = () => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<number[]>([]);

  const toggleExpand = (id: number) => {
    setExpandedRowKeys((prev) =>
      prev.includes(id) ? prev.filter((key) => key !== id) : [...prev, id],
    );
  };

  const columns = React.useMemo(
    () => getSalesColumns(expandedRowKeys, toggleExpand),
    [expandedRowKeys],
  );
  const expandedRowRender = React.useCallback((record: Sale) => {
    const taxData: SaleTax[] = [
      {
        cgst: record.taxes.cgst,
        sgst: record.taxes.sgst,
        igst: record.taxes.igst,
        tds: record.taxes.tds,
        totalTax: record.taxes.totalTax,
      },
    ];

    return (
      <Flex vertical className="expanded-wrapper">
        <Table
          columns={SalesItemColumn}
          dataSource={record.items}
          pagination={false}
          rowKey="itemName"
          size="small"
        />
        <Table
          columns={SalesTaxSubColumn}
          dataSource={taxData}
          pagination={false}
          rowKey="totalTax"
          size="small"
        />
      </Flex>
    );
  }, []);

  return (
    <Flex className="sales-container" vertical gap={12}>
      <Flex gap={16}>
        {SalesBoxData.map((item) => (
          <Card key={item.id} className="sales-box">
            <Flex vertical align="start" gap={2}>
              <Text>{item.name}</Text>
              <Text className="box-value">{item.value}</Text>
            </Flex>
          </Card>
        ))}
      </Flex>

      <Title level={5}>Sales</Title>
      <Flex justify="end" gap={8}>
        <RangePicker />
        <Button icon={<ExportOutlined />}>Export</Button>
      </Flex>

      <Table
        columns={columns}
        dataSource={salesRows}
        rowKey="id"
        expandable={{
          expandedRowRender,
          expandedRowKeys,
          expandIcon: () => null,
        }}
        pagination={{ pageSize: 10 }}
      />
    </Flex>
  );
};

export default SalesReport;
