import { aspidaClient } from "@/libs/aspida";
import { ROUTE_CONFIG } from "@/routers/config";
import { atom, useAtom } from "jotai";
import { useCallback } from "react";
import { generatePath, useNavigate } from "react-router-dom";

const isAuthenticatedAtom = atom(false);
const isAuthenticatingAtom = atom(true);
const userAtom = atom(null);

const sleep = (timeout = 0) => new Promise((res) => setTimeout(res, timeout));

export const useAuth = () => {
  const navigate = useNavigate();

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
      navigate(generatePath(ROUTE_CONFIG.HOME.PATH));
    },
    [navigate, getMe],
  );

  return { isAuthenticating, isAuthenticated, user, getMe, login };
};
