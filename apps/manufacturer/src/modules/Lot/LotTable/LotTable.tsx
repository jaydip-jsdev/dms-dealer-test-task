import type { ApiErrorResponse } from "@repo/ui";
import {
  Button,
  Flex,
  message,
  Modal,
  Switch,
  Table,
  type TableProps,
} from "antd";
import type { AxiosError } from "axios";
import { useState } from "react";

import { updateIsActiveLot } from "../../../api/services/lotService";
import type { Lot, TableCompoProps } from "../../../types";

const LotTable = ({
  data,
  loading,
  pagination,
  handleTableChange,
  loadData,
}: TableCompoProps<Lot>) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Lot | null>(null);
  const current = pagination.current ?? 1;
  const pageSize = pagination.pageSize ?? 10;

  const handleToggle = (checked: boolean, record: Lot) => {
    setSelectedItem({ ...record, isActive: checked });
    setIsModalOpen(true);
  };

  const handleModalOk = async () => {
    try {
      if (!selectedItem) return;
      const payload = { isActive: selectedItem.isActive };
      const res = await updateIsActiveLot(selectedItem?.id, payload);
      if (res) {
        if (loadData) loadData();
        setIsModalOpen(false);
        setSelectedItem(null);
      }
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;
      message.error(error.response?.data.message ?? error.message);
    }
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const lotTableColumn: TableProps<Lot>["columns"] = [
    {
      title: "Sr. No.",
      key: "sr_no",
      render: (_, __, index) => {
        return (current - 1) * pageSize + index + 1;
      },
      width: 70,
    },
    {
      title: "Lot Number",
      dataIndex: "lotNumber",
    },
    {
      title: "Item Name",
      dataIndex: "itemName",
    },
    {
      title: "Active/Inactive",
      dataIndex: "isActive",
      render: (_: boolean, record: Lot) => (
        <Switch
          checked={record.isActive}
          onChange={(checked) => handleToggle(checked, record)}
        />
      ),
      width: 130,
    },
  ];

  return (
    <>
      <Table
        columns={lotTableColumn}
        dataSource={data}
        loading={loading}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
        }}
        onChange={handleTableChange}
        rowKey="lotNumber"
      />
      <Modal
        title={`${selectedItem?.isActive ? "Are you sure you want to Inactive Lot?" : "Are you sure you want to Active Lot?"}`}
        open={isModalOpen}
        closable={false}
        footer={
          <Flex justify="space-between">
            <Button onClick={handleModalCancel}>No</Button>
            <Button type="primary" onClick={handleModalOk}>
              Yes
            </Button>
          </Flex>
        }
      />
    </>
  );
};

export default LotTable;
