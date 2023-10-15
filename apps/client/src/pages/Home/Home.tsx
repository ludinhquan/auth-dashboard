import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Layout } from "../../components/Layout";

export const HomePage = () => {
  console.log("HomePage");
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated) return;
    googleAuthenticate();
  }, [isAuthenticated]);

  const googleAuthenticate = async () => {
    const token = await getAccessTokenSilently();
    const response = await fetch(
      "http://localhost:4000/google-authentication",
      {
        method: "POST",
        body: JSON.stringify({ token }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    await response.json();
  };

  return <Layout />;
};
