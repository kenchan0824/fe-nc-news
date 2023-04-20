import { useState, useEffect } from "react";
import { postComment } from "../api";
import InfoModal from "./InfoModal";  

function CommentForm({ user, article_id, setComments }) {
  const [comment, setComment] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");


  function handleChange(event) {
    setComment(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    
    const body = event.target[0].value;
    if (!body.trim()) {
      setModalTitle("❗ Warn");
      setModalMessage("You must type something.")
      setModalOpen(true);
      return; 
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
        setComments((current) => {
          return current.slice(1);
        });
        setModalTitle("❌ Error");
        setModalMessage("Oops, can't post your comment!")
        setModalOpen(true);  
      });
  }

  return (
    <div className="comment-form" >
      
      <InfoModal 
        title={modalTitle}
        message={modalMessage} 
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
      />

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
    
    </div>
  );
}

export default CommentForm;