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
