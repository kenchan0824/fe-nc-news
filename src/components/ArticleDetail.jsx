import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getArticleById, voteArticle } from "../api";
import CommentSection from "./CommentSection";

function ArticleDetail() {
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const [voted, setVoted] = useState(false);
  
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
    voteArticle(article_id, incVote);
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
        <button onClick={handleVote}>{voted?<span>❤️</span>:<span>🤍</span>}</button> 
        <span>{article.votes} likes</span>
      </div>
      <CommentSection article_id={article.article_id} />
    </section>
  );

}

export default ArticleDetail;