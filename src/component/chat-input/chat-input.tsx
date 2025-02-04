import { useState } from "react";
import { Button, Input, Space } from "antd";
import { SendOutlined } from "@ant-design/icons";

type Props = {
  onTextSend: (text: string) => void;
};

export const ChatInput = (props: Props) => {
  const [value, setValue] = useState("");

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setValue(e.target.value);
  };

  const handleButtonClick = () => {
    if (value !== "") {
      props.onTextSend(value.trim());
      setValue("");
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Enter") {
      handleButtonClick();
    }
  };

  return (
    <Space.Compact style={{ width: "100%" }}>
      {/* <TextArea
        rows={1}
        placeholder="Type your text"
        // maxLength={120}
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        autoSize={{minRows:1, maxRows:10}}
      /> */}
      <Input
        placeholder="Type your text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <Button type="primary" onClick={handleButtonClick}>
        <SendOutlined />
      </Button>
    </Space.Compact>
  );
};
