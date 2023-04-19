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
      {
        articles.map((article) => 
          <ArticleCard key={article.article_id} article={article} />
        )
      }
    </div>
  );
}

export default ArticleList;