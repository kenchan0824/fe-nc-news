import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getArticleById } from "../api";

function ArticleDetail() {
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  
  const { article_id } = useParams();
  
  useEffect(() => {
    setLoading(true);
    getArticleById(article_id)
      .then((data) => {
        setArticle(data);
        setLoading(false);
      });
    }, []);
  
  if (loading) {
    return "loading ...";
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
      <div className="detail-item">❤️ {article.votes}</div>
    </section>
  );

}

export default ArticleDetail;