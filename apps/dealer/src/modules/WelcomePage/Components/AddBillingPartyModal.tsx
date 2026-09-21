import { Button, Flex, Form, Input, Modal } from "antd";
import type { Dispatch, SetStateAction } from "react";

import type {
  BillingPartyApiData,
  BillingPartyEditPayload,
} from "../../../types";

import { billingPartyRules } from "./billingPartyRules";
import type { ModalState } from "./types";

type AddBillingPartyModalProps = {
  modalState: ModalState;
  setModalState: Dispatch<SetStateAction<ModalState>>;
  editingParty: BillingPartyApiData | null;
  onSubmit: (values: BillingPartyEditPayload, toggleEdit?: boolean) => void;
};

const AddBillingPartyModal = ({
  modalState,
  setModalState,
  editingParty,
  onSubmit,
}: AddBillingPartyModalProps) => {
  const [form] = Form.useForm<BillingPartyEditPayload>();

  const handleCancel = () => {
    setModalState({ isVisible: false, status: "Add" });
    form.resetFields();
  };

  return (
    <Modal
      title={
        modalState.status === "Add" ? "Add Billing Party" : "Edit Billing Party"
      }
      open={modalState.isVisible}
      onCancel={handleCancel}
      footer={null}
      width={720}
      className="add-billing-party-modal"
      afterOpenChange={(open) => {
        if (!open) return;
        if (modalState.status === "Edit" && editingParty) {
          form.setFieldsValue({
            partyName: editingParty.partyName || "",
            gstNumber: editingParty.gstNumber || "",
            address: editingParty.address || "",
            mobileNumber: editingParty.mobileNumber || "",
            email: editingParty.email || "",
          });
        } else {
          form.resetFields();
        }
      }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={(values) => {
          onSubmit(values);
        }}
        requiredMark
      >
        <Form.Item
          name="partyName"
          label="Party Name"
          rules={billingPartyRules.partyName}
        >
          <Input placeholder="Enter Party Name" />
        </Form.Item>
        <Form.Item
          name="gstNumber"
          label="GST No."
          rules={billingPartyRules.gstNumber}
        >
          <Input placeholder="Enter GST Number" maxLength={15} />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={billingPartyRules.address}
        >
          <Input placeholder="Enter Address" />
        </Form.Item>
        <Form.Item
          name="mobileNumber"
          label="Mobile No."
          rules={billingPartyRules.mobileNumber}
        >
          <Input placeholder="Enter Mobile Number" maxLength={10} />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={billingPartyRules.email}>
          <Input placeholder="Enter Email" />
        </Form.Item>

        <Flex justify="end">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};

export default AddBillingPartyModal;
