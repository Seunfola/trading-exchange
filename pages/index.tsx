import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import OrderBook from '../components/OrderBook';
import OrderForm from '../components/OrderForm';
import Login from './login';
import Signup from './signup';
import { useAuth } from '../context/AuthContext';
// import Markets from './markets';
import CandlestickChart from './candlestick';


function Home() {
  const { isAuthenticated } = useAuth();
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto py-2 flex-grow">
        {!isAuthenticated ? (
          <div className="flex flex-col items-center">

            {showLogin ? <Login /> : <Signup />}

          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2">
              <CandlestickChart/>
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
