import { Box, CircularProgress, Typography } from "@mui/material";
import { useGetUserInfoQuery } from "../store/userSlice";
import { ApiErrorMessage } from "../components/shared/ApiErrorMessage";

export const DietOverview = () => {
  const { data, error, isLoading } = useGetUserInfoQuery();
  if (isLoading && !error) return <CircularProgress />;
  if (error && !data && !isLoading)
    return (
      <Box>
        <ApiErrorMessage error={error} />
      </Box>
    );
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Diet Tracker
      </Typography>
      <Typography>{data}</Typography>
    </Box>
  );
};
