import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Article } from "utils/types";
import { useAppSelector } from "redux/store";
import { selectIsLoggedIn } from "redux/userSlice";
import { getArticle } from "utils/api/get-article";
import { favoriteArticle } from "utils/api/favorite-article";
import { followAuthor } from "utils/api/follow-author";

const useArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const userToken = useAppSelector(selectIsLoggedIn);

  useEffect(() => {
    if (userToken && slug) {
      const fetchData = async () => {
        try {
          const response = await getArticle(userToken, slug);
          setArticle(response);
        } catch (error) {
          console.error("Failed to fetch article:", error);
        }
      };
      fetchData();
    }
  }, [userToken, slug]);

  const handleFavoriteArticle = async (slug: string, isFavorited: boolean) => {
    if (!userToken || !article) return;
    const updatedArticle = await favoriteArticle(userToken, slug, isFavorited);
    setArticle(updatedArticle);
  };

  const handleFollowAuthor = async (username: string, isFollowing: boolean) => {
    if (!userToken || !article) return;
    const updatedAuthor = await followAuthor(userToken, username, isFollowing);
    setArticle({
      ...article,
      author: updatedAuthor,
    });
  };

  return { article, handleFavoriteArticle, handleFollowAuthor };
};

export default useArticle;
