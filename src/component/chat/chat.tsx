import { List } from "antd";
import { IMessage, IMessages } from "../../types/message";
import { Message } from "../message/message";
import { useEffect, useRef } from "react";

type Props = {
  messages: IMessages;
};

export const Chat = (props: Props) => {
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
      style={{ height: "100%", overflow: "auto", alignContent: "end", padding:"0 10px" }}
      dataSource={props.messages}
      renderItem={(item: IMessage) => <Message message={item} />}
      //   style={{""}}
      //   onScroll={onScroll}
      //   header={<div>Header</div>}
    />
  );
};
