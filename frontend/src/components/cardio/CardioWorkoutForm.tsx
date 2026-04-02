import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { CardioWorkout, WorkoutType } from "../../types/api/cardio";
import { useState } from "react";

type CardioWorkoutFormProps = {
  onSubmit: (workout: Partial<CardioWorkout>) => Promise<CardioWorkout>;
  isLoading?: boolean;
  IsError?: boolean;
};

export const CardioWorkoutForm = ({
  onSubmit,
  isLoading,
  IsError,
}: CardioWorkoutFormProps) => {
  const [workoutType, setWorkoutType] = useState<WorkoutType>(
    WorkoutType.Running,
  );
  const [duration, setDuration] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);

  const handleWorkoutTypeChange = (event: SelectChangeEvent<WorkoutType>) => {
    setWorkoutType(event.target.value as WorkoutType);
  };

  const handleSubmit = async () => {
    try {
      await onSubmit({
        workout_type: workoutType,
        duration_minutes: duration,
        distance_km: distance,
      });

      setDuration(0);
      setDistance(0);
      setWorkoutType(WorkoutType.Running);
    } catch (error) {
      console.error("Add workout failed", error);
    }
  };

  return (
    <Box
      mb={2}
      p={2}
      display="flex"
      flexDirection="row"
      alignItems="center"
      gap={2}
    >
      {/* Workout type should be a drop down menu and have same dimensions as input fields*/}
      <FormControl sx={{ minWidth: 140 }}>
        <InputLabel id="workout-type-label">Workout Type</InputLabel>
        <Select
          labelId="workout-type-label"
          id="workout-type-select"
          label="Workout Type"
          value={workoutType}
          onChange={handleWorkoutTypeChange}
          size="small"
        >
          {Object.values(WorkoutType).map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        type="number"
        size="small"
        label="Duration (seconds)"
        value={duration}
        onChange={(e) => setDuration(Number(e.target.value))}
      />
      <TextField
        type="number"
        size="small"
        label="Distance (m)"
        value={distance}
        onChange={(e) => setDistance(Number(e.target.value))}
      />
      <Button
        onClick={handleSubmit}
        variant="contained"
        size="medium"
        loading={isLoading}
      >
        {"Add Workout"}
      </Button>
      {IsError && (
        <Typography color="error" variant="body2">
          Failed to load workout data.
        </Typography>
      )}
    </Box>
  );
};
