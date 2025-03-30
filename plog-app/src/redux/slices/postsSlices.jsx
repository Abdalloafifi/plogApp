import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
    name: "posts",
    initialState: {
        posts: localStorage.getItem("posts") ? JSON.parse(localStorage.getItem("posts")) : null,
        postsData: { posts: [], currentPage: 1, totalPages: 1, totalPosts: 0 }, // حقل جديد للـ Pagination
        postOne: localStorage.getItem("postOne") ? JSON.parse(localStorage.getItem("postOne")): null,
    },
    reducers: {
        // تحديث قائمة البوستات فقط دون التأثير على الـ Pagination
        getPosts: (state, action) => {
            state.postOne = action.payload;
        },
        // تحديث بيانات الـ Pagination
        getPostsData: (state, action) => {
            state.postsData = action.payload;
        },
        getPostsUser: (state, action) => {
            state.posts = action.payload;
        },
        createPost: (state, action) => {
            state.posts = action.payload;
        },
        updatePost: (state, action) => {
            state.posts = action.payload;
        },
        deletePost: (state, action) => {
            state.posts = action.payload;
        },
        logOutPosts:(state, action) => {
            state.posts = null;
        },
    },
});

const postsReducer = postsSlice.reducer;
const postsActions = postsSlice.actions;
export { postsReducer, postsActions };
