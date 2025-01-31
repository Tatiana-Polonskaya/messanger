import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Divider, Menu, MenuProps } from "antd";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import {
  useCreateChatMutation,
  useLazyGetAllChatsQuery,
} from "../../store/services/chat";
import { IChat } from "../../model/chat";
import { AddChatModal } from "../add-chat-modal/add-chat-model";

type MenuItem = Required<MenuProps>["items"][number];

const convertChatListToMenuItem = (
  selfLogin: string,
  list: IChat[] | IChat
): MenuItem[] => {
  if (Array.isArray(list)) {
    const newMenuItems = list.map(
      (chat) =>
        ({
          key: chat.id,
          icon: <UserOutlined />,
          label: chat.user_logins.filter((el) => el !== selfLogin).join(" & "),
        } as MenuItem)
    );
    return newMenuItems;
  } else {
    return [
      {
        key: list.id,
        icon: <UserOutlined />,
        label: list.user_logins.filter((el) => el !== selfLogin).join(" & "),
      } as MenuItem,
    ];
  }
};

type Props = {
  currentChat: string;
  handleChatChange: (id: string) => void;
};

export const ChatList = ({ currentChat, handleChatChange }: Props) => {
  const login = useAppSelector((state) => state.user.login);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [createChatRequest, createChatResponse] = useCreateChatMutation();

  const [getChatList, chatList] = useLazyGetAllChatsQuery();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [activeItem, setActimeItem] = useState<string[]>([]);

  useEffect(() => {
    if (login !== "") {
      getChatList(login);
    }
  }, [login]);

  useEffect(() => {
    if (chatList.data !== undefined && chatList.data.data !== undefined)
      setMenuItems(convertChatListToMenuItem(login, chatList.data.data));
  }, [chatList]);

  const onClick: MenuProps["onClick"] = (e) => {
    if (activeItem.includes(e.key)) {
      setActimeItem([]);
    } else {
      setActimeItem([e.key]);
    }
    handleChatChange(e.key);
  };

  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handleAddLogin = (friendLogin: string) => {
    createChatRequest([login, friendLogin]);
  };

  useEffect(() => {
    if (createChatResponse.isSuccess) {
      console.log(createChatResponse.data.data);

      setMenuItems((prev) => [
        ...prev,
        ...convertChatListToMenuItem(login, createChatResponse.data.data),
      ]);
    }
  }, [createChatResponse]);

  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={activeItem}
        //   style={{ width: 256 }}
        //   defaultSelectedKeys={["1"]}
        //   defaultOpenKeys={["sub1"]}
        style={{ textAlign: "start" }}
        mode="vertical"
        items={menuItems}
        
      />
      <Divider style={{margin:10}}/>
      <Button icon={<PlusOutlined />} onClick={handleAddClick} type="text" block>
        Create a chat
      </Button>
      <AddChatModal
        isModalOpen={isAddModalOpen}
        setIsModalOpen={setIsAddModalOpen}
        onSaveClick={handleAddLogin}
      />
    </>
  );
};
