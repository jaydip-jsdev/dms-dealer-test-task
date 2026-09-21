import { Button, Flex, Form, Input, message, Typography } from "antd";
import { AxiosError } from "axios";
import { useTransition } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./ResetPassword.scss";

import { useAuthActions } from "../../context/AuthActionContext";
import { PATH } from "../../Router/routerPath";
import { type ApiErrorResponse } from "../../types";

import { useResetPasswordRules } from "./ResetPasswordFormRules";

const { Title, Text } = Typography;

type formValue = {
  newPassword: string;
  confirmPassword: string;
};

const ResetPassword = () => {
  const { resetPassword } = useAuthActions();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [form] = Form.useForm();
  const [loading, startTransition] = useTransition();
  const onFinish = (value: formValue) => {
    if (!resetPassword) return;
    if (!token) {
      message.error("Invalid or missing reset token.");
      return;
    }
    const payload = {
      token: token,
      ...value,
    };
    startTransition(async () => {
      try {
        const response = await resetPassword(payload);
        if (!response.isError) {
          message.success(response.message || "Successfully reset password");
          navigate(PATH.LOGIN);
        } else {
          message.error(response.message || "Failed to reset password");
        }
      } catch (err) {
        const error = err as AxiosError<ApiErrorResponse>;
        message.error(error.response?.data?.message || "Something went wrong");
      }
    });
  };
  return (
    <Flex vertical gap={48}>
      <Flex vertical align="center">
        <Title level={3}>RESET PASSWORD</Title>
        <Text>Enter the new password to change your password</Text>
      </Flex>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="newPassword"
          label="New Password"
          rules={useResetPasswordRules.newPassword}
        >
          <Input placeholder="Enter" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          rules={useResetPasswordRules.confirmPassword}
        >
          <Input type="password" placeholder="Enter" />
        </Form.Item>
        <Button
          htmlType="submit"
          className="submit-btn"
          type="primary"
          loading={loading}
        >
          Submit
        </Button>
      </Form>
    </Flex>
  );
};

export default ResetPassword;
