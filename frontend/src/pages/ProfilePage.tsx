import Profile from "@/components/Profile Page/Profile";
import { useGetAuthUser } from "@/hooks/auth";
import Layout from "@/layouts/Layout";
import animationData from "../assets/lottie/food_search_pending.json";
import LoadingLottie from "@/components/Lotties/LoadingLottie";

export default function ProfilePage() {
  const { data, isPending, isError } = useGetAuthUser();
  if (isPending)
    return (
      <div
        className="bg-black h-screen flex items-center justify-center"
        data-testid="loading-lottie"
      >
        <LoadingLottie animationData={animationData} />
      </div>
      // <div data-testid="loading-lottie">...loading</div>
    );

  if (!data) return <div>Form cannot be rendered</div>;
  if (isError) return <div>An Error Occurred</div>;
  return (
    <Layout>
      <Profile currentUser={data} />
    </Layout>
  );
}
