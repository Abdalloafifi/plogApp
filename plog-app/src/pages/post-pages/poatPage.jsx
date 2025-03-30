import PostList from "../../components/posts/PostList";
import Sidebar from "../../components/sidebar/sidebar";
import Pagination from "../../components/paginations/pagination";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "../../redux/apiCalls/postsApiCall";

const PostPage = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);

    // استخدام البيانات المحدثة من postsData
    const { posts, totalPages } = useSelector((state) => state.posts.postsData);

    useEffect(() => {
        dispatch(getAllPosts(currentPage));
        window.scrollTo(0, 0);
    }, [dispatch, currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (!posts) return <h1>Loading...</h1>;

    return (
        <>
            <section className="post-page">
                {posts.length > 0 && <PostList post={posts} />}
                <Sidebar />
            </section>
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </>
    );
};

export default PostPage;
