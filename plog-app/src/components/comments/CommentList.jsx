import React, { useState, useEffect, useRef } from "react";
import "./CommentList.css";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  getCommentsForPost,
  createComment,
  likeComment,
  unlikeComment,
} from "../../redux/apiCalls/commentApiCall";
import { Link } from "react-router-dom";

const CommentItem = ({ comment, onReplySubmit, postId }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showNested, setShowNested] = useState(true);
  const replyInputRef = useRef(null); // مرجع لحقل الإدخال للردود

  // تفعيل التركيز عند فتح نموذج الرد
  const handleReplyOpen = () => {
    setShowReplyForm(true);
    setTimeout(() => {
      if (replyInputRef.current) {
        replyInputRef.current.focus();
      }
    }, 100);
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (replyText.trim() === "") {
      toast.error("Reply is empty");
      return;
    }
    onReplySubmit(comment._id, replyText);
    setReplyText("");
    setShowReplyForm(false);
  };

  const isLiked = comment.like?.includes(user?.id);
  const handleLike = () => {
    if (isLiked) {
      dispatch(unlikeComment(comment._id));
    } else {
      dispatch(likeComment(comment._id));
    }
  };

  return (
    <div className="comment-item">
      <div className="comment">
        <Link to={`/profile/${comment.user?._id}`}>
          <img
            src={comment.user?.avatar || "/default-avatar.png"}
            alt="user"
            className="comment-img"
          />
        </Link>
        <div className="comment-text">
          <Link to={`/profile/${comment.user?._id}`}>
            <h3 className="comment-name">{comment.user?.username}</h3>
          </Link>
          <span className="comment-date">
            {new Date(comment.createdAt).toLocaleString()}
          </span>
          <p className="comment-comment">{comment.text}</p>
          <div className="comment-actions">
            <button onClick={handleReplyOpen} className="reply-button">
              Reply
            </button>
            <button onClick={handleLike} className="like-button">
              {isLiked ? <i className="bi bi-heart-fill"></i> : <i className="bi bi-heart"></i>}
              <span className="like-count">{comment.like.length}</span>
            </button>
            {comment.replies?.length > 0 && (
              <button
                onClick={() => setShowNested(!showNested)}
                className="toggle-nested-button"
              >
                {showNested ? <i className="bi bi-chevron-up"></i> : <i className="bi bi-chevron-down"></i>}
                <span className="nested-count">{comment.replies.length} replies</span>
              </button>
            )}
          </div>
        </div>
      </div>
      {showReplyForm && (
        <form onSubmit={handleReplySubmit} className="reply-form">
          <input
            ref={replyInputRef}
            type="text"
            placeholder="Write a reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="reply-input"
          />
          <button type="submit" className="reply-submit">
            <i className="bi bi-send"></i>
          </button>
        </form>
      )}
      {showNested && comment.replies?.length > 0 && (
        <div className="nested-comments">
          {comment.replies.map((reply) => (
            <CommentItem key={reply._id} comment={reply} onReplySubmit={onReplySubmit} postId={postId} />
          ))}
        </div>
      )}
    </div>
  );
};

const CommentList = ({ postId }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments.comments);
  const [commentInput, setCommentInput] = useState("");
  const commentInputRef = useRef(null); // مرجع لحقل الإدخال الرئيسي

  useEffect(() => {
    dispatch(getCommentsForPost(postId));
    if (commentInputRef.current) {
      commentInputRef.current.focus();
    }
  }, [dispatch, postId]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentInput.trim() === "") {
      toast.error("Comment is empty");
      return;
    }
    dispatch(createComment(postId, { text: commentInput }))
      .then(() => {
        setCommentInput("");
        dispatch(getCommentsForPost(postId));
      })
      .catch(() => toast.error("Failed to post comment"));
  };

  return (
    <div className="comment-list">
      <h4 className="comment-list-count">{comments?.length || 0} Comments</h4>
      <form onSubmit={handleCommentSubmit} className="comment-form">
        <input
          ref={commentInputRef}
          type="text"
          placeholder="Write a comment..."
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          className="comment-input"
        />
        <button type="submit" className="comment-submit">
          <i className="bi bi-send"></i>
        </button>
      </form>
      {comments?.map((comment) => (
        <CommentItem key={comment._id} comment={comment} onReplySubmit={handleCommentSubmit} postId={postId} />
      ))}
    </div>
  );
};

export default CommentList;
