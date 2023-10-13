import { Auth0Provider, Auth0ProviderOptions } from "@auth0/auth0-react";
import { getConfig } from "./config";
import { Router } from "./router";

const config = getConfig();

const providerConfig: Auth0ProviderOptions = {
  domain: config.domain,
  clientId: config.clientId,
  authorizationParams: {
    redirect_uri: window.location.origin,
    ...(config.audience ? { audience: config.audience } : null),
    scope: "openid profile email",
  },
};

export const App = () => {
  return (
    <Auth0Provider {...providerConfig}>
      <Router />
    </Auth0Provider>
  );
};
