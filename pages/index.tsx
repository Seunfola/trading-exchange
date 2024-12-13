import OrderForm from '../components/OrderForm';
import Login from './login';
import Signup from './signup';
import { useAuth } from '../context/AuthContext';

import Hero from './hero';
import Feature from './feature';
import ContactUs from './contactus';
import TermsOfService from './terms-of-service';

function Home() {
  // const { isAuthenticated } = useAuth();
  // const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      {/* {!isAuthenticated ? (
        <div className="flex flex-col items-center">
          {showLogin ? <Login /> : <Signup />}
        </div>
      ) : ( */}
          <div className=" grid grid-cols-1 md:col-span-1">
            <Hero />
            <Feature />
            <TermsOfService />
            <ContactUs />
          </div>
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

          <div className="md:col-span-2">
            <CandlestickChart />
          </div>
          <div className="md:col-span-1">
            <OrderForm />
          </div>
        </div> */}
      {/* )} */}
    </>
  );
}

export default Home;
