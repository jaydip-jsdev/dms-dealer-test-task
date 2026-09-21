import { PlusOutlined } from "@ant-design/icons";
import "./ComplaintManagement.scss";
import { Button, Checkbox, Flex, Input, Typography } from "antd";
import { useState } from "react";

import AddComplaint from "./AddComplaint/AddComplaint";
import ComplainManagementTable from "./ComplainManagementTable/ComplainManagementTable";
import type { ComplaintManagementProps } from "./types";

const { Title, Text } = Typography;
const { Search } = Input;

const checkboxFilterList = [
  "Reference Invoice No.",
  "Invoice Date",
  "Created At",
  "Created By",
];

const CommonComplaintManagement = ({
  data,
  loading,
  pagination,
  initialComplaintData,
  dealerLoading,
  addUpdateComplaintLoading,
  actionLoading,
  selectedFilterColumns,
  isComplaintSelected,
  isAddComplaintModalOpen,
  isModalOpen,
  actionLogLoading,
  isAddActionLogOpen,
  setIsAddActionLogOpen,
  isActionLogOpen,
  setIsActionLogOpen,
  handleTableChange,
  onSearch,
  onAddClick,
  onDeleteClick,
  onOpenClick,
  onCloseClick,
  onReopenClick,
  onAddComplaintModalClose,
  onModalClose,
  onViewActionLogClick,
  onAddActionLogClick,
  onFilterColumnChange,
  onTableSelectionChange,
  onModalConfirm,
  onAddActionLog,
  onAddComplaintSubmit,
  actionLogs,
}: ComplaintManagementProps) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const isDisabledSubmitButton =
    addUpdateComplaintLoading ||
    (isAddComplaintModalOpen.status === "Edit" && !initialComplaintData);

  return (
    <Flex className="complaint-list-container" vertical>
      <Title level={5}>Complaint List</Title>
      <Flex justify="space-between" className="complaint-list-title">
        <Search
          className="complaint-list-search"
          placeholder="Search Complaint"
          onSearch={onSearch}
          allowClear
          enterButton
        />
        {isComplaintSelected === 0 ? (
          <Button type="primary" onClick={() => onAddClick()}>
            <PlusOutlined />
            Add Complaint
          </Button>
        ) : (
          <Flex gap={10} align="center">
            <Text>{isComplaintSelected} Selected</Text>
            <Button
              type="primary"
              onClick={() => onDeleteClick(selectedRowKeys.join(","))}
            >
              Delete Selected
            </Button>
          </Flex>
        )}
      </Flex>
      <Checkbox.Group
        options={checkboxFilterList}
        onChange={onFilterColumnChange}
        value={selectedFilterColumns}
      />
      <ComplainManagementTable
        data={data}
        loading={loading}
        pagination={pagination}
        selectedComplaintList={selectedFilterColumns}
        isModalOpen={isModalOpen}
        selectedRowKeys={selectedRowKeys}
        actionLoading={actionLoading}
        isActionLogOpen={isActionLogOpen}
        isAddActionLogOpen={isAddActionLogOpen}
        actionLogLoading={actionLogLoading}
        setSelectedRowKeys={setSelectedRowKeys}
        setIsActionLogOpen={setIsActionLogOpen}
        setIsAddActionLogOpen={setIsAddActionLogOpen}
        onTableSelectionChange={onTableSelectionChange}
        handleTableChange={handleTableChange}
        onModalClose={onModalClose}
        onModalConfirm={onModalConfirm}
        onAddComplaintEdit={onAddClick}
        onOpenClick={onOpenClick}
        onCloseClick={onCloseClick}
        onDeleteClick={onDeleteClick}
        onReopenClick={onReopenClick}
        onAddActionLog={onAddActionLog}
        actionLogs={actionLogs}
        onViewActionLogClick={onViewActionLogClick}
        onAddActionLogClick={onAddActionLogClick}
      />
      <AddComplaint
        isAddComplaintModalOpen={isAddComplaintModalOpen}
        initialComplaintData={initialComplaintData}
        dealerLoading={dealerLoading}
        onClose={onAddComplaintModalClose}
        onSubmit={onAddComplaintSubmit}
        isDisabledSubmitButton={isDisabledSubmitButton}
      />
    </Flex>
  );
};

export default CommonComplaintManagement;
