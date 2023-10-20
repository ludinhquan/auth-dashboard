import { useEffect, useState } from "react";
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
import { useValidateForm } from "./useValidateForm";
import { PasswordInput } from "./PasswordInput";

const defaultTheme = createTheme();

enum FormMode {
  Login = "login",
  Register = "register",
}

export const LoginPage = () => {
  const { isAuthenticated, isLoginLoading, login, loginWithGoogle, register } =
    useAuth();
  const {
    isLoading: isGoogleAuthenticating,
    isAuthenticated: isSocialAuthenticated,
    loginWithPopup,
    getAuthToken,
  } = useGoogleAuth();

  const [formMode, setFormMode] = useState(FormMode.Login);
  const isLoginMode = formMode === FormMode.Login;

  const { errors, validate } = useValidateForm({ isLoginMode });

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

    const data = validate(new FormData(event.currentTarget));
    if (!data) return;

    const handlers = {
      [FormMode.Login]: login,
      [FormMode.Register]: register,
    };

    try {
      await handlers[formMode](data);
    } catch (e) {
      console.log({ e });
    }
  };

  const switchFormMode = () => {
    setFormMode((prevMode) =>
      prevMode === FormMode.Login ? FormMode.Register : FormMode.Login,
    );
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          key={formMode}
          sx={{
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Welcome
          </Typography>
          <Typography component="p" variant="h5" fontSize="16px">
            {isLoginMode ? "Login to continue" : "Sign up to continue"}
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
              error={!!errors.email}
              helperText={errors.email}
            />
            <PasswordInput
              margin="normal"
              required
              size="small"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!errors.password}
              helperText={errors.password}
            />
            {!isLoginMode && (
              <PasswordInput
                margin="normal"
                required
                size="small"
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
              />
            )}
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
              Continue
            </Button>
            <Grid container>
              <Grid item>
                <Typography>
                  {isLoginMode
                    ? "Don't have an account? "
                    : "Already have an account? "}
                  <Link
                    onClick={switchFormMode}
                    sx={{
                      ":hover": { cursor: "pointer" },
                      textDecoration: "none",
                    }}
                  >
                    {isLoginMode ? "Sign up" : "Login"}
                  </Link>
                </Typography>
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
