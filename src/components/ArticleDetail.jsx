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
    }, []);
  
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
    <div className="article-detail grid-container">
      <section className="article-section grid-item">

        <h3 className="detail-item">{article.title}</h3>
        <p className="detail-item subtitle">
          <span className="flex-box"><b>{article.author}</b></span>
          <span className="flex-box">{new Date(article.created_at).toDateString()}</span>
        </p>

        <img src={article.article_img_url} alt={article.title} />
        <p className="detail-item content">{article.body}</p>

        <div className="detail-item like">
          <button className="like-box" onClick={handleVote}>{voted?<p>❤️</p>:<p>🤍</p>}</button> 
          <span className="like-box"><b>{article.votes}</b> likes</span>
          <span className="like-box"><b>{article.comment_count}</b> comments</span>
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