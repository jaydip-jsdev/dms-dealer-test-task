import { MoreOutlined } from "@ant-design/icons";
import type { ApiErrorResponse } from "@repo/ui";
import "./DealerTable.scss";
import {
  Button,
  Dropdown,
  Form,
  Input,
  message,
  Modal,
  type MenuProps,
} from "antd";
import type { AxiosError } from "axios";
import { useRef, useState } from "react";

import { addDealer } from "../../../api/services/dealerService";
import type {
  DealerBase,
  DealerManagementData,
  DealerUpdateStatusPayload,
  modalType,
} from "../../../types";
import { statusVerb } from "../constant";

import { AddDealerRules } from "./AddDealerRules";

interface DealerActionProps {
  record: DealerManagementData;
  handleUpdateStatus: (
    id: number,
    payload: DealerUpdateStatusPayload,
  ) => Promise<boolean>;
}
interface ModaltypesProps {
  isModalOpen: modalType;
  handleOk: () => void;
  handleCancel: () => void;
  confirmLoading: boolean;
}

export const Modaltypes = ({
  isModalOpen,
  handleOk,
  handleCancel,
  confirmLoading,
}: ModaltypesProps) => {
  return (
    <Modal
      open={isModalOpen.isVisible}
      title={`Are you sure you want to ${
        statusVerb[isModalOpen.status] ?? isModalOpen.status
      } Dealer?`}
      onOk={handleOk}
      onCancel={handleCancel}
      closable={false}
      confirmLoading={confirmLoading}
    />
  );
};

interface AddDealerModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onAdded: () => Promise<void>;
}

export const AddDealerModal = ({
  open,
  setOpen,
  onAdded,
}: AddDealerModalProps) => {
  const [form] = Form.useForm<DealerBase>();
  const [submitting, setSubmitting] = useState(false);
  const submittingRef = useRef(false);

  const handleSubmit = async (values: DealerBase) => {
    if (submittingRef.current) return;

    submittingRef.current = true;
    setSubmitting(true);

    try {
      const userDetails = JSON.parse(
        localStorage.getItem("userDetails") || "{}",
      ) as { manufacturerCode?: unknown };
      const manufacturerCode =
        typeof userDetails.manufacturerCode === "string"
          ? userDetails.manufacturerCode.trim()
          : "";

      if (!manufacturerCode) {
        message.error("Manufacturer code is missing");
        return;
      }

      await addDealer({
        ...values,
        manufacturerCode,
        isActive: true,
      });

      form.resetFields();
      setOpen(false);
      await onAdded();
      message.success("Dealer added successfully");
    } catch (error) {
      const apiError = error as AxiosError<ApiErrorResponse>;
      message.error(apiError.response?.data.message ?? apiError.message);
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      title={<span className="add-dealer-title">Add Dealer</span>}
      onCancel={() => setOpen(false)}
      footer={[
        <Button
          type="primary"
          key="submit"
          htmlType="submit"
          form="add-dealer-form"
          loading={submitting}
          disabled={submitting}
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
        className="add-dealer-form"
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
        <h5 className="add-login-info">login Info</h5>
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
  );
};

export const DealerAction = ({
  record,
  handleUpdateStatus,
}: DealerActionProps) => {
  const [modalData, setModalData] = useState<modalType>({
    isVisible: false,
    status: "",
  });
  const [permissionModalOpen, setPermissionModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const statusRequestRef = useRef(false);
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

    if (!newStatus || statusRequestRef.current) return;

    statusRequestRef.current = true;
    setConfirmLoading(true);
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
      const apiError = error as AxiosError<ApiErrorResponse>;
      message.error(apiError.response?.data.message ?? apiError.message);
    } finally {
      statusRequestRef.current = false;
      setConfirmLoading(false);
    }
  };
  const handleCancel = () => {
    setModalData({
      isVisible: false,
      status: "",
    });
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
        confirmLoading={confirmLoading}
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
    </>
  );
};
