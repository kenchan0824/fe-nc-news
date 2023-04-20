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
        <div className="comment-box comment-author">me</div>
        <div className="comment-box comment-content">
          <p>
            {comment.body}
          </p>
          <button className="comment-box comment-button" onClick={handleClick}>🗑</button>
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
        <div className="comment-box comment-author">{comment.author}</div>
        <p className="comment-box comment-content">{comment.body}</p> 
      </div>
    );
  }
}

export default CommentCard;