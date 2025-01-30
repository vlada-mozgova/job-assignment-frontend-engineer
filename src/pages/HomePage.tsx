import React from "react";
import ArticleList from "modules/articles/ArticleList";
import Tags from "modules/articles/Tags";
import Banner from "modules/shared/Banner";
import Toggle from "modules/shared/Toggle";
import useArticles from "hooks/useArticles";

const HomePage: React.FC = () => {
  const { articles, loading, handleFavoriteArticle, isGlobalFeed, handleToggleFeed } = useArticles({});

  return (
    <div className="home-page">
      <Banner />
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <Toggle isGlobalFeed={isGlobalFeed} onToggleFeed={handleToggleFeed} tabs={["Your Feed", "Global Feed"]} />
            <ArticleList loading={loading} articles={articles} handleFavoriteArticle={handleFavoriteArticle} />
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
