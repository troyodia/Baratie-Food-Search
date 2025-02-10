import { Button } from "../ui/button";
import googleIcon from "../../assets/Images/google-icon.png";
import { CodeResponse, useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "@/apis/auth";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
export default function GoogleLogin() {
  const [googleAuthRes, setGoogleAuthRes] = useState<CodeResponse>();
  const { data } = useQuery({
    queryKey: ["googleAuthResponse"],
    queryFn: () => {
      if (googleAuthRes) googleAuth(googleAuthRes);
    },
  });
  console.log(data);
  const handleGoogleResponse = (codeResponse: CodeResponse) => {
    console.log(codeResponse);
    setGoogleAuthRes(codeResponse);
  };
  const handleErrorRepsonse = (errorResponse: Pick<CodeResponse, "error">) => {
    console.log(errorResponse);
  };
  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleResponse,
    onError: handleErrorRepsonse,
    flow: "auth-code",
  });
  return (
    <Button
      className="bg-white border text-gray-600 font-bold text-lg py-6 hover:bg-black hover:text-white hover:border-white"
      type="button"
      onClick={googleLogin}
    >
      <img className="w-12" src={googleIcon} alt="" /> Google
    </Button>
  );
}
