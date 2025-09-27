import React from "react";
import { useNavigate } from "react-router-dom";

export default function CitizenDashboard({ user }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-slate-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-sky-600 mb-6">
          Citizen Dashboard 🧑‍🤝‍🧑
        </h2>
        <p className="text-slate-600 mb-6">
          Welcome, {user?.name || "Citizen"} 👋  
          What do you want to do?
        </p>
        <div className="space-y-4">
          <button
            onClick={() => navigate("/citizen/feed")}
            className="w-full bg-sky-600 text-white py-3 rounded-xl font-medium hover:bg-sky-700 transition"
          >
            🔍 See Issues Feed
          </button>
          <button
            onClick={() => navigate("/citizen/report")}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition"
          >
            📝 Report a New Issue
          </button>
        </div>
      </div>
    </div>
  );
}
