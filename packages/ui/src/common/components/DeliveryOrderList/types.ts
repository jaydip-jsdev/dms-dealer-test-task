export interface DeliveryOrderType {
  sr_no: number;
  code: string;
  order_no: string;
  party_name: string;
  item_name: string;
  quantity: string;
  address: string;
  gst: string;
  rate: string;
  pieces_box: string;
  status: string;
  party_group?: string;
  lot_no?: string;
  order_quantity?: string;
  sale_quantity?: string;
  do_quantity?: string;
  balance_quantity?: string;
  payment_terms?: string;
  list_price?: string;
  basic_rate?: string;
  net_rate?: string;
  advanced_received?: boolean;
  grade?: string;
  subgrade?: string;
  cops_cheese?: string;
  remark?: string;
  order_date?: string;
  d_o_date_time?: string;
}

export interface ColumnOption {
  key: string;
  label: string;
}

export interface CommonDeliveryOrderListProps {
  data: DeliveryOrderType[];
  columnOptions: ColumnOption[];
  onAddClick?: () => void;
  onSearch?: (value: string) => void;
  onExport?: () => void;
  onAddFormSubmit?: (formData: DeliveryOrderType) => void;
  onEditClick?: (record: DeliveryOrderType) => void;
}

export interface AddDeliveryOrderProps {
  open?: boolean;
  onClose?: () => void;
  onSubmit?: (formData: DeliveryOrderType) => void;
  initialData?: DeliveryOrderType;
}

export type FieldConfig = {
  name: string;
  label?: string;
  component: React.ReactNode;
  flex?: number;
  valuePropName?: string;
};
