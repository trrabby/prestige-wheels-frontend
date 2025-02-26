import CarCard from "@/components/CarCard";
import { SectionHead } from "@/components/SectionHead";
import { useGetAllProductsQuery } from "@/redux/features/admin/productManagement/productsManagementApi";
import { FaAngleDoubleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const FeaturedCars = () => {
  const { data: CarsData, isLoading } = useGetAllProductsQuery([
    { name: "limit", value: "6" },
    { name: "page", value: "1" },
  ]);

  return (
    <div className="py-10">
      <SectionHead
        title="Featured Collections"
        para={`"Explore our latest and finest collection of cars, featuring cutting-edge designs, top performance, and unmatched luxury!"`}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 w-10/12 mx-auto">
        {isLoading
          ? [...Array(6)].map((_, index) => (
              <div
                key={index}
                className="w-full h-72 bg-gray-200 rounded-lg animate-pulse p-4"
              >
                <div className="w-full h-40 bg-gray-300 rounded-md"></div>
                <div className="mt-4 h-5 w-3/4 bg-gray-300 rounded"></div>
                <div className="mt-2 h-4 w-1/2 bg-gray-300 rounded"></div>
              </div>
            ))
          : CarsData?.data?.map((car) => <CarCard key={car._id} car={car} />)}
      </div>
      <div className="flex justify-end container mx-auto pr-24 items-center">
        <Link className="hover:scale-105 hover:duration-500" to="/products">
          <button className="lightning-button text-center flex gap-2 items-center">
            See All <FaAngleDoubleRight className="w-5 h-5" />
          </button>
        </Link>
      </div>
      {/* button animation */}
      <style>
        {`
          .lightning-button {
            position: relative;
            padding: 10px 20px;
            font-size: 16px;
            font-weight: bold;
            color: #fff;
            background-color: #333;
            border: 2px solid #fff;
            border-radius: 5px;
            cursor: pointer;
            overflow: hidden;
            text-transform: uppercase;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
            transition: background-color 0.3s ease-in-out;
          }

          .lightning-button:hover {
            background-color: #fd5c70;
          }

          .lightning-button::before {
            content: "";
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            border-radius: 50%;
            border: 5px solid #fd5c70;
            animation: lightning 3s linear infinite;
            opacity: 0.7;
          }

          @keyframes lightning {
            0% { transform: rotate(0deg); opacity: 0.7; }
            50% { transform: rotate(180deg); opacity: 1; }
            100% { transform: rotate(360deg); opacity: 0.7; }
          }
        `}
      </style>
    </div>
  );
};

export default FeaturedCars;
