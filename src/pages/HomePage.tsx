import React, { useState, useEffect } from "react";
import ArticleList from "modules/articles/ArticleList";
import Tags from "modules/articles/Tags";
import Banner from "modules/shared/Banner";
import { getFollowedArticles, getGlobalArticles } from "utils/api/get-articles";
import { useAppSelector } from "redux/store";
import { selectIsLoggedIn } from "redux/userSlice";
import { Article } from "utils/types";
import { favoriteArticle } from "utils/api/favorite-article";
import Toggle from "modules/shared/Toggle";

const HomePage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isGlobalFeed, setIsGlobalFeed] = useState<boolean>(true);

  const userToken: string | undefined = useAppSelector(selectIsLoggedIn);

  useEffect(() => {
    if (userToken) {
      const fetchData = async () => {
        const response = isGlobalFeed
          ? await getGlobalArticles({ token: userToken })
          : await getFollowedArticles(userToken);
        setArticles(response);

        setLoading(false);
      };
      fetchData();
    } else {
      setLoading(false);
    }
  }, [isGlobalFeed]);

  const handleToggleFeed = (isGlobal: boolean) => {
    setIsGlobalFeed(isGlobal);
    setLoading(true);
  };

  const handleFavoriteActicle = async (slug: string, isFavorited: boolean) => {
    const res = await favoriteArticle(userToken!, slug, isFavorited);
    setArticles(articles.map(article => (article.slug === slug ? res : article)));
  };

  return (
    <div className="home-page">
      <Banner />
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <Toggle isGlobalFeed={isGlobalFeed} onToggleFeed={handleToggleFeed} tabs={["Your Feed", "Global Feed"]} />
            {loading ? (
              <div>Loading articles...</div>
            ) : articles.length === 0 ? (
              <div>No articles are here... yet.</div>
            ) : (
              <ArticleList articles={articles} handleFavoriteActicle={handleFavoriteActicle} />
            )}
          </div>
          <div className="col-md-3">
            <Tags />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
