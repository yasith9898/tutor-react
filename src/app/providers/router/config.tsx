import { createBrowserRouter } from "react-router-dom";
import { AdminLayout } from "@/shared/layouts/AdminLayout";
import { MainLayout } from "@/shared/layouts/MainLayout";

// Import pages from their Public APIs
import { HomePage } from "@/pages/home";
import { DashboardPage } from "@/pages/admin/dashboard";
import { RegisterPage } from "@/pages/auth/register";
import { LoginPage } from "@/pages/auth/login";
import { ProfilePage } from "@/pages/admin/profile";
import { AnalyticsPage } from "@/pages/admin/analytics";
import { SettingsPage } from "@/pages/admin/settings";
import { ReportsPage } from "@/pages/admin/reports";
import { HelpPage } from "@/pages/admin/help";
import { NotFoundPage } from "@/pages/error/not-found";
import { ThemeProvider } from "@/features/dark-light-toggle";

export const router = createBrowserRouter([
  {
    // Base/Public Routes (Tutor Branding)
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      // Future routes like /profile or /about go here
    ],
  },
  {
    // Admin Routes (Student Management & AI Tools)
    path: "/admin",
    element: (
      <ThemeProvider>
        <AdminLayout />
      </ThemeProvider>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage title="Dashboard" />,
      },
      {
        path: "analytics",
        element: <AnalyticsPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
      {
        path: "reports",
        element: <ReportsPage />,
      },
      {
        path: "help",
        element: <HelpPage />,
      }
    ],
  },
  {
    path: "/auth",
    children: [
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      }
    ]
  },
  {
    path: "*",
    element: <NotFoundPage />,
  }
]);