import { Button, Checkbox, Flex, Form, Input, Modal, message } from "antd";

import type {
  AddDeliveryOrderProps,
  DeliveryOrderType,
  FieldConfig,
} from "../types";

import { deliveryDetailRows, orderDetailRows } from "./AddDeliveryFields";
import "./AddDelivery.scss";

const AddDeliveryOrder = ({
  open,
  onClose,
  onSubmit,
  initialData,
}: AddDeliveryOrderProps) => {
  const [form] = Form.useForm<DeliveryOrderType>();

  const renderRow = (fields: FieldConfig[], rowIndex: number) => (
    <Flex key={rowIndex} gap={16} className="field-wrapper">
      {fields.map(({ name, label, component, flex = 1, valuePropName }) => (
        <Form.Item
          key={name}
          name={name}
          label={label}
          valuePropName={valuePropName}
          className={`flex-${String(flex).replace(".", "")}`}
        >
          {component}
        </Form.Item>
      ))}
    </Flex>
  );
  const lastRowIndex = Math.max(0, deliveryDetailRows.length - 1);
  const addressAfterIndex = 1;
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit?.({
        ...initialData,
        ...values,
        sr_no: initialData?.sr_no ?? 0,
        status: values.status ?? initialData?.status ?? "Pending",
      });
      form.resetFields();
      onClose?.();
    } catch {
      message.error("Please fill in all required fields correctly.");
    }
  };

  return (
    <Modal
      open={open}
      width={1200}
      title={initialData ? "Edit Delivery Order" : "Add Delivery Order"}
      onCancel={() => {
        form.resetFields();
        onClose?.();
      }}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Submit
        </Button>,
      ]}
    >
      <Form layout="vertical" form={form} initialValues={initialData}>
        <Flex gap={30}>
          <Flex vertical className="column">
            <h4 className="section-title">Order Details</h4>
            {orderDetailRows.map(renderRow)}
          </Flex>

          <Flex vertical className="column">
            <h4 className="section-title">Delivery Order Details</h4>
            {deliveryDetailRows.slice(0, addressAfterIndex).map(renderRow)}
            <Form.Item name="address" label="Address" className="full-width">
              <Input.TextArea rows={3} />
            </Form.Item>

            {deliveryDetailRows
              .slice(addressAfterIndex, lastRowIndex)
              .map(renderRow)}

            <Form.Item name="remark" label="Remark" className="full-width">
              <Input.TextArea rows={3} />
            </Form.Item>

            <Form.Item
              name="advanced_received"
              valuePropName="checked"
              className="checkbox-field"
            >
              <Checkbox>Advanced Received</Checkbox>
            </Form.Item>
            {deliveryDetailRows.slice(lastRowIndex).map(renderRow)}
          </Flex>
        </Flex>
      </Form>
    </Modal>
  );
};

export default AddDeliveryOrder;
