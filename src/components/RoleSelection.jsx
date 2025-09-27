import React from "react";
import { useNavigate } from "react-router-dom";

export default function RoleSelection({ user, setUser }) {
  const navigate = useNavigate();

  const handleRole = (role) => {
    const updatedUser = { ...user, role };
    setUser(updatedUser);
    if (role === "citizen") {
      navigate("/citizen");
    } else {
      navigate("/verify-authority");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-sky-600 mb-6">
          Welcome, {user?.name || "User"} 👋
        </h2>
        <p className="text-slate-600 mb-6">Choose your role to continue:</p>
        <div className="space-y-4">
          <button
            onClick={() => handleRole("citizen")}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition"
          >
            I am a Citizen 🧑‍🤝‍🧑
          </button>
          <button
            onClick={() => handleRole("authority")}
            className="w-full bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700 transition"
          >
            I am an Authority 🏛️
          </button>
        </div>
      </div>
    </div>
  );
}
