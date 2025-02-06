import React, { ReactNode } from "react";
import { AppState, Auth0Provider, User } from "@auth0/auth0-react";
type Props = {
  children: ReactNode;
};

export default function AuthZeroProviderWithNaviagte({ children }: Props) {
  const domain: string = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId: string = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const callbackUrl: string = import.meta.env.VITE_AUTH0_CALLBACK_URL;
  if (!domain || !clientId || callbackUrl) {
    throw new Error("Unable to initailize Auth0 SDK");
  }
  const redirectCallBack = (user?: User, appState?: AppState) => {
    console.log("user", user, "Appstate", appState);
  };
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: callbackUrl,
      }}
      onRedirectCallback={redirectCallBack}
    >
      {children}
    </Auth0Provider>
  );
}
