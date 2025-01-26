/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";

const CarCard = ({ car }: any) => {
  // console.log(car);

  return (
    <Link to={`cars/:${car._id}`} className="hover:cursor-pointer p-0 ">
      <div className="border-none w-full">
        <div>
          <img
            src={car.imgUrl}
            alt="car"
            className="w-full h-48 object-cover  hover: transform hover:scale-110 duration-500 "
          />
        </div>
        <hr className="bg-fourth" />
        <div className="flex justify-between items-center p-2">
          <div className="flex flex-col  justify-start p-2">
            <p className="text-lg font-bold">{`${car.brand} ${car.model}`}</p>
            <p className="text-sm">{car.category}</p>
          </div>
          <button
            className="border-t-2 border-r-2 border-fourth p-2 hover:bg-fourth duration-500 
          hover: transform hover:scale-110 hover:-translate-x-2 font-bold text-fourth hover:text-white"
          >
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default CarCard;
