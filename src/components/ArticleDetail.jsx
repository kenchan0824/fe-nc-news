import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getArticleById, voteArticle } from "../api";
import CommentSection from "./CommentSection";

function ArticleDetail({ user }) {
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const [voted, setVoted] = useState(false);
  const [error, setError] = useState(false);
  
  const { article_id } = useParams();
  
  useEffect(() => {
    setLoading(true);
    getArticleById(article_id)
      .then((data) => {
        setArticle(data);
        setLoading(false);
      });
    }, []);
  
  function handleVote(event) {
    const incVote = voted ? -1 : 1;
    setVoted((current) => !current);
    setArticle((current) => {
      return {...current, votes: current.votes + incVote};
    });
    setError(false);
    voteArticle(article_id, incVote)
      .catch(() => {
        setError(true);
        setVoted((current) => !current);
        setArticle((current) => {
          return {...current, votes: current.votes - incVote};
        });
      });
  }

  if (loading) {
    return <div className="system">loading...</div>;
  }
  
  return (
    <section className="article-detail">
      <h3 className="detail-item">{article.title}</h3>
      <p className="detail-item subtitle">
        <span className="flex-box">by {article.author}</span>
        <span className="flex-box">at {new Date(article.created_at).toLocaleString()}</span>
      </p>
      <img src={article.article_img_url} alt={article.title} />
      <p className="detail-item content">{article.body}</p>
      <div className="detail-item like">
        <button className="like-box" onClick={handleVote}>{voted?<p>❤️</p>:<p>🤍</p>}</button> 
        {
          error && 
          <span className="like-box tooltip">
            <span>❗</span> 
            <span className="tooltip-text">Sorry, cannot process votes at the moment!</span>
          </span>
        }
        <span className="like-box"><b>{article.votes}</b> likes</span>
      </div>
      <CommentSection user={user} article_id={article.article_id} />
    </section>
  );

}

export default ArticleDetail;