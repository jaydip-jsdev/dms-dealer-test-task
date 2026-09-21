import "./Home.scss";
import HeaderComponent from "@repo/ui/common/Header/HeaderComponent";
import Sidebar from "@repo/ui/common/SideBar/Sidebar";
import { Flex } from "antd";
import type { FC, ReactNode } from "react";
import { useLocation } from "react-router-dom";

import { PATH } from "../Routers/routerPath";

import { menuItems } from "./menuItems";

const Home: FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation();
  const showSidebar = location.pathname !== PATH.WELCOME_PAGE;
  return (
    <Flex>
      {showSidebar ? (
        <section className="sidebar-container">
          <Sidebar menuItem={menuItems} />
        </section>
      ) : null}
      <section className="app-main-container">
        <HeaderComponent />
        <section className="global-card-content">{children}</section>
      </section>
    </Flex>
  );
};

export default Home;
