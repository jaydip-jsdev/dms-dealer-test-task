import "./Sidebar.scss";
import { Image, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { type ItemType } from "antd/es/menu/interface";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";

import logo from "./logo/logo.png";
interface SidebarProps {
  menuItem: ItemType[];
}

const Sidebar: FC<SidebarProps> = ({ menuItem }) => {
  const navigate = useNavigate();
  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };
  return (
    <Sider className="sider-wrapper" breakpoint="xl" width={240}>
      <div className="dms-manufacturer-logo-wrapper">
        <Image src={logo} alt="dms-manufacturer-logo" preview={false} />
      </div>
      <Menu
        className="sidebar-menu"
        mode="inline"
        items={menuItem || {}}
        defaultSelectedKeys={["/"]}
        selectable
        onClick={handleMenuClick}
      />
    </Sider>
  );
};

export default Sidebar;
