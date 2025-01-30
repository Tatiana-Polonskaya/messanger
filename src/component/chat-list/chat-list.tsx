import { PlusOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useLazyGetAllChatsQuery } from "../../store/services/chat";
import { IChat } from "../../model/chat";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "sub1",
    label: "Navigation One",
    // extra: <Tag color="red">1</Tag>,
    // children: [
    //   {
    //     key: "g1",
    //     label: "Item 1",
    //     type: "group",
    //     children: [
    //       { key: "1", label: "Option 1" },
    //       { key: "2", label: "Option 2" },
    //     ],
    //   },
    //   {
    //     key: "g2",
    //     label: "Item 2",
    //     type: "group",
    //     children: [
    //       { key: "3", label: "Option 3" },
    //       { key: "4", label: "Option 4" },
    //     ],
    //   },
    // ],
  },
  {
    key: "sub2",
    label: "Navigation Two",
    // children: [
    //   { key: "5", label: "Option 5" },
    //   { key: "6", label: "Option 6" },
    //   {
    //     key: "sub3",
    //     label: "Submenu",
    //     children: [
    //       { key: "7", label: "Option 7" },
    //       { key: "8", label: "Option 8" },
    //     ],
    //   },
    // ],
  },
  {
    type: "divider",
  },
  {
    key: "add",
    label: "Add",
    icon: <PlusOutlined />,
    // type: "group",
    // children: [
    //   { key: "13", label: "Option 13" },
    //   { key: "14", label: "Option 14" },
    // ],
  },
];

const defaultMenuItems: MenuItem[] = [
  {
    type: "divider",
  },
  {
    key: "add",
    label: "Add",
    icon: <PlusOutlined />,
    // type: "group",
    // children: [
    //   { key: "13", label: "Option 13" },
    //   { key: "14", label: "Option 14" },
    // ],
  },
];

const convertChatListToMenuItem = (list: IChat[]): MenuItem[] => {
  const newMenuItems = list.map(
    (chat) =>
      ({
        key: chat.id,
        label: chat.user_logins.join(" & "),
      } as MenuItem)
  );
  newMenuItems.push(...defaultMenuItems);
  return newMenuItems;
};

type Props = {
  currentChat: string;
  handleChatChange: (id: string) => void;
};

export const ChatList = ({ currentChat, handleChatChange }: Props) => {
  const login = useAppSelector((state) => state.user.login);
  //   const dispatch = useAppDispatch();
  const [getChatList, chatList] = useLazyGetAllChatsQuery();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    if (login !== "") {
      getChatList(login);
    }
  }, [login]);

  useEffect(() => {
    if (chatList.data !== undefined && chatList.data.data !== undefined)
      setMenuItems(convertChatListToMenuItem(chatList.data.data));
  }, [chatList]);

  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key === "add") {
      //   getChatList(login);
    } else {
      handleChatChange(e.key);
    }
  };

  useEffect(() => {
    console.log(currentChat);
  }, [currentChat]);

  return (
    <Menu
      onClick={onClick}
      //   style={{ width: 256 }}
      //   defaultSelectedKeys={["1"]}
      //   defaultOpenKeys={["sub1"]}
      mode="vertical"
      items={menuItems}
    />
  );
};
