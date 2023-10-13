import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Layout } from "../../components/Layout";

export const HomePage = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
    loginWithPopup,
    logout,
  } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated) return;
    googleAuthenticate();
  }, [isAuthenticated]);

  const googleAuthenticate = async () => {
    const token = await getAccessTokenSilently();
    console.log({ token });
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

  if (isLoading) return <div>Loading</div>;

  return (
    <>
      <h1>{user?.name}</h1>
      <div className="card">
        {isAuthenticated && (
          <button onClick={googleAuthenticate}>Re Auth</button>
        )}
        {!isAuthenticated ? (
          <button
            onClick={() =>
              loginWithPopup({
                authorizationParams: { connection: "google-oauth2" },
              })
            }
          >
            Login
          </button>
        ) : (
          <button onClick={() => logout()}>Logout</button>
        )}
      </div>
    </>
  );
};
