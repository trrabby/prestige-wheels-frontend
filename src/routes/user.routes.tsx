import UserHome from "@/Pages/dashboard/user/UserHome";
import { MyWishlist } from "@/Pages/dashboard/user/MyWishlist";
import MyOrders from "@/Pages/dashboard/user/MyOrders";

const userPaths = [
  {
    name: "Dashboard Home",
    path: "dashboard",
    element: <UserHome></UserHome>,
  },
  {
    name: "Orders",
    children: [
      {
        name: "My Orders",
        path: "my-orders",
        element: <MyOrders />,
      },
      {
        name: "My Wishlist",
        path: "my-wishlist",
        element: <MyWishlist />,
      },
    ],
  },
];

export default userPaths;
