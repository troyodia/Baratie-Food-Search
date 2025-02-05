import hero from "../../assets/Images/hero-image.jpg";
export default function Hero() {
  return (
    <div className="">
      <img
        className="w-2/3 max-h-[700px] object-cover mx-auto"
        src={hero}
        alt=""
      />
    </div>
  );
}
