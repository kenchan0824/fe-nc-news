import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getArticleById, voteArticle } from "../api";

import CommentSection from "./CommentSection";
import Error from "./Error";
import InfoModal from "./InfoModal";
import Loading from "./Loading";

function ArticleDetail() {
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const [voted, setVoted] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const { article_id } = useParams();
  
  useEffect(() => {
    setLoading(true);
    setLoadError(false);
    getArticleById(article_id)
      .then((data) => {
        setArticle(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoadError(true);
        setLoading(false);
      });
    }, [article_id]);
  
  function handleVote(event) {
    const incVote = voted ? -1 : 1;
    setVoted((current) => !current);
    setArticle((current) => {
      return {...current, votes: current.votes + incVote};
    });
    voteArticle(article_id, incVote)
      .catch(() => {
        setVoted((current) => !current);
        setArticle((current) => {
          return {...current, votes: current.votes - incVote};
        });
        setModalOpen(true);
      });
  }

  if (loadError) {
    return <Error message="Oops, can't find your requesting article!" />;
  }

  if (loading) {
    return <Loading />;
  }
  
  return (
    <div className="article-detail grid">
      <section className="article-section">

        <h3 className="article-items">{article.title}</h3>
        <p className="article-items subtitle flex">
          <span><b>{article.author}</b></span>
          <span class="date">{new Date(article.created_at).toDateString()}</span>
        </p>

        <img src={article.article_img_url} alt={article.title} />
        <p className="article-items content">{article.body}</p>

        <div className="article-items like">
          <button onClick={handleVote}>{voted?<p>❤️</p>:<p>🤍</p>}</button> 
          <span class="num"><b>{article.votes}</b></span>
          <span class="desc">likes</span>
          <span class="num"><b>{article.comment_count}</b></span>
          <span class="desc">comments</span>
        </div>

        <InfoModal 
          title="❌ Error"
          message="Oops, can't process your vote!" 
          isOpen={modalOpen}
          setIsOpen={setModalOpen}
        />

      </section>

      <CommentSection article_id={article.article_id} />
    </div>
  );

}

export default ArticleDetail;