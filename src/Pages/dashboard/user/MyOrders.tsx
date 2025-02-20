import { GradientCircularProgress } from "@/components/Progress";
import { useGetMyOrdersQuery } from "@/redux/features/admin/orderManagement/ordersManagementApi";
import MyOrdersTable from "./MyOrdersTable";

export default function MyOrders() {
  const { data: myOrders, isLoading } = useGetMyOrdersQuery(undefined);
  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <GradientCircularProgress />
      </div>
    );
  console.log(myOrders?.data);
  return (
    <div>
      <MyOrdersTable ordersData={myOrders?.data || []} />
    </div>
  );
}
