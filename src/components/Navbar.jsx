import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar({ role, setUser }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  const linkClass = (path) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg w-full text-left ${
      location.pathname === path
        ? "bg-sky-600 text-white"
        : "text-slate-700 hover:bg-sky-100"
    }`;

  return (
    <div className="w-60 h-screen bg-white shadow-md flex flex-col p-4">
      {/* Logo + App Title */}
      <div className="flex items-center gap-2 mb-8">
        <img src="/bigger.jpg" alt="logo" className="h-8 w-8" />
        <h1 className="text-lg font-bold text-sky-700">CivicLink</h1>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col gap-2 flex-1">
        {role === "citizen" && (
          <>
            <Link to="/citizen/feed" className={linkClass("/citizen/feed")}>
              📰 Feed
            </Link>
            <Link to="/citizen/report" className={linkClass("/citizen/report")}>
              📝 Report
            </Link>
          </>
        )}

        {role === "authority" && (
          <Link to="/authority" className={linkClass("/authority")}>
            🏛️ Dashboard
          </Link>
        )}
      </div>

      {/* Logout at bottom */}
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 mt-auto"
      >
        🚪 Logout
      </button>
    </div>
  );
}
