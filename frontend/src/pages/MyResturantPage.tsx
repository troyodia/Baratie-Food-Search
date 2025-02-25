import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/layouts/Layout";
import ManageResturantPage from "./ManageResturantPage";
import MyOrdersPage from "./MyOrdersPage";

export default function MyResturantPage() {
  return (
    <Layout>
      <Tabs defaultValue="orders" className="mx-4">
        <TabsList>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="resturant">Manage Resturant</TabsTrigger>
        </TabsList>
        <TabsContent className="border text-white" value="orders">
          <MyOrdersPage />
        </TabsContent>
        <TabsContent value="resturant">
          <ManageResturantPage />
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
