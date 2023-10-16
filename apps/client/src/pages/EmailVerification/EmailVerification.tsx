import { ResendEmailResponseDto } from "@/api/@types";
import { useSnackbar } from "@/hooks";
import { useCountDown } from "@/hooks/useCountdown";
import { aspidaClient } from "@/libs/aspida";
import { Box, Button, Typography } from "@mui/material";

export const EmailVerification = () => {
  const { timeRemaining, setTimeRemaining } = useCountDown(0);
  const snackbar = useSnackbar();

  const handleCountdownTime = (data: ResendEmailResponseDto) => {
    const { lastTimeSendEmailConfirmation, resendTimeConfig } = data;

    setTimeRemaining(
      Math.floor(
        resendTimeConfig -
          (new Date().getTime() -
            new Date(lastTimeSendEmailConfirmation).getTime()) /
            1000,
      ),
    );
  };

  const resendConfirmationLink = async () => {
    try {
      const result =
        await aspidaClient.email_confirmation.resend_confirmation_link.post();
      handleCountdownTime(result.body);
    } catch (e) {
      snackbar({ message: "Too Many Requests", severity: "error" });
      handleCountdownTime((e as any).response.data.errors[0].data);
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
          Resend Email Verification {timeRemaining > 0 && `${timeRemaining}s`}
        </Button>
      </Box>
    </Box>
  );
};
