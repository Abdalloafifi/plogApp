import request from "../../utils/request";
import { postsActions } from "../slices/postsSlices";
import { authActions } from "../slices/authSlice";
import { toast } from "react-toastify";

//get all posts
export function getAllPosts(page = 1, category) {
    return async (dispatch) => {
        try {
            let url = `/posts?namPage=${page}`;
            if (category) {
                url += `&category=${category}`;
            }
            const res = await request.get(url);
            const data = res.data;

            // تحديث البوستات للحقل القديم لكي لا يتأثر أي كود آخر
            dispatch(postsActions.getPosts({ posts: data.posts }));

            // تحديث بيانات الترقيم في الحقل الجديد
            dispatch(postsActions.getPostsData(data));

            localStorage.setItem("posts", JSON.stringify(data.posts));
        } catch (error) {
            toast.error(error.message);
            toast.error(error.message);
        }
    };
}
export function getAllPostsUser(id) {
    return async (dispatch) => {
        try {
            const res = await request.get(`/posts/${id}`);
            const data = res.data;
            dispatch(postsActions.getPostsUser(data));
            localStorage.setItem("posts", JSON.stringify(data));
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };
}
//create a new post
export function createPost(postData) {
    return async (dispatch) => {
        try {
            const userId = JSON.parse(localStorage.getItem("user")).id;

            const res = await request.post(`/posts/${userId}`, postData);
            const data = res.data;
            dispatch(postsActions.createPost(data));
            toast.success("Post created successfully");
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };
}
//get one post by id
export function getPost(id) {
    return async (dispatch) => {
        try {
            const res = await request.get(`/posts/post/${id}`);
            const data = res.data;
            dispatch(postsActions.getPosts(data));
            localStorage.setItem("postOne", JSON.stringify(data));
        } catch (error) {
            toast.error(error.message);
        }
    };
}




// إضافة إعجاب (Like) مع التحقق في الخادم
export function createLike(id) {
    return async (dispatch) => {
        try {
            const res = await request.put(`/posts/${id}/like`);
            const data = res.data;
            dispatch(postsActions.getPosts(data)); // تحديث المنشور في الحالة
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };
}

// إزالة إعجاب (Unlike) مع التحقق في الخادم
export function unlikePost(id) {
    return async (dispatch) => {
        try {
            const res = await request.put(`/posts/${id}/unlike`);
            const data = res.data;
            dispatch(postsActions.getPosts(data)); // تحديث المنشور في الحالة
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };
}

//delete post by id
export function deletePost(id) {
    return async (dispatch) => {
        try {
            const res = await request.delete(`/posts/${id}`);
            const data = res.data;
            dispatch(postsActions.getPosts(data));
            toast.success("Post deleted successfully");
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };
}
//update post by id
export function updatePost(id, postData) {
    return async (dispatch) => {
        try {
            const res = await request.put(`/posts/${id}`, postData);
            const data = res.data;
            dispatch(postsActions.updatePost(data));
            toast.success("Post updated successfully");
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };
}
//update photo post by id
export function updatePhotoPost(id, postData) {
    return async (dispatch) => {
        try {
            const res = await request.put(`/posts/updatePhoto/${id}`, postData);
            const data = res.data;
            dispatch(postsActions.getPosts(data));
            toast.success("Photo updated successfully");
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };
}

//get all posts admin
export function getAllPostsAdmin() {
    return async (dispatch) => {
        try {
            const res = await request.get("/posts/posts/Admin");
            const data = res.data;
            dispatch(postsActions.getPosts(data));
            localStorage.setItem("posts", JSON.stringify(data));
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };
}