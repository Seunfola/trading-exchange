import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <div className="container mx-auto">
        <div className="text-gray-400 mb-4">
          &copy; {new Date().getFullYear()} Blay-hub Exchange. All rights reserved.
        </div>
        <nav>
          <ul className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 mb-4">
            <li>
              <Link href="/privacy-policy" legacyBehavior>
                <a className="hover:text-green-500">Privacy Policy</a>
              </Link>
            </li>
            <li>
              <Link href="/terms-of-service" legacyBehavior>
                <a className="hover:text-green-500">Terms of Service</a>
              </Link>
            </li>
            <li>
              <Link href="/contact-us" legacyBehavior>
                <a className="hover:text-green-500">Contact Us</a>
              </Link>
            </li>
          </ul>
          <ul className="flex justify-center space-x-4">
            <li>
              <a href="#" className="text-gray-400 hover:text-green-500" aria-label="Twitter">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-green-500" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-green-500" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-green-500" aria-label="LinkedIn">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
