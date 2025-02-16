import heroTest from "../../assets/Images/hero-image-test.png";
export default function Hero() {
  return (
    <div className="">
      <img
        className="w-full aspect-video max-h-[720px] object-cover mx-auto"
        src={heroTest}
        alt=""
      />
    </div>
  );
}
