export const useForgotPasswordRules = {
  email: [
    {
      required: true,
      message: "Please input Email!",
    },
    {
      transform: (value: string) => value.trim(),
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
      message: "Please enter correct email",
    },
  ],
};
