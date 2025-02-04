import { Button, Empty, Typography } from "antd";
import { Link } from "react-router-dom";

const CustomEmpty = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  return (
    <Empty
      className="flex flex-col justify-center items-center h-full"
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      styles={{ image: { height: 60 } }}
      description={<Typography.Text>Your cart is empty</Typography.Text>}
    >
      <Link onClick={() => setOpen(false)} to={"/products"}>
        <Button type="primary">Let's Shop</Button>
      </Link>
    </Empty>
  );
};

export default CustomEmpty;
