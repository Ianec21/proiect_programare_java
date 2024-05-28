import {createBrowserRouter} from "react-router-dom";
import Layout from "./layout.jsx";
import HomePage from "../pages/HomePage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage/index.jsx";
import AdminPage from "../pages/AdminPage/index.jsx";
import { NewVehiclePage } from "../pages/AdminPage/NewVehicle/index.jsx";
import EditVehiclePage from "../pages/AdminPage/EditVehicle/index.jsx";
import UsersPage from "../pages/AdminPage/Users/index.jsx";
import EditUserPage from "../pages/AdminPage/Users/EditUser/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <HomePage/>
      },
      {
        path: "/sign-in",
        element: <SignInPage/>
      },
      {
        path: "/sign-up",
        element: <SignUpPage/>
      },
      {
        path: "/admin",
        element: <AdminPage/>
      },
      {
        path: "/admin/new",
        element: <NewVehiclePage/>
      },
      {
        path: "/admin/edit/:plateText",
        element: <EditVehiclePage/>
      },
      {
        path: "/admin/users",
        element: <UsersPage/>
      },
      {
        path: "/admin/users/edit/:id",
        element: <EditUserPage/>
      },
    ]
  }
]);

export default router;