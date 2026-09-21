import { Button, Flex, Form, Input, message, Typography } from "antd";
import { AxiosError } from "axios";
import { useTransition } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.scss";

import { useAuthActions } from "../../context/AuthActionContext";
import { PATH } from "../../Router/routerPath";
import { type ApiErrorResponse, type ForgotPasswordPayload } from "../../types";

import { useForgotPasswordRules } from "./ForgotPasswordFormRules";

const { Title, Text } = Typography;

const ForgotPassword = () => {
  const { forgotPassword } = useAuthActions();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, startTransition] = useTransition();
  const handleSubmit = (value: ForgotPasswordPayload) => {
    if (!forgotPassword) return;
    startTransition(async () => {
      try {
        const response = await forgotPassword(value);

        if (!response.isError) {
          navigate(PATH.GOTOEMAIL);
        } else {
          message.error(
            response.message || "Failed to send password reset link.",
          );
        }
      } catch (err) {
        const error = err as AxiosError<ApiErrorResponse>;
        message.error(error.response?.data?.message || "Invalid Email");
      }
    });
  };
  return (
    <Flex className="forgot-password-section" vertical gap={48}>
      <Flex vertical align="center" className="forgot-password-title">
        <Title level={3}>FORGOT PASSWORD</Title>
        <Text className="title-disciption">
          Enter your registered email. we&apos;ll send you a verification link
          to reset your password.
        </Text>
      </Flex>
      <Form
        form={form}
        layout="vertical"
        className="form-container"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={useForgotPasswordRules.email}
        >
          <Input type="email" placeholder="Enter" />
        </Form.Item>
        <Button
          htmlType="submit"
          className="forgot-password-btn"
          loading={loading}
          type="primary"
        >
          Get a Link
        </Button>
      </Form>
    </Flex>
  );
};

export default ForgotPassword;
