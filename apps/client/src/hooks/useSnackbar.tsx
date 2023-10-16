import { Alert, AlertColor, AlertTitle, Snackbar } from "@mui/material";
import { atom, useAtom } from "jotai";
import { ReactNode, useCallback } from "react";

type SnackbarContextType = {
  severity: AlertColor;
  message: string;
  open: boolean;
  description?: string;
};

const snackbarAtom = atom<SnackbarContextType>({
  open: false,
  message: "",
  description: "",
  severity: "success",
});

export const useSnackbar = () => {
  const [, setSnackbarData] = useAtom(snackbarAtom);
  const updateSnackbar = useCallback(
    (data: { message: string; severity: AlertColor; description?: string }) =>
      setSnackbarData({ ...data, open: true }),
    [setSnackbarData],
  );
  return updateSnackbar;
};

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [{ message, severity, open, description }, setContext] =
    useAtom(snackbarAtom);
  const handleClose = useCallback(() => {
    setContext((c) => ({ ...c, open: false }));
  }, [setContext]);

  return (
    <>
      {children}
      <Snackbar
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={severity}>
          <AlertTitle>{message}</AlertTitle>
          {description}
        </Alert>
      </Snackbar>
    </>
  );
};
