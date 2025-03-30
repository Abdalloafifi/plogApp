import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { logoutUser } from "../../redux/apiCalls/authApiCall";

const HeaderRight = () => {
    const dispatch = useDispatch()
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="header-right">
            {user ? (
                <div
                    onClick={() => setDropdownVisible(!dropdownVisible)}
                    className="header-right-profile">
                    <h5>
                        {user.username}
                    </h5>
                    <img 
                        className="header-profile-image"
                        src={user?.avatar || "https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png"}
                        alt={user.username}
                    />
                    {dropdownVisible && (
                        <div className="header-right-profile-dropdown">
                            <Link to={`/profile/1/${user.id}`} className="header-dropdown-item">
                                <i className="bi bi-person"></i>
                                <span>Profile</span>
                            </Link>
                            <div
                                onClick={() => dispatch(logoutUser())} 
                                className="header-dropdown-item">
                                <i className="bi bi-box-arrow-in-left"></i>
                                <span>Logout</span>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <>
                    <Link to="/login" className="header-right-link">
                        <span>Login</span>
                    </Link>
                    <Link to="/register" className="header-right-link">
                        <i className="bi bi-box-person-plus"></i>
                        <span>Register</span>
                    </Link>
                </>
            )}
        </div>
    );
};

export default HeaderRight;
