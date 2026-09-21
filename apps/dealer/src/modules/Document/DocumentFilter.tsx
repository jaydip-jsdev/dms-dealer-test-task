import { Button, Flex, Form, Select } from "antd";

import { dealerOption, statusOption } from "./constant";

interface DocumentFilterProps {
  onApply?: () => void;
  onReset?: () => void;
}

const DocumentFilter = ({ onApply, onReset }: DocumentFilterProps) => {
  return (
    <Form layout="vertical" style={{ width: 218 }} onFinish={onApply}>
      <Form.Item label="Dealer" name="dealer">
        <Select placeholder="Select Dealer" options={dealerOption} />
      </Form.Item>

      <Form.Item label="Status" name="status">
        <Select placeholder="Select Status" options={statusOption} />
      </Form.Item>

      <Flex justify="end" gap={8}>
        <Button onClick={onReset}>Reset</Button>
        <Button type="primary" htmlType="submit">
          Apply
        </Button>
      </Flex>
    </Form>
  );
};

export default DocumentFilter;
