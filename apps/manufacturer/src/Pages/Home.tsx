import "./Home.scss";
import HeaderComponent from "@repo/ui/common/Header/HeaderComponent";
import Sidebar from "@repo/ui/common/SideBar/Sidebar";
import { Flex } from "antd";
import type { FC, ReactNode } from "react";

import { menuItems } from "./menuItems";

const Home: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Flex>
      <section className="sidebar-container">
        <Sidebar menuItem={menuItems} />
      </section>
      <section className="app-main-container">
        <HeaderComponent />
        <section className="global-card-content">{children}</section>
      </section>
    </Flex>
  );
};

export default Home;
