import "./AddComplaint.scss";
import { Button, DatePicker, Form, Input, Modal, TimePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useEffect } from "react";

import type { AddComplaintFormData, ComplaintData, ModalType } from "../types";

import { AddComplaintRules } from "./AddComplaintRules";

type AddComplaintProps = {
  isAddComplaintModalOpen: ModalType;
  initialComplaintData?: ComplaintData | null;
  onClose: () => void;
  dealerLoading: boolean;
  isDisabledSubmitButton: boolean;
  onSubmit?: (formData: AddComplaintFormData, isEdit: boolean) => void;
};

const AddComplaint = ({
  isAddComplaintModalOpen,
  initialComplaintData,
  onClose,
  isDisabledSubmitButton,
  onSubmit,
}: AddComplaintProps) => {
  const [form] = Form.useForm();
  const editComplaintId = isAddComplaintModalOpen?.id;
  const complaintData = initialComplaintData;

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (onSubmit) {
        await onSubmit(values as AddComplaintFormData, !!editComplaintId);
      }

      form.resetFields();
    } catch (error) {
      console.error("Form validation failed:", error);
    }
  };

  const disabledFutureDates = (current: Dayjs) => {
    return current && current > dayjs().endOf("day");
  };

  useEffect(() => {
    if (!complaintData) return;

    form.setFieldsValue({
      complaintDate: complaintData.complaintDate
        ? dayjs(complaintData.complaintDate)
        : null,
      complaintTime: complaintData.complaintTime
        ? dayjs(complaintData.complaintTime, "HH:mm")
        : null,
      complaintType: complaintData.complaintType,
      complaintDescription: complaintData.complaintDescription,
      concernPersonName: complaintData.concernPersonName,
      contactNo: complaintData.contactNumber,
      referenceInvoiceNo: complaintData.referenceInvoiceNo,
      invoiceDate: complaintData.invoiceDate
        ? dayjs(complaintData.invoiceDate)
        : null,
      complaintBy: complaintData.complaintBy,
    });
  }, [form, complaintData]);

  return (
    <Modal
      open={isAddComplaintModalOpen.isVisible}
      onCancel={() => {
        onClose();
        form.resetFields();
      }}
      title={
        isAddComplaintModalOpen.status === "Add"
          ? "Add Complaint"
          : "Edit Complaint"
      }
      okText="Submit"
      footer={[
        <Button
          type="primary"
          key="ok"
          htmlType="submit"
          onClick={handleSubmit}
          loading={isDisabledSubmitButton}
          disabled={isDisabledSubmitButton}
        >
          Submit
        </Button>,
      ]}
    >
      <Form
        layout="vertical"
        className="add-complaint-form-container"
        form={form}
      >
        <Form.Item
          label="Complaint Date"
          name="complaintDate"
          rules={AddComplaintRules.complaintDate}
        >
          <DatePicker
            disabledDate={disabledFutureDates}
            className="form-date-fields"
          />
        </Form.Item>
        <Form.Item
          label="Complaint Time"
          name="complaintTime"
          rules={AddComplaintRules.complaintTime}
        >
          <TimePicker
            format="HH:mm"
            use12Hours
            className="form-date-fields"
            placeholder="Select time"
          />
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
        <Form.Item label="Concern Person Name" name="concernPersonName">
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
          <DatePicker
            disabledDate={disabledFutureDates}
            className="form-date-fields"
          />
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
