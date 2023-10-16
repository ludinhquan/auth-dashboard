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
import { WelcomePage } from "@/pages/Welcome";
import { EmailConfirmation } from "@/pages/EmailConfirmation";
import { SettingPage } from "@/pages/Settings";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routers />
    </BrowserRouter>
  );
};

const ProtectedRoute = () => {
  const { isAuthenticating, isAuthenticated, user } = useAuth();

  if (isAuthenticating) return <LoadingPage />;

  if (!isAuthenticated)
    return <Navigate to={ROUTE_CONFIG.LOGIN.PATH} replace />;

  if (!user?.isEmailConfirmed) return <WelcomePage />;

  return <Layout />;
};

const LoginRoute = () => {
  const { isAuthenticating, isAuthenticated } = useAuth();

  if (isAuthenticating) return <LoadingPage />;

  if (!isAuthenticated) return <Outlet />;

  return <Navigate to={ROUTE_CONFIG.HOME.PATH} replace />;
};

const Routers = () => {
  const { getMe } = useAuth();

  useEffect(() => {
    getMe();
  }, [getMe]);

  return (
    <Routes>
      <Route element={<LoginRoute />}>
        <Route path={ROUTE_CONFIG.LOGIN.PATH} element={<LoginPage />} />
      </Route>
      <Route
        path={ROUTE_CONFIG.EMAIL_CONFIRMATION.PATH}
        element={<EmailConfirmation />}
      />
      <Route element={<ProtectedRoute />}>
        <Route path={ROUTE_CONFIG.HOME.PATH} element={<HomePage />} />
        <Route path={ROUTE_CONFIG.PROFILE.PATH} element={<Profile />} />
        <Route path={ROUTE_CONFIG.SETTING.PATH} element={<SettingPage />} />
      </Route>
      <Route path="*" element={<Navigate to={ROUTE_CONFIG.HOME.PATH} />} />
    </Routes>
  );
};
