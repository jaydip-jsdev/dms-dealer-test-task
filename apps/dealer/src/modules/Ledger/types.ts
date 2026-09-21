export interface LedgerRow {
  key: number;
  sr: number;
  type: string;
  date: string;
  account: string;
  billNo: string | number;
  docNo: string | number;
  chequeNo: string | number;
  debit: number;
  credit: number;
  balance: number;
}
