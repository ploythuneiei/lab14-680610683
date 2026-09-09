import { createBrowserRouter } from "react-router";
import MainLayout from "./layout/MainLayout";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      // localhost:xxxx/
      { index: true, element: <HomePage /> },
      // STEP 8 : เพิ่ม route ของหน้า Dashboard — localhost:xxxx/dashboard
      { path: "dashboard", element: <DashboardPage /> },
    ],
  },
]);
