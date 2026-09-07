
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warning("Please enter email and password");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/login",
        {
          email: email,
          password: password,
        }
      );

      toast.success(response.data.message);

      // Existing login data - kept exactly
      localStorage.setItem("login", "true");
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("name", response.data.name);
      localStorage.setItem("email", response.data.email);

      // Existing role-based navigation - kept exactly
      if (response.data.role === "employer") {
        navigate("/employerDashboard");
      } else if (response.data.role === "jobseeker") {
        navigate("/jobseekerDashboard");
      }

    } catch (error) {
      console.log("ERROR:", error);
      console.log("STATUS:", error.response?.status);
      console.log("BACKEND RESPONSE:", error.response?.data);

      if (error.response) {
        toast.error(
          error.response?.data?.message || "Login failed"
        );
      } else {
        toast.error("Unable to connect to the server");
      }
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        {/* ================= LEFT SIDE ================= */}

        <div className="auth-left">

          <Link to="/" className="auth-logo">
            <span>Job</span>Portal
          </Link>

          <div className="auth-left-content">

            <div className="auth-badge">
              ✦ Welcome back
            </div>

            <h1>
              Your next
              <span> opportunity </span>
              is waiting.
            </h1>

            <p>
              Login to your Job Portal account and continue
              your journey towards your dream career.
            </p>

            <div className="orange-line"></div>

            <div className="auth-features">

              <div>
                <span>✓</span>
                Find jobs that match your skills
              </div>

              <div>
                <span>✓</span>
                Track your applications
              </div>

              <div>
                <span>✓</span>
                Connect with top employers
              </div>

            </div>

          </div>

          <div className="auth-left-bottom">
            <span>💼</span>
            <p>
              Find your dream job with JobPortal.
            </p>
          </div>

        </div>


        {/* ================= RIGHT SIDE ================= */}

        <div className="auth-right">

          <div className="mobile-logo">
            <Link to="/" className="auth-logo">
              <span>Job</span>Portal
            </Link>
          </div>

          <div className="login-heading">

            <div className="login-icon">
              👋
            </div>

            <div>
              <h2>Welcome Back!</h2>

              <p className="auth-subtitle">
                Sign in to continue to your account
              </p>
            </div>

          </div>


          <form onSubmit={handleLogin}>

            <div className="input-group">

              <label>Email Address</label>

              <div className="input-wrapper">

                <span className="input-icon">
                  ✉
                </span>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  autoComplete="off"
                />

              </div>

            </div>


            <div className="input-group">

              <label>Password</label>

              <div className="input-wrapper">

                <span className="input-icon">
                  🔒
                </span>

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "🙈" : "👁"}
                </button>

              </div>

            </div>


            <div className="login-options">

              <label className="remember-option">

                <input
                  type="checkbox"
                />

                <span>Remember me</span>

              </label>

              <span className="forgot-password">
                Forgot password?
              </span>

            </div>


            <button
              type="submit"
              className="login-button"
            >
              Login
              <span>→</span>
            </button>

          </form>


          <div className="login-divider">
            <span>OR</span>
          </div>


          <p className="bottom-text">

            Don't have an account?

            <Link to="/register">
              Create Account
            </Link>

          </p>


          <div className="secure-login">
            🔒 Secure login · Your information is protected
          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;

