import React from "react";
import authorImage from "assets/images/author.svg";
import { Article } from "utils/types";

type ArticleListProps = {
  loading: boolean;
  articles: Article[];
  handleFavoriteArticle: (slug: string, isFavorited: boolean) => void;
};

const ArticleList: React.FC<ArticleListProps> = ({ loading, articles, handleFavoriteArticle }) => {
  return loading ? (
    <div>Loading articles...</div>
  ) : articles.length === 0 ? (
    <div>No articles are here... yet.</div>
  ) : (
    <div>
      {articles.map(article => (
        <div key={article.slug} className="article-preview">
          <div className="article-meta">
            <a href={`/profile/${article.author.username}`}>
              <img src={article.author.image || authorImage} alt={article.author.username} />
            </a>
            <div className="info">
              <a href={`/profile/${article.author.username}`} className="author">
                {article.author.username}
              </a>
              <span className="date">{new Date(article.createdAt).toDateString()}</span>
            </div>
            <button
              className="btn btn-outline-primary btn-sm pull-xs-right"
              onClick={() => handleFavoriteArticle(article.slug, article.favorited)}
            >
              <i className="ion-heart" /> {article.favoritesCount}
            </button>
          </div>
          <a href={`/${article.slug}`} className="preview-link">
            <h1>{article.title}</h1>
            <p>{article.description}</p>
            <span>Read more...</span>
          </a>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
