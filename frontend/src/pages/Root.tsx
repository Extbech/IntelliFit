import { Box } from "@mui/material";
import { Sidebar } from "../components/root/Sidebar";
import { Navbar } from "../components/root/Navbar";
import { Outlet } from "react-router-dom";

export const Root = () => {
  return (
    <Box>
      <Navbar />
      <Sidebar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          ml: "200px",
          mt: "100px",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
