
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

import JobSeekerDashboard from "./pages/JobSeekerDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";

import PostJob from "./pages/PostJob";
import MyJobs from "./pages/MyJobs";
import EditJob from "./pages/EditJob";
import Applicants from "./pages/Applicants";

import MyApplications from "./pages/MyApplications";
import SavedJobs from "./pages/SavedJobs";
import JobseekerProfile from "./pages/JobseekerProfile";
import FindJobs from "./pages/FindJobs";

import CompanyProfile from "./pages/CompanyProfile";
import Messages from "./pages/Messages";


// ================= PROTECTED ROUTE =================

function ProtectedRoute({ children, allowedRole }) {

  const login = localStorage.getItem("login");
  const role = localStorage.getItem("role");

  // Login nahi hai
  if (login !== "true") {
    return <Navigate to="/login" replace />;
  }

  // Role match nahi karta
  if (allowedRole && role !== allowedRole) {

    if (role === "jobseeker") {
      return <Navigate to="/jobseekerDashboard" replace />;
    }

    if (role === "employer") {
      return <Navigate to="/employerDashboard" replace />;
    }

    return <Navigate to="/login" replace />;
  }

  return children;
}


function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* ================= PUBLIC PAGES ================= */}

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />


        {/* ================= JOB SEEKER ================= */}

        <Route
          path="/jobseekerDashboard"
          element={
            <ProtectedRoute allowedRole="jobseeker">
              <JobSeekerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/find-jobs"
          element={
            <ProtectedRoute allowedRole="jobseeker">
              <FindJobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-applications"
          element={
            <ProtectedRoute allowedRole="jobseeker">
              <MyApplications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/saved-jobs"
          element={
            <ProtectedRoute allowedRole="jobseeker">
              <SavedJobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/jobseeker-profile"
          element={
            <ProtectedRoute allowedRole="jobseeker">
              <JobseekerProfile />
            </ProtectedRoute>
          }
        />


        {/* ================= EMPLOYER ================= */}

        <Route
          path="/employerDashboard"
          element={
            <ProtectedRoute allowedRole="employer">
              <EmployerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/post-job"
          element={
            <ProtectedRoute allowedRole="employer">
              <PostJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-jobs"
          element={
            <ProtectedRoute allowedRole="employer">
              <MyJobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-job/:id"
          element={
            <ProtectedRoute allowedRole="employer">
              <EditJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applicants"
          element={
            <ProtectedRoute allowedRole="employer">
              <Applicants />
            </ProtectedRoute>
          }
        />

        <Route
          path="/company-profile"
          element={
            <ProtectedRoute allowedRole="employer">
              <CompanyProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/messages"
          element={
            <ProtectedRoute allowedRole="employer">
              <Messages />
            </ProtectedRoute>
          }
        />


        {/* ================= INVALID URL ================= */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>


      {/* ================= TOAST ================= */}

      <ToastContainer position="top-right" />

    </BrowserRouter>
  );
}


export default App;
