export const useLoginScreenEmailRules = {
  email: [
    {
      required: true,
      message: "Please input Email!",
    },
    {
      transform: (value: string) => value.trim(),
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
      message: "Please Enter Valid Email",
    },
  ],
  password: [
    {
      required: true,
      message: "Please input Password!",
    },
  ],
  mobileNumber: [
    {
      required: true,
      message: "Please Enter Mobile No",
    },
    {
      pattern: /^[0-9]{10}$/,
      message: "Please enter a valid 10-digit mobile number",
    },
  ],
};
