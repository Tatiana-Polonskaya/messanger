import { Layout, Typography } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { MessageList } from "../message-list/message-list";
import { ChatInput } from "../chat-input/chat-input";
import { v4 } from "uuid";
import { useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";
import { IMessage, IMessages } from "../../types/message";
import { useLazyGetAllMessageQuery } from "../../store/services/message";
import { DeleteOutlined, UserDeleteOutlined, UserOutlined } from "@ant-design/icons";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  socket: any;
  currentChat: { id: string; label: string };
};

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  display: "flex",
  flexFlow: "row nowrap",
  justifyContent: "space-around",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "rgb(129, 166, 209)",
  //   borderLeft: "1px solid white",
};

const contentStyle: React.CSSProperties = {
  overflow: "hidden",
  height: "100%",
  //   textAlign: "center",
  //   minHeight: 120,
  //   lineHeight: "120px",
  //   color: "#fff",
  //   backgroundColor: "#0958d9",
};

const emptyContentStyle: React.CSSProperties = {
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  //   textAlign: "center",
  //   minHeight: 120,
  //   lineHeight: "120px",
  //   color: "#fff",
  //   backgroundColor: "#0958d9",
};

const footerStyle: React.CSSProperties = {
  padding: 10,
  background: "none",
  //   textAlign: "center",
};

export const Chat = ({ socket, currentChat }: Props) => {
  const [messages, setMessage] = useState<IMessages>([]);

  const login = useAppSelector((state) => state.user.login);
  const [getMessages, newMessages] = useLazyGetAllMessageQuery();

  useEffect(() => {
    if (currentChat.id !== "") {
      getMessages(currentChat.id);
      socket.emit("join_room", { chat_id: currentChat });
    } else if (currentChat.id === "" && messages.length !== 0) {
      setMessage([]);
    }
  }, [currentChat.id]);

  useEffect(() => {
    if (newMessages.data && newMessages.data.data) {
      setMessage(newMessages.data.data);
    }
  }, [newMessages]);

  useEffect(() => {
    socket.on("receive_message", (data: IMessage) => {
      if (data.chat_id === currentChat.id)
        setMessage((prev) => [...prev, data]);
    });

    return () => socket.off("receive_message");
  }, [socket, currentChat.id]);

  const handleMessageSend = (text: string) => {
    const newMessage = {
      id: v4(),
      text,
      sender: login,
      time: Date.now(),
      chat_id: currentChat.id,
    };

    setMessage((prev) => [...prev, newMessage]);
    socket.emit("send_message", {
      id: newMessage.id,
      chat_id: currentChat.id,
      sender: login,
      text: text,
      time: newMessage.time,
    });
  };

  return (
    <Layout
      style={{
        backgroundImage: 'url("src/assets/background.jpg")',
        backgroundSize: "contain",
      }}
    >
      {currentChat.id ? (
        <>
          <Header style={headerStyle}>
            <UserOutlined />
            <Typography.Text>{currentChat.label}</Typography.Text>
            <DeleteOutlined />
            <UserDeleteOutlined />
          </Header>
          <Content style={contentStyle}>
            <MessageList messages={messages} />
          </Content>
          <Footer style={footerStyle}>
            <ChatInput onTextSend={handleMessageSend} />
          </Footer>
        </>
      ) : (
        <Content style={emptyContentStyle}>
          <Typography
            style={{
              background: "rgba(0, 0, 0, 0.15)",
              color: "white",
              padding: 10,
              borderRadius: 5,
            }}
          >
            Select a chat from your list or create one.
          </Typography>
        </Content>
      )}
    </Layout>
  );
};
