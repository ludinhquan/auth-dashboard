import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

import { ROUTE_CONFIG } from "./config";
import { LoginPage } from "../pages/Login";
import { HomePage } from "../pages/Home";
import { useAuth } from "@/hooks";
import { useEffect } from "react";
import { LoadingPage } from "@/pages/Loading/Loading";
import { Layout } from "@/components/Layout";
import { Profile } from "@/pages/Profile";
import { EmailVerification } from "@/pages/EmailVerification";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routers />
    </BrowserRouter>
  );
};

const ProtectedRoute = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated)
    return <Navigate to={ROUTE_CONFIG.LOGIN.PATH} replace />;

  if (!user?.isEmailConfirmed) return <EmailVerification />;

  return <Layout />;
};

const LoginRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Outlet />;

  return <Navigate to={ROUTE_CONFIG.HOME.PATH} replace />;
};

const Routers = () => {
  const { isAuthenticating, getMe } = useAuth();

  useEffect(() => {
    getMe();
  }, [getMe]);

  if (isAuthenticating) return <LoadingPage />;

  return (
    <Routes>
      <Route element={<LoginRoute />}>
        <Route path={ROUTE_CONFIG.LOGIN.PATH} element={<LoginPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path={ROUTE_CONFIG.HOME.PATH} element={<HomePage />} />
        <Route path={ROUTE_CONFIG.PROFILE.PATH} element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to={ROUTE_CONFIG.HOME.PATH} />} />
    </Routes>
  );
};
