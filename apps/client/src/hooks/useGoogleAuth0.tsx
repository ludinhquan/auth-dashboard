import { useAuth0 } from "@auth0/auth0-react";
import { useCallback } from "react";

enum Connection {
  Google = "google-oauth2",
}

export const useGoogleAuth = () => {
  const {
    isLoading,
    isAuthenticated,
    logout,
    getAccessTokenSilently,
    ...auth0
  } = useAuth0();

  const loginWithPopup = (connection = Connection.Google) => {
    auth0.loginWithPopup({
      authorizationParams: { connection },
    });
  };

  const getAuthToken = useCallback(async () => {
    const token = await getAccessTokenSilently();
    return token;
  }, [getAccessTokenSilently]);

  return { isLoading, isAuthenticated, loginWithPopup, getAuthToken, logout };
};
