import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticles } from "../api";

import ArticleCard from "./ArticleCard";
import Error from "./Error";
import Loading from "./Loading";

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sort, setSort] = useState({
    sortBy: "created_at",
    order: "desc"
  });
  
  const { topic_slug } = useParams();

  function handleChange(event) {
    const field = event.target.id;
    const value = event.target.value;
    setSort((current) => {
      return {...current, [field]: value}
    });
  }

  useEffect(() => {
    setLoading(true);
    setError(false);
    getArticles(topic_slug, sort.sortBy, sort.order)
      .then((articles) => {
        setArticles(articles);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  }, [topic_slug, sort]);

  if (error) {
    return <Error message="Oops, cannot find your requesting topic!" />;
  }

  if (loading) {
    return <Loading />;
  }
  
  return (
    <div className="article-list grid">
      <div className="control-bar">
        <label className="control-items" htmlFor="sortBy">sort by</label>
        <select className="control-items" id="sortBy" value={sort.sortBy} onChange={handleChange}>
          <option value="created_at">date</option>
          <option value="votes">likes</option>
          <option value="comment_count">comments</option>
          <option value="author">author</option>
        </select>
        <select className="control-item" id="order" value={sort.order} onChange={handleChange}>
          <option value="asc">asc</option>
          <option value="desc">desc</option>
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