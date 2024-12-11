import Link from "next/link";
import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import TermsOfService from "./../pages/terms-of-service";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-4">
          <img src="/logo.svg" alt="ForM Exchange Logo" className="w-10 h-10" />
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
            <Link href="/" legacyBehavior>
              <a className="hover:text-green-500">Home</a>
            </Link>
            <Link href="/profile" legacyBehavior>
              <a className="hover:text-green-500">Wallet</a>
            </Link>
            <Link href="/markets" legacyBehavior>
              <a className="hover:text-green-500">Markets</a>
            </Link>
            <Link href="/contactus" legacyBehavior>
              <a className="hover:text-green-500">contact us</a>
            </Link>
            <Link href="/terms-of-service" legacyBehavior>
              <a className="hover:text-green-500">Terms of Service</a>
            </Link>
          </nav>

          <div className="search-bar relative mt-4 md:mt-0">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-700 text-white p-2 px-6 pl-8 rounded w-full md:w-auto"
            />
            <i className="fas fa-search absolute inset-y-0 left-2 flex items-center"></i>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
