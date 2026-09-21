import { createContext, useContext } from "react";

import {
  type LoginPayload,
  type LoginData,
  type ApiResponse,
  type LoginSendOtpPayload,
  type LoginVerifyOtpPayload,
  type LoginSendOtpResponse,
  type ForgotPasswordPayload,
  type ForgotPasswordResponse,
  type ResetPasswordPayload,
  type ResetPasswordResponse,
} from "../types";

interface AuthActions {
  login: (payload: LoginPayload) => Promise<ApiResponse<LoginData>>;
  sendOtp?: (payload: LoginSendOtpPayload) => Promise<LoginSendOtpResponse>;
  verifyOtp?: (
    payload: LoginVerifyOtpPayload,
  ) => Promise<ApiResponse<LoginData>>;
  forgotPassword?: (
    payload: ForgotPasswordPayload,
  ) => Promise<ForgotPasswordResponse>;
  resetPassword?: (
    payload: ResetPasswordPayload,
  ) => Promise<ResetPasswordResponse>;
}

const AuthActionContext = createContext<AuthActions | null>(null);

export const AuthActionProvider = AuthActionContext.Provider;

export const useAuthActions = () => {
  const context = useContext(AuthActionContext);
  if (!context) {
    throw new Error("useAuthActions must be used within an AuthActionProvider");
  }
  return context;
};
