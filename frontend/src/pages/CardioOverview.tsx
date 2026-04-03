import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { useState, useMemo } from "react";
import {
  useAddCardioWorkoutMutation,
  useGetCardioWorkoutsQuery,
} from "../store/cardioSlice";
import { CardioWorkoutItem } from "../components/cardio/CardioWorkoutItem";
import { CardioWorkoutForm } from "../components/cardio/CardioWorkoutForm";
import { CardioWorkoutRequest, WorkoutType } from "../types/api/cardio";

export const CardioOverview = () => {
  const { data, isLoading, isError } = useGetCardioWorkoutsQuery();
  const [addCardioWorkout, { isLoading: isAdding, isError: isAddError }] =
    useAddCardioWorkoutMutation();
  const [dialogOpen, setDialogOpen] = useState(false);

  // Filter states
  const [workoutTypeFilter, setWorkoutTypeFilter] = useState<
    WorkoutType | "all"
  >("all");

  const handleAdd = async (workout: CardioWorkoutRequest) => {
    const result = await addCardioWorkout(workout).unwrap();
    setDialogOpen(false);
    return result;
  };

  const handleWorkoutTypeFilterChange = (
    event: SelectChangeEvent<WorkoutType | "all">,
  ) => {
    setWorkoutTypeFilter(event.target.value as WorkoutType | "all");
  };

  // Filter workouts based on selected criteria
  const filteredWorkouts = useMemo(() => {
    if (!data) return [];

    return data.filter((workout) => {
      // Filter by workout type
      if (
        workoutTypeFilter !== "all" &&
        workout.workout_type !== workoutTypeFilter
      ) {
        return false;
      }

      return true;
    });
  }, [data, workoutTypeFilter]);

  return (
    <Box sx={{ width: "70%" }}>
      {isLoading && <Typography>Loading...</Typography>}
      {isError && <Typography>Error loading cardio data.</Typography>}
      {isAdding && <Typography>Saving workout...</Typography>}
      {isAddError && (
        <Typography color="error">Failed to save workout.</Typography>
      )}
      {data && (
        <Box>
          <Box
            sx={{
              mb: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              flexWrap="wrap"
            >
              <FormControl size="small" sx={{ minWidth: 140 }}>
                <InputLabel>Workout Type</InputLabel>
                <Select
                  value={workoutTypeFilter}
                  label="Workout Type"
                  onChange={handleWorkoutTypeFilterChange}
                >
                  <MenuItem value="all">All Types</MenuItem>
                  {Object.values(WorkoutType).map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>

            <Button
              variant="contained"
              size="medium"
              onClick={() => setDialogOpen(true)}
            >
              Add Workout
            </Button>
          </Box>

          <Dialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>Add New Cardio Workout</DialogTitle>
            <DialogContent sx={{ pt: 3, pb: 3 }}>
              <CardioWorkoutForm onSubmit={handleAdd} />
            </DialogContent>
          </Dialog>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Showing {filteredWorkouts.length} of {data.length} workouts
            </Typography>
          </Box>

          {filteredWorkouts.map((workout) => (
            <CardioWorkoutItem key={workout.id} {...workout} />
          ))}
        </Box>
      )}
    </Box>
  );
};
