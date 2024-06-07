import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ContactUs: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSuccess('Message sent successfully');
      setError(null);
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      setError((error as Error).message || 'Error sending message');
      setSuccess(null);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto py-8 flex-grow text-white">
        <h1 className="text-3xl mb-4">Contact Us</h1>
        <p className="mb-8">If you have any questions or concerns, feel free to contact us using the form below.</p>
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-700 p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-700 p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block mb-2">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-gray-700 p-2 rounded"
              rows={4}
              required
            ></textarea>
          </div>
          <button type="submit" className="bg-green-500 p-2 rounded">Send</button>
          {success && <p className="text-green-500 mt-2">{success}</p>}
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default ContactUs;
