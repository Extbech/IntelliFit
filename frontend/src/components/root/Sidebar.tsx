import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { NavLink } from "react-router-dom";

const drawerWidth = "200px";

export const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        mt: "56px",
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          marginTop: "56px",
        },
      }}
    >
      <Box sx={{ overflow: "auto" }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              component={NavLink}
              to="/IntelliFit/diet/overview"
              sx={{
                "&.active": {
                  backgroundColor: "primary.light",
                  color: "primary.contrastText",
                  fontWeight: 700,
                },
              }}
            >
              <ListItemText primary="Diet" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={NavLink}
              to="/IntelliFit/strength/overview"
              sx={{
                "&.active": {
                  backgroundColor: "primary.light",
                  color: "primary.contrastText",
                  fontWeight: 700,
                },
              }}
            >
              <ListItemText primary="Strength" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={NavLink}
              to="/IntelliFit/cardio/overview"
              sx={{
                "&.active": {
                  backgroundColor: "primary.light",
                  color: "primary.contrastText",
                  fontWeight: 700,
                },
              }}
            >
              <ListItemText primary="Cardio" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};
