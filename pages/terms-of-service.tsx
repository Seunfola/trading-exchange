import { useState } from "react";
import Link from 'next/link';
import { FaFileAlt, FaEdit, FaUsers, FaGavel, FaExclamationTriangle, FaLifeRing } from "react-icons/fa";

const TermsOfService = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const sections = [
    {
      title: "Acceptance of Terms",
      content:
        "By accessing or using the Blay-Hub Exchange website and services, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services.",
      icon: <FaFileAlt className="text-green-500 text-3xl" />,
    },
    {
      title: "Changes to Terms",
      content:
        "We reserve the right to modify these terms at any time. We will notify you of any changes by posting the new terms on our website. Your continued use of the services after any changes indicates your acceptance of the new terms.",
      icon: <FaEdit className="text-blue-500 text-3xl" />,
    },
    {
      title: "User Conduct",
      content:
        "You agree not to engage in any conduct that may harm Blay-Hub Exchange, its users, or any third party. This includes uploading harmful content, disrupting services, and attempting unauthorized access.",
      icon: <FaUsers className="text-yellow-500 text-3xl" />,
    },
    {
      title: "Governing Law",
      content:
        "These terms shall be governed by and construed in accordance with the laws of [Insert Jurisdiction]. Any disputes arising out of or in connection with these terms shall be resolved in the courts of [Insert Jurisdiction].",
      icon: <FaGavel className="text-red-500 text-3xl" />,
    },
    {
      title: "Disclaimer of Warranties",
      content:
        "The services are provided 'as is' and 'as available' without any warranties of any kind, either express or implied. We do not warrant that the services will be uninterrupted, error-free, or secure.",
      icon: <FaExclamationTriangle className="text-orange-500 text-3xl" />,
    },
    {
      title: "Contact Us",
      content:
        "If you have any questions about these Terms of Service, please contact us at [Insert Contact Information].",
      icon: <FaLifeRing className="text-purple-500 text-3xl" />,
    },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 text-white min-h-screen flex flex-col">
      <header className="bg-gradient-to-r from-blue-600 to-green-500 py-16 text-center shadow-md">
        <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-lg">
          Kindly take your time to check the terms and conditions.
          </p>
      </header>

      <main className="container mx-auto py-8 flex-grow px-4 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 ${
              activeSection === section.title ? "ring-2 ring-blue-500" : "hover:ring-1 hover:ring-gray-500"
            }`}
          >
            <div
              onClick={() => toggleSection(section.title)}
              className="flex items-center gap-4 cursor-pointer"
            >
              {section.icon}
              <h2 className="text-xl font-semibold">{section.title}</h2>
            </div>
            {activeSection === section.title && (
              <p className="mt-4 text-gray-300">{section.content}</p>
            )}
          </div>
        ))}
      </main>

      <section className="bg-gradient-to-r from-green-600 to-blue-500 py-8 text-center">
        <h2 className="text-2xl font-bold text-white">Need More Help?</h2>
        <Link href="/contactus"className="text-white mt-2">
          Reach out to our support team at{" "}
          <a
            href="mailto:support@blayhub.com"
            className="text-yellow-300"
          >
            support-team
          </a>
        </Link>
      </section>
    </div>
  );
};

export default TermsOfService;
