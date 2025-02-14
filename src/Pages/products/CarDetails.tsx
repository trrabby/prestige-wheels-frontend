import { useGetAllProductsQuery } from "@/redux/features/admin/productManagement/productsManagementApi";
import { Link, useParams } from "react-router-dom";
import { HiCurrencyBangladeshi } from "react-icons/hi";
import { Skeleton, Tooltip } from "antd";
import { FaCartArrowDown } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setToCart } from "@/redux/features/admin/productManagement/productsManagementSlice";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { FaPenToSquare } from "react-icons/fa6";
import { toast } from "sonner";

export default function CarDetails() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  // console.log(user);
  const admin = user?.role === "admin";

  const { id } = useParams();
  const { data: carData, isLoading: isProductLoading } = useGetAllProductsQuery(
    [{ name: "_id", value: `${id}` }]
  );

  if (isProductLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Skeleton active />
      </div>
    );
  }

  const car = carData?.data[0];
  const { brand, model, category, year, price, imgUrl, description, quantity } =
    car || {};

  const handleAddtoCart = (productId: string) => {
    dispatch(setToCart(productId));
    toast.success(`${brand} ${model} Added to cart`);
  };

  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pt-4 lg:pr-8 flex flex-col justify-around">
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-accent">{brand}</h2>
              <div className="flex justify-between items-center">
                <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl flex gap-10">
                  {model}
                  {admin && (
                    <Link to={`/admin/manage-cars/updateCar/${id}`}>
                      <FaPenToSquare className="hover:text-primary hover:cursor-pointer w-6 h-6" />
                    </Link>
                  )}
                </p>
                <Tooltip placement="top" title="Add to cart">
                  <FaCartArrowDown
                    onClick={() => handleAddtoCart(id!)}
                    className="w-8 h-8 hover:text-primary hover:cursor-pointer"
                  />
                </Tooltip>
              </div>
              <p className="mt-6 text-lg/8 text-gray-600">{description}</p>
            </div>

            <div className="lg:max-w-lg lg:mt-0 mt-10">
              <h2 className="text-base/7 font-semibold  text-gray-600">
                Description:
              </h2>
              <h2 className="text-base/7  text-gray-600">{category}</h2>
              <h2 className="text-base/7  text-gray-600 flex gap-2 items-center justify-start">
                <HiCurrencyBangladeshi className="text-primary h-8" />
                {price}
              </h2>
              <h2 className="text-base/7  text-gray-600">{year} Edition</h2>
              <h2 className="text-base/7  text-gray-600">{`${
                quantity && quantity > 0 ? "Available" : "Unavailable"
              }`}</h2>
            </div>
          </div>
          <img
            alt="Product screenshot"
            src={imgUrl ? imgUrl[0] : ""}
            className=" w-[48rem] max-w-none rounded-xl ring-1 shadow-xl ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
          />
        </div>
      </div>
    </div>
  );
}
