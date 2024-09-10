import { Box, Typography } from "@mui/material";

export const FoodItemRow = ({ foodItem }: { FoodItem: unknown }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "50px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
      }}
    >
      <Box>
        <Typography>{foodItem}</Typography>
      </Box>
      <Box>
        <Typography>{foodItem}</Typography>
      </Box>
      <Box>
        <Typography>{foodItem}</Typography>
      </Box>
      <Box>
        <Typography>{foodItem}</Typography>
      </Box>
      <Box>
        <Typography>{foodItem}</Typography>
      </Box>
    </Box>
  );
};
