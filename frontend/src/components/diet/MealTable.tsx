import { Box } from "@mui/material";

export const MealTable = ({ foodItems }: { foodItems: unknown[] }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {foodItems.map((f) => {
        return <div />;
      })}
    </Box>
  );
};
