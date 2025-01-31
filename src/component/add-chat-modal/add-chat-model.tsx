import { Input, Modal, Space, Typography } from "antd";
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
      title="Сreating a new chat."
      open={isModalOpen}
      onOk={handleSaveFriendLogin}
      onCancel={handleCloseModal}
      closable={false}
      centered
    >
      <Space.Compact direction="vertical">
        <Typography.Text>Friend's login:</Typography.Text>
        <Input
          placeholder="unique login"
          value={friendLogin}
          onChange={(e) => setFriendLogin(e.currentTarget.value.trim())}
        />
      </Space.Compact>
    </Modal>
  );
};
