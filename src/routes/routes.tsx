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
import userPaths from "./user.routes";
import Profile from "@/Pages/Profile";
import UpdateCar from "@/Pages/dashboard/admin/productManagement/UpdateCar";
import CarDetails from "@/Pages/products/CarDetails";
import Payment from "@/Pages/dashboard/Payment";
import PaymentSuccess from "@/Pages/dashboard/PaymentSuccess";
import PaymentFailed from "@/Pages/dashboard/PaymentFailed";
import ErrorPage from "@/Pages/ErrorPage";
import ServicingDetailsPage from "@/Pages/home/ServicingDetailedPage";
import AboutUsPage from "@/Pages/about/Aboutus";
import ContactUs from "@/Pages/contact/Contact";
import FAQsSection from "@/Pages/about/FAQ";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage></ErrorPage>,
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
        path: "/services",
        element: <ServicingDetailsPage></ServicingDetailsPage>,
      },
      {
        path: "/about",
        element: <AboutUsPage></AboutUsPage>,
      },
      {
        path: "/contact",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "/faq",
        element: <FAQsSection></FAQsSection>,
      },
      {
        path: "/cars/:id",
        element: <CarDetails />,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/my-profile",
        element: (
          <ProtectedRoute roles={["user", "admin"]}>
            <Profile></Profile>,
          </ProtectedRoute>
        ),
      },
      {
        path: "/payment/:id",
        element: (
          <ProtectedRoute roles={["user", "admin"]}>
            <Payment />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/paymentSuccess/:id",
        element: (
          <ProtectedRoute roles={["user", "admin"]}>
            <PaymentSuccess />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/paymentFailed",
        element: (
          <ProtectedRoute roles={["user", "admin"]}>
            <PaymentFailed />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute roles={["admin"]}>
        <DashBoardLayout></DashBoardLayout>
      </ProtectedRoute>
    ),
    children: [
      ...routeGenerator(AdminPaths),
      {
        path: `manage-cars/updateCar/:id`,
        element: <UpdateCar />,
      },
    ],
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute roles={["user"]}>
        <DashBoardLayout></DashBoardLayout>
      </ProtectedRoute>
    ),
    children: routeGenerator(userPaths),
  },
]);

export default router;
