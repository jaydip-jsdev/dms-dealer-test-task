import { Flex, Typography } from "antd";

const { Text } = Typography;

export type StatBoxProps = {
  label: string;
  value?: string | number;
};

const StatBox = ({ label, value }: StatBoxProps) => (
  <Flex className="stat-box">
    <Text className="label">{label}</Text>
    {value ? <Text className="value">{value}</Text> : null}
  </Flex>
);

export default StatBox;
