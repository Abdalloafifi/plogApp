import React, { useState, useEffect } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/apiCalls/authApiCall";
import { toast } from "react-toastify";

const Register = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState(""); // الحقل "name" يتماشى مع الباك إند
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // التحقق من ملء جميع الحقول
        if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
            toast.error("Please fill in all fields");
            return;
        }
        // التحقق من تطابق كلمة المرور مع تأكيدها
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        // استدعاء دالة التسجيل وتمرير البيانات المطلوبة
        dispatch(registerUser({ name, email, password }));
        // إعادة تعيين الحقول بعد الإرسال
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    };

    return (
        <div className="divName">
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <h1>Register</h1>
                    <div className="input-box">
                        <input
                            type="text"
                            id="name"
                            placeholder="Full Name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <i className="bx bx-user"></i>
                    </div>
                    <div className="input-box">
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <i className="bx bx-envelope"></i>
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <i className="bx bxs-lock-alt"></i>
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            id="confirm-password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />   
                        <i className="bx bxs-lock-alt"></i>
                    </div>
                    <div className="button-container">
                        <button className="btn" type="submit">
                            Register
                        </button>
                    </div>
                    <div className="register-link">
                        <Link to="/login">
                            <p>Already have an account?</p> Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
