import { Link } from "react-router-dom";

function ArticleCard({ article }) {
  return (
    <section className="article-card">
      <img src={article.article_img_url} alt={article.title} />
      <div className="article-box">
        <Link to={`/articles/${article.article_id}`}>
          <h3>{article.title}</h3>
        </Link>
        <p className="subtitle" >
          <span className="author">by {article.author}</span>
          <span className="datetime">on {new Date(article.created_at).toLocaleDateString()}</span>
        </p>
      </div>
    </section>
  );
}

export default ArticleCard;