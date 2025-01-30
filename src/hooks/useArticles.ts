import { useState, useEffect } from "react";
import { useAppSelector } from "redux/store";
import { selectIsLoggedIn } from "redux/userSlice";
import { Article } from "utils/types";
import { getFollowedArticles, getGlobalArticles } from "utils/api/get-articles";
import { favoriteArticle } from "utils/api/favorite-article";

type UseArticlesProps = {
  author?: string;
  favorited?: string;
};

const useArticles = ({ author, favorited }: UseArticlesProps) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isGlobalFeed, setIsGlobalFeed] = useState<boolean>(true);
  const userToken: string | undefined = useAppSelector(selectIsLoggedIn);

  useEffect(() => {
    if (userToken) {
      const fetchData = async () => {
        let response: Article[];
        if (author && !isGlobalFeed) {
          response = await getGlobalArticles({ token: userToken, author });
        } else if (favorited && isGlobalFeed) {
          response = await getGlobalArticles({ token: userToken, favorited });
        } else if (isGlobalFeed) {
          response = await getGlobalArticles({ token: userToken });
        } else {
          response = await getFollowedArticles(userToken);
        }
        setArticles(response);
        setLoading(false);
      };
      fetchData();
    } else {
      setLoading(false);
    }
  }, [isGlobalFeed, author, favorited, userToken]);

  const handleFavoriteArticle = async (slug: string, isFavorited: boolean) => {
    if (!userToken) return;
    const res = await favoriteArticle(userToken, slug, isFavorited);
    setArticles(articles.map(article => (article.slug === slug ? res : article)));
  };

  const handleToggleFeed = (isGlobal: boolean) => {
    setIsGlobalFeed(isGlobal);
    setLoading(true);
  };

  return { articles, loading, handleFavoriteArticle, isGlobalFeed, handleToggleFeed };
};

export default useArticles;
