import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import FeaturedCars from "./FeaturedCars";
import ServicingSection from "./ServicingSection";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home Page | Prestige Wheels</title>
      </Helmet>
      <Banner />
      <FeaturedCars />
      <ServicingSection />
    </div>
  );
};

export default Home;
