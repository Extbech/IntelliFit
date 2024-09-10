import { Box, CircularProgress, Typography } from "@mui/material";
import { ApiErrorMessage } from "../components/shared/ApiErrorMessage";
import { useGetDietDataQuery } from "../store/dietSlice";

export const DietOverview = () => {
  const { data, error, isLoading } = useGetDietDataQuery();
  if (isLoading && !error) return <CircularProgress />;
  if (error && !data && !isLoading)
    return (
      <Box>
        <ApiErrorMessage error={error} />
      </Box>
    );
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Food Diary
      </Typography>
      <Box
        sx={{
          mt: 5,
          display: "flex",
          flexDirection: "column",
          width: "90%",
        }}
      >
        <p>hi</p>
      </Box>
    </Box>
  );
};
