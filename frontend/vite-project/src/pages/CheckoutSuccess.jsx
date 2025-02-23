import { Link } from "react-router-dom";

const CheckoutSuccess = () => {
    return (
      <div className="bg-gray-100 h-screen">
        <div className="bg-white p-6 md:mx-auto">
          <div className="flex justify-center items-center">
            <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="40" fill="green" />

              <path d="M30 50 L45 65 L70 35" stroke="white" strokeWidth="5" fill="none" />
            </svg>
          </div>
          <div className="text-center">
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
              Payment Done!
            </h3>
            <p className="text-gray-600 my-2">
                Thank you for completing your secure online payment.
            </p>
            <p>Have a great day!</p>
            <div className="py-10 text-center">
              <Link 
              to="/home" 
              className="px-12 bg-buttonBgColor text-black font-semibold py-3">
                Go Back To Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
};

export default CheckoutSuccess;