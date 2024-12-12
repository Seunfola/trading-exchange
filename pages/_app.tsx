import { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
import Layout from './layout'; 
import '../styles/globals.css';
import { WalletProvider } from '../context/WalletContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
    <WalletProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </WalletProvider>
  </AuthProvider>
  );
}

export default MyApp;
