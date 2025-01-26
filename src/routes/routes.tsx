import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "@/Pages/home/Index";

import { routeGenerator } from "@/utils/routesGenerators";
import AdminPaths from "./admin.routes";
import Login from "@/Pages/Login";
import ProtectedRoute from "@/Layouts/ProtectedRoute";
import DashBoardLayout from "@/Layouts/DashBoardLayouts";
import Products from "@/Pages/products/Products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/products",
        element: <Products></Products>,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <DashBoardLayout></DashBoardLayout>
      </ProtectedRoute>
    ),
    children: routeGenerator(AdminPaths),
  },

  {
    path: "/login",
    element: <Login></Login>,
  },
]);

export default router;
