import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Loading = styled(Grid)(() => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
}));
