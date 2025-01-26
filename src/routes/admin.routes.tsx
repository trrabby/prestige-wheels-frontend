import CreateProducts from "@/Pages/products/CreateProduct";
import Users from "@/Pages/users/Users";

const AdminPaths = [
  {
    name: "Blogs",
    children: [
      {
        name: "Add Car",
        path: "add-car",
        element: <CreateProducts />,
      },
    ],
  },
  {
    name: "Users",
    path: "users",
    element: <Users></Users>,
  },
];

export default AdminPaths;
