import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <Header />
      <main className="w-full mx-auto  flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
