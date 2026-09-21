// validationRules.ts
import type { Rule } from "antd/es/form";

export const orderFormRules: Record<string, Rule[]> = {
  billingPartyId: [
    { required: true, message: "Please select a Billing Party" },
  ],
  itemCode: [{ required: true, message: "Please select an Item" }],
  lotNumber: [{ required: true, message: "Please select a Lot Number" }],
  itemGrade: [{ required: true, message: "Please select a Grade" }],
  subGradeCode: [{ required: true, message: "Please select a Subgrade" }],
  boxPieces: [{ required: true, message: "Please enter Box Pieces" }],
  itemQuantity: [{ required: true, message: "Please enter Quantity" }],
  copsPieces: [{ required: true, message: "Please enter Cops/Cheese" }],
  rate: [{ required: true, message: "Rate is required" }],
  orderRemark: [{ required: true, message: "Please enter a Remark" }],
  groupCode: [{ required: true, message: "Please select a Party Group" }],
  partyCode: [{ required: true, message: "Please select a Party Name" }],
};
