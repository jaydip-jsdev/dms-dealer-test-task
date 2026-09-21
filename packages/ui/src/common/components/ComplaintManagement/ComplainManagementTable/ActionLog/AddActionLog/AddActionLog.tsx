import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import dayjs from "dayjs";

import "./AddActionLog.scss";
import type { ActionLogFormData } from "../../../types";

import { AddActionLogRules } from "./AddActionLogRules";

type AddActionLogProps = {
  isAddActionLogOpen: boolean;
  setIsAddActionLogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (formData: ActionLogFormData) => void;
  actionLogLoading: boolean;
  complaintDate?: string;
};

const AddActionLog = ({
  isAddActionLogOpen,
  setIsAddActionLogOpen,
  onSubmit,
  actionLogLoading,
  complaintDate,
}: AddActionLogProps) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (onSubmit) {
        onSubmit(values as ActionLogFormData);
      }
      setIsAddActionLogOpen(false);
      form.resetFields();
    } catch (error) {
      console.error("Form validation failed:", error);
    }
  };

  const isVisited = Form.useWatch("isVisited", form);

  return (
    <Modal
      open={isAddActionLogOpen}
      onCancel={() => {
        setIsAddActionLogOpen(false);
        form.resetFields();
      }}
      title="Add Action Log"
      footer={
        <Button
          type="primary"
          onClick={handleSubmit}
          loading={actionLogLoading}
        >
          Submit
        </Button>
      }
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label="Follow-up Date"
          name="followUpDate"
          rules={AddActionLogRules.followUpDate}
        >
          <DatePicker
            className="date-picker-date"
            disabledDate={(current) =>
              complaintDate
                ? current.isBefore(dayjs(complaintDate).startOf("day"))
                : false
            }
          />
        </Form.Item>

        <Form.Item
          label="Follow-up By"
          name="followUpBy"
          rules={AddActionLogRules.followUpBy}
        >
          <Input placeholder="Enter name" />
        </Form.Item>

        <Form.Item
          label="Contact Person"
          name="contactPerson"
          rules={AddActionLogRules.contactPerson}
        >
          <Input placeholder="Enter contact person" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={AddActionLogRules.description}
        >
          <Input.TextArea placeholder="Enter description" />
        </Form.Item>

        <Form.Item
          label="Is Visited"
          name="isVisited"
          rules={AddActionLogRules.isVisited}
        >
          <Select
            placeholder="Select"
            options={[
              { label: "Yes", value: true },
              { label: "No", value: false },
            ]}
          />
        </Form.Item>

        {isVisited && (
          <>
            <Form.Item
              label="Visited Date"
              name="visitedDate"
              rules={[{ required: isVisited, message: "Select visited date" }]}
            >
              <DatePicker
                className="date-picker-date"
                disabledDate={(current) =>
                  complaintDate
                    ? current.isBefore(dayjs(complaintDate).startOf("day"))
                    : false
                }
              />
            </Form.Item>

            <Form.Item
              label="Visit Description"
              name="visitDescription"
              rules={[
                { required: isVisited, message: "Enter visit description" },
              ]}
            >
              <Input.TextArea placeholder="Enter visit details" />
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  );
};

export default AddActionLog;
