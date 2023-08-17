import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import Layout from "./components/layout/Layout";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import GuessRoute from "./components/routes/GuessRoute";

function App() {
  const router = createBrowserRouter([
    {
      element: <ProtectedRoute />,
      children: [
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
      ],
    },
    {
      element: <GuessRoute />,
      children: [
        {
          path: "/register",
          element: <RegisterPage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/reset-password/:token",
          element: <ResetPasswordPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
