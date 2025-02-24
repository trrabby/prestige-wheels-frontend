import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div>
      <Helmet>
        <title>Error Page | Prestige Wheels</title>
      </Helmet>

      <div
        role="alert"
        className="w-full mx-auto min-h-[calc(100vh-10px)] bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex flex-col items-center justify-center text-center gap-6 p-6"
      >
        {/* Animated 404 Text */}
        <div className="text-9xl font-bold text-white animate-bounce">404</div>

        {/* Error Message */}
        <h1 className="text-4xl font-bold text-white">Oops! Page Not Found</h1>
        <p className="text-xl text-white max-w-2xl">
          The page you're looking for doesn't exist or has been moved. Let's get
          you back on track!
        </p>

        {/* Return Home Button with Animation */}
        <Link
          to={"/"}
          className="mt-6 px-8 py-3 bg-accent text-third font-semibold rounded-lg shadow-lg hover:bg-primary hover:text-third transition-all duration-300 transform hover:scale-105 animate-pulse"
        >
          Return To Home Page
        </Link>
      </div>

      {/* Custom CSS for Animations */}
      <style>
        {`
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
              box-shadow: 0 0 0 0 rgba(253, 92, 112, 0.7);
            }
            50% {
              transform: scale(1.05);
              box-shadow: 0 0 0 10px rgba(253, 92, 112, 0);
            }
          }

          .animate-bounce {
            animation: bounce 2s infinite;
          }

          .animate-float {
            animation: float 3s ease-in-out infinite;
          }

          .animate-pulse {
            animation: pulse 2s infinite;
          }
        `}
      </style>
    </div>
  );
}
