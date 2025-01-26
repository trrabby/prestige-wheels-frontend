import { MyWishlist } from "@/Pages/usersPages/MyWishlist";

const userPaths = [
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
