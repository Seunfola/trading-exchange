import Link from "next/link";
import { useRouter } from "next/navigation";

const Hero = () => {

  const router = useRouter();

  const handleSignupNavigation = () => {
    router.push("/signup"); 
  };


  return (
    <div className="w-full h-screen relative">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('image.png')" }}
      ></div>

      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/70 to-black/50"></div>

      <div className="relative z-10 flex flex-col justify-center items-center w-full h-full text-white px-6">
        <h1
          className="text-5xl md:text-6xl font-extrabold text-center leading-snug tracking-tight mb-4 animate-fade-in-down"
        >
          Your One-Stop Solution for Forex and Crypto Exchange
        </h1>

        <p className="text-lg md:text-xl text-gray-300 text-center mb-6 animate-fade-in-up">
          Simplify your trading journey with secure and seamless transactions. 
          Gain real-time insights, data analytics, and tailored exchange services.
        </p>

        <button className="px-8 py-4 bg-blue-500 text-white text-lg font-medium rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition-transform transform hover:scale-105 animate-fade-in-up" onClick={handleSignupNavigation}>
          Get Started Now
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-4xl">
          <Link href="/markets" className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex justify-center items-center mb-4">
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
            <h3 className="text-lg font-semibold">Real-Time Rates</h3>
            <p className="text-gray-300 text-sm">
              Stay updated with the latest Forex and Crypto exchange rates, anytime.
            </p>
          </Link>
          <Link href="/deposit" className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-green-500 rounded-full flex justify-center items-center mb-4">
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
            <h3 className="text-lg font-semibold">Secure Transactions</h3>
            <p className="text-gray-300 text-sm">
              Trust us with safe, encrypted, and seamless trading services.
            </p>
          </Link>
          <Link href="/candlestick" className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-red-500 rounded-full flex justify-center items-center mb-4">
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
            <h3 className="text-lg font-semibold">Analytics Dashboard</h3>
            <p className="text-gray-300 text-sm">
              Monitor and analyze market trends with our interactive tools.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
