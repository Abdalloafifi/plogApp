import { Link } from "react-router-dom";
import AddCategoryForm from "./AdminCategoryForm";
import { useSelector , useDispatch } from "react-redux"
import {fetchCategories} from "../../redux/apiCalls/categoriesApicall"
import {allComments} from "../../redux/apiCalls/commentApiCall"
import {getUsersProfile} from "../../redux/apiCalls/profileApiCall"
import {getAllPostsAdmin} from "../../redux/apiCalls/postsApiCall"
import { useEffect } from "react";

const AdminMain = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(allComments());
        dispatch(fetchCategories());
        dispatch(getUsersProfile());
        dispatch(getAllPostsAdmin());
    }, [dispatch]);
    const categories = useSelector((state) => state.categories.categories);
    const comments = useSelector((state) => state.comments.comments);
    const posts = useSelector((state) => state.posts.posts);
    const users = useSelector((state) => state.profile.profile);
    
    return (
        <div className="admin-main">
            <div className="admin-main-header">
                <div className="admin-main-card">
                    <h3 className="admin-main-card-title">Total Users</h3>
                    <div className="admin-main-card-count">{users.length}</div>
                    <div className="admin-main-card-link-wrapper">
                        <Link
                            className="admin-main-card-link"
                            to={"/Admin-Dashboard/users-table"}>
                            See View All
                        </Link>
                        <div className="admin-card-icon">
                            <i className="bi bi-person"></i>
                        </div>
                    </div>
                </div>
                <div className="admin-main-card">
                    <h3 className="admin-main-card-title">Total Posts</h3>
                    <div className="admin-main-card-count">{posts.length}</div>
                    <div className="admin-main-card-link-wrapper">
                        <Link
                            className="admin-main-card-link"
                            to={"/Admin-Dashboard/posts-table"}>
                            See View All
                        </Link>
                        <div className="admin-card-icon">
                            <i className="bi bi-file-text"></i>
                        </div>
                    </div>
                </div>
                <div className="admin-main-card">
                    <h3 className="admin-main-card-title">Total Comments</h3>
                    <div className="admin-main-card-count">{comments.length}</div>
                    <div className="admin-main-card-link-wrapper">
                        <Link
                            className="admin-main-card-link"
                            to={"/Admin-Dashboard/comments-table"}>
                            See View All
                        </Link>
                        <div className="admin-card-icon">
                            <i className="bi bi-chat"></i>
                        </div>
                    </div>
                </div>
                <div className="admin-main-card">
                    <h3 className="admin-main-card-title">Total Categories</h3>
                    <div className="admin-main-card-count">{categories.length}</div>
                    <div className="admin-main-card-link-wrapper">
                        <Link
                            className="admin-main-card-link"
                            to={"/Admin-Dashboard/categories-table"}>
                            See View All
                        </Link>
                        <div className="admin-card-icon">
                            <i className="bi bi-tags"></i>
                        </div>
                    </div>
                </div>
            </div>
            <AddCategoryForm/>
        </div>
    );
}

export default AdminMain;