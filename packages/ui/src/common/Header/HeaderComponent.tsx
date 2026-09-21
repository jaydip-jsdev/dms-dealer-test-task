import { DownOutlined } from "@ant-design/icons";
import { Avatar, Divider, Dropdown, Flex, Typography } from "antd";
import { Header } from "antd/es/layout/layout";
import type { FC } from "react";
import "./HeaderComponent.scss";

import Breadcrumbs from "./Breadcrumbs";
import LogoutConfirmationModal from "./LogoutConfirmationModal";
import useHeader from "./useHeader";

const { Text } = Typography;

const HeaderComponent: FC = () => {
  const {
    states: {
      items,
      isOpen,
      setIsOpen,
      setIsDropdownOpen,
      isDropdownOpen,
      userDetails,
      role,
    },
  } = useHeader();

  const handleDropdownVisibleChange = (visible: boolean) => {
    if (!isOpen) {
      setIsDropdownOpen(visible);
    }
  };

  return (
    <Header className="header-wrapper">
      <div className="header-upperSection">
        <Flex justify="space-between" align="center">
          <Text strong>DMS</Text>
          <div className="user-profile-wrapper">
            <Dropdown
              menu={{ items }}
              trigger={["click"]}
              open={isDropdownOpen}
              overlayClassName="dropdown-wrapper"
              onOpenChange={handleDropdownVisibleChange}
            >
              <Flex justify="space-between">
                <Flex gap={12}>
                  <Avatar size={40} style={{ backgroundColor: "#D9D9D9" }}>
                    AA
                  </Avatar>
                  <Flex vertical>
                    <Text strong>{userDetails.name}</Text>
                    <Text type="secondary">{role}</Text>
                  </Flex>
                </Flex>
                <DownOutlined style={{ cursor: "pointer" }} />
              </Flex>
            </Dropdown>
          </div>
        </Flex>
      </div>
      <Divider />
      <div className="header-lowerSection">
        <Breadcrumbs />
      </div>
      <LogoutConfirmationModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setIsDropdownOpen={setIsDropdownOpen}
      />
    </Header>
  );
};

export default HeaderComponent;
