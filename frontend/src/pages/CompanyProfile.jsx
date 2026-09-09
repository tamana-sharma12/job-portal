import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CompanyProfile.css";

function CompanyProfile() {

  const navigate = useNavigate();

  const email = localStorage.getItem("email");

  const [company, setCompany] = useState({
    companyName: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    description: ""
  });


  // ================= GET COMPANY PROFILE =================

  useEffect(() => {

    if (!email) {
      return;
    }

    axios
      .get(`${import.meta.env.VITE_API_URL}/company-profile/${email}`)
      .then((response) => {

        console.log("Company Profile:", response.data);

        const data = response.data.company;

        setCompany({
          companyName: data.companyName || "",
          email: data.email || email,
          phone: data.phone || "",
          location: data.location || "",
          website: data.website || "",
          description: data.companyDescription || ""
        });

      })
      .catch((error) => {

        console.log("Company Profile Error:", error);

      });

  }, [email]);


  // ================= HANDLE CHANGE =================

  const handleChange = (e) => {

    setCompany({
      ...company,
      [e.target.name]: e.target.value
    });

  };


  // ================= SAVE PROFILE =================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/company-profile/${email}`,
        {
          companyName: company.companyName,
          phone: company.phone,
          location: company.location,
          website: company.website,
          companyDescription: company.description
        }
      );

      alert(response.data.message);

    } catch (error) {

      console.log("Update Error:", error);

      alert(
        error.response?.data?.message ||
        "Company profile update failed"
      );

    }

  };


  // ================= LOGOUT =================

  const handleLogout = () => {
    
    localStorage.removeItem("login");
    localStorage.removeItem("email");
    localStorage.removeItem("name");

    navigate("/login");

  };


  return (

    <div className="company-profile-page">

      {/* ================= SIDEBAR ================= */}

      <aside className="sidebar">

        <div className="logo">
          <span>Job</span>Portal
        </div>


        <nav className="sidebar-menu">

          <a
            href="/employerDashboard"
            className="menu-item"
          >
            <span>▣</span>
            Dashboard
          </a>


          <a
            href="/my-jobs"
            className="menu-item"
          >
            <span>▤</span>
            My Jobs
          </a>


          <a
            href="/applicants"
            className="menu-item"
          >
            <span>♙</span>
            Applicants
          </a>


          <a
            href="/company-profile"
            className="menu-item active"
          >
            <span>▣</span>
            Company Profile
          </a>


          <a
            href="/messages"
            className="menu-item"
          >
            <span>✉</span>
            Messages
          </a>


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

      <main className="company-profile-content">

        <div className="company-profile-header">

          <p>EMPLOYER</p>

          <h1>Company Profile</h1>

          <span>
            Manage your company information.
          </span>

        </div>


        {/* ================= PROFILE FORM ================= */}

        <div className="company-profile-card">

          <form onSubmit={handleSubmit}>

            <div className="form-row">

              <div className="form-group">

                <label>
                  Company Name
                </label>

                <input
                  type="text"
                  name="companyName"
                  placeholder="Enter company name"
                  value={company.companyName}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  Company Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={company.email}
                  readOnly
                />

              </div>

            </div>


            <div className="form-row">

              <div className="form-group">

                <label>
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  placeholder="Enter phone number"
                  value={company.phone}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  placeholder="e.g. Chandigarh"
                  value={company.location}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            <div className="form-group">

              <label>
                Website
              </label>

              <input
                type="text"
                name="website"
                placeholder="https://example.com"
                value={company.website}
                onChange={handleChange}
              />

            </div>


            <div className="form-group">

              <label>
                Company Description
              </label>

              <textarea
                name="description"
                placeholder="Write about your company..."
                value={company.description}
                onChange={handleChange}
                rows="6"
                required
              ></textarea>

            </div>


            <div className="form-buttons">

              <button
                type="button"
                className="cancel-btn"
                onClick={() =>
                  navigate("/employerDashboard")
                }
              >
                Cancel
              </button>


              <button
                type="submit"
                className="save-profile-btn"
              >
                Save Profile
              </button>

            </div>

          </form>

        </div>

      </main>

    </div>

  );

}

export default CompanyProfile;
