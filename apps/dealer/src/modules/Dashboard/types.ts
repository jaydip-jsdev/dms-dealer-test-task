import type { serverStatusCard } from "./constant";
export interface DashboardStatItem {
  id: number;
  label?: string;
  value: string | number;
  span: number;
}
export interface DashboardCard {
  id: number;
  title: string;
  cols: DashboardStatItem[];
}
export interface DoRow {
  key: number;
  doNo: string;
  orderNo: string;
  partyName: string;
  itemName: string;
  quantity: string;
  address: string;
  gst: string;
  rate: number;
  pieces: number;
  status: "Approved" | "Pending" | "Rejected";
}
export interface DoSummary {
  id: number;
  title: string;
  count: number;
  quantity: string;
}

export interface SalesCardSection {
  header: string;
  quantity: string;
  amount: string;
}

export interface SalesCardData {
  id: number;
  title: string;
  sections: SalesCardSection[];
}

export type CardType = DashboardCard | SalesCardData | typeof serverStatusCard;
