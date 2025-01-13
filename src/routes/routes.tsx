import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "@/Pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage></ErrorPage>,
    // children: [
    //   {
    //     index: true,
    //     element: <Home></Home>,
    //   },
    //   {
    //     path: "/login",
    //     element: <LoginPage></LoginPage>,
    //   },
    //   {
    //     path: "/dashboard",
    //     element: (
    //       <AdminPrivateRoute>
    //         <DashBoard></DashBoard>
    //       </AdminPrivateRoute>
    //     ),
    //     children: [
    //       {
    //         index: true,
    //         element: <DashboardHome></DashboardHome>,
    //       },
    //       {
    //         path: "addLesson",
    //         element: <AddLesson></AddLesson>,
    //       },
    //       {
    //         path: "addVocabulary",
    //         element: <AddVocabulary></AddVocabulary>,
    //       },
    //       {
    //         path: "mngt",
    //         element: <ManageItems></ManageItems>,
    //       },
    //       {
    //         path: "updateVocabulary/:id",
    //         element: <UpdateVocabulary></UpdateVocabulary>,
    //       },
    //     ],
    //   },
    // ],
  },
]);

export default router;
