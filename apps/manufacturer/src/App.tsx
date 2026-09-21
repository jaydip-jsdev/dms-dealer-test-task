import type {
  LoginPayload,
  LoginData,
  ApiResponse,
  LoginSendOtpPayload,
  LoginVerifyOtpPayload,
  LoginSendOtpResponse,
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  ResetPasswordPayload,
  ResetPasswordResponse,
} from "@repo/ui";
import { AuthActionProvider } from "@repo/ui/context/AuthActionContext";
import AppRouter from "@repo/ui/Router/Router";

import {
  forgotPasswordManufacturer,
  loginManufacturer,
  loginSendOtpManufacturer,
  loginVerifyOtpManufacturer,
  resetPasswordManufacturer,
} from "./api/services/authService";
import AuthGuard from "./Router/AuthGuard";
import { moduleRoutes } from "./Router/routes";
import UserGuard from "./Router/UserGuard";

function App() {
  const handleLogin = async (
    payload: LoginPayload,
  ): Promise<ApiResponse<LoginData>> => {
    const res = await loginManufacturer(payload);

    localStorage.setItem("token", res.data.accessToken);
    localStorage.setItem("role", "MANUFACTURER");

    if (res.data.manufacturer) {
      localStorage.setItem(
        "userDetails",
        JSON.stringify(res.data.manufacturer),
      );
    }

    return res;
  };

  const handleLoginSendOtp = async (
    payload: LoginSendOtpPayload,
  ): Promise<LoginSendOtpResponse> => {
    const res = await loginSendOtpManufacturer(payload);
    localStorage.setItem("mobileNumber", payload.mobileNumber);

    return res;
  };

  const handleLoginVerifyOtp = async (
    payload: LoginVerifyOtpPayload,
  ): Promise<ApiResponse<LoginData>> => {
    const res = await loginVerifyOtpManufacturer(payload);

    localStorage.setItem("token", res.data.accessToken);
    localStorage.setItem("role", "MANUFACTURER");

    if (res.data.manufacturer) {
      localStorage.setItem(
        "userDetails",
        JSON.stringify(res.data.manufacturer),
      );
    }

    return res;
  };

  const handleForgotPassword = async (
    payload: ForgotPasswordPayload,
  ): Promise<ForgotPasswordResponse> => {
    const res = await forgotPasswordManufacturer(payload);
    return res;
  };

  const handleResetPassword = async (
    payload: ResetPasswordPayload,
  ): Promise<ResetPasswordResponse> => {
    const res = await resetPasswordManufacturer(payload);
    return res;
  };

  return (
    <div className="main-container">
      <AuthActionProvider
        value={{
          login: handleLogin,
          sendOtp: handleLoginSendOtp,
          verifyOtp: handleLoginVerifyOtp,
          forgotPassword: handleForgotPassword,
          resetPassword: handleResetPassword,
        }}
      >
        <AppRouter
          moduleRoutes={moduleRoutes}
          AuthGuard={<AuthGuard />}
          UserGuard={<UserGuard />}
        />
      </AuthActionProvider>
    </div>
  );
}

export default App;
