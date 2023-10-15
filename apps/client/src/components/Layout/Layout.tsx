import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Header } from "../Header";

export const Layout = () => {
  return (
    <Box height="100vh" width="100vw">
      <Header />
      <Box sx={{ height: "100%", width: "100%", overflow: "hidden" }}>
        <Outlet />
      </Box>
    </Box>
  );
};
