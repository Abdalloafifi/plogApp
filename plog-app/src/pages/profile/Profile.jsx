import "./Profile.css"; // تأكد من صحة اسم الملف
import { useNavigate, useParams } from "react-router-dom";
import PostList from "../../components/posts/PostList";
import { useEffect, useState, } from "react";
import FormUpdateProfile from "./FormUpdateProfile";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, uploadProfilePhoto, deleteUserProfile } from "../../redux/apiCalls/profileApiCall";
import { getAllPostsUser } from "../../redux/apiCalls/postsApiCall";
import { toast } from "react-toastify";

const Profile = () => {
    const [formVisible, setFormVisible] = useState(false);
    const [file, setFile] = useState(null);
    const { username } = useParams();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profile.profile);
    const posts = useSelector((state) => state.posts.posts);
    const {user}  = useSelector((state) => state.auth);


    // يتم تشغيل useEffect عند تغيير username أو عند تحميل المكون


    useEffect(() => {
        dispatch(getAllPostsUser(username));
        dispatch(fetchUserProfile(username));
    }, [dispatch, username, profile?.avatar]); // إضافة avatar كتبعية

    const handlePhotoUpload = async (e) => {
        e.preventDefault();
        if (!file) return;
        
        const formData = new FormData();
        formData.append("image", file);
        
        try {
            await dispatch(uploadProfilePhoto(formData));
            setFile(null);
            // لا داعي لإعادة التحميل بعد التحديث الصحيح
        } catch (error) {
            toast.error(
              error.response?.data?.message || "Failed to upload photo"
            );
        }
    };
    

    const handleDeleteProfile = () => {
        dispatch(deleteUserProfile(username));
        navigate("/");

    };
    return (
        <section className="profile">
            <div className="profile-header">
                <div className="profile-image-wrapper">
                    <img
                        src={file ? URL.createObjectURL(file) : profile?.avatar}
                        alt="Profile"
                        className="profile-image"
                    />
                    {user?.id === profile?.id && (
                        <form
                            onSubmit={handlePhotoUpload}>
                            <abbr title="Choose profile photo">
                                <label
                                    htmlFor="file"
                                    className="bi bi-camera-fill upload-profile-phto-icon"
                                ></label>
                            </abbr>
                            <input
                                onChange={(e) => setFile(e.target.files[0])}
                                className="upload-profile-phto-input"
                                type="file"
                                id="file"
                            />
                            {file && (
                                <button type="submit" className="upload-profile-phto-btn">
                                    Upload
                                </button>
                            )}

                        </form>
                    )}
                </div>
                {/* عرض اسم المستخدم من الـ profile إذا كان موجوداً */}
                <h1 className="profile-username">
                    {profile?.username || "Unknown User"}
                    <hr />
                </h1>
                <div className="profile-username">
                    <strong>Joined:</strong>
                    <span>
                        {profile?.createdAt
                            ? new Date(profile.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })
                            : "Unknown"}
                    </span>
                </div>
                {user?.id === profile?.id && (
                    <button
                        onClick={() => setFormVisible(!formVisible)}
                        className="ptofile-update-btn"
                    >
                        <i className="bi bi-file-person-fill"></i>
                        Edit Profile
                    </button>
                )}
            </div>
            <div className="profile-posts-list">
                <h2 className="profile-posts-title">Posts</h2>
                {posts && posts.length > 0 ? (
                    <PostList post={posts} />
                ) : (
                    <p>No posts available.</p>
                )}
            </div>
            {user?.id === profile?.id && (
                <button
                    onClick={handleDeleteProfile} className="delete-account-btn">
                    <i className="bi bi-trash-fill"></i>
                    Delete Account
                </button>
            )}
            {formVisible && <FormUpdateProfile Form={setFormVisible} />}
        </section>
    );
};

export default Profile;
