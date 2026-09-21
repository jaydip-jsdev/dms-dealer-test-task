import { Tag, type TableProps, type TabsProps } from "antd";
import { Link } from "react-router-dom";

import type { SubscriptionListType, SubscriptionType } from "../../types";
import { getClearDate } from "../../utils";

const getProperSubscriptionType: Record<SubscriptionType, string> = {
  yearly: "Yearly",
  half_yearly: "Half Yearly",
  quarterly: "Quarterly",
  monthly: "Monthly",
};

const columns = (
  page: number,
  pageSize: number,
): TableProps<SubscriptionListType>["columns"] => [
  {
    title: "Sr. No.",
    key: "sr_no",
    render: (_, __, index) => {
      return (page - 1) * pageSize + index + 1;
    },
    width: 70,
  },
  {
    title: "Code",
    dataIndex: "subscriptionCode",
    render: (_, record: SubscriptionListType) => (
      <Link
        to={`/subscription-management/subscription-list/${record.subscriptionCode}`}
      >
        {record.subscriptionCode}
      </Link>
    ),
  },
  {
    title: "No. Of Dealer",
    dataIndex: "allowedDealersNumber",
  },
  {
    title: "Subscription Type",
    dataIndex: "subscriptionType",
    render: (_: SubscriptionType, record: SubscriptionListType) =>
      getProperSubscriptionType[record.subscriptionType],
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
    render: (_: string, record: SubscriptionListType) =>
      getClearDate(record.startDate),
  },
  {
    title: "End Date",
    dataIndex: "endDate",
    render: (_: string, record: SubscriptionListType) =>
      getClearDate(record.endDate),
  },
  {
    title: "Invoice No.",
    dataIndex: "invoiceNumber",
  },
  {
    title: "Invoice Date",
    dataIndex: "invoiceDate",
    render: (_: string, record: SubscriptionListType) =>
      getClearDate(record.invoiceDate),
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    render: (_: string, record: SubscriptionListType) =>
      getClearDate(record.createdAt),
  },
  {
    title: "Created By",
    dataIndex: "createdBy",
  },
  {
    title: "Status",
    dataIndex: "isActive",
    render: (_: boolean, record: SubscriptionListType) => (
      <Tag color={record.isActive ? "green" : "red"}>
        {record.isActive ? "Active" : "Inactive"}
      </Tag>
    ),
  },
];

export default columns;

export const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Dealer",
  },
];
