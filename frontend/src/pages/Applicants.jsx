  import { useEffect, useState } from "react";
  import axios from "axios";
  import "./Applicants.css";

  function Applicants() {

    const [applicants, setApplicants] = useState([]);

    useEffect(() => {

      axios
        .get("http://localhost:4000/applicants")
        .then((response) => {

          console.log("Applicants:", response.data);

          setApplicants(response.data.applicants || []);

        })
        .catch((error) => {

          console.log("Applicants Error:", error);

        });

    }, []);


    return (
      <div className="applicants-page">

        {/* ================= HEADER ================= */}

        <div className="applicants-header">

          <div>

            <p>EMPLOYER</p>

            <h1>Applicants</h1>

            <span>
              Manage candidates who applied for your jobs.
            </span>

          </div>

        </div>


        {/* ================= APPLICANTS TABLE ================= */}

        <div className="applicants-card">

          <div className="table-wrapper">

            <table>

              <thead>

                <tr>

                  <th>Candidate</th>

                  <th>Job Title</th>

                  <th>Applied On</th>

                  <th>Status</th>

                </tr>

              </thead>


              <tbody>

                {applicants.length === 0 ? (

                  <tr>

                    <td colSpan="4"className="no-applicants">No applicants found</td>

                  </tr>

                ) : (

                  applicants.map((applicant) => (

                    <tr key={applicant._id}>

                      {/* Candidate */}

                      <td>

                        <div className="candidate">

                          <div className="candidate-avatar">{applicant.name ? applicant.name .charAt(0) .toUpperCase() : "U"}</div>


                          <div>

                            <strong>
                              {applicant.name}
                            </strong>

                            <small>
                              {applicant.email}
                            </small>

                          </div>

                        </div>

                      </td>


                      {/* Job Title */}

                      <td>
                        {applicant.jobTitle}
                      </td>


                      {/* Applied On */}

                      <td>

                        {applicant.appliedOn
                          ? new Date(
                              applicant.appliedOn
                            ).toLocaleDateString()
                          : "N/A"}

                      </td>


                      {/* Status */}

                      <td>
  <select
    className="status-select"
    value={applicant.status || "New"}
    onChange={async (e) => {

      const newStatus = e.target.value;

      try {

        const response = await axios.put(
          `http://localhost:4000/applicants/${applicant._id}/status`,
          {
            status: newStatus
          }
        );

        alert(response.data.message);

        setApplicants((previousApplicants) =>
          previousApplicants.map((item) =>
            item._id === applicant._id
              ? {
                  ...item,
                  status: newStatus
                }
              : item
          )
        );

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data?.message ||
          "Status update failed"
        );

      }

    }}
  >
    <option value="New">New</option>
    <option value="Shortlisted">Shortlisted</option>
    <option value="Under Review">Under Review</option>
    <option value="Interview">Interview</option>
    <option value="Rejected">Rejected</option>
  </select>
                      

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    );
  }

  export default Applicants;