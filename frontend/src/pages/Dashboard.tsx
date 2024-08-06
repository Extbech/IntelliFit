import { Box, Typography } from "@mui/material";
import { WeightTracker } from "../components/dashboard/WeightTracker";
import { StrengthTracker } from "../components/dashboard/StrengthTracker";

export const Dashboard = () => {
  return (
    <Box
      sx={{
        width: "95%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h3" gutterBottom>
        Dashboard n' stuff
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          mt: 5,
        }}
      >
        <WeightTracker />
        <StrengthTracker />
      </Box>
    </Box>
  );
};
