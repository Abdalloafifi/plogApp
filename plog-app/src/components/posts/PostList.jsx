import PostItem from "./PostItem";
import "./Post.css";

const PostList = ({ post }) => {
    return (
        <div className="post-list">
            {post.map((item) => (
                <>

                    
                    <PostItem key={item.id} item={item} />
                </>
            ))}
        </div>
    );
}

export default PostList;
