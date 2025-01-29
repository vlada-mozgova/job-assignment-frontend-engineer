import React from "react";

export type Article = {
  author: {
    username: string;
    image: string;
  };
  createdAt: string;
  favoritesCount: number;
  slug: string;
  title: string;
  description: string;
};

type ArticleListProps = {
  articles: Article[];
};

const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
  return (
    <div>
      {articles.map(article => (
        <div key={article.slug} className="article-preview">
          <div className="article-meta">
            <a href={`/profile/${article.author.username}`}>
              <img src={article.author.image} alt={article.author.username} />
            </a>
            <div className="info">
              <a href={`/profile/${article.author.username}`} className="author">
                {article.author.username}
              </a>
              <span className="date">{new Date(article.createdAt).toDateString()}</span>
            </div>
            <button className="btn btn-outline-primary btn-sm pull-xs-right">
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
