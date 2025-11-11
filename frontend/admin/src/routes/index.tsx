import LayoutDefault from "@/components/layout/LayoutDefault";
import PrivateRoute from "@/components/PrivateRoute";
import { DashboardOverview } from "@/pages/Dashboard/Overview";
import { Login } from "@/pages/Login/Login";
import { Profile } from "@/pages/Profile/StaffProfile";

export const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "/",
            element: <DashboardOverview />,
          },
          {
            path: "/settings/profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
];

// Route paths constants
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  MOVIES: "/dashboard/movies",
  SHOWTIMES: "/dashboard/showtimes",
  THEATERS: "/dashboard/theaters",
  TICKETS: "/dashboard/tickets",
  SETTINGS_PROFILE: "/settings/profile",
  SETTINGS_NOTIFICATIONS: "/settings/notifications",
  SETTINGS_SECURITY: "/settings/security",
} as const;
