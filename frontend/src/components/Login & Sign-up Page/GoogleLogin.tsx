import { Button } from "../ui/button";
import googleIcon from "../../assets/Images/google-icon.png";
import { CodeResponse, useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "@/apis/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
type GoogleLoginProps = {
  setGoogleLoginError: () => void;
};
export default function GoogleLogin({ setGoogleLoginError }: GoogleLoginProps) {
  const naviagte = useNavigate();
  const location = useLocation();
  const client = useQueryClient();
  const from = location.state?.from?.pathname || "/";
  const { mutate } = useMutation({
    mutationKey: ["googleAuthRes"],
    mutationFn: (code: string) => googleAuth(code, setGoogleLoginError),
    onSuccess: (data) => {
      client.setQueryData(["user"], data);
      naviagte(from, { replace: true });
    },
  });
  const handleGoogleResponse = (codeResponse: CodeResponse) => {
    if (codeResponse["code"]) {
      mutate(codeResponse["code"]);
    }
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
      onClick={() => {
        googleLogin();
      }}
    >
      <img className="w-12" src={googleIcon} alt="" /> Google
    </Button>
  );
}
