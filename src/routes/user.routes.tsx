import UserHome from "@/Pages/dashboard/user/UserHome";
import { MyWishlist } from "@/Pages/dashboard/user/MyWishlist";

const userPaths = [
  {
    name: "Dashboard Home",
    path: "dashboard",
    element: <UserHome></UserHome>,
  },
  {
    name: "Blogs",
    children: [
      {
        name: "My Wishlist",
        path: "my-wishlist",
        element: <MyWishlist />,
      },
    ],
  },
];

export default userPaths;
