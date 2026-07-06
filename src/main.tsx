import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Landing from "./routes/index";
import SignupPage from "./routes/signup";
import OnboardingLayout from "./routes/onboarding";

import DashboardLayoutWrapper from "./routes/dashboard";
import DashboardAnalytics from "./routes/dashboard.analytics";
import DashboardProducts from "./routes/dashboard.products";
import DashboardOrders from "./routes/dashboard.orders";
import DashboardCustomers from "./routes/dashboard.customers";
import DashboardContent from "./routes/dashboard.content";
import DashboardMarketing from "./routes/dashboard.marketing";
import DashboardOnlineStore from "./routes/dashboard.online-store";
import DashboardDiscounts from "./routes/dashboard.discounts";
import DashboardSettings from "./routes/dashboard.settings";

import "@fontsource/instrument-serif/400.css";
import "@fontsource-variable/inter/index.css";
import "./styles.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/onboarding",
    element: <OnboardingLayout />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayoutWrapper />,
    children: [
      {
        path: "analytics",
        element: <DashboardAnalytics />,
      },
      {
        path: "products",
        element: <DashboardProducts />,
      },
      {
        path: "orders",
        element: <DashboardOrders />,
      },
      {
        path: "customers",
        element: <DashboardCustomers />,
      },
      {
        path: "content",
        element: <DashboardContent />,
      },
      {
        path: "marketing",
        element: <DashboardMarketing />,
      },
      {
        path: "online-store",
        element: <DashboardOnlineStore />,
      },
      {
        path: "discounts",
        element: <DashboardDiscounts />,
      },
      {
        path: "settings",
        element: <DashboardSettings />,
      },
    ],
  },
  {
    path: "*",
    element: (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-md text-center">
          <h1 className="text-7xl font-bold text-foreground">404</h1>
          <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="mt-6">
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Go home
            </a>
          </div>
        </div>
      </div>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
