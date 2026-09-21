import type {
  AddDealerPayload,
  DealerOptionResponse,
  SubscriptionDetailsResponse,
  SubscriptionListResponse,
  SubscriptionQueryParamsType,
} from "../../types";
import { getCleanUrl } from "../../utils";
import { api } from "../client";

export const fetchSubscription = async (
  params: SubscriptionQueryParamsType,
) => {
  const url = getCleanUrl(params, "subscriptions");
  const { data } = await api.get<SubscriptionListResponse>(url);
  return data;
};

export const fetchSubscriptionFilters = async () => {
  const { data } = await api.get("subscriptions/list-created-by");
  return data;
};

export const fetchSubscriptionDetails = async (subscriptionCode: string) => {
  const { data } = await api.get<SubscriptionDetailsResponse>(
    `subscriptions/${subscriptionCode}`,
  );
  return data;
};

export const fetchDealerOptions = async () => {
  const { data } = await api.get<DealerOptionResponse>(
    "subscriptions/dealers-options",
  );
  return data;
};

export const addDealerInSubscription = async (
  subscriptionCode: string,
  payload: AddDealerPayload,
) => {
  const res = await api.post(
    `subscriptions/${subscriptionCode}/dealers`,
    payload,
  );
  return res;
};

export const removeDealerFromSubscription = async (
  subscriptionCode: string,
  dealerCode: string,
) => {
  const res = await api.delete(
    `subscriptions/${subscriptionCode}/dealers/${dealerCode}`,
  );
  return res;
};

export const updateDealerStatusForSubscription = async (
  subscriptionCode: string,
  dealerCode: string,
) => {
  const res = await api.patch(
    `subscriptions/${subscriptionCode}/dealers/${dealerCode}/toggle-status`,
  );
  return res;
};
