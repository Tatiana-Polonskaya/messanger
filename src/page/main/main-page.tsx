import { useEffect, useState } from "react";
import { Chat } from "../../component/chat/chat";
import { ChatInput } from "../../component/chat-input/chat-input";
import { IMessage, IMessages } from "../../types/message";
import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { ChatList } from "../../component/chat-list/chat-list";
// import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { RegisterModal } from "../../component/register-modal/register-model";
import { ErrorList } from "../../component/error-list/error-list";
import { useAppSelector } from "../../store/hooks";
import { useLazyGetAllMessageQuery } from "../../store/services/message";
import { io } from "socket.io-client";
import { v4 } from "uuid";

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#4096ff",
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

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  paddingTop: 64,
  //   backgroundColor: "#1677ff",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
};

const layoutStyle = {
  overflow: "hidden",
  width: "100vw",
  height: "100vh",
};

const socket = io.connect("http://localhost:4000");

export const MainPage = () => {
  const [currentChat, setCurrentChat] = useState<string>("");
  const [messages, setMessage] = useState<IMessages>([]);

  const login = useAppSelector((state) => state.user.login);

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [getMessages, newMessages] = useLazyGetAllMessageQuery();

  useEffect(() => {
    if (login === "") setIsRegisterModalOpen(true);
  }, [login]);

  useEffect(() => {
    if (currentChat !== "") {
      socket.emit("join_room", { chat_id: currentChat });
      getMessages(currentChat);
    }
  }, [currentChat]);

  useEffect(() => {
    if (newMessages.data && newMessages.data.data) {
      setMessage(newMessages.data.data);
    }
  }, [newMessages]);

  useEffect(() => {
    socket.on("receive_message", (data: IMessage) => {
      console.log("receive_message", data);
      setMessage((prev) => [...prev, data]);
    });

    return () => socket.off("receive_message");
  }, [socket]);

  //   useEffect(() => {
  //     socket.emit("join_room", { name: "login", room: "room" });
  //     socket.on("chatroom_users", (data) => {
  //       console.log("chatroom_users:", data);
  //     });
  //     socket.on("receive_messsage", (data) => {
  //       console.log("receive_messsage:", data);
  //     });
  //   }, [socket]);

  const handleMessageSend = (text: string) => {
    socket.emit("send_message", {
      id_chat: currentChat,
      user_sender: login,
      message: text,
    });
  };

  return (
    <Layout style={layoutStyle}>
      <ErrorList />
      <RegisterModal
        isModalOpen={isRegisterModalOpen}
        setIsModalOpen={setIsRegisterModalOpen}
      />
      <Sider width="25%" style={siderStyle}>
        <ChatList currentChat={currentChat} handleChatChange={setCurrentChat} />
      </Sider>
      <Layout>
        <Header style={headerStyle}>Header</Header>
        <Content style={contentStyle}>
          <Chat messages={messages} />
        </Content>
        <Footer style={footerStyle}>
          <ChatInput onTextSend={handleMessageSend} />
        </Footer>
      </Layout>
    </Layout>
  );
};
