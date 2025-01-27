import { IMessage } from "../../types/message";
import { cn } from "@bem-react/classname";

const CN = cn("message-component")

type Props = {
  message: IMessage;
};

export const Message = ({ message }: Props) => {
  return <div className={CN()}>{message.text}</div>;
};
