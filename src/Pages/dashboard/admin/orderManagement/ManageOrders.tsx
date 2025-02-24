import { GradientCircularProgress } from "@/components/Progress";
import { useGetAllOrdersQuery } from "@/redux/features/admin/orderManagement/ordersManagementApi";
import ManageOrdersTable from "./ManageOrdersTable";
import { SectionHead } from "@/components/SectionHead";

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
      <SectionHead title="Manage Order" />
      <ManageOrdersTable ordersData={ordersData?.data || []} />
    </div>
  );
};

export default ManageOrders;
