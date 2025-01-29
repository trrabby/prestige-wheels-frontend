import AdminHome from "@/Pages/dashboard/admin/AdminHome";
import CreateProducts from "@/Pages/dashboard/admin/CreateProduct";
import Users from "@/Pages/dashboard/admin/Users";

const AdminPaths = [
  {
    name: "Dashboard Home",
    path: "dashboard",
    element: <AdminHome></AdminHome>,
  },
  {
    name: "Product Management",
    children: [
      {
        name: "Add Car",
        path: "add-car",
        element: <CreateProducts />,
      },
    ],
  },
  {
    name: "User Management",
    children: [
      {
        name: "All Users",
        path: "users",
        element: <Users></Users>,
      },
    ],
  },
];

export default AdminPaths;
