import AdminSidebar from "./AdminSidebar";
import { posts } from "../../dummyData";
import { useEffect } from "react";
import "./Admin.css";
import { useSelector , useDispatch } from "react-redux"

import {getUsersProfile} from "../../redux/apiCalls/profileApiCall"




const PostTable = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(getUsersProfile());
    })
    const posts = useSelector((state) => state.posts.posts);
    return (
        <section className="table-container">
            <AdminSidebar />
            <div className="post-table">
                <table className="post-table-table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Author</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td>{post.title}</td>
                                <td>{post.category}</td>
                                <td>{post.user.username}</td>
                                <td>{post.createdAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default PostTable;
