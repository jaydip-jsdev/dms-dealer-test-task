import "./AddComplaint.scss";
import { Button, DatePicker, Form, Input, Modal } from "antd";
import type { Dispatch, SetStateAction } from "react";

import type { modalType } from "../../../types";

import { AddComplaintRules } from "./AddComplaintRules";

type AddComplaintProps = {
  isAddComplaintModalOpen: modalType;
  setIsAddComplaintModalOpen: Dispatch<SetStateAction<modalType>>;
};

const AddComplaint = ({
  isAddComplaintModalOpen,
  setIsAddComplaintModalOpen,
}: AddComplaintProps) => {
  const handleCancel = () => {
    setIsAddComplaintModalOpen({ isVisible: false, status: "" });
  };
  return (
    <Modal
      open={isAddComplaintModalOpen.isVisible}
      onCancel={handleCancel}
      title={
        isAddComplaintModalOpen.status === "Add"
          ? "Add Complaint"
          : "Edit Complaint"
      }
      okText="Submit"
      footer={[
        <Button type="primary" key="ok" htmlType="submit" onClick={() => {}}>
          Submit
        </Button>,
      ]}
    >
      <Form layout="vertical" className="add-complaint-form-container">
        <Form.Item
          label="Complaint Date"
          name="complaintDate"
          rules={AddComplaintRules.complaintDate}
        >
          <DatePicker className="form-date-fields" />
        </Form.Item>
        <Form.Item
          label="Complaint Time"
          name="complaintTime"
          rules={AddComplaintRules.complaintType}
        >
          <Input placeholder="Enter" />
        </Form.Item>
        <Form.Item
          label="Complaint type"
          name="complaintType"
          rules={AddComplaintRules.complaintType}
        >
          <Input placeholder="Enter" />
        </Form.Item>
        <Form.Item
          label="Complaint Description"
          name="complaintDescription"
          rules={AddComplaintRules.complaintDescription}
        >
          <Input.TextArea placeholder="Enter" />
        </Form.Item>
        <Form.Item label="Concern Person Name" name="ConcernPersonName">
          <Input placeholder="Enter" />
        </Form.Item>
        <Form.Item
          label="Contact No."
          name="contactNo"
          rules={AddComplaintRules.contactNo}
        >
          <Input placeholder="Enter" />
        </Form.Item>
        <Form.Item
          label="Reference Invoice No."
          name="referenceInvoiceNo"
          rules={AddComplaintRules.referenceInvoiceNo}
        >
          <Input placeholder="Enter" />
        </Form.Item>
        <Form.Item
          label="Invoice Date"
          name="invoiceDate"
          rules={AddComplaintRules.invoiceDate}
        >
          <DatePicker className="form-date-fields" />
        </Form.Item>
        <Form.Item
          label="Dealer Name"
          name="dealerName"
          rules={AddComplaintRules.dealerName}
        >
          <Input placeholder="Enter" />
        </Form.Item>
        <Form.Item
          label="Complaint By"
          name="complaintBy"
          rules={AddComplaintRules.complaintBy}
        >
          <Input placeholder="Enter" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddComplaint;
