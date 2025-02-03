import { Avatar, Badge, Space } from "antd";
import { ImCart } from "react-icons/im";

const CartBadge = () => {
  const count = 1;

  return (
    <Space>
      <Badge count={count}>
        <Avatar
          className="bg-transparent text-accent"
          shape="circle"
          size="large"
        >
          <ImCart className="w-8 h-8 hover:cursor-pointer " />
        </Avatar>
      </Badge>
    </Space>
  );
};

export default CartBadge;
