import { ReactNode } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

type Props = {
  children: ReactNode;
};
export default function GoogleAuthWrapper({ children }: Props) {
  const clientId: string = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  if (!clientId) {
    throw new Error("Google auth client id not provided");
  }
  return (
    <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>
  );
}
