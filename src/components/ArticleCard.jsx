function ArticleCard({ article }) {
  return (
    <section className="article-card">
      <img className="article-box" src={article.article_img_url} />
      <div className="article-box">
        <h3>{article.title}</h3>
        <p>by {article.author}</p>
        <p>at {article.created_at}</p>
      </div>
    </section>
  );
}

export default ArticleCard;