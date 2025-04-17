import ManageResturant from "@/components/My Resturant Page/ManageResturant";
import { useGetAuthUser } from "@/hooks/auth";
import { useGetMyResturant } from "@/hooks/myResturant";

export default function ManageResturantPage() {
  const { data: user } = useGetAuthUser();

  const { data } = useGetMyResturant(user ? user._id : "");
  console.log(data);

  return <ManageResturant myCurrentResturant={data} user={user} />;
}
