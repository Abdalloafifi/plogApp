import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/apiCalls/authApiCall";

const Login = () => {
    const [login, setLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [forEmail, setForEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        if (email.trim() === "" || password.trim() === "") {
            toast.error("Email or Password is empty");
            return;
        }
        // TODO: validate email and password

        // TODO: call API to login
        dispatch(loginUser({ email, password }));
        setEmail("");
        setPassword("");
        setTimeout(() => {
        }, 5000);
    };

    const handleSubmitForgotPassword = async (e) => {
        e.preventDefault();
        if (forEmail.trim() === "") {
            toast.error("Email is empty");
            return;
        }
        // TODO: validate email
        console.log(forEmail);
        setForEmail("");
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="divName">
            <div className="wrapper">
                {login ? (
                    <form
                        onSubmit={handleSubmitLogin}
                        method="post">
                        <h1>Login</h1>
                        <div className="input-box">
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                id="email"
                                placeholder="email"
                                name="email"
                                required
                            />
                            <i className="bx bx-user"></i>
                        </div>
                        <div className="input-box">
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                id="password"
                                placeholder="password"
                                name="password"
                                required
                            />
                        </div>
                        <div className="button-container">
                            <button className="btn" type="submit">
                                Login
                            </button>
                        </div>
                        <div className="register-link">
                            <a
                                onClick={() => setLogin(!login)}
                                style={{ cursor: "pointer" }}
                            >
                                <p>Forget Password?</p>
                            </a>
                            <br />
                            <Link to="/Register">
                                <p>Don't have an account?</p> Register
                            </Link>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleSubmitForgotPassword} action="#" method="post">
                        <h1>Forget Password</h1>
                        <div className="input-box">
                            <input
                                value={forEmail}
                                onChange={(e) => setForEmail(e.target.value)}
                                type="text"
                                id="email"
                                placeholder="email"
                                name="email"
                                required
                            />
                        </div>
                        <div className="button-container">
                            <button className="btn" type="submit">
                                Reset Password
                            </button>
                        </div>
                        <div className="register-link">
                            <a
                                onClick={() => setLogin(!login)}
                                style={{ cursor: "pointer" }}
                            >
                                <p>Back to Login</p>
                            </a>
                            <br />
                            <Link to="/Register">
                                <p>Don't have an account?</p> Register
                            </Link>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Login;
