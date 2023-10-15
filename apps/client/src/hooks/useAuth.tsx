import { aspidaClient } from "@/libs/aspida";
import { atom, useAtom } from "jotai";
import { useCallback } from "react";

const isAuthenticatedAtom = atom(false);
const isAuthenticatingAtom = atom(true);
const userAtom = atom(null);

const sleep = (timeout = 0) => new Promise((res) => setTimeout(res, timeout));

export const useAuth = () => {
  const [isAuthenticating, setIsAuthenticating] = useAtom(isAuthenticatingAtom);
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [user, setUser] = useAtom(userAtom);

  const getMe = useCallback(async () => {
    setIsAuthenticating(true);
    try {
      const user = await aspidaClient.me.get();
      await sleep();
      setIsAuthenticated(true);
      setUser(user);
    } catch (e) {
      console.log("login error", e);
    }

    setIsAuthenticating(false);
  }, [setIsAuthenticated, setIsAuthenticating, setUser]);

  const login = useCallback(
    async (data: { email: string; password: string }) => {
      await aspidaClient.login.post({ body: data });
      await getMe();
    },
    [getMe],
  );

  const logout = useCallback(async () => {
    await aspidaClient.logout.post();
    setIsAuthenticated(false);
    setUser(null);
  }, [setIsAuthenticated, setUser]);

  return { isAuthenticating, isAuthenticated, user, getMe, login, logout };
};
