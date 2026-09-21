export interface SaleItem {
  itemName: string;
  itemRate: number;
  grossAmount: number;
  addLess: number;
  taxableAmount: number;
  tax: number;
  itemAmount: number;
}

export interface SaleTax {
  cgst: number;
  sgst: number;
  igst: number;
  tds: number;
  totalTax: number;
}

export interface Sale {
  id: number;
  billDate: string;
  billNo: string;
  partyName: string;
  quantity: number;
  netAmount: number;
  totalQuantity: number;
  grossAmount: number;
  addLess: number;
  taxableAmount: number;
  totalTax: number;
  items: SaleItem[];
  taxes: SaleTax;
}
