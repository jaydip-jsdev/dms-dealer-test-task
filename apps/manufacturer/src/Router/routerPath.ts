export const MODULE_PATHS = {
  HOME: "/",
  ORDERMANAGEMENT: "/order-management/order-list",
  ITEMMANAGEMENT: "/item-management/item-list",
  SUBSCRIPTION: "/subscription/my-subscription-list",
  SUBSCRIPTIONDETAILS: "/subscription-management/subscription-list/:id",
  DELIVERYORDER: "/delivery-order/delivery-order-list",
  COMPLAINTMANAGEMENT: "/complaint-management/complaint-list",
  COMPANYLIST: "/company/company-list",
  DESIGNLIST: "/design/designList",
  LOTLIST: "/lot/lot-list",
  PRICELIST: "/price/price-list",
  GRADELIST: "/grade/grade-list",
  SUBGRADELIST: "/sub-grade/sub-grade-list",
  PAYMENTTERMSLIST: "/payment-terms/payment-terms-list",
};

export const AUTH_PATHS = {
  LOGIN: "/login",
  FORGOTPASSWORD: "/forgot-password",
  GOTOEMAIL: "/go-to-email",
  RESETPASSWORD: "/reset-password",
  GETOTP: "/otp",
};

export const PATH = {
  ...MODULE_PATHS,
  ...AUTH_PATHS,
};
