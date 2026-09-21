export const AddComplaintRules = {
  complaintDate: [
    {
      required: true,
      message: "Complaint Date is required",
    },
  ],
  complaintTime: [
    {
      required: true,
      message: "Complaint Time is required",
    },
  ],
  complaintType: [
    {
      required: true,
      transform: (value: string) => value?.trim(),
      message: "Complaint Type is required",
    },
  ],
  complaintDescription: [
    {
      required: true,
      transform: (value: string) => value?.trim(),
      message: "Complaint Description is required",
    },
  ],
  contactNo: [
    {
      required: true,
      transform: (value: string) => value?.trim(),
      message: "Contact No is required",
    },
    {
      pattern: /^[0-9]+$/,
      message: "Contact No must be digits",
    },
  ],
  referenceInvoiceNo: [
    {
      required: true,
      transform: (value: string) => value?.trim(),
      message: "Reference Invoice Number is required",
    },
    {
      pattern: /^[a-zA-Z0-9,/-]+$/,
      message:
        "Reference Invoice Number must be alphanumeric or contain '-', '/'",
    },
    {
      max: 30,
      message: "Reference Invoice Number cannot exceed 30 characters",
    },
  ],
  invoiceDate: [
    {
      required: true,
      message: "Invoice Date is required",
    },
  ],
  dealerCode: [
    {
      required: true,
      transform: (value: string) => value?.trim(),
      message: "Dealer Name is required",
    },
  ],
  complaintBy: [
    {
      required: true,
      transform: (value: string) => value?.trim(),
      message: "Complaint By is required",
    },
  ],
};
