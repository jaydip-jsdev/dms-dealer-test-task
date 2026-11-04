import type { Rule } from "antd/es/form";

export const AddDealerRules: Record<string, Rule[]> = {
  dealerName: [
    { required: true, message: "Please enter dealer name" },
    { min: 3, message: "Minimum 3 characters required" },
  ],

  gstNumber: [
    { required: true, message: "Please enter GST number" },
    {
      pattern: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/,
      message: "Please enter a valid GST number",
    },
  ],

  address: [
    { required: true, message: "Please enter address" },
    { min: 5, message: "Address must be at least 5 characters" },
  ],

  mobileNumber: [
    { required: true, message: "Please enter mobile number" },
    {
      pattern: /^[6-9]\d{9}$/,
      message: "Enter a valid 10-digit mobile number",
    },
  ],

  contactPerson: [
    { required: true, message: "Please enter contact person name" },
    { min: 3, message: "Minimum 3 characters required" },
  ],

  whatsappNumber: [
    { required: true, message: "Please enter WhatsApp number" },
    {
      pattern: /^[6-9]\d{9}$/,
      message: "Enter a valid WhatsApp number",
    },
  ],

  loginEmail: [
    { required: true, message: "Please enter login email" },
    { type: "email", message: "Please enter a valid email" },
  ],

  loginPassword: [
    { required: true, message: "Please enter password" },
    { min: 8, message: "Password must contain at least 8 characters" },
    {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      message: "Include uppercase, lowercase and a number",
    },
  ],
};
