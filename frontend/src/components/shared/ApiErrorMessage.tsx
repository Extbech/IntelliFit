import { Alert, Box } from "@mui/material";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const ApiErrorMessage = ({
  error,
}: {
  error: FetchBaseQueryError | SerializedError;
}) => {
  if ("status" in error) {
    const errorMessage = "error" in error ? error.error : JSON.stringify(error.data);
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <Alert severity="error" sx={{ maxWidth: 500 }}>
          {errorMessage}
        </Alert>
      </Box>
    );
  }
  return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
      <Alert severity="error" sx={{ maxWidth: 500 }}>
        {error.message}
      </Alert>
    </Box>
  );
};
