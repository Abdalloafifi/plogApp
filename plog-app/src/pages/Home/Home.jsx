import "./home.css"
import PostList from "../../components/posts/PostList"
import { posts, categories } from "../../dummyData"
import Sidebar from "../../components/sidebar/sidebar";
import { Link } from "react-router-dom";
import { useEffect } from "react";


const Home = () => {
;
        useEffect(() => {
            window.scrollTo(0, 0);
        })
    return (
        <section className="home">
            <div className="home-hero-header">
                <div className="home-hero-header-loyout">
                    <h1>Welcome to Plog App</h1>
                    <h2>A platform for sharing your thoughts and experiences</h2>
                </div>
            </div>
            <div className="home-latest-post">latest post</div>
            <div className="home-controller">
                <PostList post={posts.slice(0, 3)} />
            </div>
            <div className="home-see-posts-link">
                <Link to="/posts" className="home-link">see all posts</Link>
            </div>
        </section>
    );
}

export default Home;