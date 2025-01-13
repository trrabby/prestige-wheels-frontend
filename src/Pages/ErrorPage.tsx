import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div>
      <Helmet>
        <title>Ink Hives | Error Page</title>
      </Helmet>

      <div
        role="alert"
        className="alert w-full mx-auto min-h-[calc(100vh-10px)] bg-contain bg-center bg-[url('https://i.ibb.co/VTvJDRy/monster-404-error-concept-illustration-114360-1879.jpg')] rounded-lg flex flex-col items-center justify-center text-center gap-4 "
      >
        <Link to={"/"} className="btn btn-outline hover:bg-accent">
          Return To Home Page
        </Link>
      </div>
    </div>
  );
}
