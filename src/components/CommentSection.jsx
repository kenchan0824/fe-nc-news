import { useState, useEffect } from "react";
import { getCommentsByArticle } from "../api";
import CommentsList from "./CommentsList";
import CommentForm from "./CommentForm";

function CommentSection({ article_id }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCommentsByArticle(article_id)
      .then((data) => {
        setLoading(false);
        setComments(data);
      });
  }, [article_id]);

  return (
    <div className="comment-section">
      <h4 className="comment-header">Comments:</h4>
      <CommentForm article_id={article_id} setComments={setComments} />
      {
        loading && <div className="system">loading...</div>
      }
      <CommentsList article_id={article_id} comments={comments} setComments={setComments} />
    </div>
  );
}

export default CommentSection;