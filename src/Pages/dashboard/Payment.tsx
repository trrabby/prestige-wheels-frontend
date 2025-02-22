/* eslint-disable @typescript-eslint/no-explicit-any */
import { GradientCircularProgress } from "@/components/Progress";
import { SectionHead } from "@/components/SectionHead";
import { useGetAllOrdersQuery } from "@/redux/features/admin/orderManagement/ordersManagementApi";
import reducer, {
  TUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import { ICars } from "@/types/cars.type";
import { verifyToken } from "@/utils/verifyToken";
import { Divider, Tooltip } from "antd";
import { FaCartFlatbed, FaUserSecret } from "react-icons/fa6";
import { HiDocumentCurrencyBangladeshi } from "react-icons/hi2";
import { MdOutlineMailOutline } from "react-icons/md";
import { Link, useParams } from "react-router-dom";

export default function Payment() {
  const { id } = useParams();
  const token = useAppSelector(useCurrentToken);
  let user: TUser | undefined;
  if (token) {
    user = verifyToken(token) as TUser;
  }

  const { data: orderData, isLoading } = useGetAllOrdersQuery([
    {
      name: "_id",
      value: id,
    },
  ]);
  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <GradientCircularProgress />
      </div>
    );
  const {
    customerInfo,
    email,
    orderInfo,
    orderStatus,
    paymentStatus,
    totalPrice,
  } = orderData?.data[0];

  console.log(orderInfo);
  const handleWheel = (e: any) => {
    e.currentTarget.scrollLeft += e.deltaY; // Scroll horizontally
  };

  return (
    <div>
      <SectionHead
        title="Complete Your Payment"
        para="You order will be confirmed automaticly after payment."
      />

      <div className="flex justify-around items-start">
        <div className="space-y-2 w-6/12 border-r-2 pr-2 border-red-500">
          <Divider className="text-accent">Customer Information</Divider>
          {user && (
            <div className="space-y-2">
              <div className="flex items-center justify-center">
                <img
                  className="w-32 h-32 rounded-full"
                  src={user.imgUrl}
                  alt="Customer's photo"
                />
              </div>
              <p className="text-lg flex gap-2 items-center justify-start">
                <FaUserSecret />
                {customerInfo.name}
              </p>
              <p className="text-lg flex gap-2 items-center justify-start">
                <MdOutlineMailOutline />
                {email}
              </p>
              <p className="text-lg flex gap-2 items-center justify-start">
                <span className="text-primary text-bold flex gap-2 items-center justify-center">
                  <HiDocumentCurrencyBangladeshi />
                  {totalPrice} BDT
                </span>
              </p>
              <p className="text-lg flex gap-2 items-center justify-start">
                <FaCartFlatbed />
                Total Quantity:{" "}
                {orderInfo.reduce(
                  (acc: number, currentValue: number) =>
                    acc + Number(currentValue.orderedQuantity),
                  0
                )}
              </p>
            </div>
          )}
          <Divider>Paying for</Divider>
          <div className="relative w-full overflow-hidden">
            <div
              className="flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 px-2"
              style={{
                scrollBehavior: "smooth",
                WebkitOverflowScrolling: "touch",
              }}
              onWheel={handleWheel} // 👈 Directly handle scrolling
            >
              {orderInfo.map((order: any, index: number) => (
                <div
                  key={order.productId._id}
                  className="flex items-center flex-shrink-0"
                >
                  <Tooltip
                    title={`${order.productId.brand} ${order.productId.model}`}
                  >
                    <div className="flex gap-1 justify-center items-center">
                      <p> {order.orderedQuantity} x </p>
                      <Link to={`/products/cars/${order.productId._id}`}>
                        <img
                          className="w-20 h-20 rounded-md hover:shadow-sm  cursor-pointer"
                          src={
                            order.productId.imgUrl?.[0] || "/fallback-image.jpg"
                          }
                          alt="Product img"
                        />
                      </Link>
                      {index !== orderInfo.length - 1 && (
                        <Divider
                          className="bg-primary w-[1px] h-14"
                          type="vertical"
                        />
                      )}
                    </div>
                  </Tooltip>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <Divider type="horizontal">Payment Information</Divider>
        </div>
      </div>
    </div>
  );
}
