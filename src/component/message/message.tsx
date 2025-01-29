import { Card, List } from "antd";
import { IMessage } from "../../types/message";

type Props = {
  message: IMessage;
};

export const Message = ({ message }: Props) => {
  return (
    <List.Item
      style={{
        display: "flex",
        justifyContent: message.senderId === 0 ? "end" : "start",
      }}
    >
      <Card size="small" style={{ maxWidth: 300, minWidth: 50 }}>
        <p>{message.text}</p>
        <p>{message.date}</p>
      </Card>
    </List.Item>
  );
};
