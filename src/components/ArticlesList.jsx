import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { topic_slug } = useParams();

  useEffect(() => {
    setLoading(true);
    getArticles(topic_slug).then((articles) => {
      setArticles(articles);
      setLoading(false);
    });
  }, [topic_slug]);

  if (loading) {
    return <div className="system">loading...</div>;
  }

  return (
    <div className="article-list">
      <div className="control-bar">
        <label className="control-item">sort by</label>
        <select className="control-item">
          <option>date</option>
          <option>title</option>
          <option>author</option>
          <option>likes</option>
        </select>
        <select className="control-item">
          <option>asc</option>
          <option>des</option>
        </select>
      </div>
      {
        articles.map((article) => 
          <ArticleCard key={article.article_id} article={article} />
        )
      }
    </div>
  );
}

export default ArticleList;