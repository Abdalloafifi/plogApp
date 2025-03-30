import { useState } from "react";
import { toast } from "react-toastify";
import "./formProfile.css"
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updateUserProfile } from "../../redux/apiCalls/profileApiCall";


const FormUpdateProfile = ({ Form }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email.trim() === "") return toast.error("Email is empty");
        if (password.trim() === "") return toast.error("Password is empty");

        // عرض البيانات في الكونسول
        dispatch (updateUserProfile(  {email,  password} ))

        // إعادة تعيين الحقول
        setEmail("");
        setPassword("");

        handleClose();

    // عمل refresh كامل للصفحة
    window.location.reload();
    };

    const handleClose = () => {
        Form(false);
    };

    return (
        <div className="profile-update-overlay">
            <form onSubmit={handleSubmit} className="profile-update-form">
                <abbr
                    title="CLOSE"
                    onClick={handleClose}
                    style={{ cursor: "pointer" }}
                >
                    <i className="bi bi-x-circle-fill profile-update-close"></i>
                </abbr>
                <h1>Update Profile</h1>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="profile-update-input"
                    type="email"
                    placeholder="Email"
                />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="profile-update-input"
                    type="password"
                    placeholder="Password"
                />
                <button className="profile-update-submit" type="submit">
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default FormUpdateProfile;
