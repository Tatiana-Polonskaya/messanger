import { Card, Flex, List, Space, Typography } from "antd";
import { IMessage } from "../../types/message";

type Props = {
  login: string;
  message: IMessage;
};

const covertTimestampToDatetime = (timestamp: number) => {
  const date = new Date(timestamp);

  const month = "0" + (date.getMonth() + 1);
  const day = "0" + date.getDate();
  const hours = date.getHours();

  const minutes = "0" + date.getMinutes();

  const formattedTime =
    hours +
    ":" +
    minutes.substr(-2) +
    " " +
    day.substr(-2) +
    "." +
    month.substr(-2);

  return formattedTime;
};

export const Message = ({ message, login }: Props) => {
  return (
    <List.Item
      style={{
        display: "flex",
        justifyContent: message.sender === login ? "end" : "start",
      }}
    >
      <Card size="small" style={{ maxWidth: 300, minWidth: 50 }}>
        <Flex>
          <Typography>{message.text}</Typography>
          <Typography>
            {covertTimestampToDatetime(message.time)}
          </Typography>
        </Flex>
      </Card>
    </List.Item>
  );
};
