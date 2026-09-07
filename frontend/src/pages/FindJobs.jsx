
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./FindJobs.css";

function FindJobs() {

  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);

  const [messageJob, setMessageJob] = useState(null);

  const [message, setMessage] = useState("");


  // ================= GET JOBS =================

  useEffect(() => {

    axios
      .get("http://localhost:4000/jobs")
      .then((response) => {

        console.log("Jobs:", response.data);

        setJobs(response.data.jobs || []);

      })
      .catch((error) => {

        console.log("Jobs Error:", error);

      });

  }, []);


  // ================= LOGOUT =================

  const handleLogout = () => {

    localStorage.removeItem("login");
    localStorage.removeItem("email");
    localStorage.removeItem("name");

    navigate("/login");

  };


  // ================= SAVE JOB =================

  const handleSaveJob = async (job) => {

    try {

      const name = localStorage.getItem("name");
      const email = localStorage.getItem("email");

      console.log("Saving Job:", {
        name,
        email,
        jobId: job._id,
        jobTitle: job.jobTitle,
        companyName: job.companyName,
        location: job.location
      });


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

      console.log("Save Job Error:", error);

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

      console.log("Apply Job Error:", error);

      alert(
        error.response?.data?.message ||
        "Job apply failed"
      );

    }

  };


  // ================= OPEN MESSAGE BOX =================
const handleMessage = (job) => {

  console.log("Selected Job:", job);

  // Employer email ko job ke andar se lena
  const employerEmail = job.employerEmail;

  console.log("Employer Email:", employerEmail);

  setMessageJob({
    ...job,
    employerEmail: employerEmail
  });

  setMessage("");

};



  // ================= CLOSE MESSAGE BOX =================

  const closeMessageBox = () => {

    setMessageJob(null);

    setMessage("");

  };


  


// ================= SEND MESSAGE =================

const handleSendMessage = async () => {

  if (!message.trim()) {

    alert("Please enter a message");

    return;

  }


  try {

    const senderName = localStorage.getItem("name");
    const senderEmail = localStorage.getItem("email");


    const response = await axios.post(
      "http://localhost:4000/send-message",
      {
        senderName: senderName,
        senderEmail: senderEmail,

        employerEmail: messageJob.employerEmail,

        jobId: messageJob._id,

        jobTitle: messageJob.jobTitle,

        companyName: messageJob.companyName,

        message: message
      }
    );


    alert(response.data.message);


    // Message box close

    setMessageJob(null);

    setMessage("");


  } catch (error) {

    console.log("Send Message Error:", error);

    alert(
      error.response?.data?.message ||
      "Message send failed"
    );

  }

};

  return (

    <div className="find-jobs-page">


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
            className="jobseeker-menu-item active"
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

      <main className="find-jobs-content">


        <div className="find-jobs-header">

          <p>JOB SEEKER</p>

          <h1>Find Jobs</h1>

          <span>
            Find your next opportunity from available jobs.
          </span>

        </div>


        {/* ================= JOB LIST ================= */}

        <div className="find-jobs-list">


          {jobs.length === 0 ? (

            <div className="no-jobs">

              <h2>No Jobs Available</h2>

              <p>
                There are no jobs available right now.
              </p>

            </div>

          ) : (

            jobs.map((job) => (

              <div
                className="find-job-card"
                key={job._id}
              >


                <div className="find-job-info">


                  <h2>
                    {job.jobTitle}
                  </h2>


                  <p className="find-company">
                    {job.companyName}
                  </p>


                  <div className="find-job-details">

                    <span>
                      📍 {job.location}
                    </span>

                    <span>
                      💰 {job.salary}
                    </span>

                    <span>
                      💼 {job.jobType}
                    </span>

                  </div>


                </div>


                {/* ================= BUTTONS ================= */}

                <div className="find-job-actions">


                  <button
                    className="save-job-btn"
                    onClick={() =>
                      handleSaveJob(job)
                    }
                  >
                    ♡ Save
                  </button>


                  <button
                    className="find-apply-btn"
                    onClick={() =>
                      handleApplyJob(job)
                    }
                  >
                    Apply
                  </button>


                  <button
                    className="message-job-btn"
                    onClick={() =>
                      handleMessage(job)
                    }
                  >
                    ✉ Message
                  </button>


                </div>


              </div>

            ))

          )}


        </div>


      </main>


      {/* ================= MESSAGE MODAL ================= */}

      {messageJob && (

        <div className="message-overlay">

          <div className="message-box">


            <div className="message-header">

              <div>

                <p>MESSAGE EMPLOYER</p>

                <h2>
                  {messageJob.companyName}
                </h2>

                <span>
                  {messageJob.jobTitle}
                </span>

              </div>


              <button
                className="message-close-btn"
                onClick={closeMessageBox}
              >
                ×
              </button>

            </div>


            <div className="message-form">

              <label>
                Your Message
              </label>


              <textarea
                rows="6"
                placeholder="Write your message to the employer..."
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
              ></textarea>


              <div className="message-buttons">


                <button
                  type="button"
                  className="message-cancel-btn"
                  onClick={closeMessageBox}
                >
                  Cancel
                </button>


                <button
                  type="button"
                  className="message-send-btn"
                  onClick={handleSendMessage}
                >
                  Send Message
                </button>


              </div>

            </div>


          </div>

        </div>

      )}


    </div>

  );

}


export default FindJobs;
