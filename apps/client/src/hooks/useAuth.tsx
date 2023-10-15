import { aspidaClient } from "@/libs/aspida";
import { atom, useAtom } from "jotai";
import { useCallback } from "react";

const isAuthenticatedAtom = atom(false);
const isAuthenticatingAtom = atom(true);
const isLoginLoadingAtom = atom(false);
const userAtom = atom(null);

const sleep = (timeout = 0) => new Promise((res) => setTimeout(res, timeout));

export const useAuth = () => {
  const [isAuthenticating, setIsAuthenticating] = useAtom(isAuthenticatingAtom);
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [isLoginLoading, setIsLoginLoading] = useAtom(isLoginLoadingAtom);
  const [user, setUser] = useAtom(userAtom);

  const getMe = useCallback(async () => {
    setIsAuthenticating(true);
    try {
      const user = await aspidaClient.me.get();
      await sleep();
      setIsAuthenticated(true);
      setUser(user);
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
        console.log((e as Error).message);
      }
      setIsLoginLoading(false);
    },
    [getMe, setIsLoginLoading],
  );

  const logout = useCallback(async () => {
    await aspidaClient.logout.post();
    setIsAuthenticated(false);
    setUser(null);
  }, [setIsAuthenticated, setUser]);

  return {
    isAuthenticating,
    isAuthenticated,
    isLoginLoading,
    user,

    // Method for auth
    getMe,
    login,
    loginWithGoogle,
    logout,
  };
};
