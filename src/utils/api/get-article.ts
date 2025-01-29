import { BASE_URL } from "utils/constants";
import { Article } from "utils/types";

export const getArticle = async (token: string, slug: string): Promise<Article> => {
  const response = await fetch(`${BASE_URL}/api/articles/${slug}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token: ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get article");
  }

  try {
    const data = await response.json();
    return data.article;
  } catch (error) {
    throw new Error("Failed to parse response");
  }
};
