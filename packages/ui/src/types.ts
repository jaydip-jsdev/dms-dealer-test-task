export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginSendOtpPayload {
  mobileNumber: string;
}

export interface LoginVerifyOtpPayload extends LoginSendOtpPayload {
  otp: string;
}

export interface DealerProfile {
  dealerCode: string;
  dealerName: string;
  email: string;
  isActive: boolean;
}

export interface ManufacturerProfile {
  manufacturerCode: string;
  manufacturerName: string;
  email: string;
  isActive: boolean;
}

// 1. The specific data inside (Token + User)
export interface LoginData {
  accessToken: string;
  role: "DEALER" | "MANUFACTURER";
  dealer?: DealerProfile;
  manufacturer?: ManufacturerProfile;
}
export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export type ResetPasswordResponse = Omit<ApiResponse<unknown>, "data">;

export type ForgotPasswordResponse = Omit<ApiResponse<unknown>, "data">;

export type LoginSendOtpResponse = Omit<ApiResponse<unknown>, "data">;

export interface ApiResponse<T> {
  isError: boolean;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  isError: boolean;
  code: number;
  message: string;
  data: unknown;
}
