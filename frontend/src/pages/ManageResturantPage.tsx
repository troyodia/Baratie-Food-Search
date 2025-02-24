import ManageResturant from "@/components/My Resturant Page/ManageResturant";
import { useGetMyResturant } from "@/hooks/myResturant";

export default function ManageResturantPage() {
  const { data } = useGetMyResturant();
  console.log(data);

  return <ManageResturant myCurrentResturant={data} />;
}
