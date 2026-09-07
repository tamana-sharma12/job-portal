import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MyJobs.css";

function MyJobs() {
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
  },
   []);
   const handleDelete = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this job?"
  );

  if (!confirmDelete) {
    return;
  }

  try {

    const response = await axios.delete(
      `http://localhost:4000/jobs/${id}`
    );

    alert(response.data.message);

    setJobs((previousJobs) =>
      previousJobs.filter((job) => job._id !== id)
    );

  } catch (error) {

    console.log(error);

    alert("Job delete nahi hui");

  }
};
   
  return (
    <div className="my-jobs-page">
      <div className="my-jobs-header">
        <div>
          <p>EMPLOYER</p>
          <h1>My Jobs</h1>
          <span>Manage the jobs you have posted.</span>
        </div>
      </div>

      <div className="jobs-container">
        {jobs.length === 0 ? (
          <div className="no-jobs">
            <h2>No Jobs Found</h2>
            <p>You have not posted any jobs yet.</p>
          </div>
        ) : (
          jobs.map((job) => (
            <div className="job-card" key={job._id}>
              <div className="job-info">
                <h2>{job.jobTitle}</h2>

                <p className="company">{job.companyName}</p>

                <div className="job-details">
                  <span>📍 {job.location}</span>

                  <span>💰 {job.salary}</span>

                  <span>💼 {job.jobType}</span>
                </div>

                <p className="skills">
                  <strong>Skills:</strong> {job.skills}
                </p>

                <p className="description">{job.description}</p>
                <div className="job-actions">
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/edit-job/${job._id}`)}
                  >Edit</button>
                  
                  <button className="delete-btn" onClick={()=>handleDelete(job._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyJobs;
