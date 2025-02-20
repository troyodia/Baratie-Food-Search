import { ReactNode } from "react";
import { Button } from "./button";
type props = {
  children: ReactNode;
  disabled?: boolean;
};
export default function SubmitButton({ children, disabled }: props) {
  return (
    <Button
      disabled={disabled}
      className="py-6 px-4  text-white border-2 bg-black hover:bg-transparent
     hover:text-black hover:border-2 hover:border-[#75AAF0] transition-all ease-in "
      type="submit"
    >
      {children}
    </Button>
  );
}
