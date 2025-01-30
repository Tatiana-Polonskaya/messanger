import { Input, Modal, Space, Typography } from "antd";
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

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleOk = async () => {
    if (login !== "" && password !== "") {
        console.log(login, password);
        
      await sendUserRequest({
        login: login,
        password: password,
      });
    }
  };

  useEffect(() => {
    if (sendUserResponse.isSuccess) {
      setIsModalOpen(false);
    }
  }, [sendUserResponse]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Write your name!"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
        centered
      >
        <Space.Compact direction="vertical">
          {user.login !== "" && <>Hello {user.login}!</>}
          <Typography.Text>Your login:</Typography.Text>
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
        </Space.Compact>
      </Modal>
    </>
  );
};
