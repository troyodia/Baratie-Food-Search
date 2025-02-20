import ManageResturant from "@/components/My Resturant Page/ManageResturant";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/layouts/Layout";

export default function MyResturantPage() {
  return (
    <Layout>
      <Tabs defaultValue="orders" className="mx-4">
        <TabsList>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="resturant">Manage Resturant</TabsTrigger>
        </TabsList>
        <TabsContent className="border text-white" value="orders">
          My orders
        </TabsContent>
        <TabsContent value="resturant">
          <ManageResturant />
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
