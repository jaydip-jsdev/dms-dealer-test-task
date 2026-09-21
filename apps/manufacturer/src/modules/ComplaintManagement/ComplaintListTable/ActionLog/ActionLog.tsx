import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Collapse,
  Flex,
  Modal,
  Row,
  Typography,
  type CollapseProps,
} from "antd";
import "./ActionLog.scss";

const { Text } = Typography;

type ActionLogProps = {
  isActionLogOpen: boolean;
  setIsActionLogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddActionLogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ActionLog = ({
  isActionLogOpen,
  setIsActionLogOpen,
  setIsAddActionLogOpen,
}: ActionLogProps) => {
  const data = (
    <>
      <Flex>
        <Card className="card-container">
          <Row>
            <Col className="sub-card-container">
              <Flex vertical gap={4}>
                <Text className="title">Follow-up Date</Text>
                <Text className="text">24/05/2025</Text>
              </Flex>
            </Col>
            <Col>
              <Flex vertical>
                <Text className="title">Follow-up By</Text>
                <Text className="text">Divyesh</Text>
              </Flex>
            </Col>
          </Row>
          <Row>
            <Col className="sub-card-container">
              <Flex vertical gap={4}>
                <Text className="title">Description :</Text>
                <Text className="text">
                  Lorem Ipsum is simply dummy text of the printing,
                </Text>
              </Flex>
            </Col>
            <Col>
              <Flex vertical>
                <Text className="title">Contact Person</Text>
                <Text className="text">Rahul Patel</Text>
              </Flex>
            </Col>
          </Row>
        </Card>
      </Flex>
      <Flex>
        <Card className="card-container">
          <Row>
            <Col className="sub-card-container">
              <Flex vertical gap={4}>
                <Text className="title">Is Visited</Text>
                <Text className="text">Yes</Text>
              </Flex>
            </Col>
            <Col>
              <Flex vertical>
                <Text className="title">Visit Date</Text>
                <Text className="text">24/05/2025</Text>
              </Flex>
            </Col>
          </Row>
          <Row>
            <Col className="sub-card-container">
              <Flex vertical gap={4}>
                <Text className="title">Visit Description</Text>
                <Text className="text">
                  Lorem Ipsum is simply dummy text of the printing.
                </Text>
              </Flex>
            </Col>
          </Row>
        </Card>
      </Flex>
    </>
  );
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Action Log 1",
      children: data,
    },
    {
      key: "2",
      label: "Action Log 2",
      children: data,
    },
    {
      key: "3",
      label: "Action Log 3",
      children: data,
    },
  ];
  const handleAddActionLog = () => {
    setIsAddActionLogOpen(true);
    setIsActionLogOpen(false);
  };
  return (
    <Modal
      open={isActionLogOpen}
      onCancel={() => setIsActionLogOpen(false)}
      title="All Action Log"
      footer={false}
    >
      <Flex justify="end">
        <Button onClick={() => handleAddActionLog()} type="primary">
          <PlusOutlined /> Action Log
        </Button>
      </Flex>
      <Collapse className="collapse-container" items={items} />
      <Card className="card-container">
        <Row>
          <Col className="sub-card-container">
            <Flex vertical gap={4}>
              <Text className="title">Closing Description</Text>
              <Text className="text">
                Lorem Ipsum is simply dummy text of the printing.
              </Text>
            </Flex>
          </Col>
        </Row>
        <Row>
          <Col className="sub-card-container">
            <Flex vertical gap={4}>
              <Text className="title">Closing At</Text>
              <Text className="text">18/05/2025</Text>
            </Flex>
          </Col>
          <Col>
            <Flex vertical>
              <Text className="title">Closing By</Text>
              <Text className="text">Rohan Patel</Text>
            </Flex>
          </Col>
        </Row>
      </Card>
    </Modal>
  );
};

export default ActionLog;
