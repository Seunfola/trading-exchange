import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faChartLine, faUsers } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';  // Import Framer Motion for animations

const Feature = () => {
  return (
    <div className="w-full bg-black">
      {/* Section with Hero Content */}
      <div className="flex flex-col justify-center items-center w-full h-full text-white p-8">
        <h2 className="text-4xl font-bold mb-4">Your Feature Heading Here</h2>
        <p className="text-lg mb-6 text-center">
          Here’s a description of your feature. Highlight its strengths and what makes it unique. Add more details here to explain its purpose and functionality.
        </p>

        {/* Icons Section with Animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-6">
          {/* Wallet Icon Card */}
          <motion.div
            className="flex flex-col items-center border border-gray-300 p-8 rounded-lg hover:shadow-lg bg-black w-80 h-60 relative overflow-hidden"
            whileHover={{ rotateY: 180 }}  
            whileTap={{ scale: 0.95 }}
            initial={{ rotateY: 0 }}
            animate={{ rotateY: 0 }}
          >
            {/* Rotating Icon */}
            <motion.div
              className="flex justify-center items-center mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              <FontAwesomeIcon icon={faWallet} size="3x" className="text-blue-500" />
            </motion.div>

            {/* Card Text */}
            <motion.div
              className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center opacity-0 text-center text-white"
              whileHover={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ opacity: { duration: 0.5 } }}
            >
              <p className="text-xl font-semibold mb-2">Wallet</p>
              <p className="text-sm">Store, transfer, and manage your digital assets securely in your wallet.</p>
            </motion.div>
          </motion.div>

          {/* Forex Market Icon Card */}
          <motion.div
            className="flex flex-col items-center border border-gray-300 p-8 rounded-lg hover:shadow-lg bg-black w-80 h-60 relative overflow-hidden"
            whileHover={{ rotateY: 180 }}  // Rotate card along the Y-axis on hover
            whileTap={{ scale: 0.95 }}
            initial={{ rotateY: 0 }}
            animate={{ rotateY: 0 }}
          >
            {/* Rotating Icon */}
            <motion.div
              className="flex justify-center items-center mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              <FontAwesomeIcon icon={faChartLine} size="3x" className="text-green-500" />
            </motion.div>

            {/* Card Text */}
            <motion.div
              className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center opacity-0 text-center text-white"
              whileHover={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ opacity: { duration: 0.5 } }}
            >
              <p className="text-xl font-semibold mb-2">Forex Market</p>
              <p className="text-sm">Trade currencies and explore the financial market with real-time data.</p>
            </motion.div>
          </motion.div>

          {/* Community Icon Card */}
          <motion.div
            className="flex flex-col items-center border border-gray-300 p-8 rounded-lg hover:shadow-lg bg-black w-80 h-60 relative overflow-hidden"
            whileHover={{ rotateY: 180 }}  // Rotate card along the Y-axis on hover
            whileTap={{ scale: 0.95 }}
            initial={{ rotateY: 0 }}
            animate={{ rotateY: 0 }}
          >
            {/* Rotating Icon */}
            <motion.div
              className="flex justify-center items-center mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              <FontAwesomeIcon icon={faUsers} size="3x" className="text-yellow-500" />
            </motion.div>

            {/* Card Text */}
            <motion.div
              className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center opacity-0 text-center text-white"
              whileHover={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ opacity: { duration: 0.5 } }}
            >
              <p className="text-xl font-semibold mb-2">Community</p>
              <p className="text-sm">Join a thriving community of users and get support and ideas from peers.</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
