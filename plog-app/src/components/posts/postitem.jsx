import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const PostItem = ({ item }) => {
    const { user } = useSelector((state) => state.auth);


    return (
        <div className="post-item">
            <div className="post-item-image-werpper">
                <img src={item.image} alt="" className="post-item-image" />
            </div>
            <div className="post-item-info-wrapper">
                <div className="post-item-info">
                    <div className="post-otem-author">
                        <Link to={ `/profile/1/${item?.user?._id}` } className="post-item-author">
                            <img 
                                className="header-profile-image" 
                                src={item?.user?.avatar || "https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png"} 
                                alt="" 
                            />
                            <strong>{item?.user?.username || "Unknown Author"}</strong>
                        </Link>
                    </div>
                    <div className="post-item-date">
                        <strong>Posted on: </strong>
                        {new Date(item.createdAt).toDateString()}
                    </div>
                </div>
                <div className="posy-item-details">
                    <h4 className="post-item-title">{item.title}</h4>
                    {user ? (
                        <Link className="post-item-category" to={`/posts/category/${item.category}`}>
                            {item.category}
                        </Link>
                    ) : (
                        item.category
                    )}
                </div>
                <p className="post-item-description">
                    {item.description}
                </p>
                {user && (
                    <Link className="post-item-link" to={`/post/details/${item._id}`}>
                        Read More...
                    </Link>
                )}
            </div>
        </div>
    );
};

export default PostItem;
