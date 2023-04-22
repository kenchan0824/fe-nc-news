import { Link } from "react-router-dom";

function ArticleCard({ article }) {
  return (
    <section className="article-card flex">
      <img src={article.article_img_url} alt={article.title} />
      <div className="article-box">
        <Link className="article-items" to={`/articles/${article.article_id}`}>
          <h3>{article.title}</h3>
        </Link>
        <p className="article-items subtitle">
          <span className="author"><b>{article.author}</b></span>
          <span className="datetime">{new Date(article.created_at).toDateString()}</span>
        </p>
        <div className="article-items subtitle">
          <span><b>{article.comment_count}</b> comments</span>
          <span>❤️ {article.votes}</span>
        </div>
      </div>
    </section>
  );
}

export default ArticleCard;