import { Button } from "../ui/button";
import googleIcon from "../../assets/Images/google-icon.png";
export default function GoogleLogin() {
  return (
    <Button className="bg-white border text-gray-600 font-bold text-lg py-6 hover:bg-black hover:text-white hover:border-white">
      <img className="w-12" src={googleIcon} alt="" /> Google
    </Button>
  );
}
