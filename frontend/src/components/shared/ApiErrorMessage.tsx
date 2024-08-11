import { Box, Typography } from "@mui/material";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const ApiErrorMessage = ({
  error,
}: {
  error: FetchBaseQueryError | SerializedError;
}) => {
  if ("status" in error)
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{ color: (theme) => theme.palette.error.main }}
        >
          Something went wrong
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: (theme) => theme.palette.error.main }}
        >
          {"error" in error ? error.error : JSON.stringify(error.data)}
        </Typography>
      </Box>
    );
  return <Typography>{error.message}</Typography>;
};
