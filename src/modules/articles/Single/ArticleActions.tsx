import { FC } from "react";
import { Article } from "utils/types";
import authorImage from "assets/images/author.svg";
import { useAppSelector } from "redux/store";
import { selectUser } from "redux/userSlice";

type ArticleActionsProps = {
  article: Article;
  handleFollowAuthor: (slug: string, isFavorited: boolean) => Promise<void>;
  handleFavoriteArticle: (slug: string, isFavorited: boolean) => Promise<void>;
};

const ArticleActions: FC<ArticleActionsProps> = ({ article, handleFollowAuthor, handleFavoriteArticle }) => {
  const user = useAppSelector(selectUser);
  const { author, slug, favorited, favoritesCount, createdAt } = article;

  return (
    <div className="article-actions">
      <div className="article-meta">
        <a href={author.image}>
          <img src={author.image || authorImage} alt={author.username} />
        </a>
        <div className="info">
          <a href={`/profile/${author.username}`} className="author">
            {author.username}
          </a>
          <span className="date">{new Date(createdAt).toDateString()}</span>
        </div>
        {user?.username !== author.username && (
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => handleFollowAuthor(author.username, author.following)}
          >
            {author.following ? (
              <>Followed {author.username}</>
            ) : (
              <>
                <i className="ion-plus-round" />
                &nbsp; Follow {author.username}
              </>
            )}
          </button>
        )}
        &nbsp;
        <button className="btn btn-sm btn-outline-primary" onClick={() => handleFavoriteArticle(slug, favorited)}>
          <i className="ion-heart" />
          &nbsp; Favorite Post <span className="counter">({favoritesCount})</span>
        </button>
      </div>
    </div>
  );
};

export default ArticleActions;
