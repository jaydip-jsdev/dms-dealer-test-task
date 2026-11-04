export const STATUS_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
  { label: "Blacklisted", value: "blacklisted" },
];
export const CheckBoxNames = [
  { label: "Login Email", value: "email" },
  { label: "Created At", value: "createdAt" },
  { label: "Created By", value: "createdBy" },
];
export const statusVerb: Record<string, string> = {
  approved: "approve",
  rejected: "reject",
  blacklisted: "blacklist",
};
