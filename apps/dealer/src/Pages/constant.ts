import complaintManagementIcon from "../../assets/icons/complaintManagementIcon.png";
import deliveryOrderIcon from "../../assets/icons/deliveryOrderIcon.png";
import documentIcon from "../../assets/icons/documentIcon.png";
import icon1 from "../../assets/icons/icon1.png";
import ledgerIcon from "../../assets/icons/ledgerIcon.png";
import orderManagementIcon from "../../assets/icons/orderManagementIcon.png";
import outstandingReportIcon from "../../assets/icons/outstandingReportIcon.png";
import priceIcon from "../../assets/icons/priceIcon.png";
import salesIcon from "../../assets/icons/salesIcon.png";
import { PATH } from "../Routers/routerPath";

export const menuConfig = [
  {
    key: PATH.HOME,
    icon: icon1,
    alt: "dashboardIcon",
    label: "Dashboard",
  },
  {
    key: PATH.PRICE,
    icon: priceIcon,
    alt: "priceIcon",
    label: "Price",
  },
  {
    key: PATH.COMPLAINTMANAGEMENT,
    icon: complaintManagementIcon,
    alt: "complaintIcon",
    label: "Complaint Management",
  },
  {
    key: PATH.ORDER_MANAGEMENT,
    icon: orderManagementIcon,
    alt: "orderIcon",
    label: "Order Management",
  },
  {
    key: PATH.DELIVERY_ORDER,
    icon: deliveryOrderIcon,
    alt: "deliveryIcon",
    label: "Delivery Order",
  },
  {
    key: PATH.LEDGER,
    icon: ledgerIcon,
    alt: "ledgerIcon",
    label: "Ledger",
  },
  {
    key: PATH.DOCUMENT,
    icon: documentIcon,
    alt: "documentIcon",
    label: "Document",
  },
  {
    key: PATH.SALES,
    icon: salesIcon,
    alt: "salesIcon",
    label: "Sales Report",
  },
  {
    key: PATH.OUTSTANDING_REPORT,
    icon: outstandingReportIcon,
    alt: "outstandingIcon",
    label: "Outstanding Report",
  },
];
