import { useAuth, useSnackbar } from "@/hooks";
import { aspidaClient } from "@/libs/aspida";
import { Settings } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { PasswordInput } from "../Login/PasswordInput";
import { validatePassword } from "@lib/core";
import { useNavigate } from "react-router-dom";
import { ROUTE_CONFIG } from "@/routers/config";

export const SettingPage = () => {
  const { user } = useAuth();
  const snackbar = useSnackbar();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const oldPassword = formData.get("oldPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    const newErrors = {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    };

    const validatePasswordResult = validatePassword(newPassword);
    if (validatePasswordResult)
      newErrors.newPassword = validatePasswordResult[0];

    if (newPassword !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) return;

    const data = { oldPassword, newPassword };

    try {
      await aspidaClient.reset_password.post({ body: data });
      snackbar({
        message: "Update password successfully!",
        severity: "success",
      });
      navigate(ROUTE_CONFIG.HOME.PATH);
    } catch (e) {
      snackbar({
        message: (e as any).response?.data?.errors?.[0]?.message,
        severity: "error",
        description: "Old password invalid",
      });
    }
  };

  const isRegisteredWithGoogle = user?.isRegisteredWithGoogle;

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
          <Settings sx={{ fontSize: "40px", mr: "10px" }} />
          <Typography sx={{ fontSize: "36px" }}>Settings</Typography>
        </Box>

        <Typography sx={{ fontSize: "20px", mt: "10px" }}>
          Change Password
        </Typography>

        {isRegisteredWithGoogle && (
          <Typography
            sx={{ fontSize: "16px", mt: "10px", fontStyle: "italic" }}
          >
            *** We cannot change the password for a user who has registered with
            Google.
          </Typography>
        )}
        {!isRegisteredWithGoogle && (
          <form onSubmit={handleSubmit}>
            <PasswordInput
              margin="normal"
              required
              fullWidth
              name="oldPassword"
              label="Old Password"
              type="oldPassword"
              autoComplete="current-password"
              disabled={isRegisteredWithGoogle}
              error={!!errors.oldPassword}
              helperText={errors.oldPassword}
            />

            <PasswordInput
              margin="normal"
              required
              fullWidth
              name="newPassword"
              label="New Password"
              type="password"
              autoComplete="current-password"
              disabled={isRegisteredWithGoogle}
              error={!!errors.newPassword}
              helperText={errors.newPassword}
            />
            <PasswordInput
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              autoComplete="current-password"
              disabled={isRegisteredWithGoogle}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
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
        )}
      </Box>
    </Box>
  );
};
