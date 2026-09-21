import dayjs from "dayjs";

import type { QueryParamsType } from "../types";

export const getCleanUrl = (params: QueryParamsType, endpoint: string) => {
  const cleanParams = Object.entries(params).reduce(
    (acc, [key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        acc[key] = String(value);
      }
      return acc;
    },
    {} as Record<string, string>,
  );

  const queryString = new URLSearchParams(cleanParams).toString();

  const url = queryString ? `/${endpoint}?${queryString}` : `/${endpoint}`;
  return url;
};

export const getClearDate = (date: string) => {
  return dayjs(date).format("DD-MM-YYYY");
};

export const payloadDate = (date?: string) => {
  if (!date) {
    return;
  }
  return dayjs(date).format("YYYY-MM-DD");
};

export const disabledFutureTime = () => {
  const now = dayjs();

  return {
    disabledHours: () =>
      Array.from({ length: 24 }, (_, i) => i).filter(
        (hour) => hour > now.hour(),
      ),

    disabledMinutes: (selectedHour: number) => {
      if (selectedHour === now.hour()) {
        return Array.from({ length: 60 }, (_, i) => i).filter(
          (minute) => minute > now.minute(),
        );
      }
      return [];
    },
  };
};
