import { Button } from "./ui/button";

export default function DesktopNav() {
  return (
    <div className="hidden sm:flex">
      <Button
        className=" text-[#75AAF0] hover:text-white hover:bg-[#75AAF0] text-sm font-bold"
        variant="ghost"
      >
        Log In
      </Button>
    </div>
  );
}
