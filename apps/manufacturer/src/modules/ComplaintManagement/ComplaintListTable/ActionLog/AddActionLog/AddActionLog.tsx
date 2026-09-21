import { Button, DatePicker, Form, Input, Modal } from "antd";
import "./AddActionLog.scss";

type AddActionLogProps = {
  isAddActionLogOpen: boolean;
  setIsAddActionLogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddActionLog = ({
  isAddActionLogOpen,
  setIsAddActionLogOpen,
}: AddActionLogProps) => {
  return (
    <Modal
      open={isAddActionLogOpen}
      onCancel={() => setIsAddActionLogOpen(false)}
      title="Add Action Log"
      footer={<Button type="primary">Submit</Button>}
    >
      <Form layout="vertical">
        <Form.Item label="Follow-up Date" name="follow_up_date">
          <DatePicker className="date-picker-date" />
        </Form.Item>
        <Form.Item label="Follow-up By" name="follow-up-by">
          <Input placeholder="2345" />
        </Form.Item>
        <Form.Item label="Contact Person" name="contact_person">
          <Input placeholder="Enter" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea placeholder="Enter" />
        </Form.Item>
        <Form.Item label="Is Visited" name="is_visited">
          <Input placeholder="Select" />
        </Form.Item>
        <Form.Item label="Visited Date" name="visited_date">
          <DatePicker className="date-picker-date" />
        </Form.Item>
        <Form.Item label="Visit Description" name="visit_description">
          <Input.TextArea placeholder="Enter" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddActionLog;
