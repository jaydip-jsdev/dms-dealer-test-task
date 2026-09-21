import { Card, Col, Flex, Row, Typography } from "antd";

import type { SalesCardData } from "../types";

import StatBox from "./StatBox";

const { Title, Text } = Typography;

type Props = {
  card: SalesCardData;
};

const SalesCard = ({ card }: Props) => {
  return (
    <Card className="dashboard-card">
      <Title level={5} className="card-title">
        {card.title}
      </Title>

      <Flex justify="space-between" className="sales-header-row">
        {card.sections.map((section, index) => (
          <Text key={index} className="sales-header">
            {section.header}
          </Text>
        ))}
      </Flex>

      <Row gutter={[16, 16]} className="sales-values-row">
        {card.sections.map((section, index) => (
          <Col span={12} key={index}>
            <Row gutter={[12, 12]}>
              <Col span={12}>
                <StatBox label="Quantity" value={section.quantity} />
              </Col>
              <Col span={12}>
                <StatBox label="Amount" value={section.amount} />
              </Col>
            </Row>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default SalesCard;
