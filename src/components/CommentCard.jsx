import { useContext } from "react";
import { deleteComment } from "../api";
import { UserContext } from "../contexts/User";

function CommentCard({ comment, setComments, setModalOpen }) {
  const { user } = useContext(UserContext);

  function handleClick(event) {
    // optimistic delete
    setComments((current) => {
      return current.filter(
        (retained) => retained.comment_id !== comment.comment_id
      );
    });
    deleteComment(comment.comment_id).catch((err) => {
      setModalOpen(true);
      setComments((current) => {
        return [comment, ...current];
      });
    });
  }

  if (comment.author === user.username) {
    return (
      <div className="comment-card me">
        <div className="comment-box">
          <span className="author">me</span>
          <span className="date">
            {comment.created_at
              ? new Date(comment.created_at).toDateString()
              : "just now"}
          </span>
        </div>
        <div className="comment-box content">
          <p>{comment.body}</p>
          <button
            className="comment-button"
            onClick={handleClick}
            disabled={comment.comment_id === undefined}
          >
            🗑
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="comment-card">
        <div className="comment-box">
          <span className="author">{comment.author}</span>
          <span className="date">
            {new Date(comment.created_at).toDateString()}
          </span>
        </div>
        <p className="comment-box content">{comment.body}</p>
      </div>
    );
  }
}

export default CommentCard;
