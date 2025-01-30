import React from "react";

type FavoriteButtonProps = {
  slug: string;
  favorited: boolean;
  favoritesCount: number;
  handleFavoriteArticle: (slug: string, favorited: boolean) => void;
};

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ slug, favorited, favoritesCount, handleFavoriteArticle }) => {
  return (
    <button
      className={`btn btn-sm ${favorited ? "btn-primary" : "btn-outline-primary"}`}
      onClick={() => handleFavoriteArticle(slug, favorited)}
    >
      <i className="ion-heart" />
      &nbsp; {favorited ? "Unfavorite" : "Favorite"} Post <span className="counter">({favoritesCount})</span>
    </button>
  );
};

export default FavoriteButton;
