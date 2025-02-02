import { LoadingSpinnerCircle } from "@/components/LoadingSpinnerCircle";
import { SectionHead } from "@/components/SectionHead";
import { useGetAllProductsQuery } from "@/redux/features/admin/productsManagementApi";
import ManageCarsTable from "./ManageCarsTable";

export default function ManageCars() {
  const { data: CarsData, isLoading } = useGetAllProductsQuery(undefined);
  // console.log(CarsData);
  if (isLoading) return <LoadingSpinnerCircle />;

  return (
    <div>
      <SectionHead
        title="Manage Cars"
        para="You can update/delete cars on this page"
      />
      <ManageCarsTable carsData={CarsData?.data || []} />
    </div>
  );
}
