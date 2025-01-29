import { FC } from "react";
import { Article } from "utils/types";
import authorImage from "assets/images/author.svg";
import { useAppSelector } from "redux/store";
import { selectUser } from "redux/userSlice";

type ArticleActionsProps = {
  article: Article;
  handleFollowAuthor: (slug: string, isFavorited: boolean) => Promise<void>;
  handleFavoriteActicle: (slug: string, isFavorited: boolean) => Promise<void>;
};

const ArticleActions: FC<ArticleActionsProps> = ({ article, handleFollowAuthor, handleFavoriteActicle }) => {
  const user = useAppSelector(selectUser);
  return (
    <div className="article-actions">
      <div className="article-meta">
        <a href={article.author.image}>
          <img src={article.author.image || authorImage} alt={article.author.username} />
        </a>
        <div className="info">
          <a href={article.author.image} className="author">
            {article.author.username}
          </a>
          <span className="date">{new Date(article.createdAt).toDateString()}</span>
        </div>
        {user?.username != article.author.username && (
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => handleFollowAuthor(article.author.username, article.author.following)}
          >
            {article.author.following ? (
              <>Followed {article.author.username}</>
            ) : (
              <>
                <i className="ion-plus-round" />
                &nbsp; Follow {article.author.username}
              </>
            )}
          </button>
        )}
        &nbsp;
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() => handleFavoriteActicle(article.slug, article.favorited)}
        >
          <i className="ion-heart" />
          &nbsp; Favorite Post <span className="counter">({article.favoritesCount})</span>
        </button>
      </div>
    </div>
  );
};

export default ArticleActions;
