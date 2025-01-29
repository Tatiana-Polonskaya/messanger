import { useEffect, useState } from "react";
import { Chat } from "../../component/chat/chat";
import { ChatInput } from "../../component/chat-input/chat-input";
import { IMessages } from "../../types/message";
import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { ChatList } from "../../component/chat-list/chat-list";
// import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { RegisterModal } from "../../component/register-modal/register-model";
import { ErrorList } from "../../component/error-list/error-list";
import { useAppSelector } from "../../store/hooks";
import { useLazyGetMessageQuery } from "../../store/services/message";
import { io } from "socket.io-client";

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

// import io from "socket.io-client";

let socket = new WebSocket("ws://localhost:8080/ws");
// const socket = io("ws://127.0.0.1:8080/ws");

// socket.on("disconnect", (reason) => {
//   console.log("disconnect");

//   if (reason === "io server disconnect") {
//     // the disconnection was initiated by the server, you need to manually reconnect
//     console.log(socket.active); // false
//   }
//   // else the socket will automatically try to reconnect
//   console.log(socket.active); // true
// });

// socket.on("connect", () => {
//   console.log("[open] Соединение установлено");
//   console.log("Отправляем данные на сервер");
//   socket.send("Меня зовут Джон");
// });

// socket.on("message", (mess) => {
//   console.log("get: ", mess);
// });

socket.onopen = function (e) {
  console.log("[open] Соединение установлено");
  console.log("Отправляем данные на сервер");
  socket.send("Меня зовут Джон");
};

socket.onmessage = function (event) {
  console.log(`[message] Данные получены с сервера: ${event.data}`);
};

socket.onclose = function (event) {
  if (event.wasClean) {
    console.log(
      `[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`
    );
  } else {
    // например, сервер убил процесс или сеть недоступна
    // обычно в этом случае event.code 1006
    console.log("[close] Соединение прервано");
  }
};

socket.onerror = function (error) {
  console.log(`[error]`);
};


export const MainPage = () => {
  const [messages, setMessage] = useState<IMessages>([]);

  const login = useAppSelector((state) => state.user.login);

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  //   const [getMessages, newMessages] = useLazyGetMessageQuery();

  //   useEffect(() => {
  //     console.log(newMessages);
  //   }, [newMessages]);

  useEffect(() => {
    if (login === "") setIsRegisterModalOpen(true);
    // else startGetMessges();
  }, [login]);

  //   const startGetMessges = async () => {
  //     await getMessages();
  //   };

  const handleMessageSend = (text: string) => {
    setMessage((prev) => [
      ...prev,
      {
        date: Date.now(),
        id: messages.length + "",
        recipientId: messages.length % 2,
        senderId: messages.length % 2 === 0 ? 1 : 0,
        text: text,
      },
    ]);
  };

  return (
    <Layout style={layoutStyle}>
      <ErrorList />
      <RegisterModal
        isModalOpen={isRegisterModalOpen}
        setIsModalOpen={setIsRegisterModalOpen}
      />
      <Sider width="25%" style={siderStyle}>
        <ChatList />
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
