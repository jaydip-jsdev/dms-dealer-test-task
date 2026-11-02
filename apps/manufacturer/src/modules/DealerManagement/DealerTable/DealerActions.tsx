import { MoreOutlined } from "@ant-design/icons";
import {
  Button,
  message,
  Form,
  Dropdown,
  Input,
  Modal,
  type MenuProps,
} from "antd";
import { useState } from "react";

import { addDealer } from "../../../api/services/dealerService";
import type {
  DealerBase,
  DealerManagementData,
  DealerUpdateStatusPayload,
  modalType,
} from "../../../types";

import { AddDealerRules } from "./AddDealerRules";

interface DealerActionProps {
  record: DealerManagementData;
  handleUpdateStatus: (
    id: number,
    payload: DealerUpdateStatusPayload,
  ) => Promise<boolean>;
  Addbtn: boolean;
  setAddbtn: React.Dispatch<React.SetStateAction<boolean>>;
}
interface ModaltypesProps {
  isModalOpen: modalType;
  handleOk: () => void;
  handleCancel: () => void;
}

export const Modaltypes = ({
  isModalOpen,
  handleOk,
  handleCancel,
}: ModaltypesProps) => {
  return (
    <Modal
      open={isModalOpen.isVisible}
      title={`Are you sure you want to ${isModalOpen.status} Dealer?`}
      onOk={handleOk}
      onCancel={handleCancel}
      closable={false}
    ></Modal>
  );
};

export const DealerAction = ({
  record,
  handleUpdateStatus,
  Addbtn,
  setAddbtn,
}: DealerActionProps) => {
  const [form] = Form.useForm<DealerBase>();
  const [modalData, setModalData] = useState<modalType>({
    isVisible: false,
    status: "",
  });
  const [permissionModalOpen, setPermissionModalOpen] = useState(false);
  const ActionMenuItem: MenuProps["items"] = [
    ...(record.status === "approved"
      ? [
          { key: "rejected", label: "Reject" },
          { key: "blacklisted", label: "Blacklist" },
          { key: "managepermissions", label: "Manage Permission" },
        ]
      : []),
    ...(record.status === "pending"
      ? [
          { key: "approved", label: "Approve" },
          { key: "rejected", label: "Reject" },
        ]
      : []),
    ...(record.status === "blacklisted"
      ? [{ key: "approved", label: "Approve" }]
      : []),
  ];

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "managepermissions") {
      setPermissionModalOpen(true);
      return;
    }
    setModalData({
      isVisible: true,
      status: e.key,
    });
  };

  const handleOk = async () => {
    const newStatus = modalData.status;

    if (!newStatus) return;

    try {
      const success = await handleUpdateStatus(record.id, {
        status: newStatus,
      });

      if (success) {
        setModalData({
          isVisible: false,
          status: "",
        });
      }
    } catch (error) {
      console.error("dealeraction-failed:", error);
    }
  };
  const handleCancel = () => {
    setModalData({
      isVisible: false,
      status: "",
    });
  };

  const handleSubmit = async (values: DealerBase) => {
    try {
      const userDetails = JSON.parse(
        localStorage.getItem("userDetails") || "{}",
      );

      const response = await addDealer({
        ...values,
        manufacturerCode: userDetails.manufacturerCode,
        isActive: true,
      });
      console.log("Dealer added successfully:", response);

      message.success("Dealer added successfully");
      setAddbtn(false);
    } catch (error) {
      console.error("Error submitting dealer data:", error);
      message.error("Failed to add dealer");
    }
  };
  return (
    <>
      <Dropdown
        trigger={["click"]}
        placement="bottomRight"
        menu={{ items: ActionMenuItem, onClick: handleMenuClick }}
      >
        <Button
          type="text"
          icon={<MoreOutlined />}
          onClick={(e) => e.stopPropagation()}
        />
      </Dropdown>
      <Modaltypes
        isModalOpen={modalData}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />

      {/* here it is = for manage permission */}
      <Modal
        title="Manage Permissions"
        open={permissionModalOpen}
        onCancel={() => setPermissionModalOpen(false)}
        onOk={() => setPermissionModalOpen(false)}
      >
        <p>Manage dealer permissions here.</p>
      </Modal>

      {/* here it is..... ADD-DEALER */}
      <Modal
        open={Addbtn}
        title={
          <span style={{ fontSize: "20px", fontWeight: 500 }}>Add Dealer</span>
        }
        onCancel={() => setAddbtn(false)}
        footer={[
          <Button
            type="primary"
            key="submit"
            htmlType="submit"
            form="add-dealer-form"
          >
            Submit
          </Button>,
        ]}
      >
        <Form
          id="add-dealer-form"
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ fontSize: "14px", fontWeight: 400 }}
        >
          <Form.Item
            label="Dealer Name"
            name="dealerName"
            rules={AddDealerRules.dealerName}
          >
            <Input placeholder="Enter Dealer Name" />
          </Form.Item>

          <Form.Item
            label="GST No."
            name="gstNumber"
            rules={AddDealerRules.gstNumber}
          >
            <Input placeholder="Enter GST Number" maxLength={15} />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={AddDealerRules.address}
          >
            <Input placeholder="Enter Address" />
          </Form.Item>

          <Form.Item
            label="Mobile No."
            name="mobileNumber"
            rules={AddDealerRules.mobileNumber}
          >
            <Input placeholder="Enter Mobile Number" maxLength={10} />
          </Form.Item>

          <Form.Item
            label="Contact Person"
            name="contactPerson"
            rules={AddDealerRules.contactPerson}
          >
            <Input placeholder="Enter Contact Person" />
          </Form.Item>
          <h5
            style={{ paddingBottom: "15px", fontSize: "16px", fontWeight: 500 }}
          >
            login Info
          </h5>
          <Form.Item
            label="WhatsApp No."
            name="whatsappNumber"
            rules={AddDealerRules.whatsappNumber}
          >
            <Input placeholder="Enter WhatsApp Number" maxLength={10} />
          </Form.Item>

          <Form.Item
            label="Login Email"
            name="email"
            rules={AddDealerRules.loginEmail}
          >
            <Input placeholder="Enter Login Email" />
          </Form.Item>

          <Form.Item
            label="Login Password"
            name="password"
            rules={AddDealerRules.loginPassword}
          >
            <Input.Password placeholder="Enter Login Password" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
