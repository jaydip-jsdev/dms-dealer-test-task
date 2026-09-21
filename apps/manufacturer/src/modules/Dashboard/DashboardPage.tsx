import type { ApiErrorResponse } from "@repo/ui";
import { Card, Col, Flex, Row, Typography, message } from "antd";
import type { AxiosError } from "axios";
import { useEffect, useState } from "react";

import { fetchDashboardStats } from "../../api/services/dashboardService";
import type { DashboardStatsType } from "../../types";
import MySubscriptionList from "../SubscritionManagement/MySubscriptionList";

import { dashboardCards, getDashboardStatValue } from "./constant";

import "./DashboardPage.scss";

const { Title, Text } = Typography;

const DashboardPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<DashboardStatsType | null>(null);

  const loadDashboardStatsData = async () => {
    setLoading(true);
    try {
      const response = await fetchDashboardStats();
      setData(response.data);
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;
      message.error(error.response?.data.message ?? error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardStatsData();
  }, []);

  return (
    <Flex className="dashboard-container" vertical>
      <Title level={3} className="dashboard-title">
        Dashboard
      </Title>
      <Row gutter={[16, 16]} className="dashboard-box">
        {dashboardCards.map((card) => (
          <Col xs={24} md={12} key={card.id}>
            <Card className="dashboard-card" loading={loading}>
              <Title level={5} className="card-heading">
                {card.title}
              </Title>

              <Row gutter={16} className="card-content">
                {card.cols.map((item) => (
                  <Col span={item.span} key={item.id}>
                    <div className="stat-box">
                      <Text className="label">{item.label}</Text>
                      <Text className="value">
                        {getDashboardStatValue(data, item.key)}
                      </Text>
                    </div>
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>
        ))}
      </Row>

      <MySubscriptionList title="My Subscription" />
    </Flex>
  );
};

export default DashboardPage;
