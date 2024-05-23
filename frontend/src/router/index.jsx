import {createBrowserRouter} from "react-router-dom";
import Layout from "./layout.jsx";
import HomePage from "../pages/HomePage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage/index.jsx";

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
    ]
  }
]);

export default router;