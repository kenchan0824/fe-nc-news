function CommentCard({ user, comment }) {
  if (comment.author === user.username) {
    return (
      <div className="comment-card me" >
        <div className="comment-box comment-author">me</div>
        <div className="comment-box comment-content">
          <p>
            {comment.body}
          </p>
          <button className="comment-box comment-button">🗑</button>
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