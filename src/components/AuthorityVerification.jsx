import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthorityVerification({ setUser }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleVerify = (e) => {
    e.preventDefault();

    // Demo check: real system would check email/OTP via backend
    if (code === "AUTH123") {
      setUser({ role: "authority" });
      navigate("/authority");
    } else {
      setError("❌ Invalid verification code. Access denied.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <h2 className="text-xl font-bold text-purple-700 mb-4">
          Authority Verification
        </h2>
        <p className="text-sm text-slate-600 mb-4">
          Please enter your <b>Authority Verification Code</b> to continue.
        </p>

        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            placeholder="Enter verification code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full border p-2 rounded-lg"
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
}
