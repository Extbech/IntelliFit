import { Box, Typography } from "@mui/material";
import {
  useAddCardioWorkoutMutation,
  useGetCardioWorkoutsQuery,
} from "../store/cardioSlice";
import { CardioWorkoutItem } from "../components/cardio/CardioWorkoutItem";
import { CardioWorkoutForm } from "../components/cardio/CardioWorkoutForm";
import { CardioWorkout } from "../types/api/cardio";

export const CardioOverview = () => {
  const { data, isLoading, isError } = useGetCardioWorkoutsQuery();
  const [addCardioWorkout, { isLoading: isAdding, isError: isAddError }] =
    useAddCardioWorkoutMutation();

  const handleAdd = async (workout: Partial<CardioWorkout>) => {
    return await addCardioWorkout(workout).unwrap();
  };

  return (
    // list of cardio workouts where top item is a form for adding a new workout.
    <Box>
      <Typography variant="h4">Cardio Tracker</Typography>
      {isLoading && <Typography>Loading...</Typography>}
      {isError && <Typography>Error loading cardio data.</Typography>}
      {isAdding && <Typography>Saving workout...</Typography>}
      {isAddError && (
        <Typography color="error">Failed to save workout.</Typography>
      )}
      {data && (
        <Box>
          <CardioWorkoutForm onSubmit={handleAdd} />
          {data.map((workout) => (
            <CardioWorkoutItem key={workout.id} {...workout} />
          ))}
        </Box>
      )}
    </Box>
  );
};
