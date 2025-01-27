import { IMessages } from "../../types/message";
import { Message } from "../message/message";
import { cn } from "@bem-react/classname";

const CN = cn("chat");

type Props = {
  messages: IMessages;
};

export const Chat = (props: Props) => {
  return (
    <div className={CN()}>
      {props.messages &&
        props.messages.map((message) => <Message message={message} />)}
    </div>
  );
};
