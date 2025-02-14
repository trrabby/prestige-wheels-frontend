import { useCartItems } from "@/redux/features/admin/productManagement/productsManagementSlice";
import { useAppSelector } from "@/redux/hook";
import { Avatar, Badge, Space } from "antd";
import { ImCart } from "react-icons/im";

const CartBadge = () => {
  const cartArray = useAppSelector(useCartItems);

  const count = cartArray.length;

  return (
    <>
      <Space>
        <Badge count={count}>
          <Avatar
            className="bg-transparent text-accent hover:text-primary"
            shape="circle"
            size="large"
          >
            <ImCart className="w-8 h-8 hover:cursor-pointer " />
          </Avatar>
        </Badge>
      </Space>
    </>
  );
};

export default CartBadge;
