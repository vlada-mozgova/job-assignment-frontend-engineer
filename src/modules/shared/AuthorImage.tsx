import React from "react";
import authorImage from "assets/images/author.svg";

type AuthorImageProps = {
  username: string;
  image?: string;
};

const AuthorImage: React.FC<AuthorImageProps> = ({ username, image }) => {
  return (
    <a href={`/profile/${username}`}>
      <img src={image || authorImage} alt={username} />
    </a>
  );
};

export default AuthorImage;
