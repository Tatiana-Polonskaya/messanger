import { useEffect, useState } from "react";
import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { ChatList } from "../../component/chat-list/chat-list";
import { RegisterModal } from "../../component/register-modal/register-model";
import { ErrorList } from "../../component/error-list/error-list";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { io } from "socket.io-client";
import { Chat } from "../../component/chat/chat";
import { AccountInfo } from "../../component/account-info/account-info";
import { setUser } from "../../store/slices/user";

const siderStyle: React.CSSProperties = {
  //   textAlign: "center",
  //   lineHeight: "120px",
  //   color: "#fff",
  //   paddingTop: 64,
  backgroundColor: "#f5f5f5",
  borderRight: "1px solid rgb(211, 209, 209)",
};

const layoutStyle = {
  overflow: "hidden",
  width: "100vw",
  height: "100vh",
};

const socket = io.connect("http://localhost:4000");

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const [currentChat, setCurrentChat] = useState<string>("");

  const login = useAppSelector((state) => state.user.login);

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  useEffect(() => {
    if (login === "") {
      const localLogin = localStorage.getItem("login");
      if (localLogin) {
        dispatch(setUser({ login: localLogin, password: "" }));
      } else setIsRegisterModalOpen(true);
    }
  }, [login]);

  const handleChatChange = (id: string) => {
    if (id === currentChat) setCurrentChat("");
    else setCurrentChat(id);
  };

  return (
    <Layout style={layoutStyle}>
      <ErrorList />
      <RegisterModal
        isModalOpen={isRegisterModalOpen}
        setIsModalOpen={setIsRegisterModalOpen}
      />
      <Sider width="25%" style={siderStyle}>
        <AccountInfo />
        <ChatList
          currentChat={currentChat}
          handleChatChange={handleChatChange}
        />
      </Sider>
      <Chat socket={socket} currentChat={currentChat} />
    </Layout>
  );
};
