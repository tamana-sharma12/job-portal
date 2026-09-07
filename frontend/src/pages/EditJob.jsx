import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./PostJob.css";

function EditJob() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [job, setJob] = useState({
        jobTitle: "",
        companyName: "",
        location: "",
        salary: "",
        jobType: "",
        skills: "",
        description: ""
    });

    const [loading, setLoading] = useState(true);

    // Get single job
    useEffect(() => {

        axios
            .get(`http://localhost:4000/jobs/${id}`)
            .then((response) => {

                setJob(response.data.job);
                setLoading(false);

            })
            .catch((error) => {

                console.log(error);
                setLoading(false);

            });

    }, [id]);


    const handleChange = (e) => {

        setJob({
            ...job,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.put(
                `http://localhost:4000/jobs/${id}`,
                job
            );

            alert(response.data.message);

            navigate("/my-jobs");

        } catch (error) {

            console.log(error);

            alert("Job update nahi hui");

        }

    };


    if (loading) {
        return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
    }


    return (

        <div className="post-job-page">

            <div className="post-job-container">

                <div className="post-job-header">

                    <p>EMPLOYER</p>

                    <h1>Edit Job</h1>

                    <span>
                        Update your job details.
                    </span>

                </div>


                <form onSubmit={handleSubmit}>

                    <div className="form-row">

                        <div className="form-group">

                            <label>Job Title</label>

                            <input
                                type="text"
                                name="jobTitle"
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
                            value={job.skills}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>Job Description</label>

                        <textarea
                            name="description"
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
                            onClick={() => navigate("/my-jobs")}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="post-btn"
                        >
                            Update Job
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );
}

export default EditJob;