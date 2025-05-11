import { Box, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const drawerWidth = "200px";

export const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        mt: "64px",
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          marginTop: "64px",
        },
      }}
    >
      <Box sx={{ overflow: "auto" }}>
        <List>
          <ListItem button component={Link} to="/IntelliFit/diet/overview">
            <ListItemText primary="Diet" />
          </ListItem>
          <ListItem button component={Link} to="/IntelliFit/strength/overview">
            <ListItemText primary="Strength" />
          </ListItem>
          <ListItem button component={Link} to="/IntelliFit/cardio/overview">
            <ListItemText primary="Cardio" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};
