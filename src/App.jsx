import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import RoleSelection from "./components/RoleSelection";
import CitizenDashboard from "./components/CitizenDashboard";
import ReportIssue from "./components/ReportIssue";
import Feed from "./components/Feed";
import AuthorityDashboard from "./components/AuthorityDashboard";
import Header from "./components/Header"; 
import { useNotification } from "./components/NotificationContext";
import Navbar from "./components/Navbar";
import AuthorityVerification from "./components/AuthorityVerification";


export default function App() {
  const [user, setUser] = useState(null);
  const [issues, setIssues] = useState([]);

  const { addNotification } = useNotification();
  

  const addIssue = (issue) => {
    setIssues([...issues, issue]);
    addNotification(`⚠️ New issue reported: ${issue.issueType}`);
  };

  return (
    <Router>
      {/* ✅ Top branding */}
      <Header />

      <div className="flex">
        {/* ✅ Sidebar only if logged in */}
        {user && <Navbar role={user.role} setUser={setUser} />}

        {/* ✅ Main content area */}
        <div className="flex-1 p-4">
          <Routes>
            {/* Default route */}
            <Route
              path="/"
              element={user ? <Navigate to="/role" /> : <Navigate to="/login" />}
            />

            {/* Login */}
            <Route path="/login" element={<Login onLogin={(u) => setUser(u)} />} />

            {/* Role Selection */}
            <Route path="/role" element={<RoleSelection user={user} setUser={setUser} />} />

            {/* Citizen */}
            <Route path="/citizen" element={<CitizenDashboard user={user} />} />
            <Route path="/citizen/report" element={<ReportIssue addIssue={addIssue} />} />
            <Route
              path="/citizen/feed"
              element={<Feed issues={issues} setIssues={setIssues} />}
            />
            <Route
              path="/verify-authority"
              element={<AuthorityVerification setUser={setUser} />}
            />


            {/* Authority */}
            <Route
              path="/authority"
              element={<AuthorityDashboard issues={issues} setIssues={setIssues} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
