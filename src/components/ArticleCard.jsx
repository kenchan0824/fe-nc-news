import { Link } from "react-router-dom";

function ArticleCard({ article }) {
  return (
    <section className="article-card grid-item">
      <img src={article.article_img_url} alt={article.title} />
      <div className="article-box">
        <Link to={`/articles/${article.article_id}`}>
          <h3>{article.title}</h3>
        </Link>
        <p className="subtitle">
          <span className="author"><b>{article.author}</b></span>
          <span className="datetime">{new Date(article.created_at).toDateString()}</span>
        </p>
      </div>
    </section>
  );
}

export default ArticleCard;