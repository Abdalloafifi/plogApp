import { useState } from "react";
import "./update-post.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updatePhotoPost } from "../../redux/apiCalls/postsApiCall";

const Updateimg = ({ onClose, id }) => {
    const [img, setImg] = useState(null);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!img) return toast.error("Please select an image");

        const formData = new FormData();
        formData.append("image", img);
        
        await dispatch(updatePhotoPost(id, formData));
        setImg(null);
        handleClose();
    };

    const handleClose = () => {
        onClose(false);
    };

    return (
        <div className="update-post">
            <form onSubmit={handleSubmit} className="update-post-form">
                <abbr title="CLOSE" onClick={handleClose} style={{ cursor: "pointer" }}>
                    <i className="bi bi-x-circle-fill update-post-form-close"></i>
                </abbr>
                <h1>Update Image</h1>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImg(e.target.files[0])}
                    className="update-post-form-input"
                />
                <button className="update-post-form-submit" type="submit">Update Image</button>
            </form>
        </div>
    );
};

export default Updateimg;
