import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { useMemo, useState } from "react";
import {
  useAddWeightEntryMutation,
  useGetWeightDataQuery,
} from "../../store/weightSlice";
import { WeightEntryForm } from "../../components/weight/WeightEntryForm";
import { WeightEntry } from "../../types/api/weight";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import ScaleIcon from "@mui/icons-material/Scale";

const intervalOptions = [
  { label: "1W", value: "1W" },
  { label: "1M", value: "1M" },
  { label: "6M", value: "6M" },
  { label: "YTD", value: "YTD" },
  { label: "1Y", value: "1Y" },
  { label: "MAX", value: "MAX" },
] as const;

type IntervalValue = (typeof intervalOptions)[number]["value"];

const getIntervalStartDate = (interval: IntervalValue) => {
  const now = new Date();
  switch (interval) {
    case "1W":
      return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
    case "1M":
      return new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    case "6M":
      return new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
    case "YTD":
      return new Date(now.getFullYear(), 0, 1);
    case "1Y":
      return new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
    case "MAX":
    default:
      return new Date(0);
  }
};

const formatChartLabel = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

export const WeightOverview = () => {
  const { data, isLoading, isError } = useGetWeightDataQuery();
  const [addWeightEntry, { isLoading: isAdding, isError: isAddError }] =
    useAddWeightEntryMutation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedInterval, setSelectedInterval] = useState<IntervalValue>("1M");

  const handleAddEntry = async (entry: WeightEntry) => {
    await addWeightEntry(entry).unwrap();
    setDialogOpen(false);
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="400px"
        >
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  if (isError || !data) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box textAlign="center" py={8}>
          <Typography variant="h6" color="error" gutterBottom>
            Failed to load weight data
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Please try again later.
          </Typography>
        </Box>
      </Container>
    );
  }

  const filteredData = useMemo(() => {
    if (data.length === 0) return [];

    const startDate = getIntervalStartDate(selectedInterval);
    const temp = data.filter(
      (entry) => new Date(entry.date).getTime() >= startDate.getTime(),
    );
    let averaged = [];
    if (temp.length > 365) {
      for (let i = 0; i < temp.length; i += 30) {
        const chunk = temp.slice(i, i + 30);
        const avgWeight =
          chunk.reduce((sum, entry) => sum + entry.weight, 0) / chunk.length;
        averaged.push({
          date: chunk[Math.floor(chunk.length / 2)].date,
          weight: avgWeight,
        });
      }
      return averaged;
    }
    if (temp.length > 31) {
      for (let i = 0; i < temp.length; i += 7) {
        const chunk = temp.slice(i, i + 7);
        const avgWeight =
          chunk.reduce((sum, entry) => sum + entry.weight, 0) / chunk.length;
        averaged.push({
          date: chunk[Math.floor(chunk.length / 2)].date,
          weight: avgWeight,
        });
      }
      return averaged;
    }
    return temp;
  }, [selectedInterval, data]);

  const weightChange = useMemo(() => {
    if (data.length < 2) return 0;
    const last = data[data.length - 1].weight;
    if (selectedInterval == "MAX") {
      return last - data[0].weight;
    }
    if (selectedInterval === "YTD") {
      const startOfYear = new Date(new Date().getFullYear(), 0, 1).getTime();
      const firstEntry = data.find(
        (entry) => new Date(entry.date).getTime() >= startOfYear,
      );
      if (!firstEntry) return 0;
      return last - firstEntry.weight;
    }
    if (selectedInterval === "1Y") {
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      const firstEntry = data.find(
        (entry) => new Date(entry.date).getTime() >= oneYearAgo.getTime(),
      );
      if (!firstEntry) return 0;
      return last - firstEntry.weight;
    }
    if (selectedInterval === "6M") {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      const firstEntry = data.find(
        (entry) => new Date(entry.date).getTime() >= sixMonthsAgo.getTime(),
      );
      if (!firstEntry) return 0;
      return last - firstEntry.weight;
    }
    if (selectedInterval === "1M") {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      const firstEntry = data.find(
        (entry) => new Date(entry.date).getTime() >= oneMonthAgo.getTime(),
      );
      if (!firstEntry) return 0;
      return last - firstEntry.weight;
    }
    if (selectedInterval === "1W") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const firstEntry = data.find(
        (entry) => new Date(entry.date).getTime() >= oneWeekAgo.getTime(),
      );
      if (!firstEntry) return 0;
      return last - firstEntry.weight;
    }
    return 0;
  }, [selectedInterval, data]);

  const chartData = filteredData.length > 0 ? filteredData : data;
  const chartXAxis = chartData.map((entry) => formatChartLabel(entry.date));
  const chartSeries = [
    {
      data: chartData.map((entry) => entry.weight),
      label: "Weight (kg)",
      color: "#3f51b5",
    },
  ];

  const getTrendIcon = () => {
    if (weightChange > 0.1) return <TrendingUpIcon color="error" />;
    if (weightChange < -0.1) return <TrendingDownIcon color="success" />;
    return <TrendingFlatIcon color="action" />;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          mb: 4,
        }}
      >
        <Typography variant="h4">Weight Progress</Typography>
        <Tooltip title="Add Weight Entry" placement="top">
          <IconButton
            sx={{ color: "primary.main" }}
            size="large"
            onClick={() => setDialogOpen(true)}
          >
            <AddCircleOutlineRoundedIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Summary Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 3,
          mb: 4,
        }}
      >
        <Card sx={{ bgcolor: "primary.light", color: "primary.contrastText" }}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2}>
              <ScaleIcon />
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  {data[data.length - 1]?.weight.toFixed(1)} kg
                </Typography>
                <Typography variant="body2">Current Weight</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ bgcolor: "background.paper" }}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2}>
              {getTrendIcon()}
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  {weightChange > 0 ? "+" : ""}
                  {weightChange.toFixed(1)} kg
                </Typography>
                <Typography variant="body2">Change</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ bgcolor: "info.dark", color: "info.contrastText" }}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2}>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  {data.length}
                </Typography>
                <Typography variant="body2">Total Entries</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
              mb: 2,
            }}
          >
            <Typography variant="h6">Weight Trend</Typography>
            <ButtonGroup
              variant="outlined"
              aria-label="weight interval buttons"
            >
              {intervalOptions.map((option) => (
                <Button
                  key={option.value}
                  onClick={() => setSelectedInterval(option.value)}
                  variant={
                    selectedInterval === option.value ? "contained" : "outlined"
                  }
                >
                  {option.label}
                </Button>
              ))}
            </ButtonGroup>
          </Box>
          {chartData.length > 0 ? (
            <Box height={400}>
              <LineChart
                series={chartSeries}
                xAxis={[
                  {
                    data: chartXAxis,
                    scaleType: "band",
                  },
                ]}
                height={400}
                margin={{ top: 20, right: 30, bottom: 60, left: 60 }}
              />
            </Box>
          ) : (
            <Typography color="text.secondary">
              No weight data available for that interval.
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* Add Entry Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent sx={{ p: 0 }}>
          <WeightEntryForm
            onSubmit={handleAddEntry}
            isLoading={isAdding}
            isError={isAddError}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
};
