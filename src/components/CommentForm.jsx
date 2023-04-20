import { useState, useEffect } from "react";
import { postComment } from "../api";


function CommentForm({ user, article_id, setComments }) {
  const [comment, setComment] = useState("");
  const [error, setError] = useState(false);
  const [warn, setWarn] = useState(false);

  function handleChange(event) {
    setComment(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const body = event.target[0].value;
    setError(false);
    setWarn(false);
    if (!body.trim()) {
      return setWarn(true);
    }
    setComment("");
    setComments((current) => {
      return [{body, author: user.username}, ...current]
    });
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
          placeholder="say something ..."
          onChange={handleChange}
          value={comment}
          rows={4}
        />
        <button className="comment-button">Post</button>
      </form>
      {
        warn && 
        <div className="tooltip">
          <span>❗</span> 
          <span className="tooltip-text">You must type somethings!</span>
        </div>
      }
      {
        error && 
        <div className="tooltip">
          <span>❗</span> 
          <span className="tooltip-text">Oops, can't post your comment!</span>
        </div>
      }
    </div>
  );
}

export default CommentForm;