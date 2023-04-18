import CommentsList from "./CommentsList";

function CommentSection({ article_id }) {
  return (
    <div className="comment-section">
      <h4>Comments:</h4>
      <CommentsList article_id={article_id} />
    </div>
  );
}

export default CommentSection;