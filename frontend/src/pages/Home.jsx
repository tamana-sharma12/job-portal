import { Link } from "react-router-dom";

import "./Home.css";
function Home() {
  return (
    <div className="home-page">

      {/* ================= NAVBAR ================= */}

      <nav className="home-navbar">

        <Link to="/" className="home-logo">
          <span>Job</span>Portal
        </Link>

        <div className="home-nav-links">
          <a href="#home">Home</a>
          <a href="#jobs">Jobs</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
        </div>

        <div className="home-nav-buttons">
          <Link to="/login" className="nav-login">
            Login
          </Link>

          <Link to="/register" className="nav-register">
            Get Started
          </Link>
        </div>

      </nav>


      {/* ================= HERO SECTION ================= */}

      <section className="hero-section" id="home">

        <div className="hero-content">

          <div className="hero-badge">
            <span>✦</span>
            Find the right job. Build your future.
          </div>

          <h1>
            Your Next
            <span> Opportunity </span>
            Starts Here.
          </h1>

          <p>
            Discover thousands of job opportunities from top companies
            and take the next step in your career journey.
          </p>

          <div className="hero-buttons">

            <Link to="/find-jobs" className="hero-primary-btn">
              Find Jobs
              <span>→</span>
            </Link>

            <Link to="/register" className="hero-secondary-btn">
              Create Account
            </Link>

          </div>

          <div className="hero-trust">

            <div className="trust-avatars">
              <span>👩🏻</span>
              <span>👨🏻</span>
              <span>👩🏼</span>
              <span>👨🏽</span>
            </div>

            <div>
              <strong>10,000+</strong>
              <small>Job seekers growing their careers</small>
            </div>

          </div>

        </div>


        {/* ================= HERO VISUAL ================= */}

        <div className="hero-visual">

          <div className="hero-glow"></div>

          <div className="floating-card card-one">

            <div className="floating-icon">💼</div>

            <div>
              <strong>New Job Match</strong>
              <span>Frontend Developer</span>
            </div>

            <b>✓</b>

          </div>


          <div className="hero-main-card">

            <div className="profile-circle">
              👩🏻‍💻
            </div>

            <h3>Find Your Dream Job</h3>

            <p>
              Connect with companies that match your skills.
            </p>

            <div className="mini-search">
              <span>⌕</span>
              <div>
                <small>Looking for</small>
                <strong>React Developer</strong>
              </div>
            </div>

            <div className="mini-search">
              <span>📍</span>
              <div>
                <small>Location</small>
                <strong>Chandigarh, India</strong>
              </div>
            </div>

            <button>
              Search Jobs →
            </button>

          </div>


          <div className="floating-card card-two">

            <div className="success-icon">✓</div>

            <div>
              <strong>Application Sent</strong>
              <span>React Developer</span>
            </div>

          </div>


          <div className="floating-card card-three">
            <span>✦</span>
            <strong>98%</strong>
            <small>Career Match</small>
          </div>

        </div>

      </section>


      {/* ================= STATS ================= */}

      <section className="stats-section">

        <div className="stat-item">
          <strong>10K+</strong>
          <span>Active Job Seekers</span>
        </div>

        <div className="stat-divider"></div>

        <div className="stat-item">
          <strong>2.5K+</strong>
          <span>Companies Hiring</span>
        </div>

        <div className="stat-divider"></div>

        <div className="stat-item">
          <strong>15K+</strong>
          <span>Jobs Available</span>
        </div>

        <div className="stat-divider"></div>

        <div className="stat-item">
          <strong>8K+</strong>
          <span>Successful Hires</span>
        </div>

      </section>


      {/* ================= FEATURES ================= */}

      <section className="features-section" id="features">

        <div className="section-heading">

          <span>WHY JOBPORTAL?</span>

          <h2>
            Everything you need to
            <span> move forward.</span>
          </h2>

          <p>
            A simple and powerful platform designed to connect
            talented people with great companies.
          </p>

        </div>


        <div className="features-grid">

          <div className="feature-card">

            <div className="feature-icon orange-icon">
              🔎
            </div>

            <h3>Find Perfect Jobs</h3>

            <p>
              Search and discover jobs based on your skills,
              location and career goals.
            </p>

            <Link to="/find-jobs">
              Explore Jobs →
            </Link>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              ⚡
            </div>

            <h3>Apply Easily</h3>

            <p>
              Apply to your favorite jobs quickly and track
              every application from one place.
            </p>

            <Link to="/register">
              Start Applying →
            </Link>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              🏢
            </div>

            <h3>Hire Great Talent</h3>

            <p>
              Employers can post jobs, manage applicants and
              find the right candidates.
            </p>

            <Link to="/register">
              Start Hiring →
            </Link>

          </div>

        </div>

      </section>


      {/* ================= FEATURED JOBS ================= */}

      <section className="jobs-section" id="jobs">

        <div className="jobs-heading">

          <div>
            <span>OPPORTUNITIES</span>

            <h2>
              Featured <strong>Jobs</strong>
            </h2>
          </div>

          <Link to="/find-jobs">
            View All Jobs →
          </Link>

        </div>


        <div className="featured-jobs">

          <div className="job-preview-card">

            <div className="job-company-logo">S</div>

            <div className="job-preview-info">

              <span className="job-tag">FULL TIME</span>

              <h3>React Developer</h3>

              <p>SEA Technologies</p>

              <div>
                <span>📍 Chandigarh</span>
                <span>💰 ₹25K - ₹40K</span>
              </div>

            </div>

            <button>♡</button>

          </div>


          <div className="job-preview-card">

            <div className="job-company-logo purple-logo">F</div>

            <div className="job-preview-info">

              <span className="job-tag">FULL TIME</span>

              <h3>Senior Node.js Developer</h3>

              <p>FF Technologies</p>

              <div>
                <span>📍 Chandigarh</span>
                <span>💰 ₹35K - ₹55K</span>
              </div>

            </div>

            <button>♡</button>

          </div>


          <div className="job-preview-card">

            <div className="job-company-logo green-logo">A</div>

            <div className="job-preview-info">

              <span className="job-tag">FULL TIME</span>

              <h3>Frontend Developer</h3>

              <p>ABC Technologies</p>

              <div>
                <span>📍 Chandigarh</span>
                <span>💰 ₹25K - ₹40K</span>
              </div>

            </div>

            <button>♡</button>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="cta-section" id="about">

        <div className="cta-content">

          <span>READY TO START?</span>

          <h2>
            Your dream career is
            <br />
            <strong>one step away.</strong>
          </h2>

          <p>
            Join thousands of job seekers and employers
            already growing with JobPortal.
          </p>

          <div className="cta-buttons">

            <Link to="/register" className="cta-primary">
              Get Started Free →
            </Link>

            <Link to="/login" className="cta-secondary">
              I Already Have an Account
            </Link>

          </div>

        </div>

        <div className="cta-decoration decoration-one"></div>
        <div className="cta-decoration decoration-two"></div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="home-footer">

        <div className="footer-main">

          <div className="footer-brand">

            <Link to="/" className="home-logo">
              <span>Job</span>Portal
            </Link>

            <p>
              Connecting talent with opportunity
              and helping careers grow.
            </p>

          </div>


          <div className="footer-links">

            <div>
              <h4>For Job Seekers</h4>
              <Link to="/find-jobs">Find Jobs</Link>
              <Link to="/register">Create Account</Link>
              <Link to="/login">Login</Link>
            </div>

            <div>
              <h4>For Employers</h4>
              <Link to="/register">Post a Job</Link>
              <Link to="/register">Find Talent</Link>
              <Link to="/login">Employer Login</Link>
            </div>

            <div>
              <h4>Company</h4>
              <a href="#about">About Us</a>
              <a href="#features">Features</a>
              <a href="#jobs">Jobs</a>
            </div>

          </div>

        </div>


        <div className="footer-bottom">

          <span>© 2026 JobPortal. All rights reserved.</span>

          <span>Built for your next opportunity ✦</span>

        </div>

      </footer>

    </div>
  );
}

export default Home;

