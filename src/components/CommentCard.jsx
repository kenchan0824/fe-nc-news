import { useState } from "react";
import { deleteComment } from "../api";

function CommentCard({ user, comment, setComments }) {

  function handleClick(event) {
    // delete optimistically
    setComments((current) => {
      return current.filter((retained) => retained.comment_id !== comment.comment_id);
    });
    deleteComment(comment.comment_id)
      .catch(err => {
        comment.error = true;
        setComments((current) => {
          return [comment, ...current];
        })
      });
  }

  if (comment.author === user.username) {
    return (
      <div className="comment-card me" >
        <div className="comment-box">
          <span className="author">me</span>
          <span className="date">{new Date(comment.created_at).toDateString()}</span>
        </div>
        <div className="comment-box content">
          <p>
            {comment.body}
          </p>
          <button className="comment-button" onClick={handleClick}>🗑</button>
          {
            comment.error &&
            <div className="tooltip">
              <span>❗</span>
              <span className="tooltip-text">Oops, can't delete your comment!</span>
            </div>
          }
        </div>
      </div>
    );
  } else {
    return (
      <div className="comment-card">
        <div className="comment-box">
          <span className="author">{comment.author}</span>
          <span className="date">{new Date(comment.created_at).toDateString()}</span>
        </div>
        <p className="comment-box content">{comment.body}</p> 
      </div>
    );
  }
}

export default CommentCard;