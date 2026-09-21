import type { DashboardCard, DoRow, DoSummary, SalesCardData } from "./types";

export const dashboardCards: DashboardCard[] = [
  {
    id: 1,
    title: "OUTSTANDING",
    cols: [
      { id: 1, label: "30/09/2025", value: "50", span: 12 },
      { id: 2, label: "Month Till Date", value: "50", span: 12 },
    ],
  },
  {
    id: 2,
    title: "LEDGER",
    cols: [{ id: 1, label: "Balance", value: "50,000.00 CR", span: 24 }],
  },
  {
    id: 3,
    title: "ORDERS",
    cols: [
      { id: 1, label: "Pending Order", value: "10", span: 12 },
      { id: 2, label: "Quantity", value: "20.000", span: 12 },
    ],
  },
  {
    id: 4,
    title: "COMPLAINT",
    cols: [
      { id: 1, label: "Open", value: "50", span: 8 },
      { id: 2, label: "Close", value: "50", span: 8 },
      { id: 3, label: "Total", value: "100", span: 8 },
    ],
  },
  {
    id: 5,
    title: "SALES",
    cols: [
      { id: 1, label: "30/04/2025", value: "", span: 24 },
      { id: 2, label: "MONTH TO DATE", value: "", span: 24 },
      { id: 3, label: "Quantity", value: "2.5", span: 6 },
      { id: 4, label: "Amount", value: "2000", span: 6 },
      { id: 5, label: "Quantity", value: "4.000", span: 6 },
      { id: 6, label: "Amount", value: "3000", span: 6 },
    ],
  },
];

export const doTableData: DoRow[] = [
  {
    key: 1,
    doNo: "D99306",
    orderNo: "000006",
    partyName: "Akash Patel",
    itemName: "Octv",
    quantity: "1 Kg",
    address: "Ahmedabad",
    gst: "09078945",
    rate: 4,
    pieces: 1,
    status: "Approved",
  },
  {
    key: 2,
    doNo: "D99307",
    orderNo: "000007",
    partyName: "Hiren Patel",
    itemName: "Tv",
    quantity: "1 KG",
    address: "Ahmedabad",
    gst: "09078945",
    rate: 2,
    pieces: 1,
    status: "Approved",
  },
  {
    key: 3,
    doNo: "D99308",
    orderNo: "000008",
    partyName: "Sunil Sharma",
    itemName: "Light",
    quantity: "1 KG",
    address: "Ahmedabad",
    gst: "09078945",
    rate: 3,
    pieces: 1,
    status: "Approved",
  },
  {
    key: 4,
    doNo: "D99309",
    orderNo: "000009",
    partyName: "Kaushik Sharma",
    itemName: "Fridge",
    quantity: "4 KG",
    address: "Ahmedabad",
    gst: "09078945",
    rate: 1,
    pieces: 4,
    status: "Approved",
  },
];

export const serverStatusCard = {
  id: 6,
  title: "SERVER STATUS",
  cols: [
    {
      id: 1,
      label: "Last Sync",
      value: "2025-01-15 10:30:00",
      span: 24,
    },
  ],
};

export const doSummaryData: DoSummary[] = [
  {
    id: 1,
    title: "APPROVED",
    count: 100,
    quantity: "2.5",
  },
  {
    id: 2,
    title: "REJECTED",
    count: 200,
    quantity: "2.000",
  },
  {
    id: 3,
    title: "ON HOLD",
    count: 340,
    quantity: "3.000",
  },
  {
    id: 4,
    title: "PENDING",
    count: 340,
    quantity: "3.000",
  },
  {
    id: 5,
    title: "APPROVED WITHOUT SALES",
    count: 4,
    quantity: "3.000",
  },
];

export const salesCardData: SalesCardData = {
  id: 5,
  title: "SALES",
  sections: [
    {
      header: "30/04/2025",
      quantity: "2.5",
      amount: "2000",
    },
    {
      header: "MONTH TO DATE",
      quantity: "4.000",
      amount: "3000",
    },
  ],
};
