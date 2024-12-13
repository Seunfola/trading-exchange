import Link from "next/link";
import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import Image from "next/image";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-800 text-white px-4 py-6 md:py-6 md:px-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-4">
          <Image 
          src="/logo.svg"
           alt="ForM Exchange Logo" 
           width={50}
           height={50}
           className="w-10 h-10" />
          <div className="logo text-lg font-bold">ForM Exchange</div>
        </Link>

        <button
          className="text-white text-2xl md:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
        </button>

        <div
          className={`flex-col md:flex md:flex-row items-center md:space-x-6 transition-transform duration-300 ${
            isMenuOpen ? "flex" : "hidden md:flex"
          }`}
        >
          <nav className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 text-center md:text-left">
            <Link href="/" className="hover:text-green-500">
          Home
            </Link>
            <Link href="/wallet" className="hover:text-green-500">
            Wallet
            </Link>
            <Link href="/markets" className="hover:text-green-500">
              Market
            </Link>
            <Link href="/contactus" className="hover:text-green-500" >
             Contact
            </Link>
            <Link href="/profile" className="hover:text-green-500" >
              profile 
            </Link>
          </nav>

          <div className="search-bar relative mt-4 md:mt-0">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-700 text-white py-2 px-8 pl-10 rounded w-full md:mx-auto"
            />
            <i className="fas fa-search absolute inset-y-0 left-3 flex items-center text-gray-400"></i>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
