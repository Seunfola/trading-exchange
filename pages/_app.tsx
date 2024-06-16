import { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
import '../styles/globals.css';
import "@rainbow-me/rainbowkit/styles.css";
import Providers from '../components/providers';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Providers>
      <Component {...pageProps} />
      </Providers>
    </AuthProvider>
  );
}

export default MyApp;
