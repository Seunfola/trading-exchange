import React from "react";

const ContactUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-300 to-white-300 text-gray-600 py-16 px-8">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold mb-4">Contact Us</h1>
          <p className="text-lg">
            Have questions or need assistance? Our team is here to help you!
          </p>
        </div>
      </section>

      {/* Contact Details Section */}
      <section className="container mx-auto py-12 px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Our Location Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-2xl hover:scale-105 transition-transform">
            <div className="flex justify-center items-center mb-4">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-8 h-8"
                >
                  <path d="M21 10.5c0 4.9-7.5 11.5-9 13-1.5-1.5-9-8.1-9-13a9 9 0 1118 0zM12 12a3 3 0 100-6 3 3 0 000 6z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Our Location</h3>
            <p className="text-gray-600">
              123 Victoria Island, Lagos, Nigeria
            </p>
          </div>

          {/* Office Hours Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-2xl hover:scale-105 transition-transform">
            <div className="flex justify-center items-center mb-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-8 h-8"
                >
                  <path d="M12 22c-5.5 0-10-4.5-10-10S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10zm1-15h-2v7l5 2.7.8-1.6-3.8-2.1V7z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Office Hours</h3>
            <p className="text-gray-600">Mon - Fri: 8:00 AM - 6:00 PM</p>
            <p className="text-gray-600">Sat: 9:00 AM - 3:00 PM</p>
          </div>

          {/* Contact Details Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-2xl hover:scale-105 transition-transform">
            <div className="flex justify-center items-center mb-4">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-8 h-8"
                >
                  <path d="M21 10.5a8.38 8.38 0 01-1.5 4.5A8.5 8.5 0 0112 21c-1.74 0-3.41-.56-4.78-1.5a8.38 8.38 0 01-1.5-1.5L3 21l1.5-4.72a8.38 8.38 0 01-1.5-4.5 8.5 8.5 0 011.5-4.5A8.38 8.38 0 015.78 3 8.38 8.38 0 0112 1.5a8.5 8.5 0 014.5 1.5 8.38 8.38 0 011.5 1.5A8.5 8.5 0 0121 10.5z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Get In Touch</h3>
            <p className="text-gray-600">
              Email:{" "}
              <a
                href="mailto:support@cryptoexchange.com"
                className="text-blue-500 hover:underline"
              >
                support@cryptoexchange.com
              </a>
            </p>
            <p className="text-gray-600">
              Phone:{" "}
              <a
                href="tel:+2348152832520"
                className="text-blue-500 hover:underline"
              >
                +234 815 283 2520
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12 px-4 md:px-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Find Us Here
        </h2>
        <iframe
          className="w-full h-96 border rounded-lg shadow-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126181.04276968665!2d3.3285886530378745!3d6.524379341529098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf6d3afc209d3%3A0x9db8f4c2bc0919b8!2sVictoria%20Island%2C%20Lagos!5e0!3m2!1sen!2sng!4v1698090000000!5m2!1sen!2sng"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </section>
    </div>
  );
};

export default ContactUs;
