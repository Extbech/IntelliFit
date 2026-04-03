import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "./pages/NotFound";
import { Dashboard } from "./pages/Dashboard";
import { Root } from "./pages/Root";
import "./index.css";
import { DietOverview } from "./pages/DietOverview";
import { StrengthOverview } from "./pages/StrengthOverview";
import { CardioDashboard } from "./pages/cardio/CardioDashboard";
import { CardioWorkouts } from "./pages/cardio/CardioWorkouts";
import { CardioAnalytics } from "./pages/cardio/CardioAnalytics";

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
        path: "/IntelliFit/cardio",
        element: <CardioDashboard />,
      },
      {
        path: "/IntelliFit/cardio/workouts",
        element: <CardioWorkouts />,
      },
      {
        path: "/IntelliFit/cardio/analytics",
        element: <CardioAnalytics />,
      },
    ],
  },
]);
