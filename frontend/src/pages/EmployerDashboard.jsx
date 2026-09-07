import { Link, useNavigate } from "react-router-dom";
import "./EmployerDashboard.css";

function EmployerDashboard() {
  const navigate = useNavigate();

  
const handleLogout = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("email");

    navigate("/login");
};

  return (
    <div className="employer-dashboard">
      {/* ================= SIDEBAR ================= */}

      <aside className="sidebar">
        <div className="logo">
          <span>Job</span>Portal
        </div>

        <nav className="sidebar-menu">
          <Link to="/employerDashboard" className="menu-item active">
            <span>▣</span>
            Dashboard
          </Link>

          <Link to="/my-jobs" className="menu-item">
            <span>▤</span>
            My Jobs
          </Link>

          <Link to="/applicants" className="menu-item">
            <span>♙</span>
            Applicants
          </Link>

          <Link to="/company-profile" className="menu-item">
            <span>▣</span>
            Company Profile
          </Link>

          <Link to="/messages" className="menu-item">
            <span>✉</span>
            Messages
          </Link>

          <button className="logout-btn" onClick={handleLogout}>
            <span>↪</span>
            Logout
          </button>
        </nav>
      </aside>

      {/* ================= MAIN CONTENT ================= */}

      <main className="dashboard-content">
        {/* HEADER */}

       <div className="dashboard-header">

    <div>
        <h1>Dashboard Overview</h1>
    </div>

    <button className="post-job-btn"onClick={() => navigate("/post-job")}> + Post New Job</button>

</div>+



        {/* ================= STAT CARDS ================= */}

        <div className="stats-container">
          <div className="stat-card">
            <h2>12</h2>

            <p>Total Jobs</p>
          </div>

          <div className="stat-card">
            <h2>45</h2>

            <p>Total Applicants</p>
          </div>

          <div className="stat-card">
            <h2>8</h2>

            <p>Active Jobs</p>
          </div>

          <div className="stat-card">
            <h2>5</h2>

            <p>Closed Jobs</p>
          </div>
        </div>

        {/* ================= RECENT APPLICANTS ================= */}

        <div className="applicants-card">
          <div className="applicants-header">
            <h2>Recent Applicants</h2>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Job Title</th>
                  <th>Applied On</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Rohit Kumar</td>

                  <td>Frontend Developer</td>

                  <td>20 Aug 2024</td>

                  <td>
                    <span className="status new">New</span>
                  </td>
                </tr>

                <tr>
                  <td>Priya Verma</td>

                  <td>Frontend Developer</td>

                  <td>19 Aug 2024</td>

                  <td>
                    <span className="status shortlisted">Shortlisted</span>
                  </td>
                </tr>

                <tr>
                  <td>Amit Singh</td>

                  <td>Frontend Developer</td>

                  <td>18 Aug 2024</td>

                  <td>
                    <span className="status review">Under Review</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="view-all">
            <Link to="/applicants">View All Applicants →</Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default EmployerDashboard;
