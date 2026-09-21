import type { ReactElement } from "react";

import ComplaintManagement from "../../../manufacturer/src/modules/ComplaintManagement.tsx";
import Dashboard from "../../../manufacturer/src/modules/Dashboard.tsx";
import DeliveryOrder from "../../../manufacturer/src/modules/DeliveryOrder.tsx";
import ItemManagement from "../../../manufacturer/src/modules/ItemManagement.tsx";
import MySubscription from "../../../manufacturer/src/modules/MySubsciption.tsx";
import OrderManagement from "../../../manufacturer/src/modules/OrderManagement.tsx";
import SubscriptionList from "../../../manufacturer/src/modules/SubscritionManagement/SubscriptionDetails/SubscriptionDetails.tsx";
import { PATH } from "../../../manufacturer/src/Router/routerPath.ts";
import Company from "../modules/Company.tsx";
import Design from "../modules/Design.tsx";
import Grade from "../modules/Grade.tsx";
import Lot from "../modules/Lot.tsx";
import PaymentTerms from "../modules/PaymentTerms.tsx";
import Price from "../modules/Price.tsx";
import SubGrade from "../modules/SubGrade.tsx";

interface Route {
  path: string;
  component: ReactElement;
}

export const moduleRoutes: Route[] = [
  {
    path: PATH.HOME,
    component: <Dashboard />,
  },
  {
    path: PATH.ORDERMANAGEMENT,
    component: <OrderManagement />,
  },
  {
    path: PATH.ITEMMANAGEMENT,
    component: <ItemManagement />,
  },
  {
    path: PATH.SUBSCRIPTION,
    component: <MySubscription />,
  },
  {
    path: PATH.SUBSCRIPTIONDETAILS,
    component: <SubscriptionList />,
  },
  {
    path: PATH.DELIVERYORDER,
    component: <DeliveryOrder />,
  },
  {
    path: PATH.COMPLAINTMANAGEMENT,
    component: <ComplaintManagement />,
  },
  {
    path: PATH.COMPANYLIST,
    component: <Company />,
  },
  {
    path: PATH.DESIGNLIST,
    component: <Design />,
  },
  {
    path: PATH.LOTLIST,
    component: <Lot />,
  },
  {
    path: PATH.PRICELIST,
    component: <Price />,
  },
  {
    path: PATH.GRADELIST,
    component: <Grade />,
  },
  {
    path: PATH.SUBGRADELIST,
    component: <SubGrade />,
  },
  {
    path: PATH.PAYMENTTERMSLIST,
    component: <PaymentTerms />,
  },
];
