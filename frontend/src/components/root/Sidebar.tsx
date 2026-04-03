import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
const drawerWidth = "200px";

export const Sidebar = () => {
  const location = useLocation();
  const isCardioRoute = location.pathname.includes("/cardio");

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
                  backgroundColor: "primary.dark",
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
                  backgroundColor: "primary.dark",
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
              to="/IntelliFit/cardio"
              sx={{
                "&.active": {
                  backgroundColor: "primary.dark",
                  color: "primary.contrastText",
                  fontWeight: 700,
                },
              }}
            >
              <ListItemText primary="Cardio" />
            </ListItemButton>
          </ListItem>

          {/* Cardio sub-routes */}
          {isCardioRoute && (
            <>
              <ListItem disablePadding>
                <ListItemButton
                  component={NavLink}
                  to="/IntelliFit/cardio/workouts"
                  sx={{
                    "&.active": {
                      backgroundColor: "primary.light",
                      color: "primary.contrastText",
                    },
                  }}
                >
                  <ListItemText
                    primary="Workouts"
                    sx={{ pl: 2 }}
                    slotProps={{
                      primary: { fontSize: "0.825rem", fontWeight: 400 },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>
      </Box>
    </Drawer>
  );
};
