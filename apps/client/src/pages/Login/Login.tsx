import { useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuth } from "@/hooks";
import { generatePath, useNavigate } from "react-router-dom";
import { ROUTE_CONFIG } from "@/routers/config";
import { GoogleIcon } from "@/components/Icons";
import { useGoogleAuth } from "@/hooks/useGoogleAuth0";
import { CircularProgress } from "@mui/material";

const defaultTheme = createTheme();

export const LoginPage = () => {
  const { isAuthenticated, isLoginLoading, login, loginWithGoogle } = useAuth();
  const {
    isLoading: isGoogleAuthenticating,
    isAuthenticated: isSocialAuthenticated,
    loginWithPopup,
    getAuthToken,
  } = useGoogleAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSocialAuthenticated) return;
    const handleLoginWithGoogle = async () => {
      const token = await getAuthToken();
      await loginWithGoogle({ token });
    };

    handleLoginWithGoogle();
  }, [isSocialAuthenticated, loginWithGoogle, getAuthToken]);

  useEffect(() => {
    if (isAuthenticated) navigate(generatePath(ROUTE_CONFIG.HOME.PATH));
  }, [navigate, isAuthenticated]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const body = {
      email: data.get("email") as string,
      password: data.get("password") as string,
    };

    await login(body);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              size="small"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              size="small"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, textTransform: "none" }}
              disabled={isLoginLoading}
            >
              {isLoginLoading && (
                <CircularProgress size="20px" sx={{ mr: "10px" }} />
              )}
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link variant="body2">{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>

            <Button
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => loginWithPopup()}
              disabled={isGoogleAuthenticating}
            >
              {isGoogleAuthenticating && (
                <CircularProgress size="20px" sx={{ mr: "10px" }} />
              )}
              <GoogleIcon width="20px" height="20px" />
              <Typography sx={{ ml: "10px", textTransform: "none" }}>
                Continue with Google
              </Typography>
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
