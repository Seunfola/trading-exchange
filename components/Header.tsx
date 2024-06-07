import Link from 'next/link';

const Header: React.FC = () => {
  return (
   <header className="bg-gray-800 text-white p-4">
    <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
        <img src="/logo.svg" alt="Blay-hub Exchange Logo" className="w-10 h-10" />
        <div className="logo text-lg font-bold">
          Blay-hub Exchange
        </div>
      </div>
      <div className="flex items-center space-x-6">
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" legacyBehavior>
                <a className="hover:text-green-500">Home</a>
              </Link>
            </li>
            <li>
              <Link href="/markets" legacyBehavior>
                <a className="hover:text-green-500">Markets</a>
              </Link>
            </li>
            <li>
              <Link href="/wallet" legacyBehavior>
                <a className="hover:text-green-500">Wallet</a>
              </Link>
            </li>
            <li>
              <Link href="/profile" legacyBehavior>
                <a className="hover:text-green-500">Profile</a>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="search-bar">
          <input type="text" placeholder="Search..." className="bg-gray-700 text-white p-2 rounded"/>
        </div>
      </div>
    </div>
  </header>
  );
}

export default Header;
