import CarCard from "@/components/CarCard";
import { LoadingSpinnerCircle } from "@/components/LoadingSpinnerCircle";
import { SectionHead } from "@/components/SectionHead";
import { useGetAllProductsQuery } from "@/redux/features/admin/productsManagementApi";

const Products = () => {
  const { data: CarsData, isLoading } = useGetAllProductsQuery([
    {
      name: "limit",
      value: "18",
    },
    {
      name: "page",
      value: "1",
    },
  ]);
  // console.log(CarsData);
  if (isLoading) return <LoadingSpinnerCircle />;
  return (
    <div>
      <SectionHead
        title="Our Collections"
        para={`"Experience luxury redefined with our exclusive car collection, featuring the finest vehicles crafted for performance, style, and sophistication"`}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 w-10/12 mx-auto">
        {CarsData?.data?.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default Products;
