import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Messages.css";

function Messages() {

  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= GET EMPLOYER MESSAGES =================

  useEffect(() => {

    const employerEmail = localStorage.getItem("email");

    if (!employerEmail) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    axios
      .get(`http://localhost:4000/messages/${employerEmail}`)
      .then((response) => {

        console.log("Messages:", response.data);

        setMessages(response.data.messages || []);

        setLoading(false);

      })
      .catch((error) => {

        console.log("Messages Error:", error);

        setLoading(false);

      });

  }, [navigate]);


  // ================= LOGOUT =================

  const handleLogout = () => {

    localStorage.removeItem("login");
    localStorage.removeItem("email");
    localStorage.removeItem("name");

    navigate("/login");

  };


  return (

    <div className="messages-page">

      {/* ================= SIDEBAR ================= */}

      <aside className="sidebar">

        <div className="logo">
          <span>Job</span>Portal
        </div>

        <nav className="sidebar-menu">

          <Link
            to="/employerDashboard"
            className="menu-item"
          >
            <span>▣</span>
            Dashboard
          </Link>

          <Link
            to="/my-jobs"
            className="menu-item"
          >
            <span>▤</span>
            My Jobs
          </Link>

          <Link
            to="/applicants"
            className="menu-item"
          >
            <span>♙</span>
            Applicants
          </Link>

          <Link
            to="/company-profile"
            className="menu-item"
          >
            <span>▣</span>
            Company Profile
          </Link>

          <Link
            to="/messages"
            className="menu-item active"
          >
            <span>✉</span>
            Messages
          </Link>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            <span>↪</span>
            Logout
          </button>

        </nav>

      </aside>


      {/* ================= MAIN CONTENT ================= */}

      <main className="messages-content">

        <div className="messages-header">

          <p>EMPLOYER</p>

          <h1>Messages</h1>

          <span>
            Messages received from job candidates.
          </span>

        </div>


        {/* ================= MESSAGES ================= */}

        {loading ? (

          <div className="messages-empty">
            <h2>Loading Messages...</h2>
          </div>

        ) : messages.length === 0 ? (

          <div className="messages-empty">

            <div className="empty-icon">
              ✉
            </div>

            <h2>No Messages Yet</h2>

            <p>
              You have not received any messages from candidates.
            </p>

          </div>

        ) : (

          <div className="messages-list">

            {messages.map((item) => (

              <div
                className="message-card"
                key={item._id}
              >

                {/* ================= MESSAGE TOP ================= */}

                <div className="message-card-top">

                  <div className="candidate-info">

                    <div className="candidate-avatar">
                      {item.senderName
                        ? item.senderName.charAt(0).toUpperCase()
                        : "C"}
                    </div>

                    <div>

                      <h2>
                        {item.senderName}
                      </h2>

                      <p>
                        {item.senderEmail}
                      </p>

                    </div>

                  </div>

                  <span className="message-date">

                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                          }
                        )
                      : ""}

                  </span>

                </div>


                {/* ================= JOB INFO ================= */}

                <div className="message-job-info">

                  <span>
                    Job
                  </span>

                  <strong>
                    {item.jobTitle}
                  </strong>

                  <span>
                    Company
                  </span>

                  <strong>
                    {item.companyName}
                  </strong>

                </div>


                {/* ================= MESSAGE ================= */}

                <div className="candidate-message">

                  <label>
                    Candidate Message
                  </label>

                  <p>
                    {item.message}
                  </p>

                </div>

              </div>

            ))}

          </div>

        )}

      </main>

    </div>

  );

}

export default Messages;
