import { FC } from "react";
import ArticleBanner from "modules/articles/Single/ArticleBanner";
import Comments from "modules/articles/Single/Comments";
import ArticleActions from "modules/articles/Single/ArticleActions";
import useArticle from "hooks/useArticle";

const ArticlePage: FC = () => {
  const { article, handleFavoriteArticle, handleFollowAuthor } = useArticle();

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="article-page">
      <ArticleBanner article={article} />

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <span>{article.description}</span>
            <h2 id="introducing-ionic">{article.title}</h2>
            {article.body.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
        <hr />
        <ArticleActions
          article={article}
          handleFollowAuthor={handleFollowAuthor}
          handleFavoriteArticle={handleFavoriteArticle}
        />
        <Comments />
      </div>
    </div>
  );
};

export default ArticlePage;
