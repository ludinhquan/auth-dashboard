import { useAuth, useSnackbar } from "@/hooks";
import { aspidaClient } from "@/libs/aspida";
import { Person } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

export const Profile = () => {
  const { user, updateUserName } = useAuth();
  const [name, setName] = useState(user?.name);
  const [error, setError] = useState("");
  const snackbar = useSnackbar();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    if (name.length === 0) return setError("Name is required");

    await aspidaClient.user.patch({ body: { name } });
    updateUserName(name);
    snackbar({ message: "Update successfully!", severity: "success" });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        background: "#fafafa",
        height: "100%",
      }}
    >
      <Box sx={{ paddingTop: "8vh", width: "40vw" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Person sx={{ fontSize: "50px" }} />
          <Typography sx={{ fontSize: "36px" }}>My Profile</Typography>
        </Box>

        <Typography sx={{ fontSize: "20px", mt: "10px" }}>
          Basic information
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            name="name"
            fullWidth
            margin="normal"
            value={name}
            error={!!error}
            helperText={error}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            disabled
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={user?.email}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: "10px" }}
          >
            Save
          </Button>
        </form>
      </Box>
    </Box>
  );
};
