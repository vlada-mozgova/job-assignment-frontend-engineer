import { BASE_URL } from "utils/constants";
import { Article } from "utils/types";

const fetchArticles = async (url: string, token: string): Promise<Article[]> => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage = response.status ? response.statusText : errorData.message;
    throw new Error(`Failed to get articles: ${errorMessage}`);
  }

  const data = await response.json();
  return data.articles;
};

export const getFollowedArticles = async (token: string, limit = 20, offset = 0): Promise<Article[]> => {
  const params = new URLSearchParams({ limit: limit.toString(), offset: offset.toString() });
  const url = `${BASE_URL}/api/articles/feed?${params.toString()}`;

  return fetchArticles(url, token);
};

export const getGlobalArticles = async ({
  token,
  author,
  favorited,
}: {
  token: string;
  author?: string;
  favorited?: string;
}): Promise<Article[]> => {
  const params = new URLSearchParams();
  if (author) params.append("author", author);
  if (favorited) params.append("favorited", favorited);
  const url = `${BASE_URL}/api/articles?${params.toString()}`;

  return fetchArticles(url, token);
};
