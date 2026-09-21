import type { Dayjs } from "dayjs";

export type ModalState = {
  isVisible: boolean;
};

export type ManageFormatData = {
  formatName?: string;
  format: string[];
  groupBy: string[];
};

export type OutstandingFilterValues = {
  dealer?: string;
  billdate?: [Dayjs, Dayjs];
  duedate?: [Dayjs, Dayjs];
};
