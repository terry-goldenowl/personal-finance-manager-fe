import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import Layout from "./components/layout/Layout";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import GuessRoute from "./components/routes/GuessRoute";
import IncomesExpensePage from "./pages/incomes-expenses/IncomesExpensePage";
import ReportsPage from "./pages/reports/ReportsPage";
import CategoriesPage from "./pages/categories/CategoriesPage";
import PlansPage from "./pages/plans/PlansPage";

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
              path: "/transactions",
              element: <IncomesExpensePage />,
            },
            {
              path: "/reports",
              element: <ReportsPage />,
            },
            {
              path: "/categories",
              element: <CategoriesPage />,
            },
            {
              path: "/plans",
              element: <PlansPage />,
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
