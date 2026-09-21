import { ExportOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Flex,
  message,
  Row,
  Typography,
} from "antd";
import { useMemo } from "react";

import SalesCard from "./components/SalesCard";
import StatBox from "./components/StatBox";
import {
  dashboardCards,
  doSummaryData,
  salesCardData,
  serverStatusCard,
} from "./constant";
import { DashboardTable } from "./DashboardTable";
import "./DashboardPage.scss";
import type { CardType, DashboardCard } from "./types";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const DashboardPage = () => {
  const handleExport = () => {
    message.info("Export API not ready");
  };

  const cardMap = useMemo(
    () =>
      Object.fromEntries(
        dashboardCards.map((card) => [card.title, card]),
      ) as Record<string, DashboardCard>,
    [],
  );

  const leftColumnCards: CardType[] = useMemo(
    () =>
      [cardMap.OUTSTANDING, cardMap.LEDGER, serverStatusCard].filter(Boolean),
    [cardMap],
  );

  const rightColumnCards: CardType[] = useMemo(
    () => [cardMap.ORDERS, cardMap.COMPLAINT, cardMap.SALES].filter(Boolean),
    [cardMap],
  );

  const renderCard = (card: CardType) => {
    const dashboardCard = card as DashboardCard;

    if (card.title === "SALES") {
      return <SalesCard key={card.id} card={salesCardData} />;
    }

    return (
      <Card className="dashboard-card" key={card.id}>
        <Title level={5} className="card-title">
          {card.title}
        </Title>

        <Row gutter={[12, 12]}>
          {dashboardCard.cols.map((item) => (
            <Col span={item.span} key={item.id}>
              <StatBox label={item.label ?? ""} value={item.value} />
            </Col>
          ))}
        </Row>
      </Card>
    );
  };

  return (
    <Flex vertical className="dashboard-container">
      <Flex justify="space-between" align="center" className="dashboard-header">
        <Title level={3}>Dashboard</Title>
        <DatePicker />
      </Flex>

      <Row gutter={[16, 16]} className="summary-cards-row">
        <Col xs={24} lg={12}>
          {leftColumnCards.map(renderCard)}
        </Col>
        <Col xs={24} lg={12}>
          {rightColumnCards.map(renderCard)}
        </Col>
      </Row>

      <Flex vertical className="do-summary">
        <Title level={5} className="section-title">
          DO
        </Title>

        <Row gutter={[16, 16]}>
          {doSummaryData.slice(0, 4).map((item) => (
            <Col xs={24} md={12} key={item.id}>
              <Card className="do-card">
                <Text className="do-title">{item.title}</Text>

                <Flex className="do-metric-row">
                  <StatBox label="No of DO" value={item.count} />
                  <StatBox label="Quantity" value={item.quantity} />
                </Flex>
              </Card>
            </Col>
          ))}
        </Row>

        {doSummaryData[4] ? (
          <Row gutter={[16, 16]} className="do-last-row">
            <Col xs={24} md={12}>
              <Card className="do-card">
                <Flex justify="space-between">
                  <Text className="do-title">
                    {doSummaryData[4].title ?? "-"}
                  </Text>
                  <Button type="link">Show More</Button>
                </Flex>

                <Flex className="do-metric-row">
                  <StatBox
                    label="No of DO"
                    value={doSummaryData[4].count ?? "-"}
                  />
                  <StatBox
                    label="Quantity"
                    value={doSummaryData[4].quantity ?? "-"}
                  />
                </Flex>
              </Card>
            </Col>
          </Row>
        ) : null}
      </Flex>

      <Flex justify="space-between" align="center" className="table-header">
        <Title level={5}>D.O</Title>
        <Flex gap={12} align="center">
          <RangePicker />
          <Button icon={<ExportOutlined />} onClick={handleExport}>
            Export
          </Button>
        </Flex>
      </Flex>

      <DashboardTable />
    </Flex>
  );
};

export default DashboardPage;
