import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import Layout from "./components/layout/Layout";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
      ],
    },
    {
      path: "register",
      element: <RegisterPage />,
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "reset-password",
      element: <ResetPasswordPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
