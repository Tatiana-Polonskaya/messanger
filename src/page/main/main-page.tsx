import { useState } from "react";
import { Chat } from "../../component/chat/chat";
import { Input } from "../../component/input/input";
import {  IMessages } from "../../types/message";
import { cn } from "@bem-react/classname";

const CN = cn("main-page-component");

export const MainPage = () => {
  const [messages, setMessage] = useState<IMessages>([]);

  const handleMessageSend = (text: string) => {
    setMessage((prev) => [
      ...prev,
      {
        date: Date.now(),
        id: messages.length + "",
        recipientId: 1,
        senderId: 0,
        text: text,
      },
    ]);
  };

  return (
    <div className={CN()}>
      <Chat messages={messages} />
      <Input onTextSend={handleMessageSend} />
    </div>
  );
};
