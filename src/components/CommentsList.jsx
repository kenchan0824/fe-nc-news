import { useState, useEffect } from "react";
import CommentCard from "./CommentCard";
import { getCommentsByArticle } from "../api";

function CommentsList({ article_id }) {
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

  if (loading) {
    return <div className="system">loading...</div>;
  }

  return (
    <div>
      {
        comments.map((comment) => {
          return <CommentCard key={comment.comment_id} comment={comment} />;
        })
      }
    </div>
    
  );
}

export default CommentsList;