import useArticles from "hooks/useArticles";
import ArticleList from "modules/articles/ArticleList";
import Toggle from "modules/shared/Toggle";
import { FC } from "react";

type ProfileProps = { username: string };

const Profile: FC<ProfileProps> = ({ username }) => {
  const { articles, loading, handleFavoriteArticle, isGlobalFeed, handleToggleFeed } = useArticles({
    author: username,
    favorited: username,
  });
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-md-10 offset-md-1">
          <Toggle
            isGlobalFeed={isGlobalFeed}
            onToggleFeed={handleToggleFeed}
            tabs={["My Articles", "Favorited Articles"]}
          />
          <ArticleList loading={loading} articles={articles} handleFavoriteArticle={handleFavoriteArticle} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
