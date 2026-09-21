import type { DashboardStatsResponse } from "../../types";
import { api } from "../client";

export const fetchDashboardStats = async () => {
  const url = "dashboard/stats";
  const { data } = await api.get<DashboardStatsResponse>(url);
  return data;
};
