import { useState, useEffect } from "react";
import { postComment } from "../api";


function CommentForm({ user, article_id, setComments }) {
  const [comment, setComment] = useState("");
  const [error, setError] = useState(false);

  function handleChange(event) {
    setComment(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const body = event.target[0].value;
    if (!body) {
      return alert("You must type somethings!")
    }
    setComment("");
    setComments((current) => {
      return [{body, author: user.username}, ...current]
    });
    setError(false);
    postComment(article_id, body, user.username)
      .then((newComment) => {
        setComments((current) => {
          return [newComment, ...current.slice(1)];
        });
    })
    .catch(() => {
        setError(true);
        setComments((current) => {
          return current.slice(1);
        });
      });
  }

  return (
    <div className="comment-form" >
      <form onSubmit={handleSubmit}>
        <textarea 
          className="comment-input" 
          placeholder="type something ..."
          onChange={handleChange}
          value={comment}
        />
        <button className="comment-button">Post</button>
      </form>
      {
        error && 
        <div className="tooltip">
          <span>❗</span> 
          <span className="tooltip-text">Oops, cannot post your comment!</span>
        </div>
      }
    </div>
  );
}

export default CommentForm;