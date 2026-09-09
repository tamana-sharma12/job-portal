import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./PostJob.css";

function PostJob() {
    const navigate = useNavigate();
    const [job, setJob] = useState({
        jobTitle: "",
        companyName: "",
        location: "",
        salary: "",
        jobType: "",
        skills: "",
        description: "",
         employerEmail: localStorage.getItem("email") || ""
    });

    const handleChange = (e) => {
        setJob({
            ...job,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/create-job`,
                job
            );

            alert(response.data.message);

            navigate("/employerDashboard");

        } catch (error) {

            console.log(error);

            alert("Job create nahi hui");

        }
    };

    return (
        <div className="post-job-page">

            <div className="post-job-container">

                <div className="post-job-header">
                    <p>EMPLOYER</p>
                    <h1>Post a New Job</h1>
                    <span>
                        Create a new job opportunity for candidates.
                    </span>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="form-row">

                        <div className="form-group">
                            <label>Job Title</label>

                            <input
                                type="text"
                                name="jobTitle"
                                placeholder="e.g. Frontend Developer"
                                value={job.jobTitle}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Company Name</label>

                            <input
                                type="text"
                                name="companyName"
                                placeholder="e.g. ABC Technologies"
                                value={job.companyName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                    </div>


                    <div className="form-row">

                        <div className="form-group">
                            <label>Location</label>

                            <input
                                type="text"
                                name="location"
                                placeholder="e.g. Chandigarh"
                                value={job.location}
                                onChange={handleChange}
                                required
                            />
                        </div>


                        <div className="form-group">
                            <label>Salary</label>

                            <input
                                type="text"
                                name="salary"
                                placeholder="e.g. ₹25,000 - ₹40,000"
                                value={job.salary}
                                onChange={handleChange}
                                required
                            />
                        </div>

                    </div>


                    <div className="form-group">

                        <label>Job Type</label>

                        <select
                            name="jobType"
                            value={job.jobType}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Select Job Type
                            </option>

                            <option value="Full Time">
                                Full Time
                            </option>

                            <option value="Part Time">
                                Part Time
                            </option>

                            <option value="Internship">
                                Internship
                            </option>

                            <option value="Remote">
                                Remote
                            </option>

                        </select>

                    </div>


                    <div className="form-group">

                        <label>Skills</label>

                        <input
                            type="text"
                            name="skills"
                            placeholder="HTML, CSS, JavaScript, React"
                            value={job.skills}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>Job Description</label>

                        <textarea
                            name="description"
                            placeholder="Write job description..."
                            value={job.description}
                            onChange={handleChange}
                            rows="6"
                            required
                        ></textarea>

                    </div>


                    <div className="form-buttons">

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => navigate("/employer-dashboard")}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="post-btn"
                        >
                            Post Job
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default PostJob;