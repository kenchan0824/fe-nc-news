function CommentCard({ user, comment }) {
  if (comment.author === user.username) {
    return (
      <div className="comment-card me" >
        <p className="comment-box comment-author">me:</p>
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
        <p className="comment-box comment-author">{comment.author}: </p>
        <p className="comment-box comment-content">{comment.body}</p> 
      </div>
    );
  }
}

export default CommentCard;