import { Button, Input, Modal, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { useLoginMutation } from "../../store/services/user";

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (status: boolean) => void;
};

export const RegisterModal = ({ isModalOpen, setIsModalOpen }: Props) => {
  const user = useAppSelector((state) => state.user);
  const [sendUserRequest, sendUserResponse] = useLoginMutation();

  const [login, setLogin] = useState("login");
  const [password, setPassword] = useState("login");

  const handleOk = async () => {
    if (login !== "" && password !== "") {
      console.log(login, password);

      await sendUserRequest({
        login: login,
        password: password,
      });

      localStorage.setItem("login", login);
    }
  };

  useEffect(() => {
    if (sendUserResponse.isSuccess) {
      setIsModalOpen(false);
    }
  }, [sendUserResponse]);

  return (
    <>
      <Modal
        title={
          <Typography.Title style={{ textAlign: "center" }} level={4}>
            Write your name!
          </Typography.Title>
        }
        open={isModalOpen}
        closable={false}
        footer={null}
        centered
        width={"350px"}
      >
        <Space direction="vertical" style={{ width: "100%", gap: 10 }}>
          {user.login !== "" && <>Hello {user.login}!</>}
          <Typography.Text style={{ textAlign: "left" }}>
            Your login:
          </Typography.Text>
          <Input
            placeholder="unique login"
            value={login}
            onChange={(e) => setLogin(e.currentTarget.value.trim())}
          />
          <Typography.Text>Your password:</Typography.Text>
          <Input
            placeholder="Basic usage"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value.trim())}
          />
          <Button
            type="primary"
            onClick={handleOk}
            style={{ width: "100%", marginTop: 10 }}
          >
            Sign in / Sign up
          </Button>
        </Space>
      </Modal>
    </>
  );
};
