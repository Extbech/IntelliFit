import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "./pages/NotFound";
import { Dashboard } from "./pages/Dashboard";
import { Root } from "./pages/Root";
import "./index.css";
import { Login } from "./pages/Login";
import { DietOverview } from "./pages/DietOverview";
import { StrengthOverview } from "./pages/StrengthOverview";
import { CardioOverview } from "./pages/CardioOverview";

export const router = createBrowserRouter([
  {
    path: "/IntelliFit",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/IntelliFit",
        element: <Dashboard />,
      },
      {
        path: "/IntelliFit/diet/overview",
        element: <DietOverview />,
      },
      {
        path: "/IntelliFit/strength/overview",
        element: <StrengthOverview />,
      },
      {
        path: "/IntelliFit/cardio/overview",
        element: <CardioOverview />,
      },
    ],
  },
  {
    path: "/IntelliFit/login",
    element: <Login />,
  },
]);
