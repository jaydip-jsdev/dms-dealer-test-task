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
import dayjs from "dayjs";
import "./ActionLog.scss";
import { useCallback, useMemo } from "react";

import type { ActionLogItem } from "../../types";

const { Text } = Typography;

type ActionLogProps = {
  isActionLogOpen: boolean;
  setIsActionLogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddActionLogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  actionLogLoading: boolean;
  actionLogs?: ActionLogItem[];
  disableAddLog: boolean;
  isStatusClosed: boolean;
};

const ActionLog = ({
  isActionLogOpen,
  setIsActionLogOpen,
  setIsAddActionLogOpen,
  actionLogLoading,
  actionLogs = [],
  disableAddLog,
  isStatusClosed,
}: ActionLogProps) => {
  const renderActionLogItem = useCallback(
    (log: ActionLogItem) => (
      <>
        <Flex>
          <Card className="card-container">
            <Row>
              <Col className="sub-card-container">
                <Flex vertical gap={4}>
                  <Text className="title">Follow-up Date</Text>
                  <Text className="text">{log.followUpDate || "-"}</Text>
                </Flex>
              </Col>
              <Col>
                <Flex vertical>
                  <Text className="title">Follow-up By</Text>
                  <Text className="text">{log.followUpBy || "-"}</Text>
                </Flex>
              </Col>
            </Row>
            <Row>
              <Col className="sub-card-container">
                <Flex vertical gap={4}>
                  <Text className="title">Description :</Text>
                  <Text className="text">{log.description || "-"}</Text>
                </Flex>
              </Col>
              <Col>
                <Flex vertical>
                  <Text className="title">Contact Person</Text>
                  <Text className="text">{log.contactPerson || "-"}</Text>
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
                  <Text className="text">{log.isVisited ? "Yes" : "No"}</Text>
                </Flex>
              </Col>
              <Col>
                <Flex vertical>
                  <Text className="title">Visit Date</Text>
                  <Text className="text">{log.visitedDate || "-"}</Text>
                </Flex>
              </Col>
            </Row>
            <Row>
              <Col className="sub-card-container">
                <Flex vertical gap={4}>
                  <Text className="title">Visit Description</Text>
                  <Text className="text">{log.visitDescription || "-"}</Text>
                </Flex>
              </Col>
            </Row>
          </Card>
        </Flex>
      </>
    ),
    [],
  );

  const items: CollapseProps["items"] = useMemo(
    () =>
      actionLogs
        .filter((val) => !(isStatusClosed && val.isClosingEntry))
        .map((log) => ({
          key: log.id,
          label: `Action Log - ${log.id}`,
          children: renderActionLogItem(log),
        })),
    [isStatusClosed, actionLogs, renderActionLogItem],
  );

  const handleAddActionLog = () => {
    setIsAddActionLogOpen(true);
    setIsActionLogOpen(false);
  };

  const closingLog = actionLogs?.at(-1) ?? {
    closingRemark: "-",
    closingDate: "-",
    closingBy: "-",
  };

  return (
    <Modal
      open={isActionLogOpen}
      onCancel={() => setIsActionLogOpen(false)}
      title="All Action Log"
      footer={false}
    >
      <Flex justify="end">
        <Button
          onClick={() => handleAddActionLog()}
          type="primary"
          loading={actionLogLoading}
          disabled={disableAddLog}
        >
          <PlusOutlined /> Action Log
        </Button>
      </Flex>
      {actionLogs.length > 0 ? (
        <Collapse className="collapse-container" items={items} />
      ) : (
        <div style={{ textAlign: "center", padding: "20px", color: "#999" }}>
          No action logs yet
        </div>
      )}
      {isStatusClosed && (
        <Card className="card-container">
          <Row>
            <Col className="sub-card-container">
              <Flex vertical gap={4}>
                <Text className="title">Closing Description</Text>
                <Text className="text">{closingLog.closingRemark || "-"}</Text>
              </Flex>
            </Col>
          </Row>
          <Row>
            <Col className="sub-card-container">
              <Flex vertical gap={4}>
                <Text className="title">Closing At</Text>
                <Text className="text">
                  {closingLog.closingDate
                    ? dayjs(closingLog.closingDate).format(
                        "DD/MM/YYYY HH:mm:ss",
                      )
                    : "-"}
                </Text>
              </Flex>
            </Col>
            <Col>
              <Flex vertical>
                <Text className="title">Closing By</Text>
                <Text className="text">{closingLog.closingBy || "-"}</Text>
              </Flex>
            </Col>
          </Row>
        </Card>
      )}
    </Modal>
  );
};

export default ActionLog;
