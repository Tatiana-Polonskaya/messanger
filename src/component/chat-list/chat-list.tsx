import { PlusOutlined } from "@ant-design/icons";
import { Menu, MenuProps, Tag } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "sub1",
    label: "Navigation One",
    // extra: <Tag color="red">1</Tag>,
    // children: [
    //   {
    //     key: "g1",
    //     label: "Item 1",
    //     type: "group",
    //     children: [
    //       { key: "1", label: "Option 1" },
    //       { key: "2", label: "Option 2" },
    //     ],
    //   },
    //   {
    //     key: "g2",
    //     label: "Item 2",
    //     type: "group",
    //     children: [
    //       { key: "3", label: "Option 3" },
    //       { key: "4", label: "Option 4" },
    //     ],
    //   },
    // ],
  },
  {
    key: "sub2",
    label: "Navigation Two",
    // children: [
    //   { key: "5", label: "Option 5" },
    //   { key: "6", label: "Option 6" },
    //   {
    //     key: "sub3",
    //     label: "Submenu",
    //     children: [
    //       { key: "7", label: "Option 7" },
    //       { key: "8", label: "Option 8" },
    //     ],
    //   },
    // ],
  },
  {
    type: "divider",
  },
  {
    key: "add",
    label: "Add",
    icon: <PlusOutlined />,
    // type: "group",
    // children: [
    //   { key: "13", label: "Option 13" },
    //   { key: "14", label: "Option 14" },
    // ],
  },
];

export const ChatList = () => {
  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key === "add") {
        console.log();
        
    }else{
        console.log();
        
    }
  };

  return (
    <Menu
      onClick={onClick}
      //   style={{ width: 256 }}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="vertical"
      items={items}
    />
  );
};
