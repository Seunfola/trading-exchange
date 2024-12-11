import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <main className="container mx-auto py-8 flex-grow text-white">
        <h1 className="text-3xl mb-4">Privacy Policy</h1>
        <p>Effective Date: [Insert Date]</p>

        <h2 className="text-2xl mt-4 mb-2">1. Introduction</h2>
        <p>
          Welcome to Blay-Hub Exchange. We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and disclose your information.
        </p>

        <h2 className="text-2xl mt-4 mb-2">2. Information We Collect</h2>
        <p>
          We collect information that you provide to us directly, such as when you create an account, update your profile, or contact us for support. This information may include your name, email address, and any other details you choose to provide.
        </p>

        <h2 className="text-2xl mt-4 mb-2">3. How We Use Your Information</h2>
        <p>
          We use the information we collect to provide, maintain, and improve our services. This includes using your information to communicate with you, process transactions, and provide customer support.
        </p>

        <h2 className="text-2xl mt-4 mb-2">4. Sharing Your Information</h2>
        <p>
          We do not share your personal information with third parties except as necessary to provide our services or as required by law. We may share information with service providers who perform services on our behalf, such as payment processing and data storage.
        </p>

        <h2 className="text-2xl mt-4 mb-2">5. Security</h2>
        <p>
          We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no internet-based service can be completely secure, and we cannot guarantee the absolute security of your information.
        </p>

        <h2 className="text-2xl mt-4 mb-2">6. Your Rights</h2>
        <p>
          You have the right to access, update, or delete your personal information. If you wish to exercise any of these rights, please contact us at [Insert Contact Information].
        </p>

        <h2 className="text-2xl mt-4 mb-2">7. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our website. You are advised to review this Privacy Policy periodically for any changes.
        </p>

        <h2 className="text-2xl mt-4 mb-2">8. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at [Insert Contact Information].
        </p>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
