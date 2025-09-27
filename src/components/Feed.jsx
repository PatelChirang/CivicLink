import React, { useState } from "react";

export default function Feed({ issues, setIssues }) {
  const handleUpvote = (id) => {
    setIssues(
      issues.map((issue) =>
        issue.id === id ? { ...issue, upvotes: issue.upvotes + 1 } : issue
      )
    );
  };

  const handleComment = (id, comment) => {
    setIssues(
      issues.map((issue) =>
        issue.id === id
          ? {
              ...issue,
              comments: [...(issue.comments || []), comment],
            }
          : issue
      )
    );
  };

  const handleVerification = (id, vote) => {
    setIssues(
      issues.map((issue) => {
        if (issue.id === id) {
          const yes = (issue.verifyYes || 0) + (vote === "yes" ? 1 : 0);
          const no = (issue.verifyNo || 0) + (vote === "no" ? 1 : 0);

          // Decide outcome (threshold = 3 votes for demo)
          if (yes >= 3) {
            return { ...issue, archived: true }; // issue closed
          }
          if (no >= 3) {
            return {
              ...issue,
              status: "Reported",
              verifyYes: 0,
              verifyNo: 0,
            }; // re-opened
          }

          return { ...issue, verifyYes: yes, verifyNo: no };
        }
        return issue;
      })
    );
  };

  // 📊 Counters
  const reportedCount = issues.filter((i) => i.status === "Reported" && !i.archived).length;
  const progressCount = issues.filter((i) => i.status === "In Progress" && !i.archived).length;
  const resolvedCount = issues.filter((i) => i.status === "Resolved" && !i.archived).length;

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <h2 className="text-2xl font-bold text-sky-600 mb-6">📰 Issues Feed</h2>

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

      {issues.filter((i) => !i.archived).length === 0 ? (
        <p className="text-slate-600">No issues reported yet.</p>
      ) : (
        <div className="space-y-6">
          {issues
            .filter((i) => !i.archived)
            .map((issue) => (
              <div
                key={issue.id}
                className="bg-white shadow-md rounded-2xl p-4 border"
              >
                {/* Image */}
                {issue.image && (
                  <img
                    src={issue.image}
                    alt="Issue"
                    className="w-full object-cover rounded-xl mb-3"
                  />
                )}

                {/* Info */}
                <h3 className="text-xl font-semibold text-slate-800">
                  {issue.issueType}
                </h3>
                <p className="text-slate-600 mb-2">{issue.description}</p>
                <p className="text-sm text-slate-500 mb-2">
                  📍 {issue.location}
                </p>

                {/* Status */}
                <p className="text-sm font-medium mb-3">
                  Status:{" "}
                  <span className="text-sky-600">
                    {issue.status || "Reported"}
                  </span>
                </p>

                {/* Upvotes */}
                <button
                  onClick={() => handleUpvote(issue.id)}
                  className="bg-sky-600 text-white px-4 py-2 rounded-xl hover:bg-sky-700"
                >
                  👍 Upvote ({issue.upvotes})
                </button>

                {/* Verification (only if Resolved) */}
                {issue.status === "Resolved" && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-slate-700 mb-2">
                      ✅ Has this issue been resolved?
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleVerification(issue.id, "yes")}
                        className="bg-green-600 text-white px-3 py-1 rounded-xl hover:bg-green-700 text-sm"
                      >
                        Yes, Resolved
                      </button>
                      <button
                        onClick={() => handleVerification(issue.id, "no")}
                        className="bg-red-600 text-white px-3 py-1 rounded-xl hover:bg-red-700 text-sm"
                      >
                        No, Still Pending
                      </button>
                    </div>
                  </div>
                )}

                {/* Comments */}
                <div className="mt-4">
                  <h4 className="text-sm font-semibold">Comments:</h4>
                  <ul className="text-sm text-slate-700 mb-2">
                    {issue.comments?.map((c, i) => (
                      <li key={i}>• {c}</li>
                    ))}
                  </ul>
                  <CommentBox onSubmit={(c) => handleComment(issue.id, c)} />
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

// Small comment box component
function CommentBox({ onSubmit }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
      <input
        type="text"
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 border p-2 rounded-xl text-sm"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-3 rounded-xl text-sm hover:bg-green-700"
      >
        Post
      </button>
    </form>
  );
}
