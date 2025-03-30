import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavLinks = ({ toggle, setToggle }) => {
    const { user } = useSelector((state) => state.auth);
    return (
        <nav
            style={{ clipPath: toggle ? "polygon(0 1%, 100% 1%, 100% 100%, 0 100%)" : undefined }}
            className="navbar"
        >
            <ul className="nav-links">
                {!user && (
                    <li>
                        <Link to="/" onClick={() => setToggle(false)} className="nav-link">
                            <i className="bi bi-house"></i>
                            Home
                        </Link>
                    </li>

                )}
                {user && (
                    <div className="nav-links" >
                        <li>
                            <Link  to={`/profile/1/${user.id}`} onClick={() => setToggle(false)} className="nav-link">
                                <i className="bi bi-person"></i>
                                Profile
                            </Link>
                        </li>
                        <li>

                            <Link to="/posts" onClick={() => setToggle(false)} className="nav-link">
                                <i className="bi bi-person-stickies"></i>
                                Posts
                            </Link>
                        </li>
                        <li>
                            <Link to="/create-post" onClick={() => setToggle(false)} className="nav-link">
                                <i className="bi bi-journal-plus"></i>
                                Create
                            </Link>
                        </li>
                    </div>
                )}
                {user?.isAdmin && (
                    <li>
                        <Link to="/Admin-Dashboard" onClick={() => setToggle(false)} className="nav-link">
                            <i className="bi bi-check"></i>
                            Admin Dashboard
                        </Link>
                    </li>

                )}
            </ul>
        </nav>
    );
};

export default NavLinks;
