import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://be-nc-news-cu7z.onrender.com/api"
});

export async function getArticles(topic) {
  const params = { topic };
  const {data} = await newsApi.get("/articles", { params });
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
  const message = {inc_votes: votes}
  const {data} = await newsApi.patch(`/articles/${article_id}`, message);
  return data.article;
}

export async function postComment(article_id, body, username) {
  const message = {body, username};
  const {data} = await newsApi.post(`/articles/${article_id}/comments`, message);
  return data.comment;
}

export async function getTopics() {
  const {data} = await newsApi.get('/topics');
  return data.topics;
}