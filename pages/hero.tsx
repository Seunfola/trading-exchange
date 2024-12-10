import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();

  const handleSignupNavigation = () => {
    router.push("/signup");
  };

  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className="w-full h-screen relative">
      {/* Placeholder for loading */}
      {!isLoaded && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-300 animate-pulse"></div>
      )}

      {/* Background Image */}
      <img
        src="image.png"
        alt="Background"
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={handleImageLoad}
      />

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/70 to-black/50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center w-full h-full text-white px-6 md:px-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center leading-tight tracking-tight mb-4">
          Your One-Stop Solution for Forex and Crypto Exchange
        </h1>

        <p className="text-base md:text-lg lg:text-xl text-gray-300 text-center mb-6">
          Simplify your trading journey with secure and seamless transactions. 
          Gain real-time insights, data analytics, and tailored exchange services.
        </p>

        <button
          className="px-6 md:px-8 py-3 md:py-4 bg-blue-500 text-white text-base md:text-lg font-medium rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition-transform transform hover:scale-105"
          onClick={handleSignupNavigation}
        >
          Get Started Now
        </button>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12 w-full max-w-4xl">
          {/* Feature 1 */}
          <Link href="/markets" className="flex flex-col items-center text-center">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-500 rounded-full flex justify-center items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="white"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5V12l4.5 2.25"
                />
              </svg>
            </div>
            <h3 className="text-base md:text-lg font-semibold">Real-Time Rates</h3>
            <p className="text-sm md:text-base text-gray-300">
              Stay updated with the latest Forex and Crypto exchange rates, anytime.
            </p>
          </Link>

          {/* Feature 2 */}
          <Link href="/deposit" className="flex flex-col items-center text-center">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-green-500 rounded-full flex justify-center items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="white"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2-2m0 0l2-2m-2 2l2 2m-2 2l-2-2"
                />
              </svg>
            </div>
            <h3 className="text-base md:text-lg font-semibold">Secure Transactions</h3>
            <p className="text-sm md:text-base text-gray-300">
              Trust us with safe, encrypted, and seamless trading services.
            </p>
          </Link>

          {/* Feature 3 */}
          <Link href="/candlestick" className="flex flex-col items-center text-center">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-red-500 rounded-full flex justify-center items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="white"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l3 3"
                />
              </svg>
            </div>
            <h3 className="text-base md:text-lg font-semibold">Analytics Dashboard</h3>
            <p className="text-sm md:text-base text-gray-300">
              Monitor and analyze market trends with our interactive tools.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
