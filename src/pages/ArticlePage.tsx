import { useEffect, useState, FC } from "react";
import { useParams } from "react-router-dom";
import { Article } from "utils/types";
import { useAppSelector } from "redux/store";
import { selectIsLoggedIn } from "redux/userSlice";
import { getArticle } from "utils/api/get-article";
import ArticleBanner from "modules/articles/Single/ArticleBanner";
import Comments from "modules/articles/Single/Comments";
import ArticleActions from "modules/articles/Single/ArticleActions";
import { followAuthor } from "utils/api/follow-author";
import { favoriteArticle } from "utils/api/favorite-article";

const ArticlePage: FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const userToken = useAppSelector(selectIsLoggedIn);

  useEffect(() => {
    if (userToken && slug) {
      const fetchData = async () => {
        try {
          const response = await getArticle(userToken, slug);
          setArticle(response);
        } catch (error) {
          console.error("Failed to fetch article:", error);
        }
      };
      fetchData();
    }
  }, [userToken, slug]);

  if (!article) {
    return <div>Loading...</div>;
  }

  const handleFollowAuthor = async (username: string, isFavorited: boolean) => {
    const res = await followAuthor(userToken!, username, isFavorited);
    setArticle({ ...article, author: res });
  };

  const handleFavoriteActicle = async (slug: string, isFavorited: boolean) => {
    const res = await favoriteArticle(userToken!, slug, isFavorited);
    setArticle({ ...res });
  };

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
          handleFavoriteActicle={handleFavoriteActicle}
        />
        <Comments />
      </div>
    </div>
  );
};

export default ArticlePage;
