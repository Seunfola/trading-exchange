import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import "@fortawesome/fontawesome-free/css/all.css";
import { useRouter } from "next/router";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("https://trading-exchange-seunfolas-projects.vercel.app/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      if (data.success) {
        login(); // Update auth context
        router.push("/");
      } else {
        throw new Error(data.message);
      }

      setError(null);
      setEmail("");
      setPassword("");
    } catch (error) {
      setError((error as Error).message || "Error logging in");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-500">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-7xl">
        {/* Left Side: Image Section */}
        <div
          className="hidden md:block w-1/2 bg-cover bg-center"
          style={{ backgroundImage: "url('/login-image.jpg')" }}
        >
        </div>

        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-center text-green-500 mb-6">Welcome Back</h2>
          {error && (
            <p className="bg-red-100 border border-red-500 text-red-700 p-2 rounded mb-4 text-center">
              {error}
            </p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-100 p-3 text-gray-900 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                required
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-100 p-3 text-gray-900 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                  required
                  placeholder="Enter your password"
                />
                <i
                  className={`absolute top-3.5 right-3 cursor-pointer ${
                    showPassword ? "fas fa-eye-slash" : "fas fa-eye"
                  } text-gray-500`}
                  onClick={togglePasswordVisibility}
                ></i>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold shadow-lg hover:bg-green-600 hover:shadow-xl transition duration-200 transform hover:scale-105"
            >
              Login
            </button>
            <p className="text-gray-700 mt-4 text-center text-sm">
              Don&rsquo;t have an account?{" "}
              <Link href="/signup" legacyBehavior>
                <a className="text-blue-500 hover:underline">Sign up</a>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
