import { ExportOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Typography } from "antd";
import { useState } from "react";
import "./CommonDeliveryOrderList.scss";

import AddDeliveryOrder from "./AddDeliveryOrder/AddDeliveryOrder";
import DeliveryOrderListTable from "./DeliveryOrderListTable/DeliveryOrderListTable";
import type { DeliveryOrderType, CommonDeliveryOrderListProps } from "./types";

const { Title } = Typography;
const { Search } = Input;

const CommonDeliveryOrderList = ({
  data,
  columnOptions,
  onAddClick,
  onSearch,
  onExport,
  onAddFormSubmit,
  onEditClick,
}: CommonDeliveryOrderListProps) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [editingRecord, setEditingRecord] = useState<DeliveryOrderType | null>(
    null,
  );

  const handleAddClick = () => {
    setEditingRecord(null);
    setIsAddModalOpen(true);
    onAddClick?.();
  };

  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
    setEditingRecord(null);
  };

  const handleFormSubmit = (formData: DeliveryOrderType) => {
    onAddFormSubmit?.(formData);
    handleAddModalClose();
  };

  const handleEditClick = (record: DeliveryOrderType) => {
    setEditingRecord(record);
    setIsAddModalOpen(true);
    onEditClick?.(record);
  };

  return (
    <Flex vertical className="deliveryorder-container">
      <Title level={5}>Delivery Order List</Title>

      <Flex className="delivery-title-container">
        <Search
          className="delivery-searchbar"
          placeholder="Search Delivery Order"
          onSearch={onSearch}
        />

        <Flex className="delivery-tools-container" gap={12}>
          <Button onClick={onExport}>
            <ExportOutlined />
            Export
          </Button>
          <Button type="primary" onClick={handleAddClick}>
            <PlusOutlined />
            Add Delivery Order
          </Button>
        </Flex>
      </Flex>

      <DeliveryOrderListTable
        data={data}
        columnOptions={columnOptions}
        onEditClick={handleEditClick}
      />

      <AddDeliveryOrder
        open={isAddModalOpen}
        onClose={handleAddModalClose}
        onSubmit={handleFormSubmit}
        initialData={editingRecord || undefined}
      />
    </Flex>
  );
};

export default CommonDeliveryOrderList;
