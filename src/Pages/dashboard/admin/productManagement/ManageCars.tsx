import { SectionHead } from "@/components/SectionHead";
import { useGetAllProductsQuery } from "@/redux/features/admin/productManagement/productsManagementApi";
import ManageCarsTable from "./ManageCarsTable";
import { GradientCircularProgress } from "@/components/Progress";

export default function ManageCars() {
  const { data: CarsData, isLoading } = useGetAllProductsQuery(undefined);
  // console.log(CarsData);
  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <GradientCircularProgress />
      </div>
    );

  return (
    <div>
      <SectionHead title="Manage Cars" />
      <ManageCarsTable carsData={CarsData?.data || []} />
    </div>
  );
}
