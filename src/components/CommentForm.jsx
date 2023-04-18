import { useState, useEffect } from "react";
import { postComment } from "../api";


function CommentForm({ user, article_id, setComments }) {
  const [comment, setComment] = useState("");

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
    postComment(article_id, body, user.username)
      .then((newComment) => {
        setComments((current) => {
          return [newComment, ...current]
        });
      });
  }

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <textarea 
        className="comment-input" 
        placeholder="type something ..."
        onChange={handleChange}
        value={comment}
      />
      <button className="comment-button">Post</button>
    </form>
  );
}

export default CommentForm;