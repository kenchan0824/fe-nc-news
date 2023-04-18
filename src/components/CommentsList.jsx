import CommentCard from "./CommentCard";

function CommentsList({ user, article_id, comments }) {

  if (comments.length === 0) {
    return <div className="system">no comments, be the first to comment now!</div>;
  }

  return (
    <div>
      {
        comments.map((comment) => {
          return <CommentCard key={comment.comment_id} user={user} comment={comment} />;
        })
      }
    </div>
    
  );
}

export default CommentsList;