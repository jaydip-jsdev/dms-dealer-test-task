import ForgotPassword from "../common/ForgotPassword/ForgotPassword";
import GoToEmail from "../common/GoToEmail/GoToEmail";
import LoginScreen from "../common/LoginScreen/LoginScreen";
import OtpPage from "../common/OTPPage/OtpPage";
import ResetPassword from "../common/ResetPassword/ResetPassword";

import { PATH } from "./routerPath";

interface Route {
  path: string;
  component: React.ReactNode;
}

export const authRoutes: Route[] = [
  {
    path: PATH.LOGIN,
    component: <LoginScreen />,
  },
  {
    path: PATH.FORGOTPASSWORD,
    component: <ForgotPassword />,
  },
  {
    path: PATH.GOTOEMAIL,
    component: <GoToEmail />,
  },
  {
    path: PATH.RESETPASSWORD,
    component: <ResetPassword />,
  },
  {
    path: PATH.GETOTP,
    component: <OtpPage />,
  },
];
