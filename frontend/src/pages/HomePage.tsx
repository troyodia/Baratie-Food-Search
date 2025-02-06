import Layout from "@/layouts/Layout";
import phoneOrderImage from "../assets/Images/landing-page-image-1.png";
import appStoreImage from "../assets/Images/landing-page-image-2.png";
export default function HomePage() {
  return (
    <Layout>
      <main className=" flex flex-col items-center gap-12 mx-6 mb-12">
        <section
          className=" bg-[#282828] -mt-24 w-full max-w-[1000px] py-6 flex flex-col items-center gap-3 rounded-md hover:shadow-lg hover:shadow-[#c5d8f9]
        transition-shadow ease-in-out delay-150 "
        >
          <h1 className="text-3xl sm:text-4xl text-white font-bold tracking-tight ">
            ようこそ, Welcome to Baratie
          </h1>
          <span className="text-lg sm:text-xl text-[#c5d8f9] font-bold tracking-tight">
            You're Hungry?! We'll Feed You!!
          </span>
          <div className="h-14 border-2">Input Placeholder</div>
        </section>
        <section className="flex flex-col md:flex-row gap-16 pt-10">
          <div className=" ">
            <img
              className="w-full max-w-[500px] md:max-w-[600px] rounded-xl "
              src={phoneOrderImage}
              alt=""
            />
          </div>
          <div className="flex flex-col items-center gap-4 text-center justify-center">
            <h1 className="text-2xl text-white font-bold tracking-tight">
              速く! , Hurry Order Take-away
            </h1>
            <p className="text-sm text-white tracking-tight">
              {" "}
              Download the Baratie App for fast ordering and personalised
              Delivery
            </p>
            <img
              className=" w-full max-w-[350px] md:max-w-[400px] "
              src={appStoreImage}
              alt=""
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}
