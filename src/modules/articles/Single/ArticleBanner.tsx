import React from "react";
import { Article } from "utils/types";
import authorImage from "assets/images/author.svg";

type ArticleBannerProps = {
  article: Article;
};

const ArticleBanner: React.FC<ArticleBannerProps> = ({ article }) => {
  return (
    <div className="banner">
      <div className="container">
        <h1>{article.title}</h1>
        <div className="article-meta">
          <a href={article.author.image}>
            <img src={article.author.image || authorImage} alt={article.author.username} />
          </a>
          <div className="info">
            <a href={`/profile/${article.author.username}`} className="author">
              {article.author.username}
            </a>
            <span className="date">{new Date(article.createdAt).toDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleBanner;
