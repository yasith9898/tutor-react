import { createBrowserRouter } from "react-router-dom";
import { AdminLayout } from "@/shared/layouts/AdminLayout";
import { MainLayout } from "@/shared/layouts/MainLayout";

// Import pages from their Public APIs
import { HomePage } from "@/pages/home";
import { DashboardPage } from "@/pages/admin/dashboard";
<<<<<<< HEAD
import { RegisterPage } from "@/pages/auth/register";
=======
import { RegisterPage } from "@/pages/register";
import { LoginPage } from "@/pages/login";
>>>>>>> fab26362ad277bc67b7d2360c0916c02b2109a69

export const router = createBrowserRouter([
  {
    // Base/Public Routes (Tutor Branding)
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage title="Home" />,
      },
<<<<<<< HEAD
=======
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
>>>>>>> fab26362ad277bc67b7d2360c0916c02b2109a69
      // Future routes like /profile or /about go here
    ],
  },
  {
    // Admin Routes (Student Management & AI Tools)
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage title="Dashboard" />,
      }
    ],
  },
  {
    path: "/auth",
    children: [
      {
        path: "register",
        element: <RegisterPage />,
      }
    ]
  }
]);