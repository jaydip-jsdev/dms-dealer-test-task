import type { ApiErrorResponse } from "@repo/ui";
import { message } from "antd";
import type { AxiosError } from "axios";
import type { Dispatch, SetStateAction } from "react";

import { api } from "../client";

export const exportExcel = async (endpoint: string) => {
  const response = await api.get(endpoint, {
    responseType: "blob",
  });
  return response;
};

export const exportExcelCall = async (
  endpoint: string,
  fileName: string,
  setLoading: Dispatch<SetStateAction<boolean>>,
) => {
  try {
    setLoading(true);
    const response = await exportExcel(`/${endpoint}/excel/export`);
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
    Promise.reject("Test");
    message.success("Export successful");
    setLoading(false);
  } catch (err) {
    setLoading(false);
    const error = err as AxiosError<ApiErrorResponse>;
    message.error(error.response?.data.message ?? error.message);
  }
};
