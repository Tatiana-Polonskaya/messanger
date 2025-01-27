import { cn } from "@bem-react/classname";

const CN = cn("header-component");

export const Header = () => {
  <header className={CN()}>
    <h1 className={CN("h1")}>Messanger</h1>
  </header>;
};
