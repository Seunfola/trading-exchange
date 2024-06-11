import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import '@fortawesome/fontawesome-free/css/all.css'
import { useRouter } from 'next/navigation'

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useRouter();
  
  const { login } = useAuth();

  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to log in');
      }

      router.push('/');

      login();
      setError(null);
      setEmail('');
      setPassword('');
    } catch (error) {
      setError((error as Error).message || 'Error logging in');
    }
  };

    const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-md text-white max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="bg-red-600 p-2 rounded mb-4 text-center">{error}</p>}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-700 p-3 rounded outline-none focus:ring-2 focus:ring-green-500 transition"
            required
          />
        </div>
        <div className="mb-6 relative">
          <label htmlFor="password" className="block mb-2 text-sm">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-700 p-3 pl-10 rounded outline-none focus:ring-2 focus:ring-green-500 transition"
              required
            />
            <i
              className={`absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer ${showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'} text-gray-400`}
              onClick={togglePasswordVisibility}
            ></i>
          </div>
        </div>
        <button type="submit" className="w-full bg-green-500 p-3 rounded text-white font-bold hover:bg-green-600 transition">Login</button>
        <p className="text-white mt-4 text-center">
          Don't have an account?{' '}
          <Link href="/signup" legacyBehavior>
            <a className="text-blue-400 hover:underline transition">Sign up</a>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
