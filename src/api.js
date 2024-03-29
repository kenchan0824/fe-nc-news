import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://nc-news-express.cyclic.app/api",
});

export async function getTopics() {
  const { data } = await newsApi.get("/topics");
  return data.topics;
}

export async function getArticles(topic, sort_by, order) {
  const params = { topic, sort_by, order };
  const { data } = await newsApi.get("/articles", { params });
  return data.articles;
}

export async function getArticleById(article_id) {
  const { data } = await newsApi.get(`/articles/${article_id}`);
  return data.article;
}

export async function voteArticle(article_id, votes) {
  const message = { inc_votes: votes };
  const { data } = await newsApi.patch(`/articles/${article_id}`, message);
  return data.article;
}

export async function getCommentsByArticle(article_id) {
  const { data } = await newsApi.get(`/articles/${article_id}/comments`);
  return data.comments;
}  

export async function postComment(article_id, body, username) {
  const message = { body, username };
  const { data } = await newsApi.post(
    `/articles/${article_id}/comments`,
    message
  );
  return data.comment;
}

export async function deleteComment(comment_id) {
  return await newsApi.delete(`/comments/${comment_id}`);
}