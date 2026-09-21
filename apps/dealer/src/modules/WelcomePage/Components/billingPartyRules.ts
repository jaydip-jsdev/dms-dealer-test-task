import type { Rule } from "antd/es/form";

export const billingPartyRules: Record<string, Rule[]> = {
  partyName: [
    { required: true, message: "Party name is required." },
    { whitespace: true, message: "Party name cannot be empty spaces." },
  ],
  gstNumber: [
    { required: true, message: "GST number is required." },
    { len: 15, message: "GST number must be exactly 15 characters." },
    {
      pattern: /^[a-zA-Z0-9]+$/,
      message: "GST number cannot contain spaces or special characters.",
    },
  ],
  address: [
    { required: true, message: "Address is required." },
    { whitespace: true, message: "Address cannot be empty spaces." },
  ],
  mobileNumber: [
    { required: true, message: "Mobile number is required." },
    {
      pattern: /^\d{10}$/,
      message: "Mobile number must be exactly 10 digits.",
    },
  ],
  email: [
    { required: true, message: "Email is required." },
    { type: "email", message: "Please enter a valid email address." },
    { min: 5, message: "Email must be at least 5 characters." },
  ],
};
