import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function PaymentFailed() {
  const [OrderNO, setOrderNO] = useState<string | null>(null);
  const location = useLocation(); // Get the current location (URL) object

  useEffect(() => {
    // Create a URLSearchParams object to extract query parameters from location.search
    const params = new URLSearchParams(location.search);

    // Get the value of trans_id (if available)
    const orderNo = params.get("order_no");

    if (orderNo) {
      setOrderNO(orderNo); // Set the trans_id as the transaction ID
    }
  }, [location.search]);

  return (
    <div className="flex flex-col space-y-3 font-bold items-center justify-center w-full min-h-[calc(100vh-100px)]">
      <div className="flex flex-col space-y-3 font-bold items-center justify-center w-full">
        {/* Animated crossmark */}
        <div className="crossmark">
          <div className="crossmark-line crossmark-line-left"></div>
          <div className="crossmark-line crossmark-line-right"></div>
        </div>

        <p className="text-2xl text-red-500">Payment Failed</p>
        <p>Something went wrong with your payment. Please try again.</p>

        <Link to={`/payment/${OrderNO}`}>
          <button className="retry-button">Retry Payment</button>
        </Link>
      </div>

      {/* Retry button animation */}
      <style>
        {`
    /* Button container styling */
    .retry-button {
      position: relative;
      padding: 10px 20px;
      font-size: 16px;
      font-weight: bold;
      color: #fff;
      background-color: #333;
      border: 2px solid #fff;
      border-radius: 5px;
      cursor: pointer;
      overflow: hidden; /* Hide overflow of button content */
      text-transform: uppercase;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
      transition: background-color 0.3s ease-in-out;
    }

    /* Hover effect for button */
    .retry-button:hover {
      background-color: #fd5c70;
    }

    /* Creating the lightning stripe animation */
    .retry-button::before {
      content: "";
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      border-radius: 50%;
      border: 5px solid #fd5c70;
      animation: lightning 3s linear infinite; /* Animation for lightning */
      opacity: 0.7;
    }

    /* Lightning animation keyframes */
    @keyframes lightning {
      0% {
        transform: rotate(0deg);
        opacity: 0.7;
      }
      50% {
        transform: rotate(180deg);
        opacity: 1;
      }
      100% {
        transform: rotate(360deg);
        opacity: 0.7;
      }
    }

    /* Crossmark styling */
    .crossmark {
      position: relative;
      width: 100px;
      height: 100px;
      margin-bottom: 20px;
    }

    .crossmark-line {
      position: absolute;
      width: 100%;
      height: 10px;
      background-color: red;
      border-radius: 5px;
      top: 50%;
      left: 0;
      transform-origin: center;
    }

    .crossmark-line-left {
      transform: rotate(45deg);
      animation: crossmark-animation-left 0.5s ease-in-out forwards;
    }

    .crossmark-line-right {
      transform: rotate(-45deg);
      animation: crossmark-animation-right 0.5s ease-in-out forwards;
    }

    /* Crossmark animation keyframes */
    @keyframes crossmark-animation-left {
      0% {
        transform: rotate(0deg);
        width: 0%;
      }
      100% {
        transform: rotate(45deg);
        width: 100%;
      }
    }

    @keyframes crossmark-animation-right {
      0% {
        transform: rotate(0deg);
        width: 0%;
      }
      100% {
        transform: rotate(-45deg);
        width: 100%;
      }
    }
  `}
      </style>
    </div>
  );
}
