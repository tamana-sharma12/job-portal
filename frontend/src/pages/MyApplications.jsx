import { useEffect, useState } from "react";
import axios from "axios";
import "./MyApplications.css";

function MyApplications() {

  const [applications, setApplications] = useState([]);

const email = localStorage.getItem("email");

useEffect(() => {

  if (!email) {
    return;
  }

  console.log("Logged-in Email:", email);

  console.log(
    "API URL:",
    `${import.meta.env.VITE_API_URL}/my-applications/${email}`
  );

  axios
    .get(`${import.meta.env.VITE_API_URL}/my-applications/${email}`)
    .then((response) => {

      console.log("My Applications:", response.data);

      console.log(
        "Applications Count:",
        response.data.applications.length
      );

      console.log(
        "Applications Data:",
        response.data.applications
      );

      setApplications(response.data.applications || []);

    })
    .catch((error) => {

      console.log("Applications Error:", error);

    });

}, [email]);
  


  return (
    <div className="my-applications-page">

      <div className="my-applications-header">

        <p>JOB SEEKER</p>

        <h1>My Applications</h1>

        <span>
          Track the jobs you have applied for.
        </span>

      </div>


      <div className="applications-card">

        <div className="table-wrapper">

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

              {applications.length === 0 ? (

                <tr>

                  <td
                    colSpan="4"
                    className="no-applications"
                  >
                    No applications found
                  </td>

                </tr>

              ) : (

                applications.map((application) => (

                  <tr key={application._id}>

                    <td>
                      {application.companyName || "Company"}
                    </td>

                    <td>
                      {application.jobTitle}
                    </td>

                    <td>

                      {application.appliedOn
                        ? new Date(
                            application.appliedOn
                          ).toLocaleDateString()
                        : "N/A"}

                    </td>

                    <td>

                      <span
                        className={`application-status ${
                          application.status
                            ?.toLowerCase()
                            .replace(" ", "-")
                        }`}
                      >
                        {application.status || "New"}
                      </span>

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

export default MyApplications;