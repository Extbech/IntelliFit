import { Box, Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
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
          <ListItem component={Link} to="/IntelliFit/diet/overview">
            <ListItemButton>
              <ListItemText primary="Diet" />
            </ListItemButton>
          </ListItem>
          <ListItem component={Link} to="/IntelliFit/strength/overview">
            <ListItemButton>
              <ListItemText primary="Strength" />
            </ListItemButton>
          </ListItem>
          <ListItem component={Link} to="/IntelliFit/cardio/overview">
            <ListItemButton>
              <ListItemText primary="Cardio" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};
