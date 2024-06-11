// Profile Component

import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';

interface ProfileData {
  username: string;
  email: string;
  wallet: {
    currency: string;
    balance: number;
  };
  orderBook: {
    symbol: string;
    bidPrice: number;
    askPrice: number;
    bidQuantity: number;
    askQuantity: number;
  }[];
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profile');
        const data: ProfileData = await response.json();
        setProfile(data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching profile data');
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      <Header />
      <main className="container mx-auto py-8">
        <h1 className="text-3xl text-white mb-4">Profile</h1>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          {profile && (
            <div>
              <p className="text-white">Username: {profile.username}</p>
              <p className="text-white">Email: {profile.email}</p>
          
              <div className='bg-gray-800 mt-4 rounded-lg '>
                <h2 className="text-white">Orders:</h2>
               <ul>
      {Array.isArray(profile.orderBook) && profile.orderBook.map((order, index) => (
        <li key={index}>
          <p className="text-white">Symbol: {order.symbol}</p>
          <p className="text-white">Bid Price: {order.bidPrice}</p>
          
        </li>
      ))}
    </ul>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
