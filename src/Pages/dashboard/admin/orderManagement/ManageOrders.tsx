import { GradientCircularProgress } from "@/components/Progress";
import { useGetAllOrdersQuery } from "@/redux/features/admin/orderManagement/orderManagementApi";
import ManageOrdersTable from "./ManageOrdersTable";

const ManageOrders = () => {
  const { data: ordersData, isLoading } = useGetAllOrdersQuery(undefined);
  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <GradientCircularProgress />
      </div>
    );
  // console.log(ordersData);
  return (
    <div>
      <ManageOrdersTable ordersData={ordersData?.data || []} />
    </div>
  );
};

export default ManageOrders;
