import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://be-nc-news-cu7z.onrender.com/api"
});

export async function getArticles() {
  const {data} = await newsApi.get("/articles");
  return data.articles;
};

export async function getArticleById(article_id) {
  const {data} = await newsApi.get(`/articles/${article_id}`);
  return data.article;
};

export async function getCommentsByArticle(article_id) {
  const {data} = await newsApi.get(`/articles/${article_id}/comments`);
  return data.comments;
};

export async function voteArticle(article_id, votes) {
  console.log(article_id, votes);
  const params = {inc_votes: votes}
  const {data} = await newsApi.patch(`/articles/${article_id}`, params);
  return data.article;
}