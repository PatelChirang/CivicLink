import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ReportIssue({ addIssue }) {
  const [image, setImage] = useState(null);
  const [issueType, setIssueType] = useState("");
  const [location, setLocation] = useState(""); // manual or auto string
  const [coords, setCoords] = useState({ lat: null, lng: null }); // raw numbers
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  // Auto-detect location
  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setCoords({ lat, lng });
          setLocation(`${lat.toFixed(5)}, ${lng.toFixed(5)}`); // readable
        },
        () => alert("Location access denied. Enter manually.")
      );
    } else {
      alert("Geolocation not supported in your browser");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!issueType || (!location && !coords.lat)) {
      alert("Please select issue type and location.");
      return;
    }

    const newIssue = {
      id: Date.now(),
      image,
      issueType,
      location: location || "Auto-detected", // fallback
      description,
      lat: coords.lat, // ✅ for heatmap
      lng: coords.lng, // ✅ for heatmap
      upvotes: 0,
      status: "Reported",
      comments: [],
    };

    addIssue(newIssue);
    navigate("/citizen/feed");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-sky-600 mb-6">
          📝 Report a New Issue
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image Upload */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : null)
            }
            className="w-full border p-3 rounded-xl"
          />

          {/* Issue Type */}
          <select
            value={issueType}
            onChange={(e) => setIssueType(e.target.value)}
            className="w-full border p-3 rounded-xl"
          >
            <option value="">Select Issue Type</option>
            <option value="Pothole">Pothole</option>
            <option value="Garbage">Garbage</option>
            <option value="Water Supply">Water Supply</option>
            <option value="Streetlight">Streetlight</option>
            <option value="Other">Other</option>
          </select>

          {/* Description */}
          <textarea
            placeholder="Short description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-3 rounded-xl"
          ></textarea>

          {/* Location */}
          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Enter location manually"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1 border p-3 rounded-xl"
            />
            <button
              type="button"
              onClick={detectLocation}
              className="bg-sky-600 text-white px-4 rounded-xl hover:bg-sky-700"
            >
              📍 Detect
            </button>
          </div>
          {/* Show detected coords if available */}
          {coords.lat && coords.lng && (
            <p className="text-xs text-green-600">
              Auto-detected: {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition"
          >
            Submit Issue
          </button>
        </form>
      </div>
    </div>
  );
}
