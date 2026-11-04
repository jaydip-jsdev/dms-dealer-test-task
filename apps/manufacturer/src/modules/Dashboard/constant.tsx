import { Tag, type TableProps } from "antd";
import dayjs from "dayjs";

import type { DashboardStatsType } from "../../types";

export const dashboardCards = [
  {
    id: "card-order",
    title: "ORDER",
    cols: [
      {
        id: "order-1",
        label: "Total Pending Order",
        key: "totalPendingOrders",
        span: 12,
      },
      {
        id: "order-2",
        label: "Quantity",
        key: "totalPendingQuantity",
        span: 12,
      },
    ],
  },
  {
    id: "card-complaint",
    title: "COMPLAINT",
    cols: [
      {
        id: "complaint-1",
        label: "Total Pending Complaint",
        key: "totalPendingComplaints",
        span: 24,
      },
    ],
  },
  {
    id: "card-dealer",
    title: "TOTAL DEALER",
    cols: [
      { id: "dealer-1", label: "Active Dealer", key: "active", span: 12 },
      { id: "dealer-2", label: "Inactive Dealer", key: "inactive", span: 12 },
    ],
  },
  {
    id: "card-server",
    title: "SERVER STATUS",
    cols: [
      {
        id: "server-1",
        label: "Last Sync",
        key: "lastSyncAt",
        span: 24,
      },
    ],
  },
];

export const getDashboardStatValue = (
  data: DashboardStatsType | null,
  key: string,
): string | number => {
  if (!data) return "-";

  const map: Record<string, string | number> = {
    totalPendingOrders: data.orders?.totalPendingOrders || 0,
    totalPendingQuantity: data.orders?.totalPendingQuantity || 0,
    totalPendingComplaints: data.complaints?.totalPendingComplaints || 0,
    active: data.dealers?.active || 0,
    inactive: data.dealers?.inactive || 0,
    lastSyncAt: data.lastSyncAt
      ? dayjs(data.lastSyncAt).format("DD/MM/YYYY HH:mm:ss")
      : "-",
  };

  const value = map[key];

  return value === null || value === undefined || value === "" ? "-" : value;
};

export const data = [
  {
    key: "S00001",
    sr_no: 1,
    code: "S00001",
    no_of_dealer: 3,
    subscription_type: "Yearly",
    startDate: "24/04/2025",
    endDate: "24/04/2025",
    invoice_no: "Sc000032",
    invoice_date: "24/04/2025",
    created_at: "24/04/2025",
    created_by: "Divyesh",
    status: "Active",
  },
  {
    key: "S00002",
    sr_no: 2,
    code: "S00002",
    no_of_dealer: 4,
    subscription_type: "Yearly",
    startDate: "24/04/2025",
    endDate: "24/04/2025",
    invoice_no: "Free",
    invoice_date: "24/04/2025",
    created_at: "24/04/2025",
    created_by: "Divyesh",
    status: "Active",
  },
  {
    key: "S00003",
    sr_no: 3,
    code: "S00003",
    no_of_dealer: 2,
    subscription_type: "Yearly",
    startDate: "24/04/2025",
    endDate: "24/04/2025",
    invoice_no: "Sc000012",
    invoice_date: "24/04/2025",
    created_at: "24/04/2025",
    created_by: "Divyesh",
    status: "Active",
  },
  {
    key: "S00004",
    sr_no: 4,
    code: "S00004",
    no_of_dealer: 6,
    subscription_type: "Yearly",
    startDate: "24/04/2025",
    endDate: "24/04/2025",
    invoice_no: "Free",
    invoice_date: "24/04/2025",
    created_at: "24/04/2025",
    created_by: "Divyesh",
    status: "Active",
  },
  {
    key: "S00005",
    sr_no: 5,
    code: "S00005",
    no_of_dealer: 10,
    subscription_type: "Yearly",
    startDate: "24/04/2025",
    endDate: "24/04/2025",
    invoice_no: "Free",
    invoice_date: "24/04/2025",
    created_at: "24/04/2025",
    created_by: "Divyesh",
    status: "Active",
  },
  {
    key: "S00006",
    sr_no: 6,
    code: "S00006",
    no_of_dealer: 8,
    subscription_type: "Yearly",
    startDate: "24/04/2025",
    endDate: "24/04/2025",
    invoice_no: "Sc000032",
    invoice_date: "24/04/2025",
    created_at: "24/04/2025",
    created_by: "Divyesh",
    status: "Active",
  },
  {
    key: "S00007",
    sr_no: 7,
    code: "S00007",
    no_of_dealer: 3,
    subscription_type: "Yearly",
    startDate: "24/04/2025",
    endDate: "24/04/2025",
    invoice_no: "Sc000034",
    invoice_date: "24/04/2025",
    created_at: "24/04/2025",
    created_by: "Divyesh",
    status: "Active",
  },
  {
    key: "S00008",
    sr_no: 8,
    code: "S00008",
    no_of_dealer: 7,
    subscription_type: "Yearly",
    startDate: "24/04/2025",
    endDate: "24/04/2025",
    invoice_no: "Free",
    invoice_date: "24/04/2025",
    created_at: "24/04/2025",
    created_by: "Divyesh",
    status: "Inactive",
  },
  {
    key: "S00009",
    sr_no: 9,
    code: "S00009",
    no_of_dealer: 4,
    subscription_type: "Yearly",
    startDate: "24/04/2025",
    endDate: "24/04/2025",
    invoice_no: "Free",
    invoice_date: "24/04/2025",
    created_at: "24/04/2025",
    created_by: "Divyesh",
    status: "Inactive",
  },
  {
    key: "S00010",
    sr_no: 10,
    code: "S00010",
    no_of_dealer: 6,
    subscription_type: "Yearly",
    startDate: "24/04/2025",
    endDate: "24/04/2025",
    invoice_no: "Free",
    invoice_date: "24/04/2025",
    created_at: "24/04/2025",
    created_by: "Divyesh",
    status: "Inactive",
  },
];

export const columns: TableProps["columns"] = [
  {
    title: "Sr No.",
    dataIndex: "sr_no",
  },
  {
    title: "Code",
    dataIndex: "code",
  },
  {
    title: "No. of Dealer",
    dataIndex: "no_of_dealer",
  },
  {
    title: "Subscription Type",
    dataIndex: "subscription_type",
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
  },
  {
    title: "End Date",
    dataIndex: "endDate",
  },
  {
    title: "Invoice No.",
    dataIndex: "invoice_no",
  },
  {
    title: "Invoice Date",
    dataIndex: "invoice_date",
  },
  {
    title: "Created At",
    dataIndex: "created_at",
  },
  {
    title: "Created By",
    dataIndex: "created_by",
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (status: string) => (
      <Tag
        color={
          {
            Inactive: "error",
            Active: "success",
            Pending: "processing",
          }[status] ?? "default"
        }
      >
        {status}
      </Tag>
    ),
  },
];
