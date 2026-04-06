import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "./pages/NotFound";
import { MainDashboard } from "./pages/MainDashboard";
import { Root } from "./pages/Root";
import "./index.css";
import { WeightOverview } from "./pages/weight/WeightOverview";
import { StrengthOverview } from "./pages/strength/StrengthOverview";
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
        element: <MainDashboard />,
      },
      {
        path: "/IntelliFit/weight/overview",
        element: <WeightOverview />,
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
