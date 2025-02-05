import { List, Typography } from "antd";
import { IMessage, IMessages } from "../../types/message";
import { Message } from "../message/message";
import { useEffect, useRef } from "react";
import { useAppSelector } from "../../store/hooks";

type Props = {
  messages: IMessages;
};

export const MessageList = (props: Props) => {
  const login = useAppSelector((state) => state.user.login);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container !== null && container.current !== null)
      container.current.scrollTop = container.current.scrollHeight;
  }, [props.messages]);

  return (
    <List
      ref={container}
      itemLayout="vertical"
      split={false}
      size="small"
      style={{
        height: "100%",
        overflow: "auto",
        alignContent: "end",
        padding: "0 10px",
      }}
      dataSource={props.messages}
      renderItem={(item: IMessage) => <Message login={login} message={item} />}
      locale={{
        emptyText: (
          <Typography.Text
            style={{
              background: "rgba(0, 0, 0, 0.15)",
              color: "white",
              padding: 10,
              borderRadius: 5,
            }}
          >
            There's nothing here yet
          </Typography.Text>
        ),
      }}
      //   style={{""}}
      //   onScroll={onScroll}
      //   header={<div>Header</div>}
    />
  );
};
