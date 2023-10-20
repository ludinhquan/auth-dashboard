import { aspidaClient } from "@/libs/aspida";
import { atom, useAtom } from "jotai";
import { useCallback } from "react";
import { useSnackbar } from "./useSnackbar";
import { UserDto } from "@/api/@types";

const isAuthenticatedAtom = atom(false);
const isAuthenticatingAtom = atom(true);
const isLoginLoadingAtom = atom(false);
const userAtom = atom<UserDto | null>(null);

const sleep = (timeout = 0) => new Promise((res) => setTimeout(res, timeout));

export const useAuth = () => {
  const [isAuthenticating, setIsAuthenticating] = useAtom(isAuthenticatingAtom);
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [isLoginLoading, setIsLoginLoading] = useAtom(isLoginLoadingAtom);
  const [user, setUser] = useAtom(userAtom);
  const snackbar = useSnackbar();

  const getMe = useCallback(async () => {
    setIsAuthenticating(true);
    try {
      const result = await aspidaClient.me.get();
      await sleep();
      setIsAuthenticated(true);
      setUser(result.body);
    } catch (e) {
      console.log((e as Error).message);
    }

    setIsAuthenticating(false);
  }, [setIsAuthenticated, setIsAuthenticating, setUser]);

  const loginWithGoogle = useCallback(
    async (data: { token: string }) => {
      await aspidaClient.google_authentication.post({ body: data });
      await getMe();
    },
    [getMe],
  );

  const login = useCallback(
    async (data: { email: string; password: string }) => {
      try {
        setIsLoginLoading(true);
        await aspidaClient.login.post({ body: data });
        await getMe();
      } catch (e) {
        snackbar({
          severity: "error",
          message: "Wrong Credentials",
          description: "Invalid email or password",
        });
      }
      setIsLoginLoading(false);
    },
    [getMe, setIsLoginLoading, snackbar],
  );

  const register = useCallback(
    async (data: { email: string; password: string }) => {
      try {
        setIsLoginLoading(true);
        await aspidaClient.register.post({ body: data });
        await getMe();
      } catch (e) {
        const status = (e as any).response?.data?.status;

        snackbar({
          severity: "error",
          message: status,
        });
      }
      setIsLoginLoading(false);
    },
    [getMe, setIsLoginLoading, snackbar],
  );

  const logout = useCallback(async () => {
    await aspidaClient.logout.post();
    setIsAuthenticated(false);
    setUser(null);
  }, [setIsAuthenticated, setUser]);

  const updateUserName = (name: string) => {
    setUser({ ...user, name } as UserDto);
  };

  return {
    isAuthenticating,
    isAuthenticated,
    isLoginLoading,
    user,

    // Method for auth
    getMe,
    updateUserName,
    register,
    login,
    loginWithGoogle,
    logout,
  };
};
