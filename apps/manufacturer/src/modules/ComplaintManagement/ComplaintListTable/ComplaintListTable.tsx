import { MoreOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Dropdown,
  Flex,
  Form,
  Input,
  Modal,
  Table,
  Tag,
  Typography,
} from "antd";
import type { CheckboxChangeEvent, MenuProps } from "antd";
import { useState, type Dispatch, type SetStateAction } from "react";

import type { ComplaintListType } from "../../../types";

import ActionLog from "./ActionLog/ActionLog";
import AddActionLog from "./ActionLog/AddActionLog/AddActionLog";
import { data } from "./ComplaintListData";

import "./ComplaintListTable.scss";

type ModalState = {
  isVisible: boolean;
  status: string;
};
interface OrderListTableProps {
  selectedComplaintList: string[];
  setIsComplaintSelected: Dispatch<SetStateAction<number>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<ModalState>>;
  isModalOpen: ModalState;
  setIsAddComplaintModalOpen: Dispatch<SetStateAction<ModalState>>;
}

const { Text } = Typography;

const ComplaintListTable = ({
  selectedComplaintList,
  setIsComplaintSelected,
  setIsModalOpen,
  isModalOpen,
  setIsAddComplaintModalOpen,
}: OrderListTableProps) => {
  const [isAddActionLogOpen, setIsAddActionLogOpen] = useState<boolean>(false);
  const [isActionLogOpen, setIsActionLogOpen] = useState<boolean>(false);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Text onClick={() => setIsActionLogOpen(true)}>Action Log</Text>,
    },
    {
      key: "2",
      label: (
        <Text
          onClick={() => setIsModalOpen({ isVisible: true, status: "Open" })}
        >
          Open
        </Text>
      ),
    },
    {
      key: "3",
      label: (
        <Text
          onClick={() => setIsModalOpen({ isVisible: true, status: "Close" })}
        >
          Close
        </Text>
      ),
    },
    {
      key: "4",
      label: (
        <Text
          onClick={() => setIsModalOpen({ isVisible: true, status: "Re-Open" })}
        >
          Reopen
        </Text>
      ),
    },
    {
      key: "5",
      label: (
        <Text
          onClick={() =>
            setIsAddComplaintModalOpen({ isVisible: true, status: "Edit" })
          }
        >
          Edit
        </Text>
      ),
    },
    {
      key: "6",
      label: (
        <Text
          onClick={() => setIsModalOpen({ isVisible: true, status: "Delete" })}
        >
          Delete
        </Text>
      ),
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const allSelected = selectedRowKeys.length === data.length;

  const handleHeaderCheck = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setSelectedRowKeys(data.map((d) => d.sr_no));
    } else {
      setSelectedRowKeys([]);
    }
  };

  const handleRowCheck = (sr_no: number, checked: boolean) => {
    if (checked) {
      setSelectedRowKeys([...selectedRowKeys, sr_no]);
    } else {
      setSelectedRowKeys(selectedRowKeys.filter((key) => key !== sr_no));
    }
  };
  const columns = [
    {
      title: <Checkbox checked={allSelected} onChange={handleHeaderCheck} />,
      dataIndex: "checkbox",
      render: (record: ComplaintListType) => (
        <Checkbox
          checked={selectedRowKeys.includes(record?.sr_no)}
          onChange={(e) => handleRowCheck(record.sr_no, e.target.checked)}
        />
      ),
    },
    {
      title: "Sr. No.",
      dataIndex: "sr_no",
    },
    {
      title: "Complaint No.",
      dataIndex: "complaint_no",
    },
    {
      title: "Complaint Date & Time",
      dataIndex: "complaint_date_time",
    },
    {
      title: "Complaint Type",
      dataIndex: "complaint_type",
    },
    {
      title: "Complaint Description",
      dataIndex: "complaint_description",
    },
    {
      title: "Concern Person Name",
      dataIndex: "concern_person_name",
    },
    {
      title: "Contact No.",
      dataIndex: "contact_no",
    },
    {
      title: "Complaint By",
      dataIndex: "complaint_by",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (_: string, record: ComplaintListType) => (
        <Tag
          color={
            record.status === "Pending"
              ? "processing"
              : record.status === "Open"
                ? "success"
                : "error"
          }
        >
          {record.status}
        </Tag>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: () => (
        <Dropdown menu={{ items }}>
          <MoreOutlined />
        </Dropdown>
      ),
    },
  ];
  const extraColumnMap: {
    [key: string]: { title: string; dataIndex: string };
  } = {
    "Dealer Name": { title: "Dealer Name", dataIndex: "dealer_name" },
    "Reference Invoice No.": {
      title: "Reference Invoice No.",
      dataIndex: "reference_invoice_no",
    },
    "Invoice Date": { title: "Invoice Date", dataIndex: "invoice_date" },
    "Created At": { title: "Created At", dataIndex: "created_at" },
    "Created By": { title: "Created By", dataIndex: "created_by" },
  };

  const extraColumns = selectedComplaintList.map(
    (name) => extraColumnMap[name],
  );
  const insertIndex = 8;
  const columnsWithOptional = [
    ...columns.slice(0, insertIndex),
    ...extraColumns,
    ...columns.slice(insertIndex),
  ];
  const handleCancelModal = () => {
    setIsModalOpen({ isVisible: false, status: "" });
  };
  setIsComplaintSelected(selectedRowKeys.length);
  return (
    <>
      <Table
        dataSource={data}
        columns={columnsWithOptional}
        scroll={{
          x: "1200px",
        }}
        rowKey="sr_no"
        pagination={{ pageSize: 10, total: data.length }}
      />
      <ActionLog
        isActionLogOpen={isActionLogOpen}
        setIsActionLogOpen={setIsActionLogOpen}
        setIsAddActionLogOpen={setIsAddActionLogOpen}
      />
      <AddActionLog
        isAddActionLogOpen={isAddActionLogOpen}
        setIsAddActionLogOpen={setIsAddActionLogOpen}
      />
      <Modal
        open={isModalOpen.isVisible}
        title={`Are you sure you want to ${isModalOpen.status} Complaint?`}
        onOk={handleCancelModal}
        onCancel={handleCancelModal}
        closable={false}
        footer={
          <Flex justify="space-between">
            <Button onClick={handleCancelModal}>No</Button>
            <Button onClick={handleCancelModal} type="primary">
              Yes
            </Button>
          </Flex>
        }
      >
        {isModalOpen.status === "Close" && (
          <Form.Item
            className="closing-remark"
            layout="vertical"
            label="Closing Remark"
            name="closing-remark"
          >
            <Input.TextArea placeholder="Enter" />
          </Form.Item>
        )}
      </Modal>
    </>
  );
};

export default ComplaintListTable;
