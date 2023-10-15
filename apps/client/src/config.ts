export function getConfig() {
  return {
    apiEndpoint: import.meta.env.VITE_BASE_URL,
    auth0: {
      domain: import.meta.env.VITE_AUTH0_DOMAIN,
      clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
      audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    },
  };
}
