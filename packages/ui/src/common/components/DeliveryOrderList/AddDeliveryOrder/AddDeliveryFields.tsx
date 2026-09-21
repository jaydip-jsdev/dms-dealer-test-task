import { DatePicker, Input, Select } from "antd";

import type { FieldConfig } from "../types";

export const orderDetailRows: FieldConfig[][] = [
  [
    {
      name: "order_no",
      label: "Order No.",
      component: <Select placeholder="Select" />,
    },
    {
      name: "balance_quantity",
      label: "Balance Quantity (Kg)",
      component: <Input placeholder="Enter" />,
    },
  ],
  [
    {
      name: "party_name",
      label: "Billing Party Name",
      component: <Select placeholder="Select" />,
    },
    {
      name: "order_date",
      label: "Order Date",
      component: <DatePicker style={{ width: "100%" }} />,
    },
  ],
  [
    {
      name: "party_group",
      label: "Party Group",
      component: <Select placeholder="Select" />,
    },
    {
      name: "party_name_order",
      label: "Party Name",
      component: <Select placeholder="Select" />,
    },
  ],
  [
    {
      name: "item_name",
      label: "Item Name",
      component: <Input placeholder="Enter" />,
    },
    { name: "rate", label: "Rate", component: <Input placeholder="Enter" /> },
  ],
  [
    {
      name: "lot_no",
      label: "Lot No.",
      component: <Select placeholder="Select" />,
    },
    {
      name: "order_quantity",
      label: "Order Quantity (Kg)",
      component: <Input placeholder="Enter" />,
    },
  ],
  [
    {
      name: "sale_quantity",
      label: "Sale Quantity",
      component: <Input disabled placeholder="Enter" />,
    },
    {
      name: "do_quantity",
      label: "DO Quantity",
      component: <Input placeholder="Enter" />,
    },
  ],
  [
    {
      name: "gst",
      label: "GST",
      component: <Input placeholder="Enter" />,
    },
  ],
];

export const deliveryDetailRows: FieldConfig[][] = [
  [
    {
      name: "delivery_party_name",
      label: "Party Name",
      component: <Select placeholder="Select" />,
    },
    {
      name: "delivery_lot_no",
      label: "Lot No.",
      component: <Select placeholder="Select" />,
    },
  ],
  [
    {
      name: "payment_terms",
      label: "Payment Terms",
      component: <Select placeholder="Select" />,
    },
    { name: "grade", label: "Grade", component: <Input placeholder="Enter" /> },
  ],
  [
    {
      name: "subgrade",
      label: "Subgrade",
      component: <Input placeholder="Enter" />,
    },
    {
      name: "pieces_box",
      label: "Pieces / Box",
      component: <Input placeholder="Enter" />,
    },
  ],
  [
    {
      name: "cops_cheese",
      label: "Cops / Cheese",
      component: <Input placeholder="Enter" />,
    },
    {
      name: "do_order_quantity",
      label: "Quantity (Kg)",
      component: <Input placeholder="Enter" />,
    },
  ],
  [
    {
      name: "quantity",
      label: "Quantity (Kg)",
      component: <Input placeholder="Enter" />,
    },
    {
      name: "list_price",
      label: "List Price",
      component: <Input placeholder="Enter" />,
    },
  ],
  [
    {
      name: "basic_rate",
      label: "Basic Rate",
      component: <Input placeholder="Enter" />,
      flex: 0.5,
    },
    {
      name: "net_rate",
      label: "Net Rate",
      component: <Input placeholder="Enter" />,
      flex: 0.5,
    },
  ],
];
