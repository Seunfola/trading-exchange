import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <div className="container mx-auto text-center text-gray-400">
      &copy; {new Date().getFullYear()} BBlay-hub exchange. All rights reserved.
    </div>
      <nav>
        <ul className="flex justify-center space-x-4">
          <li>
            <Link href="/privacy-policy" legacyBehavior>
            <a className="hover:text-green-500">Privacy Policy</a>
            </Link>
            </li>
          <li>
            <Link href="/terms-of-service" legacyBehavior>
            <a className="hover:text-green-500">
              Terms of Service
              </a>
              </Link>
              </li>
          <li>
            <Link href="/contact-us" legacyBehavior>
            <a className="hover:text-green-500">
              Contact Us
              </a>
              </Link>
              </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
