import PostItem from "./postitem";
import "./Post.css";

const PostList = ({ post }) => {
    return (
        <div className="post-list">
            {post.map((item) => (
                <div key={item.id}>

                    
                    <PostItem key={item.id} item={item} />
                </div>
            ))}
        </div>
    );
}

export default PostList;
