import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./SavedJobs.css";

function SavedJobs() {

  const navigate = useNavigate();

  const [savedJobs, setSavedJobs] = useState([]);

  const email = localStorage.getItem("email");

  useEffect(() => {

    if (!email) {
      return;
    }

    axios
      .get(`http://localhost:4000/saved-jobs/${email}`)
      .then((response) => {

        console.log("Saved Jobs Count:", response.data.savedJobs?.length);
console.log("Saved Jobs Data:", response.data.savedJobs);

        setSavedJobs(response.data.savedJobs || []);

      })
      .catch((error) => {

        console.log("Saved Jobs Error:", error);

      });

  }, [email]);


  const handleLogout = () => {

    localStorage.removeItem("login");

    navigate("/login");

  };


  return (

    <div className="saved-jobs-page">

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
            className="jobseeker-menu-item active"
          >
            <span>♡</span>
            Saved Jobs
          </Link>

          <Link
            to="/jobseeker-profile"
            className="jobseeker-menu-item"
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

      <main className="saved-jobs-content">

        <div className="saved-jobs-header">

          <p>JOB SEEKER</p>

          <h1>Saved Jobs</h1>

          <span>
            Jobs you have saved for later.
          </span>

        </div>


        {/* ================= SAVED JOBS ================= */}

        <div className="saved-jobs-container">

          {savedJobs.length === 0 ? (

            <div className="no-saved-jobs">

              <h2>No Saved Jobs</h2>

              <p>
                You have not saved any jobs yet.
              </p>

              <Link to="/find-jobs">
                Find Jobs
              </Link>

            </div>

          ) : (

            savedJobs.map((job) => (

              <div
                className="saved-job-card"
                key={job._id}
              >

                <div className="saved-job-info">

                  <h2>
                    {job.jobTitle}
                  </h2>

                  <p className="saved-company">
                    {job.companyName}
                  </p>

                  <div className="saved-job-details">

                    <span>
                      📍 {job.location}
                    </span>

                  </div>

                </div>


                <button
                  className="saved-apply-btn"
                  onClick={() =>
                    navigate(`/apply-job/${job.jobId}`)
                  }
                >
                  Apply
                </button>

              </div>

            ))

          )}

        </div>

      </main>

    </div>

  );
}

export default SavedJobs;