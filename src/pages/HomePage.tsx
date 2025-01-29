import React, { useState, useEffect } from "react";
import ArticleList, { Article } from "modules/articles/ArticleList";
import FeedToggle from "modules/articles/FeedToggle";
import Tags from "modules/articles/Tags";
import Banner from "modules/shared/Banner";

const HomePage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isGlobalFeed, setIsGlobalFeed] = useState<boolean>(true);

  useEffect(() => {
    // Simulate an API call to fetch articles
    setTimeout(() => {
      // Replace this with actual API call
      const fetchedArticles: Article[] = []; // Replace with fetched data
      setArticles(fetchedArticles);
      setLoading(false);
    }, 2000);
  }, [isGlobalFeed]);

  const handleToggleFeed = (isGlobal: boolean) => {
    setIsGlobalFeed(isGlobal);
    setLoading(true);
    // Simulate fetching new articles based on the feed type
    setTimeout(() => {
      const fetchedArticles: Article[] = []; // Replace with fetched data
      setArticles(fetchedArticles);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="home-page">
      <Banner />
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggle isGlobalFeed={isGlobalFeed} onToggleFeed={handleToggleFeed} />
            {loading ? (
              <div>Loading articles...</div>
            ) : articles.length === 0 ? (
              <div>No articles are here... yet.</div>
            ) : (
              <ArticleList articles={articles} />
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
