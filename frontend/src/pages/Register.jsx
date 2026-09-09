import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import axios from "axios";
import "./Auth.css";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("jobseeker");

    const handleRegister = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/register`,
                {
                    name,
                    email,
                    password,
                    role
                }
            );

    
            toast.success(response.data.message);

        } catch (error) {

            toast.warning(
                error.response?.data?.message ||
                "Register failed"
            );
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                <div className="auth-left">

                    <h1>Join Job Portal 🚀</h1>

                    <p>
                        Create your account and discover
                        exciting career opportunities.
                    </p>

                    <div className="orange-line"></div>

                    <span>
                        Your career journey starts here.
                    </span>

                </div>

                <div className="auth-right">

                    <h2>Create Account</h2>

                    <p className="auth-subtitle">
                        Register to get started
                    </p>

                    <form onSubmit={handleRegister}>

                        <label>Full Name</label>

                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            autoComplete="off"
                        />

                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}/>

                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                             autoComplete="new-password"
                        />

                        <label>Register As</label>

                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="jobseeker">
                                Job Seeker
                            </option>

                            <option value="employer">
                                Employer
                            </option>
                        </select>

                        <button type="submit">
                            Create Account
                        </button>

                    </form>

                    <p className="bottom-text">
                        Already have an account?
                        <Link to="/login">Login</Link>
                    </p> 

                </div>

            </div>

        </div>
    );
}

export default Register;