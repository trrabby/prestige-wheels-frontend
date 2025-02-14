import { GradientCircularProgress } from "@/components/Progress";
import { SectionHead } from "@/components/SectionHead";
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
      <SectionHead
        title="Manage Orders"
        para="You can manage orders on this page"
      />
      <ManageOrdersTable ordersData={ordersData?.data || []} />
    </div>
  );
};

export default ManageOrders;
