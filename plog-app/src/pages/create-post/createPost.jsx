// src/components/posts/createPost.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom"
import "./Create-posts.css";
import { toast } from "react-toastify";
import { createPost } from "../../redux/apiCalls/postsApiCall";
import { fetchCategories } from "../../redux/apiCalls/categoriesApicall";

const CreatePost = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchCategories());
    }, [dispatch]);

    // الحصول على الكاتيجوري من الـ Redux
    const categories = useSelector((state) => state.categories.categories);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim() === '') return toast.error("title is empty");
        if (description.trim() === '') return toast.error("description is empty");
        if (category.trim() === '') return toast.error("category is empty");
        if (image === null) return toast.error("image is empty");

        const formData = new FormData();
        formData.append("image", image);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);
        dispatch(createPost(formData));

        // إعادة تعيين القيم بعد الإرسال
        setTitle('');
        setDescription('');
        setCategory('');
        setImage(null);
        navigate("/posts");
    };

    return (
        <div className="section-create-post">
            <h1 className="create-post-title">Create a New Post</h1>
            <form onSubmit={handleSubmit} className="create-post-form">
                Title
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder="Title"
                    className="create-post-input"
                />
                Description
                <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    type="text"
                    placeholder="Description"
                    className="create-post-input"
                />
                Choose one item
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
                Choose a picture
                <input
                    onChange={(e) => setImage(e.target.files[0])}
                    type="file"
                    className="create-post-input"
                />
                <button type="submit" className="create-post-submit">
                    Create Post
                </button>
            </form>
        </div>
    );
};

export default CreatePost;
