import { Button, Flex, Input, Modal, Space, Typography } from "antd";
import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { addError } from "../../store/slices/error";

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (status: boolean) => void;
  onSaveClick: (login: string) => void;
};

export const AddChatModal = ({
  isModalOpen,
  setIsModalOpen,
  onSaveClick,
}: Props) => {
  const dispatch = useAppDispatch();
  const [friendLogin, setFriendLogin] = useState("");

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveFriendLogin = () => {
    if (friendLogin !== "") {
      onSaveClick(friendLogin);
      handleCloseModal();
    } else {
      dispatch(
        addError({
          text: "Не указан логин.",
        })
      );
    }
  };

  return (
    <Modal
      title={
        <Typography.Title style={{ textAlign: "center" }} level={4}>
          Сreating a new chat!
        </Typography.Title>
      }
      open={isModalOpen}
      closable={false}
      centered
      width={"350px"}
      mask
      footer={
        <Flex gap={10}>
          <Button onClick={handleCloseModal} style={{ flexGrow: 1 }}>
            Cancel
          </Button>
          <Button
            onClick={handleSaveFriendLogin}
            type="primary"
            style={{ flexGrow: 1 }}
          >
            Create
          </Button>
        </Flex>
      }
    >
      <Space direction="vertical" style={{ width: "100%", gap: 10 }}>
        <Typography.Text>Friend's login:</Typography.Text>
        <Input
          placeholder="Type a login"
          value={friendLogin}
          onChange={(e) => setFriendLogin(e.currentTarget.value.trim())}
        />
      </Space>
    </Modal>
  );
};
