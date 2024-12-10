import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import "@fortawesome/fontawesome-free/css/all.css";

const Signup: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { login } = useAuth();

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to create account");
      }

      router.push("/login");

      login();
      setError(null);
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setError((error as Error).message || "Error creating account");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-500">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-7xl">
        <div className="hidden md:block w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/signup-image.jpg')" }}>
        </div>

        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-center text-blue-500 mb-6">Create Your Account</h2>
          {error && (
            <p className="bg-red-100 border border-red-500 text-red-700 p-2 rounded mb-4 text-center">
              {error}
            </p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-100 p-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                required
                placeholder="Enter your username"
              />
            </div>
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
                className="w-full bg-gray-100 p-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
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
                  className="w-full bg-gray-100 p-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                  required
                  placeholder="Enter your password"
                />
                <i
                  className={`absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer ${
                    showPassword ? "fas fa-eye-slash" : "fas fa-eye"
                  } text-gray-500`}
                  onClick={togglePasswordVisibility}
                ></i>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-600 hover:shadow-xl transition duration-200 transform hover:scale-105"
            >
              Sign Up
            </button>
            <p className="text-gray-700 mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" legacyBehavior>
                <a className="text-blue-500 hover:underline">Login here</a>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
