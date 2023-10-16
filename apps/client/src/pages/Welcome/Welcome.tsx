import { ResendEmailResponseDto } from "@/api/@types";
import { useSnackbar, useCountDown } from "@/hooks";
import { aspidaClient } from "@/libs/aspida";
import { Box, Button, Typography } from "@mui/material";

export const WelcomePage = () => {
  const { timeRemaining, setTimeRemaining } = useCountDown(0);
  const snackbar = useSnackbar();

  const getTimeRemaining = (data: ResendEmailResponseDto) => {
    const { lastTimeSendEmailConfirmation, resendTimeConfig } = data;

    const timeRemainingInMilliseconds =
      new Date().getTime() - new Date(lastTimeSendEmailConfirmation).getTime();

    return Math.floor(resendTimeConfig - timeRemainingInMilliseconds / 1000);
  };

  const resendConfirmationLink = async () => {
    try {
      const result =
        await aspidaClient.email_confirmation.resend_confirmation_link.post();
      setTimeRemaining(getTimeRemaining(result.body));
    } catch (e) {
      snackbar({ message: "Too Many Attempts", severity: "error" });

      setTimeRemaining(
        getTimeRemaining((e as any).response?.data?.errors?.[0]?.data),
      );
    }
  };

  return (
    <Box
      sx={{
        background: "#fafafa",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          flexDirection: "column",
          display: "flex",
          alignItems: "center",
          pt: "35vh",
        }}
      >
        <Typography>
          Welcome to Aha! You will need to verify your email address to get
          started with us.
        </Typography>
        <Button
          variant="outlined"
          sx={{ mt: "30px", textTransform: "none" }}
          onClick={resendConfirmationLink}
          disabled={timeRemaining > 0}
        >
          {timeRemaining > 0
            ? `Continue in ${timeRemaining}s`
            : "Resend Email Verification"}
        </Button>
      </Box>
    </Box>
  );
};
