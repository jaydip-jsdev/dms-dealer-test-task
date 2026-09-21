import type {
  LoginPayload,
  LoginData,
  ApiResponse,
  LoginSendOtpPayload,
  LoginSendOtpResponse,
  LoginVerifyOtpPayload,
  ForgotPasswordResponse,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  ResetPasswordResponse,
} from "@repo/ui";
import { AuthActionProvider } from "@repo/ui/context/AuthActionContext";
import AppRouter from "@repo/ui/Router/Router";

import {
  forgotPasswordDealer,
  loginDealer,
  loginSendOtpDealer,
  loginVerifyOtpDealer,
  resetPasswordDealer,
} from "./api/services/authService";
import AuthGuard from "./Routers/AuthGuard";
import { moduleRoutes } from "./Routers/routes";
import UserGuard from "./Routers/UserGuard";

function App() {
  const setDetails = (data: LoginData) => {
    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("role", "DEALER");

    if (data.dealer) {
      localStorage.setItem("userDetails", JSON.stringify(data.dealer));
    }
  };

  const handleLogin = async (
    payload: LoginPayload,
  ): Promise<ApiResponse<LoginData>> => {
    const res = await loginDealer(payload);

    setDetails(res.data);

    return res;
  };
  const handleLoginSendOtp = async (
    payload: LoginSendOtpPayload,
  ): Promise<LoginSendOtpResponse> => {
    const res = await loginSendOtpDealer(payload);
    localStorage.setItem("mobileNumber", payload.mobileNumber);
    return res;
  };
  const handleLoginVerifyOtp = async (
    payload: LoginVerifyOtpPayload,
  ): Promise<ApiResponse<LoginData>> => {
    const res = await loginVerifyOtpDealer(payload);

    setDetails(res.data);

    return res;
  };
  const handleForgotPassword = async (
    payload: ForgotPasswordPayload,
  ): Promise<ForgotPasswordResponse> => {
    const res = await forgotPasswordDealer(payload);
    return res;
  };
  const handleResetPassword = async (
    payload: ResetPasswordPayload,
  ): Promise<ResetPasswordResponse> => {
    const res = await resetPasswordDealer(payload);
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
