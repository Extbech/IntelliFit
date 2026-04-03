import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Stack,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tooltip,
} from "@mui/material";
import { CardioWorkoutResponse } from "../../types/api/cardio";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import PoolIcon from "@mui/icons-material/Pool";
import SailingIcon from "@mui/icons-material/Sailing";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useDeleteCardioWorkoutMutation } from "../../store/cardioSlice";
import { calculatePace, calculateSpeed } from "../../logic/cardioLogic";

const workoutIcons: Record<string, React.ReactNode> = {
  Running: <DirectionsRunIcon />,
  Cycling: <DirectionsBikeIcon />,
  Swimming: <PoolIcon />,
  Rowing: <SailingIcon />,
  Elliptical: <FitnessCenterIcon />,
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-EU", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m ${secs}s`;
};

export const CardioWorkoutItem = (workout: CardioWorkoutResponse) => {
  const icon = workoutIcons[workout.workout_type as keyof typeof workoutIcons];
  const [deleteCardioWorkout, { isLoading: isDeleting }] =
    useDeleteCardioWorkoutMutation();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const handleDeleteClick = () => {
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    setConfirmDialogOpen(false);
    try {
      await deleteCardioWorkout(workout.id).unwrap();
    } catch (error) {
      console.error("Failed to delete workout:", error);
    }
  };

  const handleCancelDelete = () => {
    setConfirmDialogOpen(false);
  };

  return (
    <>
      <Card
        sx={{
          mb: 2,
          backgroundColor: "background.paper",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: 4,
            transform: "translateY(-2px)",
          },
        }}
      >
        <CardContent>
          <Stack spacing={2}>
            {/* Header with Workout Type */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "primary.main",
                  }}
                >
                  {icon}
                </Box>
                <Chip
                  label={workout.workout_type}
                  color="primary"
                  variant="outlined"
                />
              </Box>
              <Tooltip title="Delete Workout" placement="top">
                <IconButton
                  onClick={handleDeleteClick}
                  disabled={isDeleting}
                  size="small"
                  sx={{
                    color: "error.main",
                    "&:hover": {
                      backgroundColor: "error.light",
                      color: "error.contrastText",
                    },
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>

            {/* Metrics Grid */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(5, 1fr)" },
                gap: 2,
              }}
            >
              {/* Distance */}
              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary" }}
                  display="block"
                >
                  Distance
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {workout.distance.toFixed(2)} km
                </Typography>
              </Box>

              {/* Duration */}
              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary" }}
                  display="block"
                >
                  Duration
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {formatDuration(workout.duration)}
                </Typography>
              </Box>

              {/* Date */}
              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary" }}
                  display="block"
                >
                  Date
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {formatDate(workout.date)}
                </Typography>
              </Box>
              {/* Speed */}
              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary" }}
                  display="block"
                >
                  Speed
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {calculateSpeed(workout.duration, workout.distance)}
                </Typography>
              </Box>
              {/* Pace */}
              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary" }}
                  display="block"
                >
                  Pace
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {calculatePace(workout.duration, workout.distance)}
                </Typography>
              </Box>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <Dialog
        open={confirmDialogOpen}
        onClose={handleCancelDelete}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Delete Workout</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this{" "}
            {workout.workout_type.toLowerCase()} workout from{" "}
            {formatDate(workout.date)}?
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Yes, Delete"}
          </Button>
          <Button onClick={handleCancelDelete} color="inherit">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
