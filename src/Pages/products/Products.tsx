import CarCard from "@/components/CarCard";
import { SectionHead } from "@/components/SectionHead";
import { useGetAllProductsQuery } from "@/redux/features/admin/productManagement/productsManagementApi";
import { Helmet } from "react-helmet-async";
import { Skeleton } from "antd";

const Products = () => {
  const { data: CarsData, isLoading } = useGetAllProductsQuery([
    { name: "limit", value: "18" },
    { name: "page", value: "1" },
  ]);

  return (
    <div>
      <Helmet>
        <title>Products Page | Prestige Wheels</title>
      </Helmet>

      <SectionHead
        title="Our Collections"
        para={`"Experience luxury redefined with our exclusive car collection, featuring the finest vehicles crafted for performance, style, and sophistication"`}
      />

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 w-10/12 mx-auto">
        {isLoading
          ? // Skeleton Loader (Matching Actual Structure)
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="border rounded-lg shadow-md p-4">
                <Skeleton.Image active className="w-full h-48 rounded-lg" />
                <div className="mt-4">
                  <Skeleton active title={false} paragraph={{ rows: 1 }} />
                  <Skeleton
                    active
                    title={false}
                    paragraph={{ rows: 2, width: "80%" }}
                  />
                </div>
              </div>
            ))
          : // Actual Product Cards
            CarsData?.data?.map((car) => <CarCard key={car._id} car={car} />)}
      </div>
    </div>
  );
};

export default Products;
