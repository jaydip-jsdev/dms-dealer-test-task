export const AddActionLogRules = {
  followUpDate: [
    {
      required: true,
      message: "Please select follow-up date",
    },
  ],
  followUpBy: [{ required: true, message: "Enter follow-up person" }],
  contactPerson: [{ required: true, message: "Enter contact person" }],
  description: [{ required: true, message: "Enter description" }],
  isVisited: [{ required: true, message: "Please select option" }],
};
