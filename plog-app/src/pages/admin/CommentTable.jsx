import AdminSidebar from "./AdminSidebar";
import { useEffect } from "react";
import "./Admin.css";
import { useSelector, useDispatch } from "react-redux"

import { allComments } from "../../redux/apiCalls/commentApiCall"



function CommentTable() {
    const dispatch = useDispatch();
    const comments = useSelector((state) => state.comments.comments);
    useEffect(() => {
        dispatch(allComments());
        window.scrollTo(0, 0);
    }, [dispatch]);
    return (
        <section className="table-container">
            <AdminSidebar />
            <div className="comment-table">
                <table className="comment-table-table">
                    <thead>
                        <tr>
                            <th>Comment</th>
                            <th>Author</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments.map((comment) => (
                            <tr key={comment._id}>
                                <td>{comment.text}</td>
                                <td>{comment?.user.username}</td>
                                <td>{comment.createdAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}


export default CommentTable;
