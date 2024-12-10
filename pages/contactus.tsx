
const ContactUs = () => {
  return (
    <div className="bg-white py-16 px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Have a Question? Contact Us!</h2>
        <p className="text-gray-600">
          A dynamic startup agency, is dedicated to fueling the aspirations of emerging businesses. 
          We specialize in crafting captivating online identities.
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
            Call us: <a href="tel:+1834123456789" className="text-blue-500">+1834 123 456 789</a>
          </p>
          <p className="text-gray-600">
            Email: <a href="mailto:support@example.com" className="text-blue-500">support@example.com</a>
          </p>
        </div>

        {/* Opening Hours */}
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
          <p className="text-gray-600">Mon - Sat: 7:00 am - 8:00 pm</p>
          <p className="text-gray-600">Sunday: 8:00 am - 6:00 pm</p>
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
                  d="M21 10.5a8.38 8.38 0 01-1.5 4.5A8.5 8.5 0 0112 21c-1.74 0-3.41-.56-4.78-1.5a8.38 8.38 0 01-1.5-1.5L3 21l1.5-4.72a8.38 8.38 0 01-1.5-4.5 8.5 8.5 0 011.5-4.5A8.38 8.38 0 015.78 3 8.38 8.38 0 0112 1.5a8.5 8.5 0 014.5 1.5 8.38 8.38 0 011.5 1.5A8.5 8.5 0 0121 10.5z"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-semibold">Our Office</h3>
          <p className="text-gray-600">
            2972 Westheimer Rd. Santa Ana, Illinois, USA
          </p>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-12">
        <iframe
          className="w-full h-96 border rounded-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24974.732879798254!2d-0.11954315357299827!3d51.50325836424059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604c13b376ab1%3A0xa871bb88e5441812!2slastminute.com%20London%20Eye!5e0!3m2!1sen!2suk!4v1698088372375!5m2!1sen!2suk"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;
