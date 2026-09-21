import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  message,
  Modal,
  Radio,
  Row,
  Typography,
} from "antd";
import { AxiosError } from "axios";
import { useState, useTransition } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginScreen.scss";

import { MODULE_PATHS } from "../../../../../apps/dealer/src/Routers/routerPath";
import { useAuthActions } from "../../context/AuthActionContext";
import { PATH } from "../../Router/routerPath";
import type {
  LoginSendOtpPayload,
  ApiErrorResponse,
  LoginPayload,
} from "../../types";

import { useLoginScreenEmailRules } from "./LoginScreenFormRules";

const { Title, Text } = Typography;

const LoginScreen = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const { login, sendOtp } = useAuthActions();

  const [loginBy, setLoginBy] = useState("Email");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, startTransition] = useTransition();

  const handleEmailLogin = (values: LoginPayload) => {
    startTransition(async () => {
      try {
        const response = await login(values);

        if (response.data.accessToken) {
          message.success("Login Successful");
          if (response.data.role === "DEALER") {
            navigate(MODULE_PATHS.WELCOME_PAGE);
          } else {
            navigate(MODULE_PATHS.HOME);
          }
        }
      } catch (err) {
        const error = err as AxiosError<ApiErrorResponse>;
        console.error("Login Failed", error);

        if (error.response?.data?.code === 403) {
          setIsOpen(true);
        } else {
          message.error(error.response?.data?.message || "Invalid Credentials");
        }
      }
    });
  };

  const handleMobileLogin = (values: LoginSendOtpPayload) => {
    if (!sendOtp) return;
    startTransition(async () => {
      try {
        const response = await sendOtp(values);

        if (!response.isError) {
          message.success(response.message);
          navigate(PATH.GETOTP);
        }
      } catch (err) {
        const error = err as AxiosError<ApiErrorResponse>;
        console.error("Login Failed", error);

        if (error.response?.data?.code === 403) {
          setIsOpen(true);
        } else {
          message.error(error.response?.data?.message || "Invalid Number");
        }
      }
    });
  };

  return (
    <>
      <Flex gap={50} vertical className="login-section">
        <Flex align="center" vertical className="login-title">
          <Title level={3}>LOGIN</Title>
          <Text>Welcome back! Login to your account.</Text>
        </Flex>

        <Form
          form={form}
          className="form-section"
          name="loginForm"
          layout="vertical"
          autoComplete="off"
          onFinish={(values) => {
            if (loginBy === "Email") {
              handleEmailLogin(values as LoginPayload);
            } else {
              handleMobileLogin(values as LoginSendOtpPayload);
            }
          }}
        >
          <Flex className="login-by">
            <Radio.Group value={loginBy}>
              <Radio.Button onClick={() => setLoginBy("Email")} value="Email">
                Email
              </Radio.Button>
              <Radio.Button onClick={() => setLoginBy("Mobile")} value="Mobile">
                Mobile
              </Radio.Button>
            </Radio.Group>
          </Flex>
          {loginBy === "Email" && (
            <Row className="row-section">
              <Col xs={24}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={useLoginScreenEmailRules.email}
                  normalize={(value) => value.trim()}
                >
                  <Input
                    placeholder="Enter"
                    onPressEnter={() => form.submit()}
                  />
                </Form.Item>
              </Col>

              <Col xs={24}>
                <Form.Item
                  label="Password"
                  name="password"
                  className="password-field"
                  rules={useLoginScreenEmailRules.password}
                >
                  <Input.Password
                    placeholder="Enter"
                    onPressEnter={() => form.submit()}
                  />
                </Form.Item>
                <Link className="forgot-password" to={PATH.FORGOTPASSWORD}>
                  Forgot Password?
                </Link>
              </Col>
            </Row>
          )}
          {loginBy === "Mobile" && (
            <Row className="mobile-row-section">
              <Col xs={24}>
                <Form.Item
                  label="Mobile No."
                  name="mobileNumber"
                  rules={useLoginScreenEmailRules.mobileNumber}
                  normalize={(value) => value.trim()}
                >
                  <Input
                    placeholder="Enter"
                    maxLength={10}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    onPressEnter={() => form.submit()}
                  />
                </Form.Item>
              </Col>
            </Row>
          )}
          <Flex vertical className="login-button">
            {loginBy === "Email" ? (
              <Button type="primary" htmlType="submit" loading={loading}>
                Login
              </Button>
            ) : (
              <Button type="primary" htmlType="submit" loading={loading}>
                Get an OTP
              </Button>
            )}
          </Flex>
        </Form>
      </Flex>
      <Modal
        title="Your account is currently inactive. Kindly contact the admin for support."
        onOk={() => setIsOpen(false)}
        open={isOpen}
        footer={
          <Button onClick={() => setIsOpen(false)} type="primary">
            Ok
          </Button>
        }
      />
    </>
  );
};

export default LoginScreen;
