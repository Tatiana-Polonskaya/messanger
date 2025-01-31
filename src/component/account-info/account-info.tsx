import { IdcardOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../store/hooks";
import { Flex, Typography } from "antd";

export const AccountInfo = () => {
  const login = useAppSelector((state) => state.user.login);

  return (
    <>
      <Flex
        align="center"
        justify="start"
        gap={10}
        style={{
          padding: 10,
          height: 64,
          background: "rgb(129, 166, 209)",
          color: "white",
        }}
      >
        <IdcardOutlined style={{ fontSize: "22px" }} />
        <Typography.Title level={4} style={{ margin: 0, color: "white" }}>
          {login}
        </Typography.Title>
      </Flex>
    </>
  );
};
