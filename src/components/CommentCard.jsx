function CommentCard({ comment }) {
  return (
    <div className="comment-card">
      <p className="comment-box comment-author">{comment.author}: </p>
      <p className="comment-box comment-content">{comment.body}</p>
    </div>
  );
}

export default CommentCard;