import { useState } from "react";
import { cn } from "@bem-react/classname";
const CN = cn("input-component");

type Props = {
  onTextSend: (text: string) => void;
};

export const Input = (props: Props) => {
  const [value, setValue] = useState("");

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.currentTarget.value.trim());
  };

  const handleButtonClick = () => {
    if (value !== "") {
      props.onTextSend(value);
      setValue("");
    }
  };

  const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Enter") {
      handleButtonClick();
    }
  };

  return (
    <div className={CN()}>
      <input
        onChange={handleInputChange}
        value={value}
        className={CN("input")}
        onKeyDown={handleKeyPress}
      />
      <button onClick={handleButtonClick} className={CN("button")}>
        send
      </button>
    </div>
  );
};
