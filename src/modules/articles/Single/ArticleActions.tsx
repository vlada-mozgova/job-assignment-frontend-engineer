import { FC } from "react";
import { Article } from "utils/types";
import FollowButton from "modules/shared/FollowButton";
import FavoriteButton from "modules/shared/FavoriteButton";
import AuthorImage from "modules/shared/AuthorImage";

type ArticleActionsProps = {
  article: Article;
  handleFollowAuthor: (slug: string, isFavorited: boolean) => Promise<void>;
  handleFavoriteArticle: (slug: string, isFavorited: boolean) => Promise<void>;
};

const ArticleActions: FC<ArticleActionsProps> = ({ article, handleFollowAuthor, handleFavoriteArticle }) => {
  const { author, slug, favorited, favoritesCount, createdAt } = article;

  return (
    <div className="article-actions">
      <div className="article-meta">
        <AuthorImage username={article.author.username} image={article.author.image} />
        <div className="info">
          <a href={`/profile/${author.username}`} className="author">
            {author.username}
          </a>
          <span className="date">{new Date(createdAt).toDateString()}</span>
        </div>
        <FollowButton author={author} handleFollowAuthor={handleFollowAuthor} />
        &nbsp;
        <FavoriteButton
          slug={slug}
          favorited={favorited}
          favoritesCount={favoritesCount}
          handleFavoriteArticle={handleFavoriteArticle}
        />
      </div>
    </div>
  );
};

export default ArticleActions;
