import { Box } from "@mui/material";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const StrengthTracker = () => {
  const weights: { date: string; weight: number }[] = [
    {
      date: "01/08/2024",
      weight: 83,
    },
    {
      date: "02/08/2024",
      weight: 81,
    },
    {
      date: "03/08/2024",
      weight: 84,
    },
    {
      date: "04/08/2024",
      weight: 80,
    },
    {
      date: "05/08/2024",
      weight: 78,
    },
  ];
  return (
    <Box>
      <LineChart width={500} height={300} data={weights}>
        <Line type="monotone" dataKey="weight" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date" />
        <YAxis domain={[Math.round(80 * 0.9), Math.round(83 * 1.1)]} />
        <Tooltip />
      </LineChart>
    </Box>
  );
};
