import { Box, Button, TextField, Typography, Stack } from "@mui/material";
import { WeightEntry } from "../../types/api/weight";
import { ChangeEvent, useState } from "react";

type WeightEntryFormProps = {
  onSubmit: (entry: WeightEntry) => Promise<void>;
  isLoading?: boolean;
  isError?: boolean;
};

export const WeightEntryForm = ({
  onSubmit,
  isLoading,
  isError,
}: WeightEntryFormProps) => {
  const [weight, setWeight] = useState<string>("");
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0],
  );

  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (Number.isFinite(+value) || value === "") {
      setWeight(value);
    }
  };

  const handleSubmit = async () => {
    const weightValue = Number(weight);
    if (weightValue <= 0) {
      alert("Please enter a valid weight greater than 0");
      return;
    }

    try {
      await onSubmit({
        weight: weightValue,
        date: new Date(date).toISOString(),
      });
      // Reset form
      setWeight("");
      setDate(new Date().toISOString().split("T")[0]);
    } catch (error) {
      console.error("Failed to submit weight entry:", error);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Log Weight Entry
      </Typography>
      <Stack spacing={3}>
        <TextField
          label="Weight (kg)"
          type="number"
          fullWidth
          value={weight}
          onChange={handleWeightChange}
          helperText="Enter your weight in kilograms"
        />
        <TextField
          label="Date"
          type="date"
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        {isError && (
          <Typography color="error" variant="body2">
            Failed to save weight entry. Please try again.
          </Typography>
        )}
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isLoading || !weight}
          fullWidth
        >
          {isLoading ? "Saving..." : "Save Entry"}
        </Button>
      </Stack>
    </Box>
  );
};
