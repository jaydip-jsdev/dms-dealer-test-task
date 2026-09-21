import { Button, DatePicker, Flex, Form, Select } from "antd";

import { dateOptions } from "./constant";
import type { OutstandingFilterValues } from "./types";

interface OutstandingFilterProps {
  onApply?: (values: OutstandingFilterValues) => void;
  onReset?: () => void;
}

const OutstandingFilter = ({ onApply, onReset }: OutstandingFilterProps) => {
  const { RangePicker } = DatePicker;
  return (
    <Form<OutstandingFilterValues>
      layout="vertical"
      style={{ width: 218 }}
      onFinish={onApply}
    >
      <Form.Item label="Date" name="date">
        <Select placeholder="Select Date" options={dateOptions} />
      </Form.Item>

      <Form.Item label="Bill Date" name="billdate">
        <RangePicker />
      </Form.Item>

      <Form.Item label="Due Date" name="duedate">
        <RangePicker />
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

export default OutstandingFilter;
