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

import { updateIsActiveItem } from "../../api/services/itemService";
import type { Item, TableCompoProps } from "../../types";

const ItemListTable = ({
  data,
  loading,
  pagination,
  handleTableChange,
  loadData,
}: TableCompoProps<Item>) => {
  const current = pagination.current ?? 1;
  const pageSize = pagination.pageSize ?? 10;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const handleToggle = (checked: boolean, record: Item) => {
    setSelectedItem({ ...record, isActive: checked });
    setIsModalOpen(true);
  };

  const handleModalOk = async () => {
    try {
      if (!selectedItem) return;
      const payload = { isActive: selectedItem.isActive };
      const res = await updateIsActiveItem(selectedItem.id, payload);
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
  const columns: TableProps<Item>["columns"] = [
    {
      title: "Sr. No.",
      key: "sr_no",
      render: (_, __, index) => {
        return (current - 1) * pageSize + index + 1;
      },
      width: 70,
    },
    {
      title: "Code",
      dataIndex: "itemCode",
    },
    {
      title: "Item Name",
      dataIndex: "itemName",
    },
    {
      title: "Hsn Code",
      dataIndex: "hsnCode",
    },
    {
      title: "Item Unit",
      dataIndex: "itemUnit",
    },
    {
      title: "Item Group",
      dataIndex: "itemGroup",
    },
    {
      title: "Item Category",
      dataIndex: "itemCategory",
    },
    {
      title: "Active/Inactive",
      dataIndex: "isActive",
      render: (_: string, record: Item) => (
        <Switch
          checked={record.isActive}
          onChange={(checked) => handleToggle(checked, record)}
        />
      ),
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
        }}
        onChange={handleTableChange}
        rowKey="itemCode"
        scroll={{
          x: "1200px",
        }}
      />

      <Modal
        title={
          "Are you sure you want to " +
          (selectedItem?.isActive ? "Active" : "Inactive") +
          " this item?"
        }
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

export default ItemListTable;
