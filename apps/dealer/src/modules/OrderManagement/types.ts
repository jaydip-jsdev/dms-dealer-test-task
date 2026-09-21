export interface OrderData {
  sr_no: number;
  order_no: string;
  billing_party: string;
  order_ref_no: string;
  party_group: string;
  party_name: string;
  address: string;
  lot_no: string;
  grade: string;
  subgrade: string;
  item_name: string;
  pieces_box: string;
  quantity: string;
  cops_cheese: string;
  rate: string;
  design: string;
  color: string;
  shade: string;
  ends: string;
  width: string;
  length: string;
  status: string;
}

export interface DetailItemProps {
  label: string;
  value: string | number | null;
  full?: boolean;
}
