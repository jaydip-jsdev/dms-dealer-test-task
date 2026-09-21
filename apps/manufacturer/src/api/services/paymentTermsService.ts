import type { PaymentTermListResponse, QueryParamsType } from "../../types";
import { getCleanUrl } from "../../utils";
import { api } from "../client";

export const fetchPaymentTerms = async (params: QueryParamsType) => {
  const url = getCleanUrl(params, "payment-term");
  const { data } = await api.get<PaymentTermListResponse>(url);
  return data;
};
