import { useEffect, useState } from "react";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(true);
    getArticles().then((articles) => {
      setArticles(articles);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="system">loading...</div>;
  }

  return (
    <div>
      {
        articles.map((article) => 
          <ArticleCard key={article.article_id} article={article} />
        )
      }
    </div>
  );
}

export default ArticleList;