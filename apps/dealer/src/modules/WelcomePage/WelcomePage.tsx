import { Tabs, Typography, Flex } from "antd";
import type { TabsProps } from "antd";
import { useState } from "react";

import "./WelcomPage.scss";
import BillingPartyView from "./Components/BillingPartyView";
import ManufacturerView from "./Components/ManufacturerView";

const { Title } = Typography;

const TAB_KEYS = {
  MANUFACTURER: "manufacturer",
  BILLING_PARTY: "billing-party",
} as const;

const WelcomePage = () => {
  const [activeTab, setActiveTab] = useState<string>(TAB_KEYS.MANUFACTURER);

  const items: TabsProps["items"] = [
    {
      key: "manufacturer",
      label: "Manufacturer",
    },
    {
      key: "billing-party",
      label: "Billing Party",
    },
  ];

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <Flex className="welcome-page-container" vertical>
      <Title level={4} className="dashboard-welcome">
        Welcome Ankita !
      </Title>
      <Tabs
        activeKey={activeTab}
        items={items}
        onChange={handleTabChange}
        className="welcome-tabs"
      />
      <div>
        {activeTab === "manufacturer" && <ManufacturerView />}
        {activeTab === "billing-party" && <BillingPartyView />}
      </div>
    </Flex>
  );
};

export default WelcomePage;
