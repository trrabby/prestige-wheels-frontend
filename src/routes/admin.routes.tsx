import AdminHome from "@/Pages/dashboard/admin/AdminHome";
import Users from "@/Pages/dashboard/admin/Users";
import AddCar from "@/Pages/dashboard/admin/AddCar";

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
        element: <AddCar />,
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
