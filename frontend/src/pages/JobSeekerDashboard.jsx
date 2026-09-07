import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./jobseekerDashboard.css";

function JobseekerDashboard() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/jobs")
      .then((response) => {
        setJobs(response.data.jobs);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

 const handleLogout = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("email");

    navigate("/login");
};

  // ================= SAVE JOB =================

  const handleSaveJob = async (job) => {
    try {
      const name = localStorage.getItem("name");
      const email = localStorage.getItem("email");

      const response = await axios.post(
        "http://localhost:4000/save-job",
        {
          name: name,
          email: email,
          jobId: job._id,
          jobTitle: job.jobTitle,
          companyName: job.companyName,
          location: job.location
        }
      );

      alert(response.data.message);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Job save failed"
      );
    }
  };

  // ================= APPLY JOB =================

  const handleApplyJob = async (job) => {
    try {
      const name = localStorage.getItem("name");
      const email = localStorage.getItem("email");

      const response = await axios.post(
        "http://localhost:4000/apply-job",
        {
          name: name,
          email: email,
          jobId: job._id,
          jobTitle: job.jobTitle,
          companyName: job.companyName
        }
      );

      alert(response.data.message);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Job apply failed"
      );
    }
  };

  return (
    <div className="jobseeker-dashboard">

      {/* ================= SIDEBAR ================= */}

      <aside className="jobseeker-sidebar">

        <div className="jobseeker-logo">
          <span>Job</span>Portal
        </div>

        <nav className="jobseeker-sidebar-menu">

          <Link
            to="/jobseekerDashboard"
            className="jobseeker-menu-item active"
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

      <main className="jobseeker-content">

        <div className="jobseeker-header">

          <h1>Jobseeker Dashboard</h1>

          <p>
            Welcome back! Here is your job application overview.
          </p>

        </div>


        {/* ================= STAT CARDS ================= */}

        <div className="jobseeker-stats">

          <div className="jobseeker-stat-card">
            <h2>12</h2>
            <p>Total Applications</p>
          </div>

          <div className="jobseeker-stat-card">
            <h2>5</h2>
            <p>Shortlisted</p>
          </div>

          <div className="jobseeker-stat-card">
            <h2>3</h2>
            <p>Interviews</p>
          </div>

          <div className="jobseeker-stat-card">
            <h2>2</h2>
            <p>Job Offers</p>
          </div>

        </div>


        {/* ================= RECENT APPLICATIONS ================= */}

        <div className="jobseeker-applications">

          <h2>Recent Applications</h2>

          <div className="jobseeker-table-container">

            <table>

              <thead>

                <tr>
                  <th>Company</th>
                  <th>Job Title</th>
                  <th>Applied On</th>
                  <th>Status</th>
                </tr>

              </thead>

              <tbody>

                <tr>
                  <td>Tech Solutions</td>
                  <td>Frontend Developer</td>
                  <td>20 Aug 2026</td>

                  <td>
                    <span className="job-status applied">
                      Applied
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>Infosys</td>
                  <td>React Developer</td>
                  <td>19 Aug 2026</td>

                  <td>
                    <span className="job-status shortlisted">
                      Shortlisted
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>TCS</td>
                  <td>Web Developer</td>
                  <td>18 Aug 2026</td>

                  <td>
                    <span className="job-status review">
                      Under Review
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>Wipro</td>
                  <td>JavaScript Developer</td>
                  <td>17 Aug 2026</td>

                  <td>
                    <span className="job-status interview">
                      Interview
                    </span>
                  </td>
                </tr>

              </tbody>

            </table>

          </div>

          <div className="jobseeker-view-all">

            <Link to="/my-applications">
              View All Applications →
            </Link>

          </div>

        </div>


        {/* ================= RECOMMENDED JOBS ================= */}

        <div className="jobseeker-recommended">

          <div className="jobseeker-recommended-header">

            <h2>Recommended Jobs</h2>

            <Link to="/find-jobs">
              View All →
            </Link>

          </div>


          <div className="jobseeker-job-list">

            {jobs.length === 0 ? (

              <p>No jobs available right now.</p>

            ) : (

              jobs.map((job) => (

                <div
                  className="jobseeker-job-item"
                  key={job._id}
                >

                  <div>

                    <h3>
                      {job.jobTitle}
                    </h3>

                    <p>
                      {job.companyName} · {job.location}
                    </p>

                    <small>💰{job.salary}&nbsp; | &nbsp;💼 {job.jobType}</small>

                  </div>


                  {/* BUTTONS */}

                  <div className="job-buttons">

                    <button
                      className="save-job-btn"
                      onClick={() => handleSaveJob(job)}
                    >
                      ♡ Save
                    </button>


                    <button
                      className="apply-job-btn"
                      onClick={() => handleApplyJob(job)}
                    >
                      Apply
                    </button>

                  </div>

                </div>

              ))

            )}

          </div>

        </div>

      </main>

    </div>
  );
}

export default JobseekerDashboard;