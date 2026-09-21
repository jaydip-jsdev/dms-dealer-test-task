import companyIcon from "../../assets/sidebarIcons/companyIcon.png";
import complaintManagementIcon from "../../assets/sidebarIcons/complaintManagementIcon.png";
import dashboardIcon from "../../assets/sidebarIcons/dashboardIcon.png";
import deliveryIcon from "../../assets/sidebarIcons/deliveryIcon.png";
import designIcon from "../../assets/sidebarIcons/designIcon.png";
import gradeIcon from "../../assets/sidebarIcons/gradeIcon.png";
import itemManagementIcon from "../../assets/sidebarIcons/itemManagementIcon.png";
import lotIcon from "../../assets/sidebarIcons/lotIcon.png";
import orderManagementIcon from "../../assets/sidebarIcons/orderManagementIcon.png";
import paymentTermsIcon from "../../assets/sidebarIcons/paymentTermsIcon.png";
import priceIcon from "../../assets/sidebarIcons/priceIcon.png";
import subGradeIcon from "../../assets/sidebarIcons/subGradeIcon.png";
import subscriptionIcon from "../../assets/sidebarIcons/subscriptionIcon.png";
import { PATH } from "../Router/routerPath";

export const menuConfig = [
  {
    key: "/",
    icon: dashboardIcon,
    alt: "dashboardIcon",
    label: "Dashboard",
  },
  {
    key: PATH.ORDERMANAGEMENT,
    icon: orderManagementIcon,
    alt: "orderIcon",
    label: "Order Management",
  },
  {
    key: PATH.ITEMMANAGEMENT,
    icon: itemManagementIcon,
    alt: "ItemIcon",
    label: "Item Management",
  },
  {
    key: PATH.COMPLAINTMANAGEMENT,
    icon: complaintManagementIcon,
    alt: "complaintIcon",
    label: "Complaint Management",
  },
  {
    key: PATH.SUBSCRIPTION,
    icon: subscriptionIcon,
    alt: "subscriptionIcon",
    label: "My Subscription List",
  },
  {
    key: PATH.DELIVERYORDER,
    icon: deliveryIcon,
    alt: "deliveryIcon",
    label: "Delivery Order List",
  },
  {
    key: PATH.COMPANYLIST,
    icon: companyIcon,
    alt: "companyIcon",
    label: "Company",
  },
  {
    key: PATH.DESIGNLIST,
    icon: designIcon,
    alt: "designIcon",
    label: "Design",
  },
  {
    key: PATH.LOTLIST,
    icon: lotIcon,
    alt: "lotIcon",
    label: "Lot",
  },
  {
    key: PATH.PRICELIST,
    icon: priceIcon,
    alt: "priceIcon",
    label: "Price",
  },
  {
    key: PATH.GRADELIST,
    icon: gradeIcon,
    alt: "gradeIcon",
    label: "Grade",
  },
  {
    key: PATH.SUBGRADELIST,
    icon: subGradeIcon,
    alt: "subGradeIcon",
    label: "Sub Grade",
  },
  {
    key: PATH.PAYMENTTERMSLIST,
    icon: paymentTermsIcon,
    alt: "paymentTermsIcon",
    label: "Payment Terms",
  },
];
