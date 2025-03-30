import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "./postDetails.css";
import { useState, useEffect } from 'react';
import CommentList from '../../components/comments/CommentList';
import UpdatePostModal from './updatePostModal';
import { useSelector, useDispatch } from "react-redux";
import { getPost, createLike, unlikePost, deletePost } from "../../redux/apiCalls/postsApiCall";
import Updateimg from './updateimg';


const PostDetails = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const [seeComment, setSeeComment] = useState(false);
    const [update, setUpdate] = useState(false);
    const [btn, setBtn] = useState(false);
    const [btnt, setBtnt] = useState(false);
    const [img, setimg] = useState(false);

    const { id } = useParams();
    const item = useSelector((state) => state.posts.postOne);
    const navigate = useNavigate();

    if (!id) return <h1>No post ID provided</h1>;

    useEffect(() => {
        dispatch(getPost(id));
    }, [dispatch, id]);


    if (!item) return <h1>Post not found</h1>;

    // التحقق مما إذا كان المستخدم قد قام بالإعجاب مسبقاً
    const isLiked = item.like?.includes(user?.id);

    const handleLike = () => {
        if (isLiked) {
            dispatch(unlikePost(id));
        } else {
            dispatch(createLike(id));
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            await dispatch(deletePost(id));
            toast.success("Post deleted successfully");
            navigate("/posts");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete post");
        }
    };
    const handleShare = () => {
        const postUrl = window.location.href; // رابط المنشور

        if (navigator.share) {
            navigator.share({
                title: item.title,
                text: item.description,
                url: postUrl
            }).then(() => {
                toast.success("Post shared successfully!");
            }).catch(() => {
                // إذا فشلت المشاركة، يتم نسخ الرابط وإعلام المستخدم
                navigator.clipboard.writeText(postUrl).then(() => {
                    toast.info("Sharing failed, link copied to clipboard.");
                }).catch(() => {
                    toast.error("Could not copy the link.");
                });
            });
        } else {
            // إذا لم يكن `navigator.share` مدعومًا، يتم النسخ تلقائيًا
            navigator.clipboard.writeText(postUrl).then(() => {
                toast.info("Link copied to clipboard.");
            }).catch(() => {
                toast.error("Could not copy the link.");
            });
        }
    };


    return (
        <div className="blog-card">
            {user && item.user && user.id === item.user._id && (
                <div className="bie-three-dots">
                    <i onClick={() => setBtn(!btn)} className="bi bi-three-dots"></i>
                </div>
            )}

            <div className="blog-card__img-wrapper">
                <img src={item.image} alt="Post" className="blog-card__img" />
            </div>
            <div className="blog-card__info-wrapper">
                <div className="blog-card__info">
                    <div className="blog-card__author">
                        {item.user ? (
                            <Link to={`/profile/1/${item?.user?._id}`} className="post-item-author">
                                <img className="header-profile-image" src={item?.user.avatar} alt="" />
                                <strong>{item.user.username || "Unknown"}</strong>
                            </Link>

                        ) : (
                            "Unknown Author"
                        )}
                    </div>
                    <div className="blog-card__date">
                        <strong>Posted on: </strong>
                        {item.createdAt ? new Date(item.createdAt).toDateString() : "Unknown Date"}
                    </div>
                </div>
                <div className="blog-card__details">
                    <h4 className="blog-card__title">{item.title}</h4>
                    <Link className="blog-card__category" to={`/posts/category/${item.category}`}>
                        {item.category}
                    </Link>
                </div>
                <p className="blog-card__description">{item.description}</p>
                <div className="blog-card__more">
                    <div className="blog-card__share" onClick={handleShare}>
                        <i className="bi bi-share-fill"></i>
                        <h3>Share</h3>
                    </div>

                    <div onClick={() => setSeeComment(!seeComment)} className="blog-card__comments">
                        <i className="bi bi-pencil-square"></i>
                        <h3>Comments</h3>
                    </div>
                    <div onClick={handleLike} className="blog-card__like">
                        {isLiked ? (
                            <>
                                <i className="bi bi-heart-fill"></i>
                            </>
                        ) : (
                            <>
                                <i className="bi bi-heart"></i>
                            </>
                        )}

                        <span className="like-count">{item.like ? item.like.length : 0}</span>
                    </div>

                </div>
            </div>
            {seeComment && <CommentList postId={id} />}
            {btn && (
                <div className="btn-three-dots">
                    <i onClick={() => setBtn(!btn)} className="bi bi-x-circle-fill update-post-form-close"></i>
                    <button type="button" onClick={() => { setBtnt(!btnt); setBtn(!btn); }} className="update-post-form-submit">
                        Update
                    </button>
                    <button onClick={handleDelete} type="button" className="update-post-form-submit">
                        Delete
                    </button>
                </div>
            )}
            {btnt && (
                <div className="btn-three-dots">
                    <i onClick={() => setBtnt(!btnt)} className="bi bi-x-circle-fill update-post-form-close"></i>
                    <button type="button" onClick={() => { setUpdate(!update); setBtnt(!btnt); }} className="update-post-form-submit">
                        Update Post
                    </button>
                    <button onClick={() => { setBtnt(!btnt); setimg(!img) }}
                        type="button" className="update-post-form-submit">
                        Update img
                    </button>
                </div>
            )}

            {img && <Updateimg onClose={() => setimg(false)} id={id} />}


            {update && <UpdatePostModal onClose={() => setUpdate(false)} id={id} />}
        </div>
    );
};

export default PostDetails;
