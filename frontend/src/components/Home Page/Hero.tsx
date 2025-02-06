import heroTest from "../../assets/Images/hero-image-test.png";
export default function Hero() {
  return (
    <div className="">
      <img
        className="w-full max-h-[720px] border2 object-cover mx-auto"
        src={heroTest}
        alt=""
      />
    </div>
  );
}
