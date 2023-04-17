import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://be-nc-news-cu7z.onrender.com/api"
});

export async function getArticles() {
  const {data} = await newsApi.get("/articles");
  return data.articles;
};