import type { ApiErrorResponse } from "@repo/ui";
import { message } from "antd";
import type { AxiosError } from "axios";

import { api } from "../client";

export const exportExcel = async (endpoint: string) => {
  const response = await api.get(endpoint, {
    responseType: "blob",
  });
  return response;
};

export const exportExcelCall = (
  endpoint: string,
  fileName: string,
  setTransition: (action: () => Promise<void> | void) => void,
  id?: string,
) => {
  setTransition(async () => {
    try {
      const newEndPoint = `/${endpoint}/excel/export${id ? `/${id}` : ""}`;
      const response = await exportExcel(newEndPoint);
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${fileName}.xlsx`);
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
      message.success("Export successful");
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;
      message.error(error.response?.data.message ?? error.message);
    }
  });
};
