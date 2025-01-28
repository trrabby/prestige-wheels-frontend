import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "@/Pages/home/Index";

import { routeGenerator } from "@/utils/routesGenerators";
import AdminPaths from "./admin.routes";
import Login from "@/Pages/Login";
import ProtectedRoute from "@/Layouts/ProtectedRoute";
import DashBoardLayout from "@/Layouts/DashBoardLayouts";
import Products from "@/Pages/products/Products";
import Register from "@/Pages/Register";

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
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
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
]);

export default router;
