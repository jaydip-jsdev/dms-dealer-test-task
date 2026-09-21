import type {
  LoginPayload,
  LoginData,
  ApiResponse,
  LoginSendOtpPayload,
  LoginSendOtpResponse,
  LoginVerifyOtpPayload,
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  ResetPasswordPayload,
  ResetPasswordResponse,
} from "@repo/ui";

import { api } from "../client";

export const loginDealer = async (payload: LoginPayload) => {
  const { data } = await api.post<ApiResponse<LoginData>>(
    "/auth/login",
    payload,
  );
  return data;
};

export const loginSendOtpDealer = async (payload: LoginSendOtpPayload) => {
  const { data } = await api.post<LoginSendOtpResponse>(
    "/auth/send-otp",
    payload,
  );
  return data;
};

export const loginVerifyOtpDealer = async (payload: LoginVerifyOtpPayload) => {
  const { data } = await api.post<ApiResponse<LoginData>>(
    "/auth/verify-otp",
    payload,
  );
  return data;
};
export const forgotPasswordDealer = async (payload: ForgotPasswordPayload) => {
  const { data } = await api.post<ForgotPasswordResponse>(
    "/auth/forgot-password",
    payload,
  );
  return data;
};
export const resetPasswordDealer = async (payload: ResetPasswordPayload) => {
  const { data } = await api.post<ResetPasswordResponse>(
    "/auth/reset-password",
    payload,
  );
  return data;
};
