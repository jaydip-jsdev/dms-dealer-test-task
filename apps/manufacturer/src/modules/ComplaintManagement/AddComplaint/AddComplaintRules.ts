export const AddComplaintRules = {
  complaintDate: [
    {
      required: true,
      message: "Complaint Date is required",
    },
  ],
  complaintType: [
    {
      required: true,
      message: "Complaint Type is required",
    },
  ],
  complaintDescription: [
    {
      required: true,
      message: "Complaint Description is required",
    },
  ],
  contactNo: [
    {
      required: true,
      message: "Contact No is required",
    },
    {
      pattern: /^[0-9.]+$/,
      message: "Contact No must be digite",
    },
  ],
  referenceInvoiceNo: [
    {
      required: true,
      message: "Reference Invoice No is required",
    },
    {
      pattern: /^[0-9.]+$/,
      message: "Reference Invoice No must be digite",
    },
  ],
  invoiceDate: [
    {
      required: true,
      message: "Invoice Date is required",
    },
  ],
  dealerName: [
    {
      required: true,
      message: "Dealer Name is required",
    },
  ],
  complaintBy: [
    {
      required: true,
      message: "Complaint By is required",
    },
  ],
};
