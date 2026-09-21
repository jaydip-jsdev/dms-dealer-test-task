import { Button, Flex, Typography } from "antd";

const { Title, Text } = Typography;

const GoToEmail = () => {
  return (
    <Flex vertical gap={48}>
      <Flex align="center" vertical>
        <Title level={3}>CHECK YOUR EMAIL</Title>
        <Text>We&apos;ve sent a verification link to your Gmail address.</Text>
      </Flex>
      <Button type="primary" href="https://mail.google.com">
        Go to Gmail
      </Button>
    </Flex>
  );
};

export default GoToEmail;
