import Profile from "@/components/Profile Page/Profile";
import { useGetAuthUser } from "@/hooks/auth";
import Layout from "@/layouts/Layout";

export default function ProfilePage() {
  const { data, isPending, isError } = useGetAuthUser();
  if (isPending)
    return <div className="bg-black h-screen">Form is Loading...</div>;
  if (!data) return <div>Form cannot be rendered</div>;
  if (isError) return <div>An Error Occurred</div>;
  return (
    <Layout>
      <Profile currentUser={data} />
    </Layout>
  );
}
