import { useState , useEffect } from "react";
import "./update-post.css";
import { toast } from "react-toastify"
import {  useSelector , useDispatch } from "react-redux";
import { fetchCategories } from "../../redux/apiCalls/categoriesApicall";
import { updatePost } from "../../redux/apiCalls/postsApiCall";


const UpdatePostModal = ({ onClose , id}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const categories = useSelector((state) => state.categories.categories);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title.trim() === '') return toast.error("title is empty");
        if (description.trim() === '') return toast.error("description is empty");
        if (category.trim() === '') return toast.error("category is empty");


        await dispatch(updatePost(id, { title, description, category }));
        setCategory("");
        setDescription("");
        setTitle("");
        handleClose();
    }
    const handleClose = () => {
        onClose(false);
    };

    return (
        <div className="update-post">
            <form onSubmit={handleSubmit} className="update-post-form">
                <abbr title="CLOSE" onClick={handleClose} style={{ cursor: "pointer" }}>
                    <i className="bi bi-x-circle-fill update-post-form-close"></i>
                </abbr>
                {/* يمكنك إضافة باقي حقول التحديث هنا */}
                <h1>update the post</h1>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="update-post-form-input"
                    type="text" placeholder="Title" />
                <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="update-post-form-input"
                    type="text" placeholder="Description" />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="create-post-input"
                >
                    <option value="" disabled>
                        Select Category
                    </option>
                    {categories && categories.map((cat) => (
                        <option key={cat._id} >
                            {cat.text}
                        </option>
                    ))}
                </select>
                <button
                    className="update-post-form-submit" type="submit">Update Post</button>
            </form>
        </div>
    );
};

export default UpdatePostModal;
