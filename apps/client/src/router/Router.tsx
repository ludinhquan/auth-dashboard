import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { ROUTE_CONFIG } from "./config";
import { LoginPage } from "../pages/Login";
import { HomePage } from "../pages/Home";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routers />
    </BrowserRouter>
  );
};

const Routers = () => {
  return (
    <Routes>
      <Route path={ROUTE_CONFIG.HOME.PATH} element={<HomePage />}></Route>
      <Route path={ROUTE_CONFIG.LOGIN.PATH} element={<LoginPage />}></Route>
      <Route path="*" element={<Navigate to={ROUTE_CONFIG.HOME.PATH} />} />
    </Routes>
  );
};
