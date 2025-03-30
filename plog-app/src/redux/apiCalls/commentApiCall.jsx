import request from "../../utils/request";
import { commentsSliceActions } from "../slices/commentSlice";
import { toast } from "react-toastify";

// إنشاء تعليق جديد
export function createComment(postId, commentData) {
    return async (dispatch) => {
        try {
            const res = await request.post(`/comment/${postId}`, commentData);
            const data = res.data;
            dispatch(commentsSliceActions.addComment(data));
            localStorage.setItem("comments", JSON.stringify(data));
            toast.success("Comment created successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to create comment");
        }
    };
}

// جلب جميع التعليقات لمنشور معين
export function getCommentsForPost(postId) {
    return async (dispatch) => {
        try {
            const res = await request.get(`/comment/${postId}/comments`);
            const data = res.data;
            dispatch(commentsSliceActions.setComments(data));
            localStorage.setItem("comments", JSON.stringify(data));
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch comments");
        }
    };
}

// تحديث تعليق
export function updateComment(commentId, updatedData) {
    return async (dispatch) => {
        try {
            const res = await request.put(`/comment/${commentId}`, updatedData);
            const data = res.data;
            dispatch(commentsSliceActions.updateComment(data));
            toast.success("Comment updated successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update comment");
        }
    };
}

// حذف تعليق
export function deleteComment(commentId) {
    return async (dispatch) => {
        try {
            await request.delete(`/comment/${commentId}`);
            dispatch(commentsSliceActions.deleteComment(commentId));
            toast.success("Comment deleted successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete comment");
        }
    };
}

// إضافة إعجاب لتعليق
export function likeComment(commentId) {
    return async (dispatch) => {
        try {
            const res = await request.put(`/comment/${commentId}/like`);
            const updatedComment = res.data;
            dispatch(commentsSliceActions.updateCommentLikes(updatedComment));
            toast.success("Comment liked");
        } catch (error) {
            console.error(error);
            toast.error("Failed to like comment");
        }
    };
}

// إزالة إعجاب من تعليق
export function unlikeComment(commentId) {
    return async (dispatch) => {
        try {
            const res = await request.put(`/comment/${commentId}/unlike`);
            const updatedComment = res.data;
            dispatch(commentsSliceActions.updateCommentLikes(updatedComment));
            toast.success("Comment unliked");
        } catch (error) {
            console.error(error);
            toast.error("Failed to unlike comment");
        }
    };
}
//all comments
export function allComments() {
    return async (dispatch) => {
        try {
            const res = await request.get("/comment/Allcomments");
            const data = res.data;
            dispatch(commentsSliceActions.allComments(data));
            localStorage.setItem("comments", JSON.stringify(data));
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch comments", error);
        }
    };
}