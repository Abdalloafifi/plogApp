import { createSlice } from "@reduxjs/toolkit";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        comments: localStorage.getItem("comments") ? JSON.parse(localStorage.getItem("comments")) : [],
    },
    reducers: {
        setComments: (state, action) => {
            state.comments = action.payload;
            localStorage.setItem("comments", JSON.stringify(state.comments));
        },
        addComment: (state, action) => {
            state.comments.unshift(action.payload);
            localStorage.setItem("comments", JSON.stringify(state.comments));
        },
        updateComment: (state, action) => {
            const index = state.comments.findIndex(c => c._id === action.payload._id);
            if (index !== -1) {
                state.comments[index] = action.payload;
                localStorage.setItem("comments", JSON.stringify(state.comments));
            }
        },
        deleteComment: (state, action) => {
            state.comments = state.comments.filter(c => c._id !== action.payload);
            localStorage.setItem("comments", JSON.stringify(state.comments));
        },
        updateCommentLikes: (state, action) => {
            // تحديث التعليق المتداخل (nested) مع الحفاظ على بيانات المستخدم
            const updateNestedLikes = (comments) => {
                return comments.map((comment) => {
                    if (comment._id === action.payload._id) {
                        return {
                            ...comment,
                            like: action.payload.like, // تحديث الإعجابات الجديدة فقط
                        };
                    } else if (comment.replies && comment.replies.length > 0) {
                        return { ...comment, replies: updateNestedLikes(comment.replies) };
                    }
                    return comment;
                });
            };
            state.comments = updateNestedLikes(state.comments);
            localStorage.setItem("comments", JSON.stringify(state.comments));
        },
        logOutComments: (state, action) => {
            state.comments = null;
        },
        allComments: (state, action) => {
            state.comments = action.payload;
        },
    }
});
const commentsSliceReducer = commentsSlice.reducer;
const commentsSliceActions = commentsSlice.actions;
export { commentsSliceReducer, commentsSliceActions };
