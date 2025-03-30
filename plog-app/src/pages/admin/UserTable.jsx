import AdminSidebar from "./AdminSidebar";
import { posts } from "../../dummyData";
import { useEffect } from "react";
import "./Admin.css";
import { useSelector , useDispatch } from "react-redux"

import {getUsersProfile} from "../../redux/apiCalls/profileApiCall"




const UserTable = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUsersProfile());
        window.scrollTo(0, 0);
    })
    const posts = useSelector((state) => state.profile.profile);
    return (
        <section className="table-container">
            <AdminSidebar />
            <div className="user-table">
                <table className="user-table-table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Username</th>
                            <th>Joined At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td>{post.username}</td>
                                <td>{post.createdAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default UserTable;
