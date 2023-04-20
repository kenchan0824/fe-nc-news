import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getArticleById, voteArticle } from "../api";

import CommentSection from "./CommentSection";

function ArticleDetail({ user }) {
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const [voted, setVoted] = useState(false);
  const [voteError, setVoteError] = useState(false);
  const [loadError, setLoadError] = useState(false);
  
  const { article_id } = useParams();
  
  useEffect(() => {
    setLoading(true);
    setLoadError(false);
    getArticleById(article_id)
      .then((data) => {
        setArticle(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoadError(true);
        setLoading(false);
      });
    }, []);
  
  function handleVote(event) {
    const incVote = voted ? -1 : 1;
    setVoted((current) => !current);
    setArticle((current) => {
      return {...current, votes: current.votes + incVote};
    });
    setVoteError(false);
    voteArticle(article_id, incVote)
      .catch(() => {
        setVoteError(true);
        setVoted((current) => !current);
        setArticle((current) => {
          return {...current, votes: current.votes - incVote};
        });
      });
  }

  if (loadError) {
    return (
      <div className="error">
        <h3>Error</h3>
        Oops, can't find your requesting article!
      </div>
    );
  }

  if (loading) {
    return <div className="system">loading...</div>;
  }
  
  return (
    <div className="article-detail grid-container">
      <section className="article-section grid-item">
        <h3 className="detail-item">{article.title}</h3>
        <p className="detail-item subtitle">
          <span className="flex-box"><b>{article.author}</b></span>
          <span className="flex-box">{new Date(article.created_at).toDateString()}</span>
        </p>
        <img src={article.article_img_url} alt={article.title} />
        <p className="detail-item content">{article.body}</p>
        <div className="detail-item like">
          <button className="like-box" onClick={handleVote}>{voted?<p>❤️</p>:<p>🤍</p>}</button> 
          <span className="like-box"><b>{article.votes}</b> likes</span>
          {
            voteError && 
            <span className="like-box tooltip">
              <span>❗</span> 
              <span className="tooltip-text">Sorry, can't process your vote!</span>
            </span>
          }
        </div>

      </section>

      <CommentSection user={user} article_id={article.article_id} />
    </div>
  );

}

export default ArticleDetail;