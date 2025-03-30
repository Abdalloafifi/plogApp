import { useParams } from "react-router-dom";
import PostList from "../../components/posts/PostList";
import Sidebar from "../../components/sidebar/sidebar";
import Pagination from "../../components/paginations/pagination";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../redux/apiCalls/postsApiCall";

const Category = () => {
    const { categoryId } = useParams();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);

    // الحصول على بيانات المنشورات مع بيانات الترقيم من Redux
    const { posts: categoryPosts, totalPages } = useSelector(
        (state) => state.posts.postsData
    );

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // جلب المنشورات الخاصة بالفئة والصفحة الحالية
    useEffect(() => {
        dispatch(getAllPosts(currentPage, categoryId));
    }, [dispatch, currentPage, categoryId]);

    if (!categoryPosts || categoryPosts.length === 0) {
        return <h1>No posts found</h1>;
    }

    return (
        <>
            <section className="post-page">
                <PostList post={categoryPosts} />
                <Sidebar />
            </section>
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </>
    );
};

export default Category;
