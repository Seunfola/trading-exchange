import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CandlestickChart from '../components/CandlestickCharts';
import OrderBook from '../components/OrderBook';
import OrderForm from '../components/OrderForm';
import Login from './login';
import Signup from './signup';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto py-8 flex-grow">
        {!isAuthenticated ? (
          <div className="flex flex-col items-center">
            <h1 className="text-3xl text-white mb-4">Please {showLogin ? 'Login' : 'Signup'}</h1>
            {showLogin ? <Login /> : <Signup />}
            <p className="text-white mt-4">
              {showLogin ? (
                <>
                  Don't have an account?{' '}
                  <button
                    className="text-blue-500 underline"
                    onClick={() => setShowLogin(false)}
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    className="text-blue-500 underline"
                    onClick={() => setShowLogin(true)}
                  >
                    Login
                  </button>
                </>
              )}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <CandlestickChart />
            </div>
            <div className="md:col-span-1">
              <OrderBook />
            </div>
            <div className="md:col-span-1">
              <OrderForm />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Home;
