import { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
import Layout from './layout'; 
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
