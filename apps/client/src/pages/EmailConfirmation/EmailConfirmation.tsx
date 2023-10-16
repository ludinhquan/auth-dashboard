import { Loading } from "@/components/Loading";
import { useAuth } from "@/hooks";
import { aspidaClient } from "@/libs/aspida";
import { ROUTE_CONFIG } from "@/routers/config";
import { Box, Alert, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const EmailConfirmation = () => {
  const [isVerified, setVerified] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { getMe } = useAuth();

  const token = searchParams.get("token") ?? "";

  const handleConfirmToken = async (token: string) => {
    try {
      setIsLoading(true);
      await aspidaClient.email_confirmation.confirm.post({
        body: { token },
      });
      await getMe();
      setVerified(true);
    } catch (e) {
      setError((e as any).response?.data?.errors?.[0]?.message);
      setVerified(false);
    }

    setTimeout(() => {
      navigate(ROUTE_CONFIG.HOME.PATH);
    }, 1500);

    setIsLoading(false);
  };

  useEffect(() => {
    handleConfirmToken(token);
  }, []);

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
        {isLoading ? (
          <Loading>
            <CircularProgress />
          </Loading>
        ) : isVerified ? (
          <Alert severity="success">Email Verified</Alert>
        ) : (
          <Alert severity="error">{error}</Alert>
        )}
      </Box>
    </Box>
  );
};
