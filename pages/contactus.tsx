import React from "react";

const ContactUs = () => {
  return (
    <div className="bg-white py-16 px-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Contact Us</h1>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Have a Question? Contact Us!</h2>
        <p className="text-gray-600">
          Our platform empowers users with real-time Forex and Crypto exchange insights. 
          Stay ahead in the financial market with tailored services to meet your trading needs.
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-around items-center gap-8">
        {/* Contact Info */}
        <div className="text-center">
          <div className="flex justify-center items-center mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="white"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 10.5a8.38 8.38 0 01-1.5 4.5A8.5 8.5 0 0112 21c-1.74 0-3.41-.56-4.78-1.5a8.38 8.38 0 01-1.5-1.5L3 21l1.5-4.72a8.38 8.38 0 01-1.5-4.5 8.5 8.5 0 011.5-4.5A8.38 8.38 0 015.78 3 8.38 8.38 0 0112 1.5a8.5 8.5 0 014.5 1.5 8.38 8.38 0 011.5 1.5A8.5 8.5 0 0121 10.5z"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-semibold">Contact Us</h3>
          <p className="text-gray-600">
            Call us: <a href="tel:+2348152832520" className="text-blue-500">+234 815 283 2520</a>
          </p>
          <p className="text-gray-600">
            Email: <a href="mailto:support@cryptoexchange.com" className="text-blue-500">support@cryptoexchange.com</a>
          </p>
        </div>

        <div className="text-center">
          <div className="flex justify-center items-center mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="white"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6l4 2"
                />
                <circle cx={12} cy={12} r={9} />
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-semibold">Opening Hours</h3>
          <p className="text-gray-600">Mon - Fri: 8:00 am - 6:00 pm</p>
          <p className="text-gray-600">Saturday: 9:00 am - 3:00 pm</p>
        </div>

        {/* Our Office */}
        <div className="text-center">
          <div className="flex justify-center items-center mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="white"
                className="w-6 h-6"
              >
                 <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 2c3.866 0 7 3.134 7 7 0 5.25-7 13-7 13S5 14.25 5 9c0-3.866 3.134-7 7-7z"
                />
                <circle cx={12} cy={9} r={2.5} />
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-semibold">Our Office</h3>
          <p className="text-gray-600">
            123 Victoria Island, Lagos, Nigeria
          </p>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-12">
        <iframe
          className="w-full h-96 border rounded-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126181.04276968665!2d3.3285886530378745!3d6.524379341529098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf6d3afc209d3%3A0x9db8f4c2bc0919b8!2sVictoria%20Island%2C%20Lagos!5e0!3m2!1sen!2sng!4v1698090000000!5m2!1sen!2sng"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;
