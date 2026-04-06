import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Typography,
  Chip,
  Stack,
  Avatar,
} from "@mui/material";
import { BarChart, PieChart } from "@mui/x-charts";
import { useGetCardioWorkoutsQuery } from "../../store/cardioSlice";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import PoolIcon from "@mui/icons-material/Pool";
import SailingIcon from "@mui/icons-material/Sailing";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TimerIcon from "@mui/icons-material/Timer";
import RouteIcon from "@mui/icons-material/Route";
import { calculatePace, calculateSpeed } from "../../logic/cardioLogic";

const workoutIcons: Record<string, React.ReactNode> = {
  Running: <DirectionsRunIcon />,
  Cycling: <DirectionsBikeIcon />,
  Swimming: <PoolIcon />,
  Rowing: <SailingIcon />,
  Elliptical: <FitnessCenterIcon />,
};

export const CardioDashboard = () => {
  const { data, isLoading, isError } = useGetCardioWorkoutsQuery();

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box textAlign="center" py={8}>
        <Typography variant="h6" color="error" gutterBottom>
          Failed to load cardio workouts
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Please try again later.
        </Typography>
      </Box>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Box textAlign="center" py={8}>
        <Typography variant="h6" gutterBottom>
          No cardio workouts yet
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Start logging your cardio workouts to see your progress here!
        </Typography>
      </Box>
    );
  }

  // Calculate metrics
  const totalWorkouts = data.length;
  const totalDistance = data.reduce(
    (sum, workout) => sum + workout.distance,
    0,
  );
  const totalDuration = data.reduce(
    (sum, workout) => sum + workout.duration,
    0,
  );
  const avgPace =
    totalDuration > 0 ? calculatePace(totalDuration, totalDistance) : 0;

  // Workout type distribution
  const workoutTypeColors: Record<string, string> = {
    Running: "#8884d8",
    Cycling: "#82ca9d",
    Swimming: "#ffc658",
    Rowing: "#ff7f50",
    Elliptical: "#00bcd4",
  };

  const workoutTypeData = Object.entries(
    data.reduce(
      (acc, workout) => {
        acc[workout.workout_type] = (acc[workout.workout_type] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    ),
  ).map(([type, count]) => ({
    id: type,
    value: count,
    label: type,
    color: workoutTypeColors[type] || "#a4de6c",
  }));

  const pieChartSeries = [
    {
      data: workoutTypeData,
    },
  ];

  // Recent workouts (last 7)
  const recentWorkouts = data.slice(-7);

  // Chart data for distance over time
  const chartData = data.slice(-10);
  const barChartXAxis = chartData.map((workout) =>
    new Date(workout.date).toLocaleDateString(),
  );
  const barChartSeries = [
    {
      data: chartData.map((workout) => workout.distance),
      label: "Distance (km)",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Summary Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 3,
          mb: 4,
        }}
      >
        <Card sx={{ bgcolor: "primary.light", color: "primary.contrastText" }}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar sx={{ bgcolor: "primary.main" }}>
                <DirectionsRunIcon />
              </Avatar>
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  {totalWorkouts}
                </Typography>
                <Typography variant="body2">Total Workouts</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ bgcolor: "success.light", color: "success.contrastText" }}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar sx={{ bgcolor: "success.main" }}>
                <RouteIcon />
              </Avatar>
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  {totalDistance.toFixed(1)}km
                </Typography>
                <Typography variant="body2">Total Distance</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ bgcolor: "warning.light", color: "warning.contrastText" }}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar sx={{ bgcolor: "warning.main" }}>
                <TimerIcon />
              </Avatar>
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  {Math.floor(totalDuration / 3600)}h{" "}
                  {Math.floor((totalDuration % 3600) / 60)}m
                </Typography>
                <Typography variant="body2">Total Time</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ bgcolor: "info.light", color: "info.contrastText" }}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar sx={{ bgcolor: "info.main" }}>
                <TrendingUpIcon />
              </Avatar>
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  {avgPace}
                </Typography>
                <Typography variant="body2">Avg Pace</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Charts Section */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
          gap: 3,
          mb: 4,
        }}
      >
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Distance Trend
            </Typography>
            <Box height={300}>
              <BarChart
                series={barChartSeries}
                xAxis={[
                  {
                    data: barChartXAxis,
                    scaleType: "band",
                  },
                ]}
                height={300}
              />
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Workout Types
            </Typography>
            <Box height={300}>
              <PieChart series={pieChartSeries} height={300} />
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Recent Workouts */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recent Workouts
          </Typography>
          <Stack spacing={2}>
            {recentWorkouts.map((workout) => (
              <Box
                key={workout.id}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                p={2}
                borderRadius={1}
                sx={{ bgcolor: "background.default" }}
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar sx={{ bgcolor: "primary.main" }}>
                    {
                      workoutIcons[
                        workout.workout_type as keyof typeof workoutIcons
                      ]
                    }
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2">
                      {workout.workout_type}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(workout.date).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Chip
                    label={`${workout.distance.toFixed(1)}km`}
                    size="small"
                    variant="outlined"
                  />
                  <Chip
                    label={`${Math.floor(workout.duration / 60)}m ${workout.duration % 60}s`}
                    size="small"
                    variant="outlined"
                  />
                  <Chip
                    label={
                      workout.duration > 0
                        ? calculatePace(workout.duration, workout.distance)
                        : "N/A"
                    }
                    size="small"
                    variant="outlined"
                  />
                  <Chip
                    label={
                      workout.duration > 0
                        ? calculateSpeed(workout.duration, workout.distance)
                        : "N/A"
                    }
                    size="small"
                    variant="outlined"
                  />
                </Stack>
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};
