import React, { useState } from 'react';
import md5 from 'md5';

const Auth: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [gravatarUrl, setGravatarUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const fetchGravatar = async () => {
    try {
      setLoading(true);
      setError(null);
      const hash = md5(email.trim().toLowerCase());
      const gravatarUrl = `https://www.gravatar.com/avatar/${hash}`;
      setGravatarUrl(gravatarUrl);
    } catch (error) {
      setError('Error fetching Gravatar');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchGravatar();
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <main className="container mx-auto py-8">
        <h1 className="text-3xl text-white mb-4">Auth</h1>
        <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-lg shadow-md text-white">
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full bg-gray-700 p-2 rounded"
              required
            />
          </div>
          <button type="submit" className="bg-green-500 p-2 rounded">Get Gravatar</button>
        </form>
        {loading && <div className="text-white mt-4">Loading...</div>}
        {error && <div className="text-red-500 mt-4">{error}</div>}
        {gravatarUrl && (
          <div className="mt-4">
            <img src={gravatarUrl} alt="Gravatar" className="rounded-full" />
          </div>
        )}
      </main>
    </div>
  );
}

export default Auth;
