import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  message,
  Row,
  Statistic,
  Typography,
  type CountdownProps,
} from "antd";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import { useState, useTransition } from "react";
import { useNavigate } from "react-router-dom";
import "./OtpPage.scss";

import { MODULE_PATHS } from "../../../../../apps/dealer/src/Routers/routerPath";
import { useAuthActions } from "../../context/AuthActionContext";
import type { ApiErrorResponse, LoginSendOtpPayload } from "../../types";

import { useOtpPageRules } from "./OtpPageFormRules";

const { Title, Text } = Typography;
const { Timer } = Statistic;

const OtpPage = () => {
  const { sendOtp, verifyOtp } = useAuthActions();
  const navigate = useNavigate();
  const mobileNumber = localStorage.getItem("mobileNumber") ?? "N/A";

  const initialCounter = dayjs().add(60, "second").valueOf();
  const [deadline, setDeadline] = useState(initialCounter);
  const [isCountdownFinished, setIsCountdownFinished] = useState(false);

  const [loading, startTransition] = useTransition();

  const handleMobileLogin = (values: LoginSendOtpPayload) => {
    if (!sendOtp) return;
    startTransition(async () => {
      try {
        const response = await sendOtp(values);

        if (!response.isError) {
          message.success(response.message);
        }
      } catch (err) {
        const error = err as AxiosError<ApiErrorResponse>;
        console.error("Login Failed", error);
        message.error(error.response?.data?.message || "Invalid Number");
      }
    });
  };

  const handleVerifyOtp = (values: { otp: string }) => {
    if (!verifyOtp) return;
    startTransition(async () => {
      try {
        const payload = { mobileNumber: mobileNumber, otp: values.otp };
        const response = await verifyOtp(payload);

        if (response.data.accessToken) {
          message.success("Login Successful");
          localStorage.removeItem("mobileNumber");
          if (response.data.role === "DEALER") {
            navigate(MODULE_PATHS.WELCOME_PAGE);
          } else {
            navigate(MODULE_PATHS.HOME);
          }
        }
      } catch (err) {
        const error = err as AxiosError<ApiErrorResponse>;
        console.error("Login Failed", error);

        message.error(error.response?.data?.message || "Invalid OTP");
      }
    });
  };

  const onFinish: CountdownProps["onFinish"] = () => {
    setIsCountdownFinished(true);
  };

  const restartCounter = () => {
    setDeadline(initialCounter);
    setIsCountdownFinished(false);
    handleMobileLogin({ mobileNumber: mobileNumber });
  };

  return (
    <>
      <Flex gap={48} vertical className="otp-page-section">
        <Flex align="center" vertical className="otp-page-title">
          <Title level={3}>Login</Title>
          <Text className="otp-title-discription">
            We sent 6 digit code on +91-{mobileNumber} Enter that code to login.
          </Text>
        </Flex>
        <Form
          layout="vertical"
          className="form-container"
          onFinish={handleVerifyOtp}
        >
          <Row>
            <Col>
              <Form.Item
                name="otp"
                label="Verification Code"
                layout="vertical"
                rules={useOtpPageRules.otp}
              >
                <Input.OTP length={6} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col>
              <Timer
                type="countdown"
                format="mm:ss"
                value={deadline}
                onFinish={onFinish}
                className="count-down"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              Didn’t receive the OTP?{" "}
              <span
                onClick={restartCounter}
                className={
                  isCountdownFinished
                    ? "active-resend-otp"
                    : "inactive-resend-otp"
                }
              >
                Resend OTP
              </span>
            </Col>
          </Row>
          <Button
            className="otp-submit-btn"
            htmlType="submit"
            type="primary"
            loading={loading}
          >
            Login
          </Button>
        </Form>
      </Flex>
    </>
  );
};

export default OtpPage;
