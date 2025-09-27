import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false); // 🔄 Toggle mode
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (isSignup) {
      // 📝 Save new user
      const newUser = { name, email, password, role: null };
      localStorage.setItem("user", JSON.stringify(newUser));
      alert("Signup successful! You can now log in.");
      setIsSignup(false);
      setName("");
      setEmail("");
      setPassword("");
    } else {
      // 🔐 Validate login
      if (
        storedUser &&
        storedUser.name === name &&
        storedUser.password === password
      ) {
        onLogin(storedUser);
        navigate("/role");
      } else {
        alert("Invalid username or password");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-sky-600 mb-6">
          {isSignup ? "Signup" : "Login"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-4 text-lg rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-4 text-lg rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-4 text-lg rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <button
            type="submit"
            className="w-full bg-sky-600 text-white py-4 text-lg rounded-xl font-semibold hover:bg-sky-700 transition"
          >
            {isSignup ? "Sign Up" : "Log In"}
          </button>
        </form>

        <p className="text-xs text-slate-500 mt-4 text-center">
          This prototype stores your info in browser (localStorage).
        </p>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-sky-600 underline text-sm"
          >
            {isSignup ? "Already have an account? Log in" : "New user? Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
}