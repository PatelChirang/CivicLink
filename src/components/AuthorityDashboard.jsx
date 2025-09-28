import React, { useState } from "react";
import { useNotification } from "./NotificationContext";
import ImageModal from "./ImageModal"; 
import Heatmap from "./Heatmap"; // ✅ Import heatmap

export default function AuthorityDashboard({ issues, setIssues }) {
  const { addNotification } = useNotification();
  const [selectedImage, setSelectedImage] = useState(null);

  // Filter out archived issues (verified as resolved by citizens)
  const activeIssues = issues.filter((i) => !i.archived);

  // Sort by upvotes (highest first)
  const sortedIssues = [...activeIssues].sort((a, b) => b.upvotes - a.upvotes);

  // Update status of issue
  const updateStatus = (id, newStatus) => {
    setIssues(
      issues.map((issue) =>
        issue.id === id ? { ...issue, status: newStatus } : issue
      )
    );

    if (newStatus === "Resolved") {
      addNotification("✅ An issue was marked Resolved. Please verify!");
    }
  };

  // 📊 Counters
  const reportedCount = activeIssues.filter((i) => i.status === "Reported").length;
  const progressCount = activeIssues.filter((i) => i.status === "In Progress").length;
  const resolvedCount = activeIssues.filter((i) => i.status === "Resolved").length;

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <h2 className="text-2xl font-bold text-purple-600 mb-6">
        🏛️ Authority Dashboard
      </h2>

      {/* ✅ Fullscreen Image Modal */}
      <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />

      {/* Counters */}
      <div className="flex gap-4 mb-6">
        <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-xl text-sm">
          Reported: {reportedCount}
        </span>
        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-xl text-sm">
          In Progress: {progressCount}
        </span>
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-xl text-sm">
          Resolved: {resolvedCount}
        </span>
      </div>

      {/* ✅ Heatmap Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3">🔥 Civic Issues Heatmap</h3>
        <Heatmap issues={activeIssues} />
      </div>

      {sortedIssues.length === 0 ? (
        <p className="text-slate-600">No active issues right now.</p>
      ) : (
        <div className="space-y-6">
          {sortedIssues.map((issue) => (
            <div
              key={issue.id}
              className="bg-white shadow-md rounded-2xl p-4 border"
            >
              {issue.image && (
                <div className="relative">
                  <img
                    src={issue.image}
                    alt="Issue"
                    className="w-full h-48 object-cover rounded-xl mb-3"
                  />
                  {/* ✅ View full button */}
                  <button
                    onClick={() => setSelectedImage(issue.image)}
                    className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-md hover:bg-opacity-80"
                  >
                    🔍 View Full
                  </button>
                </div>
              )}

              <h3 className="text-xl font-semibold text-slate-800">
                {issue.issueType}
              </h3>
              <p className="text-slate-600">{issue.description}</p>
              <p className="text-sm text-slate-500 mb-2">📍 {issue.location}</p>

              <p className="text-sm font-medium mb-3">
                Upvotes: <span className="text-green-600">{issue.upvotes}</span>
              </p>

              <p className="text-sm font-medium mb-3">
                Current Status:{" "}
                <span className="text-sky-600">{issue.status}</span>
              </p>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => updateStatus(issue.id, "In Progress")}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-xl hover:bg-yellow-600"
                >
                  🚧 Mark In Progress
                </button>
                <button
                  onClick={() => updateStatus(issue.id, "Resolved")}
                  className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
                >
                  ✅ Mark Resolved
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
