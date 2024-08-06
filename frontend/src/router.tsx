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
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/diet/overview",
        element: <DietOverview />,
      },
      {
        path: "/strength/overview",
        element: <StrengthOverview />,
      },
      {
        path: "/cardio/overview",
        element: <CardioOverview />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
