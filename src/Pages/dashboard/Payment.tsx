/* eslint-disable @typescript-eslint/no-explicit-any */
import { GradientCircularProgress } from "@/components/Progress";
import { SectionHead } from "@/components/SectionHead";
import { useGetAllOrdersQuery } from "@/redux/features/admin/orderManagement/ordersManagementApi";
import { TUser, useCurrentToken } from "@/redux/features/auth/authSlice";
import { useCreatePaymentMutation } from "@/redux/features/payment/paymentManagementApi";
import { useAppSelector } from "@/redux/hook";
import { verifyToken } from "@/utils/verifyToken";
import { Divider, Tag, Tooltip } from "antd";
import { FaCartFlatbed, FaUserSecret } from "react-icons/fa6";
import { HiDocumentCurrencyBangladeshi } from "react-icons/hi2";
import { MdOutlineMailOutline } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import sslLogo from "../../assets/logo.png";

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
  const [createPayment, { isLoading: paymentLoading }] =
    useCreatePaymentMutation();

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
  } = orderData?.data[0] as any;

  // console.log(customerInfo);

  const handlePayment = async () => {
    toast.loading("Navigating to payment getway", { id: "paymentToastId" });
    try {
      const paymentUrl = await createPayment({
        orderData: orderData?.data[0],
        total_amount: totalPrice,
        currency: "BDT",
        shipping_method: "Courier",
        product_name: orderInfo
          .map(
            (order: any) =>
              `${order.productId.brand}-${order.productId.model}-${order.productId.year}`
          )
          .join(", "),
        product_category: "Car's Category",
        product_profile: "Car's Distinct",
        cus_name: customerInfo.name,
        cus_email: customerInfo.name,
        cus_add1: customerInfo.city,
        cus_add2: customerInfo.clolony,
        cus_city: customerInfo.city,
        cus_postcode: customerInfo.postOffice,
        cus_country: "Bangladesh",
        cus_phone: customerInfo.number,
        ship_name: "John Doe",
        ship_add1: "Dhaka",
        ship_city: "Dhaka",
        ship_postcode: "1000",
        ship_country: "Bangladesh",
      });

      if (paymentUrl.data.data.paymentUrl) {
        window.location.href = await paymentUrl.data.data.paymentUrl; // Redirect the user
        toast.loading("Navigating please wait...", { id: "paymentToastId" });
      } else {
        toast.error("Payment URL not received", { id: "paymentToastId" });
      }
    } catch (error) {
      toast.error(`Error during payment process: ${error}`, {
        id: "paymentToastId",
      });
    }
  };

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
                  (acc: number, currentValue: any) =>
                    acc + Number(currentValue.orderedQuantity),
                  0
                )}
              </p>
              <div className="flex gap-2">
                Payment Status:
                <Tag
                  color={
                    paymentStatus === "Paid"
                      ? "green"
                      : paymentStatus === "Pending"
                      ? "blue"
                      : paymentStatus === "Failed"
                      ? "black"
                      : "red"
                  }
                >
                  {paymentStatus}
                </Tag>
              </div>
              <div className="flex gap-2">
                Order Status:
                <Tag
                  color={
                    orderStatus === "Delivered"
                      ? "cyan"
                      : orderStatus === "Shipped"
                      ? "blue"
                      : orderStatus === "Confirmed"
                      ? "green"
                      : "red"
                  }
                >
                  {orderStatus}
                </Tag>
              </div>
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
                    <Link to={`/products/cars/${order.productId._id}`}>
                      <div className="flex gap-1 justify-center items-center">
                        <p> {order.orderedQuantity} x </p>
                        <img
                          className="w-20 h-20 rounded-md hover:shadow-sm  cursor-pointer"
                          src={
                            order.productId.imgUrl?.[0] || "/fallback-image.jpg"
                          }
                          alt="Product img"
                        />
                        {index !== orderInfo.length - 1 && (
                          <Divider
                            className="bg-primary w-[1px] h-14"
                            type="vertical"
                          />
                        )}
                      </div>
                    </Link>
                  </Tooltip>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-6/12 flex flex-col items-center justify-center px-2">
          <Divider type="horizontal">Use Your Desired Payment Method</Divider>
          <div>
            <button onClick={() => handlePayment()}>
              {paymentLoading ? (
                "loading"
              ) : (
                <img
                  className="border rounded-md w-60 hover:shadow-lg hover:scale-105 duration-500 p-2"
                  src={sslLogo}
                ></img>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
