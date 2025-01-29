import { BASE_URL } from "utils/constants";
import { Article } from "utils/types";
import stringify from "query-string";

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
  const queryParams = stringify.stringify({ limit, offset });
  const url = `${BASE_URL}/api/articles/feed?${queryParams}`;

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
  const queryParams = stringify.stringify({ author, favorited });
  const url = `${BASE_URL}/api/articles?${queryParams}`;

  return fetchArticles(url, token);
};
