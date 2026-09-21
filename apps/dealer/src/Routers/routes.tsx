import type { ReactElement } from "react";

import ComplaintManagement from "../modules/ComplaintManagement/ComplaintManagement.tsx";
import DashboardPage from "../modules/Dashboard/DashboardPage.tsx";
import DeliveryOrderList from "../modules/DeliveryOrderList/DeliveryOrderList.tsx";
import Document from "../modules/Document/Document.tsx";
import Ledger from "../modules/Ledger/Ledger.tsx";
import OrderDetail from "../modules/OrderManagement/OrderDetail/OrderDetail.tsx";
import OrderManagement from "../modules/OrderManagement/OrderManagement.tsx";
import OutstandingReport from "../modules/OutstandingReport/OutstandingReport.tsx";
import PriceList from "../modules/Price/PriceList.tsx";
import SalesReport from "../modules/SalesReport/SalesReport.tsx";
import WelcomePage from "../modules/WelcomePage/WelcomePage.tsx";

import { PATH } from "./routerPath.ts";

interface Route {
  path: string;
  component: ReactElement;
}

export const moduleRoutes: Route[] = [
  {
    path: PATH.HOME,
    component: <DashboardPage />,
  },
  {
    path: PATH.PRICE,
    component: <PriceList />,
  },
  {
    path: PATH.LEDGER,
    component: <Ledger />,
  },
  {
    path: PATH.DOCUMENT,
    component: <Document />,
  },
  {
    path: PATH.SALES,
    component: <SalesReport />,
  },
  {
    path: PATH.COMPLAINTMANAGEMENT,
    component: <ComplaintManagement />,
  },
  {
    path: PATH.DELIVERY_ORDER,
    component: <DeliveryOrderList />,
  },
  {
    path: PATH.ORDER_MANAGEMENT,
    component: <OrderManagement />,
  },
  {
    path: PATH.ORDER_DETAIL,
    component: <OrderDetail />,
  },
  {
    path: PATH.WELCOME_PAGE,
    component: <WelcomePage />,
  },
  {
    path: PATH.OUTSTANDING_REPORT,
    component: <OutstandingReport />,
  },
];
