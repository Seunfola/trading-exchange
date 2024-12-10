import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faChartLine, faUsers } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const Feature = () => {
  return (
    <div className="w-full bg-black">
      <div className="flex flex-col justify-center items-center w-full text-white p-8">
        <h2 className="text-4xl font-bold mt-4 mb-4">Forex Trading & Exchange</h2>
        <p className="text-lg mb-8 text-center mx-auto px-6 max-w-4xl">
          Dive into the world of Forex trading and exchange. Access the global financial markets with cutting-edge tools and strategies. Whether you&apos;re a beginner or an experienced trader, we provide everything you need to succeed.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-6">
          <motion.div
            className="flex flex-col items-center border border-gray-300 p-8 rounded-lg hover:shadow-lg bg-black w-80 h-64 relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="flex justify-center items-center mb-4"
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
            >
              <FontAwesomeIcon icon={faWallet} size="3x" className="text-blue-500" />
            </motion.div>

            <p className="text-xl font-semibold mb-2">Forex Wallet</p>

            <motion.p
             className="text-sm text-gray-400 text-center"
            animate={{ y: ["-10%", "60%"] }}
            transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
           }}
            >
              Store, transfer, and manage your digital assets securely in your wallet.
              Our advanced security ensures your funds are always safe.
            </motion.p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center border border-gray-300 p-8 rounded-lg hover:shadow-lg bg-black w-80 h-64 relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="flex justify-center items-center mb-4"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
            >
              <FontAwesomeIcon icon={faChartLine} size="3x" className="text-green-500" />
            </motion.div>

            <p className="text-xl font-semibold mb-2">Market Analysis</p>

            <motion.p
                  className="text-sm text-gray-400 text-center"
                  animate={{ y: [ "60%", "-10%"] }} 
                  transition={{
                  repeat: Infinity,
                  duration: 4, 
                  ease: "easeInOut",
              }}
            >
              Analyze market trends and real-time data to make informed trading decisions.
              Stay ahead with insights tailored for Forex success.
            </motion.p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center border border-gray-300 p-8 rounded-lg hover:shadow-lg bg-black w-80 h-64 relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="flex justify-center items-center mb-4"
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
            >
              <FontAwesomeIcon icon={faUsers} size="3x" className="text-yellow-500" />
            </motion.div>

            <p className="text-xl font-semibold mb-2">Trading Community</p>

            <motion.p
              className="text-sm text-gray-400 text-center"
              animate={{ y: ["-10%", "60%"] }} 
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
              }}
            >
              Join a thriving community of traders to share strategies and insights.
              Collaborate with experts and beginners alike.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
