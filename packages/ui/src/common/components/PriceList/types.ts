export interface PriceListDataType {
  sr_no: number;
  item_name: string;
  a1: number;
  a2: number;
  a3: number;
  a4: number;
  pq: number;
  clq: string | number;
}

export interface PriceListProps {
  data: PriceListDataType[];
  effectiveDate: string;
  onSearch?: (value: string) => void;
  onEffectiveDateChange?: (value: string) => void;
  onExport?: () => void;
}
