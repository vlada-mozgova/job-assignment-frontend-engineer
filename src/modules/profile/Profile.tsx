import ArticleList from "modules/articles/ArticleList";
import Toggle from "modules/shared/Toggle";
import { FC, useEffect, useState } from "react";
import { useAppSelector } from "redux/store";
import { selectIsLoggedIn } from "redux/userSlice";
import { favoriteArticle } from "utils/api/favorite-article";
import { getGlobalArticles } from "utils/api/get-articles";
import { Article } from "utils/types";

type ProfileProps = { username: string };

const Profile: FC<ProfileProps> = ({ username }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFavoriteArticles, setIsFavoriteArticles] = useState<boolean>(false);

  const userToken: string | undefined = useAppSelector(selectIsLoggedIn);
  useEffect(() => {
    if (userToken) {
      const fetchData = async () => {
        const response = isFavoriteArticles
          ? await getGlobalArticles({ token: userToken, favorited: username })
          : await getGlobalArticles({ token: userToken, author: username });
        setArticles(response);

        setLoading(false);
      };
      fetchData();
    } else {
      setLoading(false);
    }
  }, [isFavoriteArticles, userToken, username]);

  const handleToggleFeed = (isGlobal: boolean) => {
    setIsFavoriteArticles(isGlobal);
    setLoading(true);
  };

  const handleFavoriteActicle = async (slug: string, isFavorited: boolean) => {
    if (!userToken) return;
    const res = await favoriteArticle(userToken, slug, isFavorited);
    setArticles(articles.map(article => (article.slug === slug ? res : article)));
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-md-10 offset-md-1">
          <Toggle
            isGlobalFeed={isFavoriteArticles}
            onToggleFeed={handleToggleFeed}
            tabs={["My Articles", "Favorited Articles"]}
          />

          {loading ? (
            <div>Loading articles...</div>
          ) : articles.length === 0 ? (
            <div>No articles are here... yet.</div>
          ) : (
            <ArticleList articles={articles} handleFavoriteActicle={handleFavoriteActicle} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
