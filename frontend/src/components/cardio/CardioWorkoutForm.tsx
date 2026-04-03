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
  Stack,
} from "@mui/material";
import {
  CardioWorkoutRequest,
  CardioWorkoutResponse,
  WorkoutType,
} from "../../types/api/cardio";
import { ChangeEvent, useState } from "react";

type CardioWorkoutFormProps = {
  onSubmit: (workout: CardioWorkoutRequest) => Promise<CardioWorkoutResponse>;
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
  const [hours, setHours] = useState<string>("");
  const [minutes, setMinutes] = useState<string>("");
  const [seconds, setSeconds] = useState<string>("");
  const [distance, setDistance] = useState<string>("");
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0],
  );

  const handleWorkoutTypeChange = (event: SelectChangeEvent<WorkoutType>) => {
    setWorkoutType(event.target.value as WorkoutType);
  };

  const handleHoursChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (
      (Number.isFinite(+value) && +value >= 0 && +value <= 23) ||
      value === ""
    ) {
      setHours(value);
    }
  };

  const handleMinutesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (
      (Number.isFinite(+value) && +value >= 0 && +value <= 59) ||
      value === ""
    ) {
      setMinutes(value);
    }
  };

  const handleSecondsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (
      (Number.isFinite(+value) && +value >= 0 && +value <= 59) ||
      value === ""
    ) {
      setSeconds(value);
    }
  };

  const handleDistanceChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (Number.isFinite(+e.target.value) || e.target.value === "")
      setDistance(e.target.value);
  };
  // Convert hours, minutes, seconds to total seconds
  const getTotalSeconds = (): number => {
    const h = Number(hours) || 0;
    const m = Number(minutes) || 0;
    const s = Number(seconds) || 0;
    return h * 3600 + m * 60 + s;
  };

  const handleSubmit = async () => {
    const totalSeconds = getTotalSeconds();
    if (totalSeconds === 0) {
      alert("Please enter a duration greater than 0");
      return;
    }

    try {
      await onSubmit({
        workout_type: workoutType,
        distance: Number(distance),
        duration: totalSeconds,
        date: new Date(date).toISOString(),
      });

      setHours("");
      setMinutes("");
      setSeconds("");
      setDistance("");
      setWorkoutType(WorkoutType.Running);
      setDate(new Date().toISOString().split("T")[0]);
    } catch (error) {
      console.error("Add workout failed", error);
    }
  };

  return (
    <Stack spacing={2} mt={1}>
      {/* Workout type should be a drop down menu and have same dimensions as input fields*/}
      <FormControl>
        <InputLabel id="workout-type-label">Workout Type</InputLabel>
        <Select
          labelId="workout-type-label"
          id="workout-type-select"
          label="Workout Type"
          value={workoutType}
          onChange={handleWorkoutTypeChange}
        >
          {Object.values(WorkoutType).map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        fullWidth
        label="Distance (km)"
        value={distance}
        onChange={handleDistanceChange}
      />

      {/* Duration fields */}
      <Typography variant="subtitle2" sx={{ mt: 1, mb: -1 }}>
        Duration
      </Typography>
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          label="Hours"
          value={hours}
          onChange={handleHoursChange}
          sx={{ flex: 1 }}
        />
        <TextField
          label="Minutes"
          value={minutes}
          onChange={handleMinutesChange}
          sx={{ flex: 1 }}
        />
        <TextField
          label="Seconds"
          value={seconds}
          onChange={handleSecondsChange}
          sx={{ flex: 1 }}
        />
      </Box>
      <TextField
        fullWidth
        type="date"
        label="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        sx={{
          '& input[type="date"]::-webkit-calendar-picker-indicator': {
            cursor: "pointer",
            filter: "invert(1)",
          },
          '& input[type="date"]': {
            colorScheme: "dark",
          },
        }}
      />
      <Button
        onClick={handleSubmit}
        variant="contained"
        size="large"
        loading={isLoading}
        fullWidth
      >
        Add Workout
      </Button>
      {IsError && (
        <Typography color="error" variant="body2">
          Failed to add workout.
        </Typography>
      )}
    </Stack>
  );
};
