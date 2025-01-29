import { BASE_URL } from "utils/constants";
import { Article } from "utils/types";

export const getFollowedArticles = async (token: string, limit = 20, offset = 0): Promise<Article[]> => {
  const response = await fetch(`${BASE_URL}/api/articles/feed?limit=${limit}&offset=${offset}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token: ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get articles");
  }

  const data = await response.json();
  return data.articles;
};

export const getGlobalArticles = async (token: string): Promise<Article[]> => {
  const response = await fetch(`${BASE_URL}/api/articles`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token: ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get articles");
  }

  const data = await response.json();
  return data.articles;
};
