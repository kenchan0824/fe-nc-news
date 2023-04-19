import { useState, useEffect } from "react";
import { getCommentsByArticle } from "../api";
import CommentsList from "./CommentsList";
import CommentForm from "./CommentForm";

function CommentSection({ user, article_id }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCommentsByArticle(article_id)
      .then((data) => {
        setLoading(false);
        setComments(data);
      });
  }, []);

  return (
    <div className="comment-section">
      <h4 className="comment-header">Comments:</h4>
      <CommentForm user={user} article_id={article_id} setComments={setComments} />
      {
        loading && <div className="system">loading...</div>
      }
      <CommentsList user={user} article_id={article_id} comments={comments} />
    </div>
  );
}

export default CommentSection;