import AdminHome from "@/Pages/dashboard/admin/AdminHome";
import Users from "@/Pages/dashboard/admin/userManagement/Users";
import AddCar from "@/Pages/dashboard/admin/productManagement/AddCar";
import ManageCars from "@/Pages/dashboard/admin/productManagement/ManageCars";
import ManageOrders from "@/Pages/dashboard/admin/orderManagement/ManageOrders";
import MyOrders from "@/Pages/dashboard/user/MyOrders";

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
      {
        name: "Manage Cars",
        path: "manage-cars",
        element: <ManageCars />,
      },
    ],
  },
  {
    name: "Orders Management",
    children: [
      {
        name: "Manage Orders",
        path: "manage-orders",
        element: <ManageOrders />,
      },
      {
        name: "My Orders",
        path: "my-orders",
        element: <MyOrders />,
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
