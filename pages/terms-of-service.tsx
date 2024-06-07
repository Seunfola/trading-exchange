import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TermsOfService: React.FC = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto py-8 flex-grow text-white">
        <h1 className="text-3xl mb-4">Terms of Service</h1>
        <p>Effective Date: [Insert Date]</p>

        <h2 className="text-2xl mt-4 mb-2">1. Acceptance of Terms</h2>
        <p>
          By accessing or using the Blay-Hub Exchange website and services, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services.
        </p>

        <h2 className="text-2xl mt-4 mb-2">2. Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. We will notify you of any changes by posting the new terms on our website. Your continued use of the services after any changes indicates your acceptance of the new terms.
        </p>

        <h2 className="text-2xl mt-4 mb-2">3. Use of Services</h2>
        <p>
          You agree to use the services only for lawful purposes and in accordance with these terms. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
        </p>

        <h2 className="text-2xl mt-4 mb-2">4. User Conduct</h2>
        <p>
          You agree not to engage in any conduct that may harm Blay-Hub Exchange, its users, or any third party. This includes, but is not limited to, the following:
          <ul className="list-disc list-inside mt-2">
            <li>Uploading or distributing any harmful or malicious content.</li>
            <li>Interfering with or disrupting the services or servers.</li>
            <li>Attempting to gain unauthorized access to any part of the services.</li>
          </ul>
        </p>

        <h2 className="text-2xl mt-4 mb-2">5. Termination</h2>
        <p>
          We reserve the right to terminate or suspend your access to the services at any time, without notice, for any reason, including if you violate these terms.
        </p>

        <h2 className="text-2xl mt-4 mb-2">6. Disclaimer of Warranties</h2>
        <p>
          The services are provided "as is" and "as available" without any warranties of any kind, either express or implied. We do not warrant that the services will be uninterrupted, error-free, or secure.
        </p>

        <h2 className="text-2xl mt-4 mb-2">7. Limitation of Liability</h2>
        <p>
          In no event shall Blay-Hub Exchange be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with the use of our services.
        </p>

        <h2 className="text-2xl mt-4 mb-2">8. Governing Law</h2>
        <p>
          These terms shall be governed by and construed in accordance with the laws of [Insert Jurisdiction]. Any disputes arising out of or in connection with these terms shall be resolved in the courts of [Insert Jurisdiction].
        </p>

        <h2 className="text-2xl mt-4 mb-2">9. Contact Us</h2>
        <p>
          If you have any questions about these Terms of Service, please contact us at [Insert Contact Information].
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
