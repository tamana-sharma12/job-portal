import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./JobseekerProfile.css";

function JobseekerProfile() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const email = localStorage.getItem("email");

  useEffect(() => {

    if (!email) {
      return;
    }

    axios
      .get(`${import.meta.env.VITE_API_URL}/profile/${email}`)
      .then((response) => {

        console.log("Profile:", response.data);

        setUser(response.data.user);

      })
      .catch((error) => {

        console.log("Profile Error:", error);

      });

  }, [email]);


  const handleLogout = () => {

    localStorage.removeItem("login");
    localStorage.removeItem("email");
    localStorage.removeItem("name");

    navigate("/login");

  };


  return (

    <div className="profile-page">

      {/* ================= SIDEBAR ================= */}

      <aside className="jobseeker-sidebar">

        <div className="jobseeker-logo">
          <span>Job</span>Portal
        </div>

        <nav className="jobseeker-sidebar-menu">

          <Link
            to="/jobseekerDashboard"
            className="jobseeker-menu-item"
          >
            <span>▣</span>
            Dashboard
          </Link>

          <Link
            to="/find-jobs"
            className="jobseeker-menu-item"
          >
            <span>⌕</span>
            Find Jobs
          </Link>

          <Link
            to="/my-applications"
            className="jobseeker-menu-item"
          >
            <span>▤</span>
            My Applications
          </Link>

          <Link
            to="/saved-jobs"
            className="jobseeker-menu-item"
          >
            <span>♡</span>
            Saved Jobs
          </Link>

          <Link
            to="/jobseeker-profile"
            className="jobseeker-menu-item active"
          >
            <span>♙</span>
            My Profile
          </Link>

          <button
            className="jobseeker-logout-btn"
            onClick={handleLogout}
          >
            <span>↪</span>
            Logout
          </button>

        </nav>

      </aside>


      {/* ================= MAIN CONTENT ================= */}

      <main className="profile-content">

        <div className="profile-header">

          <p>JOB SEEKER</p>

          <h1>My Profile</h1>

          <span>
            View your personal information.
          </span>

        </div>


        {/* ================= PROFILE CARD ================= */}

        {user ? (

          <div className="profile-card">

            <div className="profile-avatar">

              {user.name
                ? user.name.charAt(0).toUpperCase()
                : "U"}

            </div>


            <div className="profile-info">

              <div className="profile-field">

                <label>Name</label>

                <p>
                  {user.name || "Not available"}
                </p>

              </div>


              <div className="profile-field">

                <label>Email</label>

                <p>
                  {user.email || "Not available"}
                </p>

              </div>


              <div className="profile-field">

                <label>Role</label>

                <p>
                  {user.role || "Job Seeker"}
                </p>

              </div>

            </div>

          </div>

        ) : (

          <div className="profile-loading">

            <p>Loading profile...</p>

          </div>

        )}

      </main>

    </div>

  );
}

export default JobseekerProfile;