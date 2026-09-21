import "./Login.scss";
import { Flex } from "antd";
import { Outlet } from "react-router-dom";

import Logo from "../../assets/logo 1.png";

const Login = () => {
  return (
    <Flex className="wrapper">
      <Flex className="login-page">
        <Flex vertical className="login-page-logo-section">
          <img src={Logo} alt="Logo" />
        </Flex>
        <Flex className="login-page-form-section" vertical>
          <Outlet />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Login;
