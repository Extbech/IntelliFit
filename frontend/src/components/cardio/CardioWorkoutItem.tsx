import { Box, Typography } from "@mui/material";
import { CardioWorkout } from "../../types/api/cardio";

export const CardioWorkoutItem = (workout: CardioWorkout) => {
  return (
    <Box mb={2} p={2} border={1} borderRadius={4}>
      <Typography>Type: {workout.workout_type}</Typography>
      <Typography>Duration: {workout.duration_minutes} minutes</Typography>
      <Typography>Distance: {workout.distance_km} km</Typography>
    </Box>
  );
};
