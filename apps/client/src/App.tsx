import { Auth0Provider, Auth0ProviderOptions } from "@auth0/auth0-react";
import { getConfig } from "./config";
import { Router } from "./routers";
import { SnackbarProvider } from "./hooks";

const config = getConfig();

const providerConfig: Auth0ProviderOptions = {
  domain: config.auth0.domain,
  clientId: config.auth0.clientId,
  authorizationParams: {
    redirect_uri: window.location.origin,
    audience: config.auth0.audience,
    scope: "openid profile email",
  },
};

export const App = () => {
  return (
    <SnackbarProvider>
      <Auth0Provider {...providerConfig}>
        <Router />
      </Auth0Provider>
    </SnackbarProvider>
  );
};
