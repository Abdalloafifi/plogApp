
import { Link } from "react-router-dom";
const AdminSidebar = () => {
    return (
        <div className="admin-sidebar">
            <Link to={"/Admin-Dashboard"}
                className="admin-sidebar-title"
            >
                <i className="bi bi-columns"></i>
                Dashboard</Link>
            <ul className="admin-dashoard-list">
                <Link
                    className="admin-dashoard-list-item"
                    to={"/Admin-Dashboard/users-table"}>
                    <i className="bi bi-person"></i>
                    users
                </Link>
                <Link className="admin-dashoard-list-item"
                    to={"/Admin-Dashboard/posts-table"}>
                    <i className="bi bi-file-text"></i>
                    posts
                </Link>
                <Link className="admin-dashoard-list-item"
                    to={"/Admin-Dashboard/comments-table"}>
                    <i className="bi bi-chat"></i>
                    comments
                </Link>
                <Link className="admin-dashoard-list-item"
                    to={"/Admin-Dashboard/categories-table"}>
                    <i className="bi bi-tags"></i>
                    categories
                </Link>

            </ul>
        </div>
    );
}

export default AdminSidebar;